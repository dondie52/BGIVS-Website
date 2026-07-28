import { AdminHeader } from "@/components/admin/AdminHeader";
import { CopyUrlButton } from "@/components/admin/CopyUrlButton";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { MediaDeleteButton } from "@/components/admin/MediaDeleteButton";
import { uploadMediaAction } from "@/lib/admin/actions/settings";
import { formatDateTime, getPublicMediaUrl } from "@/lib/admin/helpers";
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

  // Also list common folders
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

  return (
    <div>
      <AdminHeader
        title="Media"
        description="Upload and manage files in the public-media bucket."
      />
      <FlashMessage message={saved ? "Media updated." : error} tone={error ? "error" : "success"} />

      <form
        action={uploadMediaAction}
        encType="multipart/form-data"
        className="mb-6 rounded-lg border border-border bg-white p-6"
      >
        <h2 className="text-lg font-semibold text-navy">Upload file</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy">File</span>
            <input type="file" name="file" required className="w-full text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy">Folder</span>
            <input
              name="folder"
              defaultValue="uploads"
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
        >
          Upload
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-off-white">
            <tr>
              <th className="px-4 py-3 font-semibold text-navy">Path</th>
              <th className="px-4 py-3 font-semibold text-navy">Created</th>
              <th className="px-4 py-3 font-semibold text-navy">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {nested.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  No media files found.
                </td>
              </tr>
            ) : (
              nested.map((file) => {
                const url = getPublicMediaUrl(file.path)!;
                return (
                  <tr key={file.id}>
                    <td className="px-4 py-3 text-navy">{file.path}</td>
                    <td className="px-4 py-3 text-muted">{formatDateTime(file.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-3">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:underline">
                          Open
                        </a>
                        <CopyUrlButton url={url} />
                        <MediaDeleteButton path={file.path} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
