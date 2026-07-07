import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.alessandroflaborea.me',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: { prefixDefaultLocale: false },
  },
});
