import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sshExec } from "@/lib/ssh";

const VALID_PLATFORMS = new Set(["telegram", "discord", "whatsapp", "signal", "slack"]);
// Allow numeric IDs, phone numbers (+digits), and short handles — block shell metacharacters
const IDENTIFIER_RE = /^[\w\-+@:.]{1,128}$/;

// POST /api/agents/[id]/pairings/deny
// Body: { platform: "telegram", identifier: "123456789" }
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { platform, identifier } = await req.json();

  if (!platform || !identifier) {
    return NextResponse.json({ error: "platform and identifier are required" }, { status: 400 });
  }
  if (!VALID_PLATFORMS.has(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }
  if (!IDENTIFIER_RE.test(String(identifier))) {
    return NextResponse.json({ error: "Invalid identifier format" }, { status: 400 });
  }

  const { data: agent } = await supabase
    .from("agents")
    .select("ip, status")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!agent.ip || agent.status !== "running") {
    return NextResponse.json({ error: "Agent is not running" }, { status: 400 });
  }

  try {
    // platform and identifier are validated above — safe to single-quote in shell
    await sshExec(agent.ip, `openclaw pairing deny '${platform}' '${identifier}' 2>/dev/null`);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
