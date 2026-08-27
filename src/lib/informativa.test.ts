import { describe, expect, it } from "vitest";
import { conStatistiche } from "./informativa";
import type { PaginaLegale } from "../data/legale";
import type { Statistiche } from "../data/analytics";

const pagina: PaginaLegale = {
  occhiello: "Privacy",
  titolo: "Titolo",
  introduzione: "Introduzione.",
  aggiornamento: "Ultimo aggiornamento: 27 agosto 2026.",
  sezioni: [
    { titolo: "Prima", paragrafi: ["a"] },
    { titolo: "In mezzo", paragrafi: ["b"] },
    { titolo: "Se un giorno cambia", paragrafi: ["c"] },
  ],
};

const umami: Statistiche = {
  nome: "Umami",
  titolare: "Umami Software, Inc.",
  script: "https://eu.umami.is/script.js",
  attributi: { "data-website-id": "0000-0000" },
  informativa: "https://umami.is/privacy",
};

describe("conStatistiche", () => {
  // Lo stato di adesso: nessuno strumento, informativa intatta.
  it("non tocca niente quando non c'è uno strumento", () => {
    expect(conStatistiche(pagina, "it", null)).toBe(pagina);
  });

  it("aggiunge una sola sezione", () => {
    const out = conStatistiche(pagina, "it", umami);
    expect(out.sezioni).toHaveLength(4);
  });

  // «Se un giorno cambia» è la chiusura della pagina e deve restare in fondo.
  it("mette la sezione prima dell'ultima, non dopo", () => {
    const out = conStatistiche(pagina, "it", umami);
    expect(out.sezioni[3].titolo).toBe("Se un giorno cambia");
    expect(out.sezioni[2].titolo).toContain("visite");
  });

  it("nomina lo strumento e rimanda alla sua informativa", () => {
    const testo = conStatistiche(pagina, "it", umami).sezioni[2].paragrafi.join(" ");
    expect(testo).toContain("Umami");
    expect(testo).toContain("https://umami.is/privacy");
  });

  it("dice che non scrive cookie, che è la ragione per cui non c'è un banner", () => {
    const testo = conStatistiche(pagina, "it", umami).sezioni[2].paragrafi.join(" ");
    expect(testo).toContain("Non scrive cookie");
    expect(testo).toContain("banner");
  });

  it("rende la sezione in inglese sulla pagina inglese", () => {
    const out = conStatistiche(pagina, "en", umami);
    expect(out.sezioni[2].titolo).toBe("Visits, counted without recognising you");
  });

  it("non modifica la pagina ricevuta", () => {
    const copia = JSON.parse(JSON.stringify(pagina));
    conStatistiche(pagina, "it", umami);
    expect(pagina).toEqual(copia);
  });
});
