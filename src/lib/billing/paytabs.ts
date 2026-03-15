// PayTabs payment gateway — for Arab payments (Mada, STC Pay, KNET, Fawry, Apple Pay).
// Docs: https://support.paytabs.com/en/support/solutions/articles/60000709791
//
// Required env vars:
//   PAYTABS_PROFILE_ID   — merchant profile ID (numeric)
//   PAYTABS_SERVER_KEY   — server key from PayTabs dashboard
//   PAYTABS_REGION       — "SA" | "AE" | "EG" | "JO" | "OM" | "QA" | "BH" | "KW" | "PK" | "global"

const REGION_URLS: Record<string, string> = {
  SA:     "https://secure.paytabs.sa",
  AE:     "https://secure.paytabs.com",
  EG:     "https://secure-egypt.paytabs.com",
  JO:     "https://secure-jordan.paytabs.com",
  OM:     "https://secure-oman.paytabs.com",
  QA:     "https://secure-qatar.paytabs.com",
  BH:     "https://secure-bahrain.paytabs.com",
  KW:     "https://secure-kuwait.paytabs.com",
  PK:     "https://secure-pakistan.paytabs.com",
  global: "https://secure.paytabs.com",
};

function getBaseUrl(): string {
  const region = process.env.PAYTABS_REGION ?? "SA";
  return REGION_URLS[region] ?? REGION_URLS.SA;
}

export interface PayTabsCreateRequest {
  cartId: string;       // unique ID — we use "{plan}_{userId}_{timestamp}"
  amount: number;       // e.g. 15
  currency: string;     // e.g. "USD" or "SAR"
  description: string;  // e.g. "Clawbibi Basic Plan"
  customerEmail: string;
  customerName: string;
  returnUrl: string;    // where PayTabs redirects user after payment
  callbackUrl: string;  // our webhook IPN endpoint
}

export interface PayTabsCreateResponse {
  tran_ref: string;
  redirect_url: string;
}

/**
 * Create a PayTabs hosted payment page.
 * Returns the redirect URL the user should be sent to.
 */
export async function createPayTabsPayment(
  req: PayTabsCreateRequest
): Promise<PayTabsCreateResponse> {
  const profileId = process.env.PAYTABS_PROFILE_ID;
  const serverKey  = process.env.PAYTABS_SERVER_KEY;

  if (!profileId || !serverKey) {
    throw new Error("PAYTABS_PROFILE_ID or PAYTABS_SERVER_KEY is not set.");
  }

  const body = {
    profile_id:    Number(profileId),
    tran_type:     "sale",
    tran_class:    "ecom",
    cart_id:       req.cartId,
    cart_amount:   req.amount,
    cart_currency: req.currency,
    cart_description: req.description,
    customer_details: {
      name:  req.customerName,
      email: req.customerEmail,
    },
    return:   req.returnUrl,
    callback: req.callbackUrl,
  };

  const res = await fetch(`${getBaseUrl()}/payment/request`, {
    method: "POST",
    headers: {
      authorization: serverKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayTabs error ${res.status}: ${text}`);
  }

  const data = await res.json();

  if (!data.redirect_url) {
    throw new Error(`PayTabs did not return redirect_url: ${JSON.stringify(data)}`);
  }

  return { tran_ref: data.tran_ref, redirect_url: data.redirect_url };
}

/**
 * Verify a PayTabs IPN callback is valid.
 * Simple status check — PayTabs sends "A" for Approved.
 */
export function isPayTabsApproved(body: Record<string, unknown>): boolean {
  const result = body.payment_result as Record<string, string> | undefined;
  return result?.response_status === "A";
}

/**
 * Extract plan and userId from our cart_id format: "{plan}_{userId}_{timestamp}"
 */
export function parsePayTabsCartId(cartId: string): { plan: string; userId: string } | null {
  const parts = cartId.split("_");
  if (parts.length < 3) return null;
  // last part is timestamp, second-to-last is end of userId (UUID has hyphens but we join with _)
  // Format: basic_<uuid>_<ts>  → parts[0] = plan, parts[1..n-1] = uuid parts + ts
  const plan = parts[0];
  const ts = parts[parts.length - 1];
  const userId = parts.slice(1, -1).join("_");
  if (!plan || !userId || !ts) return null;
  return { plan, userId };
}
