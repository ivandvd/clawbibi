"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ReactNode } from "react";

interface GuideCardProps {
  title: string;
  desc: string;
  href: string;
  icon: ReactNode;
  color: string;
  soon?: boolean;
  recommended?: boolean;
  index?: number;
}

export function GuideCard({ title, desc, href, icon, color, soon, recommended, index = 0 }: GuideCardProps) {
  const { t } = useLanguage();
  const delay = `animate-delay-${(index + 2) * 100}`;

  if (soon) {
    return (
      <div className={`bg-white rounded-xl border border-[#e5e7eb] p-4 opacity-50 cursor-default relative animate-fade-up ${delay}`}>
        <span className="absolute top-3 right-3 text-[10px] bg-[#f6f9fa] text-[#c5c9cd] px-2 py-0.5 rounded-full font-medium">
          {t("dashboard", "soon")}
        </span>
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${color}12`, color }}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-[#1a1a2e]">{title}</h3>
        <p className="text-xs text-[#c5c9cd] mt-1">{desc}</p>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`rounded-xl border p-4 hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group relative animate-fade-up ${delay} ${recommended ? "bg-gradient-to-br from-white to-emerald-50/50 border-emerald-200 hover:border-emerald-300 ring-1 ring-emerald-100" : "bg-white border-[#e5e7eb] hover:border-[#de1b23]/20"}`}
    >
      {/* Recommended badge */}
      {recommended && (
        <span className="absolute top-3 ltr:right-3 rtl:left-3 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-semibold tracking-wide flex items-center gap-1">
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
          {t("dashboard", "recommended")}
        </span>
      )}
      {/* Green status dot */}
      <span className="absolute bottom-4 ltr:right-4 rtl:left-4 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: `${color}12`, color }}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-[#1a1a2e] group-hover:text-[#de1b23] transition-colors duration-200">{title}</h3>
      <p className="text-xs text-[#949aa0] mt-1">{desc}</p>
    </Link>
  );
}
