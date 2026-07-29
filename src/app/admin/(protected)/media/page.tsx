import { AdminHeader } from "@/components/admin/AdminHeader";
import { CopyUrlButton } from "@/components/admin/CopyUrlButton";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { MediaDeleteButton } from "@/components/admin/MediaDeleteButton";
import { MediaUploadForm } from "@/components/admin/MediaUploadForm";
import { uploadMediaAction } from "@/lib/admin/actions/settings";
import {
  formatDateTime,
  getPublicMediaUrl,
  isImageMediaPath,
} from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MediaAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data: files } = await supabase.storage.from("public-media").list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  const folders = ["uploads", "covers", "images"];
  const nested: { name: string; id: string; created_at?: string; path: string }[] = [];

  for (const folder of folders) {
    const { data } = await supabase.storage.from("public-media").list(folder, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    for (const file of data ?? []) {
      if (file.name && !file.name.endsWith("/")) {
        nested.push({
          name: file.name,
          id: `${folder}/${file.name}`,
          created_at: file.created_at ?? undefined,
          path: `${folder}/${file.name}`,
        });
      }
    }
  }

  for (const file of files ?? []) {
    if (file.id && file.name && !folders.includes(file.name)) {
      nested.push({
        name: file.name,
        id: file.name,
        created_at: file.created_at ?? undefined,
        path: file.name,
      });
    }
  }

  nested.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  const imageFiles = nested.filter((file) => isImageMediaPath(file.path));
  const otherFiles = nested.filter((file) => !isImageMediaPath(file.path));

  return (
    <div>
      <AdminHeader
        title="Media"
        description="Upload covers and site images to public-media. Publication covers should use the covers folder."
      />
      <FlashMessage message={saved ? "Media updated." : error} tone={error ? "error" : "success"} />

      <MediaUploadForm action={uploadMediaAction} />

      {imageFiles.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-navy">Image library</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {imageFiles.map((file) => {
              const url = getPublicMediaUrl(file.path);
              if (!url) return null;
              return (
                <article
                  key={file.id}
                  className="overflow-hidden rounded-lg border border-border bg-white"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-off-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="space-y-2 p-3">
                    <p className="truncate text-sm font-medium text-navy" title={file.path}>
                      {file.path}
                    </p>
                    <p className="text-xs text-muted">{formatDateTime(file.created_at)}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue hover:underline"
                      >
                        Open
                      </a>
                      <CopyUrlButton url={url} />
                      <MediaDeleteButton path={file.path} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {nested.length === 0 ? (
        <div className="rounded-lg border border-border bg-white px-4 py-8 text-center text-sm text-muted">
          No media files found.
        </div>
      ) : otherFiles.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-border bg-white">
          <h2 className="border-b border-border px-4 py-3 text-lg font-semibold text-navy">
            Other files
          </h2>
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-off-white">
              <tr>
                <th className="px-4 py-3 font-semibold text-navy">Path</th>
                <th className="px-4 py-3 font-semibold text-navy">Created</th>
                <th className="px-4 py-3 font-semibold text-navy">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {otherFiles.map((file) => {
                const url = getPublicMediaUrl(file.path);
                return (
                  <tr key={file.id}>
                    <td className="px-4 py-3 text-navy">{file.path}</td>
                    <td className="px-4 py-3 text-muted">{formatDateTime(file.created_at)}</td>
                    <td className="px-4 py-3">
                      {url ? (
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue hover:underline"
                          >
                            Open
                          </a>
                          <CopyUrlButton url={url} />
                          <MediaDeleteButton path={file.path} />
                        </div>
                      ) : (
                        <span className="text-muted">URL unavailable</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
