// src/lib/note.ts — le note, lette da Sanity in fase di costruzione.
//
// Sostituisce src/data/note.ts e src/data/en/note.ts, che erano elenchi
// scritti a mano senza corpo dell'articolo.
//
// **Le due lingue.** Una nota è italiana: titolo, sommario e corpo sono
// obbligatori. I campi inglesi sono facoltativi, e una nota conta come
// tradotta solo quando ha tutti e tre — un titolo inglese su un corpo
// italiano darebbe una pagina che promette una lingua e ne parla un'altra.
// Le note non tradotte compaiono comunque su /en/notes, in italiano e
// marcate `lang="it"`: è una scelta del committente, e la marcatura la
// rende dichiarata invece che subita, sia per chi legge con la sintesi
// vocale sia per il controllo che vieta l'italiano sulle pagine inglesi.
import type { PortableTextBlock } from '@portabletext/types';
import { sanity } from './sanity';

export interface Nota {
  slug: string;
  /** ISO, «2026-08-25»: la formattazione vive in dataNota.ts. */
  data: string;
  titolo: string;
  sommario: string;
  tag: string[];
  corpo: PortableTextBlock[];
  titoloEn?: string;
  sommarioEn?: string;
  corpoEn?: PortableTextBlock[];
}

const QUERY = `*[_type == "nota" && defined(slug.current) && defined(data)] | order(data desc) {
  "slug": slug.current,
  data,
  titolo,
  sommario,
  "tag": coalesce(tag, []),
  corpo,
  titoloEn,
  sommarioEn,
  corpoEn
}`;

/**
 * Tutte le note, dalla più recente.
 *
 * Un errore qui ferma la costruzione di proposito. L'alternativa —
 * restituire un elenco vuoto e tirare avanti — pubblicherebbe un sito senza
 * note ogni volta che Sanity ha un singhiozzo, e senza che nessuno se ne
 * accorga: un deploy fallito si vede, una pagina svuotata no.
 */
export async function tutteLeNote(): Promise<Nota[]> {
  return await sanity.fetch<Nota[]>(QUERY);
}

/** Vero quando la nota ha una versione inglese completa. */
export function tradotta(n: Nota): boolean {
  return Boolean(n.titoloEn && n.sommarioEn && n.corpoEn?.length);
}
