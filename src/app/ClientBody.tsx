"use client";

import { LanguageProvider } from "../i18n/LanguageContext";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body className="antialiased bg-[#f6f9fa]" suppressHydrationWarning>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </body>
  );
}
