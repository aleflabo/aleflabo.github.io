// Testi inglesi di /en/training. Fonte: testi-en.md, sezione «3. /en/training»
// — tutti i blocchi sono [TRADOTTO].
import type { Formato, RiquadroAiAct, Strada } from "../formazione";

export const formati: Formato[] = [
  {
    ore: "4 hours",
    nome: "Introductory course",
    corpo: "For the whole company together, from the owner to the shop floor. How these tools work, the ways they get things wrong and how you notice they're getting things wrong, where the documents you paste into them end up, and which are the cases where they're genuinely worth using.",
    perChi: "Everyone, including people who have never opened ChatGPT",
    serveDaVoi: "A room and a projector",
  },
  {
    ore: "8–12 hours",
    nome: "Workshop by function",
    corpo: "Engineering office, purchasing, administration, sales: each group works on its own documents and its own cases. We start from a task that takes hours today and try to shorten it, together, during the session.",
    perChi: "One department at a time, small groups",
    serveDaVoi: "Real documents and permission to use them",
  },
  {
    ore: "Length agreed",
    nome: "Funded programme",
    corpo: "For when a long programme is needed without committing cash. It's built together with an accredited training body, which takes care of the administration and the reporting.",
    perChi: "Companies with employees already enrolled with a fund",
    serveDaVoi: "Knowing which fund you're enrolled with. The rest we work out together",
  },
];

// «Something worth knowing», sezione /en/training.
export const riquadroAiAct: RiquadroAiAct = {
  titolo: "Something worth knowing",
  corpo: [
    "Since 2 February 2025, Article 4 of the AI Act asks companies that use artificial intelligence tools to ensure a minimum level of training for their staff, and to be able to document it. It applies to companies that only use ChatGPT too, and it doesn't concern only the IT department.",
    "The basic course that satisfies that requirement is around four hours. It's training the company will do anyway: it's worth it being good for working better too.",
  ],
  link: { testo: "Where your data ends up", href: "/en/your-data" },
};

// «Who pays for the course», le tre strade, sezione /en/training.
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
