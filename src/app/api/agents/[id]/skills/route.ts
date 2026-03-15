import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sshExec } from "@/lib/ssh";

export interface SkillEntry {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

// GET /api/agents/[id]/skills — list installed skills from OpenClaw
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
    .select("ip, status, skills")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // If agent is offline, return skills from DB config
  if (!agent.ip || agent.status !== "running") {
    const dbSkills = agent.skills?.builtin ?? {};
    return NextResponse.json(
      Object.entries(dbSkills).map(([id, enabled]) => ({
        id,
        name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        enabled: Boolean(enabled),
      }))
    );
  }

  try {
    const raw = await sshExec(agent.ip, "openclaw skills list --json 2>/dev/null || echo '[]'");
    let skills: SkillEntry[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) skills = parsed;
    } catch { /* fallback to DB */ }

    if (skills.length === 0 && agent.skills?.builtin) {
      const dbSkills = agent.skills.builtin as Record<string, boolean>;
      skills = Object.entries(dbSkills).map(([id, enabled]) => ({
        id,
        name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        enabled: Boolean(enabled),
      }));
    }

    return NextResponse.json(skills);
  } catch {
    return NextResponse.json([]);
  }
}

// PATCH /api/agents/[id]/skills — toggle a skill on/off
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { skillId, enabled } = await req.json();
  if (!skillId) return NextResponse.json({ error: "skillId required" }, { status: 400 });

  const { data: agent } = await supabase
    .from("agents")
    .select("ip, status, skills")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Persist to DB always (as source of truth)
  const updatedSkills = {
    ...(agent.skills ?? {}),
    builtin: {
      ...((agent.skills as Record<string, unknown> | null)?.builtin as Record<string, boolean> ?? {}),
      [skillId]: Boolean(enabled),
    },
  };

  await supabase
    .from("agents")
    .update({ skills: updatedSkills })
    .eq("id", id)
    .eq("user_id", user.id);

  // Push to live agent if running
  if (agent.ip && agent.status === "running") {
    try {
      const cmd = enabled
        ? `openclaw skills enable ${skillId} 2>/dev/null || true`
        : `openclaw skills disable ${skillId} 2>/dev/null || true`;
      await sshExec(agent.ip, cmd);
    } catch {
      // Non-fatal — DB is already updated
    }
  }

  return NextResponse.json({ ok: true });
}
