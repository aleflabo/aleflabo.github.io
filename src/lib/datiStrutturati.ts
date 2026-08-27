/**
 * I dati strutturati del sito (schema.org, JSON-LD).
 *
 * Fino ad agosto 2026 ce n'era uno solo — `Person` — e solo sulle due home:
 * trentasei pagine su trentotto non ne avevano nessuno, mentre la FAQ vera di
 * /servizi e le dieci pubblicazioni di /ricerca erano già scritte nel formato
 * che i motori estraggono. Qui dentro non c'è nessun accesso a rete o a file:
 * sono funzioni pure che ricevono il dominio e restituiscono oggetti, così
 * `datiStrutturati.test.ts` può verificarle senza costruire il sito.
 *
 * Ogni entità ha un `@id` stabile costruito sul dominio: è l'ancora a cui i
 * motori agganciano quello che il sito afferma, ed è ciò che permette a
 * `ProfessionalService` di dichiarare `Person` come fornitore invece di
 * ripeterne i campi.
 */
import { luogo } from "../data/territorio";
import type { Locale } from "../i18n/ui";

/** Gli `@id` delle entità che ricorrono su più pagine. */
export const idPersona = (site: string) => `${site}/#persona`;
export const idSito = (site: string) => `${site}/#sito`;
export const idAttivita = (site: string) => `${site}/#attivita`;

const SAME_AS = [
  "https://www.linkedin.com/in/alessandro-flaborea",
  "https://github.com/aleflabo",
  "https://scholar.google.com/citations?user=HHDHIVoAAAAJ",
];

const DESCRIZIONE: Record<Locale, string> = {
  it: "Consulenza e formazione sull'intelligenza artificiale per le aziende. Dottorato in computer vision alla Sapienza, poi due anni da CTO di una startup industriale.",
  en: "AI consulting and training for companies. PhD in computer vision at Sapienza, then two years as CTO of an industrial startup.",
};

export interface OpzioniPersona {
  site: string;
  lang: Locale;
  /** URL assoluto del ritratto, già costruito. */
  immagine?: string;
  email?: string;
}

/**
 * `Person`. Prima dichiarava sei campi e nessun `@id`: l'entità non aveva
 * un'ancora, e senza `image` non aveva una faccia da associare al nome.
 */
export function persona({ site, lang, immagine, email }: OpzioniPersona) {
  const citta = lang === "it" ? luogo.citta : luogo.cittaEn;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": idPersona(site),
    name: "Alessandro Flaborea",
    url: `${site}/`,
    jobTitle: lang === "it" ? "Consulente e formatore in intelligenza artificiale" : "AI consultant and trainer",
    description: DESCRIZIONE[lang],
    ...(immagine ? { image: immagine } : {}),
    ...(email ? { email: `mailto:${email}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: citta,
      addressRegion: luogo.regione,
      addressCountry: luogo.paese,
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Sapienza University of Rome" },
    knowsLanguage: ["it", "en"],
    knowsAbout: [
      "Computer Vision",
      "Large Language Models",
      "Agentic AI",
      "Retrieval-Augmented Generation",
      "Machine Learning",
      "Data Engineering",
    ],
    sameAs: SAME_AS,
  };
}

/** `WebSite`, con le due lingue dichiarate. */
export function sitoWeb({ site, lang }: { site: string; lang: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": idSito(site),
    url: `${site}/`,
    name: "Alessandro Flaborea",
    inLanguage: lang,
    publisher: { "@id": idPersona(site) },
  };
}

export interface OpzioniAttivita {
  site: string;
  lang: Locale;
  /** I quattro modi di lavorare insieme, dai dati di /servizi. */
  servizi: { nome: string; descrizione: string }[];
}

/**
 * `ProfessionalService`: è qui che vive il territorio. `areaServed` elenca le
 * due regioni raggiunte di persona e l'Italia, che è il raggio da remoto —
 * gli stessi luoghi che la sezione della home dice a parole, letti dallo
 * stesso file, così non possono divergere.
 */
export function attivita({ site, lang, servizi }: OpzioniAttivita) {
  const aree = lang === "it" ? luogo.areaServita : luogo.areaServitaEn;
  const citta = lang === "it" ? luogo.citta : luogo.cittaEn;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": idAttivita(site),
    name: "Alessandro Flaborea",
    url: `${site}/`,
    description: DESCRIZIONE[lang],
    provider: { "@id": idPersona(site) },
    areaServed: aree.map((nome) => ({ "@type": "AdministrativeArea", name: nome })),
    address: {
      "@type": "PostalAddress",
      addressLocality: citta,
      addressRegion: luogo.regione,
      addressCountry: luogo.paese,
    },
    availableLanguage: ["it", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "it" ? "Modi di lavorare insieme" : "Ways of working together",
      itemListElement: servizi.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nome, description: s.descrizione },
      })),
    },
  };
}

/**
 * `FAQPage` dalle cinque domande già in pagina. Le risposte arrivano come
 * testo semplice: chi chiama toglie i tag, così la risposta dichiarata e
 * quella letta restano la stessa cosa.
 */
export function faq(domande: { domanda: string; risposta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: domande.map((d) => ({
      "@type": "Question",
      name: d.domanda,
      acceptedAnswer: { "@type": "Answer", text: d.risposta },
    })),
  };
}

export interface PubblicazioneLd {
  titolo: string;
  anno: string;
  sede: string;
  url?: string;
}

/**
 * Le pubblicazioni come `ScholarlyArticle`. `sameAs` porta all'arXiv quando
 * c'è: è un identificatore che i motori generativi già conoscono, ed è il
 * modo più diretto per agganciare questa persona a un corpus che esiste
 * altrove. Le voci senza URL restano dichiarate lo stesso, senza `sameAs`.
 */
export function pubblicazioniLd(site: string, elenco: PubblicazioneLd[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: elenco.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ScholarlyArticle",
        headline: p.titolo,
        name: p.titolo,
        datePublished: p.anno,
        isPartOf: { "@type": "Periodical", name: p.sede },
        author: { "@id": idPersona(site) },
        ...(p.url ? { url: p.url, sameAs: p.url } : {}),
      },
    })),
  };
}

/**
 * `BreadcrumbList`. Le voci arrivano già localizzate e con il percorso
 * finale (barra compresa): questa funzione le rende assolute e basta.
 */
export function briciole(site: string, voci: { nome: string; percorso: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: voci.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.nome,
      item: `${site}${v.percorso}`,
    })),
  };
}

/** Una scheda di lavoro come `CreativeWork`. */
export function lavoro(site: string, { nome, descrizione, percorso }: { nome: string; descrizione: string; percorso: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: nome,
    description: descrizione,
    url: `${site}${percorso}`,
    creator: { "@id": idPersona(site) },
  };
}

/** Un formato di corso come `Course`. */
export function corso(site: string, { nome, descrizione }: { nome: string; descrizione: string }) {
  return {
    "@type": "Course",
    name: nome,
    description: descrizione,
    provider: { "@id": idPersona(site) },
  };
}
