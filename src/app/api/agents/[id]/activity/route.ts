import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sshExec } from "@/lib/ssh";

export interface ActivityEntry {
  id: string;
  platform: string;
  sender: string;
  direction: "in" | "out";
  content: string;
  timestamp: string;
}

// GET /api/agents/[id]/activity?limit=20
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? "20"), 100);

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
    const raw = await sshExec(
      agent.ip,
      `openclaw logs --last=${limit} --json 2>/dev/null || tail -${limit * 3} ~/.openclaw/logs/activity.log 2>/dev/null || echo '[]'`
    );

    let entries: ActivityEntry[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) entries = parsed;
    } catch {
      // Try to parse line-by-line log format
      const lines = raw.split("\n").filter(Boolean).slice(-limit);
      entries = lines.map((line, i) => ({
        id: String(i),
        platform: "unknown",
        sender: "unknown",
        direction: "in" as const,
        content: line,
        timestamp: new Date().toISOString(),
      }));
    }

    return NextResponse.json(entries.slice(-limit));
  } catch {
    return NextResponse.json([]);
  }
}
