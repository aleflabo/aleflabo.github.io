---
paths:
  - "src/pages/**"
  - "src/components/**"
  - "src/layouts/**"
  - "src/i18n/**"
  - "docs/superpowers/specs/**"
---

# Copy and tone

Copy is never invented — see rule 2 in the root `CLAUDE.md`. What follows is the
register, derived from the many times the user corrected the site's text. The rules
are quoted in Italian because they are rules **about Italian copy**.

## Register

- **Niente «non X, ma Y».** Nine of them were counted in a single version.
- **Niente titoli tutti uguali**: comma plus a second clause, or opening with a number.
  There were eleven and eleven.
- **Niente registro difensivo.** The text does not justify itself or prove its worth:
  he is a professional, the worth is in the facts he lists.
- **Niente sospetto verso chi legge.** Requests are phrased positively, not as things
  the client might get wrong.
- **Niente critiche implicite a Procedo**, which on the same page is a credential.
- **The territory is named, and it is Venice.** This rule used to say the opposite —
  no geography in the positioning. It was reversed on 2026-08-27 by the user, after an
  audit found the site named no place at all: no local query could reach it, and an
  assistant asked for «un consulente AI dalle mie parti» had nothing to work out whose
  *parti*. The words live in `src/data/territorio.ts`, which also feeds `areaServed` in
  the structured data, and they say two things together: Veneto and Friuli in person,
  everywhere else remotely. Do not let the second half drop — the door to remote work
  stays open on purpose. In the biography places stay as biography, as before.
- **«Tu» to the person reading, «voi» to the company.** This rule used to say «voi,
  never tu», and a census on 2026-09-07 found fourteen sentences breaking it. They were
  put in front of the user to rewrite, and he kept them: **not one word changed** — the
  rule was wrong, not the copy.

  The two persons are not in competition, they address two different readers, and
  `src/data/servizi.ts` shows the split cleanly across the four engagements:

  | field | who it speaks to | register | example |
  |---|---|---|---|
  | `perChi` | the person deciding | **tu** | «**Hai** un'idea e **vuoi** sapere se regge» |
  | `cosaResta` | the company that receives it | **voi** | «Un documento che **potete** far leggere a chiunque» |

  The clearest case is the one the census had marked as its worst, on `/servizi`:
  «Mi **scrivi** due righe su cosa **vorreste** smettere di fare a mano.» *You* write to
  me; *your company* wants to stop doing it by hand. One sentence, two readers, and it
  is correct.

  Counted on the built Italian pages: 61 «voi» forms and 13 «tu». `/privacy`,
  `/cookie` and `/i-vostri-dati` are «voi» throughout — the last one carries it in its
  own URL — and the legal pages are not a matter of style.

  One observed exception, left alone: «Server compresi, e una persona che risponde
  quando **chiami**» is a `cosaResta` written at «tu».

  **Never convert one into the other mechanically.** A sentence that mixes them is
  probably right; if it looks wrong, ask rather than rewrite. Copy is never invented —
  see rule 2 — and that includes changing the person of an approved sentence.

## Facts not to get wrong

These have been got wrong before. They are verifiable in the CV
(`~/cv/content/it.yaml` and `en.yaml`), which **wins over any other source** for dates
and numbers, decks included. Read it rather than reconstructing from memory.

- **No longer operational at Procedo**: co-founder and CTO from July 2024 to July 2026,
  advisor since. All verbs in the past tense. Not "ten years of research": a three-year
  PhD plus two as CTO, and before that a master's in data science.
- **Ten published papers, 533 citations.**
- **The project is called Grip**, not "Tire Hub" — that was the name it shipped under.
  `/lavori/tire-hub` stays as a permanent redirect.
- **`flaborea.com` is the live domain** since August 2026. `astro.config.mjs` points
  at it, `public/CNAME` says it, and `aleflabo.github.io` 301s there. This bullet used
  to say the opposite and stayed stale for two weeks after the move — a live trap,
  because following it would have reverted the domain. Nothing repeats the domain by
  hand: `scripts/sito.mjs` reads it from `astro.config.mjs`, everything else from there.
