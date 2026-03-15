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

/** Returns Stripe Price ID from env for a given plan. */
export function getStripePriceId(planId: string): string {
  const map: Record<string, string | undefined> = {
    byok:    process.env.STRIPE_PRICE_BYOK,
    managed: process.env.STRIPE_PRICE_MANAGED,
  };
  const priceId = map[planId];
  if (!priceId) throw new Error(`STRIPE_PRICE_${planId.toUpperCase()} is not set.`);
  return priceId;
}
