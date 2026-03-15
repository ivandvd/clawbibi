"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OpenClawGuidePage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link href="/dashboard/guides" className="inline-flex items-center gap-2 text-sm text-[#949aa0] hover:text-[#1a1a2e] transition-colors mb-6 animate-fade-up">
        <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t("troubleshooting", "backToGuides")}
      </Link>

      {/* Header */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#de1b23]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#de1b23] to-[#de1b23]/40" />
        <div className="relative flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#de1b23]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("openclawGuide", "headerTitle")}</h1>
              <p className="text-sm text-[#949aa0]">{t("openclawGuide", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-[#de1b23]/30 text-[#de1b23] text-xs font-bold bg-[#fef2f2] flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
            {t("openclawGuide", "selfHosted")}
          </span>
        </div>
      </div>

      {/* What is OpenClaw */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-blue-100/80 p-5 mb-6 group hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-150">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200" />
        <div className="relative flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-blue-600 mb-1">{t("openclawGuide", "whatIsIt")}</h2>
            <p className="text-sm text-[#4a4a5a] leading-relaxed">{t("openclawGuide", "whatIsItDesc")}</p>
          </div>
        </div>
      </div>

      {/* What You'll Need */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "whatYouNeed")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: t("openclawGuide", "need1"), desc: t("openclawGuide", "need1Desc"), icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" },
            { title: t("openclawGuide", "need2"), desc: t("openclawGuide", "need2Desc"), icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" },
            { title: t("openclawGuide", "need3"), desc: t("openclawGuide", "need3Desc"), icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" },
            { title: t("openclawGuide", "need4"), desc: t("openclawGuide", "need4Desc"), icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
          ].map((item, i) => (
            <div key={i} className="bg-[#f6f9fa] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/need">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#de1b23] text-white flex items-center justify-center shadow-sm shadow-[#de1b23]/25 group-hover/need:scale-110 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{item.title}</p>
              </div>
              <p className="text-xs text-[#949aa0]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Node.js info box */}
      <div className="relative overflow-hidden bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 mb-6 animate-fade-up animate-delay-250">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-700 mb-1">{t("openclawGuide", "nodeTitle")}</p>
            <p className="text-xs text-amber-700 mb-2">{t("openclawGuide", "nodeDesc")}</p>
            <div className="bg-[#1a1a2e] rounded-lg px-4 py-2 font-mono text-xs text-green-400 mb-2">node --version</div>
            <p className="text-xs text-amber-700">{t("openclawGuide", "nodeInstall")}</p>
          </div>
        </div>
      </div>

      {/* Steps header */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-300">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "stepsTitle")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#de1b23]/5 border border-[#de1b23]/10 text-[#de1b23] text-[10px] font-semibold tracking-wide uppercase">5 {t("telegramGuide", "stepsLabel")}</span>
      </div>

      {/* Step 1: Install */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#de1b23]/20 transition-all duration-500 animate-fade-up animate-delay-400">
        <div className="bg-gradient-to-r from-red-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#de1b23] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#de1b23]/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "s1Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("openclawGuide", "s1Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-5">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("openclawGuide", "s1Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">2</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-3">Run the installer for your OS:</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] font-bold text-[#949aa0] uppercase tracking-wider mb-1">{t("openclawGuide", "s1MacLabel")}</p>
                    <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-green-400 overflow-x-auto">
                      curl -fsSL https://openclaw.ai/install.sh | bash
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#949aa0] uppercase tracking-wider mb-1">{t("openclawGuide", "s1WinLabel")}</p>
                    <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-blue-300 overflow-x-auto">
                      iwr -useb https://openclaw.ai/install.ps1 | iex
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-[#4a4a5a]">{t("openclawGuide", "s1Step3")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">4</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s1Step4")}</p>
                <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-green-400">openclaw --version</div>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("openclawGuide", "s1Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 2: Onboarding Wizard */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#de1b23]/20 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="bg-gradient-to-r from-red-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#de1b23] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#de1b23]/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "s2Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("openclawGuide", "s2Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">1</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s2Step1")}</p>
                <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-green-400">openclaw onboard --install-daemon</div>
              </div>
            </li>
          </ol>

          <div className="mt-5 space-y-3">
            {[
              { q: t("openclawGuide", "s2Q1"), hint: t("openclawGuide", "s2Q1Hint") },
              { q: t("openclawGuide", "s2Q2"), hint: t("openclawGuide", "s2Q2Hint") },
              { q: t("openclawGuide", "s2Q3"), hint: t("openclawGuide", "s2Q3HintA") + " / " + t("openclawGuide", "s2Q3HintB") },
              { q: t("openclawGuide", "s2Q4"), hint: t("openclawGuide", "s2Q4Hint") },
              { q: t("openclawGuide", "s2Q5"), hint: t("openclawGuide", "s2Q5Hint") },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 bg-[#f6f9fa] rounded-xl p-3.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{item.q}</p>
                  <p className="text-xs text-[#949aa0] mt-0.5">{item.hint}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("openclawGuide", "s2Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 3: Verify */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#de1b23]/20 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="bg-gradient-to-r from-red-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#de1b23] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#de1b23]/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "s3Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("openclawGuide", "s3Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">1</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s3Step1")}</p>
                <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-green-400">openclaw gateway status</div>
                <p className="text-xs text-[#949aa0] mt-1.5 italic">{t("openclawGuide", "s3Step1Expected")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">2</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s3Step2")}</p>
                <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-green-400">openclaw dashboard</div>
                <p className="text-xs text-[#949aa0] mt-1.5 italic">{t("openclawGuide", "s3Step2Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">3</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s3Step3")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-[#1a1a2e] font-medium">
                  Hello! Can you introduce yourself?
                </div>
              </div>
            </li>
          </ol>
          <div className="mt-5 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("openclawGuide", "s3Done")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Channels */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#de1b23]/20 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="bg-gradient-to-r from-red-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#de1b23] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#de1b23]/25 group-hover:scale-110 transition-transform duration-300">4</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "s4Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("openclawGuide", "s4Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <div className="space-y-3 mb-5">
            {[
              { color: "#25d366", label: "WhatsApp", cmd: "openclaw channels login whatsapp", hint: t("openclawGuide", "s4WhatsApp") },
              { color: "#0088cc", label: "Telegram", cmd: null, hint: t("openclawGuide", "s4Telegram") },
              { color: "#5865F2", label: "Discord", cmd: null, hint: t("openclawGuide", "s4Discord") },
            ].map((ch) => (
              <div key={ch.label} className="bg-[#f6f9fa] rounded-xl p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                  <p className="text-sm font-semibold text-[#1a1a2e]">{ch.label}</p>
                </div>
                {ch.cmd && (
                  <div className="bg-[#1a1a2e] rounded-lg px-3 py-2 font-mono text-xs text-green-400 mb-2">{ch.cmd}</div>
                )}
                <p className="text-xs text-[#949aa0]">{ch.hint}</p>
              </div>
            ))}
          </div>

          {/* Approve numbers note */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-blue-700 mb-1.5">{t("openclawGuide", "s4Approve")}</p>
              <div className="bg-[#1a1a2e] rounded-lg px-3 py-2 font-mono text-xs text-green-400">openclaw pairing approve whatsapp +15551234567</div>
            </div>
          </div>

          <p className="text-xs text-[#949aa0] italic">
            {t("openclawGuide", "s4SeeGuides")}{" "}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: "/dashboard/guides/telegram", label: "Telegram", color: "#0088cc" },
              { href: "/dashboard/guides/whatsapp", label: "WhatsApp", color: "#25d366" },
              { href: "/dashboard/guides/discord", label: "Discord", color: "#5865F2" },
              { href: "/dashboard/guides/slack", label: "Slack", color: "#4A154B" },
              { href: "/dashboard/guides/signal", label: "Signal", color: "#3A76F0" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm"
                style={{ color: link.color, borderColor: `${link.color}30`, backgroundColor: `${link.color}08` }}
              >
                {link.label} →
              </Link>
            ))}
          </div>

          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("openclawGuide", "s4Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 5: Skills */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-[#de1b23]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-red-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#de1b23] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#de1b23]/25 group-hover:scale-110 transition-transform duration-300">5</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "s5Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("openclawGuide", "s5Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">1</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s5Step1")}</p>
                <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 font-mono text-xs text-green-400">openclaw skills install web-search</div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-xs text-[#949aa0]">{t("openclawGuide", "s5Skills")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#de1b23]/10 text-[#de1b23] text-xs font-bold flex items-center justify-center">3</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("openclawGuide", "s5Step3")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-[#1a1a2e] font-medium">
                  Can you search the internet for information about dinosaurs?
                </div>
              </div>
            </li>
          </ol>
          <div className="mt-5 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("openclawGuide", "s5Done")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-amber-200/60 p-6 mb-6 group hover:shadow-md hover:border-amber-300/60 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "tsTitle")}</h2>
          </div>

          <div className="space-y-4">
            {[
              { title: t("openclawGuide", "tsCommandNotFound"), fixes: [t("openclawGuide", "tsCommandFix1"), t("openclawGuide", "tsCommandFix2"), t("openclawGuide", "tsCommandFix3")] },
              { title: t("openclawGuide", "tsGateway"), fixes: [t("openclawGuide", "tsGatewayFix1"), t("openclawGuide", "tsGatewayFix2"), t("openclawGuide", "tsGatewayFix3")] },
              { title: t("openclawGuide", "tsNoAI"), fixes: [t("openclawGuide", "tsNoAIFix1"), t("openclawGuide", "tsNoAIFix2"), t("openclawGuide", "tsNoAIFix3")] },
              { title: t("openclawGuide", "tsWhatsApp"), fixes: [t("openclawGuide", "tsWhatsAppFix1"), t("openclawGuide", "tsWhatsAppFix2"), t("openclawGuide", "tsWhatsAppFix3")] },
            ].map((section) => (
              <div key={section.title} className="bg-[#f6f9fa] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{section.title}</p>
                <ul className="space-y-1.5">
                  {section.fixes.map((fix, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {fix}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety tips */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "safetyTitle")}</h2>
        </div>
        <div className="space-y-2.5">
          {[
            t("openclawGuide", "safety1"),
            t("openclawGuide", "safety2"),
            t("openclawGuide", "safety3"),
            t("openclawGuide", "safety4"),
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#de1b23]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                </svg>
              </div>
              <p className="text-sm text-[#4a4a5a]">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("openclawGuide", "resourcesTitle")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t("openclawGuide", "resource1"), href: "https://docs.openclaw.ai", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
            { label: t("openclawGuide", "resource2"), href: "https://clawhub.ai", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
            { label: t("openclawGuide", "resource3"), href: "https://github.com/openclaw/openclaw", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" },
            { label: t("openclawGuide", "resource4"), href: "https://openclaw.ai/community", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
          ].map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#f6f9fa] rounded-xl p-3.5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/res"
            >
              <div className="w-8 h-8 rounded-lg bg-[#de1b23]/10 text-[#de1b23] flex items-center justify-center flex-shrink-0 group-hover/res:scale-105 transition-transform duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#1a1a2e]">{r.label}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f6f9fa] to-white rounded-2xl border border-[#e5e7eb] p-5 text-center hover:shadow-sm transition-all duration-300 animate-fade-up animate-delay-800">
        <p className="text-sm text-[#949aa0]">
          {t("telegramGuide", "needHelp")}{" "}
          <Link href="/dashboard/guides/troubleshooting" className="text-[#de1b23] font-semibold hover:underline hover:text-[#c41820] transition-colors">
            {t("telegramGuide", "troubleshootingLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
