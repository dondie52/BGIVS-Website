import { CONTENT_STATUSES } from "@/lib/admin/helpers";
import type { Database } from "@/types/database";

type Programme = Database["public"]["Tables"]["programmes"]["Row"];

export function ProgrammeForm({
  action,
  programme,
}: {
  action: (formData: FormData) => Promise<void>;
  programme?: Programme;
}) {
  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-white p-6">
      {programme ? <input type="hidden" name="id" value={programme.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledInput label="Title" name="title" defaultValue={programme?.title} required />
        <LabeledInput
          label="Slug"
          name="slug"
          defaultValue={programme?.slug}
          hint="Leave blank to auto-generate from title on create."
        />
        <LabeledInput label="Icon" name="icon" defaultValue={programme?.icon ?? ""} />
        <LabeledInput
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(programme?.sort_order ?? 0)}
        />
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Status</span>
          <select
            name="status"
            defaultValue={programme?.status ?? "draft"}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          >
            {CONTENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <LabeledTextarea
        label="Short description"
        name="short_description"
        defaultValue={programme?.short_description ?? ""}
        rows={3}
      />
      <LabeledTextarea
        label="Full description"
        name="full_description"
        defaultValue={programme?.full_description ?? ""}
        rows={6}
      />
      <LabeledTextarea
        label="Challenges (one per line)"
        name="challenges"
        defaultValue={(programme?.challenges ?? []).join("\n")}
        rows={4}
      />
      <LabeledTextarea
        label="Activities (one per line)"
        name="activities"
        defaultValue={(programme?.activities ?? []).join("\n")}
        rows={4}
      />
      <LabeledTextarea
        label="Beneficiaries (one per line)"
        name="beneficiaries"
        defaultValue={(programme?.beneficiaries ?? []).join("\n")}
        rows={4}
      />
      <LabeledTextarea
        label="Outcomes (one per line)"
        name="outcomes"
        defaultValue={(programme?.outcomes ?? []).join("\n")}
        rows={4}
      />
      <button
        type="submit"
        className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy"
      >
        {programme ? "Save programme" : "Create programme"}
      </button>
    </form>
  );
}

function LabeledInput(props: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold text-navy">
        {props.label}
        {props.required ? <span className="text-red-700"> *</span> : null}
      </span>
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        defaultValue={props.defaultValue}
        className="w-full rounded-md border border-border px-3 py-2 text-sm"
      />
      {props.hint ? <span className="mt-1 block text-xs text-muted">{props.hint}</span> : null}
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
