# Redesign «Laboratorio», tappa 1: base e home — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portare il sistema visivo «Laboratorio» nella base del sito (caratteri, token,
barra, piè di pagina) e rifare la home corta della specifica, spostando nelle pagine giuste
le sezioni che escono.

**Architecture:** Niente framework e niente dipendenze nuove a parte i due caratteri. Gli
effetti sono CSS più piccoli `<script>` di Astro. **Tutto il testo è nel markup costruito**:
gli script animano solo ciò che c'è già (numeri, terminale, parole), così la pagina è
completa senza JavaScript, sotto `prefers-reduced-motion`, e i controlli di
`verifica-rotte.mjs`, che leggono l'HTML, vedono tutto. La geometria della posa e il
contenuto del terminale sono moduli TypeScript puri con i loro test. I componenti nuovi
ricevono i testi come props da un file dati per lingua, come fanno già le sezioni di oggi.

**Tech Stack:** Astro 5, TypeScript, vitest (`src/**/*.test.ts`), CSS scritto a mano,
`@fontsource-variable/geist` e `@fontsource-variable/geist-mono` 5.3.0. Playwright solo
per verificare (`npm i --no-save playwright`), mai come dipendenza.

**Spec:** `docs/superpowers/specs/2026-11-08-redesign-laboratorio-design.md`
**Mockup:** `docs/superpowers/specs/2026-11-08-redesign-laboratorio/mockup-direzioni.html`,
scheda «A · Laboratorio». È la fonte di misure, colori e movimenti. Il file pesa per la foto
in base64: leggilo a pezzi.

## Global Constraints

