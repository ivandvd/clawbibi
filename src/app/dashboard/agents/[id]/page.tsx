"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: string[];
}

interface AgentData {
  id: string;
  name: string;
  model: string;
  status: string;
}

export default function AgentDetailPage() {
  const { t, isRTL } = useLanguage();
  const params = useParams();
  const agentId = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"session" | "logs" | "analytics">("session");
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`/api/agents/${agentId}`);
        if (res.ok) {
          setAgent(await res.json());
        }
      } catch {}
      setLoading(false);
    }
    fetchAgent();
  }, [agentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t("agents", "demoReply"),
        timestamp: new Date(),
        actions: [t("agents", "demoAction1"), t("agents", "demoAction2")],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-up">
        <div className="w-10 h-10 border-2 border-[#de1b23] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#949aa0]">{t("agents", "loading")}</p>
      </div>
    );
  }

  const tabs = [
    { id: "session", label: t("agents", "tabSession") },
    { id: "logs", label: t("agents", "tabLogs") },
    { id: "analytics", label: t("agents", "tabAnalytics") },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/agents" className="w-8 h-8 rounded-lg bg-[#f6f9fa] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#e5e7eb] transition-all duration-200">
            <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {(agent?.name || "AG").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-base font-bold text-[#1a1a2e]">
              {agent?.name || agentId}
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-pulse" />
              <span className="text-xs text-green-600 font-medium">{t("agents", "connected")}</span>
            </div>
          </div>
        </div>

        {/* Action links + Tabs */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5">
            <Link href={`/dashboard/agents/${agentId}/monitor`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200">
              {t("agents", "monitor")}
            </Link>
            <Link href={`/dashboard/agents/${agentId}/configure`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200">
              {t("agents", "configure")}
            </Link>
            <Link href={`/dashboard/agents/${agentId}/pairing`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200">
              {t("agents", "pairing")}
            </Link>
          </div>
          <div className="w-px h-5 bg-[#e5e7eb] hidden md:block" />
          <div className="flex items-center gap-1 bg-[#f6f9fa] rounded-xl p-1">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id as "session" | "logs" | "analytics")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  tab === tb.id
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-[#949aa0] hover:text-[#1a1a2e]"
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area + Config Sidebar */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Config Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 h-full overflow-y-auto hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500">
            <h3 className="text-xs font-semibold text-[#949aa0] uppercase tracking-wider mb-4">
              {t("agents", "configuration")}
            </h3>

            {/* Active Model */}
            <div className="mb-5 p-3 bg-[#f6f9fa] rounded-xl">
              <p className="text-[10px] text-[#949aa0] uppercase tracking-wider mb-1.5">{t("agents", "activeModel")}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 status-pulse" />
                <span className="text-sm font-semibold text-[#1a1a2e]">{agent?.model || "Claude 4.5"}</span>
              </div>
            </div>

            {/* Context */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#949aa0] font-medium">{t("agents", "context")}</p>
                <p className="text-xs text-[#1a1a2e] font-bold">128K</p>
              </div>
              <div className="w-full bg-[#f6f9fa] rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#de1b23] to-[#de1b23]/60 h-2.5 rounded-full transition-all duration-500" style={{ width: "35%" }} />
              </div>
            </div>

            {/* Max Tokens */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#949aa0] font-medium">{t("agents", "maxTokens")}</p>
                <p className="text-xs text-[#1a1a2e] font-bold">4,096</p>
              </div>
              <div className="w-full bg-[#f6f9fa] rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#6366f1] to-[#6366f1]/60 h-2.5 rounded-full transition-all duration-500" style={{ width: "50%" }} />
              </div>
            </div>

            {/* Active Skills */}
            <div>
              <h3 className="text-xs font-semibold text-[#949aa0] uppercase tracking-wider mb-3">
                {t("agents", "activeSkills")}
              </h3>
              <div className="space-y-2">
                {["Soul.md", "Identity.md", "Heartbeat", "Memory"].map((skill) => (
                  <div key={skill} className="flex items-center gap-2.5 text-sm text-[#1a1a2e] p-2 rounded-lg hover:bg-[#f6f9fa] transition-colors duration-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:shadow-sm transition-shadow duration-500">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-16 text-[#c5c9cd]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#f6f9fa] flex items-center justify-center">
                  <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">{t("agents", "chatEmpty")}</p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-[#1a1a2e] text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm"
                    : "bg-[#f6f9fa] text-[#1a1a2e] rounded-2xl rounded-bl-md px-4 py-3"
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.actions && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1.5">
                      {msg.actions.map((action) => (
                        <div key={action} className="flex items-center gap-1.5 text-xs text-[#de1b23]">
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {action}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#f6f9fa] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#e5e7eb] p-4 bg-[#fafbfc]">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("agents", "chatPlaceholder")}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a2e] placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#de1b23]/20 focus:border-[#de1b23] transition-all text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-md hover:shadow-[#de1b23]/25 transition-all duration-300 disabled:opacity-40 disabled:hover:shadow-none"
              >
                <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
