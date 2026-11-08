# Redesign «Laboratorio», tappa 2: pagine interne e nuova formazione — piano

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portare tutte le pagine interne, italiane e inglesi, nello schema del Laboratorio,
e rifare `/formazione` con la struttura nuova: due famiglie di corsi, livelli, cosa resta,
policy come servizio a parte, FAQ sull'AI Act con fonti.

**Architecture:** Gli schemi sono quelli della scheda «A · Pagine interne» del mockup. Tre
mattoni condivisi: `TestataPagina` riscritta (percorso in mono, niente occhiello maiuscolo e
niente filetto), un contenitore `Foglio` a filo e le classi globali `.celle` e `.dati-mono`.
Le pagine li usano e cambiano solo il proprio corpo. I testi nuovi della formazione passano
prima da `testi.md` / `testi-en.md` e dall'approvazione. Le FAQ sull'AI Act sono dati con una
fonte obbligatoria, controllata da un test. Alla fine si tolgono gli alias dei token della
tappa 1.

**Tech Stack:** Astro 5, TypeScript, vitest, CSS a mano, Playwright solo per verificare.

**Spec:** `docs/superpowers/specs/2026-11-08-redesign-laboratorio-design.md` (§ «Le pagine
interne») e `docs/superpowers/specs/2026-11-08-formazione-design.md`.
**Mockup:** `docs/superpowers/specs/2026-11-08-redesign-laboratorio/mockup-direzioni.html`,
schede «A · Pagine interne» e «A · Barra, modulo, piè».

## Global Constraints

- **Branch:** `feat/redesign-tappa-2`, che parte da `feat/redesign-laboratorio`. PR verso
  `feat/redesign-laboratorio`. Se la PR #37 (correzione dell'articolo 4) è già su `main`,
  prima del Task 4 si fa il merge di `main` dentro `feat/redesign-laboratorio`, così la
  formazione parte dal testo corretto.
- **Testi:** regola 2 del `CLAUDE.md`. Ogni frase nuova entra prima in `testi.md` /
  `testi-en.md`. Le frasi della formazione sono `[DA APPROVARE]` finché il committente non le
  approva (Task 1).
- **Norma:** nessuna frase sull'AI Act senza una fonte elencata nella spec della formazione,
  § «Fonti verificate». Niente allarmismo e niente cifre di sanzioni.
- **Fatti:** 10 articoli, **597 citazioni**, massimo **10 persone** per lezione; Python e
  Claude Code: base **8 ore**, avanzato **12-16 ore**; introduttivo **4 ore**; laboratorio
  **8-12 ore**; corsi **in presenza oppure online**.
- **`/note`:** le righe delle note restano `class="riga"`, perché `verifica-rotte.mjs` le
  conta contro il feed RSS.
- **Niente fasce scure:** formazione e `/i-vostri-dati` chiudono sul fondo carta.
- **44px** su `pointer: coarse`, AA sui nodi di testo, `prefers-reduced-motion`, slash finale:
  come nella tappa 1.
- **Prima di ogni commit che chiude un task:** `npm run check`, `npm test`, `npm run verifica`
  tutti verdi.

## Review Focus

1. **Testo perso** rifacendo i componenti condivisi (`TestataPagina` è in 16 file). Test: il
   Task 2 estrae il testo visibile di tutte le pagine interne prima; il Task 10 lo confronta
   dopo. Una frase sparita è un difetto, salvo quelle che la spec toglie apposta.
2. **Frasi sulla norma senza fonte, o fonti non tra quelle verificate.** Test:
   `formazione.test.ts` (Task 4) fallisce se una FAQ o il riquadro AI Act non ha un link a una
   fonte dell'elenco.
3. **Italiano sulle pagine inglesi** nei testi nuovi della formazione e della policy. Test:
   il controllo esistente di `verifica-rotte.mjs`, più l'estrazione del Task 10 su
   `/en/training/` e `/en/services/`.
4. **Pagine lunghe su telefono** (pubblicazioni, corsi su due livelli, indice delle pagine
   legali) che scorrono di lato. Test: `verifica-telefono.mjs` con le rotte aggiunte nel
   Task 10.
