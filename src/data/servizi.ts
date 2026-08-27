export interface Ingaggio {
  chiave: string;
  etichetta: string;
  nome: string;
  corpo: string[];
  perChi: string;
  durata: string;
  cosaResta: string;
}

export const ingaggi: Ingaggio[] = [
  {
    chiave: "capire",
    etichetta: "Capire",
    nome: "Mezza giornata diagnostica",
    corpo: [
      "Vengo in azienda, guardo come lavorate e faccio un po' di domande. Serve a capire se c'è qualcosa che vale la pena affrontare adesso, e a volte la conclusione è che si può rimandare.",
    ],
    perChi: "Non è chiaro da dove cominciare",
    durata: "Una mattina",
    cosaResta: "Una lista dei punti dove si perde tempo, con accanto quanto costano",
  },
  {
    chiave: "decidere",
    etichetta: "Decidere",
    nome: "Audit AI",
    corpo: [
      "Guardo i dati che avete davvero, i gestionali già in uso, chi si occupa di cosa e con quali vincoli. Poi scrivo cosa converrebbe fare, in che ordine, e quali strade lascerei perdere.",
      "Il documento resta vostro. Se un domani il lavoro passa a qualcun altro, glielo consegnate e riparte da lì.",
    ],
    perChi: "Hai un'idea e vuoi sapere se regge prima di metterci soldi",
    durata: "Due o tre settimane",
    cosaResta: "Un documento che potete far leggere a chiunque, compresi altri fornitori",
  },
  {
    chiave: "costruire",
    etichetta: "Costruire",
    nome: "Software su misura",
    corpo: [
      "Dall'automazione di un singolo passaggio al sistema completo. Comincio sempre dalla parte che potrebbe non funzionare, così se qualcosa si rivela impossibile lo scopriamo quando cambiare strada costa ancora poco.",
      "Il codice è vostro e ve lo consegno, così non restate legati a me più del necessario.",
    ],
    perChi: "Hai un processo preciso che vuoi togliere di mezzo",
    durata: "Da sei settimane, a scaglioni che approvate uno alla volta",
    cosaResta: "Qualcosa che le persone usano davvero, più il codice sorgente",
  },
  {
    chiave: "mantenere",
    etichetta: "Mantenere",
    nome: "Canone di servizio",
    corpo: [
      "Un software che nessuno cura smette di essere utile nel giro di qualche mese. Il canone tiene in piedi quello che abbiamo costruito: server, aggiornamenti e le ore di modifica che servono strada facendo.",
      "Dodici mesi rinnovabili, con uscita su preavviso. Le ore incluse sono scritte nel contratto.",
    ],
    perChi: "Hai qualcosa in produzione e preferiresti non doverci pensare",
    durata: "Dodici mesi, rinnovabili, con uscita",
    cosaResta: "Server compresi, e una persona che risponde quando chiami",
  },
];

export interface Domanda {
  domanda: string;
  risposta: string;
  link?: { testo: string; href: string };
}

export const faq: Domanda[] = [
  {
    domanda: "Dove finiscono i nostri dati?",
    risposta:
      "È la domanda giusta e merita più di un paragrafo: c'è una pagina intera che la spiega, comprese le cose che non posso garantirvi. In breve: i file restano vostri e nessuno li usa per addestrare niente; quello che costruisco vive su un'infrastruttura intestata a voi.",
    link: { testo: "Leggi la pagina sui dati", href: "/i-vostri-dati/" },
  },
  {
    domanda: "Quanto costa?",
    risposta:
      "Dipende da tre cose: quanto è complicata la parte più difficile, quanti sistemi che avete già deve toccare, e se serve che qualcuno lo tenga in vita dopo. Non pubblico un listino perché un prezzo scritto senza conoscere il vostro caso sarebbe un numero inventato. Alla fine della mezza giornata diagnostica avete un preventivo scritto con le voci separate, e nessun obbligo di proseguire.",
  },
  {
    domanda: "Quanto ci vuole?",
    risposta:
      "La mezza giornata è una mattina. L'audit due o tre settimane. Un progetto parte da sei settimane e procede a scaglioni che approvate uno alla volta, così potete fermarvi a un punto qualsiasi senza perdere quello che è stato fatto.",
  },
  {
    domanda: "Cosa serve da voi?",
    risposta:
      "Mezza giornata delle persone che usano il processo tutti i giorni, qualche file preso così com'è, e una persona interna a cui poter chiedere quando serve un chiarimento. Non serve preparare niente in anticipo.",
  },
  {
    domanda: "E se poi non funziona?",
    risposta:
      "Comincio dalla parte che potrebbe non funzionare proprio per scoprirlo presto. Se salta fuori che una cosa non si può fare, ve lo dico, vi consegno quello che ho capito fino a lì e ci fermiamo: pagate il lavoro fatto e non il risultato promesso. È successo, e sono stati soldi risparmiati.",
  },
];

// Le quattro righe di testi.md, sezione /servizi, sotto «Per chi non sono».
export const perChiNonSono: string[] = [
  "Se cerchi un sito vetrina o un e-commerce, ci sono agenzie che lo fanno meglio di me e costano meno.",
  "Se l'obiettivo è introdurre l'intelligenza artificiale senza avere in mente un problema preciso, conviene fermarsi prima e cercare il problema.",
  "Se serve qualcuno presente tutti i giorni, conviene assumere una persona invece di chiamare un consulente.",
  "Se i dati che servirebbero non esistono o nessuno li ha mai messi per iscritto, il primo lavoro è raccoglierli, e richiede tempo.",
];
