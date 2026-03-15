import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sshExec } from "@/lib/ssh";

// GET /api/agents/[id]/gateway — fetch live gateway status via SSH
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
  if (!agent.ip || agent.status !== "running") {
    return NextResponse.json({ status: "stopped" });
  }

  try {
    // Get gateway status as JSON from OpenClaw
    const raw = await sshExec(agent.ip, "openclaw gateway status --json 2>/dev/null || openclaw gateway status 2>/dev/null || echo '{}'");

    // Try to parse JSON output first
    let parsed: Record<string, unknown> = {};
    try { parsed = JSON.parse(raw); } catch { /* text output fallback */ }

    // Also get system resource info
    const memRaw = await sshExec(agent.ip,
      "free -m | awk '/^Mem:/{print $3\"/\"$2}' 2>/dev/null || echo '0/512'"
    ).catch(() => "0/512");
    const storageRaw = await sshExec(agent.ip,
      "df -m ~/.openclaw 2>/dev/null | tail -1 | awk '{print $3\"/\"$2}' || df -m / 2>/dev/null | tail -1 | awk '{print $3\"/\"$2}' || echo '0/20480'"
    ).catch(() => "0/20480");
    const uptimeRaw = await sshExec(agent.ip,
      "systemctl show openclaw --property=ActiveEnterTimestamp 2>/dev/null | cut -d= -f2 || echo ''"
    ).catch(() => "");

    // Parse memory
    const [memUsed, memTotal] = memRaw.split("/").map(Number);
    // Parse storage
    const [stgUsed, stgTotal] = storageRaw.split("/").map(Number);

    // Calculate uptime in seconds from systemd timestamp
    let uptimeSecs: number | undefined;
    if (uptimeRaw && uptimeRaw.trim()) {
      try {
        const startTime = new Date(uptimeRaw.trim()).getTime();
        if (!isNaN(startTime)) {
          uptimeSecs = Math.floor((Date.now() - startTime) / 1000);
        }
      } catch { /* ignore */ }
    }

    return NextResponse.json({
      status: (parsed.status as string) || "running",
      version: (parsed.version as string) || undefined,
      uptime: parsed.uptime as string | undefined,
      uptimeSecs,
      avgResponseMs: parsed.avgResponseMs as number | undefined,
      memoryMb: isNaN(memUsed) ? undefined : memUsed,
      memoryLimitMb: isNaN(memTotal) ? undefined : memTotal,
      storageMb: isNaN(stgUsed) ? undefined : stgUsed,
      storageLimitMb: isNaN(stgTotal) ? undefined : stgTotal,
    });
  } catch {
    return NextResponse.json({ status: "error" });
  }
}
