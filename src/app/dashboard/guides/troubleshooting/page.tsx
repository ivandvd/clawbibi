"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function TroubleshootingGuidePage() {
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

      {/* Header Card */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#f59e0b]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f59e0b] to-[#f59e0b]/40" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("troubleshooting", "title")}</h1>
              <p className="text-sm text-[#949aa0]">{t("troubleshooting", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-semibold bg-[#f59e0b]/5">
            {t("troubleshooting", "quickFixes")}
          </span>
        </div>
      </div>

      {/* Before You Start */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-blue-100/80 p-6 mb-6 group hover:shadow-md hover:border-blue-200 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-[#1a1a2e]">{t("troubleshooting", "beforeYouStart")}</h2>
          </div>
          <p className="text-sm text-[#949aa0] mb-4">{t("troubleshooting", "beforeYouStartDesc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {["tip1", "tip2", "tip3", "tip4"].map((key) => (
              <div key={key} className="flex items-center gap-2.5 bg-[#f6f9fa] rounded-lg px-3 py-2.5 hover:bg-blue-50/50 transition-colors duration-200">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-[#4a4a5a]">{t("troubleshooting", key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Common Issues & Solutions ── */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-300">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#6366f1]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("troubleshooting", "commonIssues")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#6366f1]/5 border border-[#6366f1]/10 text-[#6366f1] text-[10px] font-semibold tracking-wide uppercase">{t("troubleshooting", "issueCount")}</span>
      </div>

      {/* Issue 1: Agent Not Responding */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-5 group hover:shadow-lg hover:border-amber-200/60 transition-all duration-500 animate-fade-up animate-delay-300">
        {/* Issue header */}
        <div className="relative bg-gradient-to-r from-amber-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("troubleshooting", "issue1Title")}</h3>
              <p className="text-sm text-[#949aa0]">{t("troubleshooting", "issue1Desc")}</p>
            </div>
          </div>
        </div>

        <div className="relative p-6 space-y-4">
          {/* Step 1: Restart */}
          <div className="bg-[#f6f9fa] rounded-xl p-5 hover:shadow-sm transition-all duration-300">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">1</span>
              <h4 className="font-semibold text-[#1a1a2e]">{t("troubleshooting", "step1Title")}</h4>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">
              <span className="font-medium text-[#4a4a5a]">{t("troubleshooting", "whenToUse")}</span> {t("troubleshooting", "step1When")}
            </p>
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-4 mb-3">
              <p className="text-sm text-[#4a4a5a] mb-2">{t("troubleshooting", "step1Instruction1")}</p>
              <div className="flex items-center gap-2 text-sm">
                <span>{t("troubleshooting", "click")}</span>
                <span className="px-2.5 py-1 rounded-lg border border-[#e5e7eb] text-xs font-medium text-[#4a4a5a] inline-flex items-center gap-1 hover:bg-[#f6f9fa] transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
                  Stop
                </span>
                <span>{t("troubleshooting", "then")}</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#de1b23] text-white text-xs font-medium inline-flex items-center gap-1 shadow-sm shadow-[#de1b23]/20">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
                  Start
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#949aa0] bg-white rounded-lg border border-[#e5e7eb] px-3 py-2">
              <svg className="w-3.5 h-3.5 text-[#0088cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("troubleshooting", "step1Wait")}
            </div>
          </div>

          {/* Step 2: Check Credits */}
          <div className="bg-[#f6f9fa] rounded-xl p-5 hover:shadow-sm transition-all duration-300">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">2</span>
              <h4 className="font-semibold text-[#1a1a2e]">{t("troubleshooting", "step2Title")}</h4>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">
              <span className="font-medium text-[#4a4a5a]">{t("troubleshooting", "whenToUse")}</span> {t("troubleshooting", "step2When")}
            </p>
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-4 mb-3">
              <p className="text-sm text-[#4a4a5a] mb-2">{t("troubleshooting", "step2Instruction1")}</p>
              <p className="text-sm text-[#4a4a5a]">
                {t("troubleshooting", "step2Instruction2")}{" "}
                <span className="px-2.5 py-1 rounded-lg bg-[#de1b23] text-white text-xs font-medium shadow-sm shadow-[#de1b23]/20">$ {t("troubleshooting", "topUpCredit")}</span>
                {" "}{t("troubleshooting", "step2Instruction3")}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <p className="text-xs text-amber-800">
                <span className="font-semibold">{t("troubleshooting", "tip")}:</span> {t("troubleshooting", "step2Tip")}
              </p>
            </div>
          </div>

          {/* Step 3: Reset Config */}
          <div className="bg-[#f6f9fa] rounded-xl p-5 hover:shadow-sm transition-all duration-300">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#de1b23] text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-[#de1b23]/25">3</span>
              <h4 className="font-semibold text-[#1a1a2e]">{t("troubleshooting", "step3Title")}</h4>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">
              <span className="font-medium text-[#4a4a5a]">{t("troubleshooting", "whenToUse")}</span> {t("troubleshooting", "step3When")}
            </p>
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-4 mb-3">
              <p className="text-sm text-[#4a4a5a] mb-2">
                {t("troubleshooting", "click")}{" "}
                <span className="px-2.5 py-1 rounded-lg border border-[#e5e7eb] text-xs font-medium text-[#4a4a5a] inline-flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /></svg>
                  Configure
                </span>
                {" "}{t("troubleshooting", "step3Instruction1")}
              </p>
              <p className="text-sm text-[#4a4a5a] mb-2">{t("troubleshooting", "step3Instruction2")}</p>
              <span className="px-2.5 py-1 rounded-lg bg-[#de1b23] text-white text-xs font-medium inline-flex items-center gap-1 shadow-sm shadow-[#de1b23]/20">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                {t("troubleshooting", "resetConfig")}
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-xs text-amber-800">
                <span className="font-semibold">{t("troubleshooting", "note")}:</span> {t("troubleshooting", "step3Note")}
              </p>
            </div>
          </div>

          {/* Step 4: Delete & Recreate (danger) */}
          <div className="relative overflow-hidden bg-red-50/30 rounded-xl p-5 border border-red-200/50 hover:border-red-200 transition-all duration-300">
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
                <h4 className="font-semibold text-red-600">{t("troubleshooting", "step4Title")}</h4>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wide">Danger</span>
              </div>
              <p className="text-xs text-[#949aa0] mb-3">
                <span className="font-medium text-[#4a4a5a]">{t("troubleshooting", "whenToUse")}</span> {t("troubleshooting", "step4When")}
              </p>
              <div className="bg-white rounded-lg border border-red-100 p-4 mb-3">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("troubleshooting", "step4Instruction1")}</p>
                <span className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-medium inline-flex items-center gap-1 mb-2 shadow-sm shadow-red-500/20">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  {t("troubleshooting", "deleteAgent")}
                </span>
                <p className="text-sm text-[#4a4a5a] mt-2">{t("troubleshooting", "step4Instruction2")}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-xs text-red-700">
                  <span className="font-semibold">{t("troubleshooting", "warning")}:</span> {t("troubleshooting", "step4Warning")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issue 2: Messenger Connection Issues */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-5 group hover:shadow-lg hover:border-blue-200/60 transition-all duration-500 animate-fade-up animate-delay-400">
        <div className="relative bg-gradient-to-r from-blue-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("troubleshooting", "issue2Title")}</h3>
              <p className="text-sm text-[#949aa0]">{t("troubleshooting", "issue2Desc")}</p>
            </div>
          </div>
        </div>

        <div className="relative p-6 space-y-4">
          {[
            { title: "botNotOnline", fixes: ["botFix1", "botFix2", "botFix3", "botFix4"] },
            { title: "cantSendReceive", fixes: ["msgFix1", "msgFix2", "msgFix3", "msgFix4"] },
            { title: "lostConnection", fixes: ["connFix1", "connFix2", "connFix3", "connFix4"] },
          ].map((section) => (
            <div key={section.title} className="bg-[#f6f9fa] rounded-xl p-5 hover:shadow-sm transition-all duration-300">
              <h4 className="font-semibold text-[#1a1a2e] mb-3">{t("troubleshooting", section.title)}</h4>
              <ul className="space-y-2">
                {section.fixes.map((key) => (
                  <li key={key} className="flex items-start gap-2.5 text-sm text-[#4a4a5a]">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                    {t("troubleshooting", key)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Issue 3: Slow or Delayed Responses */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-purple-200/60 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="relative bg-gradient-to-r from-purple-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("troubleshooting", "issue3Title")}</h3>
              <p className="text-sm text-[#949aa0]">{t("troubleshooting", "issue3Desc")}</p>
            </div>
          </div>
        </div>

        <div className="relative p-6 space-y-4">
          <div className="bg-[#f6f9fa] rounded-xl p-5 hover:shadow-sm transition-all duration-300">
            <h4 className="font-semibold text-[#1a1a2e] mb-3">{t("troubleshooting", "normalBehavior")}</h4>
            <div className="space-y-2">
              {["speed1", "speed2", "speed3"].map((key) => (
                <div key={key} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-[#e5e7eb]">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span className="text-sm text-[#4a4a5a]">{t("troubleshooting", key)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f6f9fa] rounded-xl p-5 hover:shadow-sm transition-all duration-300">
            <h4 className="font-semibold text-[#1a1a2e] mb-3">{t("troubleshooting", "ifSlower")}</h4>
            <ul className="space-y-2">
              {["slowFix1", "slowFix2", "slowFix3", "slowFix4"].map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm text-[#4a4a5a]">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                  {t("troubleshooting", key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Helpful Resources */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-md hover:border-[#6366f1]/15 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-[#1a1a2e]">{t("troubleshooting", "helpfulResources")}</h2>
          </div>
          <p className="text-sm text-[#949aa0] mb-4">{t("troubleshooting", "helpfulResourcesDesc")}</p>

          <div className="space-y-3">
            <a
              href="https://docs.openclaw.ai/start/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#f6f9fa] rounded-xl border border-[#e5e7eb] hover:border-[#6366f1]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/link"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#6366f1]/10 flex items-center justify-center group-hover/link:scale-105 transition-transform duration-300">
                  <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e] group-hover/link:text-[#6366f1] transition-colors">{t("troubleshooting", "openclawDocs")}</p>
                  <p className="text-xs text-[#949aa0]">{t("troubleshooting", "openclawDocsDesc")}</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#c5c9cd] group-hover/link:text-[#6366f1] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            <a
              href="https://openclaw.ai/integrations"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#f6f9fa] rounded-xl border border-[#e5e7eb] hover:border-[#6366f1]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/link"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#6366f1]/10 flex items-center justify-center group-hover/link:scale-105 transition-transform duration-300">
                  <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e] group-hover/link:text-[#6366f1] transition-colors">{t("troubleshooting", "integrations")}</p>
                  <p className="text-xs text-[#949aa0]">{t("troubleshooting", "integrationsDesc")}</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#c5c9cd] group-hover/link:text-[#6366f1] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Still Need Help */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-emerald-100/80 p-6 group hover:shadow-md hover:border-emerald-200 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-200" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-[#1a1a2e]">{t("troubleshooting", "stillNeedHelp")}</h2>
          </div>
          <p className="text-sm text-[#949aa0] mb-4">{t("troubleshooting", "stillNeedHelpDesc")}</p>
          <div className="space-y-2.5">
            {["help1", "help2", "help3"].map((key) => (
              <div key={key} className="flex items-center gap-2.5 bg-emerald-50/50 rounded-lg px-3 py-2.5 hover:bg-emerald-50 transition-colors duration-200">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-[#4a4a5a]">{t("troubleshooting", key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
