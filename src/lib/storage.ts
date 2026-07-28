import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Returns a short-lived signed URL for a private publication document.
 * Never expose document_path directly to public visitors.
 */
export async function getPrivateDocumentSignedUrl(
  documentPath: string,
  expiresInSeconds = 120,
): Promise<string | null> {
  if (!documentPath) return null;

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from("private-publications")
    .createSignedUrl(documentPath, expiresInSeconds);

  if (error) {
    console.error("[storage] signed URL failed", { message: error.message });
    return null;
  }

  return data.signedUrl;
}
