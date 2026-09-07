# La home visuale — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portare la home da nove sezioni a otto, introdurre la sezione «Cosa
costruisco» con il suo diagramma animato, e accorciare la pagina dell'11% su
desktop e dell'8% su telefono, senza aggiungere una dipendenza né una parola.

**Architecture:** Nessun framework e nessun pacchetto nuovo: i diagrammi sono
SVG più CSS, con la geometria calcolata da un modulo TypeScript puro
(`src/lib/diagramma.ts`) così che le due disposizioni — orizzontale a 1440,
verticale a 390 — condividano i numeri invece di ripeterli. Le animazioni
partono da un `IntersectionObserver` in `BaseLayout`, una volta sola e solo
quando la sezione entra in vista, e sotto `prefers-reduced-motion` non partono
affatto. I componenti continuano a ricevere i testi come props: la home inglese
li alimenta da `src/data/en/home.ts` e salta le sezioni per cui non ha testo.

**Tech Stack:** Astro 5, TypeScript, vitest (node, `src/**/*.test.ts`), CSS e
SVG scritti a mano. Playwright solo come strumento di verifica invocato con
`npx`, mai come dipendenza del progetto.

**Spec:** `docs/superpowers/specs/2026-09-03-home-visuale-design.md`
**Tavole:** `docs/superpowers/specs/2026-09-03-home-visuale/tavole/*.dc.html`
— sono la fonte del markup esatto. Le anteprime che si aprono da sole stanno in
`anteprima/`, le immagini in `immagini/`.

## Global Constraints

Valgono per ogni task. Sono copiate dal `CLAUDE.md` del repo e dalla spec.

- **Mai un commit diretto su `main`.** Tutto passa da un ramo e da una PR verso
  `main` (questo repo non ha `staging`). Il ramo di questo lavoro è
  `feat/home-visuale`.
- **La copy non si inventa mai**, nemmeno una congiunzione. Le fonti approvate
  sono `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md` (italiano),
  `testi-en.md` (inglese), `src/pages/index.astro`, `src/data/projects.ts`,
  `src/data/servizi.ts`, `src/data/territorio.ts`. Se una frase non c'è,
  **si accorcia la struttura, non si allunga il testo**: un campo vuoto salta la
  sua sezione.
- **Mai cambiare il prodotto per far passare un controllo.** Se un controllo
  fallisce, o è sbagliato il codice o è sbagliato il controllo: si corregge
  quello, non si allarga la maglia.
- **Mai indebolire `scripts/verifica-rotte.mjs`.** Questo piano lo estende in
  tre punti e non ne toglie nessuno.
- **Mai togliere la barra finale da un percorso interno.** `localizedPath`
  (`src/i18n/ui.ts`) è l'unico posto che la aggiunge. I file (`/rss.xml`,
  `/favicon.svg`) non sono rotte e non la prendono.
- **Il dominio non si scrive a mano.** Sta in `astro.config.mjs`.
- **L'interruttore delle statistiche non si tocca** (`src/data/analytics.ts`).
  Nessuno script di terze parti fuori da lì.
- **Patto di non concorrenza con Procedo, scritto e in vigore.** Procedo si
  nomina come credenziale al passato — riga di credibilità in testata, scheda
  fra «Le prove». Il sito **non può presentare come propria offerta** quello che
  Procedo vende: video girati in reparto trasformati in procedure passo-passo,
  un assistente che lavora su quelle procedure. Le fonti sicure per le capacità
  sono **Vault**, **Tracking costi**, **Agentic Workflow Toolkit**.
- **Zero dipendenze nuove** in `package.json`, e zero JavaScript spedito al
  browser oltre a quello che c'è già più l'osservatore del task 2.
- **`prefers-reduced-motion: reduce` ferma tutto.** Il disegno resta leggibile
  fermo: nessuna informazione vive solo nel movimento.
- **Nessuno scorrimento orizzontale** a 320, 360, 390 e 414px. In questo repo
  una versione ne ha già aggiunti 16 su `/chi-sono` e un confronto byte a byte
  l'aveva dichiarata identica.
- **Ogni cosa che si preme è alta almeno 44px**, link di sezione compresi.
- **I componenti non importano da `src/data/`**: ricevono i testi come props.
- **Nessuno dei componenti toccati ha consumatori fuori dalle due home.**
  Verificato con `grep -rl "import <Nome> from"`: `Occhiello`, `FasciaNumeri`,
  `IlProblema`, `ComeLavoro`, `LeProve`, `BloccoFormazione`, `Contatto` sono
  importati solo da `src/pages/index.astro` e `src/pages/en/index.astro`.
  Le props restano comunque **facoltative** dove il piano lo dice, perché è la
  forma giusta — un campo vuoto salta la sua sezione, ed è la regola 2 del
  `CLAUDE.md` — non perché qualcun altro le ometta.
- **Prima di ogni PR:** `npm run check` (0 errori), `npm test` (tutti verdi),
  `npm run verifica` (che ricostruisce e quindi copre anche `build`).

---

## Struttura dei file

**Creati**

| File | Responsabilità |
|---|---|
| `src/lib/diagramma.ts` | La geometria dei diagrammi: dove stanno i frammenti, che forma hanno i fasci. Puro, deterministico, senza DOM. |
| `src/lib/diagramma.test.ts` | I test del sopra. |
| `src/components/sezioni/CosaCostruisco.astro` | La sezione nuova: tesi, diagramma, e basta. |
| `scripts/verifica-telefono.mjs` | Scorrimento orizzontale e bersagli del tocco, con Playwright via `npx`. Fuori da `npm run verifica`. |
| `.claude/rules/procedo.md` | Il perimetro del patto, con `paths:` su `src/data/**`. |

**Modificati**

| File | Cosa gli succede |
|---|---|
| `src/styles/tokens.css` | Sei token nuovi. |
| `src/styles/global.css` | `.base`, `.fascio`, `.interrotto`, `@keyframes fascio`; `sali` passa all'innesco per visibilità; blocco `prefers-reduced-motion`. |
| `src/layouts/BaseLayout.astro` | L'`IntersectionObserver`. |
| `src/components/sezioni/FasciaNumeri.astro` | Assorbe `DaDoveViene`. |
| `src/components/sezioni/DaDoveViene.astro` | Cancellato. |
| `src/components/sezioni/Territorio.astro` | Cancellato come sezione. |
| `src/components/sezioni/Contatto.astro` | Prop `territorio?` opzionale. |
| `src/components/sezioni/IlProblema.astro` | Vignette. |
| `src/components/sezioni/LeProve.astro` | Miniature e tag in evidenza. |
| `src/components/sezioni/BloccoFormazione.astro` | Diventa striscia. |
| `src/components/sezioni/ComeLavoro.astro` | Corpo opzionale. |
| `src/pages/index.astro` | Il montaggio nuovo, e il commento sui quattro passi riscritto. |
| `src/pages/en/index.astro` | Lo stesso, senza `CosaCostruisco`. |
| `scripts/verifica-rotte.mjs` | Tre controlli nuovi. |

