/**
 * Una delle quattro competenze di /servizi (o /en/services). Testi alla
 * lettera da testi.md, sezione «/servizi», riscritta il 2026-11-22: le
 * competenze hanno preso il posto dei quattro ingaggi in sequenza.
 *
 * `etichetta` è la parola in mono dell'indice e del riquadro di rilevamento
 * (direzione · costruzione · sicurezza · ricerca). `voci`, `dopo` e `caso`
 * sono facoltativi: ognuna delle quattro schede ne usa al più uno.
 */
export interface Competenza {
  chiave: string;
  etichetta: string;
  nome: string;
  sottotitolo?: string;
  corpo: string[];
  /** Elenco puntato: il termine va in grassetto, il testo lo segue. */
  voci?: { termine: string; testo: string }[];
  /** Paragrafi dopo l'elenco. */
  dopo?: string[];
  caso?: { titolo: string; testo: string };
  tag: string[];
  perChi: string;
  durata: string;
  cosaResta: string;
  prove?: string;
}

export const competenze: Competenza[] = [
  {
    chiave: "direzione",
    etichetta: "direzione",
    nome: "Fractional CTO",
    sottotitolo: "la direzione tecnica, quando un CTO a tempo pieno è troppo",
    corpo: [
      "Avete un software in produzione, una demo che piace, o solo un'idea, e nessuno in casa che sappia dire dove deve andare tecnicamente. Entro come direttore tecnico per qualche giorno al mese: guardo cosa c'è, scrivo dove può crescere e in che ordine, decido con voi cosa costruire e cosa no, e seguo chi lo costruisce. Compresa la domanda che oggi arriva sempre: dove ha senso mettere un modello linguistico o un agente AI nel prodotto, e dove è solo una moda.",
      "Il primo lavoro è sempre una mappa: com'è fatto il sistema, dove è fragile, cosa costerebbe cambiarlo. Resta vostra, e chiunque arrivi dopo riparte da lì.",
    ],
    tag: ["fractional CTO", "roadmap tecnica", "architettura", "due diligence tecnica", "gestione fornitori"],
    perChi: "Startup senza CTO, aziende con un software fatto da fornitori che nessuno governa, chi ha una demo e deve capire se diventa prodotto",
    durata: "A mesi, con un monte ore scritto nel contratto e uscita su preavviso",
    cosaResta: "Una roadmap tecnica, le decisioni messe per iscritto, un fornitore che sa cosa deve consegnare",
    prove: "Due anni da CTO di Procedo; oggi la direzione tecnica di una piattaforma gestionale multi-salone",
  },
  {
    chiave: "costruzione",
    etichetta: "costruzione",
    nome: "Sviluppo a progetto",
    sottotitolo: "con l'intelligenza artificiale, o senza, se non serve",
    corpo: [
      "Una funzione nuova in un software che esiste già, un'automazione che toglie di mezzo un passaggio fatto a mano, un sistema intero. Quando serve l'intelligenza artificiale, so quale:",
    ],
    voci: [
      { termine: "computer vision", testo: "per riconoscere un pezzo da una foto o controllare un passaggio in reparto;" },
      { termine: "RAG", testo: "(un assistente che risponde citando i vostri documenti) per far parlare quarant'anni di manuali e procedure;" },
      { termine: "agenti AI", testo: "che fanno da soli un lavoro in più passaggi: leggono la mail, cercano nel gestionale, preparano la bozza;" },
      { termine: "estrazione dati", testo: "da PDF, preventivi e moduli che oggi qualcuno ricopia a mano." },
    ],
    dopo: [
      "Quando basta una regola scritta bene, scrivo la regola. Comincio dalla parte che potrebbe non funzionare, a scaglioni che approvate uno alla volta. Il codice è vostro.",
    ],
    tag: ["computer vision", "LLM", "RAG", "agenti AI", "MCP", "automazione processi", "estrazione documenti", "Python", "Laravel", "Vue/Nuxt"],
    perChi: "Hai un processo preciso da togliere di mezzo, o una funzione che il tuo software non ha",
    durata: "Da qualche settimana, a scaglioni",
    cosaResta: "Qualcosa che le persone usano, il codice sorgente, la documentazione",
  },
  {
    chiave: "sicurezza",
    etichetta: "sicurezza",
    nome: "Sicurezza e stato di salute del codice",
    corpo: [
      "Quando esce una vulnerabilità grave, alla domanda «dobbiamo aggiornare?» ne seguono subito altre due: «se aggiorniamo, si rompe qualcosa?» e «cos'altro c'è che non sappiamo?». Provo l'aggiornamento su una copia, guardo il codice e la configurazione del server, e scrivo cosa è urgente, cosa può aspettare e cosa costa.",
    ],
    caso: {
      titolo: "Un caso, ottobre 2026",
      testo: "PHP corregge due vulnerabilità gravi di esecuzione remota di codice, e l'unica soluzione è aggiornare. Su un gestionale in produzione ho verificato che l'aggiornamento non rompesse niente, e intanto ho aggiornato le dipendenze. Guardando il resto del sistema sono emersi altri punti deboli che nessuno aveva segnalato: corretti nello stesso intervento.",
    },
    tag: ["vulnerability assessment", "CVE", "aggiornamento PHP", "dipendenze", "code review", "hardening server"],
    perChi: "Hai un software in produzione che nessuno guarda da tempo, o un fornitore che ti chiede di fidarti",
    durata: "Da qualche giorno a due settimane",
    cosaResta: "Un documento con le priorità, leggibile anche da chi non è tecnico, e le correzioni se le volete",
  },
  {
    chiave: "ricerca",
    etichetta: "ricerca",
    nome: "Ricerca applicata",
    corpo: [
      "Certi problemi non hanno una soluzione da catalogo: riconoscere le azioni di un operatore guardandolo (action recognition), stimarne la posa (pose estimation), accorgersi di un errore prima che diventi uno scarto (anomaly detection). Sono i problemi su cui ho fatto il dottorato. Leggo lo stato dell'arte, vi dico se il problema oggi è risolvibile e a che costo, e lo provo sui vostri dati prima che ci investiate.",
    ],
    tag: ["computer vision", "action recognition", "anomaly detection", "pose estimation", "deep learning", "stato dell'arte", "prototipi"],
    perChi: "Reparti R&D, startup deep-tech, progetti finanziati che hanno bisogno di un partner di ricerca",
    durata: "Uno studio di fattibilità in qualche settimana",
    cosaResta: "Una risposta argomentata «si può / non ancora / non così», un prototipo misurato sui vostri dati",
    prove: "10 articoli (CVPR, ICCV, IROS), 609 citazioni, h-index 9",
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
      "Dipende da tre cose: quanto è complicata la parte più difficile, quanti sistemi che avete già deve toccare, e se serve che qualcuno lo tenga in vita dopo. Non pubblico un listino perché un prezzo scritto senza conoscere il vostro caso sarebbe un numero inventato. Dopo la prima mezz'ora, o dopo una mattina in azienda quando serve guardare da vicino, avete un preventivo scritto con le voci separate, e nessun obbligo di proseguire.",
  },
  {
    domanda: "Quanto ci vuole?",
    risposta:
      "Dipende dal lavoro. Una verifica di sicurezza va da qualche giorno a due settimane, uno studio di fattibilità richiede qualche settimana, la direzione tecnica si conta a mesi. Un progetto procede a scaglioni che approvate uno alla volta, così potete fermarvi a un punto qualsiasi senza perdere quello che è stato fatto.",
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

export interface Policy {
  titolo: string;
  corpo: string[];
  consegna: string[];
  durata: string;
  avvertenza: string;
}

/**
 * La policy interna sull'uso dell'AI: servizio a parte, non incluso nei corsi.
 * Compare su /servizi (dopo le quattro competenze) e su /formazione. Testi
 * approvati l'8 novembre 2026 (testi.md, sezione formazione — Laboratorio).
 */
export const policy: Policy = {
  titolo: "La policy interna sull'uso dell'AI",
  corpo: ["Un documento che dice a tutti in azienda quali strumenti si usano, con quali dati e chi decide. Risponde alla domanda che arriva sempre dopo il corso: cosa posso incollare in ChatGPT?"],
  consegna: ["Un documento di 3-5 pagine.", "Una pagina riassuntiva da far girare in azienda.", "L'elenco degli strumenti ammessi, con le impostazioni da usare."],
  durata: "Circa una settimana: un'ora di intervista con il titolare, una bozza, una revisione insieme.",
  avvertenza: "Non sostituisce il parere di un legale.",
};
