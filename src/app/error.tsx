"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f6f9fa] flex items-center justify-center px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-3">
          {t("common", "error")}
        </h1>
        <p className="text-[#949aa0] text-sm mb-8 leading-relaxed">
          {t("common", "errorDesc")}
        </p>

        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl bg-[#de1b23] text-white text-sm font-medium hover:bg-[#c41820] transition-all duration-200"
        >
          {t("common", "retry")}
        </button>
      </div>
    </div>
  );
}
