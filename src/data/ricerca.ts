// Testi di /ricerca. Estratti dal markup della pagina, che li teneva in
// linea e quindi in due copie — una per lingua — insieme a 249 righe di
// stile identiche. Ora la pagina è un guscio e il corpo vive in
// src/components/pagine/CorpoRicerca.astro.
//
// I valori sono quelli che erano in pagina, presi meccanicamente e non
// ritrascritti: su questo progetto il copy riscritto a mano è già costato
// sei incidenti.
export interface TestiRicerca {
  occhiello: string;
  titolo: string;
  introduzione: string;
  riquadroLabel: string;
  riquadroCorpo: string;
  riquadroCorpoMuto: string;
  riquadroLink: string;
  /** Rotta della scheda Procedo, senza prefisso di lingua. */
  hrefRiquadro: string;
  titoloPubblicazioni: string;
  introElenco: string;
  linkScholar: string;
  linkGithub: string;
  titoloCodice: string;
  corpoCodice: string;
}


export const ricerca: TestiRicerca = {
  occhiello: "Ricerca",
  titolo: "La ricerca da cui viene il resto",
  introduzione: "Dottorato al Perception and Intelligence Lab della Sapienza, dal 2021 al 2024, e un periodo di ricerca all'Università di Amsterdam. Anomaly detection, riconoscimento delle azioni e apprendimento delle procedure: capire cosa sta facendo una persona guardandola.",
  riquadroLabel: "Cosa c'entra con la tua azienda",
  riquadroCorpo: "Senza gergo: ho passato anni a insegnare a un computer a guardare una persona che lavora e ad accorgersi che sta sbagliando un passaggio, mentre lo sta facendo.",
  riquadroCorpoMuto: "È la stessa domanda che si fa un capo reparto quando gira fra le postazioni. Da lì è nato Procedo, e da lì viene il modo in cui affronto i problemi che mi portano: prima si guarda come il lavoro viene fatto davvero, poi si decide cosa automatizzare.",
  riquadroLink: "Dove quella ricerca è diventata un prodotto",
  hrefRiquadro: "/lavori/procedo",
  titoloPubblicazioni: "Le pubblicazioni",
  introElenco: "Dalla più recente. Dove esiste il repository pubblico sono indicate le stelle su GitHub.",
  linkScholar: "Elenco completo su Google Scholar",
  linkGithub: "Il codice su GitHub",
  titoloCodice: "Perché ogni articolo esce con il codice",
  corpoCodice: "Un articolo che esce con il codice si può rifare da capo: chiunque scarica il repository, lancia gli esperimenti e ottiene gli stessi numeri. È il modo in cui ho lavorato per ogni pubblicazione, ed è lo stesso che porto nei progetti: quello che consegno si apre, si legge e si esegue.",
};
