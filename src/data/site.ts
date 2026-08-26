import type { Locale } from "../i18n/ui";

export interface NavCopy {
  // Usato solo dal CTA della barra di navigazione inglese (Nav.astro,
  // ramo `en`): quello italiano legge il suo testo da `contact.title`
  // invece («Parliamone», task 9). `it.nav.cta` resta valorizzato per
  // rispettare il tipo, ma non è mai reso — vedi task-11-report.md.
  cta: string;
}

export interface HeroCopy {
  name: string;
}

export interface CaseStudyCopy {
  problem: string;
  approach: string;
  result: string;
}

export interface ContactCopy {
  title: string;
  email: string;
}

export interface ColonnaPiePagina {
  titolo: string;
  voci: string[];
}

interface SiteCopy {
  nav: NavCopy;
  hero: HeroCopy;
  workLiveLabel: string;
  workCodeLabel: string;
  caseStudy: CaseStudyCopy;
  contact: ContactCopy;
  // Voci di menu e piè di pagina delle pagine nuove (solo `it` per ora,
  // vedi task-6-brief.md). Opzionali: la sezione `en` non è ancora toccata.
  menu?: string[];
  piePagina?: ColonnaPiePagina[];
  // Il richiamo più ripetuto del sito italiano: scritto a mano in Occhiello,
  // Footer e formazione, ora letto da qui (task 9, revisione finale del
  // ramo sito-italiano). Solo `it`, come `menu` sopra.
  prenotaMezzora?: string;
}

export const site: Record<Locale, SiteCopy> = {
  en: {
    nav: {
      cta: "Contact me",
    },
    hero: {
      name: "Alessandro Flaborea",
    },
    workLiveLabel: "Live",
    workCodeLabel: "Code",
    caseStudy: {
      problem: "Problem",
      approach: "Approach",
      result: "Result",
    },
    contact: {
      title: "Let’s talk",
      email: "flaborea.alessandro@gmail.com",
    },
    // Voci di menu, piè di pagina e richiamo ripetuto per le pagine nuove,
    // resi dall'italiano approvato (task 3, sito-inglese). Fonte:
    // docs/superpowers/specs/2026-08-25-sito-italiano/testi-en.md, sezione
    // «1. /en/ — home» (barra di navigazione e piè di pagina).
    menu: ["Services", "Training", "Work", "Research", "About", "Notes"],
    prenotaMezzora: "Book half an hour",
    piePagina: [
      {
        titolo: "What I do",
        voci: ["Services", "Training", "Where your data ends up"],
      },
      {
        titolo: "The evidence",
        voci: ["Work", "Research", "About", "Notes"],
      },
      {
        titolo: "Elsewhere",
        voci: ["LinkedIn", "GitHub", "Google Scholar", "Italian site"],
      },
    ],
  },
  it: {
    nav: {
      cta: "Contattami",
    },
    hero: {
      name: "Alessandro Flaborea",
    },
    workLiveLabel: "Live",
    workCodeLabel: "Codice",
    caseStudy: {
      problem: "Problema",
      approach: "Approccio",
      result: "Risultato",
    },
    contact: {
      title: "Parliamone",
      email: "flaborea.alessandro@gmail.com",
    },
    menu: ["Servizi", "Formazione", "Lavori", "Ricerca", "Chi sono", "Note"],
    prenotaMezzora: "Prenota mezz'ora",
    piePagina: [
      {
        titolo: "Cosa faccio",
        voci: ["Servizi", "Formazione", "Che fine fanno i vostri dati"],
      },
      {
        titolo: "Le prove",
        voci: ["Lavori", "Ricerca", "Chi sono", "Note"],
      },
      {
        titolo: "Altrove",
        voci: ["LinkedIn", "GitHub", "Google Scholar", "English site"],
      },
    ],
  },
};
