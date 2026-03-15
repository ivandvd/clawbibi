"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function AgentAnalyticsTab() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-8 flex flex-col items-center justify-center" style={{ minHeight: "400px" }}>
      <div className="w-16 h-16 mb-4 rounded-2xl bg-[#f6f9fa] flex items-center justify-center">
        <svg className="w-8 h-8 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[#949aa0] mb-1">{t("agents", "noDataYet")}</p>
      <p className="text-xs text-[#c5c9cd] text-center max-w-xs">{t("agents", "noDataDesc")}</p>
    </div>
  );
}
