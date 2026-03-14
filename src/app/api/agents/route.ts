import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/agents — list user's agents
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // For now, return empty array (agents will be stored in Supabase)
  // TODO: Replace with Drizzle query when DB is connected
  const { data: agents, error } = await supabase
    .from("agents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    // Table might not exist yet — return empty
    return NextResponse.json([]);
  }

  return NextResponse.json(agents || []);
}

// POST /api/agents — create new agent
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, model, channels } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Generate a simple ID
  const id = Math.random().toString(36).substring(2, 10);

  const agent = {
    id,
    user_id: user.id,
    name: name.trim(),
    model: model || "claude-4.5",
    status: "creating",
    subdomain: `${id}.dev.clawbibi.app`,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("agents")
    .insert(agent)
    .select()
    .single();

  if (error) {
    // If table doesn't exist, return mock data
    return NextResponse.json(agent);
  }

  return NextResponse.json(data || agent);
}
