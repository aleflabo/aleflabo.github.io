import { describe, expect, it } from "vitest";
import { descrizioneMeta, frasi } from "./descrizione";

describe("frasi", () => {
  it("divide sul punto seguito da maiuscola", () => {
    expect(frasi("Uno due. Tre quattro. Cinque.")).toEqual([
      "Uno due.",
      "Tre quattro.",
      "Cinque.",
    ]);
  });

  it("non spezza sulle sigle puntate", () => {
    expect(frasi("Relatore al Data Science Hub di Ferrari S.p.A. Poi altro.")).toEqual([
      "Relatore al Data Science Hub di Ferrari S.p.A. Poi altro.",
    ]);
  });

  it("non spezza su un'abbreviazione seguita da minuscola", () => {
    expect(frasi("Pattern Recognition, vol. 156, 2024. Fine.")).toEqual([
      "Pattern Recognition, vol. 156, 2024.",
      "Fine.",
    ]);
  });

  it("tiene il testo senza punto finale", () => {
    expect(frasi("Una riga sola")).toEqual(["Una riga sola"]);
  });
});

describe("descrizioneMeta", () => {
  it("lascia stare quello che sta già nel limite", () => {
    const corta = "Aiuto le aziende a capire dove serve l'intelligenza artificiale.";
    expect(descrizioneMeta(corta)).toBe(corta);
  });

  // Il caso vero: /chi-sono dichiarava 375 caratteri, cioè il primo
  // paragrafo intero della biografia.
  it("tiene le frasi intere che ci stanno", () => {
    const lunga =
      "Ho cominciato a Udine, con una laurea in informatica e sei mesi in Svezia che mi hanno tolto l'idea di restare fermo. Poi Roma: una magistrale in data science e un dottorato al Perception and Intelligence Lab della Sapienza.";
    const out = descrizioneMeta(lunga);
    expect(out).toBe(
      "Ho cominciato a Udine, con una laurea in informatica e sei mesi in Svezia che mi hanno tolto l'idea di restare fermo.",
    );
    expect(out.length).toBeLessThanOrEqual(160);
  });

  it("non taglia mai a metà parola", () => {
    const senzaPunti = "a".repeat(50) + " " + "b".repeat(50) + " " + "c".repeat(90);
    const out = descrizioneMeta(senzaPunti);
    expect(out.endsWith("…")).toBe(true);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out).not.toContain("cc…");
  });

  it("dichiara il troncamento quando nemmeno la prima frase ci sta", () => {
    const out = descrizioneMeta("Parola ".repeat(40) + "fine.");
    expect(out.endsWith("…")).toBe(true);
  });

  it("rispetta un limite diverso quando glielo si passa", () => {
    expect(descrizioneMeta("Uno due tre. Quattro cinque.", 12, 13, 1)).toBe("Uno due tre.");
  });

  // /servizi dichiarava 170 caratteri e la sua prima frase è «Si parte dal
  // primo.»: il taglio per frasi la riduceva a venti caratteri, cioè a una
  // descrizione peggiore di quella troppo lunga.
  it("scarta un taglio per frasi che lascia troppo poco", () => {
    const servizi =
      "Si parte dal primo. Ogni passo è a sé: si prosegue quando il lavoro lo richiede, ci si può fermare in qualsiasi momento, e quello che è stato fatto resta comunque vostro, per sempre.";
    const out = descrizioneMeta(servizi);
    expect(out.length).toBeGreaterThan(110);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out).not.toBe("Si parte dal primo.");
  });

  // Fra 160 e 175 caratteri Google taglia poche parole: non vale la pena
  // toccare un testo approvato per quello.
  it("lascia stare chi sfora di poco", () => {
    const quasi = "a".repeat(170);
    expect(descrizioneMeta(quasi)).toBe(quasi);
  });
});
