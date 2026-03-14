"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function MonitorPage() {
  const { t, isRTL } = useLanguage();
  const params = useParams();

  const stats = [
    {
      label: t("agents", "uptime"),
      value: "99.9%",
      color: "#22c55e",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      label: t("agents", "tokensUsed"),
      value: "12,450",
      color: "#de1b23",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      label: t("agents", "avgResponse"),
      value: "1.2s",
      color: "#6366f1",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: t("agents", "storage"),
      value: "324 MB",
      color: "#f59e0b",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
    },
  ];

  // Deterministic bar heights
  const barHeights = [45, 72, 38, 85, 60, 92, 55, 78, 42, 88, 65, 50, 95, 70];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 animate-fade-up">
        <Link href={`/dashboard/agents/${params.id}`} className="w-8 h-8 rounded-lg bg-[#f6f9fa] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#e5e7eb] transition-all duration-200">
          <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("agents", "monitorTitle")}</h1>
          <p className="text-sm text-[#949aa0]">{t("agents", "monitorSubtitle")}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-lg hover:border-[#de1b23]/10 hover:-translate-y-0.5 transition-all duration-500 animate-fade-up"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full transition-colors duration-700" style={{ backgroundColor: `${stat.color}08` }} />
            <div className="relative">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300" style={{ backgroundColor: `${stat.color}12`, color: stat.color }}>
                {stat.icon}
              </div>
              <p className="text-xs text-[#949aa0] font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Chart */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[#1a1a2e]">{t("agents", "usageOverTime")}</h3>
          <div className="flex items-center gap-4 text-xs text-[#949aa0]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#de1b23]" />
              {t("agents", "tokensUsed")}
            </div>
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-1.5">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 bg-[#de1b23]/8 rounded-t-md relative group/bar">
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#de1b23] to-[#de1b23]/70 rounded-t-md group-hover/bar:from-[#c41820] transition-colors duration-300"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-xs text-[#c5c9cd]">
          <span>14d ago</span>
          <span>{t("agents", "today")}</span>
        </div>
      </div>
    </div>
  );
}
