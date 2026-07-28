export function FlashMessage({
  message,
  tone = "success",
}: {
  message?: string | null;
  tone?: "success" | "error" | "info";
}) {
  if (!message) return null;

  const styles =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : tone === "info"
        ? "border-blue/20 bg-blue/5 text-navy"
        : "border-emerald-200 bg-emerald-50 text-emerald-900";

  return (
    <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${styles}`} role="status">
      {message}
    </div>
  );
}
