import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://flaborea.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: { prefixDefaultLocale: false },
  },
});
