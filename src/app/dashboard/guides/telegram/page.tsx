"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const EXAMPLE_TOKEN = "123456789:ABCDefGHIjklMNOpqrsTUVwxyz";

export default function TelegramGuidePage() {
  const { t, isRTL } = useLanguage();
  const [token, setToken] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || token) return;
    let i = 0;
    let direction = 1; // 1 = typing, -1 = deleting
    const interval = setInterval(() => {
      if (direction === 1) {
        i++;
        setTypewriterText(EXAMPLE_TOKEN.slice(0, i));
        if (i === EXAMPLE_TOKEN.length) {
          setTimeout(() => { direction = -1; }, 2000);
        }
      } else {
        i--;
        setTypewriterText(EXAMPLE_TOKEN.slice(0, i));
        if (i === 0) {
          setTimeout(() => { direction = 1; }, 500);
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, [isFocused, token]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#949aa0] hover:text-[#1a1a2e] transition-colors mb-6 animate-fade-up">
        <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t("troubleshooting", "backToDashboard")}
      </Link>

      {/* Header */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#0088cc]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0088cc] to-[#0088cc]/40" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0088cc]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("telegramGuide", "headerTitle")}</h1>
              <p className="text-sm text-[#949aa0]">{t("telegramGuide", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-600 text-xs font-semibold bg-emerald-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("telegramGuide", "availableNow")}
          </span>
        </div>
      </div>

      {/* What You'll Need */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#0088cc]/10 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#0088cc]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0088cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "whatYouNeed")}</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: "1", title: t("telegramGuide", "need1"), desc: t("telegramGuide", "need1Desc") },
            { num: "2", title: t("telegramGuide", "need2"), desc: t("telegramGuide", "need2Desc") },
            { num: "3", title: t("telegramGuide", "need3"), desc: t("telegramGuide", "need3Desc") },
          ].map((item) => (
            <div key={item.num} className="bg-[#f6f9fa] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/need">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#0088cc] text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-[#0088cc]/25 group-hover/need:scale-110 transition-transform duration-300">
                  {item.num}
                </div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{item.title}</p>
              </div>
              <p className="text-xs text-[#949aa0] ml-8.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorial — compact */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-300">
        <div className="p-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#de1b23]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1a1a2e]">{t("telegramGuide", "videoTitle")}</h2>
              <p className="text-xs text-[#949aa0]">{t("telegramGuide", "videoDesc")}</p>
            </div>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="max-w-md mx-auto">
            <video
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="auto"
              className="w-full rounded-xl border border-[#e5e7eb] bg-[#1a1a2e] shadow-sm"
            >
              <source src="/telegram-setup.mp4" type="video/mp4" />
              {t("telegramGuide", "videoUnsupported")}
            </video>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide header */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-400">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#0088cc]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#0088cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "stepsTitle")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#0088cc]/5 border border-[#0088cc]/10 text-[#0088cc] text-[10px] font-semibold tracking-wide uppercase">3 {t("telegramGuide", "stepsLabel")}</span>
      </div>

      {/* ── Step 1: Create Your Telegram Bot ── */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#0088cc]/20 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="bg-gradient-to-r from-[#f0f9ff] to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0088cc] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#0088cc]/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "s1Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("telegramGuide", "s1Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-5">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">
                  {t("telegramGuide", "s1Step1")}{" "}
                  <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0088cc]/5 border border-[#0088cc]/15 text-[#0088cc] text-xs font-semibold hover:bg-[#0088cc]/10 hover:border-[#0088cc]/30 transition-all duration-200">
                    @BotFather
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </p>
                <p className="text-xs text-[#949aa0] mt-1">{t("telegramGuide", "s1Step1Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-[#4a4a5a]">
                {t("telegramGuide", "s1Step2")}{" "}
                <code className="bg-[#1a1a2e] text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-mono">/newbot</code>
              </p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm text-[#4a4a5a] mb-3">{t("telegramGuide", "s1Step3")}</p>
                <div className="bg-[#f6f9fa] rounded-xl p-4 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0088cc]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0088cc]" />
                    </div>
                    <p className="text-sm text-[#4a4a5a]"><span className="font-semibold text-[#1a1a2e]">{t("telegramGuide", "displayName")}:</span> {t("telegramGuide", "displayNameHint")}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0088cc]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0088cc]" />
                    </div>
                    <p className="text-sm text-[#4a4a5a]"><span className="font-semibold text-[#1a1a2e]">{t("telegramGuide", "username")}:</span> {t("telegramGuide", "usernameHint")}</p>
                  </div>
                </div>
              </div>
            </li>
          </ol>

          {/* Token result */}
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">{t("telegramGuide", "tokenResult")}</p>
              <p className="text-xs text-[#949aa0] mt-1">
                {t("telegramGuide", "tokenLooksLike")}{" "}
                <code className="bg-[#1a1a2e] text-emerald-400 px-2 py-0.5 rounded-md text-[11px] font-mono">123456789:ABCDefGHIjklMNOpqrsTUVwxyz</code>
              </p>
            </div>
          </div>

          {/* Keep token safe warning */}
          <div className="mt-3 bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-xs text-amber-800">
              <span className="font-bold">{t("telegramGuide", "keepTokenSafe")}</span>{" "}
              {t("telegramGuide", "keepTokenSafeDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Step 2: Add Telegram to Your Agent ── */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#0088cc]/20 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="bg-gradient-to-r from-[#f0f9ff] to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0088cc] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#0088cc]/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "s2Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("telegramGuide", "s2Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            {["s2Step1", "s2Step2", "s2Step3", "s2Step4"].map((key, i) => (
              <li key={key} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <p className="text-sm text-[#4a4a5a]">{t("telegramGuide", key)}</p>
              </li>
            ))}
          </ol>

          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("telegramGuide", "s2Done")}</p>
          </div>

          {/* Token input */}
          <div className="mt-5 pt-5 border-t border-[#e5e7eb]">
            <div className="relative">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] transition-all font-mono"
                dir="ltr"
              />
              {!token && !isFocused && (
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <span className="text-sm font-mono text-[#c5c9cd]">{typewriterText}<span className="animate-pulse">|</span></span>
                </div>
              )}
            </div>
            <button
              disabled={!token.trim()}
              className="mt-3 w-full py-3 rounded-xl bg-[#0088cc] text-white text-sm font-semibold hover:bg-[#006da3] hover:shadow-lg hover:shadow-[#0088cc]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {t("telegramGuide", "saveConnect")}
            </button>
          </div>
        </div>
      </div>

      {/* ── Step 3: Pair Your Telegram Account ── */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-[#0088cc]/20 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="bg-gradient-to-r from-[#f0f9ff] to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0088cc] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#0088cc]/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "s3Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("telegramGuide", "s3Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("telegramGuide", "s3Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("telegramGuide", "s3Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("telegramGuide", "s3Step2Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0088cc]/10 text-[#0088cc] text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-[#4a4a5a]">{t("telegramGuide", "s3Step3")}</p>
            </li>
          </ol>

          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("telegramGuide", "s3Done")}</p>
          </div>

          {/* Success box */}
          <div className="mt-3 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("telegramGuide", "allSet")}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("telegramGuide", "allSetDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Advanced Settings ── */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#949aa0]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "advancedSettings")}</h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#949aa0]/5 border border-[#949aa0]/10 text-[#949aa0] text-[10px] font-semibold tracking-wide uppercase">{t("telegramGuide", "optionalLabel")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-up animate-delay-800">
        {/* Privacy Policies */}
        <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-md hover:border-[#6366f1]/15 transition-all duration-500 overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#1a1a2e]">{t("telegramGuide", "privacyPolicies")}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-[#1a1a2e] mb-2">{t("telegramGuide", "dmPolicy")}</p>
                <div className="space-y-1.5">
                  {[
                    { key: "dmPairing", descKey: "dmPairingDesc", active: true },
                    { key: "dmAllowlist", descKey: "dmAllowlistDesc" },
                    { key: "dmOpen", descKey: "dmOpenDesc" },
                    { key: "dmDisabled", descKey: "dmDisabledDesc" },
                  ].map((item) => (
                    <div key={item.key} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${item.active ? "bg-[#6366f1]/5 border border-[#6366f1]/10" : ""}`}>
                      <span className={`font-semibold ${item.active ? "text-[#6366f1]" : "text-[#1a1a2e]"}`}>{t("telegramGuide", item.key)}:</span>
                      <span className="text-[#949aa0]">{t("telegramGuide", item.descKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-[#e5e7eb]">
                <p className="text-xs font-semibold text-[#1a1a2e] mb-0.5">{t("telegramGuide", "groupPolicy")}</p>
                <p className="text-xs text-[#949aa0]">{t("telegramGuide", "groupPolicyDesc")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Mode */}
        <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-md hover:border-[#0088cc]/15 transition-all duration-500 overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#0088cc]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#0088cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#1a1a2e]">{t("telegramGuide", "streamMode")}</h3>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">{t("telegramGuide", "streamModeDesc")}</p>
            <div className="space-y-1.5">
              {[
                { key: "streamOff", descKey: "streamOffDesc" },
                { key: "streamPartial", descKey: "streamPartialDesc", recommended: true },
                { key: "streamBlock", descKey: "streamBlockDesc" },
              ].map((item) => (
                <div key={item.key} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${item.recommended ? "bg-[#0088cc]/5 border border-[#0088cc]/10" : ""}`}>
                  <span className={`font-semibold ${item.recommended ? "text-[#0088cc]" : "text-[#1a1a2e]"}`}>{t("telegramGuide", item.key)}:</span>
                  <span className="text-[#949aa0]">{t("telegramGuide", item.descKey)}</span>
                  {item.recommended && <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0088cc]/10 text-[#0088cc]">{t("agents", "recommended")}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Troubleshooting ── */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f6f9fa] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{t("telegramGuide", "tsBotNotResponding")}</p>
              <ul className="space-y-2">
                {["tsFix1", "tsFix2", "tsFix3"].map((key) => (
                  <li key={key} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {t("telegramGuide", key)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#f6f9fa] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{t("telegramGuide", "tsPairingCode")}</p>
              <ul className="space-y-2">
                {["tsPairFix1", "tsPairFix2", "tsPairFix3"].map((key) => (
                  <li key={key} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {t("telegramGuide", key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Need help link */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f6f9fa] to-white rounded-2xl border border-[#e5e7eb] p-5 text-center hover:shadow-sm transition-all duration-300 animate-fade-up animate-delay-800">
        <p className="relative text-sm text-[#949aa0]">
          {t("telegramGuide", "needHelp")}{" "}
          <Link href="/dashboard/guides/troubleshooting" className="text-[#de1b23] font-semibold hover:underline hover:text-[#c41820] transition-colors">
            {t("telegramGuide", "troubleshootingLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
