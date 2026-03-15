"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function RefundPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f6f9fa]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-[#e5e7eb]" dir="ltr">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-8 h-8" />
            <span className="font-bold text-lg text-[#1a1a2e]" translate="no">clawbibi</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 animate-fade-up">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Refund Policy</h1>
        <p className="text-sm text-[#949aa0] mb-8">Last updated: March 2026</p>

        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 space-y-6 text-sm text-[#4a4a5a] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[#1a1a2e] mb-2">1. Subscription Cancellation</h2>
            <p>You may cancel your Clawbibi subscription at any time. Upon cancellation, your plan remains active until the end of the current billing period. No further charges will be made after cancellation.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1a1a2e] mb-2">2. Refund Eligibility</h2>
            <p>We offer a <strong>7-day money-back guarantee</strong> for first-time subscribers. If you are not satisfied with your subscription within the first 7 days, contact us at <a href="mailto:hello@clawbibi.cloud" className="text-[#de1b23] hover:underline">hello@clawbibi.cloud</a> for a full refund.</p>
            <p className="mt-2">After 7 days, subscriptions are non-refundable. Partial refunds for unused portions of a billing cycle are not provided.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1a1a2e] mb-2">3. Exceptions</h2>
            <p>Refunds may be considered on a case-by-case basis for technical issues that prevented you from using the service. Please contact our support team with details.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1a1a2e] mb-2">4. How to Request a Refund</h2>
            <p>To request a refund, email us at <a href="mailto:hello@clawbibi.cloud" className="text-[#de1b23] hover:underline">hello@clawbibi.cloud</a> with your account email and reason for the refund. We will process eligible refunds within 5–10 business days.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1a1a2e] mb-2">5. Contact</h2>
            <p>For any billing questions, contact us at <a href="mailto:hello@clawbibi.cloud" className="text-[#de1b23] hover:underline">hello@clawbibi.cloud</a>.</p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-[#949aa0] hover:text-[#de1b23] transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
