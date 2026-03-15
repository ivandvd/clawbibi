"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NotFound() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f6f9fa] flex items-center justify-center px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="text-center max-w-md animate-fade-up">
        {/* 404 visual */}
        <div className="relative mb-8">
          <span className="text-[120px] font-black text-[#f0f1f3] leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#de1b23]/10 to-[#de1b23]/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-3">
          {t("common", "pageNotFound")}
        </h1>
        <p className="text-[#949aa0] text-sm mb-8 leading-relaxed">
          {t("common", "pageNotFoundDesc")}
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-[#e5e7eb] text-sm font-medium text-[#6b6b7b] hover:bg-white hover:border-[#d0d3d6] transition-all duration-200"
          >
            {t("common", "goHome")}
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-[#de1b23] text-white text-sm font-medium hover:bg-[#c41820] transition-all duration-200"
          >
            {t("common", "goDashboard")}
          </Link>
        </div>
      </div>
    </div>
  );
}
