import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";
import { provisionAgent } from "@/lib/provision";
import { getAgentLimit } from "@/lib/billing/plans";
import { rateLimit } from "@/lib/rateLimit";

// GET /api/agents — list user's agents
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: agents, error } = await supabase
    .from("agents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(agents || []);
}

// POST /api/agents — create new agent + trigger server provisioning
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate-limit: max 5 agent creates per user per hour
  const rl = rateLimit(`create-agent:${user.id}`, 5, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests — wait before creating another agent" },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt.getTime() - Date.now()) / 1000)) } }
    );
  }

  const body = await request.json();
  const { name, model, api_key } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // ── Plan limit check ─────────────────────────────────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const userPlan = profile?.plan ?? "none";
  const agentLimit = getAgentLimit(userPlan);

  const { count: agentCount } = await supabase
    .from("agents")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((agentCount ?? 0) >= agentLimit) {
    return NextResponse.json(
      {
        error: "Agent limit reached",
        plan: userPlan,
        limit: agentLimit,
        upgradeRequired: true,
      },
      { status: 403 }
    );
  }
  // ────────────────────────────────────────────────────────────────────────

  const id = nanoid(8);
  const subdomain = `${id}.clawbibi.app`;

  // Determine AI provider from model string
  const modelId = model || "claude-4.5";
  const apiKeys: Record<string, string> = {};
  if (api_key?.trim()) {
    if (modelId.startsWith("gpt")) apiKeys.openai = api_key.trim();
    else if (modelId.startsWith("gemini")) apiKeys.google = api_key.trim();
    else apiKeys.anthropic = api_key.trim();
  }

  const agent = {
    id,
    user_id: user.id,
    name: name.trim(),
    model: modelId,
    status: "creating",
    subdomain,
    provider: "hetzner",
    ...(api_key?.trim() ? { api_keys: apiKeys } : {}),
  };

  const { data, error } = await supabase
    .from("agents")
    .insert(agent)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Trigger server provisioning in the background (non-blocking)
  // Requires: HETZNER_API_KEY, CLOUDFLARE_API_KEY, CLOUDFLARE_ZONE_ID, SUPABASE_SERVICE_ROLE_KEY
  provisionAgent(id, modelId, subdomain, Object.keys(apiKeys).length ? apiKeys : undefined).catch((err) => {
    console.error(`Provisioning failed for agent ${id}:`, err);
  });

  return NextResponse.json(data);
}
