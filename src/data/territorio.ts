import type { Locale } from "../i18n/ui";

/**
 * Il territorio: dove si lavora di persona e dove si lavora a distanza.
 *
 * Fino ad agosto 2026 il sito non nominava un luogo. `.claude/rules/copy-e-tono.md`
 * lo vietava per scelta — «nessun riferimento geografico nel posizionamento» —
 * e la conseguenza era doppia: nessuna query locale, e un assistente
 * generativo che alla domanda «un consulente AI dalle mie parti» non aveva
 * niente da cui dedurre quali parti. Il committente ha cambiato idea il
 * 27 agosto 2026 e la regola è stata riscritta di conseguenza.
 *
 * I luoghi vengono da `~/cv/content/it.yaml` (`location: Venezia, Italia`),
 * che resta la fonte autorevole. Questo file è l'unico posto dove stanno:
 * lo leggono la sezione della home e i dati strutturati (`areaServed` di
 * ProfessionalService, `address` di Person), così non possono divergere.
 */
export interface Territorio {
  occhiello: string;
  titolo: string;
  intro: string;
  corpo: string;
  modi: { etichetta: string; dettaglio: string }[];
}

export const territorio: Record<Locale, Territorio> = {
  it: {
    occhiello: "Dove lavoro",
    titolo: "Venezia è la mia base",
    intro:
      "Vivo e lavoro a Venezia. Le aziende che seguo stanno per lo più fra Veneto e Friuli, abbastanza vicino perché il primo passo si possa fare di persona: mezza giornata in reparto, insieme a chi quel lavoro lo fa tutti i giorni.",
    corpo:
      "Da lì in avanti la distanza conta poco. Diagnosi, sviluppo e manutenzione vanno avanti bene anche da remoto, e i corsi si tengono in aula oppure online, come vi è più comodo. Se siete più lontani ci si vede la prima volta e poi si continua a distanza.",
    modi: [
      { etichetta: "In presenza", dettaglio: "Veneto e Friuli-Venezia Giulia" },
      { etichetta: "Da remoto", dettaglio: "Il resto d'Italia, e oltre" },
      { etichetta: "I corsi", dettaglio: "In aula oppure online" },
    ],
  },
  en: {
    occhiello: "Where I work",
    titolo: "Venice is my base",
    intro:
      "I live and work in Venice. Most of the companies I work with sit in the Veneto and Friuli regions, close enough that the first step can happen face to face: half a day on the shop floor, alongside the people who do that job every day.",
    corpo:
      "After that, distance matters little. Diagnosis, building and maintenance all carry on remotely, and courses run in a classroom or online, whichever suits you better. If you are further away, we meet once and then keep going at a distance.",
    modi: [
      { etichetta: "In person", dettaglio: "Veneto and Friuli-Venezia Giulia" },
      { etichetta: "Remotely", dettaglio: "The rest of Italy, and beyond" },
      { etichetta: "Courses", dettaglio: "In a classroom or online" },
    ],
  },
};

/**
 * Gli stessi luoghi in forma di dati strutturati. `areaServed` elenca le due
 * regioni raggiunte di persona più l'Italia, che è il raggio da remoto;
 * `address` dice la città, ed è quello che un motore usa per collocare la
 * persona su una mappa. Niente via e numero civico: non c'è una sede aperta
 * al pubblico, e dichiararne una sarebbe falso.
 */
export const luogo = {
  citta: "Venezia",
  cittaEn: "Venice",
  regione: "Veneto",
  paese: "IT",
  areaServita: ["Veneto", "Friuli-Venezia Giulia", "Italia"],
  areaServitaEn: ["Veneto", "Friuli-Venezia Giulia", "Italy"],
} as const;
