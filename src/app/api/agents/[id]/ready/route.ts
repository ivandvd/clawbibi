import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// POST /api/agents/[id]/ready
// Called by the cloud-init script on the agent's server after OpenClaw starts.
// Flips the agent status from "creating" → "running".
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Verify the request comes from our provisioned server using a shared secret
  const secret = request.headers.get("x-provision-secret");
  const expectedSecret = process.env.PROVISION_WEBHOOK_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createAdminClient();

  const { error } = await db
    .from("agents")
    .update({ status: "running" })
    .eq("id", id)
    .eq("status", "creating"); // only flip if still in creating state

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`[ready] Agent ${id} is now running.`);
  return NextResponse.json({ ok: true });
}
