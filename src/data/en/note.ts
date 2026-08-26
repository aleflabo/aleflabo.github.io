// Testi inglesi di /en/notes. Fonte: testi-en.md, sezione «8. /en/notes» —
// titolo, sommario e tag delle sei note sono [TRADOTTO]. Il testo integrale
// degli articoli non esiste in nessuna delle due lingue ([DA SCRIVERE] nella
// fonte), ma `Nota` non ha un campo per il corpo dell'articolo: nessun campo
// di questo file resta vuoto per quel motivo.
import type { Nota } from "../note";

// Dalla più recente, sezione /en/notes.
export const note: Nota[] = [
  {
    data: "25 Aug 2026",
    titolo: "What the AI Act actually asks of small companies",
    sommario:
      "Since 2 February 2025, anyone using artificial intelligence tools has to ensure a minimum level of staff training and be able to demonstrate it. A good part of what you read around is alarmism from people selling courses: here is the text of Article 4, what it means for a company of thirty people, and what can be done in half a day.",
    tag: ["Rules", "5-minute read"],
  },
  {
    data: "18 Aug 2026",
    titolo: "Why I built the hard piece first",
    sommario:
      "In a project for a machine builder the most uncertain part was converting the CAD models. I took it on before the rest, with eighty tests. If it hadn't worked we'd have known three weeks later, while changing course was still easy.",
    tag: ["How I work", "Manufacturing"],
  },
  {
    data: "11 Aug 2026",
    titolo: "What happens to your data when you paste a quote into ChatGPT",
    sommario:
      "The answer depends on which version is being used and how it's configured, and inside a company almost nobody knows. Three things you can check in ten minutes.",
    tag: ["Risks", "5-minute read"],
  },
  {
    data: "4 Aug 2026",
    titolo: "Half the requests I get are solved without artificial intelligence",
    sommario:
      "Often the problem is that a piece of information the company already has can't be retrieved when it's needed. Fixing that costs less and should have been done first anyway.",
    tag: ["Opinions"],
  },
  {
    data: "28 Jul 2026",
    titolo: "Six CVs from two text files",
    sommario:
      "When the facts are written down once, the variants become subtractions from that text and stop being copies to keep aligned by hand. A small example of a principle that holds for bills of materials too.",
    tag: ["Workshop"],
  },
  {
    data: "21 Jul 2026",
    titolo: "Three things I often get asked for and usually advise against",
    sommario:
      'The chatbot on the website, the model "trained on our data" and the dashboard nobody opens. Why they get asked for, where they jam, and what can be done instead.',
    tag: ["Opinions"],
  },
];
