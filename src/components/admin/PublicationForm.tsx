import {
  CONTENT_STATUSES,
  PUBLICATION_TYPES,
  resolvePublicationCover,
} from "@/lib/admin/helpers";
import type { Database } from "@/types/database";

type Publication = Database["public"]["Tables"]["publications"]["Row"];

export function PublicationForm({
  action,
  publication,
}: {
  action: (formData: FormData) => Promise<void>;
  publication?: Publication;
}) {
  const coverUrl = publication?.cover_path
    ? resolvePublicationCover(publication.cover_path)
    : null;

  return (
    <form action={action} className="space-y-6 rounded-lg border border-border bg-white p-6" encType="multipart/form-data">
      {publication ? <input type="hidden" name="id" value={publication.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" required defaultValue={publication?.title} />
        <Field label="Slug" name="slug" defaultValue={publication?.slug} hint="Leave blank to auto-generate from title on create." />
        <Field label="Subtitle" name="subtitle" defaultValue={publication?.subtitle ?? ""} />
        <Field label="Author" name="author" defaultValue={publication?.author ?? ""} />
        <Field label="Publisher" name="publisher" defaultValue={publication?.publisher ?? ""} />
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Type</span>
          <select
            name="publication_type"
            defaultValue={publication?.publication_type ?? "book"}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          >
            {PUBLICATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Status</span>
          <select
            name="status"
            defaultValue={publication?.status ?? "draft"}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          >
            {CONTENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(publication?.sort_order ?? 0)}
        />
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-semibold text-navy">Description</span>
        <textarea
          name="description"
          rows={5}
          required
          defaultValue={publication?.description ?? ""}
          className="w-full rounded-md border border-border px-3 py-2 text-sm"
        />
      </label>

      <Field
        label="Topics"
        name="topics"
        defaultValue={(publication?.topics ?? []).join(", ")}
        hint="Comma-separated topics."
      />

      <label className="flex items-center gap-2 text-sm text-navy">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={publication?.featured ?? false}
          className="h-4 w-4 rounded border-border"
        />
        Featured on research page
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Cover image</span>
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt="" className="mb-2 h-32 w-auto rounded border border-border object-contain" />
          ) : null}
          <input type="file" name="cover" accept="image/*" className="w-full text-sm" />
          {publication?.cover_path ? (
            <p className="mt-1 text-xs text-muted">Current: {publication.cover_path}</p>
          ) : null}
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-navy">Document (private)</span>
          <input type="file" name="document" accept=".pdf,.doc,.docx" className="w-full text-sm" />
          {publication?.document_path ? (
            <p className="mt-1 text-xs text-muted">Current: {publication.document_path}</p>
          ) : null}
        </label>
      </div>

      <button
        type="submit"
        className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy"
      >
        {publication ? "Save publication" : "Create publication"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  hint,
}: {
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
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-border px-3 py-2 text-sm"
      />
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
