// SSH utility for managing OpenClaw instances on agent servers
// Uses ssh2 package to connect, read/update config, and restart the service.
//
// Required env vars:
//   PROVISION_SSH_PRIVATE_KEY  — base64-encoded OpenSSH private key
//   PROVISION_SSH_PUBLIC_KEY   — the matching public key (added to servers at provisioning time)
//
// To generate a key pair:
//   ssh-keygen -t ed25519 -C "clawbibi-provision" -f provision_key -N ""
//   cat provision_key | base64 -w 0   → paste as PROVISION_SSH_PRIVATE_KEY
//   cat provision_key.pub             → paste as PROVISION_SSH_PUBLIC_KEY

import { Client } from "ssh2";

function getPrivateKey(): Buffer {
  const b64 = process.env.PROVISION_SSH_PRIVATE_KEY;
  if (!b64) throw new Error("PROVISION_SSH_PRIVATE_KEY is not set. Add it to .env.local.");
  return Buffer.from(b64, "base64");
}

// Run a command on a remote server and return stdout.
// timeoutMs applies to the full exec duration (on top of the 20s connect timeout).
export function sshExec(ip: string, command: string, timeoutMs = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let stdout = "";
    let stderr = "";
    let settled = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function settle(fn: (v: any) => void, value: unknown) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      conn.end();
      fn(value);
    }

    // Hard timeout — kills the connection if the command never closes
    const timer = setTimeout(() => {
      settle(reject, new Error(`SSH exec timed out after ${timeoutMs}ms: ${command.slice(0, 80)}`));
    }, timeoutMs);

    conn.on("ready", () => {
      conn.exec(command, (err, stream) => {
        if (err) { settle(reject, err); return; }

        stream.on("data", (data: Buffer) => { stdout += data.toString(); });
        stream.stderr.on("data", (data: Buffer) => { stderr += data.toString(); });

        stream.on("close", (code: number) => {
          if (code !== 0) {
            settle(reject, new Error(`SSH command failed (exit ${code}): ${stderr || stdout}`));
          } else {
            settle(resolve, stdout.trim());
          }
        });
      });
    });

    conn.on("error", (err) => settle(reject, err));

    conn.connect({
      host: ip,
      port: 22,
      username: "root",
      privateKey: getPrivateKey(),
      readyTimeout: 20000,
    });
  });
}

// OpenClaw config shape (partial — only what we manage)
interface OpenClawConfig {
  model?: string;
  gateway?: Record<string, unknown>;
  channels?: Record<string, unknown>;
  [key: string]: unknown;
}

