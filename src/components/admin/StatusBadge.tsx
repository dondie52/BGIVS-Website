import type { ContentStatus, EnquiryStatus } from "@/types/database";

const enquiryStyles: Record<EnquiryStatus, string> = {
  new: "bg-blue/10 text-blue border-blue/20",
  in_progress: "bg-gold/15 text-navy border-gold/40",
  responded: "bg-emerald-50 text-emerald-800 border-emerald-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
  spam: "bg-red-50 text-red-700 border-red-200",
};

const contentStyles: Record<ContentStatus, string> = {
  draft: "bg-slate-100 text-slate-600 border-slate-200",
  published: "bg-emerald-50 text-emerald-800 border-emerald-200",
  archived: "bg-amber-50 text-amber-800 border-amber-200",
};

const enquiryLabels: Record<EnquiryStatus, string> = {
  new: "New",
  in_progress: "In progress",
  responded: "Responded",
  closed: "Closed",
  spam: "Spam",
};

const contentLabels: Record<ContentStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export function StatusBadge({
  status,
  kind = "enquiry",
}: {
  status: EnquiryStatus | ContentStatus | string;
  kind?: "enquiry" | "content";
}) {
  const className =
    kind === "content"
      ? contentStyles[status as ContentStatus] ?? "bg-slate-100 text-slate-600 border-slate-200"
      : enquiryStyles[status as EnquiryStatus] ?? "bg-slate-100 text-slate-600 border-slate-200";

  const label =
    kind === "content"
      ? contentLabels[status as ContentStatus] ?? status
      : enquiryLabels[status as EnquiryStatus] ?? status;

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold capitalize ${className}`}
    >
      {label}
    </span>
  );
}
