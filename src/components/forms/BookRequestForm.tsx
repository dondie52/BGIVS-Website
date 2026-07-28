"use client";

import { useState } from "react";
import { FormStatus } from "@/components/ui/FormStatus";
import { Button } from "@/components/ui/Button";

type Values = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  country: string;
  quantity: string;
  message: string;
  consent: boolean;
  website: string;
};

const initial: Values = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  country: "",
  quantity: "1",
  message: "",
  consent: false,
  website: "",
};

export function BookRequestForm({
  publicationSlug,
  publicationTitle,
}: {
  publicationSlug: string;
  publicationTitle: string;
}) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validate(): Partial<Record<keyof Values, string>> {
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!values.email.trim() || !values.email.includes("@")) {
      next.email = "Please enter a valid email address.";
    }
    if (values.country.trim().length < 2) next.country = "Please enter your country.";
    const qty = Number(values.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 100) {
      next.quantity = "Quantity must be between 1 and 100.";
    }
    if (!values.consent) next.consent = "Please confirm consent.";
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/book-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicationSlug,
          fullName: values.fullName,
          organization: values.organization || undefined,
          email: values.email,
          phone: values.phone || undefined,
          country: values.country,
          quantity: Number(values.quantity),
          message: values.message || undefined,
          consent: values.consent,
          website: values.website || undefined,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          errors?: Record<string, string>;
          message?: string;
        } | null;
        if (body?.errors) {
          setErrors(body.errors as Partial<Record<keyof Values, string>>);
        }
        throw new Error(body?.message || "Request failed");
      }
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FormStatus
        status={status}
        successMessage={`Thank you. Your request for “${publicationTitle}” has been received.`}
      />

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="fullName"
          label="Full name"
          required
          value={values.fullName}
          error={errors.fullName}
          onChange={(v) => update("fullName", v)}
        />
        <Field
          id="organization"
          label="Organization"
          value={values.organization}
          error={errors.organization}
          onChange={(v) => update("organization", v)}
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Phone number"
          type="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
          autoComplete="tel"
        />
        <Field
          id="country"
          label="Country"
          required
          value={values.country}
          error={errors.country}
          onChange={(v) => update("country", v)}
        />
        <Field
          id="quantity"
          label="Quantity"
          type="number"
          required
          value={values.quantity}
          error={errors.quantity}
          onChange={(v) => update("quantity", v)}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={inputClass(Boolean(errors.message))}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-border text-navy focus:ring-royal-blue"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            I consent to BGIVS contacting me about this book request.{" "}
            <span className="text-red-700">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 text-sm text-red-700" role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Submit request"}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-md border px-3 py-2.5 text-sm text-navy shadow-sm focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20 ${
    hasError ? "border-red-500" : "border-border"
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
        className={inputClass(Boolean(error))}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <p className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
