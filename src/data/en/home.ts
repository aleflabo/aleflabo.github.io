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
import { ingaggi } from "./servizi";

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

// --- FasciaNumeri ---
interface NumeroFasciaHome {
  numero: string;
  etichetta: string;
}

export const numeri: NumeroFasciaHome[] = [
  { numero: "10", etichetta: "published papers" },
  { numero: "533", etichetta: "citations" },
  { numero: "1", etichetta: "Best Paper Award" },
  { numero: "2", etichetta: "years as CTO" },
];

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

// --- ComeLavoro ---
// I quattro passi prendono i nomi degli `ingaggi` di ./servizi.ts (stessa
// decisione dell'italiano, task 10 home-visuale — vedi il commento sopra
// `comeLavoro` in src/pages/index.astro per il perché). `corpo` è caduto
// insieme al suo equivalente italiano: senza testo accanto «I listen» e «I
// stay» erano perfino peggio dei nomi italiani, e il tipo lo segna
// facoltativo per restare in sincrono con `ComeLavoro.astro`.
// `nomeIngaggio` cerca per `chiave`, non per indice: stesso principio del
// file italiano, per non ripetere l'errore già fatto una volta con l'arXiv
// del CV (dedurre dall'ordine invece di leggere il campo).
const nomeIngaggio = (chiave: string) => ingaggi.find((i) => i.chiave === chiave)!.nome;

interface ComeLavoroProps {
  occhiello: string;
  titolo: string;
  intro: string;
  passi: { numero: string; nome: string; corpo?: string; neEsce: string }[];
  etichettaNeEsce: string;
  continua: string;
  hrefContinua: string;
}

export const comeLavoro: ComeLavoroProps = {
  occhiello: "How I work",
  titolo: "How a job usually goes",
  intro: "Four steps. You can stop after any of them, and what has been done up to that point stays yours anyway.",
  passi: [
    {
      numero: "01",
      nome: nomeIngaggio("understand"),
      neEsce: "A list of the places where time is lost, ordered by what they cost.",
    },
    {
      numero: "02",
      nome: nomeIngaggio("decide"),
      neEsce: "A document that stays yours, and that you can show to whoever you like.",
    },
    {
      numero: "03",
      nome: nomeIngaggio("build"),
      neEsce: "Something your people open on Monday morning and actually use.",
    },
    {
      numero: "04",
      nome: nomeIngaggio("maintain"),
      neEsce: "A person who knows the system and who you can call when you need to.",
    },
  ],
  etichettaNeEsce: "What comes out of it",
  continua: "The four ways of working together, in full",
  hrefContinua: "/en/services/",
};

// --- LeProve ---
// `link`/`href` sono opzionali: «3D Parts Portal» non ha una pagina di
// destinazione (il case study è `soloItaliano`, task 9/sito-inglese — il
// suo `href` puntava a `/en/work/portale-ricambi`, una rotta che non
// esisterà mai), quindi la scheda resta senza collegamento invece di
// puntare a un 404 o saltare in italiano.
//
// Lo scambio (task 9, home-visuale): Spannum esce dalla home — resta
// raggiungibile su /en/work — ed entra l'Agentic Workflow Toolkit, con
// `miniatura` (le tre chiavi valgono identiche in italiano e in inglese:
// sono disegni, non testo) e il suo tag: `tagIt` diventa qui la traduzione
// approvata in testi-en.md (sezione «Agentic Workflow Toolkit», scheda
// `[TRADOTTO]`) — «Automated standup», «Regenerated documentation»,
// «Prompt review» — non una mia traduzione al volo. `eyebrow` è
// `agentic-toolkit.en.area` in projects.ts («Agentic tooling»), non la
// coppia con «· daily use» di testi-en.md: così l'ha voluto il committente
// per questa scheda (vedi task-9-brief.md).
//
// `3D Parts Portal` riprende `tagInEvidenza: "Under construction"` (task 10,
// home-visuale): questo commento diceva che l'equivalente inglese di «In
// costruzione» non esisteva, ma era un errore di ricerca, non un vuoto nei
// testi approvati — sta in testi-en.md:826, dentro un blocco marcato
// `[TRADOTTO]` (reso dall'italiano approvato, non tradotto qui al volo).
// Il toolkit inglese resta invece senza `tagInEvidenza`, e qui il vuoto è
// reale: la dichiarazione italiana «Strumenti miei, per il mio team» non ha
// una traduzione approvata in testi-en.md né altrove, e inventarla è vietato
// quanto lo sarebbe stato tradurre «In costruzione» da soli.
interface Prova {
  eyebrow: string;
  nome: string;
  corpo: string;
  tag: string[];
  tagInEvidenza?: string;
  miniatura?: "ricambi" | "procedo" | "toolkit";
  link?: string;
  href?: string;
  esterno?: boolean;
}
interface LeProveProps {
  occhiello: string;
  titolo: string;
  prove: Prova[];
  continua: string;
  hrefContinua: string;
}

