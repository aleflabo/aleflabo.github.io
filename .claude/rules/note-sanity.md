---
paths:
  - "src/lib/note.ts"
  - "src/pages/note/**"
  - "src/pages/en/notes/**"
  - "studio/**"
---

# The notes come from Sanity

**Notes do not live in the repo.** They come from Sanity (project `sn6gk82y`, dataset
`production`), read at build time.

To write or fix a note you use the Studio, not a file. If the user asks to add a note,
the answer is "open it in the Studio" — do not create content files and do not
reintroduce `src/data/note.ts`.

**A note is Italian.** The English fields (`titoloEn`, `sommarioEn`, `corpoEn`) are
optional and only count if **all three** are present: with less than that the note
stays Italian even on `/en/notes`, marked `lang="it"`. Do not loosen this condition —
half a translation produces a page that announces one language and speaks another.

The schema is in `studio/schemaTypes/nota.ts`. Changing it means updating
`src/lib/note.ts` and the pages that read those fields as well: they are two copies of
the same shape, and they diverge silently.

Remember the site is static — publishing a note changes nothing until a rebuild, which
the Sanity webhook triggers via `repository_dispatch` of type `nota-pubblicata`.
