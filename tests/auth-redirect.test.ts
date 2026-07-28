import { describe, expect, it } from "vitest";
import { isSafeRedirectPath } from "@/lib/admin/redirect";

describe("isSafeRedirectPath", () => {
  it("allows relative /admin paths", () => {
    expect(isSafeRedirectPath("/admin")).toBe(true);
    expect(isSafeRedirectPath("/admin/enquiries")).toBe(true);
    expect(isSafeRedirectPath("/admin/enquiries/abc")).toBe(true);
  });

  it("rejects open redirects and non-admin paths", () => {
    expect(isSafeRedirectPath(null)).toBe(false);
    expect(isSafeRedirectPath("")).toBe(false);
    expect(isSafeRedirectPath("/contact")).toBe(false);
    expect(isSafeRedirectPath("//evil.example")).toBe(false);
    expect(isSafeRedirectPath("https://evil.example")).toBe(false);
    expect(isSafeRedirectPath("/admin\\..\\evil")).toBe(false);
    expect(isSafeRedirectPath("/admin/../https://evil.example")).toBe(false);
  });
});
