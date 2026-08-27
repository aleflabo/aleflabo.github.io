import type { Locale } from "../i18n/ui";

/**
 * Le statistiche del sito, e la verifica di proprietà per i motori.
 *
 * **Un interruttore solo.** Da qui dipendono tre cose che finora, su questo
 * progetto, si sono sempre disallineate a mano: lo script che raccoglie le
 * visite, la sezione delle informative che lo descrive, e il controllo in
 * `scripts/verifica-rotte.mjs` che pretende che le due cose coincidano.
 * Finché `statistiche` è `null` il sito non carica niente da fuori e le
 * informative dicono che non ci sono strumenti di statistica — che è la
 * verità di adesso. Il giorno in cui si riempie, cambiano insieme.
 *
 * Perché non Google Analytics: il sito dichiara, in una pagina che invita a
 * verificarlo aprendo gli strumenti per sviluppatori, di non usare cookie.
 * GA4 ne scrive due e richiederebbe un banner di consenso. Uno strumento
 * senza cookie non tocca quella promessa — tocca solo la frase «nessuna
 * risorsa viene caricata da server di terzi», che infatti cambia insieme a
 * questo file.
 *
 * Le query di ricerca — cioè le parole con cui la gente arriva — non stanno
 * qui e non stanno in nessuno strumento di statistica: Google le toglie. Sono
 * in Search Console, che non richiede codice ma solo `verificaGoogle`.
 */
export interface Statistiche {
  /** Nome dello strumento, come compare nelle informative. */
  nome: string;
  /** Chi lo gestisce e dove tiene i dati, per l'informativa. */
  titolare: string;
  /** L'URL dello script. Deve essere l'unica risorsa esterna del sito. */
  script: string;
  /** Il dominio dichiarato allo strumento. */
  dominio: string;
  /** L'informativa dello strumento, per chi vuole leggerla. */
  informativa: string;
}

/**
 * `null` = nessuno strumento di statistica, ed è lo stato di adesso.
 *
 * Per accenderlo serve un account, che non si può creare da qui. Scelta fatta
 * il 27 agosto 2026: uno strumento **senza cookie** e ospitato in UE. Quando
 * c'è l'account, questo oggetto si riempie e basta — il resto segue.
 *
 * Esempio, con Umami Cloud (piano gratuito, dati in UE):
 *
 * ```ts
 * export const statistiche: Statistiche | null = {
 *   nome: "Umami",
 *   titolare: "Umami Software, Inc., con i dati ospitati nell'Unione Europea",
 *   script: "https://eu.umami.is/script.js",
 *   dominio: "flaborea.com",
 *   informativa: "https://umami.is/privacy",
 * };
 * ```
 */
export const statistiche: Statistiche | null = null;

/**
 * I codici di verifica della proprietà del sito. Non sono statistiche e non
 * raccolgono niente: sono un `<meta>` che dimostra a un motore che il sito è
 * tuo, e servono ad aprire Search Console (Google) e Webmaster Tools (Bing).
 *
 * Search Console è lo strumento che dice **come ti trovano**: le query, le
 * impressioni, i clic, la posizione, e quali pagine sono indicizzate. È la
 * cosa che serviva davvero, e costa zero al lettore.
 *
 * Stringa vuota = nessun `<meta>` reso.
 */
export const verificaGoogle = "";
export const verificaBing = "";

/**
 * La sezione da aggiungere alle informative quando `statistiche` non è `null`.
 * Vive qui, accanto all'interruttore, così non può restare indietro.
 */
export function sezioneStatistiche(
  lang: Locale,
  s: Statistiche,
): { titolo: string; paragrafi: string[] } {
  if (lang === "it") {
    return {
      titolo: "Le visite, contate senza riconoscervi",
      paragrafi: [
        `Da questa pagina il vostro browser carica un piccolo script di ${s.nome} (${s.titolare}). Conta le visite e le pagine viste, e riporta da quale sito siete arrivati.`,
        "Non scrive cookie, non lascia niente nel vostro browser e non costruisce un profilo: due visite dello stesso lettore in due giorni diversi non risultano collegate. Per le regole europee non richiede consenso, ed è il motivo per cui non trovate un banner.",
        `Se volete leggere l'informativa dello strumento: ${s.informativa}`,
      ],
    };
  }
  return {
    titolo: "Visits, counted without recognising you",
    paragrafi: [
      `From this page your browser loads a small ${s.nome} script (${s.titolare}). It counts visits and page views, and reports which site you arrived from.`,
      "It writes no cookies, leaves nothing in your browser and builds no profile: two visits by the same reader on two different days are never linked. Under European rules it needs no consent, which is why you find no banner.",
      `If you want to read the tool's own notice: ${s.informativa}`,
    ],
  };
}
