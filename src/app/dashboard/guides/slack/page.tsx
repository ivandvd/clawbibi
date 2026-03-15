"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const SLACK_MANIFEST = `{
  "display_information": {
    "name": "Clawbibi",
    "description": "Your AI assistant on Slack"
  },
  "features": {
    "bot_user": {
      "display_name": "Clawbibi",
      "always_online": true
    },
    "app_home": {
      "messages_tab_enabled": true,
      "messages_tab_read_only_enabled": false
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "chat:write",
        "channels:history",
        "channels:read",
        "groups:history",
        "im:history",
        "im:read",
        "im:write",
        "mpim:history",
        "mpim:read",
        "mpim:write",
        "users:read",
        "app_mentions:read",
        "assistant:write",
        "reactions:read",
        "reactions:write",
        "commands",
        "files:read",
        "files:write"
      ]
    }
  },
  "settings": {
    "socket_mode_enabled": true,
    "event_subscriptions": {
      "bot_events": [
        "app_mention",
        "message.channels",
        "message.groups",
        "message.im",
        "message.mpim"
      ]
    }
  }
}`;

export default function SlackGuidePage() {
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
      <div className="relative overflow-hidden bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 group hover:shadow-lg hover:border-[#4A154B]/15 transition-all duration-500 animate-fade-up animate-delay-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A154B] to-[#4A154B]/40" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4A154B]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1a2e]">{t("slackGuide", "headerTitle")}</h1>
              <p className="text-sm text-[#949aa0]">{t("slackGuide", "subtitle")}</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-600 text-xs font-semibold bg-emerald-50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("telegramGuide", "availableNow")}
          </span>
        </div>
      </div>

      {/* Before You Start */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-amber-200/80 p-5 mb-6 group hover:shadow-md hover:border-amber-300/80 transition-all duration-500 animate-fade-up animate-delay-200">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-amber-600">{t("slackGuide", "beforeYouStart")}</h2>
          </div>
          <p className="text-sm text-[#4a4a5a] leading-relaxed">{t("slackGuide", "beforeYouStartDesc")}</p>
        </div>
      </div>

      {/* What You'll Need */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-6 hover:shadow-md hover:border-[#4A154B]/10 transition-all duration-500 animate-fade-up animate-delay-300">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#4A154B]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#4A154B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#1a1a2e]">{t("telegramGuide", "whatYouNeed")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", title: t("slackGuide", "need1"), desc: t("slackGuide", "need1Desc") },
            { icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z", title: t("slackGuide", "need2"), desc: t("slackGuide", "need2Desc") },
            { icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418", title: t("slackGuide", "need3"), desc: t("slackGuide", "need3Desc") },
            { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", title: t("slackGuide", "need4"), desc: t("slackGuide", "need4Desc") },
          ].map((item, i) => (
            <div key={i} className="bg-[#f6f9fa] rounded-xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group/need">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-[#4A154B] text-white flex items-center justify-center shadow-sm shadow-[#4A154B]/25 group-hover/need:scale-110 transition-transform duration-300">
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
          <div className="w-7 h-7 rounded-full bg-[#4A154B]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#4A154B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#1a1a2e]">{t("telegramGuide", "stepsTitle")}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#4A154B]/5 border border-[#4A154B]/10 text-[#4A154B] text-[10px] font-semibold tracking-wide uppercase">5 {t("telegramGuide", "stepsLabel")}</span>
      </div>

      {/* Step 1: Create a Slack App */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#4A154B]/20 transition-all duration-500 animate-fade-up animate-delay-500">
        <div className="bg-gradient-to-r from-purple-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#4A154B] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#4A154B]/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("slackGuide", "s1Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("slackGuide", "s1Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">
                  {t("slackGuide", "s1Step1")}{" "}
                  <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer" className="text-[#4A154B] font-medium hover:underline">api.slack.com/apps</a>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s1Step2")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">3</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("slackGuide", "s1Step3")}</p>
                <div className="bg-[#1a1a2e] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono whitespace-pre leading-relaxed">{SLACK_MANIFEST}</pre>
                </div>
                <p className="text-xs text-[#949aa0] mt-2 italic">{t("slackGuide", "s1Step3Hint")}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">4</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s1Step4")}</p>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("slackGuide", "s1Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 2: Install App to Your Workspace */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#4A154B]/20 transition-all duration-500 animate-fade-up animate-delay-600">
        <div className="bg-gradient-to-r from-purple-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#4A154B] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#4A154B]/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("slackGuide", "s2Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("slackGuide", "s2Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s2Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s2Step2")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s2Step3")}</p>
                <p className="text-xs text-[#949aa0] mt-0.5">{t("slackGuide", "s2Step3Hint")}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Step 3: Get Your Tokens */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#4A154B]/20 transition-all duration-500 animate-fade-up animate-delay-700">
        <div className="bg-gradient-to-r from-purple-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#4A154B] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#4A154B]/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("slackGuide", "s3Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("slackGuide", "s3Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          {/* Bot Token */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#949aa0] uppercase tracking-wider mb-3">{t("slackGuide", "botTokenLabel")}</p>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">1</span>
                <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s3Bot1")}</p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s3Bot2")}</p>
                  <div className="mt-1.5 bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-2.5 font-mono text-xs text-[#949aa0]">
                    xoxb-your-bot-token-here
                  </div>
                </div>
              </li>
            </ol>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#e5e7eb]" />
            <span className="text-[10px] text-[#c5c9cd] font-semibold uppercase">+</span>
            <div className="flex-1 h-px bg-[#e5e7eb]" />
          </div>

          {/* App Token */}
          <div>
            <p className="text-xs font-bold text-[#949aa0] uppercase tracking-wider mb-3">{t("slackGuide", "appTokenLabel")}</p>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">1</span>
                <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s3App1")}</p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">2</span>
                <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s3App2")}</p>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">3</span>
                <div>
                  <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s3App3")}</p>
                  <div className="mt-1.5 bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-2.5 font-mono text-xs text-[#949aa0]">
                    xapp-your-app-token-here
                  </div>
                </div>
              </li>
            </ol>
          </div>

          {/* Security warning */}
          <div className="mt-5 bg-red-50/50 border border-red-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-xs text-red-700">
              <span className="font-bold">{t("slackGuide", "securityWarning")}:</span>{" "}
              {t("slackGuide", "securityWarningDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Step 4: Connect Slack to Your Agent */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-4 group hover:shadow-lg hover:border-[#4A154B]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-purple-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#4A154B] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#4A154B]/25 group-hover:scale-110 transition-transform duration-300">4</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("slackGuide", "s4Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("slackGuide", "s4Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s4Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s4Step2")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s4Step3")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">4</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s4Step4")}</p>
            </li>
          </ol>
          <div className="mt-5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-emerald-600 font-medium">{t("slackGuide", "s4Done")}</p>
          </div>
        </div>
      </div>

      {/* Step 5: Test the Connection */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 group hover:shadow-lg hover:border-[#4A154B]/20 transition-all duration-500 animate-fade-up animate-delay-800">
        <div className="bg-gradient-to-r from-purple-50/50 to-white p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#4A154B] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#4A154B]/25 group-hover:scale-110 transition-transform duration-300">5</div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{t("slackGuide", "s5Title")}</h3>
              <p className="text-xs text-[#949aa0]">{t("slackGuide", "s5Desc")}</p>
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s5Step1")}</p>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">2</span>
              <div className="flex-1">
                <p className="text-sm text-[#4a4a5a] mb-2">{t("slackGuide", "s5Step2")}</p>
                <div className="bg-[#f6f9fa] rounded-lg border border-[#e5e7eb] px-4 py-2.5 font-mono text-sm text-[#1a1a2e]">
                  @Clawbibi hello, are you there?
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-sm text-[#4a4a5a]">{t("slackGuide", "s5Step3")}</p>
            </li>
          </ol>

          {/* DM tip */}
          <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p className="text-xs text-blue-700">
              <span className="font-bold">{t("troubleshooting", "tip")}:</span>{" "}
              {t("slackGuide", "dmTip")}
            </p>
          </div>

          {/* Success */}
          <div className="mt-3 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-emerald-700">{t("slackGuide", "allSet")}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("slackGuide", "allSetDesc")}</p>
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
              { title: "tsBotNotResponding", fixes: ["tsBotFix1", "tsBotFix2", "tsBotFix3", "tsBotFix4"] },
              { title: "tsTokenError", fixes: ["tsTokenFix1", "tsTokenFix2", "tsTokenFix3"] },
              { title: "tsCantSeeBot", fixes: ["tsSeeFix1", "tsSeeFix2", "tsSeeFix3"] },
              { title: "tsPermissionError", fixes: ["tsPermFix1", "tsPermFix2", "tsPermFix3"] },
            ].map((section) => (
              <div key={section.title} className="bg-[#f6f9fa] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#1a1a2e] mb-2.5">{t("slackGuide", section.title)}</p>
                <ul className="space-y-1.5">
                  {section.fixes.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-xs text-[#4a4a5a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      {t("slackGuide", key)}
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
              <span className="font-bold">{t("slackGuide", "needMoreHelp")}</span>{" "}
              {t("slackGuide", "needMoreHelpDesc")}
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
