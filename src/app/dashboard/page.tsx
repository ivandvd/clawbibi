"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { useDashboardUser } from "./DashboardShell";
import { BootUpCard } from "@/components/dashboard/BootUpCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SetupGuides } from "@/components/dashboard/SetupGuides";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { userName } = useDashboardUser();

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          {t("dashboard", "welcomeTitle")}
        </h1>
        <p className="text-[#949aa0] mt-1">
          {t("dashboard", "welcomeSubtitle")}{userName || ""}
        </p>
      </div>

      {/* Boot Up + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        <div className="lg:col-span-2">
          <BootUpCard />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Setup Guides */}
      <div className="animate-fade-up animate-delay-200">
        <SetupGuides />
      </div>
    </div>
  );
}
