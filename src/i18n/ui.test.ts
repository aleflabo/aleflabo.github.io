import { describe, expect, it } from "vitest";
import { defaultLocale, localizedPath } from "./ui";

describe("localizedPath", () => {
  it("tiene l'italiano senza prefisso", () => {
    expect(localizedPath("it", "/")).toBe("/");
    expect(localizedPath("it", "/servizi")).toBe("/servizi");
    expect(localizedPath("it", "lavori")).toBe("/lavori");
  });

  it("mette l'inglese sotto /en", () => {
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("en", "/work/procedo")).toBe("/en/work/procedo");
  });

  it("dichiara l'italiano come lingua predefinita", () => {
    expect(defaultLocale).toBe("it");
  });
});
