export interface Formato {
  ore: string;
  nome: string;
  corpo: string;
  perChi: string;
  serveDaVoi: string;
}

export const formati: Formato[] = [
  {
    ore: "4 ore",
    nome: "Corso introduttivo",
    corpo: "Per tutta l'azienda insieme, dal titolare al reparto. Come funzionano questi strumenti, in che modo sbagliano e come ci si accorge che stanno sbagliando, che fine fanno i documenti che ci si incolla dentro, e quali sono i casi in cui conviene davvero usarli.",
    perChi: "Tutti, compreso chi non ha mai aperto ChatGPT",
    serveDaVoi: "Una sala e un proiettore",
  },
  {
    ore: "8-12 ore",
    nome: "Laboratorio per funzione",
    corpo: "Ufficio tecnico, acquisti, amministrazione, commerciale: ogni gruppo lavora sui propri documenti e sui propri casi. Si parte da un'attività che oggi occupa ore e si prova a ridurla, insieme, durante la lezione.",
    perChi: "Un reparto alla volta, gruppi piccoli",
    serveDaVoi: "Documenti reali e il permesso di usarli",
  },
  {
    ore: "Durata concordata",
    nome: "Percorso finanziato",
    corpo: "Quando serve un percorso lungo senza impegnare cassa. Si costruisce insieme a un ente accreditato, che si occupa della parte amministrativa e della rendicontazione.",
    perChi: "Aziende con dipendenti già iscritte a un fondo",
    serveDaVoi: "Sapere a quale fondo siete iscritti. Al resto si pensa insieme",
  },
];

export interface RiquadroAiAct {
  titolo: string;
  corpo: string[];
  link: { testo: string; href: string };
}

// «Una cosa che conviene sapere», sezione /formazione.
export const riquadroAiAct: RiquadroAiAct = {
  titolo: "Una cosa che conviene sapere",
  corpo: [
    "Dal 2 febbraio 2025 l'articolo 4 dell'AI Act chiede alle aziende che usano strumenti di intelligenza artificiale di garantire una formazione minima al personale, e di essere in grado di documentarla. Vale anche per chi usa soltanto ChatGPT, e non riguarda solo l'ufficio informatico.",
    "Il corso di base che soddisfa quella richiesta è dell'ordine delle quattro ore. È una formazione che l'azienda farà comunque: vale la pena che serva anche a lavorare meglio.",
  ],
  link: { testo: "Che fine fanno i vostri dati", href: "/i-vostri-dati" },
};

export interface Strada {
  titolo: string;
  testo: string;
}

// «Chi sostiene il costo del corso», le tre strade, sezione /formazione.
export const strade: Strada[] = [
  {
    titolo: "Direttamente",
    testo: "Mi contattate, concordiamo data e contenuti, fatturo all'azienda. È la strada più rapida: si può partire in un paio di settimane.",
  },
  {
    titolo: "Tramite ente accreditato",
    testo: "L'ente organizza e io insegno. È la strada da percorrere quando il corso deve rientrare in un catalogo regionale o avere un riconoscimento formale.",
  },
  {
    titolo: "Con i fondi interprofessionali",
    testo: "Le aziende con dipendenti versano già lo 0,30% del monte salari a un fondo come Fondimpresa. Quel denaro può essere usato per formare le persone, e serve un ente che presenti il piano.",
  },
];
