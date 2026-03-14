"use client";

import { useLanguage } from "@/i18n/LanguageContext";

const plans = [
  {
    id: "basic",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    features: ["featureBasic1", "featureBasic2", "featureBasic3", "featureBasic4"],
  },
  {
    id: "pro",
    popular: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    features: ["featurePro1", "featurePro2", "featurePro3", "featurePro4", "featurePro5"],
  },
  {
    id: "ultra",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    features: ["featureUltra1", "featureUltra2", "featureUltra3", "featureUltra4", "featureUltra5", "featureUltra6"],
  },
];

export default function BillingPage() {
  const { t } = useLanguage();

  return (
    <div>
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

      {/* Current Plan Card */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-8 group hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f6f9fa] to-[#e5e7eb] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#949aa0] uppercase tracking-wider font-medium">{t("billing", "currentPlan")}</p>
              <p className="text-xl font-bold text-[#1a1a2e] mt-0.5">{t("billing", "freePlan")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#c5c9cd]" />
            <span className="text-sm text-[#949aa0] font-medium">
              {t("billing", "noActivePlan")}
            </span>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl border-2 p-6 group hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-500 animate-fade-up ${
              plan.popular
                ? "border-[#de1b23] shadow-lg shadow-[#de1b23]/5"
                : "border-[#e5e7eb] hover:border-[#de1b23]/30"
            }`}
            style={{ animationDelay: `${(i + 2) * 100}ms` }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#de1b23] text-white text-xs font-semibold shadow-lg shadow-[#de1b23]/25">
                {t("billing", "popular")}
              </span>
            )}

            {/* Decorative accent for popular */}
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#de1b23] to-[#de1b23]/40 rounded-t-xl" />
            )}

            {/* Plan icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              plan.popular
                ? "bg-[#de1b23]/10 text-[#de1b23]"
                : "bg-[#f6f9fa] text-[#949aa0] group-hover:bg-[#de1b23]/10 group-hover:text-[#de1b23]"
            } transition-colors duration-300`}>
              {plan.icon}
            </div>

            <h3 className="text-lg font-bold text-[#1a1a2e] capitalize">{t("billing", plan.id)}</h3>
            <p className="text-3xl font-bold text-[#1a1a2e] mt-2">
              {t("billing", `${plan.id}Price`)}
              <span className="text-sm font-normal text-[#949aa0]"> /{t("billing", "month")}</span>
            </p>

            <div className="my-5 h-px bg-[#e5e7eb]" />

            <ul className="space-y-3 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#4a4a5a]">
                  <div className="w-5 h-5 rounded-full bg-[#de1b23]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t("billing", f)}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              plan.popular
                ? "bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0"
                : "border-2 border-[#e5e7eb] text-[#1a1a2e] hover:border-[#de1b23] hover:text-[#de1b23] hover:bg-[#fef2f2]"
            }`}>
              {t("billing", "choosePlan")}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-[#c5c9cd] mt-6 animate-fade-up animate-delay-600">
        {t("billing", "billingFooter")}
      </p>
    </div>
  );
}
