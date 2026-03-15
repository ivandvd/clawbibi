import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyPaddleWebhook } from "@/lib/billing/paddle";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("paddle-signature") ?? "";

  if (!verifyPaddleWebhook(rawBody, signature)) {
    console.error("[paddle-webhook] Signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { event_type: string; data: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const db = createAdminClient();
  const { event_type, data } = event;

  console.log(`[paddle-webhook] ${event_type}`);

  switch (event_type) {
    // ── Subscription activated or renewed ────────────────────────────────
    case "subscription.created":
    case "subscription.updated": {
      const customerId = data.customer_id as string;
      const status = data.status as string;
      const plan = (data.custom_data as Record<string, string>)?.plan ?? "byok";
      const isActive = status === "active" || status === "trialing";
      const scheduledChange = data.scheduled_change as { action?: string } | null;
      const isCanceling = scheduledChange?.action === "cancel";

      const currentPeriodEnd = (data.current_billing_period as { ends_at?: string } | null)?.ends_at;

      await db
        .from("profiles")
        .update({
          plan: isActive && !isCanceling ? plan : "none",
          paddle_subscription_id: data.id as string,
          plan_expires_at: isActive && currentPeriodEnd ? currentPeriodEnd : null,
        })
        .eq("paddle_customer_id", customerId);

      // Grant $20 credits for new Managed plan
      if (isActive && plan === "managed" && event_type === "subscription.created") {
        const { data: profile } = await db
          .from("profiles")
          .select("id")
          .eq("paddle_customer_id", customerId)
          .single();

        if (profile) {
          await db.rpc("add_credits", {
            p_user_id: profile.id,
            p_amount: 20,
            p_type: "monthly_grant",
            p_description: "Managed plan monthly Claude API credits",
          });
        }
      }
      break;
    }

    // ── Subscription cancelled ────────────────────────────────────────────
    case "subscription.canceled": {
      const customerId = data.customer_id as string;
      await db
        .from("profiles")
        .update({ plan: "none", paddle_subscription_id: null, plan_expires_at: null })
        .eq("paddle_customer_id", customerId);
      break;
    }

    // ── Transaction completed — grant monthly credits on renewal ─────────
    case "transaction.completed": {
      const customerId = data.customer_id as string;
      const origin = data.origin as string;
      if (origin === "subscription_recurring") {
        const { data: profile } = await db
          .from("profiles")
          .select("id, plan")
          .eq("paddle_customer_id", customerId)
          .single();

        if (profile?.plan === "managed") {
          await db.rpc("add_credits", {
            p_user_id: profile.id,
            p_amount: 20,
            p_type: "monthly_grant",
            p_description: "Managed plan monthly Claude API credits renewal",
          });
        }
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
