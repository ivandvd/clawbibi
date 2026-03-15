"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

// ── Brand Logo SVGs ───────────────────────────────────────────────────────

function VisaLogo() {
  return (
    <svg viewBox="0 0 52 18" className="h-5 flex-shrink-0" aria-label="Visa">
      <rect width="52" height="18" rx="3" fill="#1A1F71" />
      <text x="26" y="13" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial" fontStyle="italic" letterSpacing="1">VISA</text>
    </svg>
  );
}
function MastercardLogo() {
  return (
    <svg viewBox="0 0 36 22" className="h-5 flex-shrink-0" aria-label="Mastercard">
      <circle cx="13" cy="11" r="10" fill="#EB001B" />
      <circle cx="23" cy="11" r="10" fill="#F79E1B" opacity="0.9" />
      <path d="M18 4.1a10 10 0 0 1 0 13.8A10 10 0 0 1 18 4.1z" fill="#FF5F00" />
    </svg>
  );
}
function AmexLogo() {
  return (
    <svg viewBox="0 0 56 18" className="h-5 flex-shrink-0" aria-label="Amex">
      <rect width="56" height="18" rx="3" fill="#016FD0" />
      <text x="28" y="13" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="800" fontFamily="Arial" letterSpacing="2">AMEX</text>
    </svg>
  );
}
function MadaLogo() {
  return (
    <svg viewBox="0 0 54 18" className="h-5 flex-shrink-0" aria-label="Mada">
      <rect width="54" height="18" rx="3" fill="#00A884" />
      <text x="27" y="13" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial">mada</text>
    </svg>
  );
}
function STCPayLogo() {
  return (
    <svg viewBox="0 0 66 18" className="h-5 flex-shrink-0" aria-label="STC Pay">
      <rect width="66" height="18" rx="3" fill="#7B2D8B" />
      <text x="33" y="13" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="700" fontFamily="Arial">STC Pay</text>
    </svg>
  );
}
function KNETLogo() {
  return (
    <svg viewBox="0 0 54 18" className="h-5 flex-shrink-0" aria-label="KNET">
      <rect width="54" height="18" rx="3" fill="#006DB7" />
      <text x="27" y="13" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial">KNET</text>
    </svg>
  );
}
function ApplePayLogo() {
  return (
    <svg viewBox="0 0 66 18" className="h-5 flex-shrink-0" aria-label="Apple Pay">
      <rect width="66" height="18" rx="3" fill="#000000" />
      <text x="33" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="400" fontFamily="-apple-system, Arial">Apple Pay</text>
    </svg>
  );
}

// ── Check icon ────────────────────────────────────────────────────────────

