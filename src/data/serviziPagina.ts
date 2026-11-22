// Testi in linea di /servizi. Erano scritti dentro il markup, in due copie —
// una per lingua — insieme a 157 righe di stile identiche. Il contenuto vero
// (le quattro competenze e la FAQ) resta in src/data/servizi.ts.
//
// Le tre etichette delle schede sono qui e non hanno un valore di riserva:
// erano scritte in italiano dentro la scheda (oggi SchedaCompetenza.astro) e sono finite sulla
// pagina inglese. Un default le lascerebbe passare di nuovo.
export interface TestiServiziPagina {
  occhiello: string;
  titolo: string;
  introduzione: string;
  etichettaPerChi: string;
  etichettaQuantoDura: string;
  etichettaCosaResta: string;
  etichettaProve: string;
  /** aria-label dell'indice fisso a sinistra delle competenze. */
  etichettaIndice: string;
  linkLavori: string;
  labelDomande?: string;
  titoloDomande: string;
  titoloChiusura: string;
  introChiusura: string;
  etichettaCta: string;
}


export const testiServiziPagina: TestiServiziPagina = {
  occhiello: "Servizi",
  titolo: "Cosa so fare",
  introduzione: "Direzione tecnica, costruzione, sicurezza, ricerca. Quattro mestieri diversi, una persona sola: chi analizza il problema è anche chi poi scrive il codice.",
  etichettaPerChi: "Per chi",
  etichettaQuantoDura: "Quanto dura",
  etichettaCosaResta: "Cosa resta",
  etichettaProve: "Le prove",
  etichettaIndice: "Le quattro competenze",
  linkLavori: "Le prove: quello che ho costruito",
  labelDomande: "Domande",
  titoloDomande: "Quelle che mi vengono fatte quasi sempre",
  titoloChiusura: "Come si comincia",
  introChiusura: "Mi scrivete due righe su cosa vorreste costruire, sistemare o capire, e ci sentiamo mezz'ora. Se c'è margine per lavorare insieme ci vediamo; altrimenti ve lo dico subito, e se conosco qualcuno più adatto vi metto in contatto.",
  etichettaCta: "Parliamone, mezz'ora",
};
