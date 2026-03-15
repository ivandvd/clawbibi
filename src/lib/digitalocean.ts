// DigitalOcean API client
// Docs: https://docs.digitalocean.com/reference/api/
// Required env: DO_API_KEY

const DO_API = "https://api.digitalocean.com/v2";

function getHeaders() {
  const key = process.env.DO_API_KEY;
  if (!key) throw new Error("DO_API_KEY is not set. Add it to .env.local.");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export interface DigitalOceanDroplet {
  id: number;
  name: string;
  status: "new" | "active" | "off" | "archive";
  networks: {
    v4: { ip_address: string; type: "public" | "private" }[];
    v6: { ip_address: string; type: "public" }[];
  };
}

// Create a new Droplet with a cloud-init user_data script
export async function createDroplet(opts: {
  name: string;
  userData: string;
}): Promise<DigitalOceanDroplet> {
  const res = await fetch(`${DO_API}/droplets`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name: opts.name,
      region: "sgp1",             // Singapore — closest to Philippines / SEA
      size: "s-1vcpu-1gb",        // 1 vCPU, 1 GB RAM — $6/mo
      image: "ubuntu-24-04-x64",
      user_data: opts.userData,
      ipv6: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DigitalOcean createDroplet failed (${res.status}): ${err}`);
  }

  const json = await res.json();
  return json.droplet as DigitalOceanDroplet;
}

// Get Droplet details (use for polling IP / status)
export async function getDroplet(dropletId: number): Promise<DigitalOceanDroplet> {
  const res = await fetch(`${DO_API}/droplets/${dropletId}`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error(`DigitalOcean getDroplet failed (${res.status})`);
  }

  const json = await res.json();
  return json.droplet as DigitalOceanDroplet;
}

// Delete a Droplet (called when agent is stopped/deleted)
export async function deleteDroplet(dropletId: number): Promise<void> {
  const res = await fetch(`${DO_API}/droplets/${dropletId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok && res.status !== 404) {
    throw new Error(`DigitalOcean deleteDroplet failed (${res.status})`);
  }
}

// Poll until the Droplet has a public IPv4 address (DO assigns it asynchronously, usually ~30s)
export async function waitForDropletIp(
  dropletId: number,
  maxAttempts = 24,
  intervalMs = 10_000
): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, intervalMs));
    const droplet = await getDroplet(dropletId);
    const publicIp = droplet.networks.v4.find((n) => n.type === "public")?.ip_address;
    if (publicIp) return publicIp;
  }
  throw new Error(`DigitalOcean Droplet ${dropletId}: IP not assigned after ${maxAttempts} attempts`);
}
