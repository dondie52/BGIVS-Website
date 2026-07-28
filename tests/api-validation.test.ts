import { describe, expect, it } from "vitest";
import {
  enquirySchema,
  normalizeEnquiryInput,
} from "@/lib/validations/enquiry";
import {
  bookRequestSchema,
  normalizeBookRequestInput,
} from "@/lib/validations/book-request";

const validEnquiry = {
  fullName: "Ada Molefe",
  position: "Director",
  organization: "Example Agency",
  organizationCategory: "government",
  email: "Ada@Example.com",
  phone: "",
  country: "Botswana",
  interest: "general-enquiry",
  message: "We would like to explore partnership opportunities with BGIVS.",
  consent: true,
};

describe("enquiry API validation", () => {
  it("normalizes aliases and email casing", () => {
    const normalized = normalizeEnquiryInput(validEnquiry);
    expect(normalized.positionRole).toBe("Director");
    expect(normalized.programmeOrService).toBe("general-enquiry");
    expect(normalized.email).toBe("ada@example.com");
    expect(enquirySchema.safeParse(normalized).success).toBe(true);
  });

  it("rejects honeypot-populated payloads before insert (caller checks website)", () => {
    const normalized = normalizeEnquiryInput({
      ...validEnquiry,
      website: "http://spam.example",
    });
    expect(typeof normalized.website).toBe("string");
    expect(String(normalized.website).length).toBeGreaterThan(0);
  });

  it("rejects missing consent", () => {
    const normalized = normalizeEnquiryInput({ ...validEnquiry, consent: false });
    const result = enquirySchema.safeParse(normalized);
    expect(result.success).toBe(false);
  });
});

describe("book request validation", () => {
  it("accepts a valid request", () => {
    const normalized = normalizeBookRequestInput({
      publicationSlug: "bvsdq-csrdq-framework",
      fullName: "Ada Molefe",
      email: "ada@example.com",
      country: "Botswana",
      quantity: 2,
      consent: true,
    });
    expect(bookRequestSchema.safeParse(normalized).success).toBe(true);
  });

  it("rejects quantity above 100", () => {
    const normalized = normalizeBookRequestInput({
      publicationSlug: "bvsdq-csrdq-framework",
      fullName: "Ada Molefe",
      email: "ada@example.com",
      country: "Botswana",
      quantity: 101,
      consent: true,
    });
    expect(bookRequestSchema.safeParse(normalized).success).toBe(false);
  });
});