---

## Task 1: Il guardiano dei testi non approvati

Va per primo: da qui in poi nessun task può pubblicare per sbaglio una delle
otto stringhe che il committente non ha ancora approvato.

**Files:**
- Modify: `scripts/verifica-rotte.mjs` (dopo il blocco dei segnaposto, riga ~52)

**Interfaces:**
- Consumes: niente.
- Produces: un controllo che i task 3 e 11 devono superare. Nessuna funzione
  esportata: lo script è uno script.

- [ ] **Step 1: Scrivere il controllo che fallisce**

In coda al blocco dei segnaposto esistente (subito dopo la chiusura del `for`
che cerca `[EMAIL]`, `[DA INSERIRE]`, `[TODO]`), aggiungere:

```js
// Le frasi che il committente non ha ancora approvato non devono uscire.
// Questa lista è il ponte fra la spec e la pagina: finché una di queste frasi
// non compare in testi.md — la fonte approvata — non può comparire nemmeno in
// dist. È il seguito del blocco qui sopra: là i segnaposto evidenti, qui le
// frasi che sembrano finite e non lo sono.
const DA_APPROVARE = [
  "Cosa costruisco",
  "Quello che avete già, in una forma che si può interrogare",
  "Legge e collega",
  "ogni giorno, da solo",
  "da dove viene",
  "Da venti posti a uno solo",
  "Si aggiorna senza che nessuno lo tocchi",
  "Collegato a quello che usate già",
];
// Solo la fonte italiana. Guardare anche testi-en.md sembrava piu' sicuro ed
// era il contrario: la legenda di una sua tabella contiene «da dove viene», e
// bastava a rendere il controllo cieco su quella frase per sempre. Le stringhe
// inglesi avranno la loro lista quando la copy inglese arrivera'.
const FONTI_APPROVATE = readFileSync(
  "docs/superpowers/specs/2026-08-25-sito-italiano/testi.md",
  "utf8",
);

for (const f of trovaHtml("dist")) {
  const html = readFileSync(f, "utf8");
  for (const frase of DA_APPROVARE) {
    if (html.includes(frase) && !FONTI_APPROVATE.includes(frase)) {
      dice(`${f} pubblica «${frase}», che non sta in testi.md`);
    }
  }
}
```

- [ ] **Step 2: Farlo fallire davvero**

Prova che il controllo morde, invece di fidarsi che sia scritto giusto:

```bash
npm run build
printf '\n<p>Legge e collega</p>\n' >> dist/index.html
node scripts/verifica-rotte.mjs
```

Atteso: `✗ dist/index.html pubblica «Legge e collega», che non sta in testi.md`
e uscita diversa da zero.

- [ ] **Step 3: Rimettere le cose a posto e verificare che passi**

```bash
npm run build && node scripts/verifica-rotte.mjs
```

Atteso: `✓ tutte le rotte a posto`.

- [ ] **Step 4: Commit**

```bash
git add scripts/verifica-rotte.mjs
git commit -m "Le otto frasi non approvate non possono uscire in pagina"
```

---

## Task 2: I token, il movimento e il suo innesco

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css:100-141` (il blocco `--- movimento ---`)
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `scripts/verifica-rotte.mjs`

**Interfaces:**
- Produces: le classi `.base`, `.fascio`, `.interrotto`, il token
  `--tratto-inerte` e compagni, e la classe `.in-vista` che `BaseLayout`
  aggiunge a ogni `[data-anima]`. I task 4, 8, 9 li usano.

- [ ] **Step 1: I sei token**

In `src/styles/tokens.css`, dopo `--text-faint`:

```css
  /* Colori nati con i diagrammi e con le fasce scure che crescono. Erano sei
     valori ripetuti a mano nelle tavole: senza un nome sarebbero finiti
     ricopiati in ogni componente. */
  --tratto-inerte: #c2b6a2;
  --tratto-tenue: #e0b98f;
  --evidenziatore-tenue: #fdf3e9;
  --su-accent: #a8c0d6;
  --su-accent-forte: #c7d8e6;
  --su-accent-debole: #7f9ab3;
```

- [ ] **Step 2: Il fascio, e l'innesco per visibilità**

In `src/styles/global.css`, sostituire il blocco che va da
`main > section { animation: sali ... }` fino a `main > section:nth-of-type(n + 5)`
con:

```css
/* L'animazione non parte più al caricamento. Prima `main > section` partiva
   tutta insieme con ritardi progressivi: le sezioni in fondo avevano già
   finito prima che qualcuno le vedesse, e con una pagina più lunga il difetto
   peggiora. Adesso parte quando la sezione entra in vista, una volta sola, ed
   è BaseLayout ad aggiungere `.in-vista`. Senza JavaScript non succede niente:
   per questo lo stato di partenza è quello finito, non quello nascosto. */
[data-anima].in-vista { animation: sali .7s cubic-bezier(.22, .8, .3, 1) both; }

/* Il fascio che percorre un collegamento. `pathLength="100"` su ogni <path>
   normalizza la geometria: un solo dasharray vale per curve di lunghezza
   diversa, e i ritardi restano leggibili. */
@keyframes fascio { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -100; } }

.base { stroke: var(--border); stroke-width: 1.5; fill: none; }
.interrotto { stroke: var(--tratto-inerte); stroke-width: 1.5; fill: none; stroke-dasharray: 4 5; }
.fascio {
  stroke: var(--azione);
  stroke-width: 2.5;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 11 89;
  filter: drop-shadow(0 0 4px rgb(168 83 29 / 55%));
  animation: fascio 3.4s linear infinite;
}

/* Chi ha chiesto meno movimento non ne riceve nessuno. Il disegno resta
   leggibile fermo: nessuna informazione vive solo nell'animazione. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: L'osservatore**

In `src/layouts/BaseLayout.astro`, in fondo, accanto agli altri
`<script is:inline>`:

```astro
<script is:inline>
  /* Fa partire l'animazione quando la sezione entra in vista, una volta sola.
     Senza JavaScript le sezioni restano visibili e ferme: `.in-vista` aggiunge
     il movimento, non il contenuto. */
  (function () {
    var pezzi = document.querySelectorAll('[data-anima]');
    if (!pezzi.length) return;
    if (!('IntersectionObserver' in window)) {
      pezzi.forEach(function (p) { p.classList.add('in-vista'); });
      return;
    }
    var osservatore = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('in-vista');
        osservatore.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    pezzi.forEach(function (p) { osservatore.observe(p); });
  })();
