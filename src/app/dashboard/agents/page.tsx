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
      } catch {
        // silently fail
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
        <div className="text-center py-20 animate-fade-up animate-delay-100">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#f6f9fa] to-[#e5e7eb] border border-[#e5e7eb] flex items-center justify-center">
            <svg className="w-10 h-10 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">
            {t("agents", "emptyTitle")}
          </h3>
          <p className="text-sm text-[#949aa0] mb-8 max-w-sm mx-auto leading-relaxed">
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
