"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const STORAGE_KEY = "clawbibi_onboarding_v1";

interface OnboardingState {
  dismissed: boolean;
  msgSent: boolean;
}

interface Props {
  hasCreatedAgent: boolean;
  hasConnectedChannel: boolean;
}

export function WelcomeOnboarding({ hasCreatedAgent, hasConnectedChannel }: Props) {
  const { t, isRTL } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state: OnboardingState = JSON.parse(raw);
        setDismissed(state.dismissed ?? false);
        setMsgSent(state.msgSent ?? false);
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  function markMsgSent() {
    setMsgSent(true);
    persist({ dismissed, msgSent: true });
  }

  function dismiss() {
    setDismissed(true);
    persist({ dismissed: true, msgSent });
  }

  function persist(state: OnboardingState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  }

  if (!loaded || dismissed) return null;

  const steps = [
    {
      done: hasCreatedAgent,
      title: t("dashboard", "onboardStep1"),
      desc: t("dashboard", "onboardStep1Desc"),
      action: (
        <Link
          href="/dashboard/agents/new"
          className="text-xs font-semibold text-[#de1b23] hover:underline"
        >
          {isRTL ? "أنشئ الآن ←" : "Create now →"}
        </Link>
      ),
    },
    {
      done: hasConnectedChannel,
      title: t("dashboard", "onboardStep3"),
      desc: t("dashboard", "onboardStep3Desc"),
      action: hasCreatedAgent ? (
        <Link
          href="/dashboard/agents"
          className="text-xs font-semibold text-[#de1b23] hover:underline"
        >
          {isRTL ? "اذهب للمساعدين ←" : "Go to Agents →"}
        </Link>
      ) : null,
    },
    {
      done: msgSent,
      title: t("dashboard", "onboardStepMsg"),
      desc: t("dashboard", "onboardStepMsgDesc"),
      action: !msgSent ? (
        <button
          onClick={markMsgSent}
          className="text-xs font-semibold text-[#de1b23] hover:underline"
        >
          {isRTL ? "تم الإرسال ✓" : "Mark as done ✓"}
        </button>
      ) : null,
    },
  ];

  const completedCount = steps.filter(s => s.done).length;
  const allDone = completedCount === steps.length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6 animate-fade-up">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f6f9fa]">
        <div
          className="h-full bg-gradient-to-r from-[#de1b23] to-[#de1b23]/60 transition-all duration-700"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="px-6 pt-7 pb-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1a1a2e]">{t("dashboard", "onboardTitle")}</h2>
              <p className="text-xs text-[#949aa0]">
                {completedCount}/{steps.length} {isRTL ? "مكتملة" : "completed"}
              </p>
            </div>
          </div>
          {allDone && (
            <button
              onClick={dismiss}
              className="text-xs text-[#949aa0] hover:text-[#1a1a2e] transition-colors flex-shrink-0"
            >
              {isRTL ? "إخفاء" : "Dismiss"}
            </button>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                step.done
                  ? "bg-emerald-50 border-emerald-100"
                  : "bg-[#fafafa] border-[#e5e7eb]"
              }`}
            >
              {/* Check circle */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                step.done ? "bg-emerald-500" : "bg-[#e5e7eb]"
              }`}>
                {step.done ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-[10px] font-bold text-[#949aa0]">{i + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${step.done ? "text-emerald-700 line-through" : "text-[#1a1a2e]"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-[#949aa0] mt-0.5">{step.desc}</p>
                {!step.done && step.action && (
                  <div className="mt-2">{step.action}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* All done message */}
        {allDone && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <span className="text-xl">🎉</span>
            <div>
              <p className="text-sm font-bold text-emerald-800">
                {isRTL ? "أحسنت! مساعدك جاهز تماماً." : "All set! Your agent is fully configured."}
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                {isRTL ? "يمكنك إخفاء هذا الدليل الآن." : "You can dismiss this guide now."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
