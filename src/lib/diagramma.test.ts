import { describe, expect, it } from "vitest";
import { fascio, frammenti, ingombro } from "./diagramma";

// Le due configurazioni vere, quelle che `CosaCostruisco.astro` chiede:
// undici pezzi sul largo, otto sullo stretto. Provarle entrambe con undici
// — che è quello che questo file faceva — lascia scoperta l'unica delle due
// che sta davvero stretta.
const ORIZZONTALE = { quanti: 11, larghezza: 312, altezza: 370 };
const VERTICALE = { quanti: 8, larghezza: 350, altezza: 200 };
const CONFIGURAZIONI = [ORIZZONTALE, VERTICALE];

/**
 * I quattro vertici di un frammento dopo la rotazione, calcolati qui e non
 * chiesti a `diagramma.ts`.
 *
 * È il punto di questo file. `frammenti()` calcola i suoi margini **con**
 * `ingombro()`: un test che verifica il contenimento chiedendo di nuovo a
 * `ingombro()` dove sta il pezzo non prova niente, perché se la trigonometria
 * di `ingombro` fosse sbagliata sbaglierebbero insieme il prodotto e il suo
 * controllo, e resterebbero d'accordo. Qui la rotazione è rifatta dai vertici
 * con la matrice, senza passare da nessuna funzione del modulo sotto esame.
 */
function vertici(f: { x: number; y: number; w: number; h: number; rot: number }) {
  const rad = (f.rot * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const cx = f.x + f.w / 2;
  const cy = f.y + f.h / 2;
  return [
    [-f.w / 2, -f.h / 2],
    [f.w / 2, -f.h / 2],
    [f.w / 2, f.h / 2],
    [-f.w / 2, f.h / 2],
  ].map(([dx, dy]) => [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos]);
}

/** Il rettangolo dritto che racchiude quei vertici, sempre senza `ingombro()`. */
function scatola(f: { x: number; y: number; w: number; h: number; rot: number }) {
  const v = vertici(f);
  const xs = v.map(([x]) => x);
  const ys = v.map(([, y]) => y);
  return { x: Math.min(...xs), y: Math.min(...ys), X: Math.max(...xs), Y: Math.max(...ys) };
}

describe("frammenti", () => {
  it("ne restituisce esattamente quanti gliene chiedi", () => {
    for (const c of CONFIGURAZIONI) {
      expect(frammenti(c.quanti, c)).toHaveLength(c.quanti);
    }
  });

  // Un frammento che esce dal riquadro viene tagliato dall'SVG senza che
  // niente lo segnali: è il modo in cui un diagramma si rompe in silenzio.
  // Il contenimento si misura sui vertici ruotati calcolati qui sopra, non
  // su `ingombro()`, che è la funzione con cui `frammenti()` si è disposto.
  it("li tiene tutti dentro il riquadro, rotazione compresa", () => {
    for (const c of CONFIGURAZIONI) {
      for (const f of frammenti(c.quanti, c)) {
        for (const [x, y] of vertici(f)) {
          expect(x).toBeGreaterThanOrEqual(0);
          expect(y).toBeGreaterThanOrEqual(0);
          expect(x).toBeLessThanOrEqual(c.larghezza);
          expect(y).toBeLessThanOrEqual(c.altezza);
        }
      }
    }
  });

  // La stessa garanzia, dall'altra parte: se `ingombro()` dicesse un
  // rettangolo diverso da quello che i vertici disegnano davvero, il
  // contenimento qui sopra passerebbe e il disegno resterebbe tagliato.
  // Questo test è l'unico posto dove le due strade si incontrano.
  it("il suo ingombro è davvero il rettangolo dei vertici ruotati", () => {
    for (const c of CONFIGURAZIONI) {
      for (const f of frammenti(c.quanti, c)) {
        const i = ingombro(f);
        const s = scatola(f);
        expect(i.x).toBeCloseTo(s.x, 6);
        expect(i.y).toBeCloseTo(s.y, 6);
        expect(i.x + i.w).toBeCloseTo(s.X, 6);
        expect(i.y + i.h).toBeCloseTo(s.Y, 6);
      }
    }
  });

  // Il disordine è disegnato, non casuale: se cambiasse a ogni build,
  // ogni confronto fra prima e dopo diventerebbe rumore.
  it("dà sempre lo stesso disordine", () => {
    for (const c of CONFIGURAZIONI) {
      expect(frammenti(c.quanti, c)).toEqual(frammenti(c.quanti, c));
    }
  });

  // Anche qui i rettangoli vengono dai vertici. Due scatole dritte separate
  // garantiscono che i pezzi ruotati dentro non si tocchino; il viceversa
  // non vale, quindi questo controllo è più severo del disegno, mai più
  // largo — che è il verso giusto in cui un test può sbagliare.
  it("non li fa sovrapporre, in nessuna delle due configurazioni", () => {
    for (const c of CONFIGURAZIONI) {
      const pezzi = frammenti(c.quanti, c).map(scatola);
      for (let a = 0; a < pezzi.length; a++) {
        for (let b = a + 1; b < pezzi.length; b++) {
          const separati =
            pezzi[a].X <= pezzi[b].x ||
            pezzi[b].X <= pezzi[a].x ||
            pezzi[a].Y <= pezzi[b].y ||
            pezzi[b].Y <= pezzi[a].y;
          expect(separati).toBe(true);
        }
      }
    }
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
