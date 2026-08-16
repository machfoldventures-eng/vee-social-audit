import { describe, expect, it } from "vitest";
import { CAL_BOOKING_URL, PDF_FILENAME } from "./auditConfig";

describe("audit download and booking configuration", () => {
  it("uses the Machfold discovery booking page", () => {
    expect(CAL_BOOKING_URL).toBe("https://cal.com/machfold-ventures-vfsng6");
  });

  it("exports a stable PDF filename", () => {
    expect(PDF_FILENAME).toMatch(/\.pdf$/);
    expect(PDF_FILENAME).toBe("machfold-instagram-growth-audit.pdf");
  });
});
