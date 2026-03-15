"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export function QuickActions() {
  const { t } = useLanguage();

  const actions = [
    {
      label: t("dashboard", "actionConnect"),
      desc: t("dashboard", "actionConnectDesc"),
      href: "https://openclaw.ai/integrations",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      external: true,
    },
    {
      label: t("dashboard", "actionBilling"),
      desc: t("dashboard", "actionBillingDesc"),
      href: "/dashboard/billing",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      label: t("dashboard", "actionDocs"),
      desc: t("dashboard", "actionDocsDesc"),
      href: "https://docs.openclaw.ai/start/getting-started",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      external: true,
    },
    {
      label: t("dashboard", "actionSupport"),
      desc: t("dashboard", "actionSupportDesc"),
      href: "#",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      soon: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 h-full hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#de1b23]/8 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-[#1a1a2e]">
          {t("dashboard", "quickActions")}
        </h3>
      </div>
      <div className="space-y-0.5">
        {actions.map((action) => {
          const isExternal = "external" in action && action.external;
          const isSoon = "soon" in action && action.soon;

          const content = (
            <>
              <span className={`flex-shrink-0 ${isSoon ? "text-[#c5c9cd]" : "text-[#949aa0] group-hover/action:text-[#de1b23]"} transition-colors duration-200`}>{action.icon}</span>
              <div className="flex-1 min-w-0">
                <span className={`font-medium block ${isSoon ? "text-[#c5c9cd]" : "text-[#1a1a2e]"}`}>{action.label}</span>
                <span className={`text-xs block ${isSoon ? "text-[#d8dadd]" : "text-[#949aa0]"}`}>{action.desc}</span>
              </div>
              {isSoon ? (
                <span className="text-[10px] text-[#c5c9cd] bg-[#f6f9fa] px-2 py-0.5 rounded-full font-medium flex-shrink-0">{t("dashboard", "comingSoon")}</span>
              ) : isExternal ? (
                <svg className="w-3.5 h-3.5 text-[#d8dadd] group-hover/action:text-[#de1b23]/40 transition-colors duration-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              ) : null}
            </>
          );

          if (isSoon) {
            return (
              <div
                key={action.label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#c5c9cd] cursor-default"
              >
                {content}
              </div>
            );
          }

          if (isExternal) {
            return (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#4a4a5a] hover:bg-[#fef2f2] transition-all duration-200 group/action"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#4a4a5a] hover:bg-[#fef2f2] transition-all duration-200 group/action"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
