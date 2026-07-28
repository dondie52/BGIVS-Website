/**
 * Pure helpers for published-content filtering and mapping.
 */

export function filterPublished<T extends { status: string }>(rows: T[]): T[] {
  return rows.filter((row) => row.status === "published");
}

export function joinList(
  values: string[] | null | undefined,
  separator = " ",
): string {
  if (!values?.length) return "";
  return values.filter(Boolean).join(separator);
}
