import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Full name must be 120 characters or fewer."),
  positionRole: z
    .string()
    .trim()
    .min(2, "Please enter your position or role.")
    .max(120, "Position or role must be 120 characters or fewer."),
  organization: z
    .string()
    .trim()
    .min(2, "Please enter your organization.")
    .max(180, "Organization must be 180 characters or fewer."),
  organizationCategory: z
    .string()
    .trim()
    .min(1, "Please select an organization category."),
  email: z
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone must be 40 characters or fewer.")
    .optional(),
  country: z
    .string()
    .trim()
    .min(2, "Please enter your country.")
    .max(100, "Country must be 100 characters or fewer."),
  programmeOrService: z
    .string()
    .trim()
    .min(1, "Please select a programme or service of interest."),
  message: z
    .string()
    .trim()
    .min(20, "Please provide a message of at least 20 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
  consent: z.literal(true, {
    error: "Please confirm that you consent to BGIVS contacting you about this enquiry.",
  }),
  website: z.string().optional(),
  sourcePage: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

function asRecord(raw: unknown): Record<string, unknown> {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return { ...(raw as Record<string, unknown>) };
  }
  return {};
}

function trimStrings(input: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    next[key] = typeof value === "string" ? value.trim() : value;
  }
  return next;
}

/**
 * Maps legacy form field names and normalizes string values before Zod parse.
 * - position -> positionRole
 * - interest -> programmeOrService
 */
export function normalizeEnquiryInput(raw: unknown): Record<string, unknown> {
  const input = asRecord(raw);
  const mapped: Record<string, unknown> = { ...input };

  if (mapped.positionRole == null && mapped.position != null) {
    mapped.positionRole = mapped.position;
  }
  if (mapped.programmeOrService == null && mapped.interest != null) {
    mapped.programmeOrService = mapped.interest;
  }

  const trimmed = trimStrings(mapped);

  if (typeof trimmed.email === "string") {
    trimmed.email = trimmed.email.toLowerCase();
  }

  if (trimmed.phone === "") {
    trimmed.phone = undefined;
  }

  if (trimmed.website === "") {
    trimmed.website = undefined;
  }

  return trimmed;
}

export function enquiryFieldErrors(
  zodError: z.ZodError,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of zodError.issues) {
    const key = issue.path[0];
    if (typeof key !== "string" || errors[key]) continue;

    // Map schema field names back to legacy form fields when useful.
    if (key === "positionRole") {
      errors.positionRole = issue.message;
      errors.position = issue.message;
    } else if (key === "programmeOrService") {
      errors.programmeOrService = issue.message;
      errors.interest = issue.message;
    } else {
      errors[key] = issue.message;
    }
  }

  return errors;
}
