/**
 * Client-safe redirect guard (mirrors server helper in auth.ts).
 * Only allow relative redirects under /admin.
 */
export function isSafeRedirectPath(path: string | null): boolean {
  if (!path) return false;
  if (!path.startsWith("/admin")) return false;
  if (path.startsWith("//")) return false;
  if (path.includes("://")) return false;
  if (path.includes("\\")) return false;
  return true;
}
