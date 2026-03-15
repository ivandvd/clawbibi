"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface ActivityEntry {
  id: string;
  platform: string;
  sender: string;
  direction: "in" | "out";
  content: string;
  timestamp: string;
}

const PLATFORM_ICONS: Record<string, string> = {
  telegram: "✈",
  discord: "🎮",
  whatsapp: "📱",
  signal: "🔒",
  slack: "💬",
};

const PLATFORM_COLORS: Record<string, string> = {
  telegram: "text-sky-400",
  discord: "text-indigo-400",
  whatsapp: "text-emerald-400",
  signal: "text-blue-400",
  slack: "text-amber-400",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return new Date(iso).toLocaleDateString();
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function LogsPage() {
  const params = useParams();
  const id = params.id as string;

  const [logs, setLogs] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [platformFilter, setPlatformFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(100);
  const [offline, setOffline] = useState(false);

  const fetchLogs = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      try {
        const res = await fetch(`/api/agents/${id}/activity?limit=${limit}`);
        if (!res.ok) throw new Error("fetch failed");
        const data: ActivityEntry[] = await res.json();
        setLogs(Array.isArray(data) ? data : []);
        setOffline(Array.isArray(data) && data.length === 0);
      } catch {
        setOffline(true);
        setLogs([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id, limit]
  );

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const platforms = ["all", ...Array.from(new Set(logs.map((l) => l.platform.toLowerCase())))];

  const filtered = logs.filter((entry) => {
    const p = entry.platform.toLowerCase();
    if (platformFilter !== "all" && p !== platformFilter) return false;
    if (search && !entry.content.toLowerCase().includes(search.toLowerCase()) && !entry.sender.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f6f9fa] text-[#1a1a2e]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/agents/${id}`}
              className="w-8 h-8 rounded-lg bg-white border border-[#e5e7eb] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="w-9 h-9 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">Activity Logs</h1>
              <p className="text-xs text-[#949aa0]">Message history from all connected platforms</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-white border border-[#e5e7eb] rounded-lg px-3 py-1.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#de1b23]"
            >
              <option value={50}>Last 50</option>
              <option value={100}>Last 100</option>
            </select>
            <button
              onClick={() => fetchLogs(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#949aa0] hover:text-[#1a1a2e] transition-colors disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 9A9 9 0 0 0 5.34 5.34M4 15a9 9 0 0 0 14.66 3.66" strokeLinecap="round" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Platform tabs */}
            <div className="flex items-center gap-1 bg-[#f6f9fa] rounded-xl p-1 shrink-0">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    platformFilter === p
                      ? "bg-white text-[#1a1a2e] shadow-sm"
                      : "text-[#949aa0] hover:text-[#1a1a2e]"
                  }`}
                >
                  {p === "all"
                    ? "All"
                    : `${PLATFORM_ICONS[p] ?? "?"} ${p.charAt(0).toUpperCase() + p.slice(1)}`}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages or senders…"
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#de1b23]/20 focus:border-[#de1b23] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Log entries */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-white border border-[#e5e7eb] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : offline || filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5e7eb] flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#f6f9fa] flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#949aa0]">
              {offline ? "Agent offline — no logs available" : "No logs match your filters"}
            </p>
            <p className="text-xs text-[#c5c9cd] mt-1 max-w-xs">
              {offline
                ? "Start the agent to begin recording activity"
                : "Try adjusting the platform filter or search term"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
            <div className="divide-y divide-[#f6f9fa]">
              {filtered.map((entry) => {
                const platform = entry.platform.toLowerCase();
                const icon = PLATFORM_ICONS[platform] ?? "?";
                const color = PLATFORM_COLORS[platform] ?? "text-gray-400";
                const isIn = entry.direction === "in";

                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-4 px-5 py-3.5 hover:bg-[#f6f9fa] transition-colors"
                  >
                    {/* Platform icon */}
                    <span className={`text-lg mt-0.5 leading-none ${color}`} title={platform}>
                      {icon}
                    </span>

                    {/* Direction badge */}
                    <span
                      className={`mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isIn
                          ? "bg-blue-50 text-blue-500 border border-blue-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {isIn ? "IN" : "OUT"}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-[#1a1a2e]">
                          {entry.sender || "unknown"}
                        </span>
                        <span className="text-[#c5c9cd] text-xs">·</span>
                        <span className={`text-xs font-medium ${color}`}>
                          {platform}
                        </span>
                      </div>
                      <p className="text-sm text-[#1a1a2e] break-words line-clamp-2">
                        {entry.content}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <div className="text-right shrink-0">
                      <p className="text-xs text-[#949aa0]" title={formatTimestamp(entry.timestamp)}>
                        {timeAgo(entry.timestamp)}
                      </p>
                      <p className="text-[10px] text-[#c5c9cd] mt-0.5">
                        {formatTimestamp(entry.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-xs text-[#c5c9cd] text-center mt-3">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
            {platformFilter !== "all" ? ` on ${platformFilter}` : ""}
            {search ? ` matching "${search}"` : ""}
          </p>
        )}
      </div>
    </div>
  );
}
