"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface Agent {
  id: string;
  name: string;
  status: string;
}

export function AgentSummaryRow({ agents }: { agents: Agent[] }) {
  const { t, isRTL } = useLanguage();
  const running = agents.filter((a) => a.status === "running").length;
  const stopped = agents.length - running;

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-[#1a1a2e]">{t("dashboard", "yourAgents")}</h3>
        </div>
        <Link
          href="/dashboard/agents"
          className="text-xs text-[#de1b23] hover:text-[#c41820] font-medium transition-colors flex items-center gap-1"
        >
          {t("dashboard", "viewAll")}
          <svg className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-[#f6f9fa] rounded-xl px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-[#1a1a2e]">{agents.length}</p>
          <p className="text-[10px] text-[#949aa0] font-medium uppercase tracking-wide">{t("dashboard", "totalAgents")}</p>
        </div>
        <div className="bg-emerald-50/50 rounded-xl px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-emerald-600">{running}</p>
          <p className="text-[10px] text-[#949aa0] font-medium uppercase tracking-wide">{t("dashboard", "running")}</p>
        </div>
        <div className="bg-[#f6f9fa] rounded-xl px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-[#949aa0]">{stopped}</p>
          <p className="text-[10px] text-[#949aa0] font-medium uppercase tracking-wide">{t("dashboard", "stopped")}</p>
        </div>
      </div>

      {/* Agent list preview */}
      <div className="space-y-1.5">
        {agents.slice(0, 3).map((agent) => (
          <Link
            key={agent.id}
            href={`/dashboard/agents/${agent.id}`}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#fef2f2] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${agent.status === "running" ? "bg-emerald-400" : "bg-[#c5c9cd]"}`} />
              <span className="text-sm text-[#1a1a2e] font-medium">{agent.name}</span>
            </div>
            <svg className={`w-3.5 h-3.5 text-[#d8dadd] group-hover:text-[#de1b23]/40 transition-colors ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
