"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DiscordGuidePage() {
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
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#5865F2]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5865F2] to-[#5865F2]/40" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("discordGuide", "headerTitle")}</h1>
              <p className="text-sm text-[#949aa0]">{t("discordGuide", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-600 text-xs font-semibold bg-emerald-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("telegramGuide", "availableNow")}
          </span>
        </div>
      </div>

      {/* What You'll Need */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#5865F2]/10 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#5865F2]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#5865F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "whatYouNeed")}</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: "1", title: t("discordGuide", "need1"), desc: t("discordGuide", "need1Desc") },
            { num: "2", title: t("discordGuide", "need2"), desc: t("discordGuide", "need2Desc") },
            { num: "3", title: t("discordGuide", "need3"), desc: t("discordGuide", "need3Desc") },
          ].map((item) => (
            <div key={item.num} className="bg-[#f6f9fa] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/need">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#5865F2] text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-[#5865F2]/25 group-hover/need:scale-110 transition-transform duration-300">
                  {item.num}
                </div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{item.title}</p>
              </div>
              <p className="text-xs text-[#949aa0]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide header */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-300">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#5865F2]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#5865F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "stepsTitle")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#5865F2]/5 border border-[#5865F2]/10 text-[#5865F2] text-[10px] font-semibold tracking-wide uppercase">4 {t("telegramGuide", "stepsLabel")}</span>
      </div>

      {/* Step 1: Create Your Discord Bot */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#5865F2]/20 transition-all duration-500 animate-fade-up animate-delay-400">
        <div className="bg-gradient-to-r from-indigo-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#5865F2] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#5865F2]/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("discordGuide", "s1Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("discordGuide", "s1Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">
                {t("discordGuide", "s1Step1")}{" "}
                <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] font-medium hover:underline">Discord Developer Portal</a>
              </p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s1Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("discordGuide", "s1Step2Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s1Step3")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s1Step4")}</p>
                <div className="mt-2 bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <p className="text-xs text-amber-800"><span className="font-bold">{t("discordGuide", "important")}:</span> {t("discordGuide", "s1Step4Warning")}</p>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">5</span>
              <div>
                <p className="text-sm text-[#4a4a5a] mb-2">{t("discordGuide", "s1Step5")}</p>
                <div className="bg-[#f6f9fa] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                    <p className="text-sm text-[#4a4a5a]"><span className="font-bold text-[#1a1a2e]">SERVER MEMBERS INTENT</span> <span className="text-[#949aa0]">— {t("discordGuide", "intentMembers")}</span></p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                    <p className="text-sm text-[#4a4a5a]"><span className="font-bold text-[#1a1a2e]">MESSAGE CONTENT INTENT</span> <span className="text-[#949aa0]">— {t("discordGuide", "intentMessage")}</span></p>
                  </div>
                </div>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-600 font-medium">{t("discordGuide", "s1Done")}</p>
              <p className="text-xs text-emerald-500 mt-0.5">{t("discordGuide", "s1DoneHint")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Add Bot to Your Discord Server */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#5865F2]/20 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="bg-gradient-to-r from-indigo-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#5865F2] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#5865F2]/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("discordGuide", "s2Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("discordGuide", "s2Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s2Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a] mb-2">{t("discordGuide", "s2Step2")}</p>
                <div className="bg-[#f6f9fa] rounded-xl p-3.5">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                    <p className="text-sm font-medium text-[#1a1a2e]">bot</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm text-[#4a4a5a] mb-2">{t("discordGuide", "s2Step3")}</p>
                <div className="bg-[#f6f9fa] rounded-xl p-3.5 space-y-2">
                  {["Read Messages/View Channels", "Send Messages", "Read Message History"].map((perm) => (
                    <div key={perm} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                      <p className="text-sm font-medium text-[#1a1a2e]">{perm}</p>
                    </div>
                  ))}
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                    <p className="text-sm text-[#1a1a2e]"><span className="font-medium">Add Reactions</span> <span className="text-[#949aa0]">({t("telegramGuide", "optionalLabel")})</span></p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">4</span>
              <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s2Step4")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">5</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s2Step5")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("discordGuide", "s2Step5Hint")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("discordGuide", "s2Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 3: Configure Discord in Clawbibi */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#5865F2]/20 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="bg-gradient-to-r from-indigo-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#5865F2] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#5865F2]/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("discordGuide", "s3Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("discordGuide", "s3Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            {["s3Step1", "s3Step2", "s3Step3"].map((key, i) => (
              <li key={key} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <p className="text-sm text-[#4a4a5a]">{t("discordGuide", key)}</p>
              </li>
            ))}
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s3Step4")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("discordGuide", "s3Step4Hint")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-600 font-medium">{t("discordGuide", "s3Done")}</p>
              <p className="text-xs text-emerald-500 mt-0.5">{t("discordGuide", "s3DoneHint")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Test Your Bot */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-[#5865F2]/20 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="bg-gradient-to-r from-indigo-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#5865F2] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#5865F2]/25 group-hover:scale-110 transition-transform duration-300">4</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("discordGuide", "s4Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("discordGuide", "s4Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("discordGuide", "s4Step1")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("discordGuide", "s4Step1Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold flex items-center justify-center">2</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("discordGuide", "s4Step2")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-2.5 font-mono text-sm text-[#1a1a2e]">
                  @YourBotName hello!
                </div>
                <p className="text-xs text-[#949aa0] mt-1.5 italic">{t("discordGuide", "s4Step2Hint")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("discordGuide", "s4Done")}</p>
          </div>

          {/* Bot is live! */}
          <div className="mt-3 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("discordGuide", "botLive")}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("discordGuide", "botLiveDesc")}</p>
              <p className="text-xs text-[#949aa0] mt-1.5"><span className="font-semibold text-[#4a4a5a]">{t("discordGuide", "proTip")}:</span> {t("discordGuide", "proTipDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Configuration */}
      <div className="mb-4 flex items-center gap-2.5 animate-fade-up animate-delay-800">
        <div className="w-7 h-7 rounded-full bg-[#5865F2]/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#5865F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#1a1a2e]">{t("discordGuide", "advancedTitle")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-up animate-delay-800">
        {/* Channel Restrictions */}
        <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-md hover:border-[#5865F2]/15 transition-all duration-500 overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#5865F2] font-bold text-base">#</span>
              <h3 className="text-sm font-bold text-[#1a1a2e]">{t("discordGuide", "channelTitle")}</h3>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">{t("discordGuide", "channelDesc")}</p>
            <p className="text-xs font-semibold text-[#4a4a5a] mb-2">{t("discordGuide", "channelHow")}</p>
            <ol className="space-y-1.5 text-xs text-[#4a4a5a] list-decimal list-inside">
              <li>{t("discordGuide", "channel1")}</li>
              <li>{t("discordGuide", "channel2")}</li>
              <li>{t("discordGuide", "channel3")}</li>
            </ol>
          </div>
        </div>

        {/* Bot Behavior */}
        <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-md hover:border-[#5865F2]/15 transition-all duration-500 overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full border-2 border-[#5865F2] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#5865F2]" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a2e]">{t("discordGuide", "behaviorTitle")}</h3>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">{t("discordGuide", "behaviorDesc")}</p>
            <div className="space-y-2">
              {["behavior1", "behavior2", "behavior3", "behavior4"].map((key) => (
                <div key={key} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5865F2] flex-shrink-0 mt-1.5" />
                  <p className="text-xs text-[#4a4a5a]">{t("discordGuide", key)}</p>
                </div>
              ))}
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

          <div className="space-y-5">
            {[
              { title: "tsOffline", fixes: ["tsOffFix1", "tsOffFix2", "tsOffFix3", "tsOffFix4", "tsOffFix5"] },
              { title: "tsNoResponse", fixes: ["tsNoResp1", "tsNoResp2", "tsNoResp3", "tsNoResp4"] },
              { title: "tsLostToken", fixes: ["tsLost1", "tsLost2", "tsLost3", "tsLost4"] },
              { title: "tsWrongChannels", fixes: ["tsWrong1", "tsWrong2", "tsWrong3", "tsWrong4"] },
            ].map((section) => (
              <div key={section.title} className="bg-[#f6f9fa] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{t("discordGuide", section.title)}</p>
                <ul className="space-y-1.5">
                  {section.fixes.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {t("discordGuide", key)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Security tip */}
          <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-bold">{t("discordGuide", "securityTip")}:</span>{" "}
              {t("discordGuide", "securityTipDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer link */}
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
