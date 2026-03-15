"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProfilePage() {
  const { t, locale, setLocale } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("Asia/Dubai");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email || "");
      // Prefer profiles table as source of truth
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, locale, timezone")
        .eq("id", user.id)
        .single();
      if (profile) {
        setName(profile.name || user.user_metadata?.full_name || "");
        if (profile.timezone) setTimezone(profile.timezone);
        if (profile.locale && !localStorage.getItem("clawbibi-lang")) {
          setLocale(profile.locale as "en" | "ar");
        }
      } else {
        setName(user.user_metadata?.full_name || user.user_metadata?.name || "");
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Update profiles table (source of truth for dashboard + billing)
      await supabase
        .from("profiles")
        .update({ name, locale, timezone })
        .eq("id", user.id);
      // Also sync to auth metadata for consistency
      await supabase.auth.updateUser({ data: { full_name: name, timezone } });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    setDeleteError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Delete all user agents
      await supabase.from("agents").delete().eq("user_id", user.id);
      // Delete profile
      await supabase.from("profiles").delete().eq("id", user.id);
      // Sign out (account deletion requires admin SDK on server, so we call the API route)
      const res = await fetch("/api/profile/delete", { method: "DELETE" });
      if (!res.ok) throw new Error("Server error");

      await supabase.auth.signOut();
      router.replace("/");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete account");
      setDeleting(false);
    }
  };

  const initial = name ? name[0]?.toUpperCase() : email?.[0]?.toUpperCase() || "?";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#de1b23]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#de1b23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">{t("profile", "title")}</h1>
            <p className="text-[#949aa0] text-sm">{t("profile", "subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Avatar Card */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-100">
          <div className="flex items-center gap-4">
            <div className="relative group/avatar">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#de1b23] to-[#c41820] text-white text-xl font-bold flex items-center justify-center shadow-lg shadow-[#de1b23]/20 group-hover/avatar:shadow-xl group-hover/avatar:shadow-[#de1b23]/30 group-hover/avatar:scale-105 transition-all duration-300">
                {initial}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div>
              <p className="font-semibold text-[#1a1a2e]">{name || email}</p>
              <p className="text-xs text-[#949aa0] mt-0.5" dir="ltr">{email}</p>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-200">
          <div className="flex items-center gap-2.5 mb-3">
            <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <label className="text-sm font-medium text-[#1a1a2e]">
              {t("profile", "name")}
            </label>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a2e] placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#de1b23]/20 focus:border-[#de1b23] transition-all text-sm"
          />
        </div>

        {/* Email (read only) */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md transition-all duration-500 animate-fade-up animate-delay-300">
          <div className="flex items-center gap-2.5 mb-3">
            <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <label className="text-sm font-medium text-[#1a1a2e]">
              {t("profile", "email")}
            </label>
            <span className="text-[10px] bg-[#f6f9fa] text-[#c5c9cd] px-2 py-0.5 rounded-full font-medium">{t("profile", "readOnly")}</span>
          </div>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-[#949aa0] text-sm cursor-not-allowed"
            dir="ltr"
          />
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-400">
          <div className="flex items-center gap-2.5 mb-3">
            <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
            <label className="text-sm font-medium text-[#1a1a2e]">
              {t("profile", "language")}
            </label>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLocale("en")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${
                locale === "en"
                  ? "border-[#de1b23] bg-[#fef2f2] text-[#de1b23] shadow-sm"
                  : "border-[#e5e7eb] text-[#949aa0] hover:border-[#c5c9cd]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLocale("ar")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${
                locale === "ar"
                  ? "border-[#de1b23] bg-[#fef2f2] text-[#de1b23] shadow-sm"
                  : "border-[#e5e7eb] text-[#949aa0] hover:border-[#c5c9cd]"
              }`}
            >
              العربية
            </button>
          </div>
        </div>

        {/* Timezone */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#de1b23]/10 transition-all duration-500 animate-fade-up animate-delay-500">
          <div className="flex items-center gap-2.5 mb-3">
            <svg className="w-4 h-4 text-[#949aa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <label className="text-sm font-medium text-[#1a1a2e]">
              {t("profile", "timezone")}
            </label>
          </div>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#1a1a2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#de1b23]/20 focus:border-[#de1b23] transition-all cursor-pointer"
          >
            <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
            <option value="Asia/Riyadh">Arabia Standard Time (AST)</option>
            <option value="Asia/Kuwait">Kuwait Time</option>
            <option value="Asia/Bahrain">Bahrain Time</option>
            <option value="Europe/London">GMT</option>
            <option value="America/New_York">Eastern Time</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="animate-fade-up animate-delay-600">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              saved
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-[#de1b23] text-white hover:bg-[#c41820] hover:shadow-lg hover:shadow-[#de1b23]/25 hover:-translate-y-0.5 active:translate-y-0"
            } disabled:opacity-50 disabled:hover:translate-y-0`}
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t("profile", "saving")}
              </span>
            ) : saved ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t("profile", "saved")}
              </span>
            ) : (
              t("profile", "save")
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-200 overflow-hidden animate-fade-up">
          <div className="px-6 py-4 border-b border-red-100 bg-red-50/50">
            <h2 className="text-sm font-bold text-red-700">Danger Zone</h2>
            <p className="text-xs text-red-500 mt-0.5">These actions are irreversible</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-[#949aa0] mb-4">
              Deleting your account will permanently remove all your agents, channels, and data. This cannot be undone.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#1a1a2e] mb-1.5 block">
                  Type <code className="bg-[#f6f9fa] px-1.5 py-0.5 rounded font-mono text-red-600">DELETE</code> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => { setDeleteConfirm(e.target.value); setDeleteError(""); }}
                  placeholder="DELETE"
                  className="w-full px-4 py-3 rounded-xl border border-red-200 bg-red-50/30 text-[#1a1a2e] placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all text-sm font-mono"
                  dir="ltr"
                />
              </div>
              {deleteError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {deleteError}
                </p>
              )}
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== "DELETE" || deleting}
                className="w-full py-3 rounded-xl font-semibold text-sm bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting account...
                  </span>
                ) : (
                  "Delete My Account"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
