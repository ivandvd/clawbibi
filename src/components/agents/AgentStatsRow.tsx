"use client";

import { useLanguage } from "@/i18n/LanguageContext";

interface AgentStatsRowProps {
  model: string;
  status: string;
  contextSize?: number;
  maxTokens?: number;
}

export function AgentStatsRow({ model, status, contextSize, maxTokens }: AgentStatsRowProps) {
  const { t } = useLanguage();

  const formatContext = (n?: number) => n ? (n >= 1000 ? `${Math.round(n / 1000)}K` : String(n)) : "128K";
  const formatTokens = (n?: number) => n ? n.toLocaleString() : "4,096";

  const stats = [
    { label: t("agents", "activeModel"), value: model || "Claude 4.5", color: "#1a1a2e" },
    { label: t("agents", "context"), value: formatContext(contextSize), color: "#de1b23" },
    { label: t("agents", "maxTokens"), value: formatTokens(maxTokens), color: "#6366f1" },
    { label: t("agents", "statusLabel"), value: status === "running" ? t("agents", "running") : status || "--", color: status === "running" ? "#22c55e" : "#949aa0" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-[#e5e7eb] px-4 py-3 hover:shadow-sm transition-all duration-300 animate-fade-up"
          style={{ animationDelay: `${(i + 1) * 60}ms` }}
        >
          <p className="text-[10px] text-[#949aa0] uppercase tracking-wider font-medium mb-1">{stat.label}</p>
          <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
