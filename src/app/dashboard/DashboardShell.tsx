"use client";

import { createContext, useContext } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useLanguage } from "@/i18n/LanguageContext";

interface UserContext {
  userName?: string;
  userEmail?: string;
}

const DashboardUserContext = createContext<UserContext>({});

export function useDashboardUser() {
  return useContext(DashboardUserContext);
}

interface DashboardShellProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function DashboardShell({ children, userName, userEmail, userAvatar }: DashboardShellProps) {
  const { isRTL } = useLanguage();

  return (
    <DashboardUserContext.Provider value={{ userName, userEmail }}>
      <div className="min-h-screen bg-[#f6f9fa]" dir={isRTL ? "rtl" : "ltr"}>
        <DashboardHeader
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </div>
    </DashboardUserContext.Provider>
  );
}