5. **Feed RSS e righe di `/note`** che smettono di coincidere se lo stile cambia la classe.
   Test: `verifica-rotte.mjs`, già in essere, dopo il Task 8.

---

### Task 0: Mockup della nuova formazione (barriera)

**Files:** Modify `docs/superpowers/specs/2026-11-08-redesign-laboratorio/mockup-direzioni.html`
(scheda nuova «A · Formazione», hash `#formazione`).

- [ ] **Step 1:** Disegna `/formazione` per intero con lo schema «servizi»: testata,
  riquadro AI Act, «Per tutta l'azienda» (due righe), «Per i team tecnici» (Python e Claude
  Code, ciascuno in una riga con **base e avanzato affiancati in due colonne**), «Cosa
  resta», «Servizio a parte: la policy», «Chi sostiene il costo», FAQ, «Vengo dall'aula»,
  «Che cosa questo corso non è», chiusura. Su telefono le due colonne vanno una sotto l'altra.
  I testi non ancora scritti stanno in segnaposto `[ … ]` marcati `nuovo`.
- [ ] **Step 2:** Disegna anche il blocco della policy su `/servizi`, dopo i quattro ingaggi.
- [ ] **Step 3:** Pubblica il mockup e chiedi l'approvazione. **Il Task 4 non parte senza.**
- [ ] **Step 4:** Commit `"Il mockup della nuova formazione"`.

### Task 1: I testi nuovi della formazione e della policy (barriera)

**Files:** Modify `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`, `testi-en.md`
(una sezione «/formazione — Laboratorio (2026-11-08)» in ciascuno).

- [ ] **Step 1:** Scrivi in italiano, marcato `[DA APPROVARE]`:
  - **Riquadro AI Act:** riprende la frase già approvata nella PR #37 («prendere misure perché
    il personale sviluppi le competenze per usarli»), che vale anche per chi usa solo ChatGPT,
    e il corso introduttivo con un registro da conservare come prova.
  - **Sei corsi**, per ognuno «a chi serve», 3-5 moduli e «cosa serve da voi»: introduttivo,
    laboratorio, Python base, Python avanzato, Claude Code base, Claude Code avanzato. Per
    Claude Code: portatile e account con un piano attivo.
  - **«Cosa resta»:** attestato di partecipazione, registro presenze con il programma, materiali.
  - **Policy:** il blocco per `/formazione` e quello per `/servizi`, dalla spec § «La policy
    interna», compresa la riga «non sostituisce un parere legale».
  - **Sette FAQ:** dalla tabella della spec, ciascuna con il link alla sua fonte.
  - **«Che cosa questo corso non è»:** senza la frase sulla programmazione.
  - **Dettagli pratici:** in presenza oppure online, massimo 10 persone.
- [ ] **Step 2:** Scrivi la versione inglese degli stessi testi, anch'essa `[DA APPROVARE]`.
- [ ] **Step 3:** Pubblica i testi al committente in una pagina leggibile (artifact, una
  colonna IT e una EN) e applica le sue correzioni. Togli la marcatura, metti `[APPROVATO]`
  con la data. **I Task 3 (blocco policy) e 4 non usano testi non approvati.**
- [ ] **Step 4:** Commit `"I testi della nuova formazione, approvati"`.

### Task 2: I mattoni condivisi

**Files:**
- Modify: `src/components/TestataPagina.astro`, `src/styles/global.css`
- Create: `src/components/Foglio.astro`

**Interfaces:**
- Produces:
  - `TestataPagina` con props `{ percorso: string; titolo: string; introduzione?: string }`.
    Rende `percorso` in mono (`.mono`, grigio), `<h1>` grande (clamp 2.125–4rem, peso 600,
    tracking −0.05em), `introduzione`. Niente `.label` e niente `.divider`. Tutti i 16 file
    che la usano passano il proprio percorso localizzato senza dominio (`/servizi`,
    `/en/services`, `← /lavori`), al posto di `occhiello`.
  - `Foglio.astro`: `<section class="foglio-sez">` con un contenitore interno
    `max-width: var(--maxw-lab)`, `border-inline: 1px solid var(--filo)`, padding 32px 28px
    (16px sotto gli 820px), bordo inferiore a filo. Slot di default; prop facoltativa
    `{ titolo?: string }` che rende un `<h2>`.
  - Classi globali in `global.css`: `.celle` (griglia a 3 colonne con bordi a filo, una
    colonna sotto gli 820px) e `.dati-mono` (`<dl>` con `dt` in mono minuscolo grigio e `dd`
    normale).

