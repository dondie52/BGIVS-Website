import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { updateServiceAction } from "@/lib/admin/actions/content";
import { CONTENT_STATUSES } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ServiceEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <AdminHeader
        title="Edit service"
        description={data.title}
        actions={
          <Link href="/admin/services" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={saved ? "Service saved." : error} tone={error ? "error" : "success"} />

      <form action={updateServiceAction} className="space-y-5 rounded-lg border border-border bg-white p-6">
        <input type="hidden" name="id" value={data.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-navy">Title</span>
            <input name="title" required defaultValue={data.title} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-navy">Slug</span>
            <input name="slug" required defaultValue={data.slug} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-navy">Icon</span>
            <input name="icon" defaultValue={data.icon ?? ""} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-navy">Sort order</span>
            <input name="sort_order" type="number" defaultValue={String(data.sort_order)} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy">Status</span>
            <select name="status" defaultValue={data.status} className="w-full rounded-md border border-border px-3 py-2 text-sm">
              {CONTENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Short description</span>
          <textarea name="short_description" rows={3} defaultValue={data.short_description ?? ""} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Full description</span>
          <textarea name="full_description" rows={6} defaultValue={data.full_description ?? ""} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Intended for (one per line)</span>
          <textarea name="intended_for" rows={4} defaultValue={data.intended_for.join("\n")} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Areas covered (one per line)</span>
          <textarea name="areas_covered" rows={4} defaultValue={data.areas_covered.join("\n")} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Expected value (one per line)</span>
          <textarea name="expected_value" rows={4} defaultValue={data.expected_value.join("\n")} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </label>
        <button type="submit" className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy">
          Save service
        </button>
      </form>
    </div>
  );
}
