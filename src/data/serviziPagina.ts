// Testi in linea di /servizi. Erano scritti dentro il markup, in due copie —
// una per lingua — insieme a 157 righe di stile identiche. Il contenuto vero
// (i quattro ingaggi, la FAQ, «per chi non sono») resta in src/data/servizi.ts.
//
// Le tre etichette delle schede sono qui e non hanno un valore di riserva:
// erano scritte in italiano dentro SchedaIngaggio.astro e sono finite sulla
// pagina inglese. Un default le lascerebbe passare di nuovo.
export interface TestiServiziPagina {
  occhiello: string;
  titolo: string;
  introduzione: string;
  etichettaPerChi: string;
  etichettaQuantoDura: string;
  etichettaCosaResta: string;
  linkLavori: string;
  labelOnesta: string;
  titoloOnesta: string;
  labelDomande: string;
  titoloDomande: string;
  titoloChiusura: string;
  introChiusura: string;
  etichettaCta: string;
}


export const testiServiziPagina: TestiServiziPagina = {
  occhiello: "Servizi",
  titolo: "Quattro modi di lavorare insieme",
  introduzione: "Si parte dal primo. Ogni passo è a sé: si prosegue quando il lavoro lo richiede, ci si può fermare in qualsiasi momento, e quello che è stato fatto resta comunque vostro.",
  etichettaPerChi: "Per chi",
  etichettaQuantoDura: "Quanto dura",
  etichettaCosaResta: "Cosa resta",
  linkLavori: "Le prove: quello che ho costruito",
  labelOnesta: "Onestà",
  titoloOnesta: "Per chi non sono",
  labelDomande: "Domande",
  titoloDomande: "Quelle che mi vengono fatte quasi sempre",
  titoloChiusura: "Come si comincia",
  introChiusura: "Mi scrivi due righe su cosa vorreste smettere di fare a mano e ci sentiamo mezz'ora. Se c'è margine per lavorare insieme ci vediamo di persona; altrimenti te lo dico subito, e se conosco qualcuno più adatto ti metto in contatto.",
  etichettaCta: "Parliamone, mezz'ora",
};
