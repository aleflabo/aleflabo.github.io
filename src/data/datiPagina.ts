// Testi in linea di /i-vostri-dati. Erano scritti dentro il markup, quindi in
// due copie — una per lingua — insieme a 277 righe di stile identiche riga
// per riga. Il resto del contenuto (risposta corta, situazioni, impegni)
// stava già in src/data/dati.ts e resta lì.
//
// Presi meccanicamente dal markup, non ritrascritti.
export interface TestiDatiPagina {
  occhiello: string;
  titolo: string;
  titoloSituazioni: string;
  introSituazioni: string;
  labelOnesta: string;
  labelCredete: string;
  titoloDomanda: string;
  introDomanda: string;
  etichettaScrivimi: string;
}


export const testiDatiPagina: TestiDatiPagina = {
  occhiello: "I vostri dati",
  titolo: "Che fine fanno i vostri dati",
  titoloSituazioni: "Situazioni che vengono confuse spesso",
  introSituazioni: "Il rischio cambia moltissimo a seconda di cosa si sta facendo. Tenerle separate è già metà della risposta.",
  labelOnesta: "Onestà",
  labelCredete: "Perché mi credete",
  titoloDomanda: "Fatemi la domanda che qui non trova risposta",
  introDomanda: "Se è una buona domanda finisce su questa pagina, così la prossima azienda la trova già scritta.",
  etichettaScrivimi: "Scrivimi",
};
