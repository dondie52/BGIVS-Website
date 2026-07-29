import { CONTENT_STATUSES } from "@/lib/admin/helpers";
import type { Database } from "@/types/database";

type Service = Database["public"]["Tables"]["services"]["Row"];

export function ServiceForm({
  action,
  service,
}: {
  action: (formData: FormData) => Promise<void>;
  service?: Service;
}) {
  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-white p-6">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledInput label="Title" name="title" defaultValue={service?.title} required />
        <LabeledInput
          label="Slug"
          name="slug"
          defaultValue={service?.slug}
          hint="Leave blank to auto-generate from title on create."
        />
        <LabeledInput label="Icon" name="icon" defaultValue={service?.icon ?? ""} />
        <LabeledInput
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(service?.sort_order ?? 0)}
        />
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Status</span>
          <select
            name="status"
            defaultValue={service?.status ?? "draft"}
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
        defaultValue={service?.short_description ?? ""}
        rows={3}
      />
      <LabeledTextarea
        label="Full description"
        name="full_description"
        defaultValue={service?.full_description ?? ""}
        rows={6}
      />
      <LabeledTextarea
        label="Intended for (one per line)"
        name="intended_for"
        defaultValue={(service?.intended_for ?? []).join("\n")}
        rows={4}
      />
      <LabeledTextarea
        label="Areas covered (one per line)"
        name="areas_covered"
        defaultValue={(service?.areas_covered ?? []).join("\n")}
        rows={4}
      />
      <LabeledTextarea
        label="Expected value (one per line)"
        name="expected_value"
        defaultValue={(service?.expected_value ?? []).join("\n")}
        rows={4}
      />
      <button
        type="submit"
        className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy"
      >
        {service ? "Save service" : "Create service"}
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
