import type { Policy } from '../servizi';
// Testi inglesi di /en/services. Fonte: docs/superpowers/specs/2026-08-25-sito-italiano/testi-en.md,
// sezione «2. /en/services» — tutti i blocchi sono [TRADOTTO], tranne il
// primo `faq[0].link` che riusa l'href risolto verso /en/your-data.
import type { Competenza, Domanda } from "../servizi";

export const competenze: Competenza[] = [
  {
    chiave: "leadership",
    etichetta: "leadership",
    nome: "Fractional CTO",
    sottotitolo: "technical leadership, when a full-time CTO is too much",
    corpo: [
      "You have software in production, a demo people like, or just an idea, and nobody in-house who can say where it should go technically. I step in as technical director for a few days a month: I look at what's there, write down where it can grow and in what order, decide with you what to build and what not to, and follow whoever builds it. Including the question that always comes up now: where a language model or an AI agent makes sense in the product, and where it's just a fashion.",
      "The first job is always a map: how the system is made, where it's fragile, what changing it would cost. It stays yours, and whoever comes next starts from there.",
    ],
    tag: ["fractional CTO", "technical roadmap", "architecture", "technical due diligence", "vendor management"],
    perChi: "Startups without a CTO, companies with software built by suppliers nobody steers, anyone with a demo who needs to know whether it becomes a product",
    durata: "By the month, with an hour budget written in the contract and an exit on notice",
    cosaResta: "A technical roadmap, decisions put in writing, a supplier who knows what to deliver",
    prove: "Two years as CTO of Procedo; today the technical leadership of a multi-salon management platform",
  },
  {
    chiave: "building",
    etichetta: "building",
    nome: "Project-based development",
    sottotitolo: "with artificial intelligence, or without it, if it isn't needed",
    corpo: [
      "A new feature in software that already exists, an automation that removes a step done by hand, a whole system. When artificial intelligence is needed, I know which kind:",
    ],
    voci: [
      { termine: "computer vision", testo: "to recognise a part from a photo or check a step on the shop floor;" },
      { termine: "RAG", testo: "(an assistant that answers by citing your own documents) to make forty years of manuals and procedures speak;" },
      { termine: "AI agents", testo: "that do a multi-step job on their own: they read the email, search the management system, prepare the draft;" },
      { termine: "data extraction", testo: "from PDFs, quotes and forms that someone copies by hand today." },
    ],
    dopo: [
      "When a well-written rule is enough, I write the rule. I start with the part that might not work, in stages you approve one at a time. The code is yours.",
    ],
    tag: ["computer vision", "LLM", "RAG", "AI agents", "MCP", "process automation", "document extraction", "Python", "Laravel", "Vue/Nuxt"],
    perChi: "You have a specific process you want out of the way, or a feature your software doesn't have",
    durata: "From a few weeks, in stages",
    cosaResta: "Something people use, the source code, the documentation",
  },
  {
    chiave: "security",
    etichetta: "security",
    nome: "Security and code health",
    corpo: [
      "When a serious vulnerability comes out, the question «do we have to update?» is followed straight away by two more: «if we update, does something break?» and «what else is there that we don't know about?». I try the update on a copy, look at the code and the server configuration, and write down what's urgent, what can wait and what it costs.",
    ],
    caso: {
      titolo: "A case, October 2026",
      testo: "PHP fixes two serious remote code execution vulnerabilities, and the only remedy is updating. On a management system in production I checked that the update broke nothing, and updated the dependencies along the way. Looking at the rest of the system, other weak points nobody had reported came up: fixed in the same intervention.",
    },
    tag: ["vulnerability assessment", "CVE", "PHP upgrade", "dependencies", "code review", "server hardening"],
    perChi: "You have software in production nobody has looked at in a while, or a supplier asking you to trust them",
    durata: "From a few days to two weeks",
    cosaResta: "A document with the priorities, readable by non-technical people too, and the fixes if you want them",
  },
  {
    chiave: "research",
    etichetta: "research",
    nome: "Applied research",
    corpo: [
      "Some problems have no off-the-shelf solution: recognising what an operator is doing by watching them (action recognition), estimating their pose (pose estimation), noticing a mistake before it becomes scrap (anomaly detection). These are the problems I did my PhD on. I read the state of the art, tell you whether the problem can be solved today and at what cost, and try it on your data before you invest in it.",
    ],
    tag: ["computer vision", "action recognition", "anomaly detection", "pose estimation", "deep learning", "state of the art", "prototypes"],
    perChi: "R&D departments, deep-tech startups, funded projects that need a research partner",
    durata: "A feasibility study in a few weeks",
    cosaResta: "A reasoned answer, «it can be done / not yet / not like this», and a prototype measured on your data",
    prove: "10 papers (CVPR, ICCV, IROS), 609 citations, h-index 9",
  },
];

export const faq: Domanda[] = [
  {
    domanda: "Where does our data end up?",
    risposta:
      "It's the right question and it deserves more than one paragraph: there's a whole page that explains it, including the things I can't guarantee you. In short: the files stay yours and nobody uses them to train anything; what I build lives on infrastructure registered to you.",
    link: { testo: "Read the page about data", href: "/en/your-data/" },
  },
  {
    domanda: "How much does it cost?",
    risposta:
      "It depends on three things: how complicated the hardest part is, how many systems you already have that it has to touch, and whether somebody needs to keep it alive afterwards. I don't publish a price list because a price written without knowing your case would be a made-up number. After the first half hour, or after a morning at your company when it needs a closer look, you have a written quote with the items listed separately, and no obligation to go on.",
  },
  {
    domanda: "How long does it take?",
    risposta:
      "It depends on the work. A security review takes from a few days to two weeks, a feasibility study a few weeks, technical leadership is counted in months. A project proceeds in stages you approve one at a time, so you can stop at any point without losing what has been done.",
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

/**
 * La policy interna sull'uso dell'AI: servizio a parte, non incluso nei corsi.
 * Compare su /servizi (dopo le quattro competenze) e su /formazione. Testi
 * approvati l'8 novembre 2026 (testi-en.md, sezione formazione — Laboratorio).
 */
export const policy: Policy = {
  titolo: "An internal AI policy",
  corpo: ["A document that tells everyone in the company which tools are used, with which data, and who decides. It answers the question that always comes after the course: what can I paste into ChatGPT?"],
  consegna: ["A 3–5 page document.", "A one-page summary to share around the company.", "The list of approved tools, with the settings to use."],
  durata: "About a week: an hour's interview with the owner, a draft, a review together.",
  avvertenza: "It is not a substitute for legal advice.",
};
