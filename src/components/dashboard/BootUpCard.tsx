"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface BootUpCardProps {
  hasAgents?: boolean;
  atLimit?: boolean;
}

export function BootUpCard({ hasAgents = false, atLimit = false }: BootUpCardProps) {
  const { t, isRTL } = useLanguage();

  const content = atLimit
    ? {
        title: t("dashboard", "bootUpAtLimitTitle"),
        desc:  t("dashboard", "bootUpAtLimitDesc"),
        features: [t("dashboard", "bootUpAtLimitF1"), t("dashboard", "bootUpAtLimitF2")],
        cta:   t("dashboard", "bootUpAtLimitCta"),
        href:  "/dashboard/billing",
      }
    : hasAgents
    ? {
        title: t("dashboard", "bootUpHasAgentsTitle"),
        desc:  t("dashboard", "bootUpHasAgentsDesc"),
        features: [t("dashboard", "bootUpHasAgentsF1"), t("dashboard", "bootUpHasAgentsF2")],
        cta:   t("dashboard", "bootUpHasAgentsCta"),
        href:  "/dashboard/agents/new",
      }
    : {
        title: t("dashboard", "bootUpNoAgentsTitle"),
        desc:  t("dashboard", "bootUpNoAgentsDesc"),
        features: [t("dashboard", "bootUpNoAgentsF1"), t("dashboard", "bootUpNoAgentsF2")],
        cta:   t("dashboard", "bootUpNoAgentsCta"),
        href:  "/dashboard/agents/new",
      };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-[#e5e7eb] p-6 sm:p-8 group hover:shadow-lg hover:border-[#de1b23]/20 transition-all duration-500 animate-fade-up">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#de1b23] to-[#de1b23]/40" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#de1b23]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <img src="/clawbibi-logo.png" alt="" className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1a1a2e]">{content.title}</h3>
        </div>

        <p className="text-[#6b6b7b] text-sm mb-6 max-w-md leading-relaxed">{content.desc}</p>

        <div className="space-y-3 mb-7">
          {content.features.map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-[#4a4a5a]">
              <div className="w-5 h-5 rounded-full bg-[#de1b23]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {f}
            </div>
          ))}
        </div>

        <Link
          href={content.href}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm font-semibold"
        >
          {content.cta}
          <svg className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
