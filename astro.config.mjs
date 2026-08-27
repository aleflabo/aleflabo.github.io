import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Il canonico. `public/CNAME` deve dire lo stesso nome: senza quel file la
  // GitHub Action ripubblica dist/ da zero e il dominio impostato nelle
  // impostazioni del repository sparisce al primo deploy.
  site: 'https://flaborea.com',
  output: 'static',
  redirects: {
    '/it': '/',
    '/work/[slug]': '/lavori/[slug]',
    // Il progetto si chiama Grip; «Tire Hub» era il nome con cui era uscito.
    '/lavori/tire-hub': '/lavori/grip',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it', en: 'en' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
