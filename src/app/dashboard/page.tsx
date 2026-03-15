"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { useDashboardUser } from "./DashboardShell";
import { BootUpCard } from "@/components/dashboard/BootUpCard";

interface Agent {
  id: string;
  name: string;
  status: string;
  model: string;
  subdomain?: string;
  created_at: string;
}

interface Channel {
  platform: string;
}

interface BillingStatus {
  plan: string;
}

const MODEL_SHORT: Record<string, string> = {
  "claude-4.5": "Claude 4.5",
  "claude-opus": "Claude Opus",
  "gpt-4o": "GPT-4o",
  "gemini-2.5": "Gemini 2.5",
};

const PLATFORM_COLORS: Record<string, string> = {
  telegram: "#0088cc",
  whatsapp: "#25d366",
  discord: "#5865f2",
  slack: "#e01e5a",
  signal: "#3a76f0",
};

const PLAN_LIMITS: Record<string, number> = {
  none: 0,
  byok: 1,
  managed: 3,
  enterprise: Infinity,
};

function PlatformDot({ platform }: { platform: string }) {
  const color = PLATFORM_COLORS[platform] ?? "#949aa0";
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
      style={{ backgroundColor: color }}
      title={platform.charAt(0).toUpperCase() + platform.slice(1)}
    >
      {platform[0].toUpperCase()}
    </div>
  );
}

export default function DashboardPage() {
  const { t, isRTL } = useLanguage();
  const { userName } = useDashboardUser();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [channels, setChannels] = useState<Record<string, Channel[]>>({});
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const [agentsRes, billingRes] = await Promise.all([
        fetch("/api/agents").then(r => r.ok ? r.json() : []).catch(() => []),
        fetch("/api/billing/status").then(r => r.ok ? r.json() : null).catch(() => null),
      ]);

      const agentList: Agent[] = Array.isArray(agentsRes) ? agentsRes : [];
      setAgents(agentList);
      setBilling(billingRes);

      // Fetch channels for each agent in parallel
      const channelResults = await Promise.all(
        agentList.map(a =>
          fetch(`/api/agents/${a.id}/channels`)
            .then(r => r.ok ? r.json() : [])
            .catch(() => [])
            .then(data => ({ id: a.id, channels: Array.isArray(data) ? data : [] }))
        )
      );
      const channelMap: Record<string, Channel[]> = {};
      for (const { id, channels: ch } of channelResults) channelMap[id] = ch;
      setChannels(channelMap);

      setLoaded(true);
    }
    load();
  }, []);

  const hasAgents = loaded && agents.length > 0;
  const plan = billing?.plan ?? "none";
  const planLimit = PLAN_LIMITS[plan] ?? 1;
  const runningCount = agents.filter(a => a.status === "running").length;

  if (!loaded) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-[#f6f9fa] rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-[#f6f9fa] rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="h-48 bg-[#f6f9fa] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!hasAgents) {
    return (
      <div>
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">
            {t("dashboard", "welcomeTitle")}
          </h1>
          <p className="text-[#949aa0] mt-1">{t("dashboard", "setupFirstSubtitle")}</p>
        </div>
        <BootUpCard hasAgents={false} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="animate-fade-up">
        <p className="text-xs font-semibold text-[#de1b23] uppercase tracking-widest mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          {userName
            ? `${t("dashboard", "welcomeTitle")}, ${userName.split(" ")[0]}`
            : t("dashboard", "welcomeTitle")}
        </h1>
        <p className="text-[#949aa0] mt-1 text-sm">{t("dashboard", "welcomeSubtitle")}</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up animate-delay-100">
        {[
          {
            label: "Active Agents",
            value: `${runningCount} / ${agents.length}`,
            sub: "running now",
            color: "#22c55e",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
          },
          {
            label: "Channels",
            value: String(Object.values(channels).flat().length),
            sub: "connected",
            color: "#6366f1",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            ),
          },
          {
            label: "Plan",
            value: plan === "none" ? "Free" : plan.charAt(0).toUpperCase() + plan.slice(1),
            sub: `${agents.length} / ${planLimit === Infinity ? "∞" : planLimit} agents`,
            color: "#de1b23",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            ),
          },
          {
            label: "Uptime",
            value: runningCount > 0 ? "Live" : "—",
            sub: runningCount > 0 ? "agents responding" : "no agents running",
            color: runningCount > 0 ? "#22c55e" : "#c5c9cd",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
        ].map((card, i) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${card.color}12`, color: card.color }}
            >
              {card.icon}
            </div>
            <p className="text-xs text-[#949aa0] font-medium mb-0.5">{card.label}</p>
            <p className="text-xl font-bold text-[#1a1a2e]">{card.value}</p>
            <p className="text-xs text-[#c5c9cd] mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Agent list */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <h2 className="text-sm font-bold text-[#1a1a2e]">Your Agents</h2>
          <Link
            href="/dashboard/agents/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#de1b23] text-white text-xs font-semibold hover:bg-[#c41820] hover:shadow-md hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Agent
          </Link>
        </div>

        <div className="divide-y divide-[#f6f9fa]">
          {agents.map((agent) => {
            const agentChannels = channels[agent.id] ?? [];
            const isRunning = agent.status === "running";
            const isCreating = ["creating", "provisioning", "starting"].includes(agent.status);

            return (
              <Link
                key={agent.id}
                href={`/dashboard/agents/${agent.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[#fef9f9] transition-colors duration-200 group"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
                  {agent.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1a1a2e] truncate group-hover:text-[#de1b23] transition-colors duration-200">
                      {agent.name}
                    </p>
                    {isCreating && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
                        Setting up...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#949aa0]">{MODEL_SHORT[agent.model] ?? agent.model}</p>
                </div>

                {/* Channels */}
                <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                  {agentChannels.length > 0
                    ? agentChannels.slice(0, 4).map(ch => (
                        <PlatformDot key={ch.platform} platform={ch.platform} />
                      ))
                    : <span className="text-[10px] text-[#c5c9cd]">No channels</span>
                  }
                  {agentChannels.length > 4 && (
                    <span className="text-[10px] text-[#949aa0]">+{agentChannels.length - 4}</span>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${
                    isRunning ? "bg-emerald-500 animate-pulse" :
                    isCreating ? "bg-amber-400 animate-pulse" :
                    "bg-[#c5c9cd]"
                  }`} />
                  <span className={`text-xs font-medium hidden md:block ${
                    isRunning ? "text-emerald-600" :
                    isCreating ? "text-amber-600" :
                    "text-[#949aa0]"
                  }`}>
                    {isRunning ? "Running" : isCreating ? "Starting" : agent.status}
                  </span>
                </div>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 text-[#c5c9cd] group-hover:text-[#de1b23] transition-colors flex-shrink-0 ${isRTL ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-up animate-delay-300">
        {[
          { href: "/dashboard/billing", label: "Upgrade Plan", desc: "Manage your subscription", color: "#de1b23" },
          { href: "/dashboard/guides", label: "Setup Guides", desc: "Connect messaging channels", color: "#6366f1" },
          { href: "/dashboard/profile", label: "Profile", desc: "Settings & preferences", color: "#22c55e" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-2xl border border-[#e5e7eb] p-4 hover:shadow-md hover:-translate-y-0.5 hover:border-[#de1b23]/10 transition-all duration-300 group"
          >
            <p className="text-sm font-semibold text-[#1a1a2e] group-hover:text-[#de1b23] transition-colors">{item.label}</p>
            <p className="text-xs text-[#949aa0] mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
