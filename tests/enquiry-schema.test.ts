import { describe, expect, it } from "vitest";
import {
  enquirySchema,
  normalizeEnquiryInput,
} from "@/lib/validations/enquiry";

const validEnquiry = {
  fullName: "Ada Lovelace",
  positionRole: "Research Lead",
  organization: "Analytical Engines Ltd",
  organizationCategory: "Corporation",
  email: "ada@example.com",
  phone: "+267 70 000 000",
  country: "Botswana",
  programmeOrService: "institutional-research",
  message:
    "We would like to explore a governance and value-systems engagement with BGIVS.",
  consent: true as const,
};

describe("enquirySchema", () => {
  it("accepts a valid enquiry payload", () => {
    const result = enquirySchema.safeParse(validEnquiry);
    expect(result.success).toBe(true);
  });

  it("rejects short messages and missing consent", () => {
    const result = enquirySchema.safeParse({
      ...validEnquiry,
      message: "Too short",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("maps legacy field names and lowercases email", () => {
    const normalized = normalizeEnquiryInput({
      fullName: "  Ada Lovelace ",
      position: " Analyst ",
      organization: " BGIVS Partner ",
      organizationCategory: "NGO",
      email: "Ada@Example.COM",
      phone: "",
      country: "Botswana",
      interest: "governance-and-value-systems-consulting",
      message: validEnquiry.message,
      consent: true,
      website: "",
    });

    expect(normalized.positionRole).toBe("Analyst");
    expect(normalized.programmeOrService).toBe(
      "governance-and-value-systems-consulting",
    );
    expect(normalized.email).toBe("ada@example.com");
    expect(normalized.phone).toBeUndefined();
    expect(normalized.website).toBeUndefined();

    const parsed = enquirySchema.safeParse(normalized);
    expect(parsed.success).toBe(true);
  });

  it("preserves honeypot website values for spam detection", () => {
    const normalized = normalizeEnquiryInput({
      ...validEnquiry,
      website: "http://spam.example",
    });
    expect(normalized.website).toBe("http://spam.example");
  });
});
