import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sshExec } from "@/lib/ssh";

interface ActivityEntry {
  id: string;
  platform: string;
  sender: string;
  direction: "in" | "out";
  content: string;
  timestamp: string;
}

export interface AgentAnalytics {
  totalIn: number;
  totalOut: number;
  uniqueSenders: number;
  activeDays: number;
  platformBreakdown: { platform: string; count: number; pct: number }[];
  dailyMessages: { date: string; count: number }[];
}

// GET /api/agents/[id]/analytics?days=7
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const days = Math.min(Number(searchParams.get("days") ?? "7"), 30);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: agent } = await supabase
    .from("agents")
    .select("ip, status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!agent.ip || agent.status !== "running") {
    return NextResponse.json(emptyAnalytics(days));
  }

  try {
    const raw = await sshExec(
      agent.ip,
      `openclaw logs --last=500 --json 2>/dev/null || echo '[]'`
    );

    let entries: ActivityEntry[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) entries = parsed;
    } catch {
      // ignore
    }

    const cutoff = Date.now() - days * 86400000;
    const filtered = entries.filter(
      (e) => new Date(e.timestamp).getTime() >= cutoff
    );

    // Platform breakdown
    const platformCounts: Record<string, number> = {};
    const senders = new Set<string>();
    const activeDaySet = new Set<string>();

    for (const e of filtered) {
      const p = (e.platform || "unknown").toLowerCase();
      platformCounts[p] = (platformCounts[p] ?? 0) + 1;
      if (e.sender) senders.add(e.sender);
      activeDaySet.add(e.timestamp.slice(0, 10));
    }

    const totalMessages = filtered.length;
    const platformBreakdown = Object.entries(platformCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([platform, count]) => ({
        platform,
        count,
        pct: totalMessages > 0 ? Math.round((count / totalMessages) * 100) : 0,
      }));

    // Daily messages (last N days)
    const dailyMessages: { date: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().slice(0, 10);
      const count = filtered.filter((e) => e.timestamp.startsWith(dateStr)).length;
      dailyMessages.push({
        date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        count,
      });
    }

    const totalIn = filtered.filter((e) => e.direction === "in").length;
    const totalOut = filtered.filter((e) => e.direction === "out").length;

    return NextResponse.json({
      totalIn,
      totalOut,
      uniqueSenders: senders.size,
      activeDays: activeDaySet.size,
      platformBreakdown,
      dailyMessages,
    } satisfies AgentAnalytics);
  } catch {
    return NextResponse.json(emptyAnalytics(days));
  }
}

function emptyAnalytics(days: number): AgentAnalytics {
  const dailyMessages = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    dailyMessages.push({
      date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      count: 0,
    });
  }
  return {
    totalIn: 0,
    totalOut: 0,
    uniqueSenders: 0,
    activeDays: 0,
    platformBreakdown: [],
    dailyMessages,
  };
}
