"use client";

import { useLanguage } from "@/i18n/LanguageContext";

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
}

export function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] shadow-2xl p-6 mx-4 max-w-sm w-full animate-fade-up">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#de1b23]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-[#1a1a2e] text-center mb-2">
          {t("billing", "betaNotice")}
        </h3>
        <p className="text-sm text-[#949aa0] text-center mb-5">
          {t("billing", "betaNoticeDesc")}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#de1b23] text-white text-sm font-semibold hover:bg-[#c41820] transition-colors duration-200"
        >
          {t("billing", "understood")}
        </button>
      </div>
    </div>
  );
}
