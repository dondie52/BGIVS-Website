import { describe, expect, it } from "vitest";
import { filterPublished } from "@/lib/content/utils";

describe("filterPublished", () => {
  it("keeps only rows with status published", () => {
    const rows = [
      { id: "1", status: "published", title: "A" },
      { id: "2", status: "draft", title: "B" },
      { id: "3", status: "archived", title: "C" },
      { id: "4", status: "published", title: "D" },
    ];

    expect(filterPublished(rows)).toEqual([
      { id: "1", status: "published", title: "A" },
      { id: "4", status: "published", title: "D" },
    ]);
  });

  it("returns an empty array when nothing is published", () => {
    expect(filterPublished([{ status: "draft" }])).toEqual([]);
  });
});