function CheckIcon({ className = "w-3 h-3", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={dark ? "#de1b23" : "currentColor"} strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ── Plan data ─────────────────────────────────────────────────────────────

type PlanId = "byok" | "managed" | "enterprise";

interface PlanMeta {
  id: PlanId;
  priceUSD: string | null;
  priceSAR: string | null;
  popular: boolean;
  dark: boolean;       // enterprise dark card
  ctaKey: "choosePlan" | "bookMeeting";
  features: string[];
  icon: React.ReactNode;
}

const PLAN_META: PlanMeta[] = [
  {
    id: "byok",
    priceUSD: "$19",
    priceSAR: "٦٩",
    popular: false,
    dark: false,
    ctaKey: "choosePlan",
    features: ["featureByok1", "featureByok2", "featureByok3", "featureByok4", "featureByok5"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    id: "managed",
    priceUSD: "$49",
    priceSAR: "١٧٩",
    popular: true,
    dark: false,
    ctaKey: "choosePlan",
    features: ["featureManaged1", "featureManaged2", "featureManaged3", "featureManaged4", "featureManaged5", "featureManaged6"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    id: "enterprise",
    priceUSD: null,
    priceSAR: null,
    popular: false,
    dark: true,
    ctaKey: "bookMeeting",
    features: ["featureEnterprise1", "featureEnterprise2", "featureEnterprise3", "featureEnterprise4", "featureEnterprise5", "featureEnterprise6"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

type PayMethod = "stripe" | "tap";

// ── Main page ─────────────────────────────────────────────────────────────

// ── Plan hierarchy helpers ─────────────────────────────────────────────────

const PLAN_RANK: Record<string, number> = { none: 0, byok: 1, managed: 2, enterprise: 3 };
const PLAN_AGENT_LIMIT: Record<string, number> = { none: 0, byok: 1, managed: 3, enterprise: Infinity };

function BillingPageInner() {
  const { t, isRTL } = useLanguage();
  const searchParams = useSearchParams();

  const [currentPlan, setCurrentPlan]     = useState<string>("none");
  const [hasStripeSub, setHasStripeSub]   = useState(false);
  const [loadingPlan, setLoadingPlan]     = useState(true);
  const [agentCount, setAgentCount]       = useState(0);
  const [payMethod, setPayMethod]         = useState<PayMethod>("stripe");
  const [checkingOut, setCheckingOut]     = useState<string | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);
  const [banner, setBanner]               = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [downgradeModal, setDowngradeModal] = useState<{ targetId: string } | null>(null);

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const plan = searchParams.get("plan");
    if (success === "stripe" || success === "tap") {
      const planName = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "";
      setBanner({
        type: "success",
        msg: isRTL
          ? `باقة ${planName} أصبحت نشطة! قد يستغرق التحديث ثوانٍ.`
          : `Your ${planName} plan is now active! It may take a few seconds to update.`,
      });
    } else if (canceled) {
      setBanner({ type: "error", msg: t("billing", "canceledBanner") });
    }
  }, [searchParams, isRTL, t]);

  // Fetch billing status + agent count in parallel
  useEffect(() => {
    Promise.all([
      fetch("/api/billing/status").then(r => r.ok ? r.json() : null).catch(() => null),
      fetch("/api/agents").then(r => r.ok ? r.json() : []).catch(() => []),
    ]).then(([status, agents]) => {
      if (status) {
        setCurrentPlan(status.plan ?? "none");
        setHasStripeSub(!!status.stripeSubscriptionId);
      }
      setAgentCount(Array.isArray(agents) ? agents.length : 0);
      setLoadingPlan(false);
    });
  }, []);

  const handleCheckout = async (planId: string) => {
    setCheckingOut(planId);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, method: payMethod }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBanner({ type: "error", msg: data.error ?? (isRTL ? "فشل الدفع. حاول مجدداً." : "Checkout failed. Please try again.") });
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setBanner({ type: "error", msg: isRTL ? "حدث خطأ. حاول مجدداً." : "Something went wrong. Please try again." });
    } finally {
      setCheckingOut(null);
    }
  };

  const handleManageBilling = async () => {
    setManagingBilling(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setBanner({ type: "error", msg: data.error ?? (isRTL ? "تعذّر فتح بوابة الفواتير." : "Could not open billing portal.") });
    } catch {
      setBanner({ type: "error", msg: isRTL ? "حدث خطأ." : "Something went wrong." });
    } finally {
      setManagingBilling(false);
    }
  };

  const planLabel = (id: string) => {
    if (id === "none") return t("billing", "freePlan");
    if (id === "byok") return t("billing", "byok");
    if (id === "managed") return t("billing", "managed");
    if (id === "enterprise") return t("billing", "enterprise");
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  // Determine relationship between current plan and a target plan
  const getPlanRelation = (targetId: string): "current" | "upgrade" | "downgrade" | "new" => {
    if (currentPlan === targetId) return "current";
    if (currentPlan === "none") return "new";
    const fromRank = PLAN_RANK[currentPlan] ?? 0;
    const toRank   = PLAN_RANK[targetId]    ?? 0;
    return toRank > fromRank ? "upgrade" : "downgrade";
  };

  // Handle plan card CTA click (non-enterprise)
  const handlePlanClick = (planId: string) => {
    const relation = getPlanRelation(planId);
    if (relation === "current") return;
    if (relation === "downgrade") {
      setDowngradeModal({ targetId: planId });
    } else {
      // new or upgrade
      handleCheckout(planId);
    }
  };

  // ── Downgrade confirmation modal ──────────────────────────────────────────
  const DowngradeModal = () => {
    if (!downgradeModal) return null;
    const { targetId } = downgradeModal;
    const targetName = planLabel(targetId);
    const targetLimit = PLAN_AGENT_LIMIT[targetId] ?? 0;
    const agentsToRemove = Math.max(0, agentCount - targetLimit);
    const blocked = agentsToRemove > 0;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#e5e7eb]">
          {/* Icon + title */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#1a1a2e]">{t("billing", "downgradeModalTitle")}</h3>
              <p className="text-xs text-[#949aa0]">{planLabel(currentPlan)} → {targetName}</p>
            </div>
          </div>

          {/* Agent over-limit warning */}
          {blocked && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm font-semibold text-red-700 mb-1">
                {isRTL
                  ? `لديك ${agentCount} مساعدين. ${targetName} تسمح بـ ${targetLimit} فقط.`
                  : `You have ${agentCount} agents. ${targetName} allows ${targetLimit}.`}
              </p>
              <p className="text-xs text-red-600">
                {isRTL
                  ? `يرجى حذف ${agentsToRemove} مساعد قبل التخفيض.`
                  : `Please remove ${agentsToRemove} agent${agentsToRemove > 1 ? "s" : ""} before downgrading.`}
              </p>
            </div>
          )}

          {/* Billing period note */}
          {!blocked && (
            <p className="text-sm text-[#6b6b7b] mb-5 leading-relaxed">
              {t("billing", "downgradeNote")}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setDowngradeModal(null)}
              className="flex-1 py-2.5 rounded-xl border-2 border-[#e5e7eb] text-sm font-semibold text-[#1a1a2e] hover:border-[#de1b23] hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200"
            >
              {t("billing", "cancelAction")}
            </button>
            <button
              onClick={() => { setDowngradeModal(null); handleManageBilling(); }}
              disabled={blocked || managingBilling}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 hover:shadow-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {managingBilling
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : t("billing", "goToPortal")
              }
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Downgrade modal */}
      <DowngradeModal />

      {/* Banner */}
      {banner && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-fade-up ${
          banner.type === "success"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {banner.type === "success" ? (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          )}
          {banner.msg}
          <button onClick={() => setBanner(null)} className="ml-auto text-current opacity-50 hover:opacity-100 transition-opacity">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("billing", "title")}</h1>
            <p className="text-[#949aa0] text-sm">{t("billing", "subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Current Plan Card — only shown when user has an active plan */}
      {(loadingPlan || currentPlan !== "none") && (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#de1b23]/10 text-[#de1b23]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#949aa0] uppercase tracking-wider font-medium">{t("billing", "currentPlan")}</p>
                {loadingPlan
                  ? <div className="h-6 w-24 bg-[#f6f9fa] rounded animate-pulse mt-0.5" />
                  : <p className="text-xl font-bold text-[#1a1a2e] mt-0.5">{planLabel(currentPlan)}</p>
                }
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-emerald-600 font-medium">{t("billing", "activeBadge")}</span>
              </div>
              {hasStripeSub && (
                <button
                  onClick={handleManageBilling}
                  disabled={managingBilling}
                  className="px-4 py-2 rounded-xl border-2 border-[#e5e7eb] text-sm font-semibold text-[#1a1a2e] hover:border-[#de1b23] hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  {managingBilling
                    ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    : t("billing", "manageSub")
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Selector */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-6 animate-fade-up animate-delay-150">
        <p className="text-sm font-semibold text-[#1a1a2e] mb-3">{t("billing", "paymentMethod")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* International Card */}
          <button
            onClick={() => setPayMethod("stripe")}
            className={`relative flex flex-col gap-3 p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              payMethod === "stripe" ? "border-[#de1b23] bg-[#fef2f2] shadow-sm" : "border-[#e5e7eb] hover:border-[#de1b23]/30 bg-white"
            }`}
          >
            <span className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              payMethod === "stripe" ? "bg-[#de1b23] scale-100 opacity-100" : "scale-75 opacity-0"
            }`}>
              <CheckIcon className="w-3 h-3 text-white" />
            </span>
            <p className={`text-sm font-semibold pr-7 transition-colors duration-200 ${payMethod === "stripe" ? "text-[#de1b23]" : "text-[#1a1a2e]"}`}>
              {t("billing", "intlCard")}
            </p>
            <div className="flex items-center gap-2">
              <VisaLogo /><MastercardLogo /><AmexLogo />
            </div>
          </button>
          {/* Arab Payments */}
          <button
            onClick={() => setPayMethod("tap")}
            className={`relative flex flex-col gap-3 p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              payMethod === "tap" ? "border-[#de1b23] bg-[#fef2f2] shadow-sm" : "border-[#e5e7eb] hover:border-[#de1b23]/30 bg-white"
            }`}
          >
            <span className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              payMethod === "tap" ? "bg-[#de1b23] scale-100 opacity-100" : "scale-75 opacity-0"
            }`}>
              <CheckIcon className="w-3 h-3 text-white" />
            </span>
            <p className={`text-sm font-semibold pr-7 transition-colors duration-200 ${payMethod === "tap" ? "text-[#de1b23]" : "text-[#1a1a2e]"}`}>
              {t("billing", "arabPayments")}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <MadaLogo /><STCPayLogo /><KNETLogo /><ApplePayLogo />
            </div>
          </button>
        </div>
      </div>

      {/* ── Plans Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
        {PLAN_META.map((plan, i) => {
          const isCurrent = currentPlan === plan.id;
          const isCheckingThisPlan = checkingOut === plan.id;
          const isDimmed = !!checkingOut && !isCheckingThisPlan;

          if (plan.dark) {
            // ── Enterprise dark card ──────────────────────────────────────
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border-2 p-6 group transition-all duration-500 animate-fade-up ${
                  isDimmed ? "opacity-50 scale-[0.98]" : "hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                } ${
                  isCurrent ? "border-emerald-400 shadow-md shadow-emerald-500/5" : "border-[#de1b23]/40 hover:border-[#de1b23] shadow-md shadow-[#de1b23]/5"
                }`}
                style={{ animationDelay: `${(i + 2) * 100}ms` }}
              >
                {isCurrent && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-md whitespace-nowrap z-10">
                    {t("billing", "currentPlan")}
                  </span>
                )}

                {/* Top accent bar — only when active plan */}
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-emerald-300" />
                )}

                <div className="relative select-none">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#de1b23]/10 flex items-center justify-center mb-4 text-[#de1b23] group-hover:bg-[#de1b23]/20 transition-colors duration-300">
                    {plan.icon}
                  </div>

                  <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">{t("billing", "enterprise")}</h3>
                  <p className="text-xs text-[#949aa0] mb-1">{t("billing", "enterpriseTagline")}</p>

                  <div className="mt-1">
                    <p className="text-3xl font-bold text-[#1a1a2e]">
                      {isRTL ? "مخصص" : "Custom"}
                      <span className="text-sm font-normal text-[#949aa0]"> /{isRTL ? " تواصل معنا" : " contact us"}</span>
                    </p>
                  </div>

                  <div className="my-5 h-px bg-[#e5e7eb]" />

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[#4a4a5a]">
                        <div className="w-5 h-5 rounded-full bg-[#de1b23]/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {t("billing", f as "featureEnterprise1")}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="mailto:hello@clawbibi.ai"
                    className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    {t("billing", "bookMeeting")}
                  </a>
                  <p className="text-center text-[10px] text-[#c5c9cd] mt-1.5">
                    {isRTL ? "بدون دفع مسبق" : "No payment required"}
                  </p>
                </div>
              </div>
            );
          }

          // ── Cloud plans (BYOK & Managed) ──────────────────────────────
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 p-6 group transition-all duration-500 animate-fade-up ${
                isDimmed ? "opacity-50 scale-[0.98]" : "hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
              } ${
                plan.popular
                  ? "border-[#de1b23] shadow-lg shadow-[#de1b23]/10"
                  : isCurrent
                    ? "border-emerald-400 shadow-md shadow-emerald-500/5"
                    : "border-[#e5e7eb] hover:border-[#de1b23]/30"
              }`}
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
            >
              {/* Popular badge */}
              {plan.popular && !isCurrent && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#de1b23] text-white text-xs font-semibold shadow-md whitespace-nowrap z-10">
                  {t("billing", "popular")}
                </span>
              )}
              {/* Current plan badge */}
              {isCurrent && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-md whitespace-nowrap z-10">
                  {t("billing", "currentPlan")}
                </span>
              )}
              {/* Top accent bar for current plan */}
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-t-2xl" />
              )}

              {/* Plan icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                isCurrent ? "bg-emerald-50 text-emerald-600"
                  : plan.popular ? "bg-[#de1b23]/10 text-[#de1b23]"
                  : "bg-[#f6f9fa] text-[#949aa0] group-hover:bg-[#de1b23]/10 group-hover:text-[#de1b23]"
              }`}>
                {plan.icon}
              </div>

              {/* Name + tagline */}
              <h3 className="text-lg font-bold text-[#1a1a2e]">
                {t("billing", plan.id as "byok" | "managed")}
              </h3>
              <p className="text-xs text-[#949aa0] mt-0.5 mb-2">
                {t("billing", plan.id === "byok" ? "byokTagline" : "managedTagline")}
              </p>

              {/* Price */}
              <div className="mt-1">
                {isRTL ? (
                  <p className="text-3xl font-bold text-[#1a1a2e]">
                    {plan.priceSAR}
                    <span className="text-lg font-semibold text-[#de1b23] ms-1">ر.س</span>
                    <span className="text-sm font-normal text-[#949aa0] ms-1">/ {t("billing", "month")}</span>
                  </p>
                ) : (
                  <p className="text-3xl font-bold text-[#1a1a2e]">
                    {plan.priceUSD}
                    <span className="text-sm font-normal text-[#949aa0]"> /{t("billing", "month")}</span>
                  </p>
                )}
                {isRTL && (
                  <p className="text-xs text-[#c5c9cd] mt-0.5">≈ {plan.priceUSD} USD</p>
                )}
              </div>

              {/* API credit highlight for managed plan */}
              {plan.id === "managed" && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#de1b23]/8 border border-[#de1b23]/15">
                  <svg className="w-3.5 h-3.5 text-[#de1b23] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold text-[#de1b23]">
                    {t("billing", "apiCreditsIncluded")}
                  </span>
                </div>
              )}

              <div className="my-5 h-px bg-[#e5e7eb]" />

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#4a4a5a]">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? "bg-[#de1b23]/10" : "bg-[#f6f9fa]"
                    }`}>
                      <svg className={`w-3 h-3 ${plan.popular ? "text-[#de1b23]" : "text-[#949aa0]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {/* Bold highlight for API credit line */}
                    {f === "featureManaged1" ? (
                      <span className="font-semibold text-[#1a1a2e]">{t("billing", f as "featureManaged1")}</span>
                    ) : (
                      t("billing", f as "featureByok1")
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Button — smart label based on plan relation */}
              {(() => {
                const relation = getPlanRelation(plan.id);
                const isDisabled = relation === "current" || !!checkingOut;

                const btnClass = (() => {
                  if (relation === "current")
                    return "bg-emerald-50 text-emerald-600 border-2 border-emerald-200 cursor-default";
                  if (relation === "downgrade")
                    return "border-2 border-[#e5e7eb] text-[#949aa0] hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-50";
                  if (plan.popular)
                    return "bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50";
                  return "border-2 border-[#e5e7eb] text-[#1a1a2e] hover:border-[#de1b23] hover:text-[#de1b23] hover:bg-[#fef2f2] disabled:opacity-50";
                })();

                const btnLabel = (() => {
                  if (isCheckingThisPlan)
                    return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />;
                  if (relation === "current")
                    return (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {t("billing", "currentPlan")}
                      </>
                    );
                  if (relation === "upgrade")
                    return (
                      <>
                        {t("billing", "upgradeTo")} {t("billing", plan.id as "byok" | "managed")}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                      </>
                    );
                  if (relation === "downgrade")
                    return (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                        </svg>
                        {t("billing", "downgrade")}
                      </>
                    );
                  return t("billing", "choosePlan");
                })();

                return (
                  <>
                    <button
                      onClick={() => !isDisabled && handlePlanClick(plan.id)}
                      disabled={isDisabled}
                      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${btnClass}`}
                    >
                      {btnLabel}
                    </button>
                    {relation !== "current" && (
                      <p className="text-center text-[10px] text-[#c5c9cd] mt-1.5 transition-all duration-300">
                        {payMethod === "stripe"
                          ? (isRTL ? "عبر Stripe" : "via Stripe")
                          : (isRTL ? "عبر Tap Payments" : "via Tap Payments")}
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#c5c9cd] mt-8 animate-fade-up animate-delay-600">
        {t("billing", "billingFooter")}
      </p>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white border border-[#e5e7eb]" />}>
      <BillingPageInner />
    </Suspense>
  );
}
