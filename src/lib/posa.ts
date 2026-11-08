import type { Posa } from '../data/posa';

export interface Segmento { x1: number; y1: number; x2: number; y2: number }

/** Le ossa della posa come segmenti nel quadro 640×800, nello stesso ordine. */
export function segmenti(p: Posa): Segmento[] {
  return p.ossa.map(([a, b]) => {
    const [x1, y1] = p.punti[a];
    const [x2, y2] = p.punti[b];
    return { x1, y1, x2, y2 };
  });
}
