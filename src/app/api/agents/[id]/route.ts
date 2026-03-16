import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { pushApiKeys, pushSoulMd, pushModelConfig, pushSkillsConfig, pushMemoryMd, pushHeartbeatMd } from "@/lib/ssh";
import { deprovisionAgent } from "@/lib/provision";

// GET /api/agents/[id] — get agent details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: agent, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  return NextResponse.json(agent);
}

// PATCH /api/agents/[id] — update agent
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Separate SSH-synced fields from plain DB fields
  const { api_keys, soul_md, skills, memory_md, heartbeat_md, ...dbFields } = body;

  const { data: agent, error } = await supabase
    .from("agents")
    .update({
      ...dbFields,
      ...(api_keys    !== undefined ? { api_keys }    : {}),
      ...(soul_md     !== undefined ? { soul_md }     : {}),
      ...(skills      !== undefined ? { skills }      : {}),
      ...(memory_md   !== undefined ? { memory_md }   : {}),
      ...(heartbeat_md !== undefined ? { heartbeat_md } : {}),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const sshReady = agent.status === "running" && agent.ip && process.env.PROVISION_SSH_PRIVATE_KEY;

  if (sshReady) {
    // Push API keys → systemd drop-in env vars
    if (api_keys) {
      const keyMap: Record<string, string> = {};
      if (api_keys.anthropic) keyMap.ANTHROPIC_API_KEY = api_keys.anthropic;
      if (api_keys.openai)    keyMap.OPENAI_API_KEY    = api_keys.openai;
      if (api_keys.google)    keyMap.GOOGLE_AI_API_KEY = api_keys.google;
      if (api_keys.groq)      keyMap.GROQ_API_KEY      = api_keys.groq;
      if (api_keys.brave)     keyMap.BRAVE_API_KEY     = api_keys.brave;
      if (Object.keys(keyMap).length > 0) {
        pushApiKeys(agent.ip, keyMap).catch((err) =>
          console.error(`[ssh] API keys push failed for agent ${id}:`, err)
        );
      }
    }

    // Push SOUL.md → ~/.openclaw/SOUL.md
    if (soul_md !== undefined) {
      pushSoulMd(agent.ip, soul_md).catch((err) =>
        console.error(`[ssh] SOUL.md push failed for agent ${id}:`, err)
      );
    }

    // Push model change → openclaw.json (instant model switch!)
    if (dbFields.model) {
      pushModelConfig(agent.ip, dbFields.model).catch((err) =>
        console.error(`[ssh] Model push failed for agent ${id}:`, err)
      );
    }

    // Push skills config → openclaw.json
    if (skills !== undefined) {
      pushSkillsConfig(agent.ip, skills).catch((err) =>
        console.error(`[ssh] Skills push failed for agent ${id}:`, err)
      );
    }

    // Push MEMORY.md → ~/.openclaw/MEMORY.md
    if (memory_md !== undefined) {
      pushMemoryMd(agent.ip, memory_md).catch((err) =>
        console.error(`[ssh] MEMORY.md push failed for agent ${id}:`, err)
      );
    }

    // Push HEARTBEAT.md → ~/.openclaw/HEARTBEAT.md (+ restart)
    if (heartbeat_md !== undefined) {
      pushHeartbeatMd(agent.ip, heartbeat_md).catch((err) =>
        console.error(`[ssh] HEARTBEAT.md push failed for agent ${id}:`, err)
      );
    }
  }

  return NextResponse.json(agent);
}

// DELETE /api/agents/[id] — fully delete the agent record + deprovision server
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: agent } = await supabase
    .from("agents")
    .select("id, server_id, subdomain")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete from DB first (cascades to channels, skills, sessions)
  await supabase.from("agents").delete().eq("id", id);

  // Tear down server + DNS in the background (non-blocking)
  deprovisionAgent(id, agent.server_id, agent.subdomain).catch(console.error);

  return NextResponse.json({ ok: true });
}
