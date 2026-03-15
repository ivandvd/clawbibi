import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS, getStripePriceId } from "@/lib/billing/plans";
import { getStripe, getOrCreateStripeCustomer } from "@/lib/billing/stripe";
import { createPayTabsPayment } from "@/lib/billing/paytabs";

// POST /api/billing/checkout
// Body: { plan: "byok" | "managed" | "enterprise", method: "stripe" | "tap" }
// Returns: { url: string }  — redirect the user to this URL
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { plan: planId, method } = body;

  if (!planId || !PLANS[planId as keyof typeof PLANS]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PLANS[planId as keyof typeof PLANS];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://clawbibi.app";

  // ── Stripe ───────────────────────────────────────────────────────────────
  if (method === "stripe") {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
    }

    const db = createAdminClient();

    // Get profile for name
    const { data: profile } = await db
      .from("profiles")
      .select("name, email, stripe_customer_id")
      .eq("id", user.id)
      .single();

    const customerId = await getOrCreateStripeCustomer(
      db,
      user.id,
      profile?.email ?? user.email ?? "",
      profile?.name ?? undefined
    );

    const stripe = getStripe();
    let stripePriceId: string;
    try {
      stripePriceId = getStripePriceId(planId);
    } catch {
      return NextResponse.json(
        { error: `Stripe Price ID for "${planId}" is not configured. Set STRIPE_PRICE_${planId.toUpperCase()} in .env.` },
        { status: 503 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard/billing?success=stripe&plan=${planId}`,
      cancel_url:  `${appUrl}/dashboard/billing?canceled=true`,
      metadata: { userId: user.id, plan: planId },
      subscription_data: { metadata: { userId: user.id, plan: planId } },
    });

    return NextResponse.json({ url: session.url });
  }

  // ── Tap Payments (Gulf region) ────────────────────────────────────────────
  if (method === "tap") {
    if (!process.env.PAYTABS_PROFILE_ID || !process.env.PAYTABS_SERVER_KEY) {
      return NextResponse.json({ error: "Tap Payments is not configured" }, { status: 503 });
    }

    const db = createAdminClient();
    const { data: profile } = await db
      .from("profiles")
      .select("name, email")
      .eq("id", user.id)
      .single();

    const cartId = `${planId}_${user.id}_${Date.now()}`;

    const result = await createPayTabsPayment({
      cartId,
      amount:          plan.priceUsd,
      currency:        "USD",
      description:     `Clawbibi ${plan.name} Plan`,
      customerEmail:   profile?.email ?? user.email ?? "",
      customerName:    profile?.name  ?? "Clawbibi User",
      returnUrl:       `${appUrl}/dashboard/billing?success=tap&plan=${planId}`,
      callbackUrl:     `${appUrl}/api/billing/webhook/paytabs`,
    });

    return NextResponse.json({ url: result.redirect_url });
  }

  return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
}
