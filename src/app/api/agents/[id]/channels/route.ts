import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";
import { pushChannelConfig, removeChannelConfig } from "@/lib/ssh";
import { rateLimit } from "@/lib/rateLimit";

// Verify the agent belongs to the current user, return id + ip + status
async function verifyOwnership(supabase: Awaited<ReturnType<typeof createClient>>, agentId: string, userId: string) {
  const { data } = await supabase
    .from("agents")
    .select("id, ip, status")
    .eq("id", agentId)
    .eq("user_id", userId)
    .single();
  return data;
}

// GET /api/agents/[id]/channels — list connected channels
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agent = await verifyOwnership(supabase, id, user.id);
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: channels, error } = await supabase
    .from("agent_channels")
    .select("*")
    .eq("agent_id", id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(channels || []);
}

// POST /api/agents/[id]/channels — connect a channel
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Rate-limit: max 10 channel connects per user per 10 minutes
  const rl = rateLimit(`connect-channel:${user.id}`, 10, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const agent = await verifyOwnership(supabase, id, user.id);
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const { platform, token, config } = body;

  if (!platform) return NextResponse.json({ error: "Platform is required" }, { status: 400 });

  const channelConfig: Record<string, string> = {
    ...(token ? { token } : {}),
    ...config,
  };

  // Check if channel already exists for this agent
  const { data: existing } = await supabase
    .from("agent_channels")
    .select("id")
    .eq("agent_id", id)
    .eq("platform", platform)
    .single();

  let result;
  if (existing) {
    const { data, error } = await supabase
      .from("agent_channels")
      .update({ config: channelConfig, status: "pending" })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    result = data;
  } else {
    const { data, error } = await supabase
      .from("agent_channels")
      .insert({
        id: nanoid(),
        agent_id: id,
        platform,
        status: "pending",
        config: channelConfig,
      })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    result = data;
  }

  // Push config to the running OpenClaw instance via SSH.
  // Only runs if: agent is running, has an IP, and SSH key is configured.
  if (agent.status === "running" && agent.ip && process.env.PROVISION_SSH_PRIVATE_KEY) {
    pushChannelConfig(agent.ip, platform, channelConfig)
      .then(async () => {
        // Flip channel status to "connected" once SSH push succeeds
        await supabase
          .from("agent_channels")
          .update({ status: "connected", connected_at: new Date().toISOString() })
          .eq("agent_id", id)
          .eq("platform", platform);
      })
      .catch((err) => {
        console.error(`[ssh] Failed to push ${platform} config to agent ${id}:`, err);
        // Keep status as "pending" — user can retry
      });
  }

  return NextResponse.json(result, { status: 201 });
}

// DELETE /api/agents/[id]/channels — disconnect a channel
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agent = await verifyOwnership(supabase, id, user.id);
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const { platform } = body;
  if (!platform) return NextResponse.json({ error: "Platform is required" }, { status: 400 });

  const { error } = await supabase
    .from("agent_channels")
    .delete()
    .eq("agent_id", id)
    .eq("platform", platform);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Remove channel config from OpenClaw via SSH
  if (agent.status === "running" && agent.ip && process.env.PROVISION_SSH_PRIVATE_KEY) {
    removeChannelConfig(agent.ip, platform).catch((err) => {
      console.error(`[ssh] Failed to remove ${platform} config from agent ${id}:`, err);
    });
  }

  return NextResponse.json({ success: true });
}