</script>
```

- [ ] **Step 4: Il controllo che l'innesco non torni indietro**

In `scripts/verifica-rotte.mjs`, dopo il controllo del task 1:

```js
// Il movimento deve restare condizionato: alla visibilità e alla preferenza di
// chi legge. Due regressioni possibili, tutte e due silenziose in pagina.
{
  const css = trovaHtml("dist")
    .map((f) => readFileSync(f, "utf8"))
    .concat(
      readdirSync("dist/_astro", { withFileTypes: true })
        .filter((v) => v.isFile() && v.name.endsWith(".css"))
        .map((v) => readFileSync(join("dist/_astro", v.name), "utf8")),
    )
    .join("\n");
  if (!css.includes("prefers-reduced-motion")) {
    dice("il sito costruito non dichiara nessun blocco prefers-reduced-motion");
  }
  if (/main\s*>\s*section\s*\{[^}]*animation/.test(css)) {
    dice("main > section si anima ancora al caricamento invece che entrando in vista");
  }
}
```

- [ ] **Step 5: Verificare**

```bash
npm run check && npm run verifica
```

Atteso: 0 errori da `astro check`, `✓ tutte le rotte a posto`.

- [ ] **Step 6: Commit**

```bash
git add src/styles/tokens.css src/styles/global.css src/layouts/BaseLayout.astro scripts/verifica-rotte.mjs
git commit -m "Il fascio, i sei token che gli servono, e l'animazione che parte entrando in vista"
```

---

## Task 3: La geometria dei diagrammi

**Files:**
- Create: `src/lib/diagramma.ts`
- Test: `src/lib/diagramma.test.ts`

**Interfaces:**
- Produces:
  - `interface Frammento { x: number; y: number; w: number; h: number; rot: number; righe: number; tratteggio: boolean }`
  - `interface Riquadro { larghezza: number; altezza: number }`
  - `frammenti(quanti: number, dentro: Riquadro): Frammento[]`
  - `ingombro(f: Frammento): { x: number; y: number; w: number; h: number }`
  - `fascio(da: [number, number], a: [number, number], verso: "orizzontale" | "verticale"): string`
  Li usa il task 4.

- [ ] **Step 1: Scrivere i test che falliscono**

Creare `src/lib/diagramma.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { fascio, frammenti, ingombro } from "./diagramma";

const ORIZZONTALE = { larghezza: 312, altezza: 370 };
const VERTICALE = { larghezza: 350, altezza: 200 };

describe("frammenti", () => {
  it("ne restituisce esattamente quanti gliene chiedi", () => {
    expect(frammenti(11, ORIZZONTALE)).toHaveLength(11);
    expect(frammenti(8, VERTICALE)).toHaveLength(8);
  });

  // Un frammento che esce dal riquadro viene tagliato dall'SVG senza che
  // niente lo segnali: è il modo in cui un diagramma si rompe in silenzio.
  it("li tiene tutti dentro il riquadro, rotazione compresa", () => {
    for (const dentro of [ORIZZONTALE, VERTICALE]) {
      for (const f of frammenti(11, dentro)) {
        const i = ingombro(f);
        expect(i.x).toBeGreaterThanOrEqual(0);
        expect(i.y).toBeGreaterThanOrEqual(0);
        expect(i.x + i.w).toBeLessThanOrEqual(dentro.larghezza);
        expect(i.y + i.h).toBeLessThanOrEqual(dentro.altezza);
      }
    }
  });

  // Il disordine è disegnato, non casuale: se cambiasse a ogni build,
  // ogni confronto fra prima e dopo diventerebbe rumore.
  it("dà sempre lo stesso disordine", () => {
    expect(frammenti(11, ORIZZONTALE)).toEqual(frammenti(11, ORIZZONTALE));
  });

  it("non li fa sovrapporre", () => {
    const pezzi = frammenti(11, ORIZZONTALE).map(ingombro);
    for (let a = 0; a < pezzi.length; a++) {
      for (let b = a + 1; b < pezzi.length; b++) {
        const separati =
          pezzi[a].x + pezzi[a].w <= pezzi[b].x ||
          pezzi[b].x + pezzi[b].w <= pezzi[a].x ||
          pezzi[a].y + pezzi[a].h <= pezzi[b].y ||
          pezzi[b].y + pezzi[b].h <= pezzi[a].y;
        expect(separati).toBe(true);
      }
    }
  });

  it("sa stare stretto: otto in un riquadro basso e largo", () => {
    expect(frammenti(8, VERTICALE)).toHaveLength(8);
  });
});

describe("fascio", () => {
  it("va dritto quando i due punti sono allineati", () => {
    expect(fascio([312, 200], [434, 200], "orizzontale")).toBe("M 312 200 L 434 200");
    expect(fascio([175, 200], [175, 246], "verticale")).toBe("M 175 200 L 175 246");
  });

  it("curva partendo e arrivando dove gli hai detto", () => {
    const d = fascio([312, 92], [434, 200], "orizzontale");
    expect(d.startsWith("M 312 92 C ")).toBe(true);
    expect(d.endsWith(" 434 200")).toBe(true);
  });

  it("piega la curva sull'asse giusto", () => {
    const orizzontale = fascio([0, 0], [100, 100], "orizzontale");
    const verticale = fascio([0, 0], [100, 100], "verticale");
    expect(orizzontale).not.toBe(verticale);
  });
});
```

- [ ] **Step 2: Farli fallire**

Run: `npx vitest run src/lib/diagramma.test.ts`
Atteso: FAIL, «Failed to resolve import "./diagramma"».

- [ ] **Step 3: Scrivere il modulo**

Creare `src/lib/diagramma.ts`:

```ts
/**
 * La geometria dei diagrammi della home.
 *
 * Sta qui e non dentro il componente per due ragioni. La prima è che le due
 * disposizioni — orizzontale a 1440, verticale a 390 — devono condividere i
 * numeri invece di ripeterli: il conto dei frammenti è un dato, non una cifra
 * scritta due volte in due file. La seconda è che così si può provare che
 * niente esce dal riquadro, che è il modo in cui un diagramma SVG si rompe
 * senza che nessuno se ne accorga.
 *
 * Il disordine è deterministico. Sembra casuale ma non lo è: se cambiasse a
 * ogni build, ogni confronto fra la pagina di prima e quella di dopo
 * diventerebbe rumore, e in questo repo il confronto fra prima e dopo è un
 * gate.
 */

