import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/billing/status — returns current user plan and subscription info
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, paddle_subscription_id, plan_expires_at")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    plan:                     profile?.plan ?? "none",
    paddleSubscriptionId:     profile?.paddle_subscription_id ?? null,
    planExpiresAt:            profile?.plan_expires_at ?? null,
  });
}
