// Testi inglesi di /en/your-data. Fonte: testi-en.md, sezione «7. /en/your-data»
// — tutti i blocchi sono [TRADOTTO].
import type {
  Situazione,
  RispostaCorta,
  QuelloCheNonPossoGarantirvi,
  SuQuestoHoLavoratoDavvero,
} from "../dati";

export const situazioniDati: Situazione[] = [
  {
    numero: "1",
    titolo: "When somebody in the office uses ChatGPT on their own",
    corpo: [
      "It's the most common situation and the least controlled. What happens depends almost entirely on which version is being used: personal subscriptions and business ones treat data differently, and in some cases the content of the conversations can be used to improve the service, unless somebody goes into the settings.",
      "The thing to do isn't to ban the tool, because it would get used anyway, out of sight. It's to look together at which versions are in use, at what their terms say today, and to write two lines of internal rule that people can actually follow.",
    ],
  },
  {
    numero: "2",
    titolo: "When I build something for you",
    corpo: [
      "Here the control is total, because we make the choices ourselves. The data sits on infrastructure registered to your company, in Europe, with the credentials in your hands. If the relationship ends tomorrow, I step out and the system stays on.",
    ],
    punti: [
      {
        titolo: "Separation per customer.",
        testo: "Every company has its own data isolated from the others, and the separation is enforced by the database, not by the program running on top of it. It's the difference between a rule you can get round by mistake and one you can't.",
      },
      {
        titolo: "Only the bare minimum leaves.",
        testo: "If an external model is needed, it gets the piece of information required to answer, not the archive. In the parts portal, for instance, the end customer sees the geometry they need to recognise the part and not the machine's complete model.",
      },
      {
        titolo: "Access log.",
        testo: "Who saw what and when stays written down. It's there for the day somebody asks.",
      },
      {
        titolo: "Deletion on request.",
        testo: "When the job ends, the data you gave me is deleted and I confirm it to you in writing.",
      },
    ],
  },
  {
    numero: "3",
    titolo: "When you give me documents so I can understand the problem",
    corpo: [
      "For the diagnosis I need real files, not cleaned-up examples: an export from your management system, a list of items, a few working documents. Depending on the company they can be drawings, price lists, production sheets, contracts or simply emails. They stay on my computer, they don't end up in any external service, and at the end of the job I delete them. If you'd rather, we can sign a confidentiality agreement before the first meeting even happens: I don't take it badly, it's a reasonable request.",
      "When fake data is enough to find out whether something works, I use fake data. It happens more often than people think.",
    ],
  },
];

// Testo introduttivo della pagina + il riquadro «The short answer».
export const rispostaCorta: RispostaCorta = {
  intro: "It's the question almost nobody asks out loud and almost everybody asks themselves. This page answers at length, without generic reassurance, so you can decide before signing anything.",
  titolo: "The short answer",
  testo: "Your files stay yours and nobody uses them to train anything. What I build lives on infrastructure registered to you; the documents you give me to understand the problem stay on my computer, and at the end of the job I delete them.",
  nota: "Below is the long version, which is the one that counts: the things you have just read need checking, and here is how.",
};

export const quelloCheNonPossoGarantirvi: QuelloCheNonPossoGarantirvi = {
  titolo: "What I can't guarantee you",
  punti: [
    "I don't control what external providers do with their own systems. I can choose them, configure them and read you their terms, but their rules are written by them and change over time.",
    "No configuration holds if credentials get passed around in chats. The most fragile part of any system is people's habits, and it's also why I insist on training.",
    "I'm not a lawyer. On contracts and formal obligations your own adviser has the last word, and is right to have it.",
  ],
};

export const suQuestoHoLavoratoDavvero: SuQuestoHoLavoratoDavvero = {
  titolo: "I've actually worked on this",
  corpo: [
    "At Procedo every industrial customer had their own data isolated from the others, and it's a requirement you design in at the start or you never get. In the parts portal, protecting intellectual property is a section of the project, decided before writing any code: for a machine builder, handing a supplier the drawings of their own machines is the most delicate thing there is. The same holds for a distributor's price lists, for a practice's client records, or for the recipes of somebody who manufactures.",
    "The same rules apply to the things I build for myself: the security sits in the database and the program is treated as if it were untrustworthy, because sooner or later it will be.",
    "If you're looking at this page because somebody has told you about the AI Act: the part concerning staff training has been in force since February 2025, and you'll find it explained without alarmism on the training page.",
  ],
  link: [
    { testo: "Go to the training", href: "/en/training" },
    { testo: "The four ways of working together", href: "/en/services" },
  ],
};
