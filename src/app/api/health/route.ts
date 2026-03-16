import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/health — public, no auth required
// Used by status page and external uptime monitors
export async function GET() {
  let dbStatus: "operational" | "degraded" = "degraded";

  try {
    const supabase = await createClient();
    // Cheap query to verify DB connectivity
    const { error } = await supabase.from("profiles").select("id", { count: "exact", head: true }).limit(1);
    if (!error) dbStatus = "operational";
  } catch { /* degraded */ }

  const ok = dbStatus === "operational";

  return NextResponse.json(
    { ok, db: dbStatus, ts: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
