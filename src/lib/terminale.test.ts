import { describe, it, expect } from 'vitest';
import { righeTerminale } from './terminale';
const testo = (l: 'it' | 'en') => righeTerminale(l).map((p) => p.testo).join('');

describe('righeTerminale', () => {
  it('italiano: comando e fatti esatti', () => {
    const t = testo('it');
    expect(t.startsWith('$ cat alessandro.json\n{')).toBe(true);
    expect(t).toContain('"dottorato": "computer vision, Sapienza – PINlab"');
    expect(t).toContain('"pubblicato_a": ["CVPR", "ICCV", "IROS"]');
    expect(t).toContain('"cto": "Procedo, 2024–2026"');
    expect(t).toContain('"adesso": "lavoro in proprio"');
    expect(t.trimEnd().endsWith('}')).toBe(true);
  });
  it('inglese: nessuna chiave o parola italiana', () => {
    const t = testo('en');
    for (const parola of ['dottorato', 'pubblicato', 'adesso', 'lavoro', 'proprio']) {
      expect(t).not.toContain(parola);
    }
    expect(t).toContain('"cto": "Procedo, 2024–2026"');
  });
  it('il prompt è il solo pezzo di tipo prompt', () => {
    expect(righeTerminale('it').filter((p) => p.tipo === 'prompt')).toEqual([{ tipo: 'prompt', testo: '$ ' }]);
  });
});
