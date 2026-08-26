# aleflabo.github.io

Personal portfolio site for Alessandro Flaborea — built with [Astro](https://astro.build), bilingual (Italian / English), deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) 5 (static output)
- Plain CSS (design tokens in `src/styles/tokens.css`, shared rules in `src/styles/global.css`)
- Bilingual routing: Italian at `/` (default locale, no prefix), English mirrored under `/en/` (see `src/i18n/ui.ts`)
- [Sanity](https://www.sanity.io) for the notes (project `sn6gk82y`, dataset `production`), read at build time — see *Notes* below

## Project structure

```
src/
  components/   # Nav, Footer, LangSwitch, StackChip, TestataPagina
  components/sezioni/  # page sections: Occhiello, IlProblema, ComeLavoro, LeProve,
                        # DaDoveViene, FasciaNumeri, SchedaIngaggio, BloccoFormazione,
                        # RigaLavoro, Contatto, Faq
  data/         # site copy (site.ts) and per-page content (servizi.ts, formazione.ts,
                # dati.ts, pubblicazioni.ts, chiSono.ts, projects.ts), Italian
                # by default with an `en/` mirror for the English copy
  i18n/         # locale list + path helpers (src/i18n/ui.ts)
  layouts/      # BaseLayout (head, meta, hreflang, Nav/Footer wrapper)
  lib/          # pure logic shared across pages (anno.ts, dataNota.ts) and the
                # Sanity client + note queries (sanity.ts, note.ts, immagine.ts)
  pages/        # Italian pages at the root (index.astro, servizi.astro, lavori/[slug].astro, …)
                # and their English mirror under pages/en/ (index.astro, services.astro,
                # work/[slug].astro, …)
scripts/        # verifica-rotte.mjs, verifica-hreflang.mjs — the build's own safety net
public/         # static assets served as-is (favicon, robots.txt, og image)
studio/         # Sanity Studio — its own package.json, not installed by the site build
```

Each Italian page has an English twin (e.g. `/servizi` ↔ `/en/services`, `/lavori/[slug]`
↔ `/en/work/[slug]`); `LangSwitch` and the `hreflang` tags in `BaseLayout` link the two.

## Development

```bash
npm install
npm run dev       # local dev server
npm run check     # type-check with astro check
npm test          # unit tests (Vitest) for the pure-logic helpers (src/i18n/ui.ts,
                  # src/lib/dataNota.ts)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run verifica  # build + scripts/verifica-rotte.mjs: routes, RSS, internal
                   # links, hreflang, and no leftover Italian text on English pages
```

`npm run check`, `npm test` and `npm run verifica` are the project's safety net — run
all three before opening a pull request, and `npm run verifica` again right before
deploying (see *Deployment* below).

## Notes

The notes come from Sanity, queried at build time — nothing is fetched in the
reader's browser and no API key is needed, because the `production` dataset is
public for reads. A note is Italian; the English fields are optional and only
count when all three are present (title, summary and body). Untranslated notes
still appear on `/en/notes`, in Italian, marked `lang="it"` and linking to the
Italian page — `verifica-rotte.mjs` skips subtrees marked that way, but rejects
the marking on `<html>`, which would silence the check while staying green.

To edit the schema:

```bash
cd studio
npm install
npx sanity dev      # Studio on localhost:3333
npx sanity deploy   # publish the hosted Studio
```

Because the site is static, publishing a note doesn't change anything until the
site is rebuilt. A Sanity webhook POSTs to
`https://api.github.com/repos/aleflabo/aleflabo.github.io/dispatches` with
`{"event_type": "nota-pubblicata"}`, which the deploy workflow listens for. The
webhook's filter must exclude drafts — otherwise every keystroke saved in the
Studio triggers a deploy.

## How work is done here

Branch → PR → merge into **`main`**; this repo has no `staging`, and nothing is
committed to `main` directly, a one-line change included. Run `npm run check`,
`npm test` and `npm run verifica` before opening the PR and put their output in the
PR body under `## Test plan`.

The rules that don't follow from reading the code — and the mistakes already made
here — are in [`CLAUDE.md`](./CLAUDE.md). Copy and tone rules are in
`.claude/rules/copy-e-tono.md`, the Sanity notes in `.claude/rules/note-sanity.md`;
both load only when a matching file is opened.

## Deployment

The site doesn't have its own domain yet (`astro.config.mjs` points at
`aleflabo.github.io`, and there's no `public/CNAME`). Deployment runs on every merge
into `main`, and on the Sanity webhook described above
(`.github/workflows/deploy.yml`): the action builds the site and publishes `dist/` to
GitHub Pages. Because merging publishes, `npm run verifica` has to be green on the PR
first — it exits 1 if the built site has a missing route, a broken internal link, an
`hreflang` pointing at a file that doesn't exist, or leftover Italian text on an
English page.
