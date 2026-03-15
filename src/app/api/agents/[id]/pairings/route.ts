import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sshExec } from "@/lib/ssh";

// GET /api/agents/[id]/pairings — list pending pairing requests
export async function GET(
  _req: Request,
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
  if (!agent.ip || agent.status !== "running") return NextResponse.json([]);

  try {
    const raw = await sshExec(agent.ip, "openclaw pairing list --json 2>/dev/null || echo '[]'");
    let pairings: unknown[] = [];
    try { pairings = JSON.parse(raw); } catch { /* empty */ }
    if (!Array.isArray(pairings)) pairings = [];
    return NextResponse.json(pairings);
  } catch {
    return NextResponse.json([]);
  }
}