// Read the current openclaw.json from the server
async function readConfig(ip: string): Promise<OpenClawConfig> {
  const raw = await sshExec(ip, "cat ~/.openclaw/openclaw.json 2>/dev/null || echo '{}'");
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Write openclaw.json to the server and restart the service.
// Uses base64 encoding to safely transfer arbitrary JSON without shell injection risk.
async function writeConfig(ip: string, config: OpenClawConfig): Promise<void> {
  const b64 = Buffer.from(JSON.stringify(config, null, 2)).toString("base64");
  await sshExec(ip, `mkdir -p ~/.openclaw && echo '${b64}' | base64 -d > ~/.openclaw/openclaw.json`);
  await sshExec(ip, "systemctl restart openclaw || true");
}

// Build the channel-specific config block for openclaw.json
function buildChannelConfig(platform: string, config: Record<string, string>): Record<string, unknown> {
  switch (platform) {
    case "telegram":
      return {
        enabled: true,
        botToken: config.token,
        dmPolicy: "pairing",
      };

    case "discord":
      return {
        enabled: true,
        token: config.token,
        dmPolicy: "pairing",
        ...(config.serverId ? { guilds: [{ id: config.serverId }] } : {}),
      };

    case "whatsapp":
      return {
        enabled: true,
        dmPolicy: "pairing",
      };

    case "signal":
      return {
        enabled: true,
        account: config.phone,
        cliPath: "signal-cli",
        dmPolicy: "pairing",
      };

    case "slack":
      return {
        enabled: true,
        appToken: config.appToken || config.token,
        botToken: config.token,
        dmPolicy: "pairing",
      };

    default:
      return { enabled: true, ...config };
  }
}

// Push a channel config to the running OpenClaw instance on a server.
// Called after the user submits their bot token / credentials in the pairing page.
export async function pushChannelConfig(
  ip: string,
  platform: string,
  config: Record<string, string>
): Promise<void> {
  const current = await readConfig(ip);
  current.channels = current.channels ?? {};
  current.channels[platform] = buildChannelConfig(platform, config);
  await writeConfig(ip, current);
}

// Remove a channel from the OpenClaw config (on disconnect)
export async function removeChannelConfig(ip: string, platform: string): Promise<void> {
  const current = await readConfig(ip);
  if (current.channels) {
    delete current.channels[platform];
  }
  await writeConfig(ip, current);
}

// Push AI API keys to the OpenClaw systemd service as environment variables.
// Keys are written to a systemd drop-in override so they survive service restarts.
// Uses base64 to safely transfer key values without shell injection risk.
export async function pushApiKeys(
  ip: string,
  keys: Record<string, string>
): Promise<void> {
  const envLines = Object.entries(keys)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `Environment="${k}=${v}"`)
    .join("\n");

  const overrideContent = `[Service]\n${envLines}\n`;
  const b64 = Buffer.from(overrideContent).toString("base64");

  await sshExec(
    ip,
    `mkdir -p /etc/systemd/system/openclaw.service.d && ` +
    `echo '${b64}' | base64 -d > /etc/systemd/system/openclaw.service.d/apikeys.conf && ` +
    `systemctl daemon-reload && systemctl restart openclaw || true`
  );
}

// Push soul/personality (SOUL.md content) to the agent server.
// Uses base64 to safely transfer arbitrary text without shell injection risk.
export async function pushSoulMd(ip: string, content: string): Promise<void> {
  const b64 = Buffer.from(content).toString("base64");
  await sshExec(ip, `mkdir -p ~/.openclaw && echo '${b64}' | base64 -d > ~/.openclaw/SOUL.md`);
  await sshExec(ip, "systemctl restart openclaw || true");
}

// Switch the active AI model in openclaw.json (instant — restarts service in ~2s).
export async function pushModelConfig(ip: string, model: string): Promise<void> {
  const current = await readConfig(ip);
  current.model = model;
  await writeConfig(ip, current);
}

// Push the full skills configuration to openclaw.json.
// skills: { "web-search": { enabled: true }, "calculator": { enabled: false }, ... }
// custom: [{ name, description, endpoint, method, parameters }]
export async function pushSkillsConfig(
  ip: string,
  skills: Record<string, unknown>
): Promise<void> {
  const current = await readConfig(ip);
  current.skills = skills;
  await writeConfig(ip, current);
}