export interface Frammento {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Gradi, fra -7 e 6: quanto basta a farlo sembrare buttato lì. */
  rot: number;
  /** Le barrette dentro, a suggerire del testo. */
  righe: number;
  /** I tratteggiati sono quelli di cui non si sa nemmeno bene cosa contengano. */
  tratteggio: boolean;
}

export interface Riquadro {
  larghezza: number;
  altezza: number;
}

/** Generatore lineare congruenziale: stessa sequenza a ogni chiamata. */
function seminatore(seme: number): () => number {
  let stato = seme;
  return () => {
    stato = (stato * 1103515245 + 12345) % 2147483648;
    return stato / 2147483648;
  };
}

/**
 * Il riquadro che un frammento occupa davvero una volta ruotato. È più grande
 * del frammento: è quello che va tenuto dentro i bordi.
 */
export function ingombro(f: Frammento): { x: number; y: number; w: number; h: number } {
  const rad = (Math.abs(f.rot) * Math.PI) / 180;
  const w = f.w * Math.cos(rad) + f.h * Math.sin(rad);
  const h = f.w * Math.sin(rad) + f.h * Math.cos(rad);
  return {
    x: f.x + f.w / 2 - w / 2,
    y: f.y + f.h / 2 - h / 2,
    w,
    h,
  };
}

/**
 * `quanti` frammenti sparsi dentro il riquadro, senza sovrapporsi e senza
 * uscire. La griglia sotto non si vede: serve solo a garantire le due cose.
 */
export function frammenti(quanti: number, dentro: Riquadro): Frammento[] {
  const colonne = Math.max(1, Math.round(Math.sqrt((quanti * dentro.larghezza) / dentro.altezza)));
  const righeGriglia = Math.ceil(quanti / colonne);
  const cellaL = dentro.larghezza / colonne;
  const cellaA = dentro.altezza / righeGriglia;

  const caso = seminatore(20260903);
  const fuori: Frammento[] = [];

  for (let i = 0; i < quanti; i++) {
    const colonna = i % colonne;
    const riga = Math.floor(i / colonne);

    // Il frammento sta al 62-88% della cella, e la rotazione si mangia il
    // resto: il margine è calcolato sull'ingombro, non sulla forma.
    const rot = Math.round(-7 + caso() * 13);
    const rad = (Math.abs(rot) * Math.PI) / 180;
    const w = Math.round(cellaL * (0.62 + caso() * 0.26) - cellaA * Math.sin(rad));
    const h = Math.round(cellaA * (0.5 + caso() * 0.22) - cellaL * Math.sin(rad));

    const i2 = ingombro({ x: 0, y: 0, w, h, rot, righe: 1, tratteggio: false });
    const margineL = Math.max(0, cellaL - i2.w);
    const margineA = Math.max(0, cellaA - i2.h);

    fuori.push({
      x: Math.round(colonna * cellaL + (i2.w - w) / 2 + caso() * margineL),
      y: Math.round(riga * cellaA + (i2.h - h) / 2 + caso() * margineA),
      w,
      h,
      rot,
      righe: 1 + Math.floor(caso() * 3),
      tratteggio: caso() < 0.28,
    });
  }
  return fuori;
}

/**
 * Il `d` di un collegamento. Dritto quando i due punti sono allineati sul suo
 * asse, altrimenti una cubica che parte e arriva perpendicolare, così i fasci
 * entrano nei riquadri di faccia invece che di sbieco.
 */
export function fascio(
  da: [number, number],
  a: [number, number],
  verso: "orizzontale" | "verticale",
): string {
  const [x1, y1] = da;
  const [x2, y2] = a;
  if (verso === "orizzontale" && y1 === y2) return `M ${x1} ${y1} L ${x2} ${y2}`;
  if (verso === "verticale" && x1 === x2) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const k = 0.55;
  const [c1x, c1y] =
    verso === "orizzontale" ? [x1 + (x2 - x1) * k, y1] : [x1, y1 + (y2 - y1) * k];
  const [c2x, c2y] =
    verso === "orizzontale" ? [x2 - (x2 - x1) * k, y2] : [x2, y2 - (y2 - y1) * k];
  return `M ${x1} ${y1} C ${Math.round(c1x)} ${Math.round(c1y)} ${Math.round(c2x)} ${Math.round(c2y)} ${x2} ${y2}`;
}
```

- [ ] **Step 4: Farli passare**

Run: `npx vitest run src/lib/diagramma.test.ts`
Atteso: PASS, 8 test.

Se il test della sovrapposizione fallisce, il colpevole è il margine: alzare la
soglia inferiore di `w` e `h` (`0.62` e `0.5`) riduce l'ingombro. **Non
allargare il riquadro né togliere il test.**

- [ ] **Step 5: Commit**

```bash
git add src/lib/diagramma.ts src/lib/diagramma.test.ts
git commit -m "La geometria dei diagrammi, provata invece che disegnata a mano"
```

---

## Task 4: La sezione «Cosa costruisco»

**Files:**
- Create: `src/components/sezioni/CosaCostruisco.astro`
- Riferimento per il markup esatto: `docs/superpowers/specs/2026-09-03-home-visuale/tavole/Main.dc.html`, blocco `4 · COSA COSTRUISCO`, e `HomeMobile.dc.html` per la disposizione verticale.

**Interfaces:**
- Consumes: `frammenti`, `fascio` da `src/lib/diagramma.ts` (task 3);
  `.base`, `.fascio`, `.interrotto` da `global.css` (task 2).
- Produces: il componente con questa interfaccia, che il task 11 monta:

```ts
interface Props {
  occhiello: string;
  titolo: string;
  intro: string;
  nodo: { titolo: string; sottotitolo: string };
  ritorno: string;            // l'etichetta sulla riga che torna alla fonte
  didascaliaSinistra: string;
  didascaliaDestra: string;
}
```

- [ ] **Step 1: Scrivere il componente**

Il componente rende **due** disposizioni nello stesso markup, una nascosta per
larghezza. Struttura:

```astro
---
import { fascio, frammenti } from "../../lib/diagramma";

interface Props {
  occhiello: string;
  titolo: string;
  intro: string;
  nodo: { titolo: string; sottotitolo: string };
  ritorno: string;
  didascaliaSinistra: string;
  didascaliaDestra: string;
}
const { occhiello, titolo, intro, nodo, ritorno, didascaliaSinistra, didascaliaDestra } = Astro.props;

// Il disordine a sinistra. Undici pezzi sul largo, otto sullo stretto: a 350px
// undici diventano illeggibili, e il numero è un dato del componente invece che
// una cifra scritta due volte.
const larghi = frammenti(11, { larghezza: 312, altezza: 370 });
const stretti = frammenti(8, { larghezza: 350, altezza: 200 });

