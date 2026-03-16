"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentData {
  id: string;
  name: string;
  model: string;
  status: string;
  subdomain?: string;
}

interface GatewayStatus {
  status: "online" | "offline" | "error";
  version?: string;
  uptime?: string;
  avgResponseMs?: number;
  memoryMb?: number;
  memoryLimitMb?: number;
}

interface Channel {
  platform: string;
  status: string;
  connected_at?: string;
}

interface PairingRequest {
  id?: string;
  platform: string;
  identifier: string;
  requestedAt?: string;
}

interface Skill {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

interface ActivityEntry {
  id: string;
  platform: string;
  sender: string;
  direction: "in" | "out";
  content: string;
  timestamp: string;
}

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: "telegram", name: "Telegram", color: "#0088cc", difficulty: "easy",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
  },
  {
    id: "whatsapp", name: "WhatsApp", color: "#25d366", difficulty: "medium",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  },
  {
    id: "discord", name: "Discord", color: "#5865f2", difficulty: "medium",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" /></svg>,
  },
  {
    id: "signal", name: "Signal", color: "#3a76f0", difficulty: "hard",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 110 16A8 8 0 0112 4zm-1 11l-4-4 1.414-1.414L11 12.172l6.586-6.586L19 7l-8 8z" /></svg>,
  },
  {
    id: "slack", name: "Slack", color: "#e01e5a", difficulty: "medium",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.526 2.526 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" /></svg>,
  },
];

const MODEL_SHORT: Record<string, string> = {
  "claude-4.5": "Claude 4.5",
  "claude-opus": "Claude Opus",
  "gpt-4o": "GPT-4o",
  "gemini-2.5": "Gemini 2.5",
};

function timeAgo(ts: string): string {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Connect Forms ────────────────────────────────────────────────────────────

function TelegramForm({ agentId, onDone }: { agentId: string; onDone: () => void }) {
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!token.trim()) return;
    setSaving(true);
    await fetch(`/api/agents/${agentId}/channels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "telegram", token }),
    });
    setSaving(false);
    onDone();
  }

  return (
    <div className="mt-2 bg-white rounded-2xl border border-[#0088cc]/20 p-5 animate-fade-up">
      <ol className="space-y-2 text-xs text-[#4a4a5a] mb-4">
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">1</span>Message <strong>@BotFather</strong> on Telegram</li>
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">2</span>Send <code className="bg-[#f6f9fa] px-1 rounded font-mono">/newbot</code> and follow the prompts</li>
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">3</span>Paste the bot token below</li>
      </ol>
      <input
        type="text" value={token} onChange={e => setToken(e.target.value)}
        placeholder="123456789:ABCDef..."
        className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] font-mono"
        dir="ltr"
      />
      <button
        onClick={submit} disabled={!token.trim() || saving}
        className="mt-2.5 w-full py-2.5 rounded-xl bg-[#0088cc] text-white text-sm font-semibold hover:bg-[#006da3] hover:shadow-lg hover:shadow-[#0088cc]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Connecting..." : "Connect Telegram"}
      </button>
    </div>
  );
}

function DiscordForm({ agentId, onDone }: { agentId: string; onDone: () => void }) {
  const [token, setToken] = useState("");
  const [serverId, setServerId] = useState("");
  const [userId, setUserId] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!token.trim()) return;
    setSaving(true);
    await fetch(`/api/agents/${agentId}/channels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "discord", token, config: { serverId, userId } }),
    });
    setSaving(false);
    onDone();
  }

  return (
    <div className="mt-2 bg-white rounded-2xl border border-[#5865f2]/20 p-5 animate-fade-up">
      <ol className="space-y-2 text-xs text-[#4a4a5a] mb-4">
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">1</span>Create an app at <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="text-[#5865f2] underline">discord.com/developers</a></li>
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">2</span>Bot tab → Add Bot → enable <strong>Message Content Intent</strong></li>
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">3</span>Copy the bot token, your Server ID and User ID</li>
      </ol>
      <div className="space-y-2">
        <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Bot Token (MTxxxxxx...)" className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#5865f2]/20 focus:border-[#5865f2] font-mono" dir="ltr" />
        <input type="text" value={serverId} onChange={e => setServerId(e.target.value)} placeholder="Server ID" className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#5865f2]/20 focus:border-[#5865f2] font-mono" dir="ltr" />
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Your User ID" className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#5865f2]/20 focus:border-[#5865f2] font-mono" dir="ltr" />
      </div>
      <button onClick={submit} disabled={!token.trim() || saving} className="mt-2.5 w-full py-2.5 rounded-xl bg-[#5865f2] text-white text-sm font-semibold hover:bg-[#4752c4] hover:shadow-lg hover:shadow-[#5865f2]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        {saving ? "Connecting..." : "Connect Discord"}
      </button>
    </div>
  );
}

