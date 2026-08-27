import { describe, expect, it } from "vitest";
import { defaultLocale, localizedPath } from "./ui";

describe("localizedPath", () => {
  it("tiene l'italiano senza prefisso", () => {
    expect(localizedPath("it", "/")).toBe("/");
    expect(localizedPath("it", "/servizi")).toBe("/servizi/");
    expect(localizedPath("it", "lavori")).toBe("/lavori/");
  });

  it("mette l'inglese sotto /en", () => {
    expect(localizedPath("en", "/")).toBe("/en/");
    expect(localizedPath("en", "/work/procedo")).toBe("/en/work/procedo/");
  });

  // GitHub Pages serve `/servizi/` e risponde 301 a `/servizi`. Un percorso
  // senza barra finale è quindi un redirect travestito da collegamento: sui
  // canonici e sugli hreflang di BaseLayout significava dichiarare a Google
  // un indirizzo diverso da quello servito.
  it("chiude sempre con la barra", () => {
    expect(localizedPath("it", "/chi-sono")).toBe("/chi-sono/");
    expect(localizedPath("en", "/about")).toBe("/en/about/");
    expect(localizedPath("it", "/lavori/procedo")).toBe("/lavori/procedo/");
  });

  it("non raddoppia la barra se c'è già", () => {
    expect(localizedPath("it", "/servizi/")).toBe("/servizi/");
    expect(localizedPath("en", "/work/")).toBe("/en/work/");
  });

  // Il richiamo «Prenota mezz'ora» punta a `/#parliamone` da ogni pagina: la
  // barra va prima del cancelletto, non dopo.
  it("mette la barra prima del frammento", () => {
    expect(localizedPath("it", "/servizi#faq")).toBe("/servizi/#faq");
    expect(localizedPath("it", "/#parliamone")).toBe("/#parliamone");
    expect(localizedPath("en", "/#parliamone")).toBe("/en/#parliamone");
  });

  it("dichiara l'italiano come lingua predefinita", () => {
    expect(defaultLocale).toBe("it");
  });
});
