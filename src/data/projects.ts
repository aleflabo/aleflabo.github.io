export interface CaseCopy {
  area: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
}

export interface Project {
  slug: string;
  order: number;
  name: string;
  role: string;
  year: string;
  status: "live" | "case" | "code";
  url?: string;
  repo?: string;
  stack: string[];
  tags: string[];
  /** Etichette italiane per /lavori: cosa fa la cosa e a che punto è. Mai nomi di tecnologie. */
  tagIt: string[];
  en: CaseCopy;
  it: CaseCopy;
}

export const projects: Project[] = [
  {
    slug: "procedo",
    order: 1,
    name: "Procedo",
    role: "Co-Founder & CTO",
    year: "2024–2026",
    status: "case",
    url: "https://procederai.com",
    stack: [
      "Computer Vision",
      "Applied LLMs",
      "Agentic AI",
      "Cloud infrastructure",
    ],
    tags: ["Computer Vision", "Applied LLMs"],
    tagIt: [
      "Computer vision",
      "LLM applicati",
      "Dati isolati per cliente",
      "B4i Bocconi",
      "Round angel",
    ],
    en: {
      area: "Industrial AI",
      summary:
        "An AI platform that turns raw shop-floor video into structured manufacturing knowledge, in production with real industrial customers.",
      problem:
        "Manufacturing teams document, optimize, and train on physical procedures by hand, a slow process that rarely keeps pace with how work actually happens on the floor.",
      approach:
        "As CTO and co-founder I led the architecture and productionization of the core AI: turning long operational video into clear, step-by-step procedures; letting teams get grounded answers from their own documentation; and an assistant that helps them work with those procedures safely. The platform runs in the cloud, isolated per customer.",
      result:
        "Procedo runs in production for industrial customers, was selected for Bocconi's B4i accelerator, and closed an angel round.",
    },
    it: {
      area: "AI industriale",
      summary:
        "Una piattaforma che trasforma i video girati in reparto in procedure passo-passo, e permette a chi lavora di fare domande alla documentazione della propria azienda. Ne sono stato co-fondatore e CTO per due anni: ho guidato l'architettura e portato in produzione la parte di AI. Oggi la seguo come advisor.",
      problem:
        "I team industriali documentano, ottimizzano e formano sulle procedure fisiche a mano, un processo lento che raramente tiene il passo con il lavoro reale in reparto.",
      approach:
        "Come CTO e co-founder ho guidato l'architettura e la messa in produzione dell'AI core: trasformare lunghi video operativi in procedure chiare passo-passo; permettere ai team di ottenere risposte fondate dalla propria documentazione; e un assistente che li aiuta a lavorare su quelle procedure in sicurezza. La piattaforma gira nel cloud, isolata per ciascun cliente.",
      result:
        "Procedo gira in produzione presso clienti industriali, è stata selezionata dall'acceleratore B4i di Bocconi e ha chiuso un round angel.",
    },
  },
  {
    slug: "portale-ricambi",
    order: 2,
    name: "Portale ricambi 3D",
    role: "Solo build",
    year: "2026",
    status: "case",
    stack: ["3D web rendering", "CAD conversion pipeline", "Automated testing"],
    tags: ["CAD conversion", "Parts catalog"],
    tagIt: ["Pipeline CAD", "80 test", "IP protetta", "In costruzione"],
    en: {
      area: "Mechanical engineering",
      summary:
        "A 3D parts portal for an industrial machine builder: the customer opens the 3D model of the machine they bought, clicks the part they need, and the request arrives at the company already matched to the part's internal code.",
      problem:
        "Today that same request is an email with a photo, and before quoting, someone has to track down the right part code by hand.",
      approach:
        "The CAD-to-web conversion pipeline is finished and tested with eighty automated tests. The customer only ever sees the geometry of the part they need to recognize it, not the machine's full model, protecting the manufacturer's intellectual property.",
      result:
        "The CAD conversion pipeline is finished and proven; the portal itself is still in development.",
    },
    it: {
      area: "Meccanica",
      summary:
        "Il cliente apre il modello 3D della macchina che ha comprato, clicca il pezzo che gli serve, e in azienda la richiesta arriva già associata al codice interno del componente.",
      problem:
        "Oggi quella stessa richiesta è una mail con una foto, e prima del preventivo qualcuno deve andare a caccia del codice.",
      approach:
        "La pipeline di conversione dei CAD è finita e collaudata, con ottanta test automatici. Il cliente finale vede solo la geometria del pezzo che gli serve per riconoscerlo, non il modello completo della macchina: la proprietà intellettuale del costruttore resta protetta.",
      result:
        "La pipeline di conversione dei CAD è finita e collaudata; il portale è in costruzione.",
    },
  },
  {
    slug: "tire-hub",
    order: 3,
    name: "Tire Hub",
    role: "Solo build",
    year: "2026",
    status: "case",
    stack: ["Web dashboard", "Auto-generated scaffold", "Custom data layer"],
    tags: ["Business dashboard", "Personal initiative"],
    tagIt: ["Gestionale", "Statistiche per area", "Iniziativa mia"],
    en: {
      area: "Automotive",
      summary:
        "A management dashboard for the tire trade: customer and stock records, area-by-area statistics, and the daily counter work of the people at the desk.",
      problem:
        "Started as a personal initiative rather than a client engagement.",
      approach:
        "Built it starting from an auto-generated scaffold, then hand-rebuilt the parts that matter, to see how far that starting point could be pushed.",
      result:
        "Customer and stock records, area statistics, and the daily counter workflow are already covered by the dashboard.",
    },
    it: {
      area: "Automotive",
      summary:
        "Una dashboard gestionale per il settore gomme: anagrafiche, statistiche per area e il lavoro quotidiano di chi sta al banco.",
      problem: "Nasce da un'iniziativa mia e non da una commessa.",
      approach:
        "L'ho costruita partendo da uno strumento di generazione automatica, per poi rifare a mano le parti che contano e vedere quanto lontano si arriva.",
      result:
        "Anagrafiche, statistiche per area e il lavoro quotidiano di chi sta al banco sono già coperti dalla dashboard.",
    },
  },
  {
    slug: "agentic-toolkit",
    order: 4,
    name: "Agentic Workflow Toolkit",
    role: "Solo build",
    year: "2026",
    status: "case",
    stack: ["Claude Code", "MCP", "Notion API", "GitHub API", "LLM agents"],
    tags: ["Agentic tooling", "Automation"],
    tagIt: ["Standup automatico", "Documentazione rigenerata", "Revisione dei prompt"],
    en: {
      area: "Agentic tooling",
      summary:
        "A suite of AI-agent skills that automate my team's ops and engineering workflows, from daily standups to LLM-prompt review.",
      problem:
        "Recurring team and engineering chores, running standups, tracking sprints across Notion and GitHub, keeping platform docs current, and reviewing LLM prompts before they ship, quietly consumed time and drifted out of date.",
      approach:
        "I built a set of Claude Code skills, each a focused agent with the right tools wired in: a standup skill that cross-references GitHub activity with Notion tasks and drafts the daily update; a platform-map skill that scans the repo and regenerates the architecture docs; and a prompt-review skill that audits LLM prompts for efficacy and regressions across the extraction pipeline and the chat agents.",
      result:
        "Routine ops and documentation now run as one-command agent invocations instead of manual work, and every prompt change gets a consistent review before it ships.",
    },
    it: {
      area: "Tooling agentico",
      summary:
        "Una suite di skill ad agenti AI che automatizzano le operazioni del team e i flussi ingegneristici, dagli standup quotidiani alla review dei prompt LLM.",
      problem:
        "Attività ricorrenti di team e ingegneria, condurre gli standup, tracciare gli sprint tra Notion e GitHub, tenere aggiornata la documentazione di piattaforma e revisionare i prompt LLM prima del rilascio, consumavano tempo in silenzio e si disallineavano.",
      approach:
        "Ho costruito un insieme di skill Claude Code, ognuna un agente focalizzato con gli strumenti giusti collegati: una skill di standup che incrocia l'attività GitHub con i task Notion e redige l'aggiornamento quotidiano; una skill platform-map che analizza il repo e rigenera la documentazione di architettura; e una skill di prompt-review che verifica i prompt LLM per efficacia e regressioni, sulla pipeline di estrazione e sugli agenti di chat.",
      result:
        "Le operazioni di routine e la documentazione ora girano come invocazioni di agenti a un comando invece che a mano, e ogni modifica ai prompt riceve una review coerente prima del rilascio.",
    },
  },
  {
    slug: "spannum",
    order: 5,
    name: "Spannum",
    role: "Solo build",
    year: "2026",
    status: "live",
    url: "https://spannum.com",
    stack: [
      "React",
      "TypeScript",
      "Supabase",
      "Cloudflare Workers",
      "PWA",
      "Web Speech API",
    ],
    tags: ["Full product", "Research to product"],
    tagIt: ["Online e pubblico", "Norme per età", "Si installa sul telefono"],
    en: {
      area: "Applied psychometrics",
      summary:
        "A working-memory test and trainer that turns the digit-span protocol into a consumer web app, with age norms and a shareable report.",
      problem:
        "The digit-span task is a well-validated measure of working memory, but it lives in research papers and clinical settings. The consumer apps that borrow its name mostly drop the protocol and promise to make you smarter.",
      approach:
        "I built the test to the published protocol, forward and backward, digits and letters, with stimuli spoken by the browser's built-in speech synthesis rather than pre-recorded audio. Results are scored against age norms from the literature, and the site is explicit about what the evidence supports: training improves the task, not general intelligence. The public site is prerendered so crawlers and answer engines see the real content; the app itself is an installable PWA on a separate domain.",
      result:
        "Live and open to the public at spannum.com, with a shareable report, comparison against age norms, and the peer-reviewed sources cited on the site.",
    },
    it: {
      area: "Psicometria applicata",
      summary:
        "Un test e un allenamento della memoria di lavoro che porta il protocollo digit-span in una web app consumer, con norme per età e un report condivisibile.",
      problem:
        "Il digit-span è una misura ben validata della memoria di lavoro, ma vive nei paper e in ambito clinico. Le app consumer che ne prendono il nome per lo più abbandonano il protocollo e promettono di renderti più intelligente.",
      approach:
        "Ho costruito il test seguendo il protocollo pubblicato, diretto e inverso, cifre e lettere, con gli stimoli pronunciati dalla sintesi vocale integrata nel browser invece che da audio preregistrato. I risultati sono confrontati con le norme per età della letteratura, e il sito è esplicito su ciò che le evidenze sostengono: l'allenamento migliora il compito, non l'intelligenza generale. Il sito pubblico è prerenderizzato perché crawler e answer engine vedano il contenuto reale; l'app è una PWA installabile su un dominio separato.",
      result:
        "Live e aperto al pubblico su spannum.com, con report condivisibile, confronto con le norme per età e le fonti peer-reviewed citate sul sito.",
    },
  },
  {
    slug: "fanta-mundial",
    order: 6,
    name: "Fanta Mundial",
    role: "Solo build",
    year: "2026",
    status: "live",
    url: "https://fanta-mundial.streamlit.app",
    stack: ["Python", "Streamlit", "Supabase", "bcrypt"],
    tags: ["Full product", "API integration"],
    tagIt: ["Una quarantina di giocatori", "Esiti aggiornati da soli", "In produzione"],
    en: {
      area: "Gamification",
      summary:
        "A full-stack prediction league with ~40 real users and automated result syncing.",
      problem:
        "A private World Cup prediction league needed real accounts, live standings, and scores that update themselves without manual entry.",
      approach:
        "Built a modular Streamlit app on Supabase: bcrypt auth, per-match predictions with lock windows, scoring, a live leaderboard, and a scheduled job that pulls match results from an external API and updates standings automatically.",
      result:
        "Deployed on Streamlit Community Cloud with around 40 active players. Covered by pytest; result-syncing runs unattended.",
    },
    it: {
      area: "Gamification",
      summary:
        "Una prediction league full-stack con ~40 utenti reali e sync automatico degli esiti.",
      problem:
        "Una lega privata di pronostici sul Mondiale serviva account reali, classifica in tempo reale ed esiti che si aggiornano da soli, senza inserimento manuale.",
      approach:
        "App Streamlit modulare su Supabase: auth con bcrypt, pronostici per partita con finestre di lock, scoring, classifica live e un job schedulato che recupera gli esiti da una API esterna e aggiorna la classifica in automatico.",
      result:
        "In produzione su Streamlit Community Cloud con circa 40 giocatori attivi. Coperta da pytest; il sync degli esiti gira senza supervisione.",
    },
  },
  {
    slug: "procedo-tracking-costs",
    order: 7,
    name: "Cost Tracking",
    role: "Solo build",
    year: "2025",
    status: "case",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Recharts",
      "Supabase",
      "pg_cron",
      "zod",
    ],
    tags: ["Full-stack", "API integration"],
    tagIt: ["Più fornitori in una vista", "Sincronizzazione giornaliera", "Gira senza supervisione"],
    en: {
      area: "Monitoring",
      summary:
        "An internal cost dashboard that tracks daily and monthly cloud, GitHub, and LLM spend for a small team, with FX conversion and subscription amortization.",
      problem:
        "A small team's cloud and tooling costs were scattered across multiple providers with no single view, making it hard to spot spend spikes or forecast burn.",
      approach:
        "Built a Next.js dashboard backed by Supabase, with scheduled Edge Functions syncing cloud cost data, GitHub billing, and FX rates daily via pg_cron, zod-validated data models, and magic-link auth restricted to the team's domain.",
      result:
        "Runs unattended in production with a sync_runs observability table, giving the team a single daily view of cross-provider spend.",
    },
    it: {
      area: "Monitoraggio",
      summary:
        "Una dashboard interna che traccia la spesa giornaliera e mensile su cloud, GitHub e servizi LLM per un piccolo team, con conversione FX e ammortamento degli abbonamenti.",
      problem:
        "I costi cloud e di tooling di un piccolo team erano sparsi su più provider senza una vista unica, rendendo difficile individuare picchi di spesa o prevedere il burn.",
      approach:
        "Ho costruito una dashboard Next.js su Supabase, con Edge Functions schedulate che sincronizzano ogni giorno i costi cloud, la fatturazione GitHub e i tassi FX via pg_cron, modelli dati validati con zod e autenticazione magic-link ristretta al dominio del team.",
      result:
        "Gira senza supervisione in produzione con una tabella di osservabilità sync_runs, offrendo al team una vista giornaliera unica della spesa multi-provider.",
    },
  },
  {
    slug: "contrada-navigator",
    order: 8,
    name: "Contrada Navigator",
    role: "Solo build",
    year: "2025",
    status: "case",
    stack: [
      "Streamlit",
      "pandas",
      "plotly",
      "React",
      "Vite",
      "TypeScript",
      "Leaflet",
    ],
    tags: ["Data engineering", "Geospatial"],
    tagIt: ["Mappa interattiva", "Serie storica 2012-2025", "Proiezioni al 2034"],
    en: {
      area: "Data analytics",
      summary:
        "A civic data project mapping an Italian town's historical neighborhoods, with participation forecasts through an interactive web map.",
      problem:
        "A town's historic contrada (neighborhood) boundaries and participation trends lived in scattered records, with no way to explore them or project future turnout.",
      approach:
        "Built a Python analysis layer in Streamlit and pandas to model street-to-contrada mapping rules and 2012-2025 trends, then a separate React and TypeScript web app with an interactive Leaflet map for exploring the data.",
      result:
        "Produces forecasts of participation through 2034 and a public-facing interactive map of the town's neighborhoods.",
    },
    it: {
      area: "Analisi dati",
      summary:
        "Un progetto di dati civici che mappa i quartieri storici (contrade) di un comune italiano, con previsioni di partecipazione tramite una mappa web interattiva.",
      problem:
        "I confini storici delle contrade di un comune e i trend di partecipazione erano sparsi in registri non organizzati, senza modo di esplorarli o proiettare la partecipazione futura.",
      approach:
        "Ho costruito un livello di analisi Python in Streamlit e pandas per modellare le regole di mappatura via-contrada e i trend 2012-2025, poi una web app separata in React e TypeScript con una mappa interattiva Leaflet per esplorare i dati.",
      result:
        "Produce previsioni di partecipazione fino al 2034 e una mappa interattiva pubblica dei quartieri del comune.",
    },
  },
  {
    slug: "vault",
    order: 9,
    name: "Personal Vault",
    role: "Solo build",
    year: "2024–Present",
    status: "case",
    stack: ["Obsidian", "Claude Code agent", "LLM"],
    tags: ["Agent / prompt engineering", "Knowledge systems"],
    tagIt: ["Wiki curata da un agente", "Uso quotidiano", "Vincoli sui dati"],
    en: {
      area: "Knowledge systems",
      summary:
        "A personal knowledge base that ingests notes and documents and interlinks them into a navigable wiki, following Karpathy's 'LLM wiki' pattern.",
      problem:
        "Personal notes, ideas, and documents accumulate faster than they can be organized, and manual note-taking rarely produces a system that stays useful over time.",
      approach:
        "Paired Obsidian with a Claude Code agent: an append-only raw inbox feeds an LLM-curated wiki with entity schemas for clients, projects, people, and concepts, wikilinks and a graph view, and slash commands for ingesting, querying, and linting the vault.",
      result:
        "A living personal wiki with strict data-governance constraints, used daily to search, brief, and disambiguate across a growing base of notes.",
    },
    it: {
      area: "Sistemi di conoscenza",
      summary:
        "Una knowledge base personale che ingerisce note e documenti e li interconnette in una wiki navigabile, seguendo il pattern 'LLM wiki' di Karpathy.",
      problem:
        "Note personali, idee e documenti si accumulano più in fretta di quanto si riesca a organizzarli, e la presa di appunti manuale raramente produce un sistema che resta utile nel tempo.",
      approach:
        "Ho affiancato Obsidian a un agente Claude Code: un inbox raw append-only alimenta una wiki curata dall'LLM con schemi entità per clienti, progetti, persone e concetti, wikilink e vista a grafo, e slash-command per ingerire, interrogare e verificare il vault.",
      result:
        "Una wiki personale viva con vincoli rigidi di governance dei dati, usata ogni giorno per cercare, preparare brief e disambiguare all'interno di una base di note in crescita.",
    },
  },
  {
    slug: "homesweathome",
    order: 10,
    name: "HomeSweatHome",
    role: "Founding team",
    year: "2021–2023",
    status: "case",
    stack: ["Python", "Computer Vision", "Pose estimation", "On-device"],
    tags: ["Computer Vision", "MVP"],
    tagIt: ["Lettura della postura", "Tempo reale", "Senza cloud"],
    en: {
      area: "Computer Vision",
      summary:
        "An AI virtual trainer that reads posture and movement from a laptop webcam and coaches workouts in real time, entirely on-device.",
      problem:
        "People training at home have no one watching their form, and cloud round-trips are too slow to give useful feedback mid-exercise.",
      approach:
        "As part of the founding team I designed the architecture and built the perception core: real-time posture and movement analysis and an on-device action recognition model, both light enough to run smoothly on consumer hardware.",
      result:
        "Reached a working MVP presented at the demo day of Bocconi University's IdeaBoosterLab accelerator.",
    },
    it: {
      area: "Computer Vision",
      summary:
        "Un personal trainer virtuale AI che legge postura e movimento dalla webcam di un laptop e guida l'allenamento in tempo reale, interamente on-device.",
      problem:
        "Chi si allena a casa non ha nessuno che ne osservi l'esecuzione, e l'andata e ritorno verso il cloud è troppo lento per un feedback utile durante l'esercizio.",
      approach:
        "Come parte del team fondatore ho progettato l'architettura e costruito il cuore di percezione: analisi di postura e movimento in tempo reale e un modello di action recognition on-device, entrambi abbastanza leggeri da girare fluidi su hardware consumer.",
      result:
        "Raggiunto un MVP funzionante, presentato al demo day dell'IdeaBoosterLab, l'acceleratore dell'Università Bocconi.",
    },
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
