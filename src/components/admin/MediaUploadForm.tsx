"use client";

import { useEffect, useRef, useState } from "react";

const FOLDERS = [
  { value: "uploads", label: "uploads (general)" },
  { value: "covers", label: "covers (publication covers)" },
  { value: "images", label: "images (site imagery)" },
] as const;

export function MediaUploadForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }

    if (next?.type.startsWith("image/")) {
      const url = URL.createObjectURL(next);
      previewRef.current = url;
      setPreviewUrl(url);
      return;
    }

    setPreviewUrl(null);
  }

  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="mb-6 rounded-lg border border-border bg-white p-6"
    >
      <h2 className="text-lg font-semibold text-navy">Upload file</h2>
      <p className="mt-1 text-sm text-muted">
        Images land in the public-media bucket. Use <code className="text-navy">covers</code> for
        publication covers so public pages resolve them correctly.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">File</span>
          <input
            type="file"
            name="file"
            required
            accept="image/*,.pdf,.doc,.docx"
            className="w-full text-sm"
            onChange={handleFileChange}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Folder</span>
          <select
            name="folder"
            defaultValue="uploads"
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          >
            {FOLDERS.map((folder) => (
              <option key={folder.value} value={folder.value}>
                {folder.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {previewUrl ? (
        <div className="mt-4 overflow-hidden rounded-md border border-border bg-off-white p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Preview</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt=""
            className="max-h-48 w-auto rounded object-contain"
          />
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-4 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
      >
        Upload
      </button>
    </form>
  );
}
