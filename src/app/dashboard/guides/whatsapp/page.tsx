"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function WhatsAppGuidePage() {
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
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#25d366]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#25d366] to-[#25d366]/40" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#25d366]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#25d366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("whatsappGuide", "headerTitle")}</h1>
              <p className="text-sm text-[#949aa0]">{t("whatsappGuide", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-600 text-xs font-semibold bg-emerald-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("telegramGuide", "availableNow")}
          </span>
        </div>
      </div>

      {/* What You'll Need */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#25d366]/10 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#25d366]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#25d366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "whatYouNeed")}</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: "1", title: t("whatsappGuide", "need1"), desc: t("whatsappGuide", "need1Desc") },
            { num: "2", title: t("whatsappGuide", "need2"), desc: t("whatsappGuide", "need2Desc") },
            { num: "3", title: t("whatsappGuide", "need3"), desc: t("whatsappGuide", "need3Desc") },
          ].map((item) => (
            <div key={item.num} className="bg-[#f6f9fa] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/need">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#25d366] text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-[#25d366]/25 group-hover/need:scale-110 transition-transform duration-300">
                  {item.num}
                </div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{item.title}</p>
              </div>
              <p className="text-xs text-[#949aa0]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How WhatsApp Connection Works */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-blue-100/80 p-6 mb-6 group hover:shadow-md hover:border-blue-200 transition-all duration-500 animate-fade-up animate-delay-300">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-blue-600">{t("whatsappGuide", "howItWorks")}</h2>
          </div>
          <p className="text-sm text-[#4a4a5a] leading-relaxed">{t("whatsappGuide", "howItWorksDesc")}</p>
        </div>
      </div>

      {/* Step-by-Step Guide header */}
      <div className="mb-4 flex items-center justify-between animate-fade-up animate-delay-400">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#25d366]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#25d366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "stepsTitle")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#25d366]/5 border border-[#25d366]/10 text-[#25d366] text-[10px] font-semibold tracking-wide uppercase">4 {t("telegramGuide", "stepsLabel")}</span>
      </div>

      {/* Step 1: Open Agent Configuration */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#25d366]/20 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="bg-gradient-to-r from-emerald-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#25d366] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#25d366]/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("whatsappGuide", "s1Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("whatsappGuide", "s1Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            {["s1Step1", "s1Step2", "s1Step3"].map((key, i) => (
              <li key={key} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", key)}</p>
                  {key === "s1Step2" && <p className="text-xs text-[#949aa0] mt-0.5">{t("whatsappGuide", "s1Step2Hint")}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("whatsappGuide", "s1Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 2: Get Your QR Code */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#25d366]/20 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="bg-gradient-to-r from-emerald-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#25d366] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#25d366]/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("whatsappGuide", "s2Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("whatsappGuide", "s2Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", "s2Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", "s2Step2")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("whatsappGuide", "s2Step2Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", "s2Step3")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("whatsappGuide", "s2Step3Hint")}</p>
              </div>
            </li>
          </ol>
          {/* QR expiration warning */}
          <div className="mt-4 bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-amber-800">
              <span className="font-bold">{t("whatsappGuide", "qrExpiration")}:</span>{" "}
              {t("whatsappGuide", "qrExpirationDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Step 3: Link from WhatsApp */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#25d366]/20 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="bg-gradient-to-r from-emerald-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#25d366] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#25d366]/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("whatsappGuide", "s3Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("whatsappGuide", "s3Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", "s3Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a] mb-2">{t("whatsappGuide", "s3Step2")}</p>
                <div className="bg-[#f6f9fa] rounded-xl p-4 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25d366] flex-shrink-0 mt-2" />
                    <p className="text-sm text-[#4a4a5a]"><span className="font-semibold text-[#1a1a2e]">Android:</span> {t("whatsappGuide", "s3Android")}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25d366] flex-shrink-0 mt-2" />
                    <p className="text-sm text-[#4a4a5a]"><span className="font-semibold text-[#1a1a2e]">iPhone:</span> {t("whatsappGuide", "s3iPhone")}</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", "s3Step3")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("whatsappGuide", "s3Step3Hint")}</p>
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
              <p className="text-sm text-emerald-600 font-medium">{t("whatsappGuide", "s3Done")}</p>
              <p className="text-xs text-emerald-500 mt-0.5">{t("whatsappGuide", "s3DoneHint")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Test Your Connection */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-[#25d366]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-emerald-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#25d366] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#25d366]/25 group-hover:scale-110 transition-transform duration-300">4</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("whatsappGuide", "s4Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("whatsappGuide", "s4Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("whatsappGuide", "s4Step1")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("whatsappGuide", "s4Step1Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#25d366]/10 text-[#25d366] text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm text-[#4a4a5a] mb-2">{t("whatsappGuide", "s4Step2")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-3">
                  <p className="text-sm text-[#1a1a2e] font-medium">Hello! Are you there?</p>
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
              <p className="text-sm text-emerald-600 font-medium">{t("whatsappGuide", "s4Done")}</p>
              <p className="text-xs text-emerald-500 mt-0.5">{t("whatsappGuide", "s4DoneHint")}</p>
            </div>
          </div>

          {/* Connected success box */}
          <div className="mt-3 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("whatsappGuide", "connected")}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("whatsappGuide", "connectedDesc")}</p>
              <p className="text-xs text-[#949aa0] mt-1.5"><span className="font-semibold text-[#4a4a5a]">{t("troubleshooting", "tip")}:</span> {t("whatsappGuide", "connectedTip")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* What You Can Do */}
      <div className="mb-4 flex items-center gap-2.5 animate-fade-up animate-delay-800">
        <div className="w-7 h-7 rounded-full bg-[#25d366]/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#25d366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#1a1a2e]">{t("whatsappGuide", "whatYouCanDo")}</h2>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-800">
        <p className="text-sm text-[#949aa0] mb-4">{t("whatsappGuide", "whatYouCanDoDesc")}</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z", color: "#f59e0b", title: t("whatsappGuide", "useCase1"), desc: t("whatsappGuide", "useCase1Desc") },
            { icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", color: "#6366f1", title: t("whatsappGuide", "useCase2"), desc: t("whatsappGuide", "useCase2Desc") },
            { icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z", color: "#0088cc", title: t("whatsappGuide", "useCase3"), desc: t("whatsappGuide", "useCase3Desc") },
            { icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", color: "#de1b23", title: t("whatsappGuide", "useCase4"), desc: t("whatsappGuide", "useCase4Desc") },
            { icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z", color: "#8b5cf6", title: t("whatsappGuide", "useCase5"), desc: t("whatsappGuide", "useCase5Desc") },
            { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", color: "#25d366", title: t("whatsappGuide", "useCase6"), desc: t("whatsappGuide", "useCase6Desc") },
          ].map((uc, i) => (
            <div key={i} className="flex items-start gap-3 bg-[#f6f9fa] rounded-xl p-3.5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${uc.color}12`, color: uc.color }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={uc.icon} /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{uc.title}</p>
                <p className="text-xs text-[#949aa0]">{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Managing Your Connection */}
      <div className="mb-4 flex items-center gap-2.5 animate-fade-up animate-delay-800">
        <div className="w-7 h-7 rounded-full bg-[#25d366]/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#25d366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#1a1a2e]">{t("whatsappGuide", "managingTitle")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-up animate-delay-800">
        {/* Unlinking */}
        <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-md hover:border-[#25d366]/15 transition-all duration-500 overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.181 8.68a4.503 4.503 0 011.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 006.364 6.364l3.756-3.756m0 0a4.503 4.503 0 01-1.903-6.405m9.768 2.782l1.756-1.757a4.5 4.5 0 00-6.363-6.364l-3.757 3.757" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#1a1a2e]">{t("whatsappGuide", "unlinkTitle")}</h3>
            </div>
            <p className="text-xs text-[#949aa0] mb-3">{t("whatsappGuide", "unlinkDesc")}</p>
            <ol className="space-y-1.5 text-xs text-[#4a4a5a] list-decimal list-inside">
              <li>{t("whatsappGuide", "unlink1")}</li>
              <li>{t("whatsappGuide", "unlink2")}</li>
              <li>{t("whatsappGuide", "unlink3")}</li>
            </ol>
            <p className="text-xs text-[#949aa0] mt-3 italic">{t("whatsappGuide", "unlinkNote")}</p>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="relative bg-white rounded-2xl border border-[#e5e7eb] p-5 group hover:shadow-md hover:border-[#25d366]/15 transition-all duration-500 overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#25d366]/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#25d366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#1a1a2e]">{t("whatsappGuide", "privacyTitle")}</h3>
            </div>
            <div className="space-y-2">
              {["privacy1", "privacy2", "privacy3", "privacy4"].map((key) => (
                <div key={key} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#25d366] flex-shrink-0 mt-1.5" />
                  <p className="text-xs text-[#4a4a5a]">{t("whatsappGuide", key)}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "tsQrExpired", fixes: ["tsQrFix1", "tsQrFix2", "tsQrFix3"] },
              { title: "tsNoButton", fixes: ["tsNoBtn1", "tsNoBtn2", "tsNoBtn3", "tsNoBtn4"] },
              { title: "tsNotResponding", fixes: ["tsNoResp1", "tsNoResp2", "tsNoResp3", "tsNoResp4"] },
              { title: "tsDeviceLinked", fixes: ["tsDev1", "tsDev2", "tsDev3"] },
            ].map((section) => (
              <div key={section.title} className="bg-[#f6f9fa] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{t("whatsappGuide", section.title)}</p>
                <ul className="space-y-1.5">
                  {section.fixes.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {t("whatsappGuide", key)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Need more help */}
          <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-bold">{t("whatsappGuide", "needMoreHelp")}</span>{" "}
              {t("whatsappGuide", "needMoreHelpDesc")}
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
