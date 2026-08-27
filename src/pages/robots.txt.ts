// src/pages/robots.txt.ts — il `robots.txt` (rotta `/robots.txt`).
//
// Prima era un file fisso in `public/`, con la riga `Sitemap:` che nominava
// il dominio a mano. Al passaggio a flaborea.com è rimasta indietro: per due
// settimane ha indicato la sitemap su `aleflabo.github.io`, cioè su un
// indirizzo che risponde 301 — e alcuni crawler scartano una direttiva
// `Sitemap` che punta fuori dal dominio del `robots.txt` che stanno
// leggendo. Ora l'indirizzo lo mette `context.site`, cioè `astro.config.mjs`:
// lo stesso posto da cui vengono canonici, hreflang e sitemap.
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const corpo = `# Tutti i crawler sono benvenuti, compresi quelli dei motori
# generativi (GPTBot, ClaudeBot, PerplexityBot, Google-Extended): il
# consenso è nel non elencarli, non in un commento.
User-agent: *
Allow: /

Sitemap: ${site}/sitemap-index.xml
`;
  return new Response(corpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
