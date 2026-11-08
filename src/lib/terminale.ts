import type { Locale } from '../i18n/ui';

/**
 * Il terminale della home: `cat alessandro.json` e un piccolo JSON di fatti.
 * I fatti sono gli stessi della riga di credibilità approvata (testi.md, home).
 * Le chiavi inglesi sono state approvate l'8 novembre 2026 (testi-en.md,
 * sezione Laboratorio).
 *
 * I pezzi vengono resi tutti nel markup: lo script della home li riscrive a
 * macchina solo se il movimento è permesso. Così il testo c'è anche senza
 * JavaScript, e `verifica-rotte.mjs` lo vede.
 */
export type Pezzo = { tipo: 'prompt' | 'chiave' | 'stringa' | 'testo'; testo: string };

const fatti: Record<Locale, { chiave: string; valore: string | string[] }[]> = {
  it: [
    { chiave: 'dottorato', valore: 'computer vision, Sapienza – PINlab' },
    { chiave: 'pubblicato_a', valore: ['CVPR', 'ICCV', 'IROS'] },
    { chiave: 'cto', valore: 'Procedo, 2024–2026' },
    { chiave: 'adesso', valore: 'lavoro in proprio' },
  ],
  en: [
    { chiave: 'phd', valore: 'computer vision, Sapienza – PINlab' },
    { chiave: 'published_at', valore: ['CVPR', 'ICCV', 'IROS'] },
    { chiave: 'cto', valore: 'Procedo, 2024–2026' },
    { chiave: 'now', valore: 'working on my own' },
  ],
};

export function righeTerminale(lang: Locale): Pezzo[] {
  const pezzi: Pezzo[] = [
    { tipo: 'prompt', testo: '$ ' },
    { tipo: 'testo', testo: 'cat alessandro.json\n{\n' },
  ];
  fatti[lang].forEach(({ chiave, valore }, i) => {
    pezzi.push({ tipo: 'testo', testo: '  ' }, { tipo: 'chiave', testo: `"${chiave}"` }, { tipo: 'testo', testo: ': ' });
    if (Array.isArray(valore)) {
      pezzi.push({ tipo: 'testo', testo: '[' });
      valore.forEach((v, j) => {
        pezzi.push({ tipo: 'stringa', testo: `"${v}"` });
        if (j < valore.length - 1) pezzi.push({ tipo: 'testo', testo: ', ' });
      });
      pezzi.push({ tipo: 'testo', testo: ']' });
    } else {
      pezzi.push({ tipo: 'stringa', testo: `"${valore}"` });
    }
    pezzi.push({ tipo: 'testo', testo: i < fatti[lang].length - 1 ? ',\n' : '\n' });
  });
  pezzi.push({ tipo: 'testo', testo: '}' });
  return pezzi;
}
