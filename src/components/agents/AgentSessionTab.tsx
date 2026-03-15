"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: string[];
}

export function AgentSessionTab() {
  const { t, isRTL } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col bg-white rounded-xl border border-[#e5e7eb] overflow-hidden" style={{ height: "calc(100vh - 340px)", minHeight: "400px" }}>
      {/* Demo mode badge */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/50 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span className="text-xs text-amber-700 font-medium">{t("agents", "demoMode")}</span>
        <span className="text-xs text-amber-600/60">{t("agents", "demoModeDesc")}</span>
      </div>

      {/* Messages — always LTR so chat bubbles don't flip in RTL */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4" dir="ltr">
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
            className="p-2.5 rounded-xl bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-md hover:shadow-[#de1b23]/25 transition-all duration-300 disabled:opacity-40"
          >
            <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
