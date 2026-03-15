import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getWhatsAppQR } from "@/lib/ssh";

// GET /api/agents/[id]/channels/whatsapp/qr
// Reads the QR / status file written by the Baileys daemon on the agent server.
// Responses:
//   { status: "pending" }                    — daemon starting, no QR yet
//   { status: "qr", dataUrl: "data:..." }    — QR ready to display
//   { status: "connected" }                  — successfully linked
//   { status: "logged_out" }                 — user logged out of Baileys
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: agent } = await supabase
    .from("agents")
    .select("ip, status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!agent.ip || agent.status !== "running") {
    return NextResponse.json({ status: "pending" });
  }

  const content = await getWhatsAppQR(agent.ip);

  if (!content) return NextResponse.json({ status: "pending" });
  if (content === "connected") return NextResponse.json({ status: "connected" });
  if (content === "logged_out") return NextResponse.json({ status: "logged_out" });

  // Content is a data URL (data:image/png;base64,...)
  return NextResponse.json({ status: "qr", dataUrl: content });
}
