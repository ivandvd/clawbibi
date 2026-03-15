"use client";

import { useLanguage } from "@/i18n/LanguageContext";

interface ChannelCardProps {
  id: string;
  name: string;
  color: string;
  connected: boolean;
  lastActive?: string;
  icon: React.ReactNode;
  onDisconnect?: (id: string) => void;
  onReconnect?: (id: string) => void;
}

export function ChannelCard({ id, name, color, connected, lastActive, icon, onDisconnect, onReconnect }: ChannelCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:shadow-md hover:border-[#e5e7eb]/80 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">{name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-emerald-500" : "bg-[#c5c9cd]"}`} />
              <span className={`text-xs ${connected ? "text-emerald-600" : "text-[#c5c9cd]"}`}>
                {connected ? t("agents", "statusConnected") : t("agents", "statusNotConnected")}
              </span>
              {connected && lastActive && (
                <>
                  <span className="text-[#e5e7eb]">·</span>
                  <span className="text-xs text-[#949aa0]">{t("agents", "lastActive")}: {lastActive}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {connected ? (
          <button
            onClick={() => onDisconnect?.(id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
          >
            {t("agents", "disconnect")}
          </button>
        ) : (
          <button
            onClick={() => onReconnect?.(id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#f6f9fa] text-[#949aa0] hover:bg-[#de1b23]/10 hover:text-[#de1b23] transition-colors duration-200"
          >
            {t("agents", "reconnect")}
          </button>
        )}
      </div>
    </div>
  );
}
