"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";

// Scroll animation hook
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}


// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, locale, setLocale, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user has an active Supabase session
    import("@/lib/supabase/client").then(({ createClient }) => {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        setIsLoggedIn(!!session);
      });
    });
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
      isScrolled ? "bg-white/95 shadow-sm" : "bg-white/80"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" dir="ltr">
        <Link href="/" className="flex items-center gap-1">
          <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-9 h-9" />
          <span className="font-bold text-xl" translate="no">
            claw<span className="text-[#de1b23]">bibi</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center bg-[#f6f9fa] rounded-full px-1.5 py-1.5 gap-1">
          <a href="#how" className="text-[#1a1a2e] hover:bg-white hover:shadow-sm rounded-full px-4 py-1.5 transition-all duration-200 text-sm font-medium">{t("header", "howItWorks")}</a>
          <a href="#features" className="text-[#1a1a2e] hover:bg-white hover:shadow-sm rounded-full px-4 py-1.5 transition-all duration-200 text-sm font-medium">{t("header", "features")}</a>
          <a href="#faq" className="text-[#1a1a2e] hover:bg-white hover:shadow-sm rounded-full px-4 py-1.5 transition-all duration-200 text-sm font-medium">{t("header", "faq")}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-[#f6f9fa] rounded-full p-0.5 text-xs font-medium">
            <button onClick={() => setLocale("en")} className={`px-3 py-1 rounded-full transition-all duration-200 ${locale === "en" ? "bg-white shadow-sm text-[#1a1a2e]" : "text-[#949aa0]"}`}>EN</button>
            <button onClick={() => setLocale("ar")} className={`px-3 py-1 rounded-full transition-all duration-200 ${locale === "ar" ? "bg-white shadow-sm text-[#1a1a2e]" : "text-[#949aa0]"}`}>{"\u0639\u0631\u0628\u064A"}</button>
          </div>
          {isLoggedIn ? (
            <Link href="/dashboard" className="hidden md:flex items-center gap-2 border border-[#e5e7eb] text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#f6f9fa] transition-all duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              {t("header", "goToDashboard")}
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-[#1a1a2e] hover:text-[#de1b23] transition-all duration-200 text-sm font-medium">{t("header", "login")}</Link>
              <Link href="/login" className="hidden md:block bg-[#de1b23] text-white px-5 py-2 rounded-full text-sm font-medium shadow-sm shadow-[#de1b23]/20 hover:shadow-md hover:shadow-[#de1b23]/30 hover:-translate-y-0.5 hover:bg-[#c41820] transition-all duration-300 ease-out">{t("header", "getStarted")}</Link>
            </>
          )}
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? "max-h-80" : "max-h-0"}`} dir="ltr">
        <div className="px-6 pb-5 pt-1 space-y-3 border-t border-gray-100">
          <a href="#how" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#1a1a2e] py-2">{t("header", "howItWorks")}</a>
          <a href="#features" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#1a1a2e] py-2">{t("header", "features")}</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#1a1a2e] py-2">{t("header", "faq")}</a>
          <div className="flex items-center bg-[#f6f9fa] rounded-full p-0.5 text-xs font-medium w-fit">
            <button onClick={() => { setLocale("en"); setMobileOpen(false); }} className={`px-3 py-1 rounded-full transition-all duration-200 ${locale === "en" ? "bg-white shadow-sm text-[#1a1a2e]" : "text-[#949aa0]"}`}>EN</button>
            <button onClick={() => { setLocale("ar"); setMobileOpen(false); }} className={`px-3 py-1 rounded-full transition-all duration-200 ${locale === "ar" ? "bg-white shadow-sm text-[#1a1a2e]" : "text-[#949aa0]"}`}>{"\u0639\u0631\u0628\u064A"}</button>
          </div>
          <hr className="border-gray-100" />
          <div className="flex items-center gap-3 pt-1">
            {isLoggedIn ? (
              <Link href="/dashboard" className="flex items-center gap-2 border border-[#e5e7eb] text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-medium" onClick={() => setMobileOpen(false)}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                {t("header", "goToDashboard")}
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[#1a1a2e]" onClick={() => setMobileOpen(false)}>{t("header", "login")}</Link>
                <Link href="/login" className="bg-[#de1b23] text-white px-5 py-2 rounded-full text-sm font-medium" onClick={() => setMobileOpen(false)}>{t("header", "getStarted")}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useLanguage();
  const fullText = "CLAWBIBI";
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayed.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [displayed]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  const renderText = () => {
    const splitAt = 4;
    const before = displayed.slice(0, splitAt);
    const after = displayed.slice(splitAt);
    return (
      <>
        {before}
        {after && <span className="text-[#de1b23] font-bold">{after}</span>}
      </>
    );
  };

  return (
    <section className="pt-44 pb-20 px-6 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src="/clawbibi-bg.png" alt="" className="w-[475px] md:w-[575px] opacity-45 gentle-float" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-[7rem] font-extralight tracking-tight mb-8 text-[#1a1a2e]" style={{ letterSpacing: '0.04em' }}>
          {renderText()}<span className={`text-[#de1b23] font-thin ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
        </h1>

        <p className="text-base md:text-lg text-[#1a1a2e]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero", "subtitle")}
        </p>

        <Link href="/login" className="inline-flex items-center gap-2 bg-[#de1b23] text-white px-10 py-4 rounded-full font-semibold uppercase text-sm tracking-wider shadow-lg shadow-[#de1b23]/20 hover:shadow-xl hover:shadow-[#de1b23]/30 hover:-translate-y-0.5 hover:bg-[#c41820] transition-all duration-300 ease-out">
          {t("hero", "cta")}
        </Link>

      </div>

      <div className="flex flex-col items-center gap-3 mt-24">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#b0b5ba] uppercase font-mono">{t("hero", "availableOn")}</span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
              <img src="https://clawi.ai/_next/image?url=%2Flogos%2Fai%2Ftelegram.png&w=32&q=75" alt="Telegram" className="h-4 w-auto object-contain" />
              Telegram
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
              <img src="https://clawi.ai/_next/image?url=%2Flogos%2Fai%2Fdiscord.png&w=32&q=75" alt="Discord" className="h-4 w-auto object-contain" />
              Discord
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
              <img src="https://clawi.ai/_next/image?url=%2Flogos%2Fai%2Fwhatsapp.png&w=32&q=75" alt="WhatsApp" className="h-4 w-auto object-contain" />
              WhatsApp
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
              <img src="https://clawi.ai/_next/image?url=%2Flogos%2Fai%2Fslack.png&w=32&q=75" alt="Slack" className="h-4 w-auto object-contain" />
              Slack
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#b0b5ba] uppercase font-mono">{t("hero", "poweredBy")}</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
            <img src="https://clawi.ai/logos/ai/claude.svg" alt="Claude" className="h-4 w-auto object-contain" />
            Claude
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
            <img src="https://clawi.ai/logos/ai/chatgpt.svg" alt="ChatGPT" className="h-4 w-auto object-contain" />
            ChatGPT
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200/60 rounded-full px-3 py-1.5 text-xs font-medium text-[#1a1a2e] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#de1b23]/20">
            <img src="https://clawi.ai/_next/image?url=%2Flogos%2Fai%2Fgemini.png&w=32&q=75" alt="Gemini" className="h-4 w-auto object-contain" />
            Gemini
          </span>
        </div>
        </div>
      </div>
    </section>
  );
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );
}

