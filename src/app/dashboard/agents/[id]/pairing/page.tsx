"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const platforms = [
  {
    id: "telegram",
    name: "Telegram",
    color: "#0088cc",
    connected: false,
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
    connected: false,
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
    connected: false,
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
    connected: false,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
      </svg>
    ),
  },
  {
    id: "slack",
    name: "Slack",
    color: "#e01e5a",
    connected: false,
    soon: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
      </svg>
    ),
  },
];

export default function PairingPage() {
  const { t, isRTL } = useLanguage();
  const params = useParams();
  const [selected, setSelected] = useState<string | null>(null);

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
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("agents", "pairingTitle")}</h1>
          <p className="text-sm text-[#949aa0]">{t("agents", "pairingSubtitle")}</p>
        </div>
      </div>

      <div className="space-y-3">
        {platforms.map((p, i) => (
          <button
            key={p.id}
            onClick={() => !p.soon && setSelected(p.id === selected ? null : p.id)}
            disabled={p.soon}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-left group animate-fade-up ${
              selected === p.id
                ? "border-[#de1b23] bg-[#fef2f2] shadow-md"
                : p.soon
                ? "border-[#e5e7eb] opacity-50 cursor-default"
                : "border-[#e5e7eb] hover:border-[#c5c9cd] hover:shadow-sm"
            }`}
            style={{ animationDelay: `${(i + 1) * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{ backgroundColor: `${p.color}12`, color: p.color }}
              >
                {p.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{p.name}</p>
                <p className="text-xs text-[#949aa0]">
                  {p.connected ? t("agents", "statusConnected") : p.soon ? t("dashboard", "soon") : t("agents", "statusNotConnected")}
                </p>
              </div>
            </div>
            {p.soon ? (
              <span className="text-[10px] text-[#c5c9cd] bg-[#f6f9fa] px-2.5 py-1 rounded-full font-medium">{t("dashboard", "soon")}</span>
            ) : (
              <span className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 ${
                p.connected
                  ? "bg-green-50 text-green-600"
                  : selected === p.id
                  ? "bg-[#de1b23] text-white"
                  : "bg-[#f6f9fa] text-[#949aa0] group-hover:bg-[#de1b23]/10 group-hover:text-[#de1b23]"
              }`}>
                {p.connected ? t("agents", "statusConnected") : t("agents", "connect")}
              </span>
            )}
          </button>
        ))}
      </div>

      {selected === "telegram" && (
        <div className="mt-6 bg-white rounded-2xl border border-[#e5e7eb] p-6 animate-fade-up hover:shadow-md transition-all duration-500">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-5">{t("guides", "telegramSetup")}</h3>
          <ol className="space-y-4 text-sm text-[#4a4a5a]">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">1</span>
              <div>
                <p className="font-medium text-[#1a1a2e] mb-0.5">{t("guides", "telegramStep1Title")}</p>
                <p className="text-xs text-[#949aa0]">{t("guides", "telegramStep1")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">2</span>
              <div>
                <p className="font-medium text-[#1a1a2e] mb-0.5">{t("guides", "telegramStep2Title")}</p>
                <p className="text-xs text-[#949aa0]">{t("guides", "telegramStep2")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">3</span>
              <div>
                <p className="font-medium text-[#1a1a2e] mb-0.5">{t("guides", "telegramStep3Title")}</p>
                <p className="text-xs text-[#949aa0]">{t("guides", "telegramStep3")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 pt-5 border-t border-[#e5e7eb]">
            <input
              type="text"
              placeholder={t("guides", "telegramTokenPlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] transition-all"
              dir="ltr"
            />
            <button className="mt-3 w-full py-3 rounded-xl bg-[#0088cc] text-white text-sm font-semibold hover:bg-[#006da3] hover:shadow-lg hover:shadow-[#0088cc]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
              {t("agents", "connect")} Telegram
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
