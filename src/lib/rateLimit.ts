// Simple in-memory rate limiter for API routes.
// In a Vercel serverless environment this resets on cold starts — sufficient for
// burst protection. For cross-instance persistence configure Upstash Redis and
// swap this module for @upstash/ratelimit.

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

/**
 * Check whether a request is within the allowed rate.
 *
 * @param key      Unique bucket identifier, e.g. `"create-agent:${userId}"`
 * @param limit    Maximum requests allowed per window
 * @param windowMs Window length in milliseconds
 * @returns `{ allowed, remaining, resetAt }`
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: Date } {
  const now = Date.now();
  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { allowed: true, remaining: limit - 1, resetAt: new Date(entry.resetAt) };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: new Date(entry.resetAt) };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetAt: new Date(entry.resetAt) };
}
