import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // flaborea.com non è ancora registrato: finché non lo è, il canonico è questo.
  site: 'https://aleflabo.github.io',
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
