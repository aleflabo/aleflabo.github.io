import type { Locale } from '../i18n/ui';
import { localizedPath } from '../i18n/ui';
import { site } from './site';

/**
 * I testi della home «Laboratorio» (spec 2026-11-08). Italiano da testi.md,
 * sezione «/ — home «Laboratorio»»; inglese da testi-en.md, sezione «Home
 * «Laboratorio»», dove le frasi nuove sono marcate [DA APPROVARE] finché il
 * committente non le approva.
 */
export interface HomeLab {
  nome: string;
  verbo: string;
  parole: string[];
  luogo: string;
  info: { chiave: string; valore: string }[];
  ctaPrimaria: string;
  hrefPrimaria: string;
  ctaSecondaria: string;
  hrefSecondaria: string;
  suggerimentoFoto: string;
  etichettaPosa: string;
  etichettaCard: string;
  etichettaOra: string;
  numeri: { valore: number; etichetta: string }[];
  porte: { titolo: string; testo: string; piede: string; href: string; percorso: string }[];
  stack: string[];
}

// Uguale nelle due lingue: nomi propri di strumenti.
const stack = [
  'Python', 'PyTorch', 'OpenCV', 'MediaPipe', 'Flask + Celery', 'PostgreSQL',
  'Gemini', 'AWS', 'Astro', 'Angular', 'Laravel', 'Nuxt',
];

export const homeLab: Record<Locale, HomeLab> = {
  it: {
    nome: site.it.hero.name,
    verbo: 'costruisco',
    parole: ['computer vision', 'LLM applicati', 'agenti AI', 'software su misura'],
    luogo: 'Venezia',
    info: [
      { chiave: 'ex', valore: 'CTO · Procedo' },
      { chiave: 'phd', valore: 'Sapienza – PINlab' },
      { chiave: 'pub', valore: 'CVPR · ICCV · IROS' },
    ],
    ctaPrimaria: site.it.prenotaMezzora ?? '',
    hrefPrimaria: `${localizedPath('it', '/')}#parliamone`,
    ctaSecondaria: 'Guarda cosa ho costruito',
    hrefSecondaria: localizedPath('it', '/lavori'),
    suggerimentoFoto: '↑ passaci sopra',
    etichettaPosa: 'pose · 11 keypoints',
    etichettaCard: 'Ritratto di Alessandro Flaborea; al passaggio compare la posa stimata da un modello',
    etichettaOra: 'ora locale',
    numeri: [
      { valore: 10, etichetta: 'articoli pubblicati' },
      { valore: 533, etichetta: 'citazioni' },
      { valore: 1, etichetta: 'Best Paper Award' },
      { valore: 2, etichetta: 'anni da CTO' },
    ],
    porte: [
      {
        titolo: 'Per le aziende',
        testo: "Aiuto le aziende a capire dove serve l'intelligenza artificiale e poi la costruisco.",
        piede: 'diagnosi · audit · software · formazione →',
        href: localizedPath('it', '/servizi'),
        percorso: '/servizi',
      },
      {
        titolo: 'Per chi è del mestiere',
        testo: 'Ogni articolo che ho pubblicato esce insieme al codice.',
        piede: 'paper · codice · note →',
        href: localizedPath('it', '/ricerca'),
        percorso: '/ricerca',
      },
    ],
    stack,
  },
  en: {
    nome: site.en.hero.name,
    verbo: 'I build',
    parole: ['computer vision', 'applied LLMs', 'AI agents', 'custom software'],
    luogo: 'Venice',
    info: [
      { chiave: 'ex', valore: 'CTO · Procedo' },
      { chiave: 'phd', valore: 'Sapienza – PINlab' },
      { chiave: 'pub', valore: 'CVPR · ICCV · IROS' },
    ],
    ctaPrimaria: site.en.prenotaMezzora ?? '',
    hrefPrimaria: `${localizedPath('en', '/')}#parliamone`,
    ctaSecondaria: "See what I've built",
    hrefSecondaria: localizedPath('en', '/work'),
    suggerimentoFoto: '↑ hover over it',
    etichettaPosa: 'pose · 11 keypoints',
    etichettaCard: 'Portrait of Alessandro Flaborea; on hover, the pose estimated by a model appears',
    etichettaOra: 'local time',
    numeri: [
      { valore: 10, etichetta: 'published papers' },
      { valore: 533, etichetta: 'citations' },
      { valore: 1, etichetta: 'Best Paper Award' },
      { valore: 2, etichetta: 'years as CTO' },
    ],
    porte: [
      {
        titolo: 'For companies',
        testo: 'I help companies work out where AI is needed, and then I build it.',
        piede: 'diagnosis · audit · software · training →',
        href: localizedPath('en', '/services'),
        percorso: '/services',
      },
      {
        titolo: 'For fellow engineers',
        testo: 'Every paper I published came out together with the code.',
        piede: 'papers · code · notes →',
        href: localizedPath('en', '/research'),
        percorso: '/research',
      },
    ],
    stack,
  },
};
