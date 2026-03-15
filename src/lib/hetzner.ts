// Hetzner Cloud API client
// Docs: https://docs.hetzner.cloud
// Required env: HETZNER_API_KEY

const HETZNER_API = "https://api.hetzner.cloud/v1";

function getHeaders() {
  const key = process.env.HETZNER_API_KEY;
  if (!key) throw new Error("HETZNER_API_KEY is not set. Add it to .env.local.");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export interface HetznerServer {
  id: number;
  name: string;
  status: "initializing" | "starting" | "running" | "stopping" | "off" | "deleting" | "migrating" | "rebuilding" | "unknown";
  public_net: {
    ipv4: { ip: string } | null;
  };
}

// Create a new VPS server with a cloud-init script
export async function createServer(opts: {
  name: string;
  userData: string;
}): Promise<HetznerServer> {
  const res = await fetch(`${HETZNER_API}/servers`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name: opts.name,
      server_type: "cx22",       // 2 vCPU, 4 GB RAM — ~$4.15/mo (cheapest that runs OpenClaw)
      image: "ubuntu-24.04",
      location: "nbg1",           // Nuremberg — good latency for Middle East
      user_data: opts.userData,
      public_net: {
        enable_ipv4: true,
        enable_ipv6: false,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Hetzner createServer failed (${res.status}): ${err}`);
  }

  const json = await res.json();
  return json.server as HetznerServer;
}

// Get server details (for polling status)
export async function getServer(serverId: number): Promise<HetznerServer> {
  const res = await fetch(`${HETZNER_API}/servers/${serverId}`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Hetzner getServer failed (${res.status})`);
  }

  const json = await res.json();
  return json.server as HetznerServer;
}

// Delete a server (called when agent is stopped/deleted)
export async function deleteServer(serverId: number): Promise<void> {
  const res = await fetch(`${HETZNER_API}/servers/${serverId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok && res.status !== 404) {
    throw new Error(`Hetzner deleteServer failed (${res.status})`);
  }
}
