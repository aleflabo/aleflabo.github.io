// Dati della home inglese (`/en/`). Fonte: testi-en.md, sezione «1. /en/ —
// home». Le firme sono quelle degli otto componenti parametrizzati in
// src/components/sezioni/ (task-2-report.md, «Le firme degli otto
// componenti»): ogni oggetto qui sotto è pensato per essere passato con lo
// spread (`<Componente {...oggetto} />`), come già fa `src/pages/index.astro`
// per l'italiano. Gli href sono valori già risolti verso le rotte inglesi
// (`/en/services/`, `/en/training/`, `/en/work/`, `/en/research/`,
// `/en/about/`), non calcolati da `localizedPath`. Da agosto 2026 li consuma
// `src/pages/en/index.astro`: la barra finale è quindi obbligatoria, perché
// GitHub Pages risponde 301 a un percorso che ne è privo. Ci pensa
// `verifica-rotte.mjs`, che boccia un href interno senza barra.
import { site } from "../site";
import { emailContatto } from "../legale";

const prenotaMezzoraEn = site.en.prenotaMezzora ?? "";

// --- Occhiello ---
interface OcchielloProps {
  eyebrow: string;
  titolo: string;
  intro: string;
  ctaPrimaria: string;
  hrefPrimaria: string;
  ctaSecondaria: string;
  credibilita: string;
  hrefProcedo: string;
}

export const occhiello: OcchielloProps = {
  eyebrow: "AI consulting and training",
  titolo: "I help companies work out|where AI is needed|, and then I build it.",
  intro: "Three years of a PhD in computer vision, then two as CTO of a startup that took that research inside companies that manufacture things. Now I work on my own.",
  ctaPrimaria: prenotaMezzoraEn,
  hrefPrimaria: "/en/#parliamone",
  ctaSecondaria: "See what I've built",
  credibilita: "PhD in computer vision at Sapienza · Published at CVPR, ICCV, IROS · Co-founder and CTO of Procedo from 2024 to 2026",
  hrefProcedo: "/en/work/",
};

// --- IlProblema ---
interface IlProblemaProps {
  occhiello: string;
  titolo: string;
  // Le tre chiavi scelgono una vignetta disegnata (task 8, home-visuale):
  // sono immagini, non testo, quindi valgono identiche per l'inglese e
  // per l'italiano — vedi src/components/sezioni/IlProblema.astro.
  riquadri: { citazione: string; corpo: string; vignetta?: "richiesta" | "unaTestaSola" | "fuoriDaCasa" }[];
}

export const ilProblema: IlProblemaProps = {
  occhiello: "The problem",
  titolo: "The three things I get told most often",
  riquadri: [
    {
      citazione: '"I need this part."',
      corpo: "An email arrives with a crooked photo. Before anyone can quote a price, someone has to work out which component it is, and it can take two people a couple of days.",
      vignetta: "richiesta",
    },
    {
      citazione: '"Only Bruno knows how to do it."',
      corpo: "Forty years of the trade sitting in one person's head. Nobody has ever had the time to write it down, and in two years Bruno retires.",
      vignetta: "unaTestaSola",
    },
    {
      citazione: '"We tried ChatGPT."',
      corpo: "Someone in the office started using it on their own. It isn't clear with which documents, or whether the company agrees, and so far nobody has had the chance to talk about it.",
      vignetta: "fuoriDaCasa",
    },
  ],
};

// --- DaDoveViene ---
// `corpo` è caduto (task 11, home-visuale): la fascia scura non lo rende
// più da quando FasciaNumeri.astro l'ha reso facoltativo e ha smesso di
// leggerlo (task 5).
interface DaDoveVieneProps {
  occhiello: string;
  titolo: string;
  intro: string;
  tappe: { valore: string; etichetta: string }[];
  linkRicerca: string;
  hrefRicerca: string;
  linkChiSono: string;
  hrefChiSono: string;
}

export const daDoveViene: DaDoveVieneProps = {
  occhiello: "Where what I know comes from",
  titolo: "From research to production",
  intro: "A master's in data science, then a PhD in computer vision at Sapienza, with the work published at conferences where it gets examined thoroughly before it comes out. I was then CTO of an industrial startup for two years, which is the job where you find out how much of that research survives contact with a real company.",
  tappe: [
    { valore: "2021–2024", etichetta: "PhD in computer vision, Sapienza – PINlab" },
    { valore: "CVPR · ICCV · IROS", etichetta: "The main conferences in the field" },
    { valore: "2024–2026", etichetta: "Co-founder and CTO of Procedo, an industrial startup" },
  ],
  linkRicerca: "The research, in full",
  hrefRicerca: "/en/research/",
  linkChiSono: "About me",
  hrefChiSono: "/en/about/",
};

// --- Contatto ---
// Il modulo resta inerte, come in italiano (task 8, sito-italiano). La nota
// «notaInerte» non compare in nessun blocco di testi-en.md (non è nemmeno fra
// i sette [DA SCRIVERE] elencati nel riepilogo): resta stringa vuota per non
// tradurla di mia iniziativa — vedi task-3-report.md.
interface CampoTesto {
  etichetta: string;
  placeholder: string;
}
interface OpzioneUrgenza {
  valore: string;
  etichetta: string;
  checked?: boolean;
}
interface ContattoProps {
  eyebrow: string;
  titolo: string;
  intro: string;
  campoAzienda: CampoTesto;
  campoContatto: CampoTesto;
  campoRichiesta: CampoTesto;
  legendaUrgenza: string;
  opzioniUrgenza: OpzioneUrgenza[];
  invia: string;
  notaInerte: string;
  introAlternativa: string;
  canali: { etichetta: string; href?: string }[];
}

export const contatto: ContattoProps = {
  eyebrow: "Let's talk",
  titolo: "Half an hour to see whether we can work together",
  intro: "If it isn't the right job for me I'll tell you straight away, and if I know someone better suited I'll put you in touch.",
  campoAzienda: { etichetta: "Company", placeholder: "Registered name" },
  campoContatto: { etichetta: "How I get back to you", placeholder: "Email or phone" },
  campoRichiesta: { etichetta: "What would you like to stop doing by hand", placeholder: "Two lines are enough, even rough" },
  legendaUrgenza: "How urgent is it",
  opzioniUrgenza: [
    { valore: "just-looking", etichetta: "Just looking" },
    { valore: "this-year", etichetta: "This year", checked: true },
    { valore: "problem-now", etichetta: "I have a problem right now" },
  ],
  invia: "Send",
  notaInerte: "",
  introAlternativa: "Or, if you'd rather skip the form:",
  canali: [
    { etichetta: "Pick half an hour in the calendar" },
    { etichetta: "WhatsApp", href: "https://wa.me/393467202432" },
    { etichetta: "Email", href: `mailto:${emailContatto}` },
  ],
};
