// src/lib/anno.ts — resa italiana degli intervalli di anno di `projects.ts`.
// L'inglese scrive "Present" (campo `year`, invariato); l'italiano di
// /lavori e /lavori/[slug] dice "oggi" (tavole/Lavori.dc.html: Personal
// Vault → "2024–oggi"). Condiviso fra le due pagine invece di duplicato
// (task 8, revisione finale del ramo sito-italiano — prima viveva solo in
// lavori/index.astro e lavori/[slug].astro lo rendeva grezzo, "2024–Present").
export const annoIt = (anno: string): string => anno.replace('Present', 'oggi');
