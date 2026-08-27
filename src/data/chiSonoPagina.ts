// Testi in linea di /chi-sono. Erano dentro il markup, in due copie — una
// per lingua — insieme a 223 righe di stile. La biografia, «In breve» e le
// abitudini restano in src/data/chiSono.ts.
//
// Il riquadro segnaposto è stato sostituito dalla fotografia vera: i due
// campi che lo descrivevano — il titolo «[ LA TUA FOTO ]» e la nota su come
// scattarla — erano istruzioni al committente, non testo pubblicato, e sono
// spariti con lui. Al loro posto c'è il testo alternativo dell'immagine.
export interface TestiChiSonoPagina {
  occhiello: string;
  titolo: string;
  /** Testo alternativo della fotografia. */
  altRitratto: string;
  labelInBreve: string;
  ctaPrimaria: string;
  ctaCurriculum: string;
  ctaLavori: string;
  labelComeLavoro: string;
  titoloAbitudini: string;
  labelFuori: string;
  corpoFuori: string;
  hrefCv: string;
}


export const testiChiSonoPagina: TestiChiSonoPagina = {
  occhiello: "Chi sono",
  titolo: "Alessandro Flaborea",
  altRitratto: "Alessandro Flaborea, a braccia conserte, su fondo bianco",
  labelInBreve: "In breve",
  ctaPrimaria: "Prenota la mezza giornata diagnostica",
  ctaCurriculum: "Scarica il curriculum",
  ctaLavori: "Quello che ho costruito",
  labelComeLavoro: "Come lavoro, in concreto",
  titoloAbitudini: "Abitudini che vale la pena sapere prima",
  labelFuori: "Fuori dal lavoro",
  corpoFuori: "Il filo che tiene insieme tutto è la curiosità, per problemi nuovi, posti nuovi e persone nuove. Mi ha portato da Udine a Roma e da Göteborg ad Amsterdam, e continua a decidere cosa costruisco nei fine settimana.",
  hrefCv: "/cv/Alessandro_Flaborea_Resume_it.pdf",
};