function WhatsAppForm({ agentId, agentRunning, onDone }: { agentId: string; agentRunning: boolean; onDone: () => void }) {
  const [step, setStep] = useState<"idle" | "starting" | "waiting" | "connected">("idle");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopPoll() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  useEffect(() => () => stopPoll(), []);

  async function start() {
    if (!agentRunning) return;
    setStep("starting");
    setQrDataUrl(null);
    try {
      await fetch(`/api/agents/${agentId}/channels/whatsapp/start`, { method: "POST" });
    } catch { /* daemon starts anyway */ }
    setStep("waiting");
    // Poll every 3 seconds for QR or connection status
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/agents/${agentId}/channels/whatsapp/qr`);
        const data = await res.json();
        if (data.status === "qr" && data.dataUrl) {
          setQrDataUrl(data.dataUrl);
        } else if (data.status === "connected") {
          stopPoll();
          setStep("connected");
          // Record the connected channel in DB then notify parent
          await fetch(`/api/agents/${agentId}/channels`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ platform: "whatsapp", config: { status: "connected" } }),
          });
          setTimeout(() => onDone(), 2000);
        }
      } catch { /* ignore transient errors */ }
    }, 3000);
  }

  return (
    <div className="mt-2 bg-white rounded-2xl border border-[#25d366]/20 p-5 animate-fade-up">
      <p className="text-xs text-[#949aa0] mb-3">Works like WhatsApp Web — scan a QR code to link your account. No API key needed.</p>

      {step === "idle" && (
        <>
          {!agentRunning ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800">
              <strong>Agent must be running</strong> to connect WhatsApp. Your agent will be ready in a few minutes.
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800">
              <strong>Note:</strong> Your WhatsApp account will be linked to this agent. You can still use WhatsApp normally on your phone.
            </div>
          )}
          <button
            onClick={start}
            disabled={!agentRunning}
            className="w-full py-2.5 rounded-xl bg-[#25d366] text-white text-sm font-semibold hover:bg-[#1da851] hover:shadow-lg hover:shadow-[#25d366]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Generate QR Code
          </button>
        </>
      )}

      {step === "starting" && (
        <div className="text-center py-6">
          <div className="w-6 h-6 border-2 border-[#25d366] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-[#949aa0]">Starting WhatsApp pairing...</p>
        </div>
      )}

      {step === "waiting" && (
        <div className="text-center">
          {qrDataUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="WhatsApp QR Code" className="w-52 h-52 mx-auto rounded-2xl border border-[#e5e7eb] mb-3 shadow-sm" />
              <p className="text-xs font-medium text-[#1a1a2e] mb-1">Scan with WhatsApp</p>
              <p className="text-[11px] text-[#949aa0]">Open WhatsApp → Linked Devices → Link a Device</p>
            </>
          ) : (
            <div className="py-4">
              <div className="w-36 h-36 mx-auto bg-[#f6f9fa] rounded-2xl border-2 border-dashed border-[#e5e7eb] flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-[#25d366] border-t-transparent rounded-full animate-spin mx-auto mb-1.5" />
                  <p className="text-[10px] text-[#949aa0]">Installing...</p>
                </div>
              </div>
              <p className="text-xs text-[#949aa0]">Setting up WhatsApp (first time may take ~1 min)</p>
            </div>
          )}
        </div>
      )}

      {step === "connected" && (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-bold text-[#1a1a2e]">WhatsApp Connected!</p>
          <p className="text-xs text-[#949aa0] mt-1">Your WhatsApp account is now linked to this agent.</p>
        </div>
      )}
    </div>
  );
}

function SignalForm({ agentId, onDone }: { agentId: string; onDone: () => void }) {
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!phone.trim()) return;
    setSaving(true);
    await fetch(`/api/agents/${agentId}/channels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "signal", config: { phone } }),
    });
    setSaving(false);
    onDone();
  }

  return (
    <div className="mt-2 bg-white rounded-2xl border border-[#3a76f0]/20 p-5 animate-fade-up">
      <p className="text-xs text-[#949aa0] mb-3">Requires a dedicated phone number for the bot (SIM card or VoIP).</p>
      <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-xs text-red-700">
        <strong>Note:</strong> Signal requires a separate number — not your personal account. A VoIP number works (e.g. Google Voice, Twilio).
      </div>
      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 123 4567" className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#3a76f0]/20 focus:border-[#3a76f0]" dir="ltr" />
      <button onClick={submit} disabled={!phone.trim() || saving} className="mt-2.5 w-full py-2.5 rounded-xl bg-[#3a76f0] text-white text-sm font-semibold hover:bg-[#2d5fcb] hover:shadow-lg hover:shadow-[#3a76f0]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        {saving ? "Registering..." : "Register Signal Number"}
      </button>
    </div>
  );
}

