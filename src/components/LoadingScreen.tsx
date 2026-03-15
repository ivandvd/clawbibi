"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function LoadingScreen() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f6f9fa] flex flex-col items-center justify-center loading-fade-in">
      {/* Logo */}
      <div className="relative mb-6">
        <img
          src="/clawbibi-logo.png"
          alt=""
          className="w-14 h-14"
        />
        {/* Pulse ring behind logo */}
        <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-[#de1b23]/20 animate-ping" />
      </div>

      {/* Brand name */}
      <h1 className="text-xl font-bold text-[#1a1a2e] mb-6" translate="no">
        clawbibi
      </h1>

      {/* Spinner + Loading text */}
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-[#949aa0] loading-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="31.4 31.4"
            strokeDashoffset="10"
          />
        </svg>
        <span className="text-sm text-[#949aa0]">{t("common", "loading")}</span>
        <span className="flex gap-0.5">
          <span className="w-1 h-1 rounded-full bg-[#949aa0] loading-dot" />
          <span className="w-1 h-1 rounded-full bg-[#949aa0] loading-dot" />
          <span className="w-1 h-1 rounded-full bg-[#949aa0] loading-dot" />
        </span>
      </div>
    </div>
  );
}
