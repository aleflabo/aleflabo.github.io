# Alessandro Flaborea's site — how work is done here

<!-- README says how the site is built. This file says how work is done: the rules
     you cannot derive from the code, and the mistakes already made here.
     Copy/tone rules and the Sanity notes live in .claude/rules/ and load only
     when a matching file is opened. Keep this under 200 lines. -->

## Non-negotiable

1. **Never commit directly to `main`.** Every change goes through a branch and a PR,
   a single line included. PRs here target **`main`** — this repo has no `staging`.
2. **Copy is never invented.** Not a conjunction, not to make a structure balance.
   The approved sources are `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`
   (Italian) and `testi-en.md` (English). If the text is not there, **shorten the
   structure, do not lengthen the text**: an empty field skips its section. If a new
   sentence is genuinely needed, ask for it.
   *Why:* six incidents of invented copy in this project, one of them mine.
3. **Never change the product to make a check pass.** If a check fails, either the code
   is wrong or the check is wrong — fix that one, don't widen the mesh.
4. **Never weaken `verifica-rotte.mjs`**, in particular the check that forbids Italian
   text on English pages: it has already found three real defects no review had caught.
   Deliberate Italian on an English page is marked `lang="it"` on the element (the check
   skips those subtrees); marking it on `<html>` is refused on purpose, because that
   would switch the check off while leaving it green.

5. **Never drop the trailing slash from an internal path.** GitHub Pages serves
   `/servizi/` and answers 301 to `/servizi`. `localizedPath` (src/i18n/ui.ts) is the
   one place that adds it, and canonical, hreflang, `og:url` and every menu follow
   from there. Until August 2026 it did not: the site declared three different
   addresses for the same page — the one served, the canonical, and the one in the
   sitemap — and all 712 internal links went through a redirect.
   `verifica-rotte.mjs` now fails on an internal href or a canonical without it.
   Files (`/rss.xml`, `/favicon.svg`) are not routes and must not get one.
6. **The domain is never written by hand.** `astro.config.mjs` holds it,
   `scripts/sito.mjs` reads it from there, and `robots.txt`, `llms.txt`, the sitemap
   and the structured data all build their URLs from `Astro.site`. The one file that
   repeated it — `public/robots.txt` — pointed at the old domain for two weeks after
   the move without anything noticing; it is now a route, `src/pages/robots.txt.ts`.

7. **Statistics are one switch, and the privacy notice follows it.**
   `statistiche` in `src/data/analytics.ts` is `null` today: nothing is loaded from
   any third party, and the four legal sections say so in a form that invites the
   reader to check. Filling that object renders the script *and* adds the section
   that describes it to all four legal pages, from `src/lib/informativa.ts`. It does
   not rewrite the sentences that would become false — `verifica-rotte.mjs` fails on
   those instead, because their wording is a judgement call. Never add a third-party
   script outside this switch. Google Analytics is ruled out on purpose: it writes
   cookies, and `/cookie` tells the reader to open devtools and find none.

## Before opening a PR

```bash
npm run check     # astro check — 0 errors
npm test          # vitest — all green
npm run verifica  # build + routes, feed, internal links, hreflang, Italian-on-English
```

All three. `npm run verifica` rebuilds the site, so it covers `build` too.

**If you touch a shared component** (`BaseLayout`, `Nav`, `Footer`, `TestataPagina`,
anything in `components/`): the Italian site is **in production**. Extract the visible
text of the Italian pages before and after and compare. Do not trust a byte or hash
comparison — in this repo a byte-for-byte comparison declared "identical" a diff that
added 16px of horizontal scroll on `/chi-sono`. Look at the pages.

Chromium for screenshots installs without root: `npx playwright install chromium`.

## Two traps

**`tsconfig.json` excludes `studio/`** — it is a project of its own with its own
dependencies, and including it killed `astro check` with an out-of-memory. If the check
dies with "heap out of memory", the first suspect is something putting that folder back
into the TypeScript program.

**The site is static: publishing a note changes nothing until the site is rebuilt.**
The Sanity webhook does that, calling the `repository_dispatch` of type
`nota-pubblicata` in the deploy workflow. If a published note does not appear, suspect
the webhook before the code.

## Still open

See issue #5. Two things an SEO/GEO audit left open on purpose, both waiting on a
decision rather than on code:

- **The contact form and the newsletter sign-up are inert** and say so in the page
  («Modulo non ancora attivo», «Iscrizione non ancora attiva»). Every visit the site
  earns lands on a button that declares it does not work. WhatsApp and mail below it
  do work.
- **One publication of ten has no arXiv** — «A Self-Supervised Algorithm to Detect
  Signs of Social Isolation in the Elderly», which came out only in *Artificial
  Intelligence in Medicine*. Its title is not a link and its `ScholarlyArticle`
  carries no `sameAs`, and that is the honest state. The other nine are in
  `arxivPerTitolo` (`src/data/pubblicazioni.ts`), each verified by reading
  `citation_title` on its arXiv page — **not deduced from the order**, which is
  exactly how the CV came to attribute `2301.09489` to the wrong paper.

The «placeholder box» that used to be listed here is gone: `/chi-sono` shows the real
portrait, with `alt`, `srcset` and dimensions, and it also feeds `Person.image`.