function SlackForm({ agentId, onDone }: { agentId: string; onDone: () => void }) {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!token.trim()) return;
    setSaving(true);
    await fetch(`/api/agents/${agentId}/channels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "slack", token, config: { signingSecret: secret } }),
    });
    setSaving(false);
    onDone();
  }

  return (
    <div className="mt-2 bg-white rounded-2xl border border-[#e01e5a]/20 p-5 animate-fade-up">
      <ol className="space-y-2 text-xs text-[#4a4a5a] mb-4">
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">1</span>Create an app at <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer" className="text-[#e01e5a] underline">api.slack.com/apps</a></li>
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">2</span>OAuth & Permissions → add scopes: <code className="bg-[#f6f9fa] px-1 rounded font-mono text-[10px]">chat:write im:history im:read</code></li>
        <li className="flex gap-2"><span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#de1b23] text-white flex items-center justify-center font-bold text-[9px]">3</span>Install to workspace, copy the Bot Token and Signing Secret</li>
      </ol>
      <div className="space-y-2">
        <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Bot Token (xoxb-...)" className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#e01e5a]/20 focus:border-[#e01e5a] font-mono" dir="ltr" />
        <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Signing Secret" className="w-full px-3 py-2.5 rounded-xl border border-[#e5e7eb] bg-[#f6f9fa] text-sm placeholder:text-[#c5c9cd] focus:outline-none focus:ring-2 focus:ring-[#e01e5a]/20 focus:border-[#e01e5a] font-mono" dir="ltr" />
      </div>
      <button onClick={submit} disabled={!token.trim() || saving} className="mt-2.5 w-full py-2.5 rounded-xl bg-[#e01e5a] text-white text-sm font-semibold hover:bg-[#c01a4e] hover:shadow-lg hover:shadow-[#e01e5a]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        {saving ? "Connecting..." : "Connect Slack"}
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GatewayPage() {
  const { isRTL } = useLanguage();
  const params = useParams();
  const agentId = params.id as string;

  const [agent, setAgent] = useState<AgentData | null>(null);
  const [gateway, setGateway] = useState<GatewayStatus | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [pairings, setPairings] = useState<PairingRequest[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [togglingSkill, setTogglingSkill] = useState<string | null>(null);
  const [pairingAction, setPairingAction] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  const reload = useCallback(async () => {
    const [agentRes, channelsRes] = await Promise.all([
      fetch(`/api/agents/${agentId}`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`/api/agents/${agentId}/channels`).then(r => r.ok ? r.json() : []).catch(() => []),
    ]);
    if (agentRes) setAgent(agentRes);
    setChannels(Array.isArray(channelsRes) ? channelsRes : []);

    const isRunning = agentRes?.status === "running";
    if (isRunning) {
      const [gwRes, pairRes, skillsRes, actRes] = await Promise.all([
        fetch(`/api/agents/${agentId}/gateway`).then(r => r.ok ? r.json() : null).catch(() => null),
        fetch(`/api/agents/${agentId}/pairings`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`/api/agents/${agentId}/skills`).then(r => r.ok ? r.json() : []).catch(() => []),
        fetch(`/api/agents/${agentId}/activity?limit=15`).then(r => r.ok ? r.json() : []).catch(() => []),
      ]);
      if (gwRes) setGateway(gwRes);
      setPairings(Array.isArray(pairRes) ? pairRes : []);
      setSkills(Array.isArray(skillsRes) ? skillsRes : []);
      setActivity(Array.isArray(actRes) ? actRes : []);
    } else {
      // Still fetch skills from DB when offline
      const skillsRes = await fetch(`/api/agents/${agentId}/skills`).then(r => r.ok ? r.json() : []).catch(() => []);
      setSkills(Array.isArray(skillsRes) ? skillsRes : []);
    }

    setLoading(false);
  }, [agentId]);

  useEffect(() => { reload(); }, [reload]);

  // Auto-refresh every 30s when running/creating
  useEffect(() => {
    if (!agent) return;
    const active = ["running", "creating", "provisioning", "starting"].includes(agent.status);
    if (!active) return;
    const interval = setInterval(() => reload(), 30000);
    return () => clearInterval(interval);
  }, [agent, reload]);

  async function handleDisconnect(platform: string) {
    setDisconnecting(platform);
    try {
      await fetch(`/api/agents/${agentId}/channels`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });
      setChannels(prev => prev.filter(c => c.platform !== platform));
      showToast(`${platform} disconnected`, true);
    } catch {
      showToast("Failed to disconnect", false);
    }
    setDisconnecting(null);
  }

  async function handlePairing(platform: string, identifier: string, action: "approve" | "deny") {
    const key = `${action}-${platform}-${identifier}`;
    setPairingAction(key);
    try {
      await fetch(`/api/agents/${agentId}/pairings/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, identifier }),
      });
      setPairings(prev => prev.filter(p => !(p.platform === platform && p.identifier === identifier)));
      showToast(`Pairing ${action === "approve" ? "approved" : "denied"}`, action === "approve");
    } catch {
      showToast("Action failed", false);
    }
    setPairingAction(null);
  }

  async function handleSkillToggle(skillId: string, current: boolean) {
    setTogglingSkill(skillId);
    setSkills(prev => prev.map(s => s.id === skillId ? { ...s, enabled: !current } : s));
    try {
      await fetch(`/api/agents/${agentId}/skills`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId, enabled: !current }),
      });
    } catch {
      setSkills(prev => prev.map(s => s.id === skillId ? { ...s, enabled: current } : s));
      showToast("Failed to update skill", false);
    }
    setTogglingSkill(null);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-up">
        <div className="w-10 h-10 border-2 border-[#de1b23] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#949aa0]">Loading gateway...</p>
      </div>
    );
  }

  const isRunning = agent?.status === "running";
  const isCreating = ["creating", "provisioning", "starting"].includes(agent?.status ?? "");
  const isError = agent?.status === "error";
  const connectedSet = new Set(channels.map(c => c.platform));

  return (
    <div className="space-y-6 animate-fade-up">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-up ${toast.ok ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/agents"
            className="w-8 h-8 rounded-lg bg-[#f6f9fa] flex items-center justify-center text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#e5e7eb] transition-all duration-200 flex-shrink-0"
          >
            <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
            {(agent?.name || "AG").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-[#1a1a2e]">{agent?.name || agentId}</h1>
              {isCreating && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  Setting up...
                </span>
              )}
              {isError && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                  Failed
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-emerald-500 animate-pulse" : isCreating ? "bg-amber-400 animate-pulse" : isError ? "bg-red-500" : "bg-[#c5c9cd]"}`} />
              <span className={`text-xs font-medium ${isRunning ? "text-emerald-600" : isCreating ? "text-amber-600" : isError ? "text-red-600" : "text-[#949aa0]"}`}>
                {isRunning ? "Running" : isCreating ? "Starting" : isError ? "Provisioning failed" : agent?.status ?? "Stopped"}
              </span>
              {agent?.model && (
                <>
                  <span className="text-[#e5e7eb]">·</span>
                  <span className="text-xs text-[#949aa0]">{MODEL_SHORT[agent.model] ?? agent.model}</span>
                </>
              )}
              {agent?.subdomain && (
                <>
                  <span className="text-[#e5e7eb]">·</span>
                  <span className="text-xs text-[#949aa0] font-mono" dir="ltr">{agent.subdomain}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Link href={`/dashboard/agents/${agentId}/configure`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200 border border-[#e5e7eb]">
            Configure
          </Link>
          <Link href={`/dashboard/agents/${agentId}/monitor`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200 border border-[#e5e7eb]">
            Monitor
          </Link>
          <Link href={`/dashboard/agents/${agentId}/logs`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200 border border-[#e5e7eb]">
            Logs
          </Link>
          <Link href={`/dashboard/agents/${agentId}/analytics`} className="px-3 py-1.5 rounded-lg text-xs text-[#949aa0] font-medium hover:text-[#de1b23] hover:bg-[#fef2f2] transition-all duration-200 border border-[#e5e7eb]">
            Analytics
          </Link>
          <button
            onClick={reload}
            className="p-1.5 rounded-lg text-[#949aa0] hover:text-[#1a1a2e] hover:bg-[#f6f9fa] transition-all duration-200 border border-[#e5e7eb]"
            title="Refresh"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Gateway Health ── */}
      {isRunning && (
        <div className={`rounded-2xl border p-5 ${
          gateway?.status === "online"
            ? "bg-emerald-50 border-emerald-200"
            : gateway?.status === "offline"
            ? "bg-[#f6f9fa] border-[#e5e7eb]"
            : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                gateway?.status === "online" ? "bg-emerald-100" : "bg-[#e5e7eb]"
              }`}>
                <svg className={`w-4.5 h-4.5 ${gateway?.status === "online" ? "text-emerald-600" : "text-[#949aa0]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-bold ${gateway?.status === "online" ? "text-emerald-800" : "text-[#1a1a2e]"}`}>
                  Gateway {gateway?.status === "online" ? "Online" : gateway?.status === "offline" ? "Offline" : "Checking..."}
                </p>
                {gateway?.version && (
                  <p className="text-xs text-[#949aa0]">OpenClaw {gateway.version}</p>
                )}
              </div>
            </div>
            <div className="flex gap-6 text-right">
              {gateway?.uptime && (
                <div>
                  <p className="text-xs text-[#949aa0]">Uptime</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{gateway.uptime}</p>
                </div>
              )}
              {gateway?.avgResponseMs != null && (
                <div>
                  <p className="text-xs text-[#949aa0]">Avg Response</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{gateway.avgResponseMs}ms</p>
                </div>
              )}
              {gateway?.memoryMb != null && (
                <div className="hidden sm:block">
                  <p className="text-xs text-[#949aa0]">Memory</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{gateway.memoryMb} MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Creating state banner */}
      {isCreating && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Agent is setting up...</p>
            <p className="text-xs text-amber-600 mt-0.5">Your server is being provisioned. This usually takes 2–3 minutes.</p>
          </div>
        </div>
      )}

      {/* Error state banner */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-800">Provisioning failed</p>
            <p className="text-xs text-red-600 mt-0.5">Server could not be created. Please delete this agent and try again. If the issue persists, contact support.</p>
          </div>
        </div>
      )}

      {/* ── Channels ── */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <div>
            <h2 className="text-sm font-bold text-[#1a1a2e]">Channels</h2>
            <p className="text-xs text-[#949aa0] mt-0.5">{connectedSet.size} of {PLATFORMS.length} connected</p>
          </div>
        </div>

        <div className="divide-y divide-[#f6f9fa]">
          {PLATFORMS.map(p => {
            const ch = channels.find(c => c.platform === p.id);
            const isConnected = connectedSet.has(p.id);
            const isExpanded = expandedChannel === p.id;

            return (
              <div key={p.id}>
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${p.color}15`, color: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a2e]">{p.name}</p>
                      <p className={`text-xs ${isConnected ? "text-emerald-600" : "text-[#c5c9cd]"}`}>
                        {isConnected
                          ? ch?.connected_at ? `Connected ${timeAgo(ch.connected_at)}` : "Connected"
                          : "Not connected"
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <button
                        onClick={() => handleDisconnect(p.id)}
                        disabled={disconnecting === p.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#949aa0] hover:text-red-600 hover:bg-red-50 border border-[#e5e7eb] hover:border-red-200 transition-all duration-200 disabled:opacity-50"
                      >
                        {disconnecting === p.id ? "..." : "Disconnect"}
                      </button>
                    ) : (
                      <button
                        onClick={() => setExpandedChannel(isExpanded ? null : p.id)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          isExpanded
                            ? "bg-[#f6f9fa] text-[#949aa0]"
                            : "bg-[#de1b23] text-white hover:bg-[#c41820]"
                        }`}
                      >
                        {isExpanded ? "Cancel" : "Connect"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline connect form */}
                {isExpanded && !isConnected && (
                  <div className="px-6 pb-5">
                    {p.id === "telegram" && <TelegramForm agentId={agentId} onDone={() => { setExpandedChannel(null); reload(); }} />}
                    {p.id === "discord" && <DiscordForm agentId={agentId} onDone={() => { setExpandedChannel(null); reload(); }} />}
                    {p.id === "whatsapp" && <WhatsAppForm agentId={agentId} agentRunning={isRunning} onDone={() => { setExpandedChannel(null); reload(); }} />}
                    {p.id === "signal" && <SignalForm agentId={agentId} onDone={() => { setExpandedChannel(null); reload(); }} />}
                    {p.id === "slack" && <SlackForm agentId={agentId} onDone={() => { setExpandedChannel(null); reload(); }} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pending Pairings ── */}
      {pairings.length > 0 && (
        <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-amber-100 bg-amber-50/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-sm font-bold text-amber-800">{pairings.length} Pending Pairing{pairings.length !== 1 ? "s" : ""}</h2>
            <p className="text-xs text-amber-600 ml-1">— Users requesting access</p>
          </div>
          <div className="divide-y divide-[#f6f9fa]">
            {pairings.map((req, i) => {
              const plt = PLATFORMS.find(p => p.id === req.platform);
              return (
                <div key={req.id ?? i} className="flex items-center gap-4 px-6 py-4">
                  {plt && (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${plt.color}15`, color: plt.color }}>
                      {plt.icon}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a1a2e] truncate">{req.identifier}</p>
                    <p className="text-xs text-[#949aa0]">
                      {plt?.name ?? req.platform}
                      {req.requestedAt ? ` · ${timeAgo(req.requestedAt)}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handlePairing(req.platform, req.identifier, "approve")}
                      disabled={!!pairingAction}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md transition-all duration-200 disabled:opacity-50"
                    >
                      {pairingAction === `approve-${req.platform}-${req.identifier}` ? "..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handlePairing(req.platform, req.identifier, "deny")}
                      disabled={!!pairingAction}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#e5e7eb] text-[#949aa0] hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                    >
                      {pairingAction === `deny-${req.platform}-${req.identifier}` ? "..." : "Deny"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Skills ── */}
      {skills.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
            <div>
              <h2 className="text-sm font-bold text-[#1a1a2e]">Skills</h2>
              <p className="text-xs text-[#949aa0] mt-0.5">{skills.filter(s => s.enabled).length} active</p>
            </div>
            <Link href={`/dashboard/agents/${agentId}/configure`} className="text-xs text-[#de1b23] hover:underline">
              Manage →
            </Link>
          </div>
          <div className="divide-y divide-[#f6f9fa]">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between px-6 py-3.5">
                <div>
                  <p className="text-sm font-medium text-[#1a1a2e]">{skill.name}</p>
                  {skill.description && (
                    <p className="text-xs text-[#949aa0] mt-0.5">{skill.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleSkillToggle(skill.id, skill.enabled)}
                  disabled={togglingSkill === skill.id}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${
                    skill.enabled ? "bg-[#de1b23]" : "bg-[#e5e7eb]"
                  } ${togglingSkill === skill.id ? "opacity-60" : ""}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${skill.enabled ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Live Activity ── */}
      {activity.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
            <div>
              <h2 className="text-sm font-bold text-[#1a1a2e]">Live Activity</h2>
              <p className="text-xs text-[#949aa0] mt-0.5">Latest messages</p>
            </div>
            <Link href={`/dashboard/agents/${agentId}/logs`} className="text-xs text-[#de1b23] hover:underline">
              Full logs →
            </Link>
          </div>
          <div className="divide-y divide-[#f6f9fa] max-h-80 overflow-y-auto">
            {activity.slice().reverse().map((entry) => {
              const plt = PLATFORMS.find(p => p.id === entry.platform);
              return (
                <div key={entry.id} className="flex items-start gap-3 px-6 py-3">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={plt ? { backgroundColor: `${plt.color}15`, color: plt.color } : { backgroundColor: "#f6f9fa", color: "#949aa0" }}
                  >
                    {plt ? <span style={{ transform: "scale(0.65)", display: "block" }}>{plt.icon}</span> : <span className="text-[10px] font-bold">{entry.platform[0]?.toUpperCase()}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-[#1a1a2e]">{entry.sender}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${entry.direction === "in" ? "bg-[#f6f9fa] text-[#949aa0]" : "bg-[#de1b23]/10 text-[#de1b23]"}`}>
                        {entry.direction === "in" ? "→ AI" : "AI →"}
                      </span>
                      <span className="text-[10px] text-[#c5c9cd] ml-auto">{timeAgo(entry.timestamp)}</span>
                    </div>
                    <p className="text-xs text-[#4a4a5a] truncate">{entry.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Offline empty state ── */}
      {!isRunning && !isCreating && activity.length === 0 && skills.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#f6f9fa] flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-[#c5c9cd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#949aa0] mb-1">Gateway is offline</p>
          <p className="text-xs text-[#c5c9cd] max-w-xs">Start your agent to enable live activity, skills, and pairing requests.</p>
        </div>
      )}

    </div>
  );
}
