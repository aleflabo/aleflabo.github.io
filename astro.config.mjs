import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { gemella } from './src/data/coppie.mjs';

export default defineConfig({
  // Il canonico. `public/CNAME` deve dire lo stesso nome: senza quel file la
  // GitHub Action ripubblica dist/ da zero e il dominio impostato nelle
  // impostazioni del repository sparisce al primo deploy.
  site: 'https://flaborea.com',
  output: 'static',
  redirects: {
    // Le destinazioni fisse hanno la barra finale: senza, il rimbalzo arriva
    // su un percorso che GitHub Pages gira a sua volta con un 301, e i salti
    // diventano due invece di uno.
    '/it': '/',
    // Questa no, e non è una svista: con la barra — da nessuna delle due
    // parti — Astro smette di generare le pagine di rimbalzo per `/work/…` e
    // il build resta muto. Quel rimbalzo costa quindi due salti invece di
    // uno; è un indirizzo che non esiste più da mesi e che nessuna pagina
    // linka, quindi il prezzo è accettabile.
    '/work/[slug]': '/lavori/[slug]',
    // Il progetto si chiama Grip; «Tire Hub» era il nome con cui era uscito.
    '/lavori/tire-hub': '/lavori/grip/',
  },
  integrations: [
    sitemap({
      // `i18n` da solo appaiava gli URL per struttura del percorso: dichiarava
      // gli alternati di /privacy/ ↔ /en/privacy/ e li lasciava fuori per
      // /chi-sono/ ↔ /en/about/, dove gli slug differiscono. Quattro URL su
      // trentotto ne avevano. `serialize` li mette tutti, letti da
      // src/data/coppie.mjs — la stessa mappa che `verifica-rotte.mjs`
      // confronta con gli `hreflang` del costruito.
      //
      // Niente `lastmod`: la data del build cambierebbe a ogni pubblicazione
      // anche senza che una riga di quella pagina sia cambiata, e una data di
      // modifica che non corrisponde a una modifica è un segnale peggiore che
      // nessuna data. Le note, che una data vera ce l'hanno, la portano nel
      // feed RSS.
      serialize(voce) {
        // Il dominio si ricava dall'URL che arriva, non da una costante qui
        // accanto: `scripts/sito.mjs` legge `site` da questo file cercando il
        // letterale, quindi una seconda copia in una `const` lo lascerebbe
        // senza fonte — ed è successo.
        const { origin, pathname } = new URL(voce.url);
        const coppia = gemella(pathname);
        if (!coppia) return voce;
        return {
          ...voce,
          links: [
            { lang: 'it', url: `${origin}${coppia.it}` },
            { lang: 'en', url: `${origin}${coppia.en}` },
            { lang: 'x-default', url: `${origin}${coppia.it}` },
          ],
        };
      },
    }),
  ],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
