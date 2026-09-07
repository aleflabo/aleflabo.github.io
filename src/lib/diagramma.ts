/**
 * La geometria dei diagrammi della home.
 *
 * Sta qui e non dentro il componente per due ragioni. La prima è che le due
 * disposizioni — orizzontale a 1440, verticale a 390 — devono condividere i
 * numeri invece di ripeterli: il conto dei frammenti è un dato, non una cifra
 * scritta due volte in due file. La seconda è che così si può provare che
 * niente esce dal riquadro, che è il modo in cui un diagramma SVG si rompe
 * senza che nessuno se ne accorga.
 *
 * Il disordine è deterministico. Sembra casuale ma non lo è: se cambiasse a
 * ogni build, ogni confronto fra la pagina di prima e quella di dopo
 * diventerebbe rumore, e in questo repo il confronto fra prima e dopo è un
 * gate.
 */

export interface Frammento {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Gradi, fra -7 e 6: quanto basta a farlo sembrare buttato lì. */
  rot: number;
  /** Le barrette dentro, a suggerire del testo. */
  righe: number;
  /** I tratteggiati sono quelli di cui non si sa nemmeno bene cosa contengano. */
  tratteggio: boolean;
}

export interface Riquadro {
  larghezza: number;
  altezza: number;
}

/** Generatore lineare congruenziale: stessa sequenza a ogni chiamata. */
function seminatore(seme: number): () => number {
  let stato = seme;
  return () => {
    stato = (stato * 1103515245 + 12345) % 2147483648;
    return stato / 2147483648;
  };
}

/**
 * Il riquadro che un frammento occupa davvero una volta ruotato. È più grande
 * del frammento: è quello che va tenuto dentro i bordi.
 */
export function ingombro(f: Frammento): { x: number; y: number; w: number; h: number } {
  const rad = (Math.abs(f.rot) * Math.PI) / 180;
  const w = f.w * Math.cos(rad) + f.h * Math.sin(rad);
  const h = f.w * Math.sin(rad) + f.h * Math.cos(rad);
  return {
    x: f.x + f.w / 2 - w / 2,
    y: f.y + f.h / 2 - h / 2,
    w,
    h,
  };
}

/**
 * `quanti` frammenti sparsi dentro il riquadro, senza sovrapporsi e senza
 * uscire. La griglia sotto non si vede: serve solo a garantire le due cose.
 */
export function frammenti(quanti: number, dentro: Riquadro): Frammento[] {
  const colonne = Math.max(1, Math.round(Math.sqrt((quanti * dentro.larghezza) / dentro.altezza)));
  const righeGriglia = Math.ceil(quanti / colonne);
  const cellaL = dentro.larghezza / colonne;
  const cellaA = dentro.altezza / righeGriglia;

  const caso = seminatore(20260903);
  const fuori: Frammento[] = [];

  for (let i = 0; i < quanti; i++) {
    const colonna = i % colonne;
    const riga = Math.floor(i / colonne);

    // Il frammento sta al 62-88% della cella, e la rotazione si mangia il
    // resto: il margine è calcolato sull'ingombro, non sulla forma.
    const rot = Math.round(-7 + caso() * 13);
    const rad = (Math.abs(rot) * Math.PI) / 180;
    const w = Math.round(cellaL * (0.62 + caso() * 0.26) - cellaA * Math.sin(rad));
    const h = Math.round(cellaA * (0.5 + caso() * 0.22) - cellaL * Math.sin(rad));

    const i2 = ingombro({ x: 0, y: 0, w, h, rot, righe: 1, tratteggio: false });
    const margineL = Math.max(0, cellaL - i2.w);
    const margineA = Math.max(0, cellaA - i2.h);

    fuori.push({
      x: Math.round(colonna * cellaL + (i2.w - w) / 2 + caso() * margineL),
      y: Math.round(riga * cellaA + (i2.h - h) / 2 + caso() * margineA),
      w,
      h,
      rot,
      righe: 1 + Math.floor(caso() * 3),
      tratteggio: caso() < 0.28,
    });
  }
  return fuori;
}

/**
 * Il `d` di un collegamento. Dritto quando i due punti sono allineati sul suo
 * asse, altrimenti una cubica che parte e arriva perpendicolare, così i fasci
 * entrano nei riquadri di faccia invece che di sbieco.
 */
export function fascio(
  da: [number, number],
  a: [number, number],
  verso: "orizzontale" | "verticale",
): string {
  const [x1, y1] = da;
  const [x2, y2] = a;
  if (verso === "orizzontale" && y1 === y2) return `M ${x1} ${y1} L ${x2} ${y2}`;
  if (verso === "verticale" && x1 === x2) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const k = 0.55;
  const [c1x, c1y] =
    verso === "orizzontale" ? [x1 + (x2 - x1) * k, y1] : [x1, y1 + (y2 - y1) * k];
  const [c2x, c2y] =
    verso === "orizzontale" ? [x2 - (x2 - x1) * k, y2] : [x2, y2 - (y2 - y1) * k];
  return `M ${x1} ${y1} C ${Math.round(c1x)} ${Math.round(c1y)} ${Math.round(c2x)} ${Math.round(c2y)} ${x2} ${y2}`;
}
