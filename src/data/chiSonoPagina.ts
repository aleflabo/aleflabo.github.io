// Testi in linea di /chi-sono. Erano dentro il markup, in due copie — una
// per lingua — insieme a 223 righe di stile. La biografia, «In breve» e le
// abitudini restano in src/data/chiSono.ts.
//
// `segnapostoNota` esiste solo in italiano: è l'istruzione al committente su
// che fotografia scattare, e la tavola dice esplicitamente che non ha una
// versione inglese. Per questo il campo è facoltativo e il componente non
// rende il paragrafo quando manca.
export interface TestiChiSonoPagina {
  occhiello: string;
  titolo: string;
  segnaportiolo: string;
  labelInBreve: string;
  ctaPrimaria: string;
  ctaCurriculum: string;
  ctaLavori: string;
  labelComeLavoro: string;
  titoloAbitudini: string;
  labelFuori: string;
  corpoFuori: string;
  segnapostoNota?: string;
  hrefCv: string;
}


export const testiChiSonoPagina: TestiChiSonoPagina = {
  occhiello: "Chi sono",
  titolo: "Alessandro Flaborea",
  segnaportiolo: "[ LA TUA FOTO ]",
  labelInBreve: "In breve",
  ctaPrimaria: "Prenota la mezza giornata diagnostica",
  ctaCurriculum: "Scarica il curriculum",
  ctaLavori: "Quello che ho costruito",
  labelComeLavoro: "Come lavoro, in concreto",
  titoloAbitudini: "Abitudini che vale la pena sapere prima",
  labelFuori: "Fuori dal lavoro",
  corpoFuori: "Il filo che tiene insieme tutto è la curiosità, per problemi nuovi, posti nuovi e persone nuove. Mi ha portato da Udine a Roma e da Göteborg ad Amsterdam, e continua a decidere cosa costruisco nei fine settimana.",
  segnapostoNota: "Sguardo in camera, luce naturale, sfondo neutro. Niente giacca se non la porti mai: chi ti incontra poi deve riconoscerti.",
  hrefCv: "/cv/Alessandro_Flaborea_Resume_it.pdf",
};
