import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { pushChannelConfig } from "@/lib/ssh";

// POST /api/agents/[id]/ready
// Called by the cloud-init script on the agent's server after OpenClaw starts.
// Flips the agent status from "creating"/"provisioning" → "running",
// then auto-connects any pending channels that have a token.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const secret = request.headers.get("x-provision-secret");
  const expectedSecret = process.env.PROVISION_WEBHOOK_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createAdminClient();

  // Accept both "creating" and "provisioning" — provision.ts sets "provisioning" after IP is assigned
  const { error } = await db
    .from("agents")
    .update({ status: "running" })
    .eq("id", id)
    .in("status", ["creating", "provisioning"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`[ready] Agent ${id} is now running.`);

  // Auto-push any channels that were saved during creation (e.g. Telegram token)
  try {
    const { data: agent } = await db.from("agents").select("ip").eq("id", id).single();
    if (agent?.ip) {
      const { data: pending } = await db
        .from("agent_channels")
        .select("*")
        .eq("agent_id", id)
        .eq("status", "pending");

      for (const ch of pending ?? []) {
        const cfg = (ch.config ?? {}) as Record<string, string>;
        if (!cfg.token && !cfg.phone && !cfg.appToken) continue; // no credentials, skip
        try {
          await pushChannelConfig(agent.ip, ch.platform, cfg);
          await db.from("agent_channels")
            .update({ status: "connected", connected_at: new Date().toISOString() })
            .eq("id", ch.id);
          console.log(`[ready] Auto-connected ${ch.platform} for agent ${id}`);
        } catch (e) {
          console.error(`[ready] Failed to push ${ch.platform} for agent ${id}:`, e);
        }
      }
    }
  } catch (e) {
    // Non-fatal — agent is running even if channel push fails
    console.error(`[ready] Channel auto-push error for agent ${id}:`, e);
  }

  return NextResponse.json({ ok: true });
}
