"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  return (
    <DashboardUserContext.Provider value={{ userName, userEmail }}>
      <div className="min-h-screen bg-[#f6f9fa]" dir="ltr">
        <DashboardHeader
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          onMenuToggle={() => setMobileNavOpen(true)}
        />
        <div className="flex">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-8" dir={isRTL ? "rtl" : "ltr"}>
            <Breadcrumbs />
            {children}
          </main>
        </div>
        <MobileNav open={mobileNavOpen} onClose={closeMobileNav} />
      </div>
    </DashboardUserContext.Provider>
  );
}
