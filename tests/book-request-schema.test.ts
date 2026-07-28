import { describe, expect, it } from "vitest";
import {
  bookRequestSchema,
  normalizeBookRequestInput,
} from "@/lib/validations/book-request";

const validRequest = {
  publicationSlug: "bvsdq-csrdq-framework",
  fullName: "Ada Lovelace",
  organization: "Analytical Engines Ltd",
  email: "ada@example.com",
  phone: "+267 70 000 000",
  country: "Botswana",
  quantity: 2,
  message: "Please advise on institutional copies.",
  consent: true as const,
};

describe("bookRequestSchema", () => {
  it("accepts a valid book request", () => {
    const result = bookRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.quantity).toBe(2);
    }
  });

  it("defaults quantity to 1 when omitted after normalize", () => {
    const normalized = normalizeBookRequestInput({
      ...validRequest,
      quantity: "",
      organization: "",
      phone: "",
      message: "",
      email: "Ada@Example.COM",
    });

    expect(normalized.quantity).toBe(1);
    expect(normalized.organization).toBeUndefined();
    expect(normalized.email).toBe("ada@example.com");

    const result = bookRequestSchema.safeParse(normalized);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.quantity).toBe(1);
    }
  });

  it("rejects invalid quantity and missing publication", () => {
    const result = bookRequestSchema.safeParse({
      ...validRequest,
      publicationSlug: "",
      quantity: 0,
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("preserves honeypot website values for spam detection", () => {
    const normalized = normalizeBookRequestInput({
      ...validRequest,
      website: "bot-filled",
    });
    expect(normalized.website).toBe("bot-filled");
  });
});
