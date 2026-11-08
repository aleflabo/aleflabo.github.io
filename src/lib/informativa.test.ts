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

import { conModulo } from "./informativa";
import { privacy } from "../data/legale";
import { privacy as privacyEn } from "../data/en/legale";

describe("conModulo", () => {
  const sezione = (p: PaginaLegale, titolo: string) => p.sezioni.find((s) => s.titolo === titolo)!;
  it("interruttore spento: la pagina resta com'è", () => {
    expect(conModulo(privacy, "it", null)).toBe(privacy);
  });
  it("acceso: «Se mi scrivete» parla di Web3Forms e non dice più che il modulo è scollegato", () => {
    const s = sezione(conModulo(privacy, "it", { accessKey: "k" }), "Se mi scrivete");
    expect(s.paragrafi[0]).toMatch(/^Se compilate il modulo di contatto, quello che scrivete/);
    expect(s.paragrafi[0]).toContain("Web3Forms");
    expect(s.paragrafi.join(" ")).not.toContain("non è ancora collegato");
    expect(s.paragrafi.length).toBe(sezione(privacy, "Se mi scrivete").paragrafi.length);
  });
  it("acceso, in inglese", () => {
    const s = sezione(conModulo(privacyEn, "en", { accessKey: "k" }), "If you write to me");
    expect(s.paragrafi[0]).toMatch(/^If you fill in the contact form/);
    expect(s.paragrafi.join(" ")).not.toContain("isn't connected to any service yet");
  });
});

describe("conModulo, «Per quanto tempo»", () => {
  const sezione = (p: PaginaLegale, titolo: string) => p.sezioni.find((s) => s.titolo === titolo)!;
  it("acceso: non dice più che il sito non raccoglie dati, in tutte e due le lingue", () => {
    const it_ = sezione(conModulo(privacy, "it", { accessKey: "k" }), "Per quanto tempo");
    expect(it_.paragrafi[0]).toMatch(/^Il sito raccoglie solo quello che scrivete nel modulo di contatto/);
    expect(it_.paragrafi.join(" ")).not.toContain("il sito non ne raccoglie");
    const en_ = sezione(conModulo(privacyEn, "en", { accessKey: "k" }), "For how long");
    expect(en_.paragrafi[0]).toMatch(/^The site only collects what you write in the contact form/);
    expect(en_.paragrafi.join(" ")).not.toContain("the site collects none");
  });
});
