// Cloudflare DNS API client
// Docs: https://developers.cloudflare.com/api/resources/dns/subresources/records
// Required env: CLOUDFLARE_API_KEY, CLOUDFLARE_ZONE_ID

const CF_API = "https://api.cloudflare.com/client/v4";

function getHeaders() {
  const key = process.env.CLOUDFLARE_API_KEY;
  if (!key) throw new Error("CLOUDFLARE_API_KEY is not set. Add it to .env.local.");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function getZoneId() {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  if (!zoneId) throw new Error("CLOUDFLARE_ZONE_ID is not set. Add it to .env.local.");
  return zoneId;
}

export interface CloudflareDnsRecord {
  id: string;
  name: string;
  content: string;
  type: string;
}

// Create an A record: subdomain → IP
// e.g. "abc123.clawbibi.cloud" → "1.2.3.4"
export async function createDnsRecord(subdomain: string, ip: string): Promise<CloudflareDnsRecord> {
  const res = await fetch(`${CF_API}/zones/${getZoneId()}/dns_records`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      type: "A",
      name: subdomain,   // full subdomain e.g. "abc123.clawbibi.cloud"
      content: ip,
      ttl: 60,
      proxied: false,    // not proxied — OpenClaw needs direct connection
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cloudflare createDnsRecord failed (${res.status}): ${err}`);
  }

  const json = await res.json();
  return json.result as CloudflareDnsRecord;
}

// Delete a DNS record by name (looks up the record ID first)
export async function deleteDnsRecord(subdomain: string): Promise<void> {
  const zoneId = getZoneId();

  // Look up the record by name
  const listRes = await fetch(
    `${CF_API}/zones/${zoneId}/dns_records?type=A&name=${encodeURIComponent(subdomain)}`,
    { headers: getHeaders() }
  );

  if (!listRes.ok) return; // Nothing to delete

  const listJson = await listRes.json();
  const records = listJson.result as CloudflareDnsRecord[];

  // Delete each matching record
  for (const record of records) {
    await fetch(`${CF_API}/zones/${zoneId}/dns_records/${record.id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  }
}
