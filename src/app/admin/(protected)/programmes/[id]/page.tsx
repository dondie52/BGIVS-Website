import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { updateProgrammeAction } from "@/lib/admin/actions/content";
import { CONTENT_STATUSES } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProgrammeEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data } = await supabase.from("programmes").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <AdminHeader
        title="Edit programme"
        description={data.title}
        actions={
          <Link href="/admin/programmes" className="text-sm font-semibold text-blue hover:underline">
            Back to list
          </Link>
        }
      />
      <FlashMessage message={saved ? "Programme saved." : error} tone={error ? "error" : "success"} />

      <form action={updateProgrammeAction} className="space-y-5 rounded-lg border border-border bg-white p-6">
        <input type="hidden" name="id" value={data.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <LabeledInput label="Title" name="title" defaultValue={data.title} required />
          <LabeledInput label="Slug" name="slug" defaultValue={data.slug} required />
          <LabeledInput label="Icon" name="icon" defaultValue={data.icon ?? ""} />
          <LabeledInput label="Sort order" name="sort_order" type="number" defaultValue={String(data.sort_order)} />
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
        <LabeledTextarea label="Short description" name="short_description" defaultValue={data.short_description ?? ""} rows={3} />
        <LabeledTextarea label="Full description" name="full_description" defaultValue={data.full_description ?? ""} rows={6} />
        <LabeledTextarea label="Challenges (one per line)" name="challenges" defaultValue={data.challenges.join("\n")} rows={4} />
        <LabeledTextarea label="Activities (one per line)" name="activities" defaultValue={data.activities.join("\n")} rows={4} />
        <LabeledTextarea label="Beneficiaries (one per line)" name="beneficiaries" defaultValue={data.beneficiaries.join("\n")} rows={4} />
        <LabeledTextarea label="Outcomes (one per line)" name="outcomes" defaultValue={data.outcomes.join("\n")} rows={4} />
        <button type="submit" className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy">
          Save programme
        </button>
      </form>
    </div>
  );
}

function LabeledInput(props: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold text-navy">{props.label}</span>
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        defaultValue={props.defaultValue}
        className="w-full rounded-md border border-border px-3 py-2 text-sm"
      />
    </label>
  );
}

function LabeledTextarea(props: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold text-navy">{props.label}</span>
      <textarea
        name={props.name}
        rows={props.rows ?? 4}
        defaultValue={props.defaultValue}
        className="w-full rounded-md border border-border px-3 py-2 text-sm"
      />
    </label>
  );
}
