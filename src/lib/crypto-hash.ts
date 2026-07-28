/**
 * Pure SHA-256 hex digest for rate-limit bucket hashing (and tests).
 */
export async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Builds the opaque rate-limit bucket hash from secret + IP + endpoint.
 * Never store the raw IP — only this hash.
 */
export async function rateLimitBucketHash(
  secret: string,
  ip: string,
  endpoint: string,
): Promise<string> {
  return sha256Hex(`${secret}:${ip}:${endpoint}`);
}
