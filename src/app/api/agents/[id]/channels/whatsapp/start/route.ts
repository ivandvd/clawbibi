import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { startWhatsAppPairing } from "@/lib/ssh";
import { rateLimit } from "@/lib/rateLimit";

// POST /api/agents/[id]/channels/whatsapp/start
// Pushes the Baileys QR daemon to the agent and starts it in the background.
// The QR is then polled via GET /api/agents/[id]/channels/whatsapp/qr.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Rate-limit: max 3 WhatsApp pairing starts per user per 5 minutes
  const rl = rateLimit(`wa-start:${user.id}`, 3, 5 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { data: agent } = await supabase
    .from("agents")
    .select("ip, status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!agent.ip || agent.status !== "running") {
    return NextResponse.json({ error: "Agent is not running" }, { status: 400 });
  }

  try {
    await startWhatsAppPairing(agent.ip);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[wa-start] Failed for agent ${id}:`, err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
