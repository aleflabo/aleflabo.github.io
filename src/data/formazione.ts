import type { Domanda } from "./servizi";
import type { FonteAiAct } from "./fontiAiAct";

// I corsi di /formazione (spec formazione 2026-11-08). Testi approvati l'8
// novembre 2026: testi.md, sezione «/formazione e policy — Laboratorio».
// Due famiglie, per tutta l'azienda e per i team tecnici; i corsi tecnici
// hanno un livello base e uno avanzato. Il «Percorso finanziato» non è più un
// formato: è una delle strade di «Chi sostiene il costo del corso».
export interface Livello {
  nome?: "base" | "avanzato";
  durata: string;
  perChi: string;
  moduli: string[];
}

export interface Corso {
  nome: string;
  famiglia: "azienda" | "tecnici";
  livelli: Livello[];
  serveDaVoi: string;
}

export interface RiquadroAiAct {
  titolo: string;
  corpo: string[];
  fonte: FonteAiAct;
}

export type DomandaAiAct = Domanda & { fonte: FonteAiAct };

export interface TestiCorsi {
  famiglie: { azienda: string; tecnici: string };
  perChi: string;
  programma: string;
  serveDaVoi: string;
  livelli: { base: string; avanzato: string };
  titoloCosaResta: string;
  notaCosaResta: string;
  titoloFaq: string;
  etichettaFonte: string;
}

export const riquadroAiAct: RiquadroAiAct = {
  titolo: "Una cosa che conviene sapere",
  corpo: [
    "Dal 2 febbraio 2025 l'articolo 4 dell'AI Act chiede alle aziende che usano strumenti di intelligenza artificiale di prendere misure perché il personale sviluppi le competenze per usarli. Vale anche per chi usa soltanto ChatGPT, e non riguarda solo l'ufficio informatico.",
    "La norma non fissa un numero di ore e non chiede un attestato: chiede di poter mostrare che cosa si è fatto. Il corso introduttivo, con il suo registro presenze, è il modo più semplice di farlo, e serve anche a lavorare meglio.",
  ],
  fonte: "commissioneQa",
};

export const dettagliPratici: string[] = ["In presenza oppure online.", "Al massimo 10 persone per lezione."];

export const corsi: Corso[] = [
  {
    nome: "Corso introduttivo",
    famiglia: "azienda",
    livelli: [
      { durata: "4 ore", perChi: "Tutti, compreso chi non ha mai aperto ChatGPT", moduli: [
        "Come funzionano questi strumenti, e perché a volte sbagliano con sicurezza",
        "Accorgersi di un errore: fonti, numeri, citazioni da controllare",
        "Che fine fanno i documenti che ci si incolla dentro, e quali impostazioni usare",
        "Dove conviene usarli davvero, con esempi presi dal vostro lavoro",
        "Cosa chiede l'AI Act alla vostra azienda, senza allarmismi",
      ] },
    ],
    serveDaVoi: "Una sala e un proiettore",
  },
  {
    nome: "Laboratorio per funzione",
    famiglia: "azienda",
    livelli: [
      { durata: "8-12 ore", perChi: "Un reparto alla volta, gruppi piccoli", moduli: [
        "Si sceglie un'attività del reparto che oggi occupa ore",
        "Si prova con gli strumenti sui documenti veri",
        "Si misura quanto tempo si risparmia e dove lo strumento sbaglia",
        "Si scrive la procedura che il reparto userà dal giorno dopo",
      ] },
    ],
    serveDaVoi: "Documenti reali e il permesso di usarli",
  },
  {
    nome: "Python",
    famiglia: "tecnici",
    livelli: [
      { nome: "base", durata: "8 ore", perChi: "Chi non ha mai programmato, o è arrivato al limite delle formule di Excel", moduli: [
        "Preparare il computer e scrivere il primo programma",
        "Variabili, liste, condizioni e cicli, su dati veri",
        "Leggere e scrivere file Excel e CSV",
        "Automatizzare un'attività ripetitiva dell'ufficio",
        "Farsi aiutare dall'AI a scrivere codice, e come controllarlo",
      ] },
      { nome: "avanzato", durata: "12-16 ore", perChi: "Chi scrive già script e vuole che reggano nel tempo", moduli: [
        "Un progetto in ordine: ambienti, dipendenze, struttura",
        "Test automatici",
        "Analizzare dati con pandas",
        "Chiamare API e modelli linguistici da Python",
        "Far girare uno script da solo: pianificazione, log, errori",
      ] },
    ],
    serveDaVoi: "Un portatile a testa",
  },
  {
    nome: "Claude Code",
    famiglia: "tecnici",
    livelli: [
      { nome: "base", durata: "8 ore", perChi: "Chi vuole costruire piccoli strumenti con un agente, anche senza saper programmare", moduli: [
        "Cos'è un agente di programmazione e cosa fa sul vostro computer",
        "Dal problema al primo strumento funzionante, in aula",
        "Leggere quello che l'agente ha fatto e accorgersi quando sbaglia",
        "Permessi e dati: cosa non lasciargli fare",
        "Tenere il lavoro in ordine: versioni e documentazione",
      ] },
      { nome: "avanzato", durata: "12-16 ore", perChi: "Sviluppatori che vogliono lavorare con un agente dentro il proprio codice", moduli: [
        "Preparare il progetto: istruzioni, memoria, regole",
        "Pianificare prima di scrivere: specifiche e piani",
        "Prima i test, poi il codice, con l'agente",
        "Comandi, skill, hook e strumenti esterni (MCP)",
        "Revisione del codice e più agenti in parallelo",
      ] },
    ],
    serveDaVoi: "Un portatile a testa e un account con un piano attivo: senza, si raggiungono subito i limiti d'uso",
  },
];

