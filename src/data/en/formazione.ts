// Testi inglesi di /en/training. Fonte: testi-en.md, sezioni «3. /en/training»
// (le strade, [TRADOTTO]) e «/en/training and policy — Laboratorio»
// (approvati l'8 novembre 2026).
import type { Corso, DomandaAiAct, RiquadroAiAct, Strada, TestiCorsi } from "../formazione";

export const riquadroAiAct: RiquadroAiAct = {
  titolo: "Something worth knowing",
  corpo: [
    "Since 2 February 2025, Article 4 of the AI Act asks companies that use artificial intelligence tools to take measures so that their staff develop the skills to use them. It applies to companies that only use ChatGPT too, and it doesn't concern only the IT department.",
    "The rule sets no number of hours and asks for no certificate: what matters is being able to show what you have done. The introductory course, with its attendance register, is the simplest way to do that, and it also helps people work better.",
  ],
  fonte: "commissioneQa",
};

export const dettagliPratici: string[] = ["In person or online.", "At most 10 people per session."];

export const corsi: Corso[] = [
  {
    nome: "Introductory course",
    famiglia: "azienda",
    livelli: [
      { durata: "4 hours", perChi: "Everyone, including people who have never opened ChatGPT", moduli: [
        "How these tools work, and why they are sometimes confidently wrong",
        "Spotting a mistake: sources, figures and quotes to check",
        "What happens to the documents you paste in, and which settings to use",
        "Where they are actually worth using, with examples from your own work",
        "What the AI Act asks of your company, without alarmism",
      ] },
    ],
    serveDaVoi: "A room and a projector",
  },
  {
    nome: "Workshop by function",
    famiglia: "azienda",
    livelli: [
      { durata: "8–12 hours", perChi: "One department at a time, small groups", moduli: [
        "We pick a task that takes the department hours today",
        "We try the tools on the real documents",
        "We measure how much time is saved and where the tool gets it wrong",
        "We write the procedure the department will use from the next day",
      ] },
    ],
    serveDaVoi: "Real documents and permission to use them",
  },
  {
    nome: "Python",
    famiglia: "tecnici",
    livelli: [
      { nome: "base", durata: "8 hours", perChi: "People who have never programmed, or who have reached the limit of Excel formulas", moduli: [
        "Setting up the computer and writing a first program",
        "Variables, lists, conditions and loops, on real data",
        "Reading and writing Excel and CSV files",
        "Automating a repetitive office task",
        "Getting AI to help you write code, and how to check it",
      ] },
      { nome: "avanzato", durata: "12–16 hours", perChi: "People who already write scripts and want them to last", moduli: [
        "A tidy project: environments, dependencies, structure",
        "Automated tests",
        "Analysing data with pandas",
        "Calling APIs and language models from Python",
        "Running a script on its own: scheduling, logs, errors",
      ] },
    ],
    serveDaVoi: "A laptop each",
  },
  {
    nome: "Claude Code",
    famiglia: "tecnici",
    livelli: [
      { nome: "base", durata: "8 hours", perChi: "People who want to build small tools with an agent, even without knowing how to program", moduli: [
        "What a coding agent is and what it does on your computer",
        "From a problem to a first working tool, in the session",
        "Reading what the agent has done and noticing when it is wrong",
        "Permissions and data: what not to let it do",
        "Keeping the work tidy: versions and documentation",
      ] },
      { nome: "avanzato", durata: "12–16 hours", perChi: "Developers who want to work with an agent inside their own code", moduli: [
        "Preparing the project: instructions, memory, rules",
        "Planning before writing: specs and plans",
        "Tests first, then code, with the agent",
        "Commands, skills, hooks and external tools (MCP)",
        "Code review and several agents in parallel",
      ] },
    ],
    serveDaVoi: "A laptop each and an account on an active plan: without one, you hit the usage limits straight away",
  },
];

export const cosaResta: string[] = ["A certificate of attendance for each person.", "The attendance register with the programme covered, to keep as evidence of what you have done for Article 4.", "The course materials."];

export const faqAiAct: DomandaAiAct[] = [
  { domanda: "Do we need a certificate?", risposta: "No. The European Commission says a certificate is not needed and an internal record of training is enough. The certificate I issue is extra evidence, not a requirement.", fonte: "commissioneQa" },
  { domanda: "Does it have to be an accredited provider?", risposta: "No: the rule sets no requirements on who provides the training. A provider is only needed if the course is paid for by an interprofessional fund or has to go into a regional catalogue.", fonte: "commissioneQa" },
  { domanda: "How many hours are needed?", risposta: "The rule doesn't set them, and doesn't set a programme either: it depends on who uses which tools and with what risks. The four-hour introductory course is the basic measure I suggest.", fonte: "commissioneQa" },
  { domanda: "Does it apply if we only use ChatGPT?", risposta: "Yes. Article 4 covers anyone using artificial intelligence systems on the company's behalf, with no size threshold.", fonte: "regolamento2026_1744" },
  { domanda: "Does it cover external contractors too?", risposta: "Yes: the text covers staff and other people using these systems on the company's behalf.", fonte: "regolamento2026_1744" },
  { domanda: "From when can there be penalties?", risposta: "The obligation has applied since 2 February 2025. National authorities have supervised it since 2 August 2026.", fonte: "commissioneQa" },
  { domanda: "Does Italian law add obligations?", risposta: "No. Law 132 of 2025 states that it creates no new obligations beyond the AI Act.", fonte: "legge132" },
];

export const testiCorsi: TestiCorsi = {
  famiglie: { azienda: "For the whole company", tecnici: "For technical teams" },
  perChi: "who it's for",
  programma: "programme",
  serveDaVoi: "what you need",
  livelli: { base: "beginner", avanzato: "advanced" },
  titoloCosaResta: "What the company keeps",
  notaCosaResta: "The certificate records attendance: it is not a qualification and has no legal standing.",
  titoloFaq: "The AI Act, in seven questions",
  etichettaFonte: "source",
};

export const strade: Strada[] = [
  {
    titolo: "Directly",
    testo: "You contact me, we agree on the date and the contents, I invoice the company. It's the quickest route: we can start in a couple of weeks.",
  },
  {
    titolo: "Through an accredited training body",
    testo: "The body organises it and I teach. It's the route to take when the course has to be part of a regional catalogue or carry formal recognition.",
  },
  {
    titolo: "With the interprofessional funds",
    testo: "Companies with employees already pay 0.30% of their payroll into a fund such as Fondimpresa. That money can be used to train people, and it takes an accredited body to submit the plan.",
  },
];
