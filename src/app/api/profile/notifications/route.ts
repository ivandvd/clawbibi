import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/profile/notifications — return current notification prefs
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("profiles")
    .select("notif_weekly_digest, notif_agent_down, notif_billing")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    notifWeeklyDigest: data?.notif_weekly_digest ?? true,
    notifAgentDown:    data?.notif_agent_down    ?? true,
    notifBilling:      data?.notif_billing       ?? true,
  });
}

// PATCH /api/profile/notifications — update prefs
export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const update: Record<string, boolean> = {};

  if (typeof body.notifWeeklyDigest === "boolean") update.notif_weekly_digest = body.notifWeeklyDigest;
  if (typeof body.notifAgentDown    === "boolean") update.notif_agent_down    = body.notifAgentDown;
  if (typeof body.notifBilling      === "boolean") update.notif_billing       = body.notifBilling;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields" }, { status: 400 });
  }

  const { error } = await supabase.from("profiles").update(update).eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
