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
- **Nessun riferimento geografico nel posizionamento** (Veneto orientale, "local").
  In the biography places stay — that is biography, not positioning.
- Address companies with **«voi»**, never «tu».

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
- **`flaborea.com` is not registered yet.** `astro.config.mjs` points at
  `aleflabo.github.io` and there is no `public/CNAME`. Do not reintroduce that domain
  until it is bought: the sitemap would point at a domain that does not resolve.
