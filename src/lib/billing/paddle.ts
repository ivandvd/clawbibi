import crypto from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const PADDLE_API_URL = "https://api.paddle.com";

function getPaddleApiKey(): string {
  const key = process.env.PADDLE_API_KEY;
  if (!key) throw new Error("PADDLE_API_KEY is not set");
  return key;
}

export function getPaddlePriceId(planId: string): string {
  const map: Record<string, string | undefined> = {
    byok: process.env.PADDLE_PRICE_BYOK,
    managed: process.env.PADDLE_PRICE_MANAGED,
  };
  const priceId = map[planId];
  if (!priceId) throw new Error(`PADDLE_PRICE_${planId.toUpperCase()} is not set`);
  return priceId;
}

export async function getOrCreatePaddleCustomer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: SupabaseClient<any>,
  userId: string,
  email: string,
  name?: string
): Promise<string> {
  const { data: profile } = await db
    .from("profiles")
    .select("paddle_customer_id")
    .eq("id", userId)
    .single();

  if (profile?.paddle_customer_id) return profile.paddle_customer_id;

  const res = await fetch(`${PADDLE_API_URL}/customers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaddleApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name: name || undefined }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Paddle createCustomer failed: ${JSON.stringify(data)}`);

  const customerId = data.data.id;
  await db.from("profiles").update({ paddle_customer_id: customerId }).eq("id", userId);
  return customerId;
}

export async function createPaddleCheckout(params: {
  priceId: string;
  customerId: string;
  successUrl: string;
  customData: Record<string, string>;
}): Promise<string> {
  const res = await fetch(`${PADDLE_API_URL}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaddleApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [{ price_id: params.priceId, quantity: 1 }],
      customer_id: params.customerId,
      custom_data: params.customData,
      checkout: { url: params.successUrl },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Paddle createTransaction failed: ${JSON.stringify(data)}`);
  return data.data.checkout.url;
}

export async function createPaddlePortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  const res = await fetch(`${PADDLE_API_URL}/customers/${customerId}/portal-sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaddleApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls: { general: { overview: returnUrl } } }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Paddle createPortalSession failed: ${JSON.stringify(data)}`);
  return data.data.urls.general.overview;
}

export function verifyPaddleWebhook(rawBody: string, signature: string): boolean {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) return false;

  // Paddle uses HMAC-SHA256 for webhook verification
  // Format: ts=timestamp;h1=hash
  const parts = signature.split(";");
  const tsPart = parts.find((p) => p.startsWith("ts="));
  const h1Part = parts.find((p) => p.startsWith("h1="));
  if (!tsPart || !h1Part) return false;

  const ts = tsPart.slice(3);
  const h1 = h1Part.slice(3);

  const signedPayload = `${ts}:${rawBody}`;
  const expectedHash = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(h1), Buffer.from(expectedHash));
}
