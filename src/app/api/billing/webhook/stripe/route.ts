import { NextResponse } from "next/server";
import { getStripe } from "@/lib/billing/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

// Stripe requires the raw body for webhook signature verification.
export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = createAdminClient();

  switch (event.type) {
    // ── Subscription created or renewed ───────────────────────────────────
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      const plan = sub.metadata?.plan ?? "byok";
      const isActive = sub.status === "active" || sub.status === "trialing";

      const { data: profile } = await db
        .from("profiles")
        .select("id, plan")
        .eq("stripe_customer_id", customerId)
        .single();

      await db
        .from("profiles")
        .update({
          plan:                   isActive ? plan : "none",
          stripe_subscription_id: sub.id,
          // current_period_end moved to SubscriptionItem in Stripe SDK v20+
          plan_expires_at:        isActive && sub.items.data[0]?.current_period_end
            ? new Date(sub.items.data[0].current_period_end * 1000).toISOString()
            : null,
        })
        .eq("stripe_customer_id", customerId);

      // Grant $20 monthly credits when Managed plan activates or renews
      if (isActive && plan === "managed" && profile) {
        const wasAlreadyManaged = profile.plan === "managed";
        // Grant on new activation or on invoice.paid renewal (handled below)
        if (!wasAlreadyManaged) {
          await db.rpc("add_credits", {
            p_user_id:    profile.id,
            p_amount:     20,
            p_type:       "monthly_grant",
            p_description: "Managed plan monthly Claude API credits",
          });
          console.log(`[stripe-webhook] Granted $20 credits to user ${profile.id} (new Managed plan)`);
        }
      }

      console.log(`[stripe-webhook] Subscription ${sub.id} → plan="${plan}", status="${sub.status}"`);
      break;
    }

    // ── Subscription cancelled ────────────────────────────────────────────
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;

      await db
        .from("profiles")
        .update({ plan: "none", stripe_subscription_id: null, plan_expires_at: null })
        .eq("stripe_customer_id", customerId);

      console.log(`[stripe-webhook] Subscription ${sub.id} deleted → plan reset to "none"`);
      break;
    }

    // ── Invoice paid — grant monthly credits on Managed plan renewal ─────
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      // Only for subscription renewals (not the first invoice, already handled above)
      if (invoice.billing_reason === "subscription_cycle") {
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          const { data: profile } = await db
            .from("profiles")
            .select("id, plan")
            .eq("stripe_customer_id", customerId)
            .single();
          if (profile?.plan === "managed") {
            await db.rpc("add_credits", {
              p_user_id:    profile.id,
              p_amount:     20,
              p_type:       "monthly_grant",
              p_description: "Managed plan monthly Claude API credits renewal",
            });
            console.log(`[stripe-webhook] Renewed $20 credits for user ${profile.id}`);
          }
        }
      }
      break;
    }

    // ── Payment failed ────────────────────────────────────────────────────
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
      if (customerId) {
        console.warn(`[stripe-webhook] Payment failed for customer ${customerId}`);
        // Optionally: send notification email, downgrade after grace period, etc.
      }
      break;
    }

    default:
      // Unhandled event type — that's fine
      break;
  }

  return NextResponse.json({ received: true });
}
