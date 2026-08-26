// src/lib/immagine.ts — le URL delle immagini caricate dentro una nota.
//
// Sanity conserva l'originale e genera le varianti su richiesta: `urlFor`
// costruisce l'indirizzo con le trasformazioni volute, e la larghezza va
// chiesta esplicitamente perché il valore predefinito è l'originale — su una
// foto scattata col telefono significa spedire diversi megabyte a chi legge.
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { sanity } from './sanity';

const builder = createImageUrlBuilder(sanity);

/** Immagine ridimensionata, in formato moderno, per il corpo di una nota. */
export function urlImmagine(fonte: SanityImageSource, larghezza = 1120): string {
  return builder.image(fonte).width(larghezza).auto('format').fit('max').url();
}
