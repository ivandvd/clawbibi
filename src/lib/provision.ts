// Server provisioning logic
// Called when a user creates an agent — spins up a DigitalOcean Droplet,
// installs the Clawbibi Agent Runtime via cloud-init, and creates a Cloudflare DNS record.
// Runs in the background (non-blocking from the API route).

import { createDroplet, deleteDroplet, waitForDropletIp } from "./digitalocean";
import { createDnsRecord, deleteDnsRecord } from "./cloudflare";
import { createAdminClient } from "./supabase/admin";

// ─── Clawbibi Agent Runtime ───────────────────────────────────────────────────
// A real Node.js daemon that handles multi-platform message routing to AI models.
// Embedded directly into the cloud-init script as base64 to avoid shell escaping issues.
// Exposes the same CLI interface that ssh.ts expects:
//   openclaw gateway status --json
//   openclaw logs --last=N --json
//   openclaw pairing list --json
//   openclaw pairing approve <platform> "<identifier>"
//   openclaw pairing deny <platform> "<identifier>"
//   openclaw skills list --json

const RUNTIME_CODE = `#!/usr/bin/env node
'use strict';
// Clawbibi Agent Runtime v1.0
// Multi-platform AI message routing daemon.
// Config: ~/.openclaw/openclaw.json | Logs: ~/.openclaw/logs/activity.jsonl

const fs = require('fs');
const path = require('path');
const https = require('https');
const HOME = process.env.HOME || '/root';
const DIR = path.join(HOME, '.openclaw');
const CONFIG = path.join(DIR, 'openclaw.json');
const LOGS_DIR = path.join(DIR, 'logs');
const ACTIVITY = path.join(LOGS_DIR, 'activity.jsonl');
const STATUS = path.join(DIR, 'status.json');
const PAIRINGS = path.join(DIR, 'pairings.json');

function readJson(file, def) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return def; }
}
function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
function appendLog(entry) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  const line = JSON.stringify({ id: String(Date.now()), timestamp: new Date().toISOString(), ...entry });
  fs.appendFileSync(ACTIVITY, line + '\\n');
}
function writeStatus(extra) {
  const u = Math.floor(process.uptime());
  const h = Math.floor(u / 3600), m = Math.floor((u % 3600) / 60), s = u % 60;
  const uptime = h > 0 ? h + 'h ' + m + 'm' : m > 0 ? m + 'm ' + s + 's' : s + 's';
  writeJson(STATUS, { status: 'online', version: '1.0.0', uptime, uptimeSecs: u, pid: process.pid, ...extra });
}

// ── CLI MODE ──────────────────────────────────────────────────────────────────
const [,, cmd, sub, ...rest] = process.argv;

if (cmd === 'gateway' && sub === 'status') {
  process.stdout.write(JSON.stringify(readJson(STATUS, { status: 'offline' })) + '\\n');
  process.exit(0);
}
if (cmd === 'logs') {
  const lim = parseInt((rest.find(a => a.startsWith('--last=')) || '--last=20').split('=')[1]);
  try {
    const lines = fs.readFileSync(ACTIVITY, 'utf8').split('\\n').filter(Boolean);
    process.stdout.write(JSON.stringify(lines.slice(-lim).map(l => JSON.parse(l))) + '\\n');
  } catch { process.stdout.write('[]\\n'); }
  process.exit(0);
}
if (cmd === 'pairing') {
  const pairings = readJson(PAIRINGS, []);
  if (sub === 'list') {
    process.stdout.write(JSON.stringify(pairings) + '\\n');
  } else if (sub === 'approve' || sub === 'deny') {
    const [platform, identifier] = rest;
    const filtered = pairings.filter(p => !(p.platform === platform && p.identifier === identifier));
    if (sub === 'approve') {
      const cfg = readJson(CONFIG, {});
      cfg.allowed = cfg.allowed || {};
      cfg.allowed[platform] = cfg.allowed[platform] || [];
      if (!cfg.allowed[platform].includes(identifier)) {
        cfg.allowed[platform].push(identifier);
        writeJson(CONFIG, cfg);
      }
    }
    writeJson(PAIRINGS, filtered);
    process.stdout.write(JSON.stringify({ success: true }) + '\\n');
  }
  process.exit(0);
}
if (cmd === 'skills' && sub === 'list') {
  const cfg = readJson(CONFIG, {});
  const skills = cfg.skills || {};
  const list = Object.entries(skills).map(([id, enabled]) => ({
    id, name: id.replace(/-/g, ' ').replace(/\\b\\w/g, c => c.toUpperCase()), enabled: Boolean(enabled),
  }));
  process.stdout.write(JSON.stringify(list) + '\\n');
  process.exit(0);
}
if (cmd === 'skills' && (sub === 'enable' || sub === 'disable')) {
  const skillId = rest[0];
  if (skillId) {
    const cfg = readJson(CONFIG, {});
    cfg.skills = cfg.skills || {};
    cfg.skills[skillId] = sub === 'enable';
    writeJson(CONFIG, cfg);
  }
  process.stdout.write(JSON.stringify({ success: true }) + '\\n');
  process.exit(0);
}

// ── AI CALLS ──────────────────────────────────────────────────────────────────
function httpPost(host, urlPath, body, headers) {
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body, 'utf8');
    const req = https.request({
      hostname: host, port: 443, path: urlPath, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': buf.length, ...headers },
    }, res => {
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch (e) { reject(new Error('Bad JSON: ' + Buffer.concat(chunks).toString().slice(0, 100))); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(new Error('AI request timeout')); });
    req.write(buf);
    req.end();
  });
}

const SESSIONS = {};
function getHistory(key) { return SESSIONS[key] = SESSIONS[key] || []; }
function addMsg(key, role, content) {
  const h = getHistory(key);
  h.push({ role, content });
  if (h.length > 30) h.splice(0, h.length - 30);
}

async function askAI(cfg, sessionKey, userText) {
  const model = (cfg.model || 'claude-4.5').toLowerCase();
  const keys = cfg.api_keys || {};
  const soul = cfg.soul_md || 'You are a helpful assistant. Reply in the user language.';
  addMsg(sessionKey, 'user', userText);
  const msgs = getHistory(sessionKey);
  let text = '';

  if (model.includes('claude')) {
    const key = keys.anthropic || process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error('No Anthropic API key configured');
    const modelId = model.includes('opus') ? 'claude-opus-4-6' : 'claude-sonnet-4-6';
    const res = await httpPost('api.anthropic.com', '/v1/messages', JSON.stringify({
      model: modelId, max_tokens: 1024, system: soul,
      messages: msgs.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
    }), { 'x-api-key': key, 'anthropic-version': '2023-06-01' });
    text = res.content?.[0]?.text || '';
  } else if (model.includes('gpt')) {
    const key = keys.openai || process.env.OPENAI_API_KEY;
    if (!key) throw new Error('No OpenAI API key configured');
    const res = await httpPost('api.openai.com', '/v1/chat/completions', JSON.stringify({
      model: 'gpt-4o', max_tokens: 1024,
      messages: [{ role: 'system', content: soul }, ...msgs],
    }), { 'Authorization': 'Bearer ' + key });
    text = res.choices?.[0]?.message?.content || '';
  } else if (model.includes('gemini')) {
    const key = keys.google || process.env.GOOGLE_AI_API_KEY;
    if (!key) throw new Error('No Google AI API key configured');
    const res = await httpPost('generativelanguage.googleapis.com',
      '/v1beta/models/gemini-2.0-flash:generateContent?key=' + key,
      JSON.stringify({ contents: [{ role: 'user', parts: [{ text: soul + '\\n\\n' + userText }] }] }), {});
    text = res.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } else if (model.includes('llama') || model.includes('mixtral') || model.includes('groq')) {
    const key = keys.groq || process.env.GROQ_API_KEY;
    if (!key) throw new Error('No Groq API key configured');
    const groqModel = model.includes('mixtral') ? 'mixtral-8x7b-32768' : 'llama-3.3-70b-versatile';
    const res = await httpPost('api.groq.com', '/openai/v1/chat/completions', JSON.stringify({
      model: groqModel, max_tokens: 1024,
      messages: [{ role: 'system', content: soul }, ...msgs],
    }), { 'Authorization': 'Bearer ' + key });
    text = res.choices?.[0]?.message?.content || '';
  } else {
    throw new Error('Unknown model: ' + model);
  }

  addMsg(sessionKey, 'assistant', text);
  return text;
}

// ── TELEGRAM ──────────────────────────────────────────────────────────────────
let avgMs = 0;

function startTelegram(tgConf) {
  let Bot;
  try { Bot = require('node-telegram-bot-api'); } catch {
    console.error('[telegram] node-telegram-bot-api not installed — run: npm i node-telegram-bot-api');
    return false;
  }
  const bot = new Bot(tgConf.botToken, { polling: true });
  const pairingMode = tgConf.dmPolicy || 'open';

  bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const userId = String(msg.from?.id || chatId);
    const text = (msg.text || '').trim();
    if (!text) return;

    const cfg = readJson(CONFIG, {});
    const allowed = cfg.allowed?.telegram || [];

    if (pairingMode === 'pairing' && !allowed.includes(userId)) {
      const ps = readJson(PAIRINGS, []);
      if (!ps.some(p => p.platform === 'telegram' && p.identifier === userId)) {
        ps.push({ platform: 'telegram', identifier: userId, requestedAt: new Date().toISOString() });
        writeJson(PAIRINGS, ps);
      }
      bot.sendMessage(chatId, '\\u{1F44B} Access request sent. Please wait for the owner to approve.').catch(() => {});
      return;
    }

    appendLog({ platform: 'telegram', sender: userId, direction: 'in', content: text });
    try {
      const t0 = Date.now();
      const reply = await askAI(cfg, 'tg:' + chatId, text);
      avgMs = Math.round(avgMs * 0.8 + (Date.now() - t0) * 0.2);
      appendLog({ platform: 'telegram', sender: 'agent', direction: 'out', content: reply });
      writeStatus({ avgResponseMs: avgMs });
      bot.sendMessage(chatId, reply).catch(e => console.error('[telegram] send error:', e.message));
    } catch (e) {
      console.error('[telegram] AI error:', e.message);
      bot.sendMessage(chatId, '\\u26A0\\uFE0F Sorry, I hit an error. Please try again.').catch(() => {});
    }
  });

  bot.on('polling_error', e => console.error('[telegram] polling error:', e.code));
  console.log('[telegram] Bot started');
  return true;
}

// ── DAEMON ────────────────────────────────────────────────────────────────────
if (!fs.existsSync(PAIRINGS)) writeJson(PAIRINGS, []);
writeStatus({});

const cfg = readJson(CONFIG, {});
const channels = cfg.channels || {};
let started = 0;

if (channels.telegram?.enabled && channels.telegram?.botToken) {
  if (startTelegram(channels.telegram)) started++;
}

console.log('[runtime] Clawbibi agent runtime started. Channels active: ' + started);
setInterval(() => writeStatus({ avgResponseMs: avgMs }), 30000);
process.on('uncaughtException', e => console.error('[runtime] Uncaught:', e.message));
process.on('unhandledRejection', (e) => console.error('[runtime] Unhandled rejection:', e instanceof Error ? e.message : e));
`;