- **Branch:** questa tappa si fa su `feat/redesign-tappa-1`, che parte da
  `feat/redesign-laboratorio` (il branch d'integrazione, che contiene la spec). La PR va
  **verso `feat/redesign-laboratorio`**, mai verso `main`.
- **Testi:** regola 2 del `CLAUDE.md`. Ogni testo nuovo entra prima in `testi.md` /
  `testi-en.md`, poi nel codice. I testi italiani nuovi approvati sono elencati nella spec,
  § «Testi». Le versioni inglesi le scrive chi implementa e vanno approvate dal committente
  prima del merge della PR (Task 9).
- **Niente React, Tailwind, Magic UI, `motion`.** Niente Google Fonts né altre risorse da
  altri domini.
- **Palette:** carta `#f7f8fa`, inchiostro `#101318`, muto `#5d6470`, filo `#dfe3ea`,
  rilevamento `#ff2d6f` (unico accento), blu `#2b59ff` (solo celle della griglia, opacità
  ≤ 0,09). Testo AA ovunque, misurato sui nodi di testo.
- **Niente occhielli maiuscoli spaziati** sopra i titoli e nessuna classe `.label`
  con `text-transform: uppercase` nella home.
- **44px al tocco** su `pointer: coarse` nei tre punti (`global.css`, `Nav.astro`,
  `Footer.astro`), con `min-height` + `align-content`, mai `padding-block`.
- **Barra finale** su ogni href interno via `localizedPath`.
- **Movimento:** ogni animazione ha uno stato fermo leggibile e si spegne sotto
  `prefers-reduced-motion: reduce`. `main > section` non si anima al caricamento
  (`verifica-rotte.mjs` lo controlla).
- **`/note` conta le righe con `class="riga"`** contro il feed RSS: nessun componente nuovo
  usa la classe `riga`.
- **Prima di ogni commit che chiude un task:** `npm run check` (0 errori), `npm test`
  (verdi), `npm run verifica` (verde).
- Le trappole del `CLAUDE.md` valgono: riavvia `astro dev` dopo un cambio di branch; passa
  sempre `--port` a `preview`; misura prima di fare screenshot di elementi più alti della
  finestra.

## Review Focus

1. **Senza JavaScript o con `prefers-reduced-motion`**: il terminale è già scritto, i numeri
   mostrano 10 · 533 · 1 · 2, la prima parola che ruota è visibile, la posa è disegnata
   ferma (solo con reduced-motion; senza JS resta la foto). Test: Task 5 e 6, passo di
   verifica sull'HTML costruito.
2. **Italiano sulle pagine inglesi** nascosto in testi generati da script, nelle chiavi del
   JSON del terminale o in `aria-label`. Test: `terminale.test.ts` (Task 3) e il controllo
   esistente di `verifica-rotte.mjs`, che vede solo l'HTML. Per questo il testo sta tutto
   nel markup.
3. **Telefoni e tablet** (`hover: none`) da 320 a 1024px: la posa si disegna all'ingresso
   nello schermo, l'anteprima dei lavori non esiste, nessuno scorrimento orizzontale dovuto
   a nome grande, fascia che scorre o anteprima. Test: `verifica-telefono.mjs` su `/` e
   `/en/` (Task 9).
4. **Bersagli nuovi sotto i 44px**: porte, righe dei lavori, card della foto, voci della
   barra, IT/EN. Test: `verifica-telefono.mjs` (Task 9).
5. **Foto e posa che non combaciano** quando la card cambia dimensione (mobile, zoom).
   Test: `posa.test.ts` (Task 2) verifica il quadro 640×800 e il 4:5; il passo di verifica
   del Task 5 fa uno screenshot a 390 e a 1440.

---

### Task 0: Mockup dei pezzi mancanti (barriera di approvazione)

La scheda A non mostra la barra completa (sei voci + IT/EN + menu a tendina sul telefono),
il blocco del modulo e il piè di pagina. Si disegnano prima di scrivere codice.

**Files:**
- Modify: `docs/superpowers/specs/2026-11-08-redesign-laboratorio/mockup-direzioni.html`
  (una quarta scheda «A · pezzi», hash `#pezzi`)

- [ ] **Step 1:** Aggiungi la scheda con tre riquadri nello stile A:
  1. la barra a 1440 con le sei voci di `site.it.menu`, «Parliamone», IT/EN, la voce attiva;
  2. la stessa barra a 390, chiusa e aperta;
  3. il blocco modulo con i campi di `Contatto.astro` (Azienda, Come ti scrivo, Cosa
     vorresti smettere di fare a mano, Quanto è urgente), il pulsante disattivato con
     «Modulo non ancora attivo» e sotto WhatsApp e Mail;
  4. il piè di pagina con le tre colonne di `site.it.piePagina` e la riga finale
     «© 2026 Alessandro Flaborea · Privacy · Cookie».

  Testi solo da `site.ts` / `testi.md`.
- [ ] **Step 2:** Pubblica la versione aggiornata del mockup e chiedi l'approvazione al
  committente. **Non si va al Task 4 né al Task 8 senza.**
- [ ] **Step 3:** Commit: `git commit -m "Il mockup dei pezzi che la home usa e la scheda A non mostrava"`

### Task 1: Caratteri e token

**Files:**
- Modify: `package.json` (via npm), `src/layouts/BaseLayout.astro:1-4`,
  `src/styles/tokens.css`, `src/styles/global.css`

**Interfaces:**
- Produces: variabili CSS `--carta --inchiostro --muto --filo --rilevamento --blu-cella
  --font-testo --font-mono --maxw-lab: 1040px`; classe `.griglia-lab` (sfondo a griglia
  48px sfumata, elemento `aria-hidden`); classe `.mono` (Geist Mono, cifre tabellari).
  I vecchi nomi (`--bg --text --text-muted --border --accent --azione --font-serif
  --font-sans --text-faint`…) **restano come alias** dei nuovi valori fino alla tappa 2,
  così le pagine interne non ancora rifatte restano leggibili.

- [ ] **Step 1:** `npm i @fontsource-variable/geist@5.3.0 @fontsource-variable/geist-mono@5.3.0 && npm rm @fontsource-variable/fraunces @fontsource-variable/inter`
- [ ] **Step 2:** In `BaseLayout.astro` sostituisci i due import dei caratteri con i due nuovi.
- [ ] **Step 3:** Riscrivi `tokens.css` con i token nuovi e gli alias, e in `global.css` porta
  `h1,h2,h3` su `--font-testo` (peso 600, `letter-spacing` negativo, `text-wrap: balance`).
  `.label` perde `text-transform: uppercase` e il colore d'accento: diventa una riga in mono
  grigia. Aggiungi `.griglia-lab` e `.mono`. Lascia intatti il blocco
  `prefers-reduced-motion` e la regola 44px.
- [ ] **Step 4:** Verifica che nessun carattere arrivi da fuori:
  `npm run build && grep -rl "fonts.googleapis\|fonts.gstatic" dist || echo pulito`
  Atteso: `pulito`.
- [ ] **Step 5:** `npm run check && npm test && npm run verifica` (tutto verde).
- [ ] **Step 6:** Commit: `git commit -m "Geist e Geist Mono al posto di Fraunces e Inter, e i token del Laboratorio"`

### Task 2: I dati e la geometria della posa

**Files:**
- Create: `src/data/posa.ts`, `src/lib/posa.ts`, `src/lib/posa.test.ts`

**Interfaces:**
- Produces:
  - `export const posa: Posa` in `src/data/posa.ts`, con
    `interface Posa { quadro: { larghezza: 640; altezza: 800 }; punti: [number, number][]; ossa: [number, number][] }`.
    Valori da `docs/.../2026-11-08-redesign-laboratorio/posa.json`, solo gli 11 punti
    visibili nell'ordine naso, occhio sx, occhio dx, orecchio sx, orecchio dx, spalla sx,
    spalla dx, gomito sx, gomito dx, polso sx, polso dx:
    `[[314,257],[342,221],[280,216],[371,237],[218,235],[465,442],[121,461],[551,670],[137,692],[266,654],[438,652]]`.
    Ossa: `[[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,6],[5,7],[6,8],[7,9],[8,10]]`.
    Commento in testa: modello (`keypointrcnn_resnet50_fpn`, pesi COCO, torchvision), foto
    ridotta a 640×800, data 2026-11-08, «se cambia la foto o il ritaglio, si ricalcola».
  - `export function segmenti(p: Posa): { x1: number; y1: number; x2: number; y2: number }[]`
    in `src/lib/posa.ts`.

- [ ] **Step 1: test rossi** in `src/lib/posa.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { posa } from '../data/posa';
import { segmenti } from './posa';

describe('posa', () => {
  it('ha il quadro 4:5 della foto', () => {
    expect(posa.quadro).toEqual({ larghezza: 640, altezza: 800 });
    expect(posa.quadro.larghezza / posa.quadro.altezza).toBe(0.8);
  });
  it('ha 11 punti, tutti dentro il quadro', () => {
    expect(posa.punti).toHaveLength(11);
    for (const [x, y] of posa.punti) {
      expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(640);
      expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(800);
    }
  });
  it('ogni osso unisce due punti esistenti e diversi', () => {
    for (const [a, b] of posa.ossa) {
      expect(a).not.toBe(b);
      expect(posa.punti[a]).toBeDefined(); expect(posa.punti[b]).toBeDefined();
    }
  });
  it('segmenti traduce le ossa in coordinate, nello stesso ordine', () => {
    const s = segmenti(posa);
    expect(s).toHaveLength(posa.ossa.length);
    expect(s[0]).toEqual({ x1: 314, y1: 257, x2: 342, y2: 221 });
    expect(s.at(-1)).toEqual({ x1: 137, y1: 692, x2: 438, y2: 652 });
  });
});
```

- [ ] **Step 2:** `npx vitest run src/lib/posa.test.ts`. Atteso: FAIL (moduli mancanti).
- [ ] **Step 3:** Scrivi `src/data/posa.ts` e `segmenti()`.
- [ ] **Step 4:** `npx vitest run src/lib/posa.test.ts`. Atteso: PASS.
- [ ] **Step 5:** Commit: `git commit -m "La posa calcolata sulla foto, con i suoi test"`

### Task 3: Il contenuto del terminale

**Files:**
- Create: `src/lib/terminale.ts`, `src/lib/terminale.test.ts`

**Interfaces:**
- Produces:
  `export type Pezzo = { tipo: 'prompt' | 'chiave' | 'stringa' | 'testo'; testo: string }`
  e `export function righeTerminale(lang: Locale): Pezzo[]`. Il componente del Task 5 rende
  i pezzi come `<span>`. Il testo complessivo (concatenazione) è:

  IT:
  ```
  $ cat alessandro.json
  {
    "dottorato": "computer vision, Sapienza – PINlab",
    "pubblicato_a": ["CVPR", "ICCV", "IROS"],
    "cto": "Procedo, 2024–2026",
    "adesso": "lavoro in proprio"
  }
  ```
  EN: stessa forma, con chiavi e valori inglesi scritti da chi implementa e approvati dal
  committente (Task 9). **Proposta da sottoporre:** `"phd"`, `"published_at"`, `"cto"`,
  `"now"`; valori `"computer vision, Sapienza – PINlab"`, `"Procedo, 2024–2026"`,
  `"working on my own"` (quest'ultimo riprende «Now I work on my own» della home inglese).

- [ ] **Step 1: test rossi:**

```ts
import { describe, it, expect } from 'vitest';
import { righeTerminale } from './terminale';
const testo = (l: 'it' | 'en') => righeTerminale(l).map((p) => p.testo).join('');

describe('righeTerminale', () => {
  it('italiano: comando e fatti esatti', () => {
    const t = testo('it');
    expect(t.startsWith('$ cat alessandro.json\n{')).toBe(true);
    expect(t).toContain('"dottorato": "computer vision, Sapienza – PINlab"');
    expect(t).toContain('"pubblicato_a": ["CVPR", "ICCV", "IROS"]');
    expect(t).toContain('"cto": "Procedo, 2024–2026"');
    expect(t.trimEnd().endsWith('}')).toBe(true);
  });
  it('inglese: nessuna chiave o parola italiana', () => {
    const t = testo('en');
    for (const parola of ['dottorato', 'pubblicato', 'adesso', 'lavoro', 'proprio']) {
      expect(t).not.toContain(parola);
    }
    expect(t).toContain('"cto": "Procedo, 2024–2026"');
  });
  it('il prompt è il solo pezzo di tipo prompt', () => {
    expect(righeTerminale('it').filter((p) => p.tipo === 'prompt')).toEqual([{ tipo: 'prompt', testo: '$ ' }]);
  });
});
```

- [ ] **Step 2:** `npx vitest run src/lib/terminale.test.ts`. Atteso: FAIL.
- [ ] **Step 3:** Implementa `righeTerminale`.
- [ ] **Step 4:** Atteso: PASS.
- [ ] **Step 5:** Commit: `git commit -m "Il JSON del terminale, in due lingue e senza italiano nella seconda"`

### Task 4: Barra e piè di pagina

*Dopo l'approvazione del Task 0.*

**Files:**
- Modify: `src/components/Nav.astro`, `src/components/Footer.astro`,
  `src/components/LangSwitch.astro`

**Interfaces:**
- Consumes: token e `.mono` del Task 1. Props invariate (`lang`, `hrefAltro`, `attiva`).

- [ ] **Step 1:** Prima di toccare: estrai il testo visibile di `/`, `/servizi/`, `/en/` da un
  `preview` (`npm run build && npm run preview -- --port 4400`) e salvalo nello scratchpad.
- [ ] **Step 2:** Rifai la barra come nel Task 0: marchio `alessandro.flaborea` in mono (il
  punto in `--rilevamento`), sei voci, «Parliamone», IT/EN, voce attiva. Menu a tendina sotto
  i 720px con lo stesso script di oggi. **Prima di cambiare uno stile, grep di tutte le
  regole che toccano quell'elemento**: oggi `.attiva` è scritta due volte (generica e
  `.inner.it`). Unifica le due varianti per lingua, se il markup lo permette.
- [ ] **Step 3:** Rifai il piè di pagina come nel Task 0, stesse rotte e testi di oggi.
- [ ] **Step 4:** Le regole 44px su `pointer: coarse` restano in `Nav.astro` e
  `Footer.astro`, con `min-height` + `align-content`.
- [ ] **Step 5:** Ripeti l'estrazione dello Step 1 e confronta: il testo della barra e del piè
  di pagina deve essere identico (cambia solo il marchio, «Alessandro Flaborea» →
  «alessandro.flaborea»; l'`aria-label` resta «Alessandro Flaborea — home»).
- [ ] **Step 6:** `INDIRIZZO=http://localhost:4400 node scripts/verifica-telefono.mjs`. Atteso:
  exit 0.
- [ ] **Step 7:** Verifiche globali, poi commit:
  `git commit -m "La barra e il piè di pagina del Laboratorio"`

### Task 5: Testata della home (nome, parole, terminale, pulsanti, informazioni, foto)

**Files:**
- Create: `src/data/homeLab.ts`, `src/components/lab/Testata.astro`,
  `src/components/lab/Terminale.astro`, `src/components/lab/FotoPosa.astro`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro`,
  `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`, `testi-en.md`

**Interfaces:**
- Consumes: `posa`, `segmenti` (Task 2); `righeTerminale` (Task 3).
- Produces: `export const homeLab: Record<Locale, HomeLab>` con almeno
  `{ verbo: string; parole: string[]; luogo: string; info: { chiave: string; valore: string }[];
  ctaPrimaria: string; hrefPrimaria: string; ctaSecondaria: string; hrefSecondaria: string;
  suggerimentoFoto: string; etichettaPosa: string }`. IT: `verbo: 'costruisco'`,
  `parole: ['computer vision', 'LLM applicati', 'agenti AI', 'software su misura']`,
  `luogo: 'Venezia'`, info `[['ex','CTO · Procedo'],['phd','Sapienza – PINlab'],['pub','CVPR · ICCV · IROS']]`,
  `ctaPrimaria: site.it.prenotaMezzora`, `hrefPrimaria: localizedPath('it','/') + '#parliamone'`,
  `ctaSecondaria: 'Guarda cosa ho costruito'`, `hrefSecondaria: localizedPath('it','/lavori')`,
  `suggerimentoFoto: '↑ passaci sopra'`, `etichettaPosa: 'pose · 11 keypoints'`.

- [ ] **Step 1:** Aggiungi a `testi.md` una sezione «/ — home (Laboratorio, 2026-11-08)» con i
  testi italiani nuovi della spec. Aggiungi a `testi-en.md` le proposte inglesi, marcate
  «da approvare».
- [ ] **Step 2:** `Testata.astro`: `<h1>` col nome su due righe e il cursore
  (`aria-hidden`, lampeggio CSS `steps(1)`); riga `> costruisco <parola>`. **Nel markup ci
  sono tutte e quattro le parole**: una visibile, le altre `hidden`, più un testo per i
  lettori di schermo con l'elenco completo. Lo script ruota ogni 2,2 s, non parte sotto
  reduced-motion. Pulsanti, riquadro informazioni (quattro celle; la prima è il luogo più
  `<time>` vuoto che lo script riempie con l'ora di `Europe/Rome`; senza JS si vede solo
  «Venezia»).
- [ ] **Step 3:** `Terminale.astro`: rende `righeTerminale(lang)` come testo completo. Lo
  script, solo se il movimento è permesso, lo svuota e lo riscrive carattere per carattere
  (45 ms sul comando, 14 ms sul resto, come nel mockup).
- [ ] **Step 4:** `FotoPosa.astro`: card 4:5 (`aspect-ratio: 4/5`, raggio 20px, `rotate(-2deg)`),
  `<Image>` di Astro dalla foto con `alt` «Ritratto di Alessandro Flaborea» / «Portrait of
  Alessandro Flaborea». SVG con `viewBox="0 0 640 800"`, `preserveAspectRatio="xMidYMid slice"`,
  `width/height: 100%` espliciti, ossa da `segmenti(posa)` con `pathLength="1"` e `--i`,
  punti con `--i`. Card con `tabindex="0"` e `aria-label`. CSS: posa nascosta, visibile su
  `:hover`, `:focus-visible`, `.posa-accesa`. Script: se `matchMedia('(hover: none)')`,
  IntersectionObserver a soglia 0,6 aggiunge `.posa-accesa` una volta. Sotto reduced-motion
  la posa è visibile subito, senza transizioni. Il suggerimento si nasconde con
  `@media (hover: none)`.
- [ ] **Step 5:** Monta Testata, Terminale e FotoPosa in `index.astro` ed `en/index.astro` al
  posto di `Occhiello`, nella griglia due colonne del mockup (colonna foto 300px; una
  colonna sotto gli 820px), dentro il contenitore a filo da 1040px con `.griglia-lab` dietro.
  Le celle che si accendono: una ventina di quadrati 47px in `--blu-cella`, posizioni
  scelte dallo script sulla griglia 48px, opacità 0 → 0,09 → 0 in 4 s con ritardi casuali;
  niente celle sotto reduced-motion.
- [ ] **Step 6: verifica senza JS.** `npm run build && grep -c "Sapienza – PINlab" dist/index.html && grep -c "LLM applicati" dist/index.html`. Atteso: entrambi ≥ 1.
- [ ] **Step 7: verifica visiva.** `preview` sulla porta 4400. Screenshot della card a 1440
  dopo `hover()` e a 390 con `hasTouch: true` dopo lo scroll (misura prima, screenshot dopo).
  Le ossa devono stare su spalle, gomiti e polsi.
- [ ] **Step 8:** Verifiche globali, poi commit:
  `git commit -m "La testata della home: nome, terminale, foto con la posa"`

### Task 6: Numeri, porte, fascia dello stack

**Files:**
- Create: `src/components/lab/Numeri.astro`, `src/components/lab/Porte.astro`,
  `src/components/lab/Fascia.astro`
- Modify: `src/data/homeLab.ts`, le due home, `testi.md`, `testi-en.md`

**Interfaces:**
- Produces in `HomeLab`: `numeri: { valore: number; etichetta: string }[]`,
  `porte: { titolo: string; testo: string; piede: string; href: string; percorso: string }[]`,
  `stack: string[]`.
  IT numeri: `10 articoli pubblicati · 533 citazioni · 1 Best Paper Award · 2 anni da CTO`.
  Porte IT: «Per le aziende», «Aiuto le aziende a capire dove serve l'intelligenza
  artificiale e poi la costruisco.», piede «diagnosi · audit · software · formazione →»,
  `/servizi`; «Per chi è del mestiere», «Ogni articolo che ho pubblicato esce insieme al
  codice.», piede «paper · codice · note →», `/ricerca`. `percorso` è l'etichetta mono
  (`/servizi`, `/ricerca`). Stack: l'elenco della spec, punto 11.

- [ ] **Step 1:** `Numeri.astro`: i valori finali nel markup. Lo script, solo se il movimento
  è permesso e quando la fascia entra in vista, conta da 0 in 1,4 s (easing cubico).
- [ ] **Step 2:** `Porte.astro`: due link a blocco, il raggio sul bordo in CSS (`@property
  --ang` + `conic-gradient` + maschera, come nel mockup) solo su `:hover` e
  `:focus-visible`. Una colonna sotto gli 820px. Sono bersagli interi: niente link annidati.
- [ ] **Step 3:** `Fascia.astro`: elenco duplicato una volta per lo scorrimento continuo, il
  duplicato `aria-hidden`; `overflow: hidden` sul contenitore; ferma sotto reduced-motion.
- [ ] **Step 4:** Monta i tre componenti nelle due home, nell'ordine della spec.
- [ ] **Step 5:** `npm run build && grep -c ">533<" dist/index.html`. Atteso: ≥ 1.
- [ ] **Step 6:** Verifiche globali, poi commit: `git commit -m "Numeri, porte e la fascia dello stack"`

### Task 7: I lavori a righe

**Files:**
- Create: `src/components/lab/RigheLavori.astro`
- Modify: `src/data/projects.ts` (campo opzionale), le due home

**Interfaces:**
- Consumes: `projects`, `annoIt` / `annoEn`.
- Produces: `Project.anteprima?: ImageMetadata` (assente per tutti oggi) e il componente
  `RigheLavori` con props
  `{ lang: Locale; righe: { anno: string; nome: string; categoria: string; descrizione: string; href: string; anteprima?: ImageMetadata }[]; titolo: string; contatore: string; hrefTutti: string }`.

- [ ] **Step 1:** Righe IT, testi da `testi.md` («Alcune cose che ho costruito», «4 di 12 ·
  /lavori»): Portale ricambi 3D (2026, «Meccanica · commessa reale»), Procedo (2024–26,
  «Industria · in produzione»), Spannum (2026, «Psicometria applicata · online»), Fanta
  Mundial (2026, «Gamification · con utenti veri»). Descrizioni come nel mockup (tagli di
  frasi approvate). EN: Procedo, Spannum, Fanta Mundial, Agentic Workflow Toolkit, testi da
  `testi-en.md` / `projects.ts`. Il contatore si calcola da `projects.length`, non si scrive
  a mano.
- [ ] **Step 2:** Il componente: griglia `84px 1fr auto`, nome che scivola e prende
  l'accento, linea che si disegna sotto. **Classe delle righe: `riga-lavoro`, mai `riga`.**
  Il blocco anteprima (che segue il cursore con interpolazione 0,18) esiste nel markup
  **solo se almeno una riga ha `anteprima`**. Oggi quindi non si rende. Sotto gli 820px o con
  `hover: none` niente anteprima, e la descrizione compare sotto il nome.
- [ ] **Step 3:** Monta al posto di `LeProve` in entrambe le home.
- [ ] **Step 4:** `npm run build && grep -c 'class="riga-lavoro' dist/index.html && ! grep -q 'class="riga"' dist/index.html && echo ok`.
  Atteso: `4` e `ok`.
- [ ] **Step 5:** Verifiche globali, poi commit: `git commit -m "I lavori a righe, con l'anteprima pronta per quando arrivano le immagini"`

### Task 8: Il blocco del modulo

*Dopo l'approvazione del Task 0.* Il modulo resta inerte come oggi: Web3Forms è la tappa 3.

**Files:**
- Modify: `src/components/sezioni/Contatto.astro`

- [ ] **Step 1:** Rifai lo stile come nel Task 0: fondo carta (non più la fascia scura), campi
  con bordo a filo, etichette in mono minuscolo, pillole di urgenza, pulsante disattivato,
  «Modulo non ancora attivo» a contrasto AA (oggi è a 3,83:1). Placeholder a contrasto AA
  (oggi `#999` a 2,85:1). Markup, `id` e testi invariati; resta `id="parliamone"`.
- [ ] **Step 2:** Verifiche globali e `verifica-telefono.mjs` (i canali WhatsApp/Mail restano
  ≥ 44px).
- [ ] **Step 3:** Commit: `git commit -m "Il blocco del modulo nello stile del Laboratorio, ancora spento"`

### Task 9: Spostare le sezioni, pulire, chiudere la tappa

**Files:**
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro`,
  `src/components/pagine/CorpoServizi.astro`, `src/components/pagine/CorpoChiSono.astro`
  (o le pagine che li montano), i file dati collegati, `docs/audit-taste-2026-08-26.md`
- Delete: i componenti di `src/components/sezioni/` che restano senza usi
  (`grep -rn "<Nome" src` per ciascuno prima di cancellarlo)

- [ ] **Step 1:** Prima di spostare: estrai il testo visibile di `/`, `/servizi/`,
  `/chi-sono/`, `/en/`, `/en/services/`, `/en/about/` (preview, porta 4400).
- [ ] **Step 2:** Sposta secondo la tabella della spec: `IlProblema` e `CosaCostruisco` in
  testa a `/servizi` (in inglese solo `IlProblema`: `CosaCostruisco` non ha testo inglese
  approvato); `daDoveViene` e `territorio` in `/chi-sono` e `/en/about`. I dati strutturati
  continuano a leggere `src/data/territorio.ts`. Togli dalle home `FasciaNumeri`,
  `ComeLavoro`, `BloccoFormazione`, `LeProve`, `Occhiello`.
- [ ] **Step 3:** Ripeti l'estrazione e confronta: ogni frase sparita da `/` deve comparire in
  `/servizi/` o `/chi-sono/`, **tranne** le sintesi di «Come si svolge un lavoro» e «Si
  comincia dalle persone», tolte per decisione della spec. Stessa cosa per l'inglese. Allega
  l'elenco nella PR.
- [ ] **Step 4:** Cancella i componenti senza più usi. Aggiungi in testa a
  `docs/audit-taste-2026-08-26.md` un banner: la parte sulla palette e sui caratteri è
  superata dalla spec del 2026-11-08.
- [ ] **Step 5:** **Testi inglesi:** mostra al committente le proposte inglesi marcate «da
  approvare» in `testi-en.md` (porte, parole, info, terminale, suggerimento). Applica le sue
  correzioni, togli la marcatura.
- [ ] **Step 6: verifiche complete.**
  `npm run check && npm test && npm run verifica`, poi
  `npm run preview -- --port 4400` (controlla nel log che la porta sia 4400) e
  `INDIRIZZO=http://localhost:4400 node scripts/verifica-telefono.mjs`. Atteso: tutto verde,
  exit 0.
- [ ] **Step 7: contrasto.** Con Playwright, su `/` e `/en/` a 1440, calcola il rapporto di
  contrasto di ogni nodo di testo (colore calcolato del genitore contro il primo sfondo
  opaco risalendo). Atteso: nessun nodo sotto 4,5:1 (3:1 per testo ≥ 24px o ≥ 18,66px in
  grassetto). Il controllo si lancia a mano, come `verifica-telefono`; il suo esito va nella PR.
- [ ] **Step 8:** Screenshot di `/` e `/en/` a 1440 e 390, da allegare alla PR.
- [ ] **Step 9:** Commit, push di `feat/redesign-tappa-1`, PR verso
  `feat/redesign-laboratorio` con `## Summary` e `## Test plan` (output delle verifiche,
  esito di contrasto e 44px, elenco delle frasi spostate, e cosa non è stato provato con il
  perché: per esempio un telefono vero). Il corpo della PR si modifica con
  `gh api -X PATCH`, perché `gh pr edit` fallisce su questa repo.

---

Fuori da questa tappa: le pagine interne (tappa 2, con il loro mockup), Web3Forms e le
informative (tappa 3), il merge su `main` (tappa 4).