- [ ] **Step 1:** Prima di toccare: `npm run build && npm run preview -- --port 4400`, poi
  estrai il testo visibile di `main` di tutte le pagine interne IT ed EN (servizi,
  formazione, lavori, una scheda lavoro, ricerca, note, chi sono, i-vostri-dati, privacy,
  cookie, 404) in file nello scratchpad. È il «prima» del Task 10.
- [ ] **Step 2:** Riscrivi `TestataPagina` e aggiorna i 16 chiamanti. Ogni chiamante perde
  `occhiello` e guadagna `percorso`. Togli dai file dati gli occhielli rimasti senza usi.
- [ ] **Step 3:** Crea `Foglio.astro` e le due classi globali.
- [ ] **Step 4:** Verifiche globali. `npm run verifica` deve restare verde: la riga
  `percorso` contiene solo percorsi, nessuna parola italiana nelle pagine inglesi.
- [ ] **Step 5:** Commit `"La testata delle pagine interne e il foglio a filo"`.

### Task 3: Servizi

**Files:** `src/components/pagine/CorpoServizi.astro`, `src/components/sezioni/{IlProblema,SchedaIngaggio,Faq,CosaCostruisco}.astro`,
`src/data/servizi.ts`, `src/data/en/servizi.ts`.

**Interfaces:** consuma `Foglio`, `.celle`, `.dati-mono` (Task 2) e i testi della policy (Task 1).
Produce `policy: { titolo: string; corpo: string[]; consegna: string[]; durata: string;
avvertenza: string }` in `src/data/servizi.ts` (e `en/`), letto anche dalla formazione nel
Task 4.

- [ ] **Step 1:** «Il problema» in tre `.celle`; le vignette restano, nei colori nuovi.
- [ ] **Step 2:** Ogni ingaggio diventa una riga: verbo in mono rosso (`capire`, `decidere`,
  `costruire`, `mantenere`, dalle `chiave` di oggi), nome, corpo, e «per chi / quanto dura /
  cosa resta» in `.dati-mono`.
- [ ] **Step 3:** FAQ su due colonne (domanda | risposta). «Come si comincia» su fondo carta.
- [ ] **Step 4:** Blocco «Servizio a parte: la policy interna sull'uso dell'AI» dopo i
  quattro ingaggi, con i testi approvati.
- [ ] **Step 5:** Verifiche globali, commit `"Servizi nel Laboratorio, con la policy come servizio a parte"`.

### Task 4: La nuova formazione

*Dopo i Task 0 e 1.*

**Files:**
- Modify: `src/data/formazione.ts`, `src/data/en/formazione.ts`, `src/data/formazionePagina.ts`,
  `src/data/en/formazionePagina.ts`, `src/components/pagine/CorpoFormazione.astro`
- Create: `src/data/fontiAiAct.ts`, `src/lib/formazione.test.ts`

**Interfaces:**
- Produces:
  - `export const fontiAiAct: Record<'commissioneQa' | 'regolamento2026_1744' | 'legge132', { titolo: string; href: string }>`
    con gli URL della spec: `https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers`,
    `https://eur-lex.europa.eu/eli/reg/2026/1744/oj` e il testo in GU della L. 132/2025.
  - In `formazione.ts`:
    `interface Corso { nome: string; famiglia: 'azienda' | 'tecnici'; livelli: { nome?: 'base' | 'avanzato'; durata: string; perChi: string; moduli: string[] }[]; serveDaVoi: string }`,
    `corsi: Corso[]`, `cosaResta: string[]`, `dettagliPratici: string[]`,
    `faqAiAct: (Domanda & { fonte: keyof typeof fontiAiAct })[]`, e `riquadroAiAct` con
    `fonte: keyof typeof fontiAiAct`. `strade` resta. `formati` sparisce, e il «Percorso
    finanziato» confluisce nella strada «Con i fondi interprofessionali».

