// src/data/coppie.mjs — le coppie di rotte italiano ↔ inglese.
//
// Ogni pagina dichiara già la propria gemella a BaseLayout (`pathEn`/`pathIt`)
// e da lì escono gli `hreflang` nell'`head`. La sitemap però non vede quelle
// props: l'integrazione i18n di `@astrojs/sitemap` appaia gli URL per
// struttura del percorso, quindi riconosceva `/privacy/` ↔ `/en/privacy/` ma
// non `/chi-sono/` ↔ `/en/about/`, dove gli slug differiscono. Su
// trentotto URL ne dichiarava alternati quattro.
//
// Questo file è la mappa che mancava. Non è una seconda verità: dopo il
// build, `verifica-rotte.mjs` confronta ogni coppia trovata negli `hreflang`
// del costruito con questo elenco, e fallisce se i due divergono.
//
// È `.mjs` e non `.ts` perché lo leggono sia `astro.config.mjs` sia gli
// script di verifica, che girano con node semplice.
//
// I percorsi hanno la barra finale, come li serve GitHub Pages e come li
// scrive `localizedPath`.

/** Le dieci pagine con una gemella dallo slug diverso o uguale. */
const PAGINE = [
  ["/", "/en/"],
  ["/servizi/", "/en/services/"],
  ["/formazione/", "/en/training/"],
  ["/lavori/", "/en/work/"],
  ["/ricerca/", "/en/research/"],
  ["/chi-sono/", "/en/about/"],
  ["/i-vostri-dati/", "/en/your-data/"],
  ["/note/", "/en/notes/"],
  ["/privacy/", "/en/privacy/"],
  ["/cookie/", "/en/cookies/"],
];

// Le schede di lavoro con testo inglese approvato. `portale-ricambi` e `grip`
// non ci sono: sono `soloItaliano` in projects.ts, quindi la rotta inglese
// non esiste e dichiarare un alternato sarebbe una promessa a vuoto.
const LAVORI_BILINGUE = [
  "procedo",
  "agentic-toolkit",
  "spannum",
  "fanta-mundial",
  "procedo-tracking-costs",
  "contrada-navigator",
  "vault",
  "homesweathome",
];

/** `[percorsoItaliano, percorsoInglese]` per ogni pagina che ha una gemella. */
export const COPPIE = [
  ...PAGINE,
  ...LAVORI_BILINGUE.map((slug) => [`/lavori/${slug}/`, `/en/work/${slug}/`]),
];

/** La gemella di un percorso, in qualunque delle due lingue lo si chieda. */
export function gemella(percorso) {
  for (const [it, en] of COPPIE) {
    if (it === percorso) return { it, en };
    if (en === percorso) return { it, en };
  }
  return undefined;
}