// Build the cloud-init script that runs on first boot.
// Installs the Clawbibi runtime, sets up SSH access, and starts the agent.
function buildCloudInit(agentId: string, model: string, apiKeys?: Record<string, string>): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://clawbibi.cloud";
  const secret = process.env.PROVISION_WEBHOOK_SECRET ?? "";
  const sshPubKey = process.env.PROVISION_SSH_PUBLIC_KEY ?? "";

  // Base64-encode the runtime to avoid shell escaping nightmares
  const runtimeB64 = Buffer.from(RUNTIME_CODE).toString("base64");

  // Build environment variables for AI API keys if provided (Managed plan or BYOK at creation)
  const anthropicKey = apiKeys?.anthropic || process.env.ANTHROPIC_API_KEY || "";
  const openaiKey = apiKeys?.openai || process.env.OPENAI_API_KEY || "";
  const googleKey = apiKeys?.google || process.env.GOOGLE_AI_API_KEY || "";
  const groqKey = apiKeys?.groq || process.env.GROQ_API_KEY || "";

  const envSection = [
    anthropicKey ? `Environment="ANTHROPIC_API_KEY=${anthropicKey}"` : "",
    openaiKey    ? `Environment="OPENAI_API_KEY=${openaiKey}"` : "",
    googleKey    ? `Environment="GOOGLE_AI_API_KEY=${googleKey}"` : "",
    groqKey      ? `Environment="GROQ_API_KEY=${groqKey}"` : "",
  ].filter(Boolean).join("\n");

  // Build initial config JSON
  const initialConfig = JSON.stringify({
    model,
    gateway: { host: "0.0.0.0", port: 3000 },
    channels: {},
    skills: {},
    allowed: {},
    ...(apiKeys ? { api_keys: apiKeys } : {}),
  }, null, 2);

  return `#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

# ── System update ─────────────────────────────────────────────────────────────
apt-get update -qq
apt-get install -y curl wget nodejs npm default-jre-headless 2>/dev/null

# Install Node.js 20 (if system version is too old)
node --version | grep -qE 'v(1[89]|2[0-9])' 2>/dev/null || {
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs
}

# ── SSH access ────────────────────────────────────────────────────────────────
mkdir -p /root/.ssh && chmod 700 /root/.ssh
echo '${sshPubKey}' >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

# ── Clawbibi runtime ──────────────────────────────────────────────────────────
mkdir -p /opt/clawbibi

# Decode runtime from base64 (avoids all shell escaping issues)
echo '${runtimeB64}' | base64 -d > /opt/clawbibi/runtime.js

# Install Telegram adapter
cd /opt/clawbibi
cat > package.json << 'PKGEOF'
{"name":"clawbibi-runtime","version":"1.0.0","dependencies":{"node-telegram-bot-api":"^0.66.0"}}
PKGEOF
npm install --silent 2>/dev/null || npm install 2>&1 | tail -5

# Create the openclaw CLI shim (keeps SSH commands compatible)
cat > /usr/local/bin/openclaw << 'SHIMEOF'
#!/bin/bash
exec /usr/bin/node /opt/clawbibi/runtime.js "$@"
SHIMEOF
chmod +x /usr/local/bin/openclaw

# ── Config directory ──────────────────────────────────────────────────────────
mkdir -p /root/.openclaw/logs

cat > /root/.openclaw/openclaw.json << 'CFGEOF'
${initialConfig}
CFGEOF

# ── Systemd service ───────────────────────────────────────────────────────────
cat > /etc/systemd/system/openclaw.service << 'SVCEOF'
[Unit]
Description=Clawbibi Agent Runtime
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/clawbibi
ExecStart=/usr/bin/node /opt/clawbibi/runtime.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
${envSection}

[Install]
WantedBy=multi-user.target
SVCEOF

systemctl daemon-reload
systemctl enable openclaw
systemctl start openclaw

# ── Notify Clawbibi dashboard ─────────────────────────────────────────────────
# Wait for runtime to fully initialise before calling the ready webhook
sleep 15
for i in 1 2 3 4 5; do
  HTTP=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${appUrl}/api/agents/${agentId}/ready" \\
    -H "Content-Type: application/json" \\
    -H "x-provision-secret: ${secret}" \\
    -d '{"status":"running"}') && [ "$HTTP" = "200" ] && break
  echo "[boot] Ready webhook attempt $i failed (HTTP $HTTP), retrying in 15s..."
  sleep 15
done

echo "[boot] Clawbibi agent ${agentId} is ready."
`;
}

