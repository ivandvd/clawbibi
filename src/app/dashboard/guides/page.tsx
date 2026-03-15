"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const guides = [
  {
    href: "/dashboard/guides/telegram",
    color: "#0088cc",
    bg: "from-sky-50/60",
    steps: 3,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    nameKey: "telegram",
    descKey: "telegramDesc",
  },
  {
    href: "/dashboard/guides/whatsapp",
    color: "#25d366",
    bg: "from-emerald-50/60",
    steps: 4,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    nameKey: "whatsapp",
    descKey: "whatsappDesc",
  },
  {
    href: "/dashboard/guides/discord",
    color: "#5865F2",
    bg: "from-indigo-50/60",
    steps: 4,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    nameKey: "discord",
    descKey: "discordDesc",
  },
  {
    href: "/dashboard/guides/signal",
    color: "#3A76F0",
    bg: "from-blue-50/60",
    steps: 6,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.148 4.065a8.02 8.02 0 0 1 5.43 2.178l-.34.34a7.518 7.518 0 0 0-5.09-1.993c-2.03 0-3.879.8-5.228 2.101l-.334-.334A8.014 8.014 0 0 1 12.148 4.065zM4.01 7.196a8.02 8.02 0 0 1 1.8-2.196l.334.334A7.505 7.505 0 0 0 4.523 7.53L4.01 7.196zm.513 9.558a8.02 8.02 0 0 1-1.8-2.196l.513-.333a7.506 7.506 0 0 0 1.621 1.996l-.334.533zm7.625 3.18a8.02 8.02 0 0 1-5.43-2.178l.334-.334a7.518 7.518 0 0 0 5.096 2.003c2.03 0 3.879-.8 5.228-2.101l.334.334A8.014 8.014 0 0 1 12.148 19.934zm7.844-3.196a7.505 7.505 0 0 0 1.621-1.996l.513.333a8.02 8.02 0 0 1-1.8 2.196l-.334-.533zm1.621-5.334a7.506 7.506 0 0 0-1.621-1.996l.334-.533a8.02 8.02 0 0 1 1.8 2.196l-.513.333zM12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5z"/>
      </svg>
    ),
    nameKey: "signal",
    descKey: "signalDesc",
  },
  {
    href: "/dashboard/guides/slack",
    color: "#4A154B",
    bg: "from-purple-50/60",
    steps: 5,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
    nameKey: "slack",
    descKey: "slackDesc",
  },
  {
    href: "/dashboard/guides/troubleshooting",
    color: "#f59e0b",
    bg: "from-amber-50/60",
    steps: null,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    nameKey: "troubleshooting",
    descKey: "troubleshootingDesc",
  },
];

export default function GuidesIndexPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("guidesIndex", "title")}</h1>
            <p className="text-[#949aa0] text-sm">{t("guidesIndex", "subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Guide cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {guides.map((guide, i) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-lg transition-all duration-500 animate-fade-up"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, ${guide.color}, ${guide.color}66)` }}
            />
            {/* Background glow */}
            <div
              className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              style={{ background: guide.color }}
            />
            <div className="relative flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: `${guide.color}15`, color: guide.color }}
              >
                {guide.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-bold text-[#1a1a2e]">{t("breadcrumbs", guide.nameKey as Parameters<typeof t>[1])}</h2>
                  {guide.steps !== null ? (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color: guide.color, borderColor: `${guide.color}30`, backgroundColor: `${guide.color}08` }}
                    >
                      {guide.steps} {t("guidesIndex", "steps")}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-[#949aa0] leading-relaxed">
                  {t("guidesIndex", guide.descKey as Parameters<typeof t>[1])}
                </p>
              </div>
            </div>
            <div className="relative mt-4 flex items-center justify-end">
              <span
                className="text-xs font-semibold flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                style={{ color: guide.color }}
              >
                {t("guidesIndex", "startGuide")}
                <svg className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* OpenClaw — full-width featured card */}
      <Link
        href="/dashboard/guides/openclaw"
        className="relative overflow-hidden bg-white rounded-2xl border border-[#de1b23]/20 p-5 group hover:shadow-lg hover:border-[#de1b23]/40 transition-all duration-500 animate-fade-up animate-delay-700 flex items-center justify-between gap-4"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#de1b23] to-[#de1b23]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fef2f2]/60 to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#de1b23]/10 text-[#de1b23] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-base font-bold text-[#1a1a2e]">{t("breadcrumbs", "openclaw")}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#de1b23]/10 text-[#de1b23] border border-[#de1b23]/20">
                {t("openclawGuide", "selfHosted")}
              </span>
            </div>
            <p className="text-xs text-[#949aa0]">{t("guidesIndex", "openclawDesc")}</p>
          </div>
        </div>
        <span className="relative flex-shrink-0 text-xs font-semibold text-[#de1b23] flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
          {t("guidesIndex", "startGuide")}
          <svg className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
