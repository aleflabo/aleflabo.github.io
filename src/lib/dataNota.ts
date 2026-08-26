// src/lib/dataNota.ts — le date delle note, da ISO alle due lingue.
//
// Sanity consegna un campo `date` come «2026-08-25». Le pagine lo mostrano
// come «25 ago 2026» in italiano e «25 Aug 2026» in inglese, che sono i
// formati già usati nel disegno. Il feed RSS vuole invece un `Date` vero.
//
// Tutte e tre le conversioni partono dalla stessa stringa ISO e passano da
// `Date.UTC`, mai dal costruttore a tre numeri: quello legge i valori nel
// fuso della macchina che costruisce, e con l'ora legale italiana la
// mezzanotte del 25 diventa le 22:00 del 24 — un giorno indietro nel feed.
// È già successo su questo sito.

const MESI_IT = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
const MESI_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** «2026-08-25» -> [2026, 7, 25], con il mese in indice 0-11. */
function pezzi(iso: string): [number, number, number] {
  const [anno, mese, giorno] = iso.slice(0, 10).split('-').map(Number);
  return [anno, mese - 1, giorno];
}

/** «2026-08-25» -> «25 ago 2026». */
export function dataIt(iso: string): string {
  const [anno, mese, giorno] = pezzi(iso);
  return `${giorno} ${MESI_IT[mese]} ${anno}`;
}

/** «2026-08-25» -> «25 Aug 2026». */
export function dataEn(iso: string): string {
  const [anno, mese, giorno] = pezzi(iso);
  return `${giorno} ${MESI_EN[mese]} ${anno}`;
}

/** «2026-08-25» -> mezzanotte UTC del 25, indipendente dal fuso locale. */
export function dataUtc(iso: string): Date {
  const [anno, mese, giorno] = pezzi(iso);
  return new Date(Date.UTC(anno, mese, giorno));
}