// Main provisioning function — called fire-and-forget from POST /api/agents
export async function provisionAgent(
  agentId: string,
  model: string,
  subdomain: string,
  apiKeys?: Record<string, string>
): Promise<void> {
  if (!process.env.DO_API_KEY || !process.env.CLOUDFLARE_API_KEY) {
    console.warn(
      `[provision] Skipping real provisioning for agent ${agentId} — ` +
      `DO_API_KEY or CLOUDFLARE_API_KEY not set.`
    );
    return;
  }

  const db = createAdminClient();

  try {
    console.log(`[provision] Starting provisioning for agent ${agentId}...`);

    const userData = buildCloudInit(agentId, model, apiKeys);
    const droplet = await createDroplet({ name: `clawbibi-${agentId}`, userData });

    console.log(`[provision] Droplet created: id=${droplet.id}, waiting for IP...`);

    // DigitalOcean assigns IPs asynchronously — poll until available
    const ip = await waitForDropletIp(droplet.id);

    console.log(`[provision] Droplet ready: id=${droplet.id}, ip=${ip}`);

    await db.from("agents").update({
      server_id: String(droplet.id),
      ip,
      status: "provisioning",
    }).eq("id", agentId);

    await createDnsRecord(subdomain, ip);
    console.log(`[provision] DNS created: ${subdomain} → ${ip}`);

    console.log(`[provision] Boot in progress for agent ${agentId}. Waiting for ready webhook...`);

  } catch (err) {
    console.error(`[provision] Failed for agent ${agentId}:`, err);
    await db.from("agents").update({ status: "error" }).eq("id", agentId);
  }
}

// Tear down everything when an agent is stopped or deleted
export async function deprovisionAgent(
  agentId: string,
  serverId: string | null,
  subdomain: string | null
): Promise<void> {
  const db = createAdminClient();

  try {
    if (serverId && process.env.DO_API_KEY) {
      await deleteDroplet(Number(serverId));
      console.log(`[deprovision] Deleted droplet ${serverId} for agent ${agentId}`);
    }
    if (subdomain && process.env.CLOUDFLARE_API_KEY) {
      await deleteDnsRecord(subdomain);
      console.log(`[deprovision] Deleted DNS record for ${subdomain}`);
    }
    await db.from("agents").update({ status: "stopped", ip: null }).eq("id", agentId);
  } catch (err) {
    console.error(`[deprovision] Failed for agent ${agentId}:`, err);
  }
}
