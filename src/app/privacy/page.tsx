"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PrivacyPage() {
  const { t, isRTL } = useLanguage();

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
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
          {t("legal", "privacyTitle")}
        </h1>
        <p className="text-sm text-[#949aa0] mb-8">
          {t("legal", "lastUpdated")}
        </p>

        {/* Beta notice */}
        <div className="bg-amber-50/60 border border-amber-200/50 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-900">{t("legal", "betaNotice")}</p>
              <p className="text-sm text-amber-700/80 mt-1">{t("legal", "betaNoticeContent")}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8">
          <p className="text-[#4a4a5a] text-sm leading-relaxed">
            {t("legal", "privacyContent")}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-[#949aa0] hover:text-[#de1b23] transition-colors"
          >
            &larr; {t("common", "goHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}
