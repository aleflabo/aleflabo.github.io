// src/pages/rss.xml.ts — il feed RSS delle sei note (rotta `/rss.xml`).
// Gli articoli vengono da src/data/note.ts (task 6), non toccato qui: le
// sue date sono stringhe in italiano nel formato «25 ago 2026», mentre
// `pubDate` di @astrojs/rss vuole un `Date` vero. La conversione vive qui:
// `parseDataItaliana` traduce l'abbreviazione del mese italiano nell'indice
// 0-11 e costruisce la data con `Date.UTC(...)`, non `new Date(anno, mese,
// giorno)`: quel costruttore legge i tre numeri nel fuso locale della
// macchina che compila, quindi con CEST (UTC+2) mezzanotte del 25 diventa
// le 22:00 UTC del 24 — un giorno indietro nel feed, e solo perché i
// runner di GitHub Actions girano in UTC il difetto non si vedrebbe in
// produzione. Gli articoli non hanno una pagina propria (task 14), quindi
// ogni `link` punta a `/note`.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { note } from '../data/note';

const MESI_IT: Record<string, number> = {
  gen: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  mag: 4,
  giu: 5,
  lug: 6,
  ago: 7,
  set: 8,
  ott: 9,
  nov: 10,
  dic: 11,
};

/** «25 ago 2026» -> Date.UTC(2026, 7, 25), indipendente dal fuso locale. */
function parseDataItaliana(data: string): Date {
  const [giorno, meseAbbr, anno] = data.split(' ');
  const mese = MESI_IT[meseAbbr.toLowerCase()];
  return new Date(Date.UTC(Number(anno), mese, Number(giorno)));
}

export function GET(context: APIContext) {
  return rss({
    title: 'Note — Alessandro Flaborea',
    description: 'Quello che imparo mentre lo imparo.',
    site: context.site!,
    items: note.map((n) => ({
      title: n.titolo,
      description: n.sommario,
      pubDate: parseDataItaliana(n.data),
      link: '/note',
    })),
  });
}
