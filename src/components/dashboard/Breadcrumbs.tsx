"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-/i;

export function Breadcrumbs() {
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // Don't show on top-level dashboard
  if (segments.length <= 1) return null;

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isCurrent = i === segments.length - 1;

    let label: string;
    if (UUID_REGEX.test(seg)) {
      label = seg.slice(0, 8) + "…";
    } else {
      label = t("breadcrumbs", seg);
    }

    return { label, href, isCurrent };
  });

  return (
    <nav className="flex items-center gap-1.5 text-xs mb-5 animate-fade-up" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg
              className={`w-3 h-3 text-[#c5c9cd] flex-shrink-0 ${isRTL ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
          {crumb.isCurrent ? (
            <span className="text-[#1a1a2e] font-medium truncate max-w-[120px]">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-[#949aa0] hover:text-[#de1b23] transition-colors duration-200 truncate max-w-[120px]"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
