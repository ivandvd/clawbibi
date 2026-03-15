import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createPaddlePortalSession } from "@/lib/billing/paddle";

// POST /api/billing/portal — open Paddle customer billing portal
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createAdminClient();
  const { data: profile } = await db
    .from("profiles")
    .select("paddle_customer_id")
    .eq("id", user.id)
    .single();

  if (!process.env.PADDLE_API_KEY || !profile?.paddle_customer_id) {
    return NextResponse.json({ error: "No active subscription found" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://clawbibi.cloud";
  const returnUrl = `${appUrl}/dashboard/billing`;

  const url = await createPaddlePortalSession(profile.paddle_customer_id, returnUrl);
  return NextResponse.json({ url });
}
