import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/billing/stripe";
import { createPaddlePortalSession } from "@/lib/billing/paddle";

// POST /api/billing/portal — open customer billing portal (Stripe or Paddle)
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createAdminClient();
  const { data: profile } = await db
    .from("profiles")
    .select("stripe_customer_id, paddle_customer_id")
    .eq("id", user.id)
    .single();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://clawbibi.cloud";
  const returnUrl = `${appUrl}/dashboard/billing`;

  // Prefer Paddle if configured and customer exists
  if (process.env.PADDLE_API_KEY && profile?.paddle_customer_id) {
    const url = await createPaddlePortalSession(profile.paddle_customer_id, returnUrl);
    return NextResponse.json({ url });
  }

  // Fall back to Stripe
  if (process.env.STRIPE_SECRET_KEY && profile?.stripe_customer_id) {
    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: returnUrl,
    });
    return NextResponse.json({ url: session.url });
  }

  return NextResponse.json({ error: "No active subscription found" }, { status: 400 });
}
