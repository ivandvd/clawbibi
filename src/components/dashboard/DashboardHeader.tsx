"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { UserDropdown } from "./UserDropdown";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onMenuToggle?: () => void;
}

export function DashboardHeader({ userName, userEmail, userAvatar, onMenuToggle }: DashboardHeaderProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb]" dir="ltr">
      <div className="max-w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#f6f9fa] text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          )}

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-8 h-8" />
            <span className="font-bold text-lg text-[#1a1a2e]" translate="no">clawbibi</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* EN/AR toggle pill */}
          <div className="flex items-center bg-[#f6f9fa] rounded-full p-0.5 text-xs font-medium">
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                locale === "en" ? "bg-white shadow-sm text-[#1a1a2e]" : "text-[#949aa0] hover:text-[#6b6b7b]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("ar")}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                locale === "ar" ? "bg-white shadow-sm text-[#1a1a2e]" : "text-[#949aa0] hover:text-[#6b6b7b]"
              }`}
            >
              {"\u0639\u0631\u0628\u064A"}
            </button>
          </div>

          <UserDropdown
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
          />
        </div>
      </div>
    </header>
  );
}
