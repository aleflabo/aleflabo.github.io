import { describe, expect, it } from "vitest";
import { fascio, frammenti, ingombro } from "./diagramma";

const ORIZZONTALE = { larghezza: 312, altezza: 370 };
const VERTICALE = { larghezza: 350, altezza: 200 };

describe("frammenti", () => {
  it("ne restituisce esattamente quanti gliene chiedi", () => {
    expect(frammenti(11, ORIZZONTALE)).toHaveLength(11);
    expect(frammenti(8, VERTICALE)).toHaveLength(8);
  });

  // Un frammento che esce dal riquadro viene tagliato dall'SVG senza che
  // niente lo segnali: è il modo in cui un diagramma si rompe in silenzio.
  it("li tiene tutti dentro il riquadro, rotazione compresa", () => {
    for (const dentro of [ORIZZONTALE, VERTICALE]) {
      for (const f of frammenti(11, dentro)) {
        const i = ingombro(f);
        expect(i.x).toBeGreaterThanOrEqual(0);
        expect(i.y).toBeGreaterThanOrEqual(0);
        expect(i.x + i.w).toBeLessThanOrEqual(dentro.larghezza);
        expect(i.y + i.h).toBeLessThanOrEqual(dentro.altezza);
      }
    }
  });

  // Il disordine è disegnato, non casuale: se cambiasse a ogni build,
  // ogni confronto fra prima e dopo diventerebbe rumore.
  it("dà sempre lo stesso disordine", () => {
    expect(frammenti(11, ORIZZONTALE)).toEqual(frammenti(11, ORIZZONTALE));
  });

  it("non li fa sovrapporre", () => {
    const pezzi = frammenti(11, ORIZZONTALE).map(ingombro);
    for (let a = 0; a < pezzi.length; a++) {
      for (let b = a + 1; b < pezzi.length; b++) {
        const separati =
          pezzi[a].x + pezzi[a].w <= pezzi[b].x ||
          pezzi[b].x + pezzi[b].w <= pezzi[a].x ||
          pezzi[a].y + pezzi[a].h <= pezzi[b].y ||
          pezzi[b].y + pezzi[b].h <= pezzi[a].y;
        expect(separati).toBe(true);
      }
    }
  });

  it("sa stare stretto: otto in un riquadro basso e largo", () => {
    expect(frammenti(8, VERTICALE)).toHaveLength(8);
  });
});

describe("fascio", () => {
  it("va dritto quando i due punti sono allineati", () => {
    expect(fascio([312, 200], [434, 200], "orizzontale")).toBe("M 312 200 L 434 200");
    expect(fascio([175, 200], [175, 246], "verticale")).toBe("M 175 200 L 175 246");
  });

  it("curva partendo e arrivando dove gli hai detto", () => {
    const d = fascio([312, 92], [434, 200], "orizzontale");
    expect(d.startsWith("M 312 92 C ")).toBe(true);
    expect(d.endsWith(" 434 200")).toBe(true);
  });

  it("piega la curva sull'asse giusto", () => {
    const orizzontale = fascio([0, 0], [100, 100], "orizzontale");
    const verticale = fascio([0, 0], [100, 100], "verticale");
    expect(orizzontale).not.toBe(verticale);
  });
});
