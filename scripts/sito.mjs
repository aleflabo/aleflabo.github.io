// scripts/sito.mjs — il dominio del sito, letto da astro.config.mjs.
//
// Prima stava scritto a mano in due punti: `verifica-hreflang.mjs` lo
// confrontava con gli `hreflang` assoluti, e `verifica-rotte.mjs` segnalava
// come errore qualunque pagina nominasse «flaborea.com» — regola giusta
// finché quel dominio non esisteva, e sbagliata dal giorno dopo. Cambiare
// `site` faceva fallire le verifiche invece di farle seguire il sito.
import { readFileSync } from "node:fs";

const config = readFileSync("astro.config.mjs", "utf8");
const trovato = config.match(/site:\s*['"]([^'"]+)['"]/);
if (!trovato) {
  console.error("✗ non riesco a leggere `site` da astro.config.mjs");
  process.exit(1);
}

/** Il dominio dichiarato in astro.config.mjs, senza barra finale. */
export const SITE = trovato[1].replace(/\/$/, "");
