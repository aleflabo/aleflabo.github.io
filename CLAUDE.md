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

See issue #5. The one visible in production: the photograph on `/chi-sono` is a
placeholder box.
