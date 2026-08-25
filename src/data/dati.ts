export interface Situazione {
  numero: string;
  titolo: string;
  corpo: string[];
  punti?: { titolo: string; testo: string }[];
}

export const situazioniDati: Situazione[] = [
  {
    numero: "1",
    titolo: "Quando qualcuno in ufficio usa ChatGPT per conto suo",
    corpo: [
      "È la situazione più diffusa e la meno controllata. Quello che succede dipende quasi interamente da quale versione si sta usando: gli abbonamenti personali e quelli aziendali trattano i dati in modo diverso, e in alcuni casi il contenuto delle conversazioni può essere usato per migliorare il servizio, a meno che non si intervenga nelle impostazioni.",
      "La cosa da fare non è vietare lo strumento, perché verrebbe usato lo stesso di nascosto. È guardare insieme quali versioni sono in uso, che cosa dicono le loro condizioni oggi, e scrivere due righe di regola interna che le persone possano davvero seguire.",
    ],
  },
  {
    numero: "2",
    titolo: "Quando costruisco qualcosa per voi",
    corpo: [
      "Qui il controllo è totale, perché le scelte le facciamo noi. I dati stanno in un'infrastruttura intestata alla vostra azienda, in Europa, con le credenziali in mano a voi. Se domani finisce il rapporto, io esco e il sistema resta acceso.",
    ],
    punti: [
      {
        titolo: "Separazione per cliente.",
        testo: "Ogni azienda ha i propri dati isolati dagli altri, e la separazione è imposta dal database, non dal programma che ci gira sopra. È la differenza fra una regola che si può aggirare per errore e una che non si può.",
      },
      {
        titolo: "Il minimo indispensabile esce.",
        testo: "Se serve un modello esterno, gli si manda il pezzo di informazione che serve a rispondere, non l'archivio. Nel portale ricambi, per esempio, il cliente finale vede la geometria che gli serve per riconoscere il pezzo e non il modello completo della macchina.",
      },
      {
        titolo: "Registro degli accessi.",
        testo: "Chi ha visto cosa e quando resta scritto. Serve il giorno in cui qualcuno lo chiede.",
      },
      {
        titolo: "Cancellazione su richiesta.",
        testo: "Quando il lavoro finisce, i dati che avete dato a me si cancellano e ve lo confermo per iscritto.",
      },
    ],
  },
  {
    numero: "3",
    titolo: "Quando mi date dei documenti per capire il problema",
    corpo: [
      "Per la diagnosi servono file veri, non esempi ripuliti: un'estrazione dal gestionale, un elenco di articoli, qualche documento di lavoro. A seconda dell'azienda possono essere disegni, listini, schede di produzione, contratti o semplicemente mail. Restano sul mio computer, non finiscono in nessun servizio esterno, e alla fine del lavoro li cancello. Se preferite, si può firmare un accordo di riservatezza prima ancora del primo incontro: non me la prendo, è una richiesta ragionevole.",
      "Quando bastano dati finti per capire se una cosa funziona, uso dati finti. Capita più spesso di quanto si creda.",
    ],
  },
];

export interface RispostaCorta {
  intro: string;
  titolo: string;
  testo: string;
  nota: string;
}

// Testo introduttivo della pagina + il riquadro «La risposta corta».
export const rispostaCorta: RispostaCorta = {
  intro: "È la domanda che quasi nessuno fa ad alta voce e che quasi tutti si fanno. Questa pagina risponde per esteso, senza rassicurazioni generiche, così potete decidere prima di firmare qualcosa.",
  titolo: "La risposta corta",
  testo: "I vostri file restano vostri e nessuno li usa per addestrare niente. Quello che costruisco vive su un'infrastruttura intestata a voi; i documenti che mi date per capire il problema restano sul mio computer e alla fine del lavoro li cancello.",
  nota: "Sotto c'è la versione lunga, che è quella che conta: le cose che avete appena letto vanno verificate, e qui trovate come.",
};

export interface QuelloCheNonPossoGarantirvi {
  titolo: string;
  punti: string[];
}

export const quelloCheNonPossoGarantirvi: QuelloCheNonPossoGarantirvi = {
  titolo: "Quello che non posso garantirvi",
  punti: [
    "Non controllo cosa fanno i fornitori esterni con i loro sistemi. Posso sceglierli, configurarli e leggervi le condizioni, ma le loro regole le scrivono loro e cambiano nel tempo.",
    "Nessuna configurazione tiene se le credenziali girano nelle chat. La parte più fragile di qualsiasi sistema sono le abitudini delle persone, ed è anche il motivo per cui insisto sulla formazione.",
    "Non sono un avvocato. Su contratti e adempimenti formali il vostro consulente ha l'ultima parola, e fa bene ad averla.",
  ],
};

export interface SuQuestoHoLavoratoDavvero {
  titolo: string;
  corpo: string[];
  link: { testo: string; href: string }[];
}

export const suQuestoHoLavoratoDavvero: SuQuestoHoLavoratoDavvero = {
  titolo: "Su questo ho lavorato davvero",
  corpo: [
    "In Procedo ogni cliente industriale aveva i propri dati isolati dagli altri, ed è un requisito che si progetta all'inizio o non si ottiene più. Nel portale ricambi la protezione della proprietà intellettuale è una sezione del progetto, decisa prima di scrivere il codice: per un costruttore, consegnare a un fornitore i disegni delle proprie macchine è la cosa più delicata che ci sia. Vale allo stesso modo per i listini di un distributore, per le schede clienti di uno studio o per le ricette di chi produce.",
    "Le stesse regole valgono per le cose che costruisco per me: la sicurezza sta nel database e il programma viene trattato come se fosse inaffidabile, perché prima o poi lo sarà.",
    "Se state guardando questa pagina perché qualcuno vi ha parlato dell'AI Act: la parte che riguarda la formazione del personale è in vigore dal febbraio 2025, e la trovate spiegata senza allarmismi nella pagina sulla formazione.",
  ],
  link: [
    { testo: "Vai alla formazione", href: "/formazione" },
    { testo: "I quattro modi di lavorare insieme", href: "/servizi" },
  ],
};
