// Dati della home inglese (`/en/`). Fonte: testi-en.md, sezione «1. /en/ —
// home». Le firme sono quelle degli otto componenti parametrizzati in
// src/components/sezioni/ (task-2-report.md, «Le firme degli otto
// componenti»): ogni oggetto qui sotto è pensato per essere passato con lo
// spread (`<Componente {...oggetto} />`), come già fa `src/pages/index.astro`
// per l'italiano. Gli href sono valori già risolti verso le rotte inglesi
// (`/en/services`, `/en/training`, `/en/work`, `/en/research`, `/en/about`),
// non calcolati da `localizedPath`: nessuna pagina consuma ancora questo
// file.
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
  hrefPrimaria: "/en#parliamone",
  ctaSecondaria: "See what I've built",
  credibilita: "PhD in computer vision at Sapienza · Published at CVPR, ICCV, IROS · Co-founder and CTO of Procedo from 2024 to 2026",
  hrefProcedo: "/en/work",
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
  riquadri: { citazione: string; corpo: string }[];
}

export const ilProblema: IlProblemaProps = {
  occhiello: "The problem",
  titolo: "The three things I get told most often",
  riquadri: [
    {
      citazione: '"I need this part."',
      corpo: "An email arrives with a crooked photo. Before anyone can quote a price, someone has to work out which component it is, and it can take two people a couple of days.",
    },
    {
      citazione: '"Only Bruno knows how to do it."',
      corpo: "Forty years of the trade sitting in one person's head. Nobody has ever had the time to write it down, and in two years Bruno retires.",
    },
    {
      citazione: '"We tried ChatGPT."',
      corpo: "Someone in the office started using it on their own. It isn't clear with which documents, or whether the company agrees, and so far nobody has had the chance to talk about it.",
    },
  ],
};

// --- ComeLavoro ---
interface ComeLavoroProps {
  occhiello: string;
  titolo: string;
  intro: string;
  passi: { numero: string; nome: string; corpo: string; neEsce: string }[];
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
      nome: "I listen",
      corpo: "I spend half a day at your company, together with the people who do the work every day. It's how I understand how you work, and how you get an idea of the way I think.",
      neEsce: "A list of the places where time is lost, ordered by what they cost.",
    },
    {
      numero: "02",
      nome: "Diagnosis",
      corpo: "Two or three weeks to look at the data you actually have, the systems already in use and who takes care of what. At the end I write what would be worth doing, in what order, and which roads I'd leave alone.",
      neEsce: "A document that stays yours, and that you can show to whoever you like.",
    },
    {
      numero: "03",
      nome: "I build",
      corpo: "I always start with the part that might not work, so that if something turns out to be impossible we find out early, while changing course still costs little.",
      neEsce: "Something your people open on Monday morning and actually use.",
    },
    {
      numero: "04",
      nome: "I stay",
      corpo: "Software nobody looks after stops being useful within a few months. If it's needed we stay in touch: maintenance, servers and the changes that come up along the way.",
      neEsce: "A person who knows the system and who you can call when you need to.",
    },
  ],
  etichettaNeEsce: "What comes out of it",
  continua: "The four ways of working together, in full",
  hrefContinua: "/en/services",
};

// --- LeProve ---
// `link`/`href` sono opzionali: «3D Parts Portal» non ha una pagina di
// destinazione (il case study è `soloItaliano`, task 9/sito-inglese — il
// suo `href` puntava a `/en/work/portale-ricambi`, una rotta che non
// esisterà mai), quindi la scheda resta senza collegamento invece di
// puntare a un 404 o saltare in italiano.
interface Prova {
  eyebrow: string;
  nome: string;
  corpo: string;
  tag: string[];
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
    },
    {
      eyebrow: "Industry · in production",
      nome: "Procedo",
      corpo: "Video shot on the shop floor becomes step-by-step procedures, and the people doing the work can ask questions of their own company's documentation. I was co-founder and CTO for two years; today I follow it as an advisor.",
      tag: ["Industrial customers", "B4i Bocconi", "Angel round"],
      link: "How it works",
      href: "/en/work/procedo",
    },
    {
      eyebrow: "Live product · open to everyone",
      nome: "Spannum",
      corpo: "A working-memory test built to the protocol published in the literature, with the sources cited and the limits stated. It's online and you can try it.",
      tag: ["Online", "Age norms"],
      link: "Open it",
      href: "https://spannum.com",
      esterno: true,
    },
  ],
  continua: "All the work, research included",
  hrefContinua: "/en/work",
};

// --- BloccoFormazione ---
interface BloccoFormazioneProps {
  occhiello: string;
  titolo: string;
  introduzioni: string[];
  formati: { ore: string; nome: string; corpo: string }[];
  chiusura: string;
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
    {
      ore: "4 hours",
      nome: "Introductory course",
      corpo: "For the whole company, from the owner to the shop floor. What has changed in the last few years, what has stayed the same, and the concrete risks to your data.",
    },
    {
      ore: "8–12 hours",
      nome: "Workshop by function",
      corpo: "Engineering office, purchasing, administration, sales. Each group works on its own documents, so what they learn can be used the next day.",
    },
    {
      ore: "Length agreed",
      nome: "Funded programme",
      corpo: "Through accredited training bodies and interprofessional funds, when the company wants a long programme without committing its own cash.",
    },
  ],
  chiusura: "I taught for four years at Sapienza as a teaching assistant, and I was an invited speaker at Ferrari S.p.A.'s Data Science Hub. Courses are organised directly, or through accredited training bodies and interprofessional funds.",
  linkChiusura: "How a course gets organised",
  hrefChiusura: "/en/training",
};

// --- DaDoveViene ---
interface DaDoveVieneProps {
  occhiello: string;
  titolo: string;
  intro: string;
  corpo: string;
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
  corpo: "Every paper I published came out together with the code. It's the habit I still work with: technical decisions stay written down, and the software I hand over opens and reads.",
  tappe: [
    { valore: "2021–2024", etichetta: "PhD in computer vision, Sapienza — PINlab" },
    { valore: "CVPR · ICCV · IROS", etichetta: "The main conferences in the field" },
    { valore: "2024–2026", etichetta: "Co-founder and CTO of Procedo, an industrial startup" },
  ],
  linkRicerca: "The research, in full",
  hrefRicerca: "/en/research",
  linkChiSono: "About me",
  hrefChiSono: "/en/about",
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
