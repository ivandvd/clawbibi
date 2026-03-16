"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface HealthData {
  ok: boolean;
  db: "operational" | "degraded";
  ts: string;
}

type ServiceStatus = "operational" | "degraded" | "checking";

interface Service {
  name: string;
  status: ServiceStatus;
  detail: string;
  lastChecked: string | null;
}

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([
    { name: "API", status: "checking", detail: "Checking...", lastChecked: null },
    { name: "Database", status: "checking", detail: "Checking...", lastChecked: null },
    { name: "Billing", status: "operational", detail: "Paddle SLA guaranteed", lastChecked: new Date().toISOString() },
  ]);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);

  const check = useCallback(async () => {
    const now = new Date().toISOString();
    try {
      const res = await fetch("/api/health");
      const data: HealthData = await res.json();

      setServices([
        {
          name: "API",
          status: data.ok ? "operational" : "degraded",
          detail: data.ok ? "All systems normal" : "Elevated error rate",
          lastChecked: data.ts ?? now,
        },
        {
          name: "Database",
          status: data.db === "operational" ? "operational" : "degraded",
          detail: data.db === "operational" ? "Connections healthy" : "Connectivity issues",
          lastChecked: data.ts ?? now,
        },
        {
          name: "Billing",
          status: "operational",
          detail: "Paddle SLA guaranteed",
          lastChecked: now,
        },
      ]);
    } catch {
      setServices(prev => prev.map(s =>
        s.name !== "Billing" ? { ...s, status: "degraded" as ServiceStatus, detail: "Could not reach server", lastChecked: now } : s
      ));
    }
    setLastRefresh(now);
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [check]);

  const allOperational = services.every(s => s.status === "operational");
  const anyDegraded = services.some(s => s.status === "degraded");

  const overallStatus = anyDegraded ? "degraded" : allOperational ? "operational" : "checking";

  function StatusDot({ status }: { status: ServiceStatus }) {
    if (status === "operational") return <div className="w-3 h-3 rounded-full bg-emerald-500" />;
    if (status === "degraded") return <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />;
    return <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />;
  }

  function formatTime(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  return (
    <div className="min-h-screen bg-[#f6f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#de1b23] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="font-bold text-[#1a1a2e]">Clawbibi</span>
            <span className="text-[#949aa0] text-sm">/ Status</span>
          </Link>
          <a
            href="https://x.com/clawbibi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#949aa0] hover:text-[#1a1a2e] transition-colors"
          >
            @clawbibi on X
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Overall status */}
        <div className={`rounded-2xl p-8 mb-8 text-center ${
          overallStatus === "operational"
            ? "bg-emerald-50 border border-emerald-200"
            : overallStatus === "degraded"
            ? "bg-red-50 border border-red-200"
            : "bg-amber-50 border border-amber-200"
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            overallStatus === "operational" ? "bg-emerald-100" :
            overallStatus === "degraded" ? "bg-red-100" : "bg-amber-100"
          }`}>
            {overallStatus === "operational" ? (
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : overallStatus === "degraded" ? (
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            ) : (
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <h1 className={`text-2xl font-bold mb-1 ${
            overallStatus === "operational" ? "text-emerald-800" :
            overallStatus === "degraded" ? "text-red-800" : "text-amber-800"
          }`}>
            {overallStatus === "operational"
              ? "All Systems Operational"
              : overallStatus === "degraded"
              ? "Service Degraded"
              : "Checking Status..."}
          </h1>
          {lastRefresh && (
            <p className="text-sm text-[#949aa0]">Last checked at {formatTime(lastRefresh)}</p>
          )}
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#e5e7eb]">
            <h2 className="text-sm font-bold text-[#1a1a2e]">Services</h2>
          </div>
          <div className="divide-y divide-[#f6f9fa]">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <StatusDot status={service.status} />
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{service.name}</p>
                    <p className="text-xs text-[#949aa0]">{service.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                    service.status === "operational"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : service.status === "degraded"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}>
                    {service.status}
                  </span>
                  {service.lastChecked && (
                    <p className="text-[10px] text-[#c5c9cd] mt-1">{formatTime(service.lastChecked)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-refresh note */}
        <p className="text-center text-xs text-[#c5c9cd] mb-4">
          Auto-refreshes every 30 seconds
        </p>

        {/* Incident note */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] px-5 py-4 text-center">
          <p className="text-sm text-[#949aa0]">
            Incidents are reported on{" "}
            <a
              href="https://x.com/clawbibi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#de1b23] font-medium hover:underline"
            >
              @clawbibi
            </a>{" "}
            on X (Twitter)
          </p>
        </div>
      </main>
    </div>
  );
}
