// Testi inglesi di /en/services. Fonte: docs/superpowers/specs/2026-08-25-sito-italiano/testi-en.md,
// sezione «2. /en/services» — tutti i blocchi sono [TRADOTTO], tranne il
// primo `faq[0].link` che riusa l'href risolto verso /en/your-data.
import type { Ingaggio, Domanda } from "../servizi";

export const ingaggi: Ingaggio[] = [
  {
    chiave: "understand",
    etichetta: "Understand",
    nome: "A diagnostic half-day",
    corpo: [
      "I come to your company, watch how you work and ask a few questions. It's there to work out whether there's something worth taking on now, and sometimes the conclusion is that it can wait.",
    ],
    perChi: "It isn't clear where to start",
    durata: "One morning",
    cosaResta: "A list of the places where time is lost, with what they cost written next to them",
  },
  {
    chiave: "decide",
    etichetta: "Decide",
    nome: "AI audit",
    corpo: [
      "I look at the data you actually have, the systems already in use, who takes care of what and under which constraints. Then I write what would be worth doing, in what order, and which roads I'd leave alone.",
      "The document stays yours. If one day the work passes to somebody else, you hand it to them and they start from there.",
    ],
    perChi: "You have an idea and want to know whether it holds up before putting money into it",
    durata: "Two or three weeks",
    cosaResta: "A document you can show to anyone, other suppliers included",
  },
  {
    chiave: "build",
    etichetta: "Build",
    nome: "Custom software",
    corpo: [
      "From automating a single step to a complete system. I always start with the part that might not work, so that if something turns out to be impossible we find out while changing course still costs little.",
      "The code is yours and I hand it over, so you don't stay tied to me longer than necessary.",
    ],
    perChi: "You have a specific process you want out of the way",
    durata: "From six weeks, in stages you approve one at a time",
    cosaResta: "Something people actually use, plus the source code",
  },
  {
    chiave: "maintain",
    etichetta: "Maintain",
    nome: "Service retainer",
    corpo: [
      "Software nobody looks after stops being useful within a few months. The retainer keeps standing what we built: servers, updates and the hours of changes that are needed along the way.",
      "Twelve months, renewable, with notice to exit. The included hours are written in the contract.",
    ],
    perChi: "You have something in production and would rather not have to think about it",
    durata: "Twelve months, renewable, with an exit",
    cosaResta: "Servers included, and a person who answers when you call",
  },
];

export const faq: Domanda[] = [
  {
    domanda: "Where does our data end up?",
    risposta:
      "It's the right question and it deserves more than one paragraph: there's a whole page that explains it, including the things I can't guarantee you. In short: the files stay yours and nobody uses them to train anything; what I build lives on infrastructure registered to you.",
    link: { testo: "Read the page about data", href: "/en/your-data" },
  },
  {
    domanda: "How much does it cost?",
    risposta:
      "It depends on three things: how complicated the hardest part is, how many systems you already have that it has to touch, and whether somebody needs to keep it alive afterwards. I don't publish a price list because a price written without knowing your case would be a made-up number. At the end of the diagnostic half-day you have a written quote with the items listed separately, and no obligation to go on.",
  },
  {
    domanda: "How long does it take?",
    risposta:
      "The half-day is one morning. The audit two or three weeks. A project starts at six weeks and proceeds in stages you approve one at a time, so you can stop at any point without losing what has been done.",
  },
  {
    domanda: "What do you need from us?",
    risposta:
      "Little, but that little is indispensable: half a day of the people who actually do the work, not only of the people who describe it; some real files instead of a cleaned-up example; and one person inside who can answer questions when they come up. Without that last one, projects stall, always.",
  },
  {
    domanda: "And what if it doesn't work?",
    risposta:
      "I start with the part that might not work precisely so we find out early. If it turns out something can't be done, I tell you, I hand over what I've understood up to that point and we stop: you pay for the work done and not for the promised result. It has happened, and it was money saved.",
  },
];

// Le quattro righe di testi-en.md, sezione /en/services, sotto «Who I'm not for».
export const perChiNonSono: string[] = [
  "If you're looking for a brochure site or an e-commerce, there are agencies that do it better than me and cost less.",
  "If the goal is to introduce artificial intelligence without a specific problem in mind, it's worth stopping earlier and looking for the problem.",
  "If you need somebody there every day, it's better to hire a person than to call a consultant.",
  "If the data you'd need doesn't exist, or nobody has ever written it down, the first job is collecting it, and that takes time.",
];
