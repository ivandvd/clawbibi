"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { AgentAnalytics } from "@/app/api/agents/[id]/analytics/route";

const PLATFORM_COLORS: Record<string, string> = {
  telegram: "#0088cc",
  discord: "#5865f2",
  whatsapp: "#25d366",
  signal: "#3a76f0",
  slack: "#e01e5a",
};

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
      <p className="text-xs text-[#949aa0] font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#1a1a2e]">{value}</p>
      {sub && <p className="text-xs text-[#c5c9cd] mt-0.5">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<AgentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [days, setDays] = useState<7 | 30>(7);
  const [offline, setOffline] = useState(false);

  const fetchAnalytics = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      try {
        const res = await fetch(`/api/agents/${id}/analytics?days=${days}`);
        if (!res.ok) throw new Error("failed");
        const json: AgentAnalytics = await res.json();
        setData(json);
        setOffline(json.totalIn + json.totalOut === 0);
      } catch {
        setOffline(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id, days]
  );

  useEffect(() => {
    setLoading(true);
    fetchAnalytics();
  }, [fetchAnalytics]);

  const maxDaily = data
    ? Math.max(...data.dailyMessages.map((d) => d.count), 1)
    : 1;

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
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">Analytics</h1>
              <p className="text-xs text-[#949aa0]">Message activity and platform breakdown</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Days toggle */}
            <div className="flex items-center gap-1 bg-white border border-[#e5e7eb] rounded-xl p-1">
              {([7, 30] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    days === d
                      ? "bg-[#de1b23] text-white shadow-sm"
                      : "text-[#949aa0] hover:text-[#1a1a2e]"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>

            <button
              onClick={() => fetchAnalytics(true)}
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

        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-white border border-[#e5e7eb] rounded-2xl animate-pulse" />
              ))}
            </div>
            <div className="h-64 bg-white border border-[#e5e7eb] rounded-2xl animate-pulse" />
            <div className="h-48 bg-white border border-[#e5e7eb] rounded-2xl animate-pulse" />
          </div>
        ) : offline && !data ? (
          <div className="bg-white rounded-2xl border border-[#e5e7eb] flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#f6f9fa] flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#949aa0]">Agent offline — no analytics available</p>
            <p className="text-xs text-[#c5c9cd] mt-1">Start the agent to begin collecting data</p>
          </div>
        ) : data ? (
          <div className="space-y-5">
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Messages In" value={data.totalIn} sub="from users" />
              <StatCard label="Messages Out" value={data.totalOut} sub="AI responses" />
              <StatCard label="Unique Users" value={data.uniqueSenders} sub={`last ${days} days`} />
              <StatCard label="Active Days" value={data.activeDays} sub={`of ${days}`} />
            </div>

            {/* Daily messages bar chart */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <h3 className="text-sm font-semibold text-[#1a1a2e] mb-5">
                Messages per Day
                {offline && (
                  <span className="ml-2 text-xs text-[#949aa0] font-normal">(no activity yet)</span>
                )}
              </h3>
              <div className="flex items-end gap-1.5 h-48">
                {data.dailyMessages.map((day) => {
                  const heightPct = Math.round((day.count / maxDaily) * 100);
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[10px] text-[#949aa0] opacity-0 group-hover:opacity-100 transition-opacity">
                        {day.count}
                      </span>
                      <div className="w-full relative" style={{ height: "160px" }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 rounded-t-md transition-all duration-500"
                          style={{
                            height: `${Math.max(heightPct, day.count > 0 ? 3 : 0)}%`,
                            background:
                              day.count > 0
                                ? "linear-gradient(to top, #de1b23, #de1b23b3)"
                                : "#f6f9fa",
                          }}
                        />
                      </div>
                      <span className="text-[9px] text-[#c5c9cd] truncate w-full text-center">
                        {day.date.split(" ")[1] ?? day.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform distribution */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <h3 className="text-sm font-semibold text-[#1a1a2e] mb-5">Platform Distribution</h3>
              {data.platformBreakdown.length === 0 ? (
                <p className="text-sm text-[#c5c9cd] text-center py-8">No messages yet</p>
              ) : (
                <div className="space-y-4">
                  {data.platformBreakdown.map((p) => {
                    const color = PLATFORM_COLORS[p.platform] ?? "#949aa0";
                    return (
                      <div key={p.platform}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-[#1a1a2e] capitalize">
                            {p.platform}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#949aa0]">{p.count} msgs</span>
                            <span className="text-xs font-semibold text-[#1a1a2e]">{p.pct}%</span>
                          </div>
                        </div>
                        <div className="h-2.5 bg-[#f6f9fa] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${p.pct}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
