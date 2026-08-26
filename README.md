# alessandroflaborea.me

Personal portfolio site for Alessandro Flaborea — built with [Astro](https://astro.build), bilingual (Italian / English), deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) 5 (static output)
- Plain CSS (design tokens in `src/styles/tokens.css`, shared rules in `src/styles/global.css`)
- Bilingual routing: Italian at `/` (default locale, no prefix), English mirrored under `/en/` (see `src/i18n/ui.ts`)

## Project structure

```
src/
  components/   # Nav, Footer, LangSwitch, StackChip, TestataPagina
  components/sezioni/  # page sections: Occhiello, IlProblema, ComeLavoro, LeProve,
                        # DaDoveViene, FasciaNumeri, SchedaIngaggio, BloccoFormazione,
                        # RigaLavoro, Contatto, Faq
  data/         # site copy (site.ts) and per-page content (servizi.ts, formazione.ts,
                # dati.ts, note.ts, pubblicazioni.ts, chiSono.ts, projects.ts), Italian
                # by default with an `en/` mirror for the English copy
  i18n/         # locale list + path helpers (src/i18n/ui.ts)
  layouts/      # BaseLayout (head, meta, hreflang, Nav/Footer wrapper)
  lib/          # pure logic shared across pages (e.g. src/lib/anno.ts)
  pages/        # Italian pages at the root (index.astro, servizi.astro, lavori/[slug].astro, …)
                # and their English mirror under pages/en/ (index.astro, services.astro,
                # work/[slug].astro, …)
scripts/        # verifica-rotte.mjs, verifica-hreflang.mjs — the build's own safety net
public/         # static assets served as-is (favicon, robots.txt, og image)
```

Each Italian page has an English twin (e.g. `/servizi` ↔ `/en/services`, `/lavori/[slug]`
↔ `/en/work/[slug]`); `LangSwitch` and the `hreflang` tags in `BaseLayout` link the two.

## Development

```bash
npm install
npm run dev       # local dev server
npm run check     # type-check with astro check
npm test          # unit tests (Vitest) for the pure-logic helpers (src/i18n/ui.ts)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run verifica  # build + scripts/verifica-rotte.mjs: routes, RSS, internal
                   # links, hreflang, and no leftover Italian text on English pages
```

`npm run check`, `npm test` and `npm run verifica` are the project's safety net — run
all three before opening a pull request, and `npm run verifica` again right before
deploying (see *Deployment* below).

## Deployment

The site doesn't have its own domain yet (`astro.config.mjs` points at
`aleflabo.github.io`, and there's no `public/CNAME`). Deployment is triggered
by a push to `main` (`.github/workflows/deploy.yml`): the action builds the
site and publishes `dist/` to GitHub Pages. Run `npm run verifica` before
pushing to `main` — it exits 1 if the built site has a missing route, a
broken internal link, an `hreflang` pointing at a file that doesn't exist, or
leftover Italian text on an English page.
