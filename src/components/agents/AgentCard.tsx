"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface AgentCardProps {
  id: string;
  name: string;
  status: string;
  subdomain?: string;
  model: string;
  storageMb: number;
  uptimeMins: number;
}

export function AgentCard({ id, name, status, subdomain, model, storageMb, uptimeMins }: AgentCardProps) {
  const { t } = useLanguage();

  const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    running: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
    creating: { bg: "bg-yellow-50", text: "text-yellow-600", dot: "bg-yellow-500" },
    stopping: { bg: "bg-orange-50", text: "text-orange-600", dot: "bg-orange-500" },
    stopped: { bg: "bg-gray-50", text: "text-gray-500", dot: "bg-gray-400" },
    error: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  };

  const sc = statusColors[status] || statusColors.stopped;

  const formatUptime = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-lg hover:border-[#de1b23]/15 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-500">
      {/* Decorative corner accent */}

      {/* Top row: name + status */}
      <div className="relative flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-[#1a1a2e] group-hover:text-[#de1b23] transition-colors duration-300">{name}</h3>
            {subdomain && (
              <p className="text-xs text-[#949aa0] font-mono" dir="ltr">{subdomain}</p>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${status === "running" ? "status-pulse" : ""}`} />
          {t("agents", status)}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-[#949aa0] mt-3 mb-4 py-3 px-3 bg-[#f6f9fa] rounded-xl" dir="ltr">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatUptime(uptimeMins)}
        </span>
        <span className="w-px h-3 bg-[#e5e7eb]" />
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          {storageMb} MB
        </span>
        <span className="w-px h-3 bg-[#e5e7eb]" />
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {model}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Link
          href={`/dashboard/agents/${id}`}
          className="px-4 py-2 rounded-xl bg-[#1a1a2e] text-white text-xs font-semibold hover:bg-[#2d2d44] hover:shadow-md transition-all duration-300"
        >
          OpenClaw
        </Link>
        <Link
          href={`/dashboard/agents/${id}/monitor`}
          className="px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:border-[#de1b23]/30 hover:bg-[#fef2f2] transition-all duration-300"
        >
          {t("agents", "monitor")}
        </Link>
        <Link
          href={`/dashboard/agents/${id}/configure`}
          className="px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:border-[#de1b23]/30 hover:bg-[#fef2f2] transition-all duration-300"
        >
          {t("agents", "configure")}
        </Link>
        <Link
          href={`/dashboard/agents/${id}/pairing`}
          className="px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:border-[#de1b23]/30 hover:bg-[#fef2f2] transition-all duration-300"
        >
          {t("agents", "pairing")}
        </Link>
      </div>
    </div>
  );
}
