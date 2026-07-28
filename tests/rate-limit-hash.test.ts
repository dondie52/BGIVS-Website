import { describe, expect, it } from "vitest";
import { rateLimitBucketHash, sha256Hex } from "@/lib/crypto-hash";
import { normalizeEnquiryInput } from "@/lib/validations/enquiry";

describe("rate-limit hash", () => {
  it("produces a stable sha256 hex digest", async () => {
    const digest = await sha256Hex("bgivs-test");
    expect(digest).toMatch(/^[a-f0-9]{64}$/);
    expect(digest).toBe(await sha256Hex("bgivs-test"));
  });

  it("hashes secret, ip, and endpoint without exposing the raw ip", async () => {
    const hash = await rateLimitBucketHash("secret", "203.0.113.10", "enquiries");
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hash).not.toContain("203.0.113.10");
    expect(hash).not.toBe(
      await rateLimitBucketHash("secret", "203.0.113.11", "enquiries"),
    );
  });
});

describe("honeypot normalize behavior", () => {
  it("keeps non-empty website values so API routes can short-circuit", () => {
    const normalized = normalizeEnquiryInput({
      fullName: "Bot",
      position: "x",
      organization: "x",
      organizationCategory: "NGO",
      email: "bot@example.com",
      country: "BW",
      interest: "institutional-research",
      message: "This is a sufficiently long spam message for testing.",
      consent: true,
      website: "filled-by-bot",
    });

    expect(normalized.website).toBe("filled-by-bot");
  });

  it("clears empty website strings", () => {
    const normalized = normalizeEnquiryInput({ website: "" });
    expect(normalized.website).toBeUndefined();
  });
});
