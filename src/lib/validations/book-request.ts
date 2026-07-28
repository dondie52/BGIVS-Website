import { z } from "zod";

export const bookRequestSchema = z.object({
  publicationSlug: z
    .string()
    .trim()
    .min(1, "Please select a publication."),
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Full name must be 120 characters or fewer."),
  organization: z
    .string()
    .trim()
    .max(180, "Organization must be 180 characters or fewer.")
    .optional(),
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
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .max(100, "Quantity must be 100 or fewer.")
    .default(1),
  message: z
    .string()
    .trim()
    .max(5000, "Message must be 5000 characters or fewer.")
    .optional(),
  consent: z.literal(true, {
    error:
      "Please confirm that you consent to BGIVS contacting you about this request.",
  }),
  website: z.string().optional(),
  sourcePage: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
  turnstileToken: z.string().optional(),
});

export type BookRequestInput = z.infer<typeof bookRequestSchema>;

function asRecord(raw: unknown): Record<string, unknown> {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return { ...(raw as Record<string, unknown>) };
  }
  return {};
}

export function normalizeBookRequestInput(raw: unknown): Record<string, unknown> {
  const input = asRecord(raw);
  const next: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    next[key] = typeof value === "string" ? value.trim() : value;
  }

  if (typeof next.email === "string") {
    next.email = next.email.toLowerCase();
  }

  for (const key of ["organization", "phone", "message", "website"] as const) {
    if (next[key] === "") next[key] = undefined;
  }

  if (next.quantity == null || next.quantity === "") {
    next.quantity = 1;
  }

  return next;
}

export function bookRequestFieldErrors(
  zodError: z.ZodError,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of zodError.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}
