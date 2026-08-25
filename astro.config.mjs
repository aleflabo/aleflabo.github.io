import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // flaborea.com non è ancora registrato: finché non lo è, il canonico è questo.
  site: 'https://aleflabo.github.io',
  output: 'static',
  // 'never': prima di TestataPagina.astro (task-1, sito-inglese) nessuna
  // pagina aveva mai un foglio di stile piccolo abbastanza da finire
  // inline — con 'auto' (il default) il CSS del componente condiviso,
  // isolato in un proprio chunk, scende sotto la soglia e Astro lo
  // inietterebbe come <style> in testa a ogni pagina che lo usa: stesse
  // regole, stesso risultato visivo, ma un <head> diverso da quello che è
  // già in produzione. 'never' mantiene il comportamento attuale (tutto
  // via <link rel="stylesheet">) invariato per l'intero sito.
  build: {
    inlineStylesheets: 'never',
  },
  redirects: {
    '/it': '/',
    '/work/[slug]': '/lavori/[slug]',
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
