import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deprovisionAgent } from "@/lib/provision";

// POST /api/agents/[id]/stop — stop and delete the agent's server
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: agent } = await supabase
    .from("agents")
    .select("id, server_id, subdomain")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Update status immediately so UI reflects the change
  await supabase.from("agents").update({ status: "stopping" }).eq("id", id);

  // Tear down server + DNS in the background
  deprovisionAgent(id, agent.server_id, agent.subdomain).catch(console.error);

  return NextResponse.json({ ok: true });
}

// DELETE /api/agents/[id] — fully delete the agent record + server
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: agent } = await supabase
    .from("agents")
    .select("id, server_id, subdomain")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete agent from DB (cascades to channels, skills, sessions)
  await supabase.from("agents").delete().eq("id", id);

  // Tear down server + DNS in the background
  deprovisionAgent(id, agent.server_id, agent.subdomain).catch(console.error);

  return NextResponse.json({ ok: true });
}
