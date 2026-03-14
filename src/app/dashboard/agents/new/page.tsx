"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const models = [
  {
    id: "claude-4.5",
    name: "Claude 4.5 Sonnet",
    desc: "Fast, intelligent, best for most tasks",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    recommended: true,
  },
  {
    id: "claude-opus",
    name: "Claude Opus",
    desc: "Most powerful, complex reasoning",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    desc: "OpenAI's flagship multimodal model",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    id: "gemini-2.5",
    name: "Gemini 2.5 Pro",
    desc: "Google's most capable model",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
];

const channels = [
  {
    id: "telegram",
    name: "Telegram",
    color: "#0088cc",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    color: "#25d366",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "discord",
    name: "Discord",
    color: "#5865f2",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
  {
    id: "signal",
    name: "Signal",
    color: "#3a76f0",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
      </svg>
    ),
  },
];

export default function CreateAgentPage() {
  const { t, isRTL } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [model, setModel] = useState("claude-4.5");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, model, channels: selectedChannels }),
      });
      if (res.ok) {
        const agent = await res.json();
        router.push(`/dashboard/agents/${agent.id}`);
      }
    } catch {
      // handle error
    }
    setCreating(false);
  };

  if (creating) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-up">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-3 border-[#de1b23]/20 rounded-full" />
          <div className="absolute inset-0 w-20 h-20 border-3 border-[#de1b23] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/clawbibi-logo.png" alt="" className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
          {t("agents", "creatingTitle")}
        </h2>
        <p className="text-sm text-[#949aa0] mb-6">
          {t("agents", "creatingDesc")}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-1">
          <Link href="/dashboard/agents" className="w-8 h-8 rounded-lg bg-[#f6f9fa] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#e5e7eb] transition-all duration-200">
            <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              {t("agents", "newTitle")}
            </h1>
            <p className="text-[#949aa0] text-sm">
              {t("agents", "newSubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8 animate-fade-up animate-delay-100">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
          step === 1 ? "bg-[#de1b23] text-white shadow-md shadow-[#de1b23]/25" : "bg-emerald-50 text-emerald-600"
        }`}>
          {step > 1 ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
          )}
          {t("agents", "step1")}
        </div>
        <div className="flex-1 h-px bg-[#e5e7eb] max-w-12" />
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
          step === 2 ? "bg-[#de1b23] text-white shadow-md shadow-[#de1b23]/25" : "bg-[#f6f9fa] text-[#949aa0]"
        }`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
            step === 2 ? "bg-white/20" : "bg-[#e5e7eb]"
          }`}>2</span>
          {t("agents", "step2")}
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-6 animate-fade-up animate-delay-200">
          {/* Agent Name */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500">
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-3">
              {t("agents", "nameLabel")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("agents", "namePlaceholder")}
              className="w-full px-4 py-3.5 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a2e] placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#de1b23]/20 focus:border-[#de1b23] transition-all text-sm"
            />
          </div>

          {/* Model Selection */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500">
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-3">
              {t("agents", "modelLabel")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all duration-300 group/model ${
                    model === m.id
                      ? "border-[#de1b23] bg-[#fef2f2] shadow-sm"
                      : "border-[#e5e7eb] hover:border-[#c5c9cd] hover:shadow-sm"
                  }`}
                >
                  {m.recommended && (
                    <span className="absolute -top-2 right-3 text-[10px] bg-[#de1b23] text-white px-2 py-0.5 rounded-full font-medium">
                      {t("agents", "recommended")}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      model === m.id ? "bg-[#de1b23]/10 text-[#de1b23]" : "bg-[#f6f9fa] text-[#949aa0] group-hover/model:text-[#1a1a2e]"
                    }`}>
                      {m.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a2e]">{m.name}</p>
                      <p className="text-xs text-[#949aa0] mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-xl bg-[#de1b23] text-white font-semibold text-sm hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {t("agents", "next")}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-up">
          {/* Channel Selection */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500">
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-1">
              {t("agents", "channelsLabel")}
            </label>
            <p className="text-xs text-[#949aa0] mb-4">
              {t("agents", "channelsDesc")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => toggleChannel(ch.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 group/ch ${
                    selectedChannels.includes(ch.id)
                      ? "border-[#de1b23] bg-[#fef2f2] shadow-sm"
                      : "border-[#e5e7eb] hover:border-[#c5c9cd] hover:shadow-sm"
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: selectedChannels.includes(ch.id) ? `${ch.color}15` : "#f6f9fa",
                      color: selectedChannels.includes(ch.id) ? ch.color : "#949aa0",
                    }}
                  >
                    {ch.icon}
                  </div>
                  <span className="text-sm font-medium text-[#1a1a2e]">{ch.name}</span>
                  {selectedChannels.includes(ch.id) && (
                    <svg className="w-4 h-4 text-[#de1b23] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3.5 rounded-xl border-2 border-[#e5e7eb] text-[#949aa0] font-semibold text-sm hover:bg-[#f6f9fa] hover:border-[#c5c9cd] transition-all duration-300"
            >
              {t("agents", "back")}
            </button>
            <button
              onClick={handleCreate}
              className="flex-1 py-3.5 rounded-xl bg-[#de1b23] text-white font-semibold text-sm hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              {t("agents", "create")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
