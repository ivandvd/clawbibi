"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

interface UserDropdownProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function UserDropdown({ userName, userEmail }: UserDropdownProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Always show first letter of email
  const initial = userEmail?.[0]?.toUpperCase() ?? "?";

  const menuItems = [
    { label: t("dashboard", "menuDashboard"), href: "/dashboard" },
    { label: t("dashboard", "menuProfile"), href: "/dashboard/profile" },
    { label: t("dashboard", "menuPlan"), href: "/dashboard/billing" },
    { label: t("dashboard", "menuAgents"), href: "/dashboard/agents" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5"
      >
        <div className="w-9 h-9 rounded-full bg-[#de1b23] text-white text-sm font-semibold flex items-center justify-center hover:bg-[#c41820] transition-colors">
          {initial}
        </div>
        <svg className={`w-3.5 h-3.5 text-[#949aa0] transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e5e7eb] py-2 z-50">
          {/* User info */}
          <div className="px-4 py-2 border-b border-[#e5e7eb]">
            <p className="text-sm font-medium text-[#1a1a2e] truncate">{userName || userEmail}</p>
            {userName && (
              <p className="text-xs text-[#949aa0] truncate">{userEmail}</p>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#1a1a2e] hover:bg-[#f6f9fa] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Sign out */}
          <div className="border-t border-[#e5e7eb] pt-1">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              {t("dashboard", "signOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
