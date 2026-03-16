"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface GatewayHealth {
  status: "running" | "stopped" | "error" | "unknown";
  uptime?: string;
  uptimeSecs?: number;
  version?: string;
  memoryMb?: number;
  memoryLimitMb?: number;
  storageMb?: number;
  storageLimitMb?: number;
  avgResponseMs?: number;
}

export default function MonitorPage() {
  const { t, isRTL } = useLanguage();
  const params = useParams();
  const agentId = params.id as string;

  const [health, setHealth] = useState<GatewayHealth | null>(null);
  const [agent, setAgent] = useState<{ name?: string; subdomain?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    try {
      const [agentRes, healthRes] = await Promise.all([
        fetch(`/api/agents/${agentId}`),
        fetch(`/api/agents/${agentId}/gateway`),
      ]);
      if (agentRes.ok) setAgent(await agentRes.json());
      if (healthRes.ok) setHealth(await healthRes.json());
      else setHealth({ status: "unknown" });
    } catch {
      setHealth({ status: "error" });
    }
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => { fetchData(); }, [agentId]);

  // Auto-refresh every 15s when online
  useEffect(() => {
    if (health?.status !== "running") return;
    const interval = setInterval(() => fetchData(), 15000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [health?.status, agentId]);

  const refresh = () => { setRefreshing(true); fetchData(); };

  const isOnline = health?.status === "running";

  const formatUptime = (secs?: number) => {
    if (!secs) return health?.uptime ?? "--";
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const memPct = health?.memoryMb && health?.memoryLimitMb
    ? Math.round((health.memoryMb / health.memoryLimitMb) * 100)
    : null;

  const storagePct = health?.storageMb && health?.storageLimitMb
    ? Math.round((health.storageMb / health.storageLimitMb) * 100)
    : null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-up">
        <div className="w-10 h-10 border-2 border-[#de1b23] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#949aa0]">{t("common", "loading")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 animate-fade-up">
        <Link
          href={`/dashboard/agents/${agentId}`}
          className="w-8 h-8 rounded-lg bg-[#f6f9fa] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#e5e7eb] transition-all duration-200"
        >
          <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("agents", "monitorTitle")}</h1>
          <p className="text-sm text-[#949aa0]">{agent?.subdomain ?? t("agents", "monitorSubtitle")}</p>
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs font-medium text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#f6f9fa] transition-all duration-200 disabled:opacity-50"
        >
          <svg className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Status banner */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 mb-6 animate-fade-up animate-delay-100 ${
        isOnline
          ? "bg-emerald-50/60 border-emerald-200/60"
          : health?.status === "stopped"
            ? "bg-[#f6f9fa] border-[#e5e7eb]"
            : "bg-amber-50/60 border-amber-200/60"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isOnline ? "bg-emerald-100" : health?.status === "stopped" ? "bg-[#e5e7eb]" : "bg-amber-100"
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-emerald-500 animate-pulse" : health?.status === "stopped" ? "bg-[#c5c9cd]" : "bg-amber-500"
              }`} />
            </div>
            <div>
              <p className={`text-base font-bold ${
                isOnline ? "text-emerald-700" : health?.status === "stopped" ? "text-[#949aa0]" : "text-amber-700"
              }`}>
                Gateway {isOnline ? "Online" : health?.status === "stopped" ? "Stopped" : health?.status === "error" ? "Error" : "Unknown"}
              </p>
              {health?.version && (
                <p className="text-xs text-[#949aa0] font-mono">v{health.version}</p>
              )}
            </div>
          </div>
          {isOnline && health?.uptime && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-emerald-700">
                Up {formatUptime(health.uptimeSecs)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-up animate-delay-200">
        {[
          {
            label: "Uptime",
            value: isOnline ? formatUptime(health?.uptimeSecs) : "--",
            color: "#22c55e",
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
          },
          {
            label: "Avg Response",
            value: health?.avgResponseMs ? `${health.avgResponseMs}ms` : "--",
            color: "#6366f1",
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
          },
          {
            label: "Memory",
            value: health?.memoryMb ? `${health.memoryMb} MB` : "--",
            color: "#de1b23",
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>,
          },
          {
            label: "Storage",
            value: health?.storageMb ? `${health.storageMb} MB` : "--",
            color: "#f59e0b",
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>,
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}12`, color: stat.color }}>
              {stat.icon}
            </div>
            <p className="text-xs text-[#949aa0] font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.value === "--" ? "#c5c9cd" : stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Resource usage bars — only shown with real data */}
      {(memPct !== null || storagePct !== null) && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-300">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-5">Resource Usage</h3>
          <div className="space-y-5">
            {memPct !== null && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-[#4a4a5a]">Memory</p>
                  <p className="text-xs font-semibold text-[#de1b23]">{health!.memoryMb} MB / {health!.memoryLimitMb} MB</p>
                </div>
                <div className="h-2 bg-[#f6f9fa] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${memPct > 85 ? "bg-red-500" : memPct > 65 ? "bg-amber-400" : "bg-[#de1b23]"}`}
                    style={{ width: `${memPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#c5c9cd] mt-1">{memPct}% used</p>
              </div>
            )}
            {storagePct !== null && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-[#4a4a5a]">Storage</p>
                  <p className="text-xs font-semibold text-amber-500">{health!.storageMb} MB / {health!.storageLimitMb} MB</p>
                </div>
                <div className="h-2 bg-[#f6f9fa] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${storagePct > 85 ? "bg-red-500" : storagePct > 65 ? "bg-amber-400" : "bg-amber-400"}`}
                    style={{ width: `${storagePct}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#c5c9cd] mt-1">{storagePct}% used</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gateway offline state */}
      {!isOnline && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 text-center animate-fade-up animate-delay-300">
          <div className="w-14 h-14 rounded-2xl bg-[#f6f9fa] flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1a1a2e] mb-1">Gateway is not running</p>
          <p className="text-xs text-[#949aa0]">
            {health?.status === "error"
              ? "Could not connect to the server. Check your agent status."
              : "Start your agent to see live metrics here."}
          </p>
        </div>
      )}

      {/* Footer note */}
      <p className="text-center text-xs text-[#c5c9cd] mt-6 animate-fade-up">
        Metrics fetched live from your server via SSH ·{" "}
        <button onClick={refresh} className="text-[#de1b23] hover:underline">Refresh</button>
      </p>
    </div>
  );
}