// I fasci in entrata e in uscita, disposizione larga.
const entranoL = [
  fascio([312, 92], [434, 200], "orizzontale"),
  fascio([312, 200], [434, 200], "orizzontale"),
  fascio([312, 308], [434, 200], "orizzontale"),
];
const esconoL = [
  fascio([624, 200], [752, 112], "orizzontale"),
  fascio([624, 200], [752, 200], "orizzontale"),
  fascio([624, 200], [752, 288], "orizzontale"),
];
---
```

Il resto del markup — i `<rect>` dei frammenti, i cinque nodi di destra, la
riga `.interrotto` con la sua freccia, l'etichetta che la interrompe — si copia
**alla lettera** dalla tavola, sostituendo i valori scritti a mano con i
`{frammento.x}` eccetera, e i colori con i token del task 2.

Punti da non sbagliare, tutti già risolti nella tavola:

- La riga di ritorno larga è `M 981 263 L 981 424 L 150 424 L 150 332`, con la
  punta `M 144 340 L 150 330 L 156 340`. Quella stretta è
  `M 310 497 L 332 497 L 332 560 L 18 560 L 18 118 L 24 118`.
- L'etichetta del ritorno è un `<span>` in HTML sopra l'SVG, con
  `background: var(--bg)` e `padding: 0 12px`: interrompe la riga invece di
  starci sopra.
- Il nodo centrale è HTML, non SVG: `box-shadow: 0 0 0 7px rgb(240 201 164 / 32%), 0 12px 34px rgb(168 83 29 / 14%)`.
- La sezione porta `data-anima` sull'elemento esterno.

- [ ] **Step 2: Montarlo da solo per guardarlo**

```bash
npm run dev
```

Aprire `http://localhost:4321/` e confrontare con
`docs/superpowers/specs/2026-09-03-home-visuale/immagini/04-cosa-costruisco.png`.
Poi restringere la finestra sotto i 640px e confrontare con
`11-mobile-diagramma.png`.

- [ ] **Step 3: Verificare che il movimento si fermi**

Nel browser, devtools → Rendering → «Emulate CSS prefers-reduced-motion:
reduce». Atteso: i fasci si fermano, il disegno resta leggibile, nessun
riquadro sparisce.

- [ ] **Step 4: Commit**

```bash
git add src/components/sezioni/CosaCostruisco.astro
git commit -m "«Cosa costruisco»: la tesi, e il diagramma che la dimostra"
```

---

## Task 5: `FasciaNumeri` assorbe `DaDoveViene`

**Files:**
- Modify: `src/components/sezioni/FasciaNumeri.astro`
- Delete: `src/components/sezioni/DaDoveViene.astro`
- Modify: `src/components/sezioni/Territorio.astro` (toglie il riferimento a `DaDoveViene` nel commento)

**Interfaces:**
- Produces: `FasciaNumeri` con una prop nuova e **opzionale**:

```ts
interface Props {
  numeri: { numero: string; etichetta: string }[];
  daDoveViene?: {
    occhiello: string; titolo: string; intro: string;
    tappe: { valore: string; etichetta: string }[];
    linkRicerca: string; hrefRicerca: string;
    linkChiSono: string; hrefChiSono: string;
  };
}
```

- [ ] **Step 1: Aggiungere la prop opzionale**

In `FasciaNumeri.astro`, dopo la riga dei numeri, dentro lo stesso
`.container`:

```astro
{daDoveViene && (
  <>
    <div class="filo"></div>
    <div class="ricerca">
      <div>
        <p class="occhiello">{daDoveViene.occhiello}</p>
        <h2>{daDoveViene.titolo}</h2>
        <p class="intro">{daDoveViene.intro}</p>
        <div class="link">
          <a href={daDoveViene.hrefRicerca}>{daDoveViene.linkRicerca} <span class="freccia">&rarr;</span></a>
          <a href={daDoveViene.hrefChiSono}>{daDoveViene.linkChiSono} <span class="freccia">&rarr;</span></a>
        </div>
      </div>
      <div class="tappe">
        {daDoveViene.tappe.map((t) => (
          <div class="tappa">
            <p class="valore">{t.valore}</p>
            <p class="etichetta">{t.etichetta}</p>
          </div>
        ))}
      </div>
    </div>
  </>
)}
```

Stili: `padding` della fascia da `26px 24px` a `40px 24px 46px`; `.filo`
`height: 1px; background: rgb(255 255 255 / 16%); margin: 34px 0 30px`;
`.ricerca` `display: grid; grid-template-columns: minmax(0, 1fr) 420px; gap: 64px`;
`.tappa` `border-left: 2px solid rgb(240 201 164 / 50%); padding-left: 16px`.
Sotto i 640px: `.ricerca` a una colonna, i numeri in
`grid-template-columns: repeat(2, minmax(0, 1fr))`, le etichette accorciate
(vedi il task 11: la scelta delle etichette corte è un dato della pagina, non
del componente).

- [ ] **Step 2: Cancellare `DaDoveViene.astro` e correggere il riferimento**

```bash
git rm src/components/sezioni/DaDoveViene.astro
grep -rn "DaDoveViene" src/
```

Atteso dopo la correzione: nessun risultato fuori dai commenti storici, e
`Territorio.astro` non lo nomina più.

- [ ] **Step 3: Verificare**

```bash
npm run check
```

Atteso: 0 errori. Se `astro check` si lamenta di un import morto in una delle
due home, è il task 11 a sistemarlo: qui basta che il componente compili.

- [ ] **Step 4: Commit**

```bash
git add -A src/components/sezioni/
git commit -m "I numeri e «Da dove viene» diventano una fascia sola"
```

---

## Task 6: `Contatto` accoglie il territorio

**Files:**
- Modify: `src/components/sezioni/Contatto.astro`
- Delete: `src/components/sezioni/Territorio.astro`

**Interfaces:**
- Produces: `Contatto` con una prop nuova e **opzionale** — obbligatoria
  romperebbe `BaseLayout.astro` e `src/pages/en/notes/index.astro`, che lo
  usano senza:

```ts
territorio?: {
  occhiello: string; titolo: string; intro: string;
  modi: { etichetta: string; dettaglio: string }[];
};
```

- [ ] **Step 1: Aggiungere il blocco, prima del modulo**

```astro
{territorio && (
  <div class="territorio">
    <p class="occhiello">{territorio.occhiello}</p>
    <h2 class="luogo">{territorio.titolo}</h2>
    <p class="intro-luogo">{territorio.intro}</p>
    <div class="modi">
      {territorio.modi.map((m) => (
        <p><strong>{m.etichetta}</strong> {m.dettaglio}</p>
      ))}
    </div>
  </div>
)}
```

