// Testi in linea di /formazione. Erano scritti dentro il markup, in due copie —
// una per lingua — insieme a 297 righe di stile identiche: la coppia più
// pesante del sito. I tre formati, il riquadro sull'AI Act e le tre strade
// restano in src/data/formazione.ts.
export interface TestiFormazionePagina {
  occhiello: string;
  titolo: string;
  introduzione: string;
  etichettaPerChi: string;
  etichettaServeDaVoi: string;
  labelOrganizza: string;
  titoloOrganizza: string;
  labelCattedra: string;
  titoloCattedra: string;
  labelOnesta: string;
  titoloOnesta: string;
  titoloChiusura: string;
  introChiusura: string;
  etichettaWhatsapp: string;
  corpiCattedra: string[];
  corpiOnesta: string[];
}


export const testiFormazionePagina: TestiFormazionePagina = {
  occhiello: "Formazione",
  titolo: "Corsi che si usano il giorno dopo",
  introduzione: "In aula si lavora sui documenti dell'azienda e sui casi che capitano davvero. L'obiettivo è che ognuno esca con qualcosa che può mettere in pratica subito.",
  etichettaPerChi: "Per chi",
  etichettaServeDaVoi: "Serve da voi",
  labelOrganizza: "Come si organizza",
  titoloOrganizza: "Chi sostiene il costo del corso",
  labelCattedra: "Chi sale in cattedra",
  titoloCattedra: "Vengo dall'aula",
  labelOnesta: "Onestà",
  titoloOnesta: "Che cosa questo corso non è",
  titoloChiusura: "Raccontami che azienda siete",
  introChiusura: "Quante persone siete, cosa fate e chi userebbe questi strumenti. Da lì si capisce quale delle tre strade conviene.",
  etichettaWhatsapp: "WhatsApp",
  corpiCattedra: ["Quattro anni come assistente alla didattica alla Sapienza, dal 2019 al 2023, durante il dottorato. Poi due anni a costruire software che le persone usano ogni giorno. In aula servono entrambe: la prima per riuscire a farsi capire, la seconda per insegnare cose che in azienda reggono.", "Sono stato anche relatore invitato al Data Science Hub di Ferrari S.p.A."],
  corpiOnesta: ["Non è un corso di programmazione. Si lavora sugli strumenti che esistono già e su come portarli nel lavoro di tutti i giorni. Scrivere codice e addestrare modelli è un percorso a parte.", "Non ci sono formule pronte da copiare. Le liste di trucchi smettono di funzionare al primo cambio di modello, mentre aver capito come ragiona lo strumento resta.", "Non arrivo con una percentuale di risparmio già scritta sulle slide. Prima di aver visto come lavorate sarebbe un numero inventato."],
};
