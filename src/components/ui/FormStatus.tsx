type FormStatusProps = {
  status: "idle" | "loading" | "success" | "error";
  successMessage?: string;
  errorMessage?: string;
};

export function FormStatus({
  status,
  successMessage = "Thank you. Your enquiry has been received. BGIVS will respond using the contact details you provided.",
  errorMessage = "Something went wrong while submitting your enquiry. Please try again or email kabisoilw@gmail.com.",
}: FormStatusProps) {
  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-border bg-off-white px-4 py-3 text-sm text-muted"
      >
        Sending your enquiry…
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900"
      >
        {successMessage ||
          "Thank you. Your enquiry has been received. BGIVS will respond using the contact details you provided."}
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      {errorMessage ||
        "Something went wrong while submitting your enquiry. Please try again or email kabisoilw@gmail.com."}
    </div>
  );
}