`.territorio` chiude con `padding-bottom: 34px; border-bottom: 1px solid rgb(255 255 255 / 16%)`;
`.modi` è `display: flex; gap: 56px; flex-wrap: wrap`, e sotto i 640px
`flex-direction: column; gap: 8px`.

- [ ] **Step 2: Verificare che i due consumatori esterni reggano**

```bash
grep -rn "Contatto" src/layouts/BaseLayout.astro src/pages/en/notes/index.astro
npm run check
```

Atteso: 0 errori. Se `astro check` chiede `territorio`, la prop non è stata
resa opzionale: correggere il tipo, **non** aggiungere la prop ai due
consumatori.

- [ ] **Step 3: Cancellare `Territorio.astro`**

```bash
git rm src/components/sezioni/Territorio.astro
grep -rn "Territorio" src/
```

Atteso: solo `src/data/territorio.ts` e i suoi import, che restano.

- [ ] **Step 4: Commit**

```bash
git add -A src/components/sezioni/
git commit -m "Il territorio entra nel blocco del contatto, dove chi scrive se lo chiede"
```

---

## Task 7: `BloccoFormazione` diventa una striscia

**Files:**
- Modify: `src/components/sezioni/BloccoFormazione.astro`
- Riferimento: `tavole/Main.dc.html`, blocco `7 · FORMAZIONE`.

**Interfaces:**
- Produces: le props `formati[].corpo` e `chiusura` diventano **facoltative**:
  la home non le passa più, `/formazione` continua a esistere per conto suo.

- [ ] **Step 1: Riscrivere il corpo del componente**