// How It Works Section
function HowItWorksSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useInView(0.1);
  const [connectionStep, setConnectionStep] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [visibleChecks, setVisibleChecks] = useState(0);
  const [card3Phase, setCard3Phase] = useState(0); // 0=nothing, 1=typing dots, 2=typing text, 3=done
  const [card3Text, setCard3Text] = useState("");
  const card3FullText = t("howItWorks", "card3FullText");
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Card 1: Connection sequence
  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;
    const delays = [400, 900, 1400, 2200];
    delays.forEach((delay, i) => {
      const t = setTimeout(() => setConnectionStep(i + 1), delay);
      currentTimeouts.push(t);
    });
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible]);

  // Card 2: Progress bar + checkmarks
  useEffect(() => {
    if (!isVisible) return;
    // Animate progress bar
    const t1 = setTimeout(() => {
      setProgressWidth(86);
      // Animate counter alongside
      const start = performance.now();
      const animateCount = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / 1500, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setProgressCount(Math.floor(eased * 86));
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    }, 300);

    // Staggered checkmarks after 800ms
    const checkDelays = [800, 1100, 1400, 1700];
    checkDelays.forEach((delay, i) => {
      const t = setTimeout(() => setVisibleChecks(i + 1), delay);
      timeoutsRef.current.push(t);
    });
    timeoutsRef.current.push(t1);
  }, [isVisible]);

  // Card 3: Typing sequence
  useEffect(() => {
    if (!isVisible) return;
    // Show typing dots after card appears
    const t1 = setTimeout(() => setCard3Phase(1), 600);
    // Start typing text
    const t2 = setTimeout(() => {
      setCard3Phase(2);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setCard3Text(card3FullText.slice(0, i));
        if (i >= card3FullText.length) {
          clearInterval(interval);
          setCard3Phase(3);
        }
      }, 25);
      timeoutsRef.current.push(interval as unknown as NodeJS.Timeout);
    }, 1400);
    timeoutsRef.current.push(t1, t2);
  }, [isVisible, card3FullText]);

  const getConnectionStatus = (index: number) => {
    // index: 0=WhatsApp, 1=Telegram, 2=Discord, 3=Slack
    if (index === 3) return { status: "pending", label: "—" };
    if (connectionStep > index) return { status: "connected", label: t("howItWorks", "connected") };
    if (connectionStep === index && index === 2) return { status: "connecting", label: t("howItWorks", "connecting") };
    return { status: "pending", label: t("howItWorks", "pending") };
  };

  const messengers = [
    { name: "WhatsApp", img: "whatsapp" },
    { name: "Telegram", img: "telegram" },
    { name: "Discord", img: "discord" },
    { name: "Slack", img: "slack" },
  ];

  const checkItems = [
    t("howItWorks", "contextLang"),
    t("howItWorks", "contextLocation"),
    t("howItWorks", "contextTimezone"),
    t("howItWorks", "contextReminder"),
  ];

  return (
    <section id="how" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-[#de1b23]/70 uppercase font-mono mb-4">{t("howItWorks", "sectionLabel")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            {t("howItWorks", "sectionTitle")}
          </h2>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-5">
          {/* Card 1 — Connect your messenger */}
          <div className={`bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-mono text-[#949aa0] mb-5">{t("howItWorks", "card1Step")}</span>

            <div className="bg-[#f6f9fa] rounded-xl p-4 mb-6 flex-1">
              <span className="text-[10px] font-semibold tracking-wider text-[#949aa0] uppercase block mb-3">{t("howItWorks", "messengers")}</span>
              <div className="space-y-2.5">
                {messengers.map((m, i) => {
                  const { status, label } = getConnectionStatus(i);
                  return (
                    <div key={m.name} className={`flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-gray-100 transition-all duration-500 ${status === "pending" && i === 3 ? "opacity-50" : "opacity-100"}`}>
                      <div className="flex items-center gap-2.5">
                        <img src={`https://clawi.ai/_next/image?url=%2Flogos%2Fai%2F${m.img}.png&w=32&q=75`} alt={m.name} className="h-5 w-auto object-contain" />
                        <span className="text-sm font-medium text-[#1a1a2e]">{m.name}</span>
                      </div>
                      {status === "connected" ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#2e7d32]">
                          <span className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full status-pulse" />
                          {t("howItWorks", "connected")}
                        </span>
                      ) : status === "connecting" ? (
                        <span className="text-[10px] font-medium text-[#f59e0b]">{t("howItWorks", "connecting")}</span>
                      ) : (
                        <span className="text-[10px] text-[#949aa0]">{label}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{t("howItWorks", "card1Title")}</h3>
            <p className="text-sm text-[#949aa0] leading-relaxed mb-4">{t("howItWorks", "card1Desc")}</p>
            <span className="text-[11px] text-[#949aa0] font-mono mt-auto">{t("howItWorks", "card1Footer")}</span>
          </div>

          {/* Card 2 — Customize & learn */}
          <div className={`bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-mono text-[#949aa0] mb-5">{t("howItWorks", "card2Step")}</span>

            <div className="bg-[#f6f9fa] rounded-xl p-4 mb-6 flex-1">
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold tracking-wider text-[#949aa0] uppercase">{t("howItWorks", "learningContext")}</span>
                <span className="text-xs font-semibold text-[#de1b23]">{progressCount}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#de1b23] to-[#ff6b6b] rounded-full transition-all duration-[1500ms] ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              {/* Context items */}
              <div className="space-y-2 mb-4">
                {checkItems.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 text-xs transition-all duration-400 ${
                      i < visibleChecks ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="#2e7d32"><path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/></svg>
                    <span className="text-[#1a1a2e]">{item}</span>
                  </div>
                ))}
              </div>

              {/* Skills section */}
              <div className={`border-t border-gray-200/60 pt-3 transition-all duration-500 ${visibleChecks >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                <span className="text-[10px] font-semibold tracking-wider text-[#949aa0] uppercase block mb-2">{t("howItWorks", "activeSkills")}</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: t("howItWorks", "skillPrayer"), icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                    { name: t("howItWorks", "skillCurrency"), icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
                    { name: t("howItWorks", "skillCalendar"), icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
                    { name: t("howItWorks", "skillSearch"), icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
                  ].map((skill, i) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1 bg-white border border-[#de1b23]/15 rounded-full px-2 py-1 text-[9px] font-medium text-[#1a1a2e] transition-all duration-400 ${
                        visibleChecks >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      }`}
                      style={{ transitionDelay: `${i * 100 + 200}ms` }}
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{t("howItWorks", "card2Title")}</h3>
            <p className="text-sm text-[#949aa0] leading-relaxed mb-4">{t("howItWorks", "card2Desc")}</p>
            <span className="text-[11px] text-[#949aa0] font-mono mt-auto">{t("howItWorks", "card2Footer")}</span>
          </div>

          {/* Card 3 — Chat-style live demo */}
          <div className={`bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-mono text-[#949aa0] mb-5">{t("howItWorks", "card3Step")}</span>

            <div className="bg-[#f6f9fa] rounded-xl overflow-hidden mb-6 flex-1">
              {/* Mini chat header */}
              <div className="relative px-3 py-2 border-b border-gray-200/60">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#de1b23] via-[#ff6b6b] to-[#de1b23]" />
                <div className="flex items-center gap-2">
                  <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-6 h-6 rounded-full" />
                  <div>
                    <span className="text-[11px] font-semibold text-[#1a1a2e]" translate="no">Clawbibi</span>
                    <span className="flex items-center gap-1 text-[8px] text-[#2e7d32]">
                      <span className="w-1 h-1 bg-[#2e7d32] rounded-full status-pulse" />
                      {t("howItWorks", "online")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-3 space-y-2.5">
                {/* Bot greeting */}
                <div className={`flex items-start gap-2 transition-all duration-500 ${card3Phase >= 0 ? "opacity-100" : "opacity-0"}`}>
                  <img src="/clawbibi-logo.png" alt="" className="w-5 h-5 rounded-full shrink-0 mt-0.5" />
                  <div className={`bg-white rounded-xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} px-3 py-2 border border-gray-100 shadow-sm`}>
                    <p className="text-[11px] text-[#1a1a2e] leading-relaxed">{t("howItWorks", "greeting")}</p>
                    <span className="text-[8px] text-[#949aa0] mt-0.5 block">{t("howItWorks", "justNow")}</span>
                  </div>
                </div>

                {/* Typing / response */}
                {card3Phase === 1 && (
                  <div className="flex items-start gap-2">
                    <img src="/clawbibi-logo.png" alt="" className="w-5 h-5 rounded-full shrink-0 mt-0.5" />
                    <div className={`bg-white rounded-xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} border border-gray-100 shadow-sm`}>
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                {card3Phase >= 2 && (
                  <div className="flex items-start gap-2">
                    <img src="/clawbibi-logo.png" alt="" className="w-5 h-5 rounded-full shrink-0 mt-0.5" />
                    <div className={`bg-white rounded-xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} px-3 py-2 border border-gray-100 shadow-sm max-w-[85%]`}>
                      <p className="text-[11px] text-[#1a1a2e] leading-relaxed">
                        {card3Text}
                        {card3Phase === 2 && <span className="terminal-cursor ml-0.5">|</span>}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className={`flex items-center gap-2 ${isRTL ? "pr-7" : "pl-7"} transition-all duration-500 ${card3Phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                  <button type="button" className="bg-[#de1b23] text-white text-[9px] font-semibold px-2.5 py-1 rounded-lg">{t("howItWorks", "showRestaurants")}</button>
                  <button type="button" className="bg-white border border-gray-200 text-[9px] font-medium text-[#1a1a2e] px-2.5 py-1 rounded-lg">{t("howItWorks", "viewCalendar")}</button>
                </div>
              </div>

              {/* Mini input */}
              <div className="border-t border-gray-200/60 px-3 py-2 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-lg px-2.5 py-1.5 text-[10px] text-[#949aa0] border border-gray-100">{t("howItWorks", "typeMessage")}</div>
                <div className="w-6 h-6 bg-[#de1b23] rounded-lg flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{t("howItWorks", "card3Title")}</h3>
            <p className="text-sm text-[#949aa0] leading-relaxed mb-4">{t("howItWorks", "card3Desc")}</p>
            <span className="text-[11px] text-[#949aa0] font-mono mt-auto">{t("howItWorks", "card3Footer")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Chat Demo Section
function ChatDemoSection() {
  const { t, locale, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const { ref, isVisible } = useInView(0.1);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasAnimatedFirstTab = useRef(false);

  // Each step: { type: "user"|"action"|"bot", content/text/widget }
  const tabs = [
    {
      label: t("chatDemo", "tabDailyTasks"),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
      steps: [
        { type: "user", text: t("chatDemo", "tab1User") },
        { type: "action", text: t("chatDemo", "tab1Action1") },
        { type: "action", text: t("chatDemo", "tab1Action2") },
        { type: "bot", text: t("chatDemo", "tab1Bot"), widget: (
          <div className="space-y-2 mt-2">
            <div className="bg-[#f6f9fa] rounded-lg p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 bg-[#de1b23]/10 rounded-lg flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M6.5 6.5h11M12 2v4M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z"/><path d="M8 14l2 2 4-4"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1a1a2e]">Fitness First Marina</span>
                  <span className="text-[9px] text-[#f59e0b]">★ 4.5</span>
                </div>
                <span className="text-[10px] text-[#949aa0]">AED 199/mo · 0.8 km away</span>
              </div>
              <span className="text-[10px] bg-[#2e7d32]/10 text-[#2e7d32] px-2 py-0.5 rounded-full font-semibold shrink-0">Save 45%</span>
            </div>
            <div className="bg-[#f6f9fa] rounded-lg p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <div className="w-9 h-9 bg-[#de1b23]/10 rounded-lg flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M6.5 6.5h11M12 2v4M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z"/><path d="M8 14l2 2 4-4"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1a1a2e]">GymNation JBR</span>
                  <span className="text-[9px] text-[#f59e0b]">★ 4.3</span>
                </div>
                <span className="text-[10px] text-[#949aa0]">AED 99/mo · 1.2 km away</span>
              </div>
              <span className="text-[10px] bg-[#2e7d32]/10 text-[#2e7d32] px-2 py-0.5 rounded-full font-semibold shrink-0">Save 73%</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button type="button" className="text-[10px] font-medium text-[#de1b23] flex items-center gap-1 hover:underline">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {t("chatDemo", "tab1ViewMap")}
              </button>
              <button type="button" className="text-[10px] font-medium text-[#949aa0] flex items-center gap-1 hover:text-[#1a1a2e]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                {t("chatDemo", "tab1SendCancel")}
              </button>
            </div>
          </div>
        )},
      ],
    },
    {
      label: t("chatDemo", "tabResearch"),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
      steps: [
        { type: "user", text: "\u0627\u0628\u062D\u062B\u0644\u064A \u0639\u0646 \u0623\u0641\u0636\u0644 \u0665 \u0645\u0637\u0627\u0639\u0645 \u064A\u0627\u0628\u0627\u0646\u064A\u0629 \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636 \u0645\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631" },
        { type: "action", text: t("chatDemo", "tab2Action1") },
        { type: "action", text: t("chatDemo", "tab2Action2") },
        { type: "bot", text: t("chatDemo", "tab2Bot"), widget: (
          <div className="space-y-2 mt-2">
            {[
              { name: "Nobu Riyadh", area: "King Abdullah Financial District", price: "$$$$", stars: "4.9", color: "#de1b23" },
              { name: "Zuma Riyadh", area: "Al Faisaliah Tower", price: "$$$$", stars: "4.8", color: "#f59e0b" },
              { name: "Sakura Sushi", area: "Al Olaya", price: "$$$", stars: "4.6", color: "#2e7d32" },
              { name: "Koi Restaurant", area: "Tahlia Street", price: "$$$", stars: "4.5", color: "#6366f1" },
              { name: "Miyako", area: "Al Worood", price: "$$", stars: "4.3", color: "#949aa0" },
            ].map((r, i) => (
              <div key={r.name} className="bg-[#f6f9fa] rounded-lg p-2.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg text-[10px] font-bold text-white flex items-center justify-center shrink-0" style={{ backgroundColor: r.color }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1a1a2e]">{r.name}</span>
                    <span className="text-[9px] text-[#f59e0b]">★ {r.stars}</span>
                  </div>
                  <span className="text-[10px] text-[#949aa0]">{r.area}</span>
                </div>
                <span className="text-[10px] font-mono text-[#949aa0] shrink-0">{r.price}</span>
              </div>
            ))}
          </div>
        )},
      ],
    },
    {
      label: t("chatDemo", "tabScheduling"),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
      steps: [
        { type: "user", text: t("chatDemo", "tab3User") },
        { type: "action", text: t("chatDemo", "tab3Action1") },
        { type: "action", text: t("chatDemo", "tab3Action2") },
        { type: "bot", text: t("chatDemo", "tab3Bot"), widget: (
          <div className="mt-2 bg-[#f6f9fa] rounded-xl p-4" style={{ [isRTL ? "borderRight" : "borderLeft"]: "3px solid #de1b23" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#de1b23]/10 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#1a1a2e] block">{t("chatDemo", "tab3MeetingTitle")}</span>
                  <span className="text-[10px] text-[#949aa0]">{t("chatDemo", "tab3GoogleCal")}</span>
                </div>
              </div>
              <span className="text-[10px] bg-[#de1b23]/10 text-[#de1b23] px-2 py-0.5 rounded-full font-medium">{t("chatDemo", "tab3Tomorrow")}</span>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-[11px] text-[#1a1a2e]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {t("chatDemo", "tab3Time")}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#1a1a2e]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                {t("chatDemo", "tab3Reminder")}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#1a1a2e]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                Ahmed Al-Rashid
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="bg-[#de1b23] text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg">{t("chatDemo", "tab3JoinMeeting")}</button>
              <button type="button" className="bg-white border border-gray-200 text-[10px] font-medium text-[#1a1a2e] px-3 py-1.5 rounded-lg">{t("chatDemo", "tab3Reschedule")}</button>
            </div>
          </div>
        )},
      ],
    },
    {
      label: t("chatDemo", "tabSmartReminders"),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
      steps: [
        { type: "user", text: "\u0630\u0643\u0631\u0646\u064A \u0623\u062F\u0641\u0639 \u0641\u0627\u062A\u0648\u0631\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0623\u0648\u0644 \u0643\u0644 \u0634\u0647\u0631" },
        { type: "action", text: t("chatDemo", "tab4Action") },
        { type: "bot", text: t("chatDemo", "tab4Bot"), widget: (
          <div className="mt-2 bg-[#f6f9fa] rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#de1b23]/10 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-[#1a1a2e] block">{t("chatDemo", "tab4Title")}</span>
                <span className="text-[10px] text-[#949aa0]">{t("chatDemo", "tab4Service")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-[10px] text-[#1a1a2e] font-medium">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                {t("chatDemo", "tab4Schedule")}
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-[10px] text-[#1a1a2e] font-medium">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {t("chatDemo", "tab4Time")}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#2e7d32] font-semibold">
                <span className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full status-pulse" />
                {t("chatDemo", "tab4Active")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="bg-white border border-gray-200 text-[10px] font-medium text-[#1a1a2e] px-3 py-1.5 rounded-lg flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                {t("chatDemo", "tab4Edit")}
              </button>
              <button type="button" className="bg-white border border-gray-200 text-[10px] font-medium text-[#949aa0] px-3 py-1.5 rounded-lg">{t("chatDemo", "tab4Pause")}</button>
            </div>
          </div>
        )},
      ],
    },
  ];

  const animateSteps = useCallback((tabIndex: number) => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleSteps(0);
    setShowTyping(false);

    const steps = tabs[tabIndex].steps;
    let delay = 300;

    steps.forEach((step, i) => {
      if (step.type === "action") {
        const t = setTimeout(() => setVisibleSteps(i + 1), delay);
        timeoutsRef.current.push(t);
        delay += 600;
      } else if (step.type === "bot") {
        // Typing indicator before bot
        const t1 = setTimeout(() => setShowTyping(true), delay);
        timeoutsRef.current.push(t1);
        delay += 800;
        const t2 = setTimeout(() => {
          setShowTyping(false);
          setVisibleSteps(i + 1);
        }, delay);
        timeoutsRef.current.push(t2);
        delay += 400;
      } else {
        // User message
        const t = setTimeout(() => setVisibleSteps(i + 1), delay);
        timeoutsRef.current.push(t);
        delay += 500;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isVisible && !hasAnimatedFirstTab.current) {
      hasAnimatedFirstTab.current = true;
      animateSteps(0);
    }
  }, [isVisible, animateSteps]);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    animateSteps(i);
  };

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-[#de1b23]/70 uppercase font-mono mb-3">{t("chatDemo", "sectionLabel")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            {t("chatDemo", "sectionTitle")}<span className="text-[#de1b23]">{t("chatDemo", "sectionTitleHighlight")}</span>
          </h2>
        </div>

        {/* Tabs with icons */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => handleTabClick(i)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === i
                  ? "bg-[#de1b23]/10 text-[#de1b23]"
                  : "text-[#949aa0] hover:text-[#1a1a2e] hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chat Mock */}
        <div
          ref={ref}
          className={`bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Light Chat Header */}
          <div className="border-b border-gray-100 relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#de1b23] via-[#ff6b6b] to-[#de1b23]" />
            <div className="px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-9 h-9 rounded-full shadow-sm" />
                <div>
                  <span className="text-sm font-semibold text-[#1a1a2e]" translate="no">Clawbibi</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-[#2e7d32]">
                    <span className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full status-pulse" />
                    {t("chatDemo", "online")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-[#949aa0] font-mono">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  {t("chatDemo", "encrypted")}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-6 space-y-3 min-h-[320px]">
            {tabs[activeTab].steps.map((step, i) => {
              const visible = i < visibleSteps;

              if (step.type === "user") {
                return (
                  <div
                    key={`${activeTab}-${i}`}
                    className={`flex items-end justify-end gap-2 transition-all duration-400 ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none h-0 overflow-hidden"
                    }`}
                  >
                    <div className={`bg-[#f0f4f8] rounded-2xl ${isRTL ? "rounded-tl-sm" : "rounded-tr-sm"} px-4 py-3 max-w-[75%]`}>
                      <p className="text-sm text-[#1a1a2e] leading-relaxed">{step.text}</p>
                    </div>
                    <div className="w-7 h-7 bg-[#e8eaed] rounded-full flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                );
              }

              if (step.type === "action") {
                return (
                  <div
                    key={`${activeTab}-${i}`}
                    className={`flex items-center gap-2 ${isRTL ? "pr-10" : "pl-10"} transition-all duration-500 ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    <span className="text-[11px] font-mono text-[#de1b23]">{step.text}</span>
                  </div>
                );
              }

              // Bot message
              return (
                <div
                  key={`${activeTab}-${i}`}
                  className={`flex items-start gap-2 transition-all duration-400 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none h-0 overflow-hidden"
                  }`}
                >
                  <img src="/clawbibi-logo.png" alt="" className="w-7 h-7 rounded-full shrink-0 mt-0.5" />
                  <div className={`bg-white border border-gray-100 rounded-2xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} px-4 py-3 shadow-sm max-w-[85%]`}>
                    {step.text && <p className="text-sm text-[#1a1a2e] leading-relaxed">{step.text}</p>}
                    {step.widget}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {showTyping && (
              <div className="flex items-start gap-2">
                <img src="/clawbibi-logo.png" alt="" className="w-7 h-7 rounded-full shrink-0" />
                <div className={`bg-white border border-gray-100 rounded-2xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} shadow-sm`}>
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-100 px-6 py-3.5 flex items-center gap-3">
            <div className="flex-1 bg-[#f6f9fa] rounded-xl px-4 py-2.5 text-sm text-[#949aa0]">
              {t("chatDemo", "typeMessage")}
            </div>
            <div className="w-9 h-9 bg-[#de1b23] rounded-xl flex items-center justify-center hover:bg-[#c41820] transition-colors cursor-pointer shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// macOS Window Chrome
function MacChrome() {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      <span className="w-2 h-2 bg-[#de1b23] rounded-full" />
      <span className="w-2 h-2 bg-[#f59e0b] rounded-full" />
      <span className="w-2 h-2 bg-[#2e7d32] rounded-full" />
    </div>
  );
}

// Card 1: Any Messenger
function MessengerCard({ isVisible }: { isVisible: boolean }) {
  const { t } = useLanguage();
  const [connected, setConnected] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;
    const platforms = 6;
    for (let i = 0; i < platforms; i++) {
      const t = setTimeout(() => setConnected(i + 1), 600 + i * 400);
      currentTimeouts.push(t);
    }
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible]);

  const platforms = [
    { name: "WhatsApp", img: "whatsapp" },
    { name: "Telegram", img: "telegram" },
    { name: "Discord", img: "discord" },
    { name: "Slack", img: "slack" },
    { name: "Signal", img: null, svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a76f0" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
    { name: "iMessage", img: null, svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="#34C759"><path d="M12 2C6.48 2 2 5.87 2 10.5c0 2.68 1.47 5.08 3.78 6.67-.2 1.97-1.07 3.27-1.09 3.3a.5.5 0 00.44.76c2.51-.08 4.35-1.28 5.14-1.87.56.09 1.14.14 1.73.14 5.52 0 10-3.87 10-8.5S17.52 2 12 2z"/></svg> },
  ];

  return (
    <div className="bg-[#f6f9fa] rounded-xl p-4 flex-1">
      <MacChrome />
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-2 bg-white rounded-lg px-3 py-2 border transition-all duration-500 ${
              i < connected ? "border-[#2e7d32]/20" : "border-gray-100"
            }`}
          >
            {p.img ? (
              <img src={`https://clawi.ai/_next/image?url=%2Flogos%2Fai%2F${p.img}.png&w=32&q=75`} alt={p.name} className="h-4 w-auto object-contain" />
            ) : (
              p.svg
            )}
            <span className="text-xs font-medium text-[#1a1a2e]">{p.name}</span>
            {i < connected && (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#2e7d32" className="ml-auto shrink-0"><path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/></svg>
            )}
          </div>
        ))}
      </div>
      <div className={`text-center mt-3 text-[10px] font-medium text-[#2e7d32] transition-all duration-500 ${connected >= 6 ? "opacity-100" : "opacity-0"}`}>
        {t("features", "allPlatformsLinked")}
      </div>
    </div>
  );
}

// Card 2: Privacy First
function PrivacyCard({ isVisible }: { isVisible: boolean }) {
  const { t, isRTL } = useLanguage();
  const [phase, setPhase] = useState(0); // 0=nothing, 1=blur shown, 2=lock, 3=rows appearing, 4=done
  const [visibleRows, setVisibleRows] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = t("features", "privacyMessage");
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;

    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1600);

    // Staggered rows
    for (let i = 0; i < 3; i++) {
      const t = setTimeout(() => setVisibleRows(i + 1), 1800 + i * 400);
      currentTimeouts.push(t);
    }

    // Type text
    const t4 = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setTypedText(fullText.slice(0, idx));
        if (idx >= fullText.length) {
          clearInterval(interval);
          setPhase(4);
        }
      }, 25);
      currentTimeouts.push(interval as unknown as NodeJS.Timeout);
    }, 3200);

    currentTimeouts.push(t1, t2, t3, t4);
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible, fullText]);

  const rows = [
    { label: t("features", "privacyLogging"), value: t("features", "privacyLoggingVal") },
    { label: t("features", "privacySharing"), value: t("features", "privacySharingVal") },
    { label: t("features", "privacyEncryption"), value: t("features", "privacyEncryptionVal") },
  ];

  return (
    <div className="bg-[#f6f9fa] rounded-xl p-4 flex-1">
      <MacChrome />
      {/* Blurred chat preview */}
      <div className={`space-y-2 mb-4 transition-all duration-700 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex justify-end">
          <div className={`bg-[#de1b23]/5 rounded-xl ${isRTL ? "rounded-tl-sm" : "rounded-tr-sm"} px-3 py-2 max-w-[75%]`} style={{ filter: "blur(4px)" }}>
            <span className="text-xs text-[#1a1a2e]">Cancel my subscription and check</span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className={`bg-white border border-gray-100 rounded-xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} px-3 py-2 max-w-[75%]`} style={{ filter: "blur(4px)" }}>
            <span className="text-xs text-[#1a1a2e]">Done! I have cancelled your Equinox</span>
          </div>
        </div>
      </div>

      {/* Lock icon */}
      <div className={`flex justify-center mb-3 transition-all duration-500 ${phase >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
        <div className="w-8 h-8 bg-[#de1b23]/10 rounded-full flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        </div>
      </div>

      {/* Privacy rows */}
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100 transition-all duration-500 ${
              i < visibleRows ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <span className="text-[11px] text-[#1a1a2e]">{row.label}</span>
            </div>
            <span className="text-[10px] font-semibold font-mono text-[#1a1a2e]">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Typed message */}
      {phase >= 3 && typedText && (
        <p className="text-[10px] text-[#949aa0] text-center mt-3 leading-relaxed">
          {typedText}{phase < 4 && <span className="terminal-cursor ml-0.5">|</span>}
        </p>
      )}
    </div>
  );
}

// Card 3: Persistent Memory
function MemoryCard({ isVisible }: { isVisible: boolean }) {
  const { t, isRTL } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;
    for (let i = 0; i < 4; i++) {
      const t = setTimeout(() => setVisibleItems(i + 1), 600 + i * 500);
      currentTimeouts.push(t);
    }
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible]);

  const items = [
    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, label: t("features", "memoryItem1") },
    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, label: t("features", "memoryItem2") },
    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: t("features", "memoryItem3") },
    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: t("features", "memoryItem4") },
  ];

  return (
    <div className="bg-[#f6f9fa] rounded-xl p-4 flex-1">
      <MacChrome />
      <span className="text-[10px] font-semibold tracking-wider text-[#949aa0] uppercase block mb-3 font-mono">{t("features", "memoryLabel")}</span>
      <div className={`relative ${isRTL ? "pr-4" : "pl-4"}`}>
        {/* Timeline line */}
        <div
          className={`absolute ${isRTL ? "right-[5px]" : "left-[5px]"} top-1 w-0.5 bg-[#de1b23]/20 rounded-full transition-all duration-1000 ease-out`}
          style={{ height: visibleItems > 0 ? `${Math.min(visibleItems * 25, 95)}%` : "0%" }}
        />
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative flex items-start gap-3 transition-all duration-500 ${
                i < visibleItems ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute ${isRTL ? "-right-4" : "-left-4"} top-1.5 w-2.5 h-2.5 bg-[#de1b23] rounded-full border-2 border-[#f6f9fa] z-10`} />
              <div className={`bg-white rounded-lg px-3 py-2 ${isRTL ? "border-r-2" : "border-l-2"} border-[#de1b23] flex items-center gap-2 flex-1`}>
                {item.icon}
                <span className="text-[11px] text-[#1a1a2e]">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Card 4: System Access
function SystemAccessCard({ isVisible }: { isVisible: boolean }) {
  const { t, locale } = useLanguage();
  const [phase, setPhase] = useState(0); // 0-5
  const [barWidths, setBarWidths] = useState([0, 0, 0]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;

    const t1 = setTimeout(() => setPhase(1), 500);   // action 1
    const t2 = setTimeout(() => setPhase(2), 1400);  // action 2
    const t3 = setTimeout(() => {
      setPhase(3); // chart
      setTimeout(() => setBarWidths([70, 35, 25]), 100);
    }, 2300);
    const t4 = setTimeout(() => setPhase(4), 3500);  // buttons

    currentTimeouts.push(t1, t2, t3, t4);
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible]);

  const categories = [
    { labelDisplay: locale === "ar" ? t("features", "systemDining") : `\u0645\u0637\u0627\u0639\u0645 (${t("features", "systemDining")})`, amount: "AED 3,200", width: barWidths[0] },
    { labelDisplay: locale === "ar" ? t("features", "systemTransport") : `\u0645\u0648\u0627\u0635\u0644\u0627\u062A (${t("features", "systemTransport")})`, amount: "AED 1,100", width: barWidths[1] },
    { labelDisplay: locale === "ar" ? t("features", "systemSubscriptions") : `\u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A (${t("features", "systemSubscriptions")})`, amount: "AED 800", width: barWidths[2] },
  ];

  return (
    <div className="bg-[#f6f9fa] rounded-xl p-4 flex-1">
      <MacChrome />

      {/* Action lines */}
      <div className="space-y-2 mb-3 min-h-[40px]">
        <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span className="text-[11px] font-mono text-[#de1b23]">{t("features", "systemAction1")}</span>
        </div>
        <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span className="text-[11px] font-mono text-[#de1b23]">{t("features", "systemAction2")}</span>
        </div>
      </div>

      {/* Chart */}
      <div className={`bg-white rounded-lg p-3 border border-gray-100 transition-all duration-500 ${phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-[#1a1a2e]">{t("features", "systemTopCategories")}</span>
          <span className="text-[10px] text-[#de1b23] font-medium cursor-pointer">{t("features", "systemViewReport")}</span>
        </div>
        <div className="space-y-2">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[10px] text-[#949aa0] w-24 shrink-0">{cat.labelDisplay}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#de1b23] to-[#ff6b6b] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${cat.width}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#1a1a2e] w-16 text-right shrink-0">{cat.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className={`flex items-center gap-2 mt-3 transition-all duration-500 ${phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        <button type="button" className="bg-[#de1b23] text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg">{t("features", "systemSendReport")}</button>
        <button type="button" className="bg-white border border-gray-200 text-[10px] font-medium text-[#1a1a2e] px-3 py-1.5 rounded-lg">{t("features", "systemDetails")}</button>
      </div>
    </div>
  );
}

// Card 5: Custom Skills
function SkillsCard({ isVisible }: { isVisible: boolean }) {
  const { t, isRTL } = useLanguage();
  const [visibleSkills, setVisibleSkills] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;
    for (let i = 0; i < 5; i++) {
      const t = setTimeout(() => setVisibleSkills(i + 1), 500 + i * 400);
      currentTimeouts.push(t);
    }
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible]);

  const skills = [
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, name: t("features", "skillPrayerTimes"), desc: t("features", "skillPrayerDesc") },
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, name: t("features", "skillCurrencyConvert"), desc: t("features", "skillCurrencyDesc") },
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>, name: t("features", "skillTravelPlanner"), desc: t("features", "skillTravelDesc") },
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>, name: t("features", "skillExpenseTracker"), desc: t("features", "skillExpenseDesc") },
  ];

  return (
    <div className="bg-[#f6f9fa] rounded-xl p-4 flex-1">
      <MacChrome />
      <span className="text-[10px] font-semibold tracking-wider text-[#949aa0] uppercase block mb-3 font-mono">{t("features", "skillsLabel")}</span>
      <div className="space-y-2">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`flex items-center gap-3 bg-white rounded-lg px-3 py-2.5 ${isRTL ? "border-r-2" : "border-l-2"} border-[#de1b23] ${isRTL ? "border-l" : "border-r"} border-t border-b ${isRTL ? "border-l-gray-100" : "border-r-gray-100"} border-t-gray-100 border-b-gray-100 transition-all duration-500 ${
              i < visibleSkills ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <div className="w-7 h-7 bg-[#de1b23]/10 rounded-lg flex items-center justify-center shrink-0">
              {skill.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold text-[#1a1a2e] block">{skill.name}</span>
              <span className="text-[10px] text-[#949aa0]">{skill.desc}</span>
            </div>
          </div>
        ))}

        {/* Add skill card */}
        <div className={`flex items-center justify-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-dashed border-gray-300 cursor-pointer hover:border-[#de1b23]/30 transition-all duration-500 ${
          visibleSkills >= 5 ? "opacity-60 translate-x-0" : "opacity-0 -translate-x-4"
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#949aa0" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          <span className="text-[11px] text-[#949aa0]">{t("features", "skillAddNew")}</span>
        </div>
      </div>
    </div>
  );
}

// Card 6: Web Search
function WebSearchCard({ isVisible }: { isVisible: boolean }) {
  const { t, isRTL } = useLanguage();
  const [phase, setPhase] = useState(0); // 0=nothing, 1=user bubble, 2=searching action, 3=typing dots, 4=results
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    const currentTimeouts = timeoutsRef.current;

    const t1 = setTimeout(() => setPhase(1), 500);   // user bubble
    const t2 = setTimeout(() => setPhase(2), 1200);  // searching action
    const t3 = setTimeout(() => setPhase(3), 2200);  // typing dots
    const t4 = setTimeout(() => setPhase(4), 3200);  // results

    currentTimeouts.push(t1, t2, t3, t4);
    return () => currentTimeouts.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div className="bg-[#f6f9fa] rounded-xl p-4 flex-1">
      <MacChrome />
      <div className="space-y-2.5 min-h-[160px]">
        {/* User bubble */}
        <div className={`flex justify-end transition-all duration-500 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className={`bg-[#de1b23]/5 rounded-xl ${isRTL ? "rounded-tl-sm" : "rounded-tr-sm"} px-3 py-2 max-w-[85%]`}>
            <p className="text-[11px] text-[#1a1a2e] leading-relaxed" dir="rtl">وين أحسن مطعم كبسة في الرياض؟</p>
          </div>
        </div>

        {/* Searching action */}
        <div className={`flex items-center gap-2 transition-all duration-500 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span className="text-[11px] font-mono text-[#de1b23]">{t("features", "webSearchAction")}</span>
        </div>

        {/* Typing dots */}
        {phase === 3 && (
          <div className="flex justify-start">
            <div className={`bg-white border border-gray-100 rounded-xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} shadow-sm`}>
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Results */}
        <div className={`transition-all duration-500 ${phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <div className={`bg-white border border-gray-100 rounded-xl ${isRTL ? "rounded-tr-sm" : "rounded-tl-sm"} px-3 py-2.5 shadow-sm`}>
            <div className="flex items-center gap-1.5 mb-2">
              <img src="/clawbibi-logo.png" alt="" className="w-5 h-5 rounded-full" />
              <span className="text-[10px] text-[#949aa0]" translate="no">Clawbibi</span>
            </div>
            <div className="space-y-1.5">
              <div className="bg-[#f6f9fa] rounded-lg px-2.5 py-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-[#1a1a2e]" dir="rtl">نجد فيليج — حي العليا</span>
                </div>
                <span className="text-[10px] text-[#f59e0b] font-medium">★ 4.9</span>
              </div>
              <div className="bg-[#f6f9fa] rounded-lg px-2.5 py-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-[#1a1a2e]" dir="rtl">مطعم الرومانسية — طريق الملك فهد</span>
                </div>
                <span className="text-[10px] text-[#f59e0b] font-medium">★ 4.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Features Section
function FeaturesSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView(0.05);

  const cards = [
    {
      component: MessengerCard,
      title: t("features", "anyMessengerTitle"),
      sub: t("features", "anyMessengerSub"),
      delay: "delay-0",
    },
    {
      component: PrivacyCard,
      title: t("features", "privacyTitle"),
      sub: t("features", "privacySub"),
      delay: "delay-100",
    },
    {
      component: MemoryCard,
      title: t("features", "memoryTitle"),
      sub: t("features", "memorySub"),
      delay: "delay-200",
    },
    {
      component: SystemAccessCard,
      title: t("features", "systemTitle"),
      sub: t("features", "systemSub"),
      delay: "delay-0",
    },
    {
      component: SkillsCard,
      title: t("features", "skillsTitle"),
      sub: t("features", "skillsSub"),
      delay: "delay-100",
    },
    {
      component: WebSearchCard,
      title: t("features", "webSearchTitle"),
      sub: t("features", "webSearchSub"),
      delay: "delay-200",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-[#de1b23]/70 uppercase font-mono mb-3">{t("features", "sectionLabel")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            {t("features", "sectionTitle")}<span className="text-[#de1b23]">{t("features", "sectionTitleHighlight")}</span>
          </h2>
          <p className="text-sm text-[#949aa0] mt-3">{t("features", "sectionSubtitle")}</p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-5">
          {cards.map((card) => {
            const CardComponent = card.component;
            return (
              <div
                key={card.title}
                className={`bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col transition-all duration-700 ${card.delay} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardComponent isVisible={isVisible} />
                <h3 className="text-lg font-semibold text-[#1a1a2e] mt-5 mb-1">{card.title}</h3>
                <p className="text-sm text-[#949aa0] leading-relaxed">{card.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Marquee Capabilities Section
function CapabilitiesSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isVisible } = useInView(0.1);

  // SVG icon paths (small, clean line icons)
  const icons = {
    translate: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2v3"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>,
    inbox: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
    chat: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    doc: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
    chart: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
    search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    pen: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    calendar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
    receipt: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M8 10h8"/><path d="M8 14h4"/></svg>,
    shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    bell: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    moon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    dollar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    book: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
    heart: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    tag: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1"/></svg>,
    globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    plane: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
    star: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    gift: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 010-5A4.8 4.8 0 0112 8a4.8 4.8 0 014.5-5 2.5 2.5 0 010 5"/></svg>,
    map: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    car: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,
    target: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    mail: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
    box: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg>,
    home: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#de1b23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  };

  const rows = [
    [
      { icon: icons.translate, text: t("capabilities", "translate") },
      { icon: icons.inbox, text: t("capabilities", "inbox") },
      { icon: icons.chat, text: t("capabilities", "support") },
      { icon: icons.doc, text: t("capabilities", "summarize") },
      { icon: icons.chart, text: t("capabilities", "reports") },
      { icon: icons.search, text: t("capabilities", "research") },
      { icon: icons.pen, text: t("capabilities", "draft") },
      { icon: icons.calendar, text: t("capabilities", "calendar") },
    ],
    [
      { icon: icons.receipt, text: t("capabilities", "expenses") },
      { icon: icons.shield, text: t("capabilities", "insurance") },
      { icon: icons.bell, text: t("capabilities", "subscriptions") },
      { icon: icons.moon, text: t("capabilities", "prayer") },
      { icon: icons.dollar, text: t("capabilities", "currency") },
      { icon: icons.check, text: t("capabilities", "todo") },
      { icon: icons.book, text: t("capabilities", "homework") },
      { icon: icons.heart, text: t("capabilities", "clinics") },
    ],
    [
      { icon: icons.tag, text: t("capabilities", "discounts") },
      { icon: icons.chart, text: t("capabilities", "priceDrop") },
      { icon: icons.search, text: t("capabilities", "compare") },
      { icon: icons.users, text: t("capabilities", "negotiate") },
      { icon: icons.check, text: t("capabilities", "grocery") },
      { icon: icons.star, text: t("capabilities", "rate") },
      { icon: icons.gift, text: t("capabilities", "gifts") },
      { icon: icons.map, text: t("capabilities", "stores") },
    ],
    [
      { icon: icons.plane, text: t("capabilities", "travel") },
      { icon: icons.globe, text: t("capabilities", "recipes") },
      { icon: icons.doc, text: t("capabilities", "presentations") },
      { icon: icons.car, text: t("capabilities", "rides") },
      { icon: icons.target, text: t("capabilities", "workout") },
      { icon: icons.inbox, text: t("capabilities", "news") },
      { icon: icons.star, text: t("capabilities", "movies") },
      { icon: icons.map, text: t("capabilities", "itineraries") },
    ],
    [
      { icon: icons.target, text: t("capabilities", "goals") },
      { icon: icons.mail, text: t("capabilities", "outreach") },
      { icon: icons.pen, text: t("capabilities", "jobDescs") },
      { icon: icons.chart, text: t("capabilities", "standup") },
      { icon: icons.home, text: t("capabilities", "home") },
      { icon: icons.heart, text: t("capabilities", "parenting") },
      { icon: icons.star, text: t("capabilities", "design") },
      { icon: icons.box, text: t("capabilities", "packages") },
    ],
  ];

  return (
    <section className="py-24 overflow-hidden bg-[#fef2f2]">
      <div className={`text-center mb-16 px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} ref={ref}>
        <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-[#de1b23]/70 uppercase font-mono mb-3">{t("capabilities", "sectionLabel")}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
          {t("capabilities", "sectionTitle")}<span className="text-[#de1b23]">{t("capabilities", "sectionTitleHighlight")}</span>
        </h2>
        <p className="text-sm text-[#949aa0] mt-3">{t("capabilities", "sectionSubtitle")}</p>
      </div>

      <div className="space-y-3">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className={`flex gap-3 w-max ${rowIdx % 2 === 0 ? (isRTL ? "marquee-right" : "marquee-left") : (isRTL ? "marquee-left" : "marquee-right")}`}>
              {[...row, ...row].map((item, i) => (
                <div
                  key={`${rowIdx}-${i}`}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200/60 rounded-full px-4 py-2.5 text-sm text-[#1a1a2e] whitespace-nowrap hover:border-[#de1b23]/20 hover:shadow-sm transition-all duration-200 cursor-default"
                >
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("faq", "q1"), a: t("faq", "a1") },
    { q: t("faq", "q2"), a: t("faq", "a2") },
    { q: t("faq", "q3"), a: t("faq", "a3") },
    { q: t("faq", "q4"), a: t("faq", "a4") },
    { q: t("faq", "q5"), a: t("faq", "a5") },
  ];

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-[#de1b23]/70 uppercase font-mono mb-3">{t("faq", "sectionLabel")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            {t("faq", "sectionTitle")}<span className="text-[#de1b23]">{t("faq", "sectionTitleHighlight")}</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200/80 overflow-hidden transition-all duration-200 hover:border-[#de1b23]/20"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-4 ${isRTL ? "text-right" : "text-left"}`}
              >
                <span className={`text-sm font-semibold text-[#1a1a2e] ${isRTL ? "pl-4" : "pr-4"}`}>{faq.q}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#949aa0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="accordion-content"
                style={{ maxHeight: openIndex === i ? "300px" : "0px" }}
              >
                <p className="px-6 pb-4 text-sm text-[#949aa0] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA
function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto relative rounded-3xl bg-[#f6f9fa] border border-gray-100 py-20 px-8">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src="/clawbibi-bg.png" alt="" className="w-[400px] opacity-20" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            {t("cta", "title")}<span className="text-[#de1b23]">{t("cta", "titleBrand")}</span>{t("cta", "titleEnd")}
          </h2>
          <p className="text-[#949aa0] leading-relaxed max-w-lg mx-auto flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
            {t("cta", "subtitle")}
          </p>
          <div className="pt-2">
            <Link href="/login" className="inline-flex items-center gap-2 bg-[#de1b23] text-white font-semibold px-10 py-4 rounded-full uppercase text-sm tracking-wider hover:bg-[#c41820] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#de1b23]/20 hover:shadow-xl hover:shadow-[#de1b23]/30">
              {t("cta", "button")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-14 px-6">
      <div className="max-w-md mx-auto text-center space-y-5">
        <div className="flex items-center justify-center gap-1.5">
          <img src="/clawbibi-logo.png" alt="Clawbibi" className="w-9 h-9" />
          <span className="font-bold text-xl" translate="no">claw<span className="text-[#de1b23]">bibi</span></span>
        </div>

        <p className="text-sm text-[#949aa0] leading-relaxed">
          {t("footer", "description")}
        </p>

        <div className="flex items-center justify-center gap-5">
          {/* X / Twitter */}
          <a href="#" className="text-[#949aa0] hover:text-[#de1b23] transition-colors">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z"/>
            </svg>
          </a>
          {/* GitHub */}
          <a href="#" className="text-[#949aa0] hover:text-[#de1b23] transition-colors">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="text-[#949aa0] hover:text-[#de1b23] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-[#949aa0]">
          <a href="/privacy" className="hover:text-[#de1b23] transition-colors">{t("footer", "privacy")}</a>
          <span>&middot;</span>
          <a href="/terms" className="hover:text-[#de1b23] transition-colors">{t("footer", "terms")}</a>
          <span>&middot;</span>
          <a href="/refund" className="hover:text-[#de1b23] transition-colors">Refund</a>
          <span>&middot;</span>
          <a href="/pricing" className="hover:text-[#de1b23] transition-colors">Pricing</a>
          <span>&middot;</span>
          <span>{t("footer", "copyright")}</span>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <hr className="border-t border-gray-200/60 mx-6" />
      <HowItWorksSection />
      <hr className="border-t border-gray-200/60 mx-6" />
      <ChatDemoSection />
      <hr className="border-t border-gray-200/60 mx-6" />
      <FeaturesSection />
      <CapabilitiesSection />
      <hr className="border-t border-gray-200/60 mx-6" />
      <FAQSection />
      <hr className="border-t border-gray-200/60 mx-6" />
      <CTASection />
      <hr className="border-t border-gray-200/60 mx-6" />
      <Footer />
    </main>
  );
}
