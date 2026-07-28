import { describe, expect, it } from "vitest";
import { sanitizeCsvCell, toCsv } from "@/lib/csv";

describe("csv helpers", () => {
  it("sanitizes formula-injection prefixes", () => {
    expect(sanitizeCsvCell("=CMD()")).toBe("'=CMD()");
    expect(sanitizeCsvCell("+1234")).toBe("'+1234");
    expect(sanitizeCsvCell("-1+1")).toBe("'-1+1");
    expect(sanitizeCsvCell("@sum(A1)")).toBe("'@sum(A1)");
  });

  it("quotes cells that contain commas or quotes", () => {
    expect(sanitizeCsvCell('He said "hello"')).toBe('"He said ""hello"""');
    expect(sanitizeCsvCell("a,b")).toBe('"a,b"');
  });

  it("builds CRLF CSV with a trailing newline", () => {
    const csv = toCsv(
      ["name", "note"],
      [
        ["Ada", "=1+1"],
        ["Grace", "ok"],
      ],
    );

    expect(csv).toBe("name,note\r\nAda,'=1+1\r\nGrace,ok\r\n");
  });
});
