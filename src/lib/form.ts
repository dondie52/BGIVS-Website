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
  website?: string; // honeypot anti-spam field
};

export type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.position.trim()) errors.position = "Please enter your position or role.";
  if (!values.organization.trim()) errors.organization = "Please enter your organization.";
  if (!values.organizationCategory)
    errors.organizationCategory = "Please select an organization category.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.country.trim()) errors.country = "Please enter your country.";
  if (!values.interest) errors.interest = "Please select a programme or service of interest.";
  if (!values.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Please provide a message of at least 20 characters.";
  }
  if (!values.consent) {
    errors.consent = "Please confirm that you consent to BGIVS contacting you about this enquiry.";
  }

  return errors;
}

export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
