"use client";

import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Try Clawbibi with limited access.",
    features: [
      "1 agent (demo mode)",
      "Community support",
      "Basic web interface",
    ],
    cta: "Get Started Free",
    ctaHref: "/login",
    highlight: false,
  },
  {
    id: "byok",
    name: "Cloud BYOK",
    price: "$19",
    period: "/month",
    description: "Bring your own Anthropic API key and deploy your agent to the cloud.",
    features: [
      "1 cloud-hosted agent",
      "Bring your own Anthropic API key",
      "Custom subdomain (yourname.clawbibi.cloud)",
      "WhatsApp & Telegram channels",
      "24/7 uptime",
      "Email support",
    ],
    cta: "Start BYOK Plan",
    ctaHref: "/login",
    highlight: false,
  },
  {
    id: "managed",
    name: "Cloud Managed",
    price: "$49",
    period: "/month",
    description: "We handle everything — hosting, AI credits, and infrastructure.",
    features: [
      "Up to 3 cloud-hosted agents",
      "$20 Claude API credits included/month",
      "Custom subdomain per agent",
      "WhatsApp, Telegram & more channels",
      "Priority support",
      "Usage analytics & logs",
    ],
    cta: "Start Managed Plan",
    ctaHref: "/login",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure, SLAs, and custom integrations for your business.",
    features: [
      "Unlimited agents",
      "Dedicated hosting",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated account manager",
      "Volume discounts",
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:hello@clawbibi.cloud",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f6f9fa]">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-8 h-8" />
            <span className="font-bold text-lg text-[#1a1a2e]" translate="no">clawbibi</span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-[#de1b23] hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center px-6">
        <h1 className="text-4xl font-bold text-[#1a1a2e] mb-3">Simple, transparent pricing</h1>
        <p className="text-[#4a4a5a] text-lg max-w-xl mx-auto">
          Deploy AI agents to the cloud in minutes. No hidden fees. Cancel anytime.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl border p-6 flex flex-col bg-white ${
              plan.highlight
                ? "border-[#de1b23] shadow-lg shadow-red-100"
                : "border-[#e5e7eb]"
            }`}
          >
            {plan.highlight && (
              <span className="text-xs font-semibold text-[#de1b23] uppercase tracking-wide mb-3">
                Most Popular
              </span>
            )}
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-1">{plan.name}</h2>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold text-[#1a1a2e]">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-[#949aa0] mb-1">{plan.period}</span>
              )}
            </div>
            <p className="text-sm text-[#4a4a5a] mb-5 leading-relaxed">{plan.description}</p>

            <ul className="space-y-2 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#4a4a5a]">
                  <svg className="w-4 h-4 text-[#de1b23] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref}
              className={`text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${
                plan.highlight
                  ? "bg-[#de1b23] text-white hover:bg-[#c4151c]"
                  : "bg-[#f6f9fa] border border-[#e5e7eb] text-[#1a1a2e] hover:bg-[#eff2f5]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 text-center">Frequently asked questions</h2>
        <div className="space-y-5 text-sm text-[#4a4a5a]">
          <div>
            <p className="font-semibold text-[#1a1a2e] mb-1">What is BYOK?</p>
            <p>Bring Your Own Key — you provide your Anthropic API key and we host and run the agent for you. You pay us $19/mo for hosting and pay Anthropic directly for API usage.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a2e] mb-1">Can I cancel anytime?</p>
            <p>Yes. Cancel from your billing settings at any time. Your plan stays active until the end of the billing period with no extra charges.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a2e] mb-1">Do you offer refunds?</p>
            <p>We offer a 7-day money-back guarantee for first-time subscribers. See our <Link href="/refund" className="text-[#de1b23] hover:underline">Refund Policy</Link> for details.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a2e] mb-1">What payment methods are accepted?</p>
            <p>We accept all major credit and debit cards via Paddle, our payment provider. Paddle supports payments from over 200 countries.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] py-8 text-center text-xs text-[#949aa0]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/privacy" className="hover:text-[#de1b23] transition-colors">Privacy</Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:text-[#de1b23] transition-colors">Terms</Link>
          <span>&middot;</span>
          <Link href="/refund" className="hover:text-[#de1b23] transition-colors">Refund Policy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Clawbibi. All rights reserved.</p>
      </footer>
    </div>
  );
}
