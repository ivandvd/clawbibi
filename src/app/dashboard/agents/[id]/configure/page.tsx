"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const availableModels = [
  { id: "claude-4.5", name: "Claude 4.5 Sonnet", desc: "Fast & intelligent" },
  { id: "claude-opus", name: "Claude Opus", desc: "Most powerful" },
  { id: "gpt-4o", name: "GPT-4o", desc: "Multimodal" },
  { id: "gemini-2.5", name: "Gemini 2.5 Pro", desc: "Google's best" },
];

export default function ConfigurePage() {
  const { t, isRTL } = useLanguage();
  const params = useParams();
  const [model, setModel] = useState("claude-4.5");
  const [contextSize, setContextSize] = useState(128000);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 animate-fade-up">
        <Link href={`/dashboard/agents/${params.id}`} className="w-8 h-8 rounded-lg bg-[#f6f9fa] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#e5e7eb] transition-all duration-200">
          <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("agents", "configureTitle")}</h1>
          <p className="text-sm text-[#949aa0]">{t("agents", "configureSubtitle")}</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Model */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-100">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4">{t("agents", "activeModel")}</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableModels.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  model === m.id ? "border-[#de1b23] bg-[#fef2f2] shadow-sm" : "border-[#e5e7eb] hover:border-[#c5c9cd] hover:shadow-sm"
                }`}
              >
                <p className="text-sm font-semibold text-[#1a1a2e]">{m.name}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Context Size */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <h3 className="text-sm font-semibold text-[#1a1a2e]">{t("agents", "context")}</h3>
            </div>
            <span className="text-sm font-bold text-[#de1b23] bg-[#de1b23]/10 px-3 py-1 rounded-lg">{(contextSize / 1000).toFixed(0)}K</span>
          </div>
          <input
            type="range"
            min={8000}
            max={200000}
            step={8000}
            value={contextSize}
            onChange={(e) => setContextSize(Number(e.target.value))}
            className="w-full accent-[#de1b23] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#c5c9cd] mt-2">
            <span>8K</span>
            <span>200K</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <h3 className="text-sm font-semibold text-[#1a1a2e]">{t("agents", "maxTokens")}</h3>
            </div>
            <span className="text-sm font-bold text-[#6366f1] bg-[#6366f1]/10 px-3 py-1 rounded-lg">{maxTokens.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={256}
            max={16384}
            step={256}
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            className="w-full accent-[#6366f1] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#c5c9cd] mt-2">
            <span>256</span>
            <span>16,384</span>
          </div>
        </div>

        {/* Save */}
        <div className="animate-fade-up animate-delay-400">
          <button
            onClick={handleSave}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              saved
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {saved ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t("profile", "saved")}
              </span>
            ) : (
              t("agents", "saveChanges")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
