/**
 * CSV helpers with formula-injection safeguards.
 */

export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";

  let cell = String(value);

  // Prevent CSV/formula injection in spreadsheet apps.
  if (/^[=+\-@]/.test(cell)) {
    cell = `'${cell}`;
  }

  // Escape quotes by doubling them; wrap when needed.
  if (/[",\r\n]/.test(cell)) {
    cell = `"${cell.replace(/"/g, '""')}"`;
  }

  return cell;
}

export function toCsv(
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][],
): string {
  const lines = [
    headers.map(sanitizeCsvCell).join(","),
    ...rows.map((row) => row.map(sanitizeCsvCell).join(",")),
  ];
  return `${lines.join("\r\n")}\r\n`;
}
