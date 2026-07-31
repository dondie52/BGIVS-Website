"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  interestCategories,
  organizationCategories,
} from "@/content/contact";
import { FormStatus } from "@/components/ui/FormStatus";
import { Button } from "@/components/ui/Button";
import {
  hasFormErrors,
  validateContactForm,
  type ContactFormValues,
  type FormErrors,
} from "@/lib/form";

const initialValues: ContactFormValues = {
  fullName: "",
  position: "",
  organization: "",
  organizationCategory: "",
  email: "",
  phone: "",
  country: "",
  interest: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultInterest = searchParams.get("interest") ?? "";
  const defaultMessage = searchParams.get("message") ?? "";

  const seeded = useMemo(
    () => ({
      ...initialValues,
      interest: interestCategories.some((i) => i.value === defaultInterest)
        ? defaultInterest
        : defaultInterest
          ? "general-enquiry"
          : "",
      message: defaultMessage,
    }),
    [defaultInterest, defaultMessage],
  );

  const [values, setValues] = useState<ContactFormValues>(seeded);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();

  function updateField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function focusFirstInvalid(nextErrors: FormErrors) {
    const order: (keyof ContactFormValues)[] = [
      "fullName",
      "position",
      "organization",
      "organizationCategory",
      "email",
      "phone",
      "country",
      "interest",
      "message",
      "consent",
    ];
    const first = order.find((key) => nextErrors[key]);
    if (!first) return;
    const el = document.getElementById(first);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el instanceof HTMLElement) el.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (hasFormErrors(nextErrors)) {
      setStatus("idle");
      setStatusMessage(undefined);
      focusFirstInvalid(nextErrors);
      return;
    }

    setStatus("loading");
    setStatusMessage(undefined);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          sourcePage:
            typeof window !== "undefined" ? window.location.pathname : "/contact",
          referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        errors?: FormErrors;
      } | null;

      if (response.status === 400 && payload?.errors) {
        setErrors(payload.errors);
        setStatus("error");
        setStatusMessage(payload.message ?? "Please review the highlighted fields.");
        focusFirstInvalid(payload.errors);
        return;
      }

      if (response.status === 429) {
        setStatus("error");
        setStatusMessage(
          payload?.message ??
            "Too many requests have been submitted. Please try again later.",
        );
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(
          payload?.message ??
            "We could not submit your enquiry at this time. Please try again or email info@BGIVS.com.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage(payload?.message);
      setValues(initialValues);
    } catch {
      setStatus("error");
      setStatusMessage(
        "We could not submit your enquiry at this time. Please try again or email info@BGIVS.com.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="form-privacy">
      <FormStatus
        status={status}
        successMessage={statusMessage}
        errorMessage={statusMessage}
      />

      {/* Anti-spam honeypot — leave empty */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="fullName"
          label="Full name"
          required
          error={errors.fullName}
          value={values.fullName}
          onChange={(v) => updateField("fullName", v)}
        />
        <Field
          id="position"
          label="Position or role"
          required
          error={errors.position}
          value={values.position}
          onChange={(v) => updateField("position", v)}
        />
        <Field
          id="organization"
          label="Organization"
          required
          error={errors.organization}
          value={values.organization}
          onChange={(v) => updateField("organization", v)}
        />
        <SelectField
          id="organizationCategory"
          label="Organization category"
          required
          error={errors.organizationCategory}
          value={values.organizationCategory}
          onChange={(v) => updateField("organizationCategory", v)}
          options={organizationCategories}
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          required
          error={errors.email}
          value={values.email}
          onChange={(v) => updateField("email", v)}
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Phone number"
          type="tel"
          error={errors.phone}
          value={values.phone}
          onChange={(v) => updateField("phone", v)}
          autoComplete="tel"
        />
        <Field
          id="country"
          label="Country"
          required
          error={errors.country}
          value={values.country}
          onChange={(v) => updateField("country", v)}
        />
        <SelectField
          id="interest"
          label="Programme or service of interest"
          required
          error={errors.interest}
          value={values.interest}
          onChange={(v) => updateField("interest", v)}
          options={interestCategories}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          Message <span className="text-red-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass(Boolean(errors.message))}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-red-700" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-border text-navy focus:ring-royal-blue"
            checked={values.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : "form-privacy"}
          />
          <span>
            I consent to Babobiz Global Institute of Value Systems contacting me about this
            enquiry and processing the information I provide for that purpose.{" "}
            <span className="text-red-700">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-1.5 text-sm text-red-700" role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <p id="form-privacy" className="text-xs text-muted">
        BGIVS will use your details only to respond to this enquiry. See our{" "}
        <a href="/privacy" className="font-semibold text-blue hover:underline">
          Privacy Notice
        </a>{" "}
        for more information.
      </p>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Submit Enquiry"}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-md border px-3 py-2.5 text-sm text-navy shadow-sm transition-all duration-200 hover:border-border/70 focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20 ${
    hasError ? "border-red-500 hover:border-red-400" : "border-border"
  }`;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required ? <span className="text-red-700">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(Boolean(error))}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required ? <span className="text-red-700">*</span> : null}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(Boolean(error))}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({
  defaultInterest,
  heading = "Send an enquiry",
}: {
  defaultInterest?: string;
  heading?: string;
}) {
  return (
    <div className="institutional-card p-6 sm:p-8">
      <h3 className="text-xl text-navy">{heading}</h3>
      <p className="mt-2 text-sm text-muted">
        Share a few details and BGIVS will respond using the contact information you provide.
      </p>
      <div className="mt-6">
        <ContactForm />
      </div>
      {defaultInterest ? (
        <p className="sr-only">Default interest: {defaultInterest}</p>
      ) : null}
    </div>
  );
}
