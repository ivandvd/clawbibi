import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface PaddleTransaction {
  id: string;
  created_at: string;
  details?: {
    totals?: {
      grand_total?: string;
      currency_code?: string;
    };
  };
  currency_code?: string;
  status: string;
  invoice_number?: string;
  payments?: Array<{ method_details?: { payment_method_type?: string } }>;
}

// GET /api/billing/invoices — returns Paddle transaction history for the current user
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("paddle_customer_id")
    .eq("id", user.id)
    .single();

  const customerId = profile?.paddle_customer_id;

  // No Paddle customer yet → return empty list (not an error)
  if (!customerId) {
    return NextResponse.json({ invoices: [] });
  }

  const paddleApiKey = process.env.PADDLE_API_KEY;
  if (!paddleApiKey) {
    return NextResponse.json({ invoices: [] });
  }

  try {
    const url = `https://api.paddle.com/transactions?customer_id=${encodeURIComponent(customerId)}&status=billed&per_page=20`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${paddleApiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({ invoices: [] });
    }

    const body = await res.json();
    const txns: PaddleTransaction[] = body?.data ?? [];

    const invoices = txns.map((txn) => ({
      id: txn.id,
      date: txn.created_at,
      amount: txn.details?.totals?.grand_total ?? "—",
      currency: txn.details?.totals?.currency_code ?? txn.currency_code ?? "USD",
      status: txn.status,
      invoiceNumber: txn.invoice_number ?? null,
    }));

    return NextResponse.json({ invoices });
  } catch {
    return NextResponse.json({ invoices: [] });
  }
}
