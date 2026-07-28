import {
  enquiryFieldErrors,
  enquirySchema,
  normalizeEnquiryInput,
  type EnquiryInput,
} from "@/lib/validations/enquiry";

/**
 * Legacy client form shape (ContactForm field names).
 */
export type ContactFormValues = {
  fullName: string;
  position: string;
  organization: string;
  organizationCategory: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  message: string;
  consent: boolean;
  website?: string;
};

export type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type { EnquiryInput };

export {
  enquirySchema,
  normalizeEnquiryInput,
  enquiryFieldErrors,
} from "@/lib/validations/enquiry";

/**
 * Client-side validation compatible with existing ContactForm fields.
 */
export function validateContactForm(values: ContactFormValues): FormErrors {
  const normalized = normalizeEnquiryInput({
    fullName: values.fullName,
    position: values.position,
    organization: values.organization,
    organizationCategory: values.organizationCategory,
    email: values.email,
    phone: values.phone,
    country: values.country,
    interest: values.interest,
    message: values.message,
    consent: values.consent,
    website: values.website,
  });

  // Honeypot is ignored for client validation.
  delete normalized.website;

  const result = enquirySchema.safeParse(normalized);
  if (result.success) return {};

  const mapped = enquiryFieldErrors(result.error);
  const errors: FormErrors = {};

  if (mapped.fullName) errors.fullName = mapped.fullName;
  if (mapped.position || mapped.positionRole) {
    errors.position = mapped.position ?? mapped.positionRole;
  }
  if (mapped.organization) errors.organization = mapped.organization;
  if (mapped.organizationCategory) {
    errors.organizationCategory = mapped.organizationCategory;
  }
  if (mapped.email) errors.email = mapped.email;
  if (mapped.phone) errors.phone = mapped.phone;
  if (mapped.country) errors.country = mapped.country;
  if (mapped.interest || mapped.programmeOrService) {
    errors.interest = mapped.interest ?? mapped.programmeOrService;
  }
  if (mapped.message) errors.message = mapped.message;
  if (mapped.consent) errors.consent = mapped.consent;

  return errors;
}

export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