Griglia `400px minmax(0, 1fr)` con `gap: 64px`: a sinistra occhiello, titolo a
26px e il link di chiusura; a destra la prima delle `introduzioni` (quella
sull'AI Act) e i tre formati come pastiglie:

```astro
<div class="pastiglie">
  {formati.map((f) => (
    <span class="pastiglia"><strong>{f.ore}</strong> {f.nome}</span>
  ))}
</div>
```

`.pastiglia` è `font-size: 13px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 9px 14px`,
con `strong { color: var(--azione); }`. Sotto i 640px le pastiglie vanno in
colonna con `padding: 11px 14px` — che è anche quello che le porta sopra i 44px
del tocco.

- [ ] **Step 2: Verificare**

```bash
npm run check && npm run dev
```

Confrontare con `immagini/07-formazione.png`. La sezione deve stare in circa
294px a 1440 e 503px a 390.

- [ ] **Step 3: Commit**

```bash
git add src/components/sezioni/BloccoFormazione.astro
git commit -m "La formazione si riduce a striscia: il resto lo dice /formazione"
```

---

## Task 8: Le tre vignette de «Il problema»

**Files:**
- Modify: `src/components/sezioni/IlProblema.astro`
- Riferimento: `tavole/Main.dc.html`, blocco `3 · IL PROBLEMA` — gli SVG si
  copiano alla lettera.

**Interfaces:**
- Consumes: `.interrotto` dal task 2.
- Produces: `riquadri[]` prende una chiave in più:

```ts
riquadri: { citazione: string; corpo: string; vignetta?: "richiesta" | "unaTestaSola" | "fuoriDaCasa" }[];
```

- [ ] **Step 1: Le tre vignette**

Tre `<svg viewBox="0 0 286 104">` scelti per chiave, resi sopra la citazione con
`margin-bottom: 20px` (16px sotto i 640px, e altezza 64 invece di 80).

**Nessuna delle tre ha un `.fascio`**: usano `.interrotto`. È deliberato — il
movimento arancione compare solo dove qualcosa funziona, e il contrasto con la
sezione 4 è metà del lavoro che fanno.

- [ ] **Step 2: Il fondo e la scala**

`.il-problema` passa a `background: var(--surface-warm)`, il `padding` del
contenitore da `72px 24px` a `76px 24px`, e `.section-title` da 32 a 34px.

- [ ] **Step 3: Verificare**

```bash
npm run check && npm run dev
```

Confrontare con `immagini/03-il-problema.png`. Le tre schede devono restare
della stessa altezza: se una si allunga, è il `grid` che ha perso lo `stretch`.

- [ ] **Step 4: Commit**

```bash
git add src/components/sezioni/IlProblema.astro
git commit -m "Ogni citazione de «Il problema» prende la sua scena"
```

---

## Task 9: `LeProve` — miniature, tag in evidenza, e lo scambio

**Files:**
- Modify: `src/components/sezioni/LeProve.astro`
- Riferimento: `tavole/Main.dc.html`, blocco `6 · LE PROVE`.

**Interfaces:**
- Produces:

```ts
prove: {
  eyebrow: string; nome: string; corpo: string;
  tag: string[];
  tagInEvidenza?: string;   // reso in --azione su --evidenziatore-tenue
  miniatura?: "ricambi" | "procedo" | "toolkit";
  link: string; href: string; esterno?: boolean;
}[];
```

- [ ] **Step 1: Le miniature e il tag in evidenza**

Tre `<svg viewBox="0 0 338 86">` scelti per chiave, sopra l'occhiello. Queste
**hanno** il fascio: mostrano cose che funzionano.

Il tag in evidenza si rende dopo gli altri:

```astro
{tagInEvidenza && <span class="tag-evidenza">{tagInEvidenza}</span>}
```

```css
.tag-evidenza {
  font-size: 12px;
  color: var(--azione);
  border: 1px solid var(--azione);
  background: var(--evidenziatore-tenue);
  border-radius: var(--radius);
  padding: 5px 10px;
  font-weight: 600;
}
```

- [ ] **Step 2: Il contenuto delle tre schede, nella home**

Questo si fa nel task 11, ma va deciso qui perché è il motivo della prop:

- **Portale ricambi 3D** riprende `tagInEvidenza: "In costruzione"`. Il tag sta
  in `projects.ts` (`tagIt`) e `leProve` in `index.astro` lo lasciava cadere,
  mettendoci sopra «commessa reale»: la home raccontava il progetto meglio di
  quanto fosse.
- **Spannum esce dalla home** e resta su `/lavori`.
- **Agentic Workflow Toolkit entra**, con `tagInEvidenza: "Strumenti miei, per
  il mio team"`. È la sola dichiarazione che tiene onesta l'integrazione:
  Alessandro non l'ha mai fatta per un cliente.

- [ ] **Step 3: Verificare**

```bash
npm run check && npm run dev
```

Confrontare con `immagini/06-le-prove.png`.

- [ ] **Step 4: Commit**

```bash
git add src/components/sezioni/LeProve.astro
git commit -m "Le prove: una miniatura per scheda, e i tag che dicono a che punto sono"
```

---

## Task 10: `ComeLavoro` — corpo facoltativo e nomi nuovi

**Files:**
- Modify: `src/components/sezioni/ComeLavoro.astro`
- Modify: `src/pages/index.astro:73-77` (il commento sui quattro passi)

**Interfaces:**
- Produces: `passi[].corpo` diventa **facoltativo**. `CorpoChiSono.astro`
  continua a passarlo e non si tocca.

- [ ] **Step 1: Rendere il corpo facoltativo**

```astro
{passo.corpo && <p class="corpo">{passo.corpo}</p>}
```

Sotto i 640px, quando il corpo manca, numero e nome vanno in linea:
`display: flex; align-items: baseline; gap: 12px`.

- [ ] **Step 2: Riscrivere il commento che questa decisione rovescia**

`src/pages/index.astro` porta oggi:

```
// I quattro passi sono un riassunto per la home, con nomi e testi propri
// (Ascolto/Diagnosi/Costruisco/Resto): non coincidono con `ingaggi` di
// src/data/servizi.ts (Capire/Decidere/Costruire/Mantenere), che è la
// versione estesa per /servizi.
```

Sostituirlo con:

```
// I quattro passi prendono ora i nomi degli `ingaggi` di src/data/servizi.ts.
// Fino a settembre 2026 avevano nomi propri — Ascolto, Diagnosi, Costruisco,
// Resto — e questo commento diceva apposta che i due elenchi non dovevano
// coincidere. La ragione è caduta quando i corpi hanno lasciato la home: senza
// il loro testo accanto, «Ascolto» e «Resto» smettono di parlare del lavoro e
// parlano della persona, e la sezione suona come una terapia invece che come
// un mestiere. I nomi degli ingaggi sono già approvati, esistono in inglese, e
// a 390px stanno comunque su una riga: costano zero. Quello che si paga è che
// la home comincia a nominare quello che si compra, e da qui in poi i due
// elenchi vanno tenuti allineati a mano.
```

**Non cancellare il commento.** Un commento che sparisce lascia due elenchi
identici e nessuna spiegazione, ed è come si torna indietro per sbaglio.

- [ ] **Step 3: Verificare che `/chi-sono` non sia cambiata**

```bash
npm run build
node -e "
const { readFileSync } = require('node:fs');
const testo = readFileSync('dist/chi-sono/index.html', 'utf8')
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log(testo.includes('Passo mezza giornata in azienda') ? 'ok: il corpo dei passi è ancora lì' : 'ROTTO');
"
```

Atteso: `ok: il corpo dei passi è ancora lì`.

- [ ] **Step 4: Commit**

```bash
git add src/components/sezioni/ComeLavoro.astro src/pages/index.astro
git commit -m "I quattro passi tengono il «Ne esce» e prendono i nomi degli ingaggi"
```

---

## Task 11: Le due home

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`
- Modify: `src/data/en/home.ts`

**Interfaces:**
- Consumes: tutti i componenti dei task 4-10.

- [ ] **Step 1: Il montaggio italiano**

```astro
<BaseLayout ...>
  <Occhiello {...occhiello} />
  <FasciaNumeri numeri={numeri} daDoveViene={daDoveViene} />
  <IlProblema {...ilProblema} />
  <CosaCostruisco {...cosaCostruisco} />
  <ComeLavoro {...comeLavoro} />
  <LeProve {...leProve} />
  <BloccoFormazione {...bloccoFormazione} />
  <Contatto {...contatto} territorio={territorio.it} />
</BaseLayout>
```

I quattro `passi` di `comeLavoro` perdono `corpo` e prendono i nomi da
`ingaggi`:

```ts
import { ingaggi } from '../data/servizi';

const comeLavoro = {
  // …occhiello, titolo, intro, etichettaNeEsce, continua, hrefContinua invariati
  passi: [
    { numero: '01', nome: ingaggi[0].nome, neEsce: 'Una lista dei punti dove si perde tempo, ordinata per quanto costano.' },
    { numero: '02', nome: ingaggi[1].nome, neEsce: 'Un documento che resta tuo, e che puoi far leggere a chi vuoi.' },
    { numero: '03', nome: ingaggi[2].nome, neEsce: 'Qualcosa che i tuoi aprono il lunedì mattina e usano davvero.' },
    { numero: '04', nome: ingaggi[3].nome, neEsce: 'Una persona che conosce il sistema e che puoi chiamare quando serve.' },
  ],
};
```

> **Una riga da decidere prima di scrivere questa.** `ingaggi` ha due campi:
> `nome` («Mezza giornata diagnostica», «Audit AI», «Software su misura»,
> «Canone di servizio») ed `etichetta` («Capire», «Decidere», «Costruire»,
> «Mantenere»). Il committente ha scelto **`nome`**. Se dovesse preferire
> `etichetta` — parole corte sul lavoro, che non trasformano la sezione in un
> listino — cambia solo `ingaggi[n].nome` in `ingaggi[n].etichetta` qui e nella
> home inglese, e niente altro.

- [ ] **Step 2: I testi della sezione nuova**

Le otto stringhe **devono prima esistere in `testi.md`**, altrimenti il task 1
fa fallire `npm run verifica`. Quando ci sono, si copiano in `cosaCostruisco`
dentro `index.astro`, con lo stesso trattamento delle altre sezioni.

Finché non ci sono: **non montare `<CosaCostruisco />`**. La pagina resta a
sette sezioni e tutto il resto del lavoro va avanti.

- [ ] **Step 3: Il montaggio inglese**

Stessa struttura, **senza `CosaCostruisco`**: la copy inglese non esiste in
`testi-en.md`. Non è un'eccezione, è la regola 2 del `CLAUDE.md` — un campo
vuoto salta la sua sezione.

In `src/data/en/home.ts` i quattro `passi` prendono `ingaggi` inglesi
(`A diagnostic half-day`, `AI audit`, `Custom software`, `Service retainer`) e
perdono `corpo`: «I listen» e «I stay», da soli, hanno lo stesso difetto dei
nomi italiani.

- [ ] **Step 4: Verificare tutto**

```bash
npm run check && npm test && npm run verifica
```

Atteso: 0 errori, tutti i test verdi, `✓ tutte le rotte a posto`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/en/index.astro src/data/en/home.ts
git commit -m "Le due home montate sulla struttura nuova"
```

---

## Task 12: Il tocco, e il controllo che lo difende

**Files:**
- Create: `scripts/verifica-telefono.mjs`
- Modify: `src/styles/global.css`
- Modify: `README.md` (una riga su come si lancia)

**Interfaces:**
- Produces: `node scripts/verifica-telefono.mjs`, che gira **fuori** da
  `npm run verifica` perché ha bisogno di un browser che il repo non installa.

- [ ] **Step 1: La regola dei 44px**

In `global.css`:

```css
/* Sotto i 44px il dito manca il bersaglio, ed è da lì che arriva la maggior
   parte di chi legge. Nav.astro applica già questa regola alle sue voci sotto
   i 720px: qui vale per i link dentro le sezioni, che oggi sono <a> in linea
   alti 21px. */
@media (max-width: 640px) {
  main a:not(.pulsante):not(.primaria) {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
}
```

- [ ] **Step 2: Lo script**

```js
// Due difetti che si vedono solo su un telefono vero, e che nessun controllo
// sul sorgente prende: lo scorrimento orizzontale e i bersagli troppo piccoli.
// Gira con Playwright preso al volo, perché il progetto non lo ha fra le
// dipendenze e non deve averlo:
//
//   npx playwright install chromium     (una volta)
//   npm run preview & node scripts/verifica-telefono.mjs
import { chromium } from "playwright";

const LARGHEZZE = [320, 360, 390, 414];
const ROTTE = ["/", "/servizi/", "/chi-sono/", "/en/"];
const INDIRIZZO = process.env.INDIRIZZO ?? "http://localhost:4321";

let errori = 0;
const dice = (m) => { console.error("✗ " + m); errori++; };

const browser = await chromium.launch();
for (const rotta of ROTTE) {
  for (const larghezza of LARGHEZZE) {
    const pagina = await browser.newPage({ viewport: { width: larghezza, height: 844 } });
    await pagina.goto(INDIRIZZO + rotta, { waitUntil: "load" });
    const esito = await pagina.evaluate(() => ({
      largo: document.documentElement.scrollWidth,
      visibile: document.documentElement.clientWidth,
      piccoli: [...document.querySelectorAll("main a, main button, nav a, footer a")]
        .filter((e) => e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44)
        .map((e) => (e.textContent || "").trim().slice(0, 40)),
    }));
    if (esito.largo > esito.visibile) {
      dice(`${rotta} a ${larghezza}px scorre in orizzontale (${esito.largo} contro ${esito.visibile})`);
    }
    if (esito.piccoli.length) {
      dice(`${rotta} a ${larghezza}px ha ${esito.piccoli.length} bersagli sotto i 44px: ${esito.piccoli.slice(0, 5).join(" · ")}`);
    }
    await pagina.close();
  }
}
await browser.close();
console.log(errori === 0 ? "✓ telefono a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
```

- [ ] **Step 3: Farlo girare**

```bash
npx playwright install chromium
npm run build && npm run preview &
node scripts/verifica-telefono.mjs
```

Atteso: `✓ telefono a posto`. Se segnala bersagli piccoli nel piè di pagina,
**non allargare la maglia**: quello è il lavoro del task 13, e va segnato lì.

- [ ] **Step 4: Commit**

```bash
git add scripts/verifica-telefono.mjs src/styles/global.css README.md
git commit -m "I bersagli del tocco a 44px, e lo script che se ne accorge"
```

---

## Task 13: Il confronto guardato, la regola su Procedo, la PR

**Files:**
- Create: `.claude/rules/procedo.md`
- Modify: `docs/superpowers/specs/2026-09-03-home-visuale-design.md` (spuntare
  le domande chiuse)

- [ ] **Step 1: La regola sul perimetro**

Con la riga che arriva dal committente:

```markdown
---
paths: ["src/data/**", "src/pages/**"]
---

# Il confine con Procedo

Patto di non concorrenza **scritto e in vigore**. Procedo si nomina come
credenziale al passato — la riga di credibilità in testata, la scheda fra «Le
prove». Il sito **non può presentare come propria offerta** quello che Procedo
vende.

[LA RIGA DEL COMMITTENTE, ALLA LETTERA — questo passo non si puo' completare
senza. Se non e' ancora arrivata, si apre comunque la PR e si segna la regola
come debito nel corpo della PR, invece di scrivere un perimetro inventato.]

Fonti sicure per le capacità: **Vault**, **Tracking costi**, **Agentic Workflow
Toolkit**. `projects.ts` descrive Procedo meglio di qualsiasi altra cosa, ed è
per questo la fonte più comoda da cui pescare copy approvata: è precisamente
quella da cui non si deve pescare quando si scrive dell'offerta.
```

- [ ] **Step 2: Guardare le pagine, non gli hash**

Il lavoro tocca componenti condivisi con il sito **in produzione**.

```bash
git stash && npm run build && cp -r dist /tmp/prima && git stash pop
npm run build
for r in "" servizi chi-sono formazione ricerca lavori note; do
  node -e "
    const { readFileSync } = require('node:fs');
    const pulisci = (f) => readFileSync(f,'utf8').replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    const a = pulisci('/tmp/prima/$r/index.html'), b = pulisci('dist/$r/index.html');
    console.log('$r'.padEnd(12), a === b ? 'testo identico' : 'testo cambiato');
  " 2>/dev/null
done
```

Poi **aprire le pagine e guardarle**. In questo repo un confronto byte a byte
ha già dichiarato «identiche» due versioni di cui una aggiungeva 16px di
scorrimento orizzontale su `/chi-sono`.

- [ ] **Step 3: Le tre verifiche, per intero**

```bash
npm run check && npm test && npm run verifica
npm run preview & node scripts/verifica-telefono.mjs
```

- [ ] **Step 4: La PR**

```bash
git push -u origin feat/home-visuale
gh pr create --base main --title "La home visuale" --body "$(cat <<'CORPO'
## Summary

La home passa da nove sezioni a otto e ne guadagna una nuova, «Cosa
costruisco», il cui diagramma dimostra che dai dati e dagli strumenti sparsi di
un'azienda si tira fuori conoscenza — con una riga che dal risultato torna
indietro fino alla sua fonte.

Desktop 6355px → 5667 (−11%). Telefono 9357px → 8605 (−8%).

Progetto: `docs/superpowers/specs/2026-09-03-home-visuale-design.md`
Tavole: `docs/superpowers/specs/2026-09-03-home-visuale/`

## Test plan

[l'uscita vera di npm run check, npm test, npm run verifica e
scripts/verifica-telefono.mjs]

CORPO
)"
```

---

## Cosa resta fuori, di proposito

- **Il piè di pagina.** 843px sul telefono, su ogni pagina del sito, e i suoi
  quattordici link sono alti 28px. Correggerli lo **allunga** di 224px:
  accorciarlo sul serio vuol dire decidere quali link smettono di stare lì. È
  una PR sua, dopo, quando la home è in produzione e si confronta una cosa alla
  volta.
- **Le foto.** I punti dove andranno reggono vuoti. Quando arrivano, si
  progettano guardando prima il telefono.
- **«Cosa costruisco» in inglese.** Aspetta la copy in `testi-en.md`.