export const leProve: LeProveProps = {
  occhiello: "The evidence",
  titolo: "Some of the things I've built",
  prove: [
    {
      eyebrow: "Mechanical engineering · real client project",
      nome: "3D Parts Portal",
      corpo: "The customer opens the 3D model of the machine they bought, clicks the part they need, and the request reaches the company already matched to that component's internal code.",
      tag: ["CAD pipeline, 80 tests", "Intellectual property protected"],
      tagInEvidenza: "Under construction",
      miniatura: "ricambi",
    },
    {
      eyebrow: "Industry · in production",
      nome: "Procedo",
      corpo: "Video shot on the shop floor becomes step-by-step procedures, and the people doing the work can ask questions of their own company's documentation. I was co-founder and CTO for two years; today I follow it as an advisor.",
      tag: ["Industrial customers", "B4i Bocconi", "Angel round"],
      miniatura: "procedo",
      link: "How it works",
      href: "/en/work/procedo/",
    },
    {
      eyebrow: "Agentic tooling",
      nome: "Agentic Workflow Toolkit",
      corpo: "A suite of AI-agent skills that automate my team's ops and engineering workflows, from daily standups to LLM-prompt review.",
      tag: ["Automated standup", "Regenerated documentation", "Prompt review"],
      miniatura: "toolkit",
      link: "How it works",
      href: "/en/work/agentic-toolkit/",
    },
  ],
  continua: "All the work, research included",
  hrefContinua: "/en/work/",
};

// --- BloccoFormazione ---
// `formati[].corpo` e `chiusura` sono caduti (task 11, home-visuale): la
// striscia (task 7) non li ha mai resi — sono facoltativi in
// BloccoFormazione.astro — e nessun altro componente della home li legge,
// a differenza dei testi estesi di /en/training, che vivono in un file
// dati proprio. `en/index.astro` passa `introduzioni[1]` — non `[0]` —
// alla striscia: è la seconda voce di quest'array, quella sull'AI Act, non
// la prima.
interface BloccoFormazioneProps {
  occhiello: string;
  titolo: string;
  introduzioni: string[];
  formati: { ore: string; nome: string }[];
  linkChiusura: string;
  hrefChiusura: string;
}

export const bloccoFormazione: BloccoFormazioneProps = {
  occhiello: "Training",
  titolo: "It starts with people",
  introduzioni: [
    "Four hours, at your company or in a classroom, to show people what these tools can do and where their limits are. We work on concrete cases.",
    "Since February 2025 the AI Act requires companies that use artificial intelligence tools to ensure a minimum level of training for their staff, and to be able to document it. You'll do that course anyway: it may as well be good for something.",
  ],
  formati: [
    { ore: "4 hours", nome: "Introductory course" },
    { ore: "8-12 hours", nome: "Workshop by function" },
    { ore: "Length agreed", nome: "Funded programme" },
  ],
  linkChiusura: "How a course gets organised",
  hrefChiusura: "/en/training/",
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
    { valore: "2021-2024", etichetta: "PhD in computer vision, Sapienza - PINlab" },
    { valore: "CVPR · ICCV · IROS", etichetta: "The main conferences in the field" },
    { valore: "2024-2026", etichetta: "Co-founder and CTO of Procedo, an industrial startup" },
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
