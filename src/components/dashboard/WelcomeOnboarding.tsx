"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export function WelcomeOnboarding() {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      num: "1",
      titleKey: "onboardStep1" as const,
      descKey: "onboardStep1Desc" as const,
      icon: (
        <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      num: "2",
      titleKey: "onboardStep2" as const,
      descKey: "onboardStep2Desc" as const,
      icon: (
        <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: "3",
      titleKey: "onboardStep3" as const,
      descKey: "onboardStep3Desc" as const,
      icon: (
        <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* Welcome card */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-8 mb-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#de1b23] to-[#de1b23]/40" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
              <img src="/clawbibi-logo.png" alt="" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">{t("dashboard", "onboardTitle")}</h2>
              <p className="text-sm text-[#949aa0]">{t("dashboard", "onboardSubtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3-step guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:shadow-md hover:border-[#de1b23]/15 transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">
                {step.num}
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#de1b23]/10 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <h3 className="text-sm font-bold text-[#1a1a2e] mb-1">{t("dashboard", step.titleKey)}</h3>
            <p className="text-xs text-[#949aa0] leading-relaxed">{t("dashboard", step.descKey)}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          href="/dashboard/agents/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm font-semibold"
        >
          {t("agents", "createFirst")}
          <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
