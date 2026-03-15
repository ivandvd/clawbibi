import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPayTabsApproved, parsePayTabsCartId } from "@/lib/billing/paytabs";
import { PLANS } from "@/lib/billing/plans";

// POST /api/billing/webhook/paytabs — PayTabs IPN (Instant Payment Notification)
// PayTabs sends this after a payment is processed.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  console.log("[paytabs-webhook] Received IPN:", JSON.stringify(body));

  // Verify payment was approved
  if (!isPayTabsApproved(body)) {
    const result = body.payment_result as Record<string, string> | undefined;
    console.warn(`[paytabs-webhook] Payment not approved: status=${result?.response_status}`);
    return NextResponse.json({ received: true });
  }

  // Extract plan and userId from cart_id
  const cartId = body.cart_id as string;
  if (!cartId) {
    return NextResponse.json({ error: "Missing cart_id" }, { status: 400 });
  }

  const parsed = parsePayTabsCartId(cartId);
  if (!parsed || !PLANS[parsed.plan as keyof typeof PLANS]) {
    console.error(`[paytabs-webhook] Could not parse cart_id: ${cartId}`);
    return NextResponse.json({ error: "Invalid cart_id" }, { status: 400 });
  }

  const { plan, userId } = parsed;

  // Set plan + expiry (30 days from now for one-time payment)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const db = createAdminClient();
  await db
    .from("profiles")
    .update({
      plan,
      plan_expires_at: expiresAt.toISOString(),
    })
    .eq("id", userId);

  console.log(`[paytabs-webhook] Updated plan to "${plan}" for user ${userId}, expires ${expiresAt.toISOString()}`);

  return NextResponse.json({ received: true });
}
