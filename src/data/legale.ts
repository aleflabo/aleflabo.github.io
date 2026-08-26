/**
 * L'indirizzo a cui si esercitano i diritti sui dati. Vive qui, in un punto
 * solo, perché compare nelle due informative in entrambe le lingue: quando
 * arriva quello vero si cambia questa riga e cambiano tutte e quattro le
 * pagine.
 *
 * Finché vale `[EMAIL]` la pagina è **incompleta**: un'informativa che non
 * dice a chi scrivere non permette di esercitare i diritti che elenca.
 * `verifica-rotte.mjs` esce con 1 se questo segnaposto finisce nel costruito.
 */
export const emailContatto = '[EMAIL]';

export interface SezioneLegale {
  titolo: string;
  paragrafi: string[];
  elenco?: string[];
}

export interface PaginaLegale {
  occhiello: string;
  titolo: string;
  introduzione: string;
  aggiornamento: string;
  sezioni: SezioneLegale[];
}

// Informativa privacy e pagina cookie, italiano.
//
// Il contenuto descrive quello che il sito fa davvero, verificato sul
// costruito: nessuno strumento di statistica, nessun cookie, nessuna risorsa
// caricata da terzi (i caratteri sono ospitati qui), e `localStorage` usato
// solo per ricordare la lingua scelta. Se un domani si aggiunge un contatore
// di visite o si collega il modulo, queste due pagine vanno riscritte prima,
// non dopo.
//
// L'indirizzo di posta è `[EMAIL]` finché il committente non ne indica uno
// pubblicabile: un'informativa senza un recapito per esercitare i propri
// diritti non è completa, e inventarne uno sarebbe peggio che lasciarlo vuoto.
export const privacy: PaginaLegale = {
  occhiello: 'Privacy',
  titolo: 'Che cosa succede ai vostri dati su questo sito',
  introduzione:
    'In breve: questo sito non vi osserva. Non ci sono strumenti di statistica, non ci sono cookie, e nessuna risorsa viene caricata da server di terzi. Sotto c\'è la versione lunga, con i nomi delle cose.',
  aggiornamento: 'Ultimo aggiornamento: 26 agosto 2026.',
  sezioni: [
    {
      titolo: 'Chi tratta i dati',
      paragrafi: [
        `Il titolare del trattamento è Alessandro Flaborea. Per qualsiasi domanda su questa pagina, o per esercitare i diritti elencati più sotto, si scrive a ${emailContatto}.`,
      ],
    },
    {
      titolo: 'Che cosa raccoglie il sito quando lo visitate',
      paragrafi: [
        'Niente che finisca a me. Le pagine sono file statici: non c\'è un programma che gira sul server, non c\'è un archivio dove annotare le visite, e non uso Google Analytics né altri strumenti di misurazione.',
        'Il sito è pubblicato su GitHub Pages. Come qualunque servizio che consegna pagine web, GitHub registra i dati tecnici della connessione — indirizzo IP, tipo di browser, pagina richiesta — per far funzionare il servizio e difenderlo dagli abusi. Quei registri restano a GitHub e io non ci accedo. Il trattamento è descritto nella loro informativa privacy.',
      ],
    },
    {
      titolo: 'Che cosa il vostro browser tiene da parte',
      paragrafi: [
        'Una cosa sola: se scegliete la lingua con l\'interruttore in alto, il sito se lo ricorda in una voce di `localStorage` chiamata `lang-chosen`. Serve a non rimandarvi ogni volta alla lingua del vostro browser dopo che avete scelto l\'altra.',
        'Resta nel vostro browser, non viene mandata da nessuna parte e non identifica nessuno. Si cancella svuotando i dati del sito dalle impostazioni del browser.',
      ],
    },
    {
      titolo: 'Se mi scrivete',
      paragrafi: [
        'Il modulo di contatto non è ancora collegato a nessun servizio: al momento non parte nulla e non arriva nulla. Quando lo collegherò, questa pagina lo dirà prima che il modulo funzioni, non dopo.',
        'Se mi scrivete su WhatsApp usando il pulsante che trovate nel sito, la conversazione avviene dentro WhatsApp e vale l\'informativa di WhatsApp Ireland Limited. Io conservo quei messaggi il tempo necessario a rispondervi e a portare avanti un eventuale lavoro insieme.',
      ],
    },
    {
      titolo: 'Le note',
      paragrafi: [
        'I testi delle note sono scritti su Sanity e vengono prelevati mentre il sito viene generato, non mentre voi leggete: il vostro browser non parla con Sanity. Le eventuali immagini dentro una nota, invece, sono servite dalla loro rete di distribuzione, quindi il vostro browser richiede quel file al loro server e in quel momento il loro server vede l\'indirizzo IP della richiesta.',
      ],
    },
    {
      titolo: 'Per quanto tempo',
      paragrafi: [
        'Non conservo dati raccolti dal sito, perché il sito non ne raccoglie. Quello che mi mandate direttamente — un messaggio, un allegato — lo tengo finché serve a rispondervi o a lavorare insieme, e poi lo elimino.',
      ],
    },
    {
      titolo: 'I vostri diritti',
      paragrafi: [
        `Il Regolamento europeo 2016/679 vi dà il diritto di chiedere quali vostri dati ho, di correggerli, di farli cancellare, di limitarne l'uso, di opporvi al trattamento e di riceverli in un formato leggibile da una macchina. Si chiede scrivendo a ${emailContatto}, e vi rispondo entro un mese.`,
        'Se pensate che stia trattando i vostri dati in modo scorretto potete rivolgervi al Garante per la protezione dei dati personali (garanteprivacy.it).',
      ],
    },
  ],
};

