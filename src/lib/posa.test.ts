import { describe, it, expect } from 'vitest';
import { posa } from '../data/posa';
import { segmenti } from './posa';

describe('posa', () => {
  it('ha il quadro 4:5 della foto', () => {
    expect(posa.quadro).toEqual({ larghezza: 640, altezza: 800 });
    expect(posa.quadro.larghezza / posa.quadro.altezza).toBe(0.8);
  });
  it('ha 11 punti, tutti dentro il quadro', () => {
    expect(posa.punti).toHaveLength(11);
    for (const [x, y] of posa.punti) {
      expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(640);
      expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(800);
    }
  });
  it('ogni osso unisce due punti esistenti e diversi', () => {
    for (const [a, b] of posa.ossa) {
      expect(a).not.toBe(b);
      expect(posa.punti[a]).toBeDefined(); expect(posa.punti[b]).toBeDefined();
    }
  });
  it('segmenti traduce le ossa in coordinate, nello stesso ordine', () => {
    const s = segmenti(posa);
    expect(s).toHaveLength(posa.ossa.length);
    expect(s[0]).toEqual({ x1: 314, y1: 257, x2: 342, y2: 221 });
    expect(s.at(-1)).toEqual({ x1: 137, y1: 692, x2: 438, y2: 652 });
  });
});
