"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface AgentOverviewTabProps {
  agentId: string;
}

const PLATFORM_COLORS: Record<string, string> = {
  telegram: "#0088cc",
  whatsapp: "#25d366",
  discord: "#5865f2",
  signal: "#3a76f0",
  slack: "#e01e5a",
};

export function AgentOverviewTab({ agentId }: AgentOverviewTabProps) {
  const { t, isRTL } = useLanguage();
  const [channels, setChannels] = useState<{ name: string; color: string; connected: boolean }[]>([
    { name: "Telegram", color: "#0088cc", connected: false },
    { name: "WhatsApp", color: "#25d366", connected: false },
    { name: "Discord", color: "#5865f2", connected: false },
  ]);

  useEffect(() => {
    fetch(`/api/agents/${agentId}/channels`)
      .then((r) => r.ok ? r.json() : [])
      .then((data: { platform: string }[]) => {
        if (data.length === 0) return;
        const connected = new Set(data.map((d) => d.platform));
        setChannels(
          data.map((d) => ({
            name: d.platform.charAt(0).toUpperCase() + d.platform.slice(1),
            color: PLATFORM_COLORS[d.platform] ?? "#949aa0",
            connected: connected.has(d.platform),
          }))
        );
      })
      .catch(() => {});
  }, [agentId]);

  const skills = [
    { name: "Soul.md", active: true },
    { name: "Identity.md", active: true },
    { name: "Heartbeat", active: true },
    { name: "Memory", active: true },
  ];

  const quickActions = [
    { label: t("agents", "configure"), href: `/dashboard/agents/${agentId}/configure` },
    { label: t("agents", "pairing"), href: `/dashboard/agents/${agentId}/pairing` },
    { label: t("agents", "monitor"), href: `/dashboard/agents/${agentId}/monitor` },
    { label: t("agents", "channelsTitle"), href: `/dashboard/agents/${agentId}/channels` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Skills */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 hover:shadow-sm transition-all duration-300">
        <h3 className="text-xs font-semibold text-[#949aa0] uppercase tracking-wider mb-3">
          {t("agents", "activeSkills")}
        </h3>
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-2.5 text-sm text-[#1a1a2e] p-2 rounded-lg hover:bg-[#f6f9fa] transition-colors">
              <div className={`w-1.5 h-1.5 rounded-full ${skill.active ? "bg-green-500" : "bg-[#c5c9cd]"}`} />
              <span className="font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 hover:shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#949aa0] uppercase tracking-wider">
            {t("agents", "channels")}
          </h3>
          <Link
            href={`/dashboard/agents/${agentId}/pairing`}
            className="text-[10px] text-[#de1b23] font-medium hover:underline"
          >
            {t("agents", "connect")}
          </Link>
        </div>
        <div className="space-y-2">
          {channels.map((ch) => (
            <div key={ch.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f6f9fa] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                <span className="text-sm font-medium text-[#1a1a2e]">{ch.name}</span>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                ch.connected ? "bg-green-50 text-green-600" : "bg-[#f6f9fa] text-[#c5c9cd]"
              }`}>
                {ch.connected ? t("agents", "statusConnected") : t("agents", "statusNotConnected")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 hover:shadow-sm transition-all duration-300">
        <h3 className="text-xs font-semibold text-[#949aa0] uppercase tracking-wider mb-3">
          {t("agents", "quickActions")}
        </h3>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#1a1a2e] hover:bg-[#fef2f2] hover:text-[#de1b23] transition-all duration-200 group`}
            >
              <span>{action.label}</span>
              <svg className={`w-4 h-4 text-[#c5c9cd] group-hover:text-[#de1b23] transition-colors ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
