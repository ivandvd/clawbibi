"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-up">
      <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <h2 className="text-lg font-bold text-[#1a1a2e] mb-2">
        {t("common", "error")}
      </h2>
      <p className="text-sm text-[#949aa0] mb-6 text-center max-w-sm">
        {t("common", "errorDesc")}
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-[#de1b23] text-white text-sm font-medium hover:bg-[#c41820] transition-all duration-200"
        >
          {t("common", "retry")}
        </button>
        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-xl border border-[#e5e7eb] text-sm font-medium text-[#6b6b7b] hover:bg-white hover:border-[#d0d3d6] transition-all duration-200"
        >
          {t("common", "goDashboard")}
        </Link>
      </div>
    </div>
  );
}
