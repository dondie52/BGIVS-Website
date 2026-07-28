import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateBookRequestAction } from "@/lib/admin/actions/enquiries";
import { ENQUIRY_STATUSES, formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BookRequestDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data: request } = await supabase
    .from("book_requests")
    .select("*, publications:publication_id(id, title, slug)")
    .eq("id", id)
    .maybeSingle();

  if (!request) notFound();

  const publication = request.publications as
    | { id: string; title: string; slug: string }
    | null;

  return (
    <div>
      <AdminHeader
        title={request.full_name}
        description={`Submitted ${formatDateTime(request.submitted_at)}`}
        actions={
          <Link
            href="/admin/book-requests"
            className="text-sm font-semibold text-blue hover:underline"
          >
            Back to list
          </Link>
        }
      />

      <FlashMessage message={saved ? "Request updated." : error} tone={error ? "error" : "success"} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-border bg-white p-6">
          <div className="mb-4">
            <StatusBadge status={request.status} />
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Item label="Email">
              <a href={`mailto:${request.email}`} className="text-blue hover:underline">
                {request.email}
              </a>
            </Item>
            <Item label="Phone">
              {request.phone ? (
                <a href={`tel:${request.phone}`} className="text-blue hover:underline">
                  {request.phone}
                </a>
              ) : (
                "—"
              )}
            </Item>
            <Item label="Organization">{request.organization || "—"}</Item>
            <Item label="Country">{request.country || "—"}</Item>
            <Item label="Quantity">{String(request.quantity)}</Item>
            <Item label="Publication">
              {publication ? (
                <Link
                  href={`/research/${publication.slug}`}
                  className="text-blue hover:underline"
                  target="_blank"
                >
                  {publication.title}
                </Link>
              ) : (
                "—"
              )}
            </Item>
          </dl>
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-navy">Message</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted">
              {request.message || "—"}
            </p>
          </div>
        </section>

        <form action={updateBookRequestAction} className="rounded-lg border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-navy">Update status</h2>
          <input type="hidden" name="id" value={request.id} />
          <label className="mt-4 block text-sm">
            <span className="mb-1 block font-semibold text-navy">Status</span>
            <select
              name="status"
              defaultValue={request.status}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            >
              {ENQUIRY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="mt-4 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-navy">{children}</dd>
    </div>
  );
}