- [ ] **Step 1: test rossi** in `src/lib/formazione.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { corsi, faqAiAct, riquadroAiAct, dettagliPratici } from '../data/formazione';
import * as en from '../data/en/formazione';
import { fontiAiAct } from '../data/fontiAiAct';

const durata = (nome: string, livello?: string) =>
  corsi.find((c) => c.nome === nome)!.livelli.find((l) => l.nome === livello)!.durata;

describe('formazione', () => {
  it('le durate sono quelle della spec', () => {
    expect(durata('Corso introduttivo')).toBe('4 ore');
    expect(durata('Laboratorio per funzione')).toBe('8-12 ore');
    for (const c of ['Python', 'Claude Code']) {
      expect(durata(c, 'base')).toBe('8 ore');
      expect(durata(c, 'avanzato')).toBe('12-16 ore');
    }
  });
  it('due famiglie, due corsi ciascuna, niente «Percorso finanziato»', () => {
    expect(corsi.filter((c) => c.famiglia === 'azienda')).toHaveLength(2);
    expect(corsi.filter((c) => c.famiglia === 'tecnici')).toHaveLength(2);
    expect(corsi.some((c) => c.nome === 'Percorso finanziato')).toBe(false);
  });
  it('ogni frase sulla norma ha una fonte verificata, in tutte e due le lingue', () => {
    for (const lista of [faqAiAct, en.faqAiAct]) {
      expect(lista.length).toBe(7);
      for (const d of lista) expect(fontiAiAct[d.fonte]?.href).toMatch(/^https:\/\//);
    }
    expect(fontiAiAct[riquadroAiAct.fonte]).toBeDefined();
  });
  it('dichiara il massimo di 10 persone', () => {
    expect(dettagliPratici.join(' ')).toMatch(/10 persone/);
  });
});
```

- [ ] **Step 2:** `npx vitest run src/lib/formazione.test.ts`. Atteso: FAIL.
- [ ] **Step 3:** Riscrivi i dati con i testi approvati del Task 1 e `fontiAiAct.ts`.
- [ ] **Step 4:** Atteso: PASS.
- [ ] **Step 5:** Riscrivi `CorpoFormazione` sul mockup del Task 0. Ogni FAQ e il riquadro
  linkano la loro fonte (link esterni con ↗). Il blocco policy legge `policy` dal Task 3.
- [ ] **Step 6:** Verifiche globali, commit `"La nuova formazione: corsi per l'azienda e per i team tecnici, FAQ sull'AI Act con fonti"`.

### Task 5: Lavori, elenco e scheda

**Files:** `src/components/sezioni/RigaLavoro.astro`, `src/pages/lavori/index.astro`,
`src/pages/lavori/[slug].astro`, `src/pages/en/work/index.astro`, `src/pages/en/work/[slug].astro`.

- [ ] **Step 1:** `RigaLavoro`: anno in mono, nome grande, corpo, etichette in mono;
  l'«area · stato» passa a destra in mono, **non sopra il titolo**. L'etichetta di stato
  («In costruzione», «In produzione», «Online e pubblico») ha il bordo verde. La riga
  conserva la classe `riga` (il contatore della home la conta).
- [ ] **Step 2:** Titoli dei gruppi in mono minuscolo con il conteggio (`software per le
  aziende · 4`): il numero si calcola.
- [ ] **Step 3:** Scheda: testata con `← /lavori`, griglia di metadati in `.dati-mono` (area,
  ruolo, anni, stato), problema / approccio / risultato in tre `.celle`.
- [ ] **Step 4:** Verifiche globali, compreso il controllo del contatore «4 di 12»; commit
  `"Lavori nel Laboratorio"`.

### Task 6: Ricerca

**Files:** `src/components/pagine/CorpoRicerca.astro` (e dati se servono).

- [ ] **Step 1:** La fascia dei numeri riusa `src/components/lab/Numeri.astro` (10 · 597 ·
  3 · 1, con le etichette di `pubblicazioni.numeriFascia`).
- [ ] **Step 2:** Pubblicazioni a righe: anno in mono | titolo con link arXiv ↗ e frase |
  sede in mono più citazioni e stelle a destra. Una colonna sotto gli 820px.
