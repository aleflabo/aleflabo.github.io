import type { Locale } from "../i18n/ui";

export interface NavCopy {
  work: string;
  research: string;
  about: string;
  contact: string;
  cta: string;
}

export interface HeroCopy {
  label: string;
  name: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  credibility: string;
}

export interface Service {
  title: string;
  body: string;
}

export interface ResearchCopy {
  title: string;
  intro: string;
  openSource: string;
  scholarLabel: string;
}

export interface AboutCopy {
  title: string;
  body: string[];
}

export interface ContactCopy {
  title: string;
  body: string;
  email: string;
}

export interface CaseStudyCopy {
  back: string;
  problem: string;
  approach: string;
  result: string;
}

interface SiteCopy {
  nav: NavCopy;
  hero: HeroCopy;
  servicesTitle: string;
  servicesLabel: string;
  services: Service[];
  workTitle: string;
  workLiveLabel: string;
  workCodeLabel: string;
  workSeeMore: string;
  caseStudy: CaseStudyCopy;
  research: ResearchCopy;
  about: AboutCopy;
  contact: ContactCopy;
}

export const site: Record<Locale, SiteCopy> = {
  en: {
    nav: {
      work: "Work",
      research: "Research",
      about: "About",
      contact: "Contact",
      cta: "Contact me",
    },
    hero: {
      label: "Computer Vision · LLM Systems",
      name: "Alessandro Flaborea",
      tagline:
        "I turn real-world problems into working AI and data systems, end to end.",
      ctaPrimary: "Contact me",
      ctaSecondary: "See selected work",
      credibility:
        "PhD in Computer Vision · CVPR/ICCV/IROS · Co-Founder of Procedo",
    },
    servicesTitle: "What I build",
    servicesLabel: "Capabilities",
    services: [
      {
        title: "Computer Vision systems",
        body: "Video understanding, pose and action recognition, on-device real-time inference.",
      },
      {
        title: "LLM · RAG · Agentic systems",
        body: "Agentic pipelines, multimodal retrieval, tool-using assistants with real guardrails.",
      },
      {
        title: "Data engineering & analytics",
        body: "API integrations, scheduled pipelines, geospatial analysis, forecasting.",
      },
      {
        title: "Full product / MVP build",
        body: "From idea to a deployed product with real users, across the whole stack.",
      },
    ],
    workTitle: "Selected Work",
    workLiveLabel: "Live",
    workCodeLabel: "Code",
    workSeeMore: "See more",
    caseStudy: {
      back: "Selected work",
      problem: "Problem",
      approach: "Approach",
      result: "Result",
    },
    research: {
      title: "Research & recognition",
      intro:
        "PhD at the Perception and Intelligence Lab (PINlab), Sapienza University of Rome. Visiting researcher in Amsterdam. Invited speaker at Ferrari S.p.A.",
      openSource:
        "Every result below is fully open source: each paper ships with its complete implementation.",
      scholarLabel: "Full list on Google Scholar",
    },
    about: {
      title: "About",
      body: [
        "I build AI systems that understand the physical world, and right now that means Procedo. As CTO and Co-Founder of Procedo, I lead the technology behind turning raw shop-floor video into structured manufacturing knowledge: agentic pipelines that extract procedures from video, multimodal retrieval, and AI assistants that help industrial teams document, optimize, and train their work. It's the point where my research finally became a product people use every day.",
        "That research is where the story starts. I recently completed a PhD at the Perception and Intelligence Lab (PINlab) at Sapienza University of Rome, working on Anomaly Detection, Action Recognition, Procedural Learning, and Hyperbolic Neural Networks. Along the way I spent time in Amsterdam as a visiting researcher, and published at top AI and computer vision venues including CVPR, ICCV, and IROS, as well as journals such as Pattern Recognition and Artificial Intelligence in Medicine.",
        "I've always had the urge to build something of my own. Before Procedo I co-founded HomeSweatHome, an AI virtual trainer that coaches people through their workouts in real time. I was also invited to speak at Ferrari S.p.A.'s Data Science Hub on generative AI and computer vision use cases.",
        "The common thread through all of it is curiosity: for new problems, new places, and new people. It has taken me from Udine to Rome, and from Gothenburg to Amsterdam, and it is the same thing that pulls me toward whatever I build next.",
      ],
    },
    contact: {
      title: "Let’s talk",
      body: "Have an interesting problem or an idea to build? Drop me a line.",
      email: "flaborea.alessandro@gmail.com",
    },
  },
  it: {
    nav: {
      work: "Lavori",
      research: "Ricerca",
      about: "Chi sono",
      contact: "Contatti",
      cta: "Contattami",
    },
    hero: {
      label: "Computer Vision · Sistemi LLM",
      name: "Alessandro Flaborea",
      tagline:
        "Trasformo problemi reali in sistemi AI e dati funzionanti, end to end.",
      ctaPrimary: "Contattami",
      ctaSecondary: "Guarda i progetti selezionati",
      credibility:
        "PhD in Computer Vision · CVPR/ICCV/IROS · Co-Founder di Procedo",
    },
    servicesTitle: "Cosa costruisco",
    servicesLabel: "Competenze",
    services: [
      {
        title: "Sistemi di Computer Vision",
        body: "Comprensione video, pose e action recognition, inferenza real-time on-device.",
      },
      {
        title: "LLM · RAG · Sistemi agentici",
        body: "Pipeline agentiche, retrieval multimodale, assistenti che usano strumenti con guardrail reali.",
      },
      {
        title: "Data engineering & analytics",
        body: "Integrazioni API, pipeline schedulate, analisi geospaziale, forecasting.",
      },
      {
        title: "Prodotto completo / MVP",
        body: "Dall'idea a un prodotto in produzione con utenti reali, su tutto lo stack.",
      },
    ],
    workTitle: "Progetti selezionati",
    workLiveLabel: "Live",
    workCodeLabel: "Codice",
    workSeeMore: "Scopri di più",
    caseStudy: {
      back: "Lavori selezionati",
      problem: "Problema",
      approach: "Approccio",
      result: "Risultato",
    },
    research: {
      title: "Ricerca e riconoscimenti",
      intro:
        "PhD al Perception and Intelligence Lab (PINlab), Sapienza Università di Roma. Visiting researcher ad Amsterdam. Relatore invitato in Ferrari S.p.A.",
      openSource:
        "Tutto quello che vedi qui è completamente open source: ogni paper è accompagnato dall'implementazione completa.",
      scholarLabel: "Elenco completo su Google Scholar",
    },
    about: {
      title: "Chi sono",
      body: [
        "Costruisco sistemi di AI che comprendono il mondo fisico, e in questo momento questo significa Procedo. Come CTO e Co-Founder di Procedo, guido la tecnologia che trasforma i video grezzi di reparto in conoscenza produttiva strutturata: pipeline agentiche che estraggono procedure dai video, retrieval multimodale e assistenti AI che aiutano i team industriali a documentare, ottimizzare e formare il proprio lavoro. È il punto in cui la mia ricerca è finalmente diventata un prodotto che le persone usano ogni giorno.",
        "Ed è dalla ricerca che parte la storia. Ho da poco concluso un dottorato al Perception and Intelligence Lab (PINlab) della Sapienza di Roma, lavorando su Anomaly Detection, Action Recognition, Procedural Learning e Hyperbolic Neural Networks. Durante il percorso ho trascorso un periodo ad Amsterdam come visiting researcher e ho pubblicato nelle principali conferenze di AI e computer vision, tra cui CVPR, ICCV e IROS, oltre che su riviste come Pattern Recognition e Artificial Intelligence in Medicine.",
        "Ho sempre sentito il bisogno di costruire qualcosa di mio. Prima di Procedo ho co-fondato HomeSweatHome, un personal trainer virtuale basato su AI che segue le persone durante l'allenamento in tempo reale. Sono stato inoltre invitato a parlare al Data Science Hub di Ferrari S.p.A. su modelli di AI generativa e casi d'uso di computer vision.",
        "Il filo che lega tutto è la curiosità: per problemi nuovi, luoghi nuovi e persone nuove. Mi ha portato da Udine a Roma e da Göteborg ad Amsterdam, ed è la stessa cosa che mi spinge verso ciò che costruirò dopo.",
      ],
    },
    contact: {
      title: "Parliamone",
      body: "Hai un problema interessante o un'idea da costruire? Scrivimi.",
      email: "flaborea.alessandro@gmail.com",
    },
  },
};
