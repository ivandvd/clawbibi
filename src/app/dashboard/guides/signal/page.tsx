"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SignalGuidePage() {
  const { t, isRTL } = useLanguage();

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
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#3A76F0]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3A76F0] to-[#3A76F0]/40" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3A76F0]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#3A76F0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-1-1v-4l1-1h2l1 1v4l-1 1h-2zm3-8.5c0 .83-.67 1.5-1.5 1.5h-1c-.83 0-1.5-.67-1.5-1.5v-1c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5v1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("signalGuide", "headerTitle")}</h1>
              <p className="text-sm text-[#949aa0]">{t("signalGuide", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-600 text-xs font-semibold bg-emerald-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("telegramGuide", "availableNow")}
          </span>
        </div>
      </div>

      {/* Before You Start warning */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-amber-200/80 p-5 mb-6 group hover:shadow-md hover:border-amber-300/80 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-amber-600">{t("signalGuide", "beforeYouStart")}</h2>
          </div>
          <p className="text-sm text-[#4a4a5a] leading-relaxed">
            {t("signalGuide", "beforeYouStartDesc")}{" "}
            <a href="https://smspool.net" target="_blank" rel="noopener noreferrer" className="text-[#3A76F0] font-medium hover:underline">
              smspool.net
            </a>
            .
          </p>
        </div>
      </div>

      {/* What You'll Need */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#3A76F0]/10 transition-all duration-500 animate-fade-up animate-delay-300">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#3A76F0]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#3A76F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "whatYouNeed")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { num: "1", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", title: t("signalGuide", "need1"), desc: t("signalGuide", "need1Desc") },
            { num: "2", icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3", title: t("signalGuide", "need2"), desc: t("signalGuide", "need2Desc") },
            { num: "3", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z", title: t("signalGuide", "need3"), desc: t("signalGuide", "need3Desc") },
            { num: "15", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", title: t("signalGuide", "need4"), desc: t("signalGuide", "need4Desc") },
          ].map((item) => (
            <div key={item.num} className="bg-[#f6f9fa] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/need">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#3A76F0] text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-[#3A76F0]/25 group-hover/need:scale-110 transition-transform duration-300">
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

      {/* Step-by-Step Guide header */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-400">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#3A76F0]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#3A76F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "stepsTitle")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#3A76F0]/5 border border-[#3A76F0]/10 text-[#3A76F0] text-[10px] font-semibold tracking-wide uppercase">6 {t("telegramGuide", "stepsLabel")}</span>
      </div>

      {/* Step 1: Set Up Signal on a Burner Phone */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#3A76F0]/20 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3A76F0] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#3A76F0]/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("signalGuide", "s1Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("signalGuide", "s1Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s1Step1")}</p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3A76F0] flex-shrink-0 mt-2" />
                    <p className="text-xs text-[#949aa0]">{t("signalGuide", "s1Step1a")}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3A76F0] flex-shrink-0 mt-2" />
                    <p className="text-xs text-[#949aa0]">
                      {t("signalGuide", "s1Step1b")}{" "}
                      <a href="https://smspool.net" target="_blank" rel="noopener noreferrer" className="text-[#3A76F0] font-medium hover:underline">smspool.net</a>
                      {" "}{t("signalGuide", "s1Step1bSuffix")}
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s1Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("signalGuide", "s1Step2Hint")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("signalGuide", "s1Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 2: Prepare Your Clawbibi Agent */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#3A76F0]/20 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3A76F0] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#3A76F0]/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("signalGuide", "s2Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("signalGuide", "s2Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s2Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s2Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("signalGuide", "s2Step2Hint")}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Step 3: Establish First Contact */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#3A76F0]/20 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3A76F0] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#3A76F0]/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("signalGuide", "s3Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("signalGuide", "s3Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          {/* Info box */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5 mb-5">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">{t("signalGuide", "s3InfoBox")}</p>
          </div>

          {/* Option A */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#949aa0] uppercase tracking-wider mb-3">{t("signalGuide", "optionA")}</p>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
                <p className="text-sm text-[#4a4a5a]">
                  {t("signalGuide", "s3OptA1")}{" "}
                  <span className="text-[#949aa0]">(</span>
                  <Link href="/dashboard/guides/telegram" className="text-[#0088cc] font-medium hover:underline">{t("signalGuide", "s3TelegramLink")}</Link>
                  <span className="text-[#949aa0]">)</span>
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s3OptA2")}</p>
              </li>
            </ol>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#e5e7eb]" />
            <span className="text-xs text-[#c5c9cd] font-semibold uppercase">{t("signalGuide", "or")}</span>
            <div className="flex-1 h-px bg-[#e5e7eb]" />
          </div>

          {/* Option B */}
          <div>
            <p className="text-xs font-bold text-[#949aa0] uppercase tracking-wider mb-3">{t("signalGuide", "optionB")}</p>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s3OptB1")}</p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s3OptB2")}</p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">3</span>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s3OptB3")}</p>
              </li>
            </ol>
          </div>

          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("signalGuide", "s3Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 4: Configure Signal via Chat */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#3A76F0]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3A76F0] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#3A76F0]/25 group-hover:scale-110 transition-transform duration-300">4</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("signalGuide", "s4Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("signalGuide", "s4Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          {/* Patience info box */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5 mb-5">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">{t("signalGuide", "s4InfoBox")}</p>
          </div>

          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("signalGuide", "s4Step1")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-3 font-mono text-sm text-[#1a1a2e]">
                  set up signal. this is your phone number: +15551234567
                </div>
                <p className="text-xs text-[#949aa0] mt-1.5 italic">{t("signalGuide", "s4Step1Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s4Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("signalGuide", "s4Step2Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">3</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("signalGuide", "s4Step3")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-3 font-mono text-sm text-[#1a1a2e]">
                  send that as a QR code
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
            <p className="text-sm text-emerald-600 font-medium">{t("signalGuide", "s4Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 5: Link Your Agent to Signal */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#3A76F0]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3A76F0] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#3A76F0]/25 group-hover:scale-110 transition-transform duration-300">5</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("signalGuide", "s5Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("signalGuide", "s5Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s5Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s5Step2")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s5Step3")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("signalGuide", "s5Step3Hint")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("signalGuide", "s5Done")}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("signalGuide", "s5DoneHint")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6: Test the Connection */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-[#3A76F0]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3A76F0] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#3A76F0]/25 group-hover:scale-110 transition-transform duration-300">6</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("signalGuide", "s6Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("signalGuide", "s6Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s6Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s6Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("signalGuide", "s6Step2Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s6Step3")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3A76F0]/10 text-[#3A76F0] text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("signalGuide", "s6Step4")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("signalGuide", "s6Step4Hint")}</p>
              </div>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("signalGuide", "s6Done")}</p>
          </div>

          {/* You're All Set! */}
          <div className="mt-3 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("signalGuide", "allSet")}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("signalGuide", "allSetDesc")}</p>
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
              { title: "tsAgentNotResponding", fixes: ["tsAgentFix1", "tsAgentFix2", "tsAgentFix3", "tsAgentFix4"] },
              { title: "tsQrNotAppearing", fixes: ["tsQrFix1", "tsQrFix2", "tsQrFix3"] },
              { title: "tsCantScanQr", fixes: ["tsScanFix1", "tsScanFix2", "tsScanFix3", "tsScanFix4"] },
              { title: "tsVerificationCode", fixes: ["tsVerFix1", "tsVerFix2", "tsVerFix3"] },
            ].map((section) => (
              <div key={section.title} className="bg-[#f6f9fa] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{t("signalGuide", section.title)}</p>
                <ul className="space-y-1.5">
                  {section.fixes.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {t("signalGuide", key)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Still having issues */}
          <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-bold">{t("signalGuide", "stillHavingIssues")}</span>{" "}
              {t("signalGuide", "stillHavingIssuesDesc")}
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
