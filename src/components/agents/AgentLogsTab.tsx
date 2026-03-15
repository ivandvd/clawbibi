"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function AgentLogsTab() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-8 flex flex-col items-center justify-center" style={{ minHeight: "400px" }}>
      <div className="w-16 h-16 mb-4 rounded-2xl bg-[#f6f9fa] flex items-center justify-center">
        <svg className="w-8 h-8 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[#949aa0] mb-1">{t("agents", "noLogsYet")}</p>
      <p className="text-xs text-[#c5c9cd] text-center max-w-xs">{t("agents", "noLogsDesc")}</p>
    </div>
  );
}
