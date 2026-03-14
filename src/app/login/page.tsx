"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

export default function LoginPage() {
  const { t, isRTL, locale, setLocale } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: true,
        },
      });
      if (error) {
        if (error.message.includes("provider is not enabled")) {
          setError(provider === "google"
            ? t("login", "googleNotEnabled")
            : t("login", "appleNotEnabled"));
        } else {
          setError(error.message);
        }
      } else if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fa] flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between" dir="ltr">
        <Link href="/" className="flex items-center gap-2">
          <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-8 h-8" />
          <span className="font-bold text-lg text-[#1a1a2e]" translate="no">clawbibi</span>
        </Link>
        <button
          onClick={() => setLocale(locale === "en" ? "ar" : "en")}
          className="text-sm text-[#949aa0] hover:text-[#1a1a2e] transition-colors"
        >
          {locale === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-8">
            <div className="text-center mb-8">
              <img src="/clawbibi-logo.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-[#1a1a2e]">
                {t("login", "title")}
              </h1>
              <p className="text-[#949aa0] mt-2 text-sm">
                {t("login", "subtitle")}
              </p>
            </div>

            {sent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-[#1a1a2e] mb-2">
                  {t("login", "checkEmail")}
                </h2>
                <p className="text-[#949aa0] text-sm">
                  {t("login", "checkEmailDesc")}
                </p>
              </div>
            ) : (
              <>
                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => handleOAuth("google")}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-[#1a1a2e]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {t("login", "continueGoogle")}
                  </button>

                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e5e7eb]" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-[#949aa0]">
                      {t("login", "orEmail")}
                    </span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("login", "emailPlaceholder")}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a2e] placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#de1b23]/20 focus:border-[#de1b23] transition-all text-sm"
                      dir="ltr"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#de1b23] text-white font-medium text-sm hover:bg-[#c41820] transition-colors disabled:opacity-50"
                  >
                    {loading ? t("login", "sending") : t("login", "sendMagicLink")}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#949aa0] mt-6">
            {t("login", "terms")}{" "}
            <Link href="/terms" className="underline hover:text-[#1a1a2e]">
              {t("login", "termsLink")}
            </Link>{" "}
            {t("login", "and")}{" "}
            <Link href="/privacy" className="underline hover:text-[#1a1a2e]">
              {t("login", "privacyLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
