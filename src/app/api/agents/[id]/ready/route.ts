import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createDnsRecord } from "@/lib/cloudflare";
import { pushChannelConfig } from "@/lib/ssh";

// POST /api/agents/[id]/ready
// Called by the cloud-init script on the agent's server after OpenClaw starts.
// Receives the server's public IP, saves it, creates DNS, then auto-connects channels.
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

  // Parse IP from body (sent by cloud-init: {"status":"running","ip":"1.2.3.4"})
  let bodyIp: string | undefined;
  try {
    const body = await request.json();
    bodyIp = body?.ip || undefined;
  } catch { /* no body or not JSON */ }

  // Build update payload — save IP if provided
  const updatePayload: Record<string, string> = { status: "running" };
  if (bodyIp) updatePayload.ip = bodyIp;

  const { error } = await db
    .from("agents")
    .update(updatePayload)
    .eq("id", id)
    .in("status", ["creating", "provisioning"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`[ready] Agent ${id} is now running. IP: ${bodyIp ?? "unknown"}`);

  // Create DNS record now that we have the IP
  if (bodyIp) {
    try {
      const { data: agent } = await db.from("agents").select("subdomain").eq("id", id).single();
      if (agent?.subdomain) {
        await createDnsRecord(agent.subdomain, bodyIp);
        console.log(`[ready] DNS created: ${agent.subdomain} → ${bodyIp}`);
      }
    } catch (e) {
      // Non-fatal — agent is running, DNS can be retried
      console.error(`[ready] DNS creation failed for agent ${id}:`, e);
    }
  }

  // Auto-push any channels that were saved during creation (e.g. Telegram token)
  const ip = bodyIp;
  if (ip) {
    try {
      const { data: pending } = await db
        .from("agent_channels")
        .select("*")
        .eq("agent_id", id)
        .eq("status", "pending");

      for (const ch of pending ?? []) {
        const cfg = (ch.config ?? {}) as Record<string, string>;
        if (!cfg.token && !cfg.phone && !cfg.appToken) continue;
        try {
          await pushChannelConfig(ip, ch.platform, cfg);
          await db.from("agent_channels")
            .update({ status: "connected", connected_at: new Date().toISOString() })
            .eq("id", ch.id);
          console.log(`[ready] Auto-connected ${ch.platform} for agent ${id}`);
        } catch (e) {
          console.error(`[ready] Failed to push ${ch.platform} for agent ${id}:`, e);
        }
      }
    } catch (e) {
      console.error(`[ready] Channel auto-push error for agent ${id}:`, e);
    }
  }

  return NextResponse.json({ ok: true });
}