- [ ] **Step 3:** Verifiche globali, commit `"Ricerca nel Laboratorio"`.

### Task 7: Chi sono

**Files:** `src/components/pagine/CorpoChiSono.astro`, `src/components/sezioni/{DaDoveViene,Territorio}.astro`.

- [ ] **Step 1:** La foto usa `src/components/lab/FotoPosa.astro` (stessa foto, quindi la
  posa resta valida). «In breve» in mono sotto la card. Biografia a destra, pulsanti
  invariati.
- [ ] **Step 2:** «Abitudini che vale la pena sapere prima» in tre `.celle`.
  «Dalla ricerca alla produzione» e «Venezia è la mia base» dentro `Foglio`.
- [ ] **Step 3:** Verifiche globali, commit `"Chi sono nel Laboratorio, con la foto della home"`.

### Task 8: Note

**Files:** `src/pages/note/index.astro`, `src/pages/note/[slug].astro`, `src/pages/en/notes/*`,
`src/components/CorpoNota.astro`.

- [ ] **Step 1:** Elenco: data in mono | titolo | durata in mono. **Classe `riga` invariata.**
- [ ] **Step 2:** Newsletter spenta nello stile del blocco modulo («Iscrizione non ancora
  attiva.», placeholder AA). Il link RSS resta.
- [ ] **Step 3:** Nota singola: `TestataPagina` con `← /note`, corpo a 65 caratteri.
- [ ] **Step 4:** Verifiche globali (il controllo RSS ↔ righe deve passare), commit `"Note nel Laboratorio"`.

### Task 9: Pagine legali e 404

**Files:** `src/components/TestoLegale.astro`, `src/components/pagine/CorpoDati.astro`,
`src/pages/{privacy,cookie,i-vostri-dati,404}.astro` e gemelle inglesi,
`docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`.

- [ ] **Step 1:** `TestoLegale`: indice a sinistra con ancore alle sezioni (sticky su
  desktop, in testa su telefono), testo a destra, «In breve» in un riquadro con il bordo
  sinistro rosso.
- [ ] **Step 2:** `/i-vostri-dati`: le «situazioni» come righe numerate (sono una sequenza
  vera); «Fatemi la domanda che qui non trova risposta» sul fondo carta.
- [ ] **Step 3:** 404: «404» in mono grande con il riquadro di detection e l'etichetta
  «not_found · 1.00» (approvata col mockup l'8 novembre: aggiungila a `testi.md` e
  `testi-en.md`), il testo e i link di oggi.
- [ ] **Step 4:** Verifiche globali, commit `"Pagine legali e 404 nel Laboratorio"`.

### Task 10: Pulizia e chiusura

**Files:** `src/styles/tokens.css`, `src/styles/global.css`, `scripts/verifica-telefono.mjs`.

- [ ] **Step 1:** Togli gli alias dei token della tappa 1. Prima di cancellarne uno:
  `grep -rn "var(--NOME)" src` deve dare zero. Togli anche le classi globali rimaste senza
  usi (`.divider`, `.marker`, `.w`, `.alone`, `.scheda`, `.riga` di global.css se non usata):
  per ognuna, grep prima.
- [ ] **Step 2:** In `verifica-telefono.mjs` aggiungi `/formazione/`, `/lavori/`,
  `/ricerca/` e `/privacy/` a `ROTTE`. È un controllo in più, non un indebolimento.
- [ ] **Step 3:** Riestrai il testo di tutte le pagine del Task 2 e confronta. Ogni frase
  sparita deve essere tra quelle tolte apposta (formazione: «Percorso finanziato» come
  formato, la frase sulla programmazione) o sostituita da un testo approvato. L'elenco va
  nella PR.
- [ ] **Step 4:** Verifiche complete: `check`, `test`, `verifica`, `verifica-telefono`
  (exit 0) e contrasto AA su tutte le pagine interne IT ed EN.
- [ ] **Step 5:** Revisione indipendente dell'intero branch, correzioni con test rosso →
  verde, push e PR verso `feat/redesign-laboratorio` con `## Summary` e `## Test plan`
  (compreso cosa non è stato provato e perché).
