# Redesign «Laboratorio», tappa 3: il modulo Web3Forms, spento — piano

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Costruire il modulo di contatto completo dietro un interruttore che oggi è spento.
Valorizzata la chiave, il modulo si accende **e** l'informativa cambia, dallo stesso punto.

**Architecture:** Stesso schema di `statistiche` in `src/data/analytics.ts` e di
`conStatistiche()` in `src/lib/informativa.ts`. Una costante
`moduloContatto: { accessKey: string } | null` in un file dati nuovo e una funzione pura
`conModulo(pagina, lang, modulo)` che, con l'interruttore acceso, sostituisce nella privacy
il primo paragrafo di «Se mi scrivete» (oggi dice «non è ancora collegato a nessun
servizio»). Il modulo resta un `<form method="post">` senza script: niente cookie e niente
risorse da altri domini durante la lettura della pagina.

**Spec:** `docs/superpowers/specs/2026-11-08-redesign-laboratorio-design.md`, § «Il modulo» e
§ «Le informative».

## Global Constraints

- Branch `feat/redesign-tappa-3` da `feat/redesign-laboratorio`; PR verso quest'ultimo.
- **Interruttore spento** in questa tappa (`moduloContatto = null`): il sito pubblicato si
  comporta come oggi, con pulsante disattivato e «Modulo non ancora attivo.».
- **Web3Forms, verificato l'8 novembre 2026:** `action="https://api.web3forms.com/submit"`,
  `method="POST"`, `access_key` in un campo nascosto. `redirect` va verso una pagina **dello
  stesso dominio** (gratis solo così). Antispam: `<input type="checkbox" name="botcheck">`
  nascosto. **Niente hCaptcha**, perché scrive cookie.
- **Testi nuovi** solo dopo l'approvazione del committente (Task 0).
- Nessuna frase sull'informativa che non sia vera a interruttore spento **e** a interruttore
  acceso.

## Review Focus

1. **Informativa falsa:** a interruttore acceso la frase «non è ancora collegato» deve
   sparire e comparire quella su Web3Forms; a interruttore spento deve valere il contrario.
   Test: `informativa.test.ts` (Task 2) e controllo in `verifica-rotte.mjs` (Task 3).
2. **Modulo acceso senza chiave valida, o spento con l'`action` presente:** chi preme invia
   dati senza che l'informativa lo dica. Test: Task 1 (unit) e Task 3 (costruito).
3. **Pagina di conferma raggiungibile da sola:** non deve finire nei motori né nella sitemap.
   Test: Task 3.

---

### Task 0: Testi da approvare (barriera)

- [ ] Bozze IT ed EN, `[DA APPROVARE]` in `testi.md` / `testi-en.md`: il paragrafo nuovo di
  «Se mi scrivete» a interruttore acceso, la riga accanto al pulsante con il link
  all'informativa, la pagina di conferma (titolo, una frase, link alla home). Approvazione del
  committente, poi `[APPROVATO]`.

### Task 1: Interruttore e modulo

**Files:** Create `src/data/modulo.ts`, `src/lib/modulo.ts`, `src/lib/modulo.test.ts`;
Modify `src/components/sezioni/Contatto.astro`, le due home.

**Interfaces:** `export const moduloContatto: { accessKey: string } | null = null` e
`export function attributiModulo(m: { accessKey: string } | null, lang: Locale): { action?: string; method?: 'post'; nascosti: Record<string, string> }`.
Con `null` restituisce `{ nascosti: {} }`. Con una chiave restituisce
`action: 'https://api.web3forms.com/submit'`, `method: 'post'` e i nascosti `access_key`,
`subject`, `from_name: 'flaborea.com'` e `redirect`
(`https://flaborea.com/grazie/` oppure `/en/thanks/`, dal dominio di `astro.config.mjs`).

- [ ] **Test rosso** (`src/lib/modulo.test.ts`): con `null` niente `action`; con una chiave
  l'action esatta, `redirect` sullo stesso dominio e con la barra finale, `access_key` uguale
  alla chiave.
- [ ] Implementa. `Contatto.astro`: spento = come oggi; acceso = `action`/`method`, campi
  nascosti, `botcheck` nascosto, `required` su «Come ti scrivo» e «Cosa vorresti smettere di
  fare a mano», pulsante attivo, niente «Modulo non ancora attivo.», e la riga con il link a
  `/privacy/#se-mi-scrivete`.
- [ ] Test verde, verifiche globali, commit.

### Task 2: L'informativa segue l'interruttore

**Files:** `src/lib/informativa.ts`, `src/lib/informativa.test.ts`, `src/data/legale.ts`
(e `en/`), le quattro pagine legali.

**Interfaces:** `export function conModulo(pagina: PaginaLegale, lang: Locale, modulo: { accessKey: string } | null): PaginaLegale`.

- [ ] **Test rosso:** a interruttore spento la pagina resta identica; acceso, la sezione «Se
  mi scrivete» / «If you write to me» ha come primo paragrafo il testo approvato su Web3Forms
  e non contiene più «non è ancora collegato» / l'equivalente inglese.
- [ ] Implementa e applica nelle pagine privacy (IT ed EN), insieme a `conStatistiche`.
- [ ] Test verde, commit.

### Task 3: Pagina di conferma e controlli sul costruito

**Files:** Create `src/pages/grazie.astro`, `src/pages/en/thanks.astro`; Modify
`scripts/verifica-rotte.mjs`, `astro.config.mjs` (sitemap: esclusione), `src/data/coppie.mjs`.

- [ ] Pagine di conferma con i testi approvati, `noindex` e fuori dalla sitemap.
- [ ] `verifica-rotte.mjs`, controllo in più: se una pagina costruita ha un `<form>` con
  `action` verso `api.web3forms.com`, allora `dist/privacy/index.html` e
  `dist/en/privacy/index.html` non contengono la frase «non è ancora collegato» né
  l'equivalente inglese, e contengono «Web3Forms». E viceversa: senza `action`, la privacy non
  nomina Web3Forms.
- [ ] Prova a interruttore acceso **solo in locale**, con una chiave finta: costruito,
  controllo verde, informativa cambiata. Poi interruttore di nuovo `null`.
- [ ] Verifiche complete (`check`, `test`, `verifica`, `verifica-telefono`), revisione, PR.
