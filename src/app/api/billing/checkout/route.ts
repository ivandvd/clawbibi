import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS } from "@/lib/billing/plans";
import { getPaddlePriceId, getOrCreatePaddleCustomer, createPaddleCheckout } from "@/lib/billing/paddle";

// POST /api/billing/checkout
// Body: { plan: "byok" | "managed" | "enterprise" }
// Returns: { url: string }  — redirect the user to this URL
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { plan: planId } = body;

  if (!planId || !PLANS[planId as keyof typeof PLANS]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (!process.env.PADDLE_API_KEY) {
    return NextResponse.json({ error: "Paddle is not configured" }, { status: 503 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://clawbibi.cloud";

  const db = createAdminClient();
  const { data: profile } = await db
    .from("profiles")
    .select("name, email, paddle_customer_id")
    .eq("id", user.id)
    .single();

  let priceId: string;
  try {
    priceId = getPaddlePriceId(planId);
  } catch {
    return NextResponse.json(
      { error: `Paddle Price ID for "${planId}" is not configured.` },
      { status: 503 }
    );
  }

  const customerId = await getOrCreatePaddleCustomer(
    db,
    user.id,
    profile?.email ?? user.email ?? "",
    profile?.name ?? undefined
  );

  const checkoutUrl = await createPaddleCheckout({
    priceId,
    customerId,
    successUrl: `${appUrl}/dashboard/billing?success=paddle&plan=${planId}`,
    customData: { userId: user.id, plan: planId },
  });

  return NextResponse.json({ url: checkoutUrl });
}