export const cosaResta: string[] = ["Un attestato di partecipazione per ogni persona.", "Il registro presenze con il programma svolto, da conservare come prova di quello che avete fatto per l'articolo 4.", "I materiali del corso."];

export const faqAiAct: DomandaAiAct[] = [
  { domanda: "Serve un attestato?", risposta: "No. La Commissione europea scrive che non serve un certificato e che basta tenere un registro interno delle formazioni. L'attestato che rilascio è una prova in più, non un obbligo.", fonte: "commissioneQa" },
  { domanda: "Deve farlo un ente accreditato?", risposta: "No: la norma non pone requisiti a chi fa formazione. Un ente serve solo se il corso è pagato con un fondo interprofessionale o deve entrare in un catalogo regionale.", fonte: "commissioneQa" },
  { domanda: "Quante ore servono?", risposta: "La norma non le fissa, e non fissa nemmeno un programma: dipende da chi usa quali strumenti e con quali rischi. Il corso introduttivo da quattro ore è la misura di base che propongo.", fonte: "commissioneQa" },
  { domanda: "Vale anche se usiamo solo ChatGPT?", risposta: "Sì. L'articolo 4 riguarda chi usa sistemi di intelligenza artificiale per conto dell'azienda, senza soglie di dimensione.", fonte: "regolamento2026_1744" },
  { domanda: "Riguarda anche i collaboratori esterni?", risposta: "Sì: il testo parla del personale e delle altre persone che usano questi sistemi per conto dell'azienda.", fonte: "regolamento2026_1744" },
  { domanda: "Da quando si rischiano sanzioni?", risposta: "L'obbligo esiste dal 2 febbraio 2025. Le autorità nazionali vigilano dal 2 agosto 2026.", fonte: "commissioneQa" },
  { domanda: "La legge italiana aggiunge obblighi?", risposta: "No. La Legge 132 del 2025 dichiara di non produrre obblighi nuovi rispetto all'AI Act.", fonte: "legge132" },
];

export const testiCorsi: TestiCorsi = {
  famiglie: { azienda: "Per tutta l'azienda", tecnici: "Per i team tecnici" },
  perChi: "per chi",
  programma: "programma",
  serveDaVoi: "serve da voi",
  livelli: { base: "base", avanzato: "avanzato" },
  titoloCosaResta: "Cosa resta all'azienda",
  notaCosaResta: "L'attestato certifica la presenza: non è una qualifica e non ha valore legale.",
  titoloFaq: "L'AI Act, in sette domande",
  etichettaFonte: "fonte",
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
