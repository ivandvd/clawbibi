import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// GET /api/cron/expire-plans
// Called every hour by Vercel Cron (configured in vercel.json).
// Downgrades any PayTabs / one-time plans whose plan_expires_at has passed.
export async function GET(request: Request) {
  // Vercel sends the CRON_SECRET in the Authorization header
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createAdminClient();
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("profiles")
    .update({ plan: "none", plan_expires_at: null })
    .lt("plan_expires_at", now)
    .neq("plan", "none")
    .select("id, plan");

  if (error) {
    console.error("[cron/expire-plans] DB error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const count = data?.length ?? 0;
  console.log(`[cron/expire-plans] Expired ${count} plan(s) at ${now}`);

  return NextResponse.json({ expired: count, at: now });
}
