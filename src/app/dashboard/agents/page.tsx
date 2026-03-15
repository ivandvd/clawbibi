"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { AgentCard } from "@/components/agents/AgentCard";

interface Agent {
  id: string;
  name: string;
  status: string;
  subdomain?: string;
  model: string;
  storage_mb?: number;
  uptime_mins?: number;
}

export default function AgentsPage() {
  const { t } = useLanguage();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch("/api/agents");
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      }
      setLoading(false);
    }
    fetchAgents();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              {t("agents", "title")}
            </h1>
            <p className="text-[#949aa0] text-sm">
              {t("agents", "subtitle")}
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/agents/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#de1b23] text-white text-sm font-semibold hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t("agents", "createNew")}
        </Link>
      </div>

      {/* Agent List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 animate-fade-up animate-delay-100">
          <div className="w-10 h-10 border-2 border-[#de1b23] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-[#949aa0]">{t("agents", "loading")}</p>
        </div>
      ) : agents.length === 0 ? (
        <div className="animate-fade-up animate-delay-100">
          {/* Ghost preview cards — show what agents will look like */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 opacity-40 pointer-events-none select-none" aria-hidden>
            {[
              { name: "My Assistant", subdomain: "my-assistant.clawbibi.ai", uptime: "12h", storage: "128 MB", model: "Claude 4.5" },
              { name: "Support Bot", subdomain: "support-bot.clawbibi.ai", uptime: "3d", storage: "64 MB", model: "Claude 4.5" },
            ].map((agent) => (
              <div key={agent.name} className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-5">
                {/* Top row: name + status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {agent.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a2e]">{agent.name}</h3>
                      <p className="text-xs text-[#949aa0] font-mono" dir="ltr">{agent.subdomain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Running
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs text-[#949aa0] mt-3 mb-4 py-3 px-3 bg-[#f6f9fa] rounded-xl" dir="ltr">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {agent.uptime}
                  </span>
                  <span className="w-px h-3 bg-[#e5e7eb]" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                    {agent.storage}
                  </span>
                  <span className="w-px h-3 bg-[#e5e7eb]" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {agent.model}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-4 py-2 rounded-xl bg-[#1a1a2e] text-white text-xs font-semibold">Open Gateway</div>
                  <div className="px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs text-[#949aa0] font-medium">Monitor</div>
                  <div className="px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs text-[#949aa0] font-medium">Configure</div>
                  <div className="px-3 py-2 rounded-xl border border-[#e5e7eb] text-xs text-[#949aa0] font-medium">Pairing</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{t("agents", "emptyTitle")}</h3>
            <p className="text-sm text-[#949aa0] mb-6 max-w-sm mx-auto leading-relaxed">
              {t("agents", "emptyDesc")}
            </p>
            <Link
              href="/dashboard/agents/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#de1b23] text-white text-sm font-semibold hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {t("agents", "createFirst")}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent, i) => (
            <div key={agent.id} className="animate-fade-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <AgentCard
                id={agent.id}
                name={agent.name}
                status={agent.status}
                subdomain={agent.subdomain}
                model={agent.model}
                storageMb={agent.storage_mb || 0}
                uptimeMins={agent.uptime_mins || 0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
