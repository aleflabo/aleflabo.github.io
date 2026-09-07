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

8. **The 44px touch rule lives in three places, and a fourth checks it.**
   `global.css` (links inside `main`), `Nav.astro` (menu voices above 720px, and the
   brand), `Footer.astro`. All three are keyed on `pointer: coarse` — the question is
   whether a finger is touching, never how wide the window is — and all three use
   `min-height` + `align-content`, never `padding-block`, which inflates links that
   were already large enough. `scripts/verifica-telefono.mjs` checks them, and it must
   keep `hasTouch: true`: without it Chromium reports `pointer: fine` and **none of
   the three rules apply**, so the script measures a page no phone ever renders. Its
   one exemption uses the same selector as the CSS, `main p a` (WCAG 2.5.8 exempts
   links inline in prose). If one changes shape, the other has to change with it.

## Before opening a PR

```bash
npm run check     # astro check — 0 errors
npm test          # vitest — all green
npm run verifica  # build + routes, feed, internal links, hreflang, Italian-on-English
```

All three. `npm run verifica` rebuilds the site, so it covers `build` too.

If you touched CSS that decides sizes or hit areas, add the fourth:

```bash
npm run preview -- --port 4400        # explicit port — see the traps
INDIRIZZO=http://localhost:4400 node scripts/verifica-telefono.mjs
```

It exits 0 today. It is not in `npm run verifica` because it needs Playwright, which
is deliberately not a dependency.

**If you touch a shared component** (`BaseLayout`, `Nav`, `Footer`, `TestataPagina`,
anything in `components/`): the Italian site is **in production**. Extract the visible
text of the Italian pages before and after and compare. Do not trust a byte or hash
comparison — in this repo a byte-for-byte comparison declared "identical" a diff that
added 16px of horizontal scroll on `/chi-sono`. Look at the pages.

**Look at the picture to judge, measure the DOM to know.** These are two different
jobs and the picture is bad at the second one. On 2026-09-07 a screenshot was read as
"28px spacing" while `getBoundingClientRect()` said 44, as "the footer didn't change"
while it had grown 199px, and as "dark text on a dark blue button" while the computed
colours were white on navy at 11.65:1 — three wrong readings in one session, all from
eyeballing pixel positions and colours in a scaled image. Ask the page: heights and
gaps from `getBoundingClientRect()`, colours from `getComputedStyle`. Then look at the
picture for the question no number answers — whether it reads right.

Chromium for screenshots installs without root: `npx playwright install chromium`.

## Six traps

**Two of these bite the before/after comparison the gate above demands**, and both
make it report numbers that look plausible and are measured on the wrong thing.

**`npm run preview` falls back to another port without failing.** If anything already
holds 4321 — a stray `astro dev` from hours earlier is the usual culprit — preview
prints "Port 4321 is in use, trying another one..." and exits 0. Point the measuring
script at 4321 and it measures that other server: a dev build, with the Astro toolbar
in the DOM. Pass `--port` explicitly and check the log line, or `ps aux | grep astro`
before trusting a single height.

**A Playwright element screenshot taller than the viewport drops touch emulation.**
`locator.screenshot()` resizes the viewport to capture the whole element and, on
restore, loses `hasTouch`/`isMobile` — so `pointer: coarse` flips to `fine` and every
measurement taken *after* that call describes a page no phone ever renders. It cost an
hour of "the DOM says 44px, the picture says 28px" in September 2026. Measure before
you screenshot, or scroll the element into view and screenshot the viewport instead.
The same reason is why `verifica-telefono.mjs` sets `hasTouch: true`: without it
Chromium is `pointer: fine` and none of the three 44px rules apply at all.

**A visual rule may be written twice, once per header.** `Nav.astro` had two full
`.attiva` rules — a generic one and `.inner.it .links a.attiva`, the second with more
specificity. Fixing only the first left the second standing and the active menu item
showed *both* underlines. Before changing how something looks, grep the component for
every rule that touches that element; this repo duplicates per header and per language
more often than it looks.

**`gh pr edit` fails on this repo** with «Projects (classic) is being deprecated …
(repository.pullRequest.projectCards)», and writes nothing. Edit a PR body with the
REST API instead: `gh api -X PATCH repos/aleflabo/aleflabo.github.io/pulls/N --input
payload.json`, the payload being `{"body": "…"}`.

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

- **Contrast: the site has measured AA failures**, none of them fatal but all real.
  Worst first: the three form placeholders at 2.85:1 and the newsletter one at 2.69:1
  (`#999` on white); the footer meta line and Privacy/Cookie at 3.34:1; the four
  «SCENA» labels on `/lavori` at 3.34:1; three captions of the new home section
  — «Un posto solo dove cercare.», «Cartelle, fogli, …», «ogni giorno, da solo» — at
  3.61-3.83:1; «Iscrizione non ancora attiva.» at 3.83:1; the credibility line under
  the headline at 4.41:1, which misses by a hair. They share one cause: `--text-faint`
  (`rgb(138,129,119)`) and `#999` are tuned for looks on cream, not for the ratio.
  Measured 2026-09-07 across eleven pages, on text nodes rather than elements — an
  element-level scan misses any text sitting next to a `<strong>`.

The «placeholder box» that used to be listed here is gone: `/chi-sono` shows the real
portrait, with `alt`, `srcset` and dimensions, and it also feeds `Person.image`.