// ── WhatsApp QR pairing ───────────────────────────────────────────────────────
// A self-contained Node.js script that installs @whiskeysockets/baileys on first
// run, then streams the QR code to ~/.openclaw/whatsapp_qr.txt as a data URL.
// Status values written to that file: <dataURL> | "connected" | "logged_out"
const WA_SETUP_SCRIPT = `#!/usr/bin/env node
'use strict';
// Clawbibi WhatsApp QR daemon — auto-installs Baileys, writes QR to file.
var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var HOME = process.env.HOME || '/root';
var QR_FILE = path.join(HOME, '.openclaw', 'whatsapp_qr.txt');
var AUTH_DIR = path.join(HOME, '.openclaw', 'whatsapp_auth');
var MOD = '/opt/clawbibi/node_modules/@whiskeysockets/baileys';
var QR_MOD = '/opt/clawbibi/node_modules/qrcode';

function ensureDeps() {
  try { require(MOD); return; } catch (e) {}
  console.log('[wa] Installing WhatsApp dependencies (~1 min on first run)...');
  cp.execSync('npm install --prefix /opt/clawbibi @whiskeysockets/baileys qrcode 2>&1', {
    stdio: 'inherit', timeout: 180000
  });
}

ensureDeps();

var baileys = require(MOD);
var makeWASocket = baileys.default || baileys.makeWASocket || baileys;
var useMultiFileAuthState = baileys.useMultiFileAuthState;
var DisconnectReason = baileys.DisconnectReason;
var Browsers = baileys.Browsers;
var qrcode = require(QR_MOD);

var noLog = {
  level: 'silent',
  child: function() { return noLog; },
  info: function() {}, error: function() {}, warn: function() {},
  debug: function() {}, trace: function() {}, fatal: function() {},
};

function connect() {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
  useMultiFileAuthState(AUTH_DIR).then(function(auth) {
    var state = auth.state;
    var saveCreds = auth.saveCreds;
    var sock = makeWASocket({
      auth: state,
      browser: Browsers.ubuntu('Clawbibi'),
      printQRInTerminal: false,
      logger: noLog,
    });
    sock.ev.on('connection.update', function(update) {
      var connection = update.connection;
      var lastDisconnect = update.lastDisconnect;
      var qr = update.qr;
      if (qr) {
        qrcode.toDataURL(qr).then(function(png) {
          fs.mkdirSync(path.dirname(QR_FILE), { recursive: true });
          fs.writeFileSync(QR_FILE, png);
          console.log('[wa] QR written.');
        }).catch(function(e) { console.error('[wa] QR err:', e.message); });
      }
      if (connection === 'open') {
        fs.writeFileSync(QR_FILE, 'connected');
        console.log('[wa] Connected!');
      }
      if (connection === 'close') {
        var code = lastDisconnect && lastDisconnect.error && lastDisconnect.error.output
          ? lastDisconnect.error.output.statusCode : undefined;
        if (code === (DisconnectReason && DisconnectReason.loggedOut)) {
          fs.writeFileSync(QR_FILE, 'logged_out');
        } else {
          console.log('[wa] Disconnected, reconnecting...');
          setTimeout(connect, 5000);
        }
      }
    });
    sock.ev.on('creds.update', saveCreds);
  }).catch(function(e) { console.error('[wa] Fatal:', e.message); process.exit(1); });
}

connect();
`;

// Push the WhatsApp pairing script to the agent and start it in the background.
// The script installs Baileys on first run and writes the QR code to
// ~/.openclaw/whatsapp_qr.txt. Use getWhatsAppQR() to poll that file.
export async function startWhatsAppPairing(ip: string): Promise<void> {
  const b64 = Buffer.from(WA_SETUP_SCRIPT).toString("base64");

  // Push the setup script (base64-safe, no shell injection)
  await sshExec(ip, `echo '${b64}' | base64 -d > /opt/clawbibi/wa-setup.js`);

  // Stop any existing pairing process and clear stale QR
  await sshExec(ip, `pkill -f 'wa-setup.js' 2>/dev/null || true`);
  await sshExec(ip, `rm -f ~/.openclaw/whatsapp_qr.txt`);

  // Create the logs directory if it doesn't exist
  await sshExec(ip, `mkdir -p ~/.openclaw/logs`);

  // Start the daemon in the background — exits immediately, process keeps running
  await sshExec(ip, `nohup /usr/bin/node /opt/clawbibi/wa-setup.js >> ~/.openclaw/logs/whatsapp.log 2>&1 & echo $!`);
}

// Read the current WhatsApp QR / status from the agent server.
// Returns: data URL string (QR ready to display), "connected", "logged_out", or null (not ready yet).
export async function getWhatsAppQR(ip: string): Promise<string | null> {
  try {
    const content = await sshExec(ip, `cat ~/.openclaw/whatsapp_qr.txt 2>/dev/null || echo ''`);
    return content.trim() || null;
  } catch {
    return null;
  }
}