export const cookie: PaginaLegale = {
  occhiello: 'Cookie',
  titolo: 'Questo sito non usa cookie',
  introduzione:
    'Non è una formula di cortesia: è una cosa verificabile. Aprite gli strumenti per sviluppatori del vostro browser, guardate la scheda dei cookie, e la troverete vuota.',
  aggiornamento: 'Ultimo aggiornamento: 26 agosto 2026.',
  sezioni: [
    {
      titolo: 'Perché non c\'è il banner',
      paragrafi: [
        'Il banner serve a chiedere il consenso per i cookie che profilano o misurano. Qui non ce ne sono di nessun tipo — né miei né di terzi — quindi non c\'è niente da consentire, e un banner che chiede il permesso per niente è solo un ostacolo in più fra voi e la pagina.',
      ],
    },
    {
      titolo: 'L\'unica cosa che resta nel browser',
      paragrafi: [
        'Se scegliete la lingua con l\'interruttore in alto, il sito se lo ricorda in `localStorage` sotto la voce `lang-chosen`. Non è un cookie: non viaggia con le richieste al server e non arriva a nessuno. È una preferenza vostra, custodita dal vostro browser, e serve solo a non rimandarvi alla lingua di sistema dopo che avete scelto l\'altra.',
        'Per le regole europee ricade fra gli strumenti tecnici necessari a fornire un servizio che avete chiesto, e non richiede consenso. Si cancella svuotando i dati del sito dalle impostazioni del browser.',
      ],
    },
    {
      titolo: 'Nessuna risorsa da fuori',
      paragrafi: [
        'I caratteri tipografici sono ospitati insieme al sito, non presi da Google Fonts. Non ci sono video incorporati, mappe, pulsanti social o pixel di tracciamento. Le uniche richieste che il vostro browser fa quando legge questa pagina vanno al dominio di questo sito.',
        'Fa eccezione un caso solo: le immagini dentro una nota, che arrivano dalla rete di distribuzione di Sanity. Se ne trovate una in una nota, quella richiesta esce.',
      ],
    },
    {
      titolo: 'Se un giorno cambia',
      paragrafi: [
        'Se aggiungerò un contatore di visite o un servizio che usa cookie, questa pagina lo dirà prima che succeda, e comparirà la richiesta di consenso dove serve.',
      ],
    },
  ],
};
