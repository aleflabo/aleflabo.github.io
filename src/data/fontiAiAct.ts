/**
 * Le fonti verificate per ogni frase sull'AI Act del sito (spec formazione
 * 2026-11-08, § «Fonti verificate»). Una frase sulla norma entra solo con una
 * di queste: lo controlla src/lib/formazione.test.ts.
 */
export const fontiAiAct = {
  commissioneQa: {
    titolo: "Commissione europea, AI literacy – Questions & Answers",
    href: "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers",
  },
  regolamento2026_1744: {
    titolo: "Regolamento (UE) 2026/1744, nuovo articolo 4",
    href: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj",
  },
  legge132: {
    titolo: "Legge 23 settembre 2025, n. 132, testo in Gazzetta Ufficiale",
    href: "https://www.giurisprudenzapenale.com/wp-content/uploads/2025/09/legge-132-2025.pdf",
  },
} as const;

export type FonteAiAct = keyof typeof fontiAiAct;
