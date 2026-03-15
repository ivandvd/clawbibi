// Plan definitions — source of truth for agent limits and pricing.
// Prices are in USD/month.

export type PlanId = "none" | "byok" | "managed" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  priceUsd: number;
  agentLimit: number;
}

export const PLANS: Record<Exclude<PlanId, "none" | "enterprise">, Plan> = {
  byok:    { id: "byok",    name: "Cloud BYOK",    priceUsd: 19, agentLimit: 1 },
  managed: { id: "managed", name: "Cloud Managed", priceUsd: 49, agentLimit: 3 },
};

/** Returns the agent limit for a given plan. */
export function getAgentLimit(planId: PlanId | string): number {
  if (planId === "none" || !planId) {
    return Number(process.env.FREE_AGENT_LIMIT ?? 0);
  }
  if (planId === "enterprise") return Infinity;
  return PLANS[planId as Exclude<PlanId, "none" | "enterprise">]?.agentLimit ?? 0;
}

