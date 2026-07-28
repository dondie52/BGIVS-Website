import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  addEnquiryNoteAction,
  updateEnquiryAction,
} from "@/lib/admin/actions/enquiries";
import { ENQUIRY_STATUSES, formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EnquiryDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const [{ data: enquiry }, { data: notes }, { data: profiles }] = await Promise.all([
    supabase.from("enquiries").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("enquiry_notes")
      .select("id, note, created_at, author_id, profiles:author_id(full_name)")
      .eq("enquiry_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("active", true)
      .order("full_name"),
  ]);

  if (!enquiry) notFound();

  return (
    <div>
      <AdminHeader
        title={enquiry.full_name}
        description={`Submitted ${formatDateTime(enquiry.submitted_at)}`}
        actions={
          <Link href="/admin/enquiries" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />

      <FlashMessage message={saved ? "Enquiry updated." : error} tone={error ? "error" : "success"} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-border bg-white p-6">
          <div className="mb-4 flex items-center gap-3">
            <StatusBadge status={enquiry.status} />
            <span className="text-sm text-muted">{enquiry.organization_category}</span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <Item label="Email">
              <a href={`mailto:${enquiry.email}`} className="text-blue hover:underline">
                {enquiry.email}
              </a>
            </Item>
            <Item label="Phone">
              {enquiry.phone ? (
                <a href={`tel:${enquiry.phone}`} className="text-blue hover:underline">
                  {enquiry.phone}
                </a>
              ) : (
                "—"
              )}
            </Item>
            <Item label="Organization">{enquiry.organization || "—"}</Item>
            <Item label="Position">{enquiry.position_role || "—"}</Item>
            <Item label="Country">{enquiry.country || "—"}</Item>
            <Item label="Interest">{enquiry.programme_or_service || "—"}</Item>
            <Item label="Source page">{enquiry.source_page || "—"}</Item>
            <Item label="Last contacted">{formatDateTime(enquiry.last_contacted_at)}</Item>
          </dl>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-navy">Message</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{enquiry.message}</p>
          </div>
        </section>

        <section className="space-y-6">
          <form action={updateEnquiryAction} className="rounded-lg border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-navy">Update</h2>
            <input type="hidden" name="id" value={enquiry.id} />
            <label className="mt-4 block text-sm">
              <span className="mb-1 block font-semibold text-navy">Status</span>
              <select
                name="status"
                defaultValue={enquiry.status}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              >
                {ENQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 block text-sm">
              <span className="mb-1 block font-semibold text-navy">Assigned to</span>
              <select
                name="assigned_to"
                defaultValue={enquiry.assigned_to ?? ""}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              >
                <option value="">Unassigned</option>
                {(profiles ?? []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name || p.id} ({p.role})
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

          <div className="rounded-lg border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-navy">Notes</h2>
            <form action={addEnquiryNoteAction} className="mt-4 space-y-3">
              <input type="hidden" name="enquiry_id" value={enquiry.id} />
              <label className="block text-sm">
                <span className="mb-1 block font-semibold text-navy">Add note</span>
                <textarea
                  name="note"
                  required
                  rows={3}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm"
                />
              </label>
              <button
                type="submit"
                className="rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-off-white"
              >
                Add note
              </button>
            </form>

            <ul className="mt-6 space-y-4">
              {(notes ?? []).length === 0 ? (
                <li className="text-sm text-muted">No notes yet.</li>
              ) : (
                (notes ?? []).map((note) => {
                  const author = note.profiles as { full_name: string | null } | null;
                  return (
                    <li key={note.id} className="border-t border-border pt-4 text-sm">
                      <p className="whitespace-pre-wrap text-muted">{note.note}</p>
                      <p className="mt-2 text-xs text-muted">
                        {author?.full_name || "Staff"} · {formatDateTime(note.created_at)}
                      </p>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </section>
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
