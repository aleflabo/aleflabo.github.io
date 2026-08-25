# Sito italiano — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** portare il sito da vetrina inglese per recruiter a sito italiano che ingaggia, senza distruggere il portfolio esistente.

**Architecture:** l'italiano diventa la lingua canonica e le ancore della one-page diventano rotte vere; l'inglese trasloca sotto `/en/` senza modifiche di contenuto. Le pagine nuove riusano `BaseLayout`, i dati restano in `src/data/*.ts`, e il movimento vive in `global.css` come regole su tipi di elemento invece che come classi sui componenti.

**Tech Stack:** Astro 5 statico, TypeScript, CSS a mano con token, `@astrojs/sitemap`, Vitest (aggiunto dal task 1), GitHub Pages via Actions.

**Spec:** `docs/superpowers/specs/2026-08-25-sito-italiano-design.md`, con il disegno vero in `docs/superpowers/specs/2026-08-25-sito-italiano/`.

## Global Constraints

- **Il copy si copia, non si scrive.** Ogni stringa italiana esce da `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`. Se una frase non è lì, è inventata: fermarsi e chiedere.
- **Le misure escono dalle tavole** `.../tavole/*.dc.html`. Aprirle in un browser. Niente arrotondamenti a griglie di 4 o 8px.
- **I caratteri arrivano da `@fontsource-variable/fraunces` e `@fontsource-variable/inter`**, già importati in `BaseLayout.astro`. Le tavole usano Google Fonts solo perché girano isolate: **non aggiungere `<link>` a fonts.googleapis.com.**
- **Token nuovi:** fondo `#faf8f4`, bordo `#e6ddd0`, testo tenue `#55504a`, struttura `#1b3a5b`, azione `#a8531d`, evidenziatore `#f0c9a4`, fondo tenue `#f4efe7`, colonna `1120px`.
- **Regole di scrittura** (§7 della specifica): mai «non X, ma Y»; titoli senza numero iniziale e senza virgola più seconda proposizione; mai giustificarsi; mai «ha senso»; *tu* per chi legge, *voi* per l'azienda; nessun riferimento geografico.
- **Sul lato inglese non si tocca niente**, nemmeno i nomi delle tecnologie nei chip: lì servono.
- **Ogni task chiude con un commit.** Il ramo è `sito-italiano`, si lavora lì.
- `npm run check` (astro check) e `npm run build` devono passare alla fine di ogni task.

---

### Task 1: Invertire la lingua canonica nella logica dei percorsi

`localizedPath` oggi mette il prefisso all'italiano. Va invertito. È l'unico pezzo di logica pura del sito, ed è quello che rompe tutto in silenzio se sbagliato: merita un test.

**Files:**
- Modify: `package.json` (aggiunta di Vitest e dello script `test`)
- Create: `vitest.config.ts`
- Modify: `src/i18n/ui.ts`
- Test: `src/i18n/ui.test.ts`

**Interfaces:**
- Produces: `localizedPath(locale: Locale, path: string): string` — invariata nella firma, invertita nel comportamento. `defaultLocale` diventa `'it'`.

- [ ] **Step 1: installare Vitest**

```bash
npm install --save-dev vitest@^2
```

- [ ] **Step 2: creare `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
```

- [ ] **Step 3: aggiungere lo script in `package.json`**

Dentro `"scripts"`, accanto a `"check"`:

```json
"test": "vitest run"
```

- [ ] **Step 4: scrivere il test che fallisce**

Crea `src/i18n/ui.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { defaultLocale, localizedPath } from "./ui";

describe("localizedPath", () => {
  it("tiene l'italiano senza prefisso", () => {
    expect(localizedPath("it", "/")).toBe("/");
    expect(localizedPath("it", "/servizi")).toBe("/servizi");
    expect(localizedPath("it", "lavori")).toBe("/lavori");
  });

  it("mette l'inglese sotto /en", () => {
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("en", "/work/procedo")).toBe("/en/work/procedo");
  });

  it("dichiara l'italiano come lingua predefinita", () => {
    expect(defaultLocale).toBe("it");
  });
});
```

- [ ] **Step 5: far girare il test e verificare che fallisca**

Run: `npm test`
Expected: FAIL — `localizedPath("it", "/")` restituisce `/it`, e `defaultLocale` è `"en"`.

- [ ] **Step 6: invertire l'implementazione**

Sostituisci il contenuto di `src/i18n/ui.ts`:

```ts
export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

/** Prefissa un percorso con la lingua (l'italiano è senza prefisso). */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "it" ? clean : `/en${clean === "/" ? "" : clean}`;
}
```

- [ ] **Step 7: far girare il test e verificare che passi**

Run: `npm test`
Expected: PASS, tre test verdi.

- [ ] **Step 8: commit**

```bash
git add package.json package-lock.json vitest.config.ts src/i18n/ui.ts src/i18n/ui.test.ts
git commit -m "feat(i18n): l'italiano diventa la lingua canonica"
```

---

### Task 2: Riparare il dominio e la configurazione

`astro.config.mjs` dichiara `flaborea.com`, che non esiste: canonical, sitemap, OG e JSON-LD puntano nel vuoto. Finché il dominio non è comprato si torna a `aleflabo.github.io`.

**Files:**
- Modify: `astro.config.mjs`
- Delete: `public/CNAME`
- Modify: `src/layouts/BaseLayout.astro:22` (il fallback di `site`)

**Interfaces:**
- Consumes: `defaultLocale` dal task 1.
- Produces: `Astro.site` = `https://aleflabo.github.io`; i18n con `defaultLocale: 'it'`.

- [ ] **Step 1: riscrivere `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // flaborea.com non è ancora registrato: finché non lo è, il canonico è questo.
  site: 'https://aleflabo.github.io',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it', en: 'en' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
```

- [ ] **Step 2: togliere il CNAME**

```bash
git rm public/CNAME
```

- [ ] **Step 3: allineare il fallback nel layout**

In `src/layouts/BaseLayout.astro`, riga 22, sostituire:

```astro
const site = Astro.site ? Astro.site.toString().replace(/\/$/, '') : 'https://flaborea.com';
```

con:

```astro
const site = Astro.site ? Astro.site.toString().replace(/\/$/, '') : 'https://aleflabo.github.io';
```

- [ ] **Step 4: verificare che la build passi**

Run: `npm run build`
Expected: build completata. `grep -c 'flaborea.com' dist/index.html` deve dare `0`.

- [ ] **Step 5: commit**

```bash
git add astro.config.mjs src/layouts/BaseLayout.astro
git commit -m "fix(seo): il canonico torna su un dominio che esiste"
```

---

### Task 3: Correggere il JSON-LD e il rilevamento della lingua

Il JSON-LD dichiara Alessandro CTO in carica di Procedo: non lo è da luglio 2026. Lo script di rilevamento della lingua manda tutti su `/it/`, rotta che sta per sparire.

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (blocco `personLd`, blocco `detectLocale`)

**Interfaces:**
- Produces: `BaseLayout` con `personLd` corretto e reindirizzamento verso `/en` per i non italofoni.

- [ ] **Step 1: correggere `personLd`**

Sostituire `jobTitle` e `worksFor`:

```ts
  jobTitle: 'AI consultant and trainer',
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sapienza University of Rome' },
```

Togliere del tutto la riga `worksFor: { ... }` — non lavora più per Procedo.
Cambiare `url: 'https://flaborea.com'` in `url: 'https://aleflabo.github.io'`.

- [ ] **Step 2: invertire il rilevamento della lingua**

Nel blocco `detectLocale`, sostituire:

```js
            if (pref !== 'en') { location.replace('/it/'); }
```

con:

```js
            if (pref === 'en') { location.replace('/en/'); }
```

- [ ] **Step 3: verificare**

Run: `npm run check && npm run build`
Expected: nessun errore. `grep -c 'Co-Founder & CTO' dist/index.html` deve dare `0`.

- [ ] **Step 4: commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "fix(seo): Procedo al passato nei dati strutturati"
```

---

### Task 4: I token e il movimento

Il sistema visivo della direzione «accento caldo». Le regole di movimento sono su tipi di elemento, così valgono anche per le pagine scritte dopo.

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Reference: `docs/superpowers/specs/2026-08-25-sito-italiano/stile.md` (foglio di stile verbatim)

**Interfaces:**
- Produces: variabili `--azione`, `--evidenziatore`, `--surface-warm`; classi `.marker`, `.freccia`, `.w`; regole di entrata sulle fasce di pagina.

- [ ] **Step 1: aggiornare `tokens.css`**

Sostituire il blocco `:root` con:

```css
:root {
  --bg: #faf8f4;
  --surface: #ffffff;
  --surface-warm: #f4efe7;
  --text: #141414;
  --text-muted: #55504a;
  --border: #e6ddd0;
  --accent: #1b3a5b;
  --azione: #a8531d;
  --evidenziatore: #f0c9a4;

  --font-serif: "Fraunces Variable", Georgia, "Times New Roman", serif;
  --font-sans:
    "Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --maxw: 1120px;
  --gap: 1.25rem;
  --radius: 4px;
}
```

Il resto del file (reset, `img`, `a`, `html`) resta com'è.

- [ ] **Step 2: aggiungere il movimento in `global.css`**

In coda al file, copiando i valori da `stile.md`:

```css
/* --- movimento ------------------------------------------------------- */
@keyframes sali { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes tira { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes evidenzia { from { background-size: 0% 100%; } to { background-size: 100% 100%; } }
@keyframes parola { from { opacity: 0; transform: translateY(16px); filter: blur(7px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes respira { 0%, 100% { opacity: .5; transform: scale(1); } 50% { opacity: .85; transform: scale(1.05); } }

main > section { animation: sali .7s cubic-bezier(.22, .8, .3, 1) both; }
main > section:nth-of-type(1) { animation-delay: .02s; }
main > section:nth-of-type(2) { animation-delay: .1s; }
main > section:nth-of-type(3) { animation-delay: .18s; }
main > section:nth-of-type(4) { animation-delay: .26s; }
main > section:nth-of-type(n + 5) { animation-delay: .32s; }

.divider { transform-origin: left; animation: tira .8s cubic-bezier(.22, .8, .3, 1) .4s both; }

.marker {
  background-image: linear-gradient(to top, var(--evidenziatore) 0 16px, transparent 16px);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  animation: evidenzia .85s cubic-bezier(.22, .8, .3, 1) .8s both;
}

.w { display: inline-block; animation: parola .62s cubic-bezier(.22, .8, .3, 1) both; }

.alone { animation: respira 9s ease-in-out infinite; }

.freccia { display: inline-block; transition: transform .22s; }
a:hover .freccia { transform: translateX(5px); }

.scheda { transition: transform .3s cubic-bezier(.22, .8, .3, 1), box-shadow .3s; }
.scheda:hover { transform: translateY(-5px); box-shadow: 0 14px 32px rgb(40 24 10 / 10%); }

.riga { transition: background .25s, padding-left .25s; border-radius: var(--radius); }
.riga:hover { background: var(--surface-warm); padding-left: 14px; }

.pulsante { transition: transform .2s, box-shadow .2s; }
.pulsante:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgb(168 83 29 / 28%); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

- [ ] **Step 3: aggiornare il filetto e l'occhiello in `global.css`**

Sostituire la regola `.divider` esistente (larghezza 44px, altezza 2px) con:

```css
.divider { width: 88px; height: 3px; background: var(--azione); }
```

e nella regola `.label` sostituire `color: var(--accent);` con `color: var(--azione);`.

- [ ] **Step 4: verificare**

Run: `npm run build`
Expected: build completata. Aprire `npm run preview`: il sito inglese esistente deve girare con i colori nuovi e senza rotture.

- [ ] **Step 5: commit**

```bash
git add src/styles/tokens.css src/styles/global.css
git commit -m "feat(stile): accento caldo e movimento condiviso"
```

---

### Task 5: Spostare l'inglese sotto /en e liberare le rotte italiane

Traslocco puro: nessun contenuto cambia, cambiano gli indirizzi.

**Files:**
- Move: `src/pages/index.astro` → `src/pages/en/index.astro`
- Move: `src/pages/work/[slug].astro` → `src/pages/en/work/[slug].astro`
- Delete: `src/pages/it/index.astro`, `src/pages/it/work/[slug].astro` (rinascono ai task 6 e 11)
- Modify: `astro.config.mjs` (blocco `redirects`)

**Interfaces:**
- Consumes: `localizedPath` dal task 1.
- Produces: rotte `/en/` e `/en/work/[slug]`.

- [ ] **Step 1: spostare i file**

```bash
mkdir -p src/pages/en/work
git mv src/pages/index.astro src/pages/en/index.astro
git mv "src/pages/work/[slug].astro" "src/pages/en/work/[slug].astro"
git rm src/pages/it/index.astro "src/pages/it/work/[slug].astro"
rmdir src/pages/work src/pages/it/work src/pages/it 2>/dev/null || true
```

- [ ] **Step 2: correggere le risalite negli import**

In `src/pages/en/index.astro` e `src/pages/en/work/[slug].astro` i percorsi relativi hanno un livello in più. Sostituire `'../layouts/` con `'../../layouts/` e `'../components/` con `'../../components/` nel primo file; nel secondo, `'../../` diventa `'../../../`.

Verifica: `npm run check` non deve segnalare moduli mancanti.

- [ ] **Step 3: togliere `detectLocale` dalla pagina inglese**

In `src/pages/en/index.astro`, nel tag `<BaseLayout>`, rimuovere `detectLocale={true}`: il rilevamento va sulla home italiana, che nasce al task 6.

- [ ] **Step 4: aggiungere i reindirizzamenti in `astro.config.mjs`**

Dentro `defineConfig({ ... })`, accanto a `output`:

```js
  redirects: {
    '/it': '/',
    '/it/': '/',
  },
```

- [ ] **Step 5: verificare**

Run: `npm run build`
Expected: `dist/en/index.html` esiste, `dist/en/work/procedo/index.html` esiste, `dist/it/index.html` è una pagina di reindirizzamento.

> Il reindirizzamento da `/work/[slug]` a `/lavori/[slug]` **non va messo adesso**: quelle rotte nascono al task 11 e Astro fallirebbe la build su una destinazione inesistente.

- [ ] **Step 6: commit**

```bash
git add -A
git commit -m "refactor(rotte): l'inglese trasloca sotto /en"
```

---

### Task 6: I dati italiani delle pagine nuove

Il copy vive nei dati, come già fa `site.ts`. Un file per pagina nuova tiene i file piccoli e leggibili.

**Files:**
- Create: `src/data/servizi.ts`, `src/data/formazione.ts`, `src/data/dati.ts`, `src/data/note.ts`, `src/data/chiSono.ts`, `src/data/pubblicazioni.ts`
- Modify: `src/data/site.ts` (voci di menu e piè di pagina italiani)
- Source: `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`

**Interfaces:**
- Produces: `ingaggi: Ingaggio[]`, `faq: Domanda[]`, `perChiNonSono: string[]`, `formati: Formato[]`, `situazioniDati: Situazione[]`, `note: Nota[]`, `pubblicazioni: Pubblicazione[]`, `chiSono: { paragrafi: string[]; inBreve: string[]; abitudini: { titolo: string; testo: string }[] }`, con questi tipi:

```ts
export interface Ingaggio { chiave: string; etichetta: string; nome: string; corpo: string[]; perChi: string; durata: string; cosaResta: string; }
export interface Formato { ore: string; nome: string; corpo: string; perChi: string; serveDaVoi: string; }
export interface Situazione { numero: string; titolo: string; corpo: string[]; punti?: { titolo: string; testo: string }[]; }
export interface Nota { data: string; titolo: string; sommario: string; tag: string[]; }
export interface Pubblicazione { anno: string; titolo: string; descrizione: string; sede: string; metriche: string; }
```

- [ ] **Step 1: creare `src/data/servizi.ts`**

Struttura da rispettare, testi da copiare da `testi.md` sezione `/servizi`:

```ts
export interface Ingaggio {
  chiave: string;
  etichetta: string;
  nome: string;
  corpo: string[];
  perChi: string;
  durata: string;
  cosaResta: string;
}

export const ingaggi: Ingaggio[] = [
  {
    chiave: "capire",
    etichetta: "Capire",
    nome: "Mezza giornata diagnostica",
    corpo: [
      "Vengo in azienda, guardo come lavorate e faccio un po' di domande. Serve a capire se c'è qualcosa che vale la pena affrontare adesso, e a volte la conclusione è che si può rimandare.",
    ],
    perChi: "Non è chiaro da dove cominciare",
    durata: "Una mattina",
    cosaResta: "Una lista dei punti dove si perde tempo, con accanto quanto costano",
  },
  // Le altre tre — Decidere (Audit AI), Costruire (Software su misura), Mantenere (Canone
  // di servizio) — hanno la stessa forma. I testi stanno in testi.md, sezione /servizi,
  // nell'ordine in cui compaiono nella pagina.
];

export interface Domanda { domanda: string; risposta: string; link?: { testo: string; href: string }; }
export const faq: Domanda[] = [
  {
    domanda: "Dove finiscono i nostri dati?",
    risposta: "È la domanda giusta e merita più di un paragrafo: c'è una pagina intera che la spiega, comprese le cose che non posso garantirvi. In breve: i file restano vostri e nessuno li usa per addestrare niente; quello che costruisco vive su un'infrastruttura intestata a voi.",
    link: { testo: "Leggi la pagina sui dati", href: "/i-vostri-dati" },
  },
  // Le altre quattro — Quanto costa, Quanto ci vuole, Cosa serve da voi, E se poi non
  // funziona — in testi.md, sezione /servizi, sotto «Quelle che mi vengono fatte quasi sempre».
];

// Le quattro righe di testi.md, sezione /servizi, sotto «Per chi non sono».
export const perChiNonSono: string[] = [
  "Se cerchi un sito vetrina o un e-commerce, ci sono agenzie che lo fanno meglio di me e costano meno.",
  // ...le altre tre
];
```

- [ ] **Step 2: creare gli altri cinque file dati**

Stessa disciplina: interfaccia in cima, dati sotto, ogni stringa copiata da `testi.md`. `pubblicazioni.ts` contiene le **dieci** pubblicazioni della sezione `/ricerca`, non le sei attuali.

- [ ] **Step 3: aggiornare `site.ts`**

Nella sezione `it`, aggiungere le voci di menu (`Servizi, Formazione, Lavori, Ricerca, Chi sono, Note`) e le tre colonne del piè di pagina come da `testi.md`.

- [ ] **Step 4: verificare i tipi**

Run: `npm run check`
Expected: nessun errore.

- [ ] **Step 5: commit**

```bash
git add src/data
git commit -m "content: i testi italiani delle pagine nuove"
```

---

### Task 7: Nav e Footer

**Files:**
- Modify: `src/components/Nav.astro`
- Modify: `src/components/Footer.astro`
- Reference: `tavole/Main.dc.html` (menu), `tavole/Servizi.dc.html` (piè di pagina)

**Interfaces:**
- Consumes: `site` dal task 6, `localizedPath` dal task 1.
- Produces: `<Nav lang path attiva?>` dove `attiva` è la chiave della voce da sottolineare; `<Footer lang>` a quattro colonne.

- [ ] **Step 1: estendere le props di `Nav.astro`**

```astro
interface Props { lang: Locale; path: string; attiva?: string; }
const { lang, path, attiva } = Astro.props;
```

La voce con `chiave === attiva` prende `border-bottom: 2px solid var(--azione)` e `font-weight: 600`.

- [ ] **Step 2: sostituire le ancore con le rotte**

Le voci non puntano più a `#work` e `#research` ma a `/lavori`, `/ricerca`, `/servizi`, `/formazione`, `/chi-sono`, `/note`, passando sempre da `localizedPath(lang, ...)`.

- [ ] **Step 3: riscrivere `Footer.astro` a quattro colonne**

Colonna 1: nome, una frase, pulsante «Prenota mezz'ora». Colonne 2-4: *Cosa faccio* (Servizi, Formazione, Che fine fanno i vostri dati), *Le prove* (Lavori, Ricerca, Chi sono, Note), *Altrove* (LinkedIn, GitHub, Google Scholar, English site). Barra in fondo con partita IVA, Privacy, Cookie. Fondo `var(--surface-warm)`.

- [ ] **Step 4: passare `attiva` da `BaseLayout`**

Aggiungere la prop `attiva?: string` a `BaseLayout` e inoltrarla a `<Nav>`.

- [ ] **Step 5: verificare**

Run: `npm run check && npm run build`
Expected: build completata, il piè di pagina compare su `/en/`.

- [ ] **Step 6: commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro src/layouts/BaseLayout.astro
git commit -m "feat(navigazione): menu a sette voci e piè di pagina ovunque"
```

> **Gli otto rimandi contestuali fra le pagine** non stanno qui: ciascuno nasce insieme alla
> pagina che lo ospita, ai task 8-14. Sono in `testi.md` come `LINK` in fondo alla sezione a
> cui appartengono, e nella specifica §3. L'elenco, per non perderne nessuno:
> home→servizi, home→chi-sono, servizi→lavori, formazione→i-vostri-dati, lavori→servizi,
> ricerca→lavori, chi-sono→lavori, note→chi-sono.

---

### Task 8: La home italiana

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/it/Occhiello.astro`, `FasciaNumeri.astro`, `IlProblema.astro`, `ComeLavoro.astro`, `LeProve.astro`, `BloccoFormazione.astro`, `DaDoveViene.astro`, `Contatto.astro`
- Reference: `tavole/Main.dc.html`, `tavole/HomeMobile.dc.html`, `testi.md` sezione `/ — home`

**Interfaces:**
- Consumes: token e classi dal task 4, `Nav`/`Footer` dal task 7, dati dal task 6.
- Produces: la rotta `/`.

- [ ] **Step 1: l'occhiello con il titolo animato**

Il titolo va spezzato in uno `<span class="w">` per parola, con i ritardi progressivi. Non scrivere ventidue span a mano:

```astro
---
const titolo = "Aiuto le aziende a capire|dove serve|l'intelligenza artificiale e poi la costruisco.";
const [prima, marcata, dopo] = titolo.split("|");
const parole = [
  ...prima.split(" ").map((p) => ({ testo: p, marker: false })),
  { testo: marcata, marker: true },
  ...dopo.split(" ").map((p) => ({ testo: p, marker: false })),
];
---
<h1>
  {parole.map((p, i) => (
    <span class:list={["w", { marker: p.marker }]} style={`animation-delay: ${0.22 + i * 0.06}s`}>{p.testo}</span>
  ))}
</h1>
```

- [ ] **Step 2: le altre sette fasce**

Ogni fascia è un `<section>` (serve al selettore di entrata del task 4) con dentro un `.container`. Struttura, misure e testi dalla tavola e da `testi.md`.

- [ ] **Step 3: comporre la pagina**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Occhiello from '../components/it/Occhiello.astro';
// ...le altre sette
---
<BaseLayout title="Alessandro Flaborea — consulenza e formazione sull'intelligenza artificiale"
            description="Aiuto le aziende a capire dove serve l'intelligenza artificiale e poi la costruisco."
            lang="it" path="/" detectLocale={true} person={true}>
  <Occhiello />
  <FasciaNumeri />
  <IlProblema />
  <ComeLavoro />
  <LeProve />
  <BloccoFormazione />
  <DaDoveViene />
  <Contatto />
</BaseLayout>
```

- [ ] **Step 4: verificare a due larghezze**

Run: `npm run build && npm run preview`
Expected: `/` è la home italiana. Confrontare con `tavole/Main.dc.html` a 1440px e con `tavole/HomeMobile.dc.html` a 390px. Nessuno scorrimento orizzontale.

- [ ] **Step 5: commit**

```bash
git add src/pages/index.astro src/components/it
git commit -m "feat(home): la pagina del compratore"
```

---

### Task 9: /servizi con il FAQ

**Files:**
- Create: `src/pages/servizi.astro`
- Create: `src/components/it/SchedaIngaggio.astro`, `src/components/it/Faq.astro`
- Reference: `tavole/Servizi.dc.html`, `testi.md` sezione `/servizi`

**Interfaces:**
- Consumes: `ingaggi`, `faq`, `perChiNonSono` dal task 6.
- Produces: la rotta `/servizi`.

- [ ] **Step 1: `SchedaIngaggio.astro`**

Griglia a due colonne `minmax(0, 1.4fr) minmax(0, 1fr)`, colonna destra separata da `border-left: 1px solid var(--border)` con le tre voci *Per chi*, *Quanto dura*, *Cosa resta*. Classe `.scheda` per il sollevamento.

- [ ] **Step 2: `Faq.astro`**

Cinque righe, griglia `minmax(0, 0.85fr) minmax(0, 1.15fr)`, filetto sopra ciascuna. La prima porta a `/i-vostri-dati`.

- [ ] **Step 3: comporre la pagina** con occhiello, le quattro schede, «per chi non sono», il FAQ e «come si comincia».

- [ ] **Step 4: verificare**

Run: `npm run build`
Expected: `dist/servizi/index.html` esiste; nessuna cifra di prezzo nel file (`grep -cE '[0-9]+ ?€' dist/servizi/index.html` → `0`).

- [ ] **Step 5: commit**

```bash
git add src/pages/servizi.astro src/components/it
git commit -m "feat(servizi): i quattro ingaggi e le domande frequenti"
```

---

### Task 10: /formazione

**Files:**
- Create: `src/pages/formazione.astro`
- Reference: `tavole/Formazione.dc.html`, `testi.md` sezione `/formazione`

**Interfaces:**
- Consumes: `formati` dal task 6.
- Produces: la rotta `/formazione`.

- [ ] **Step 1: il riquadro sull'AI Act**

Fondo bianco, `border-left: 3px solid var(--accent)`, con il rimando a `/i-vostri-dati`. Il testo è quello di `testi.md`: **niente sanzioni, niente allarmismo.**

- [ ] **Step 2: i tre formati, le tre strade, la credenziale d'aula, «che cosa questo corso non è».**

- [ ] **Step 3: verificare**

Run: `npm run build`
Expected: `dist/formazione/index.html` esiste e contiene «4 ore», «8-12 ore», «Durata concordata».

- [ ] **Step 4: commit**

```bash
git add src/pages/formazione.astro
git commit -m "feat(formazione): ore dichiarate e le tre strade"
```

---

### Task 11: /lavori, i case study italiani e le date sbagliate

**Files:**
- Modify: `src/data/projects.ts` (date, tempi verbali, due progetti nuovi, tag senza tecnologie)
- Create: `src/pages/lavori/index.astro`, `src/pages/lavori/[slug].astro`
- Reference: `tavole/Lavori.dc.html`, `testi.md` sezione `/lavori`

**Interfaces:**
- Consumes: `projects`, `getProject` da `src/data/projects.ts`.
- Produces: rotte `/lavori` e `/lavori/[slug]`; il campo nuovo `tagIt: string[]` su `Project`.

- [ ] **Step 1: correggere le date verificate contro `~/cv/content/en.yaml`**

- `procedo`: `year` da `"2023–Present"` a `"2024–2026"`; nel testo italiano il ruolo va al passato e si aggiunge l'incarico di advisor.
- `homesweathome`: `year` da `"2022"` a `"2021–2023"`.

- [ ] **Step 2: aggiungere i due progetti mancanti**

`portale-ricambi` (ordine 2, area «Meccanica · commessa reale») e `tire-hub` (area «Automotive · gestionale»), con i testi di `testi.md`. La scheda di Tire Hub deve dire che nasce da un'iniziativa e non da una commessa.

- [ ] **Step 3: aggiungere `tagIt` a `Project`**

```ts
export interface Project {
  // ...campi esistenti
  /** Etichette italiane: cosa fa la cosa e a che punto è. Mai nomi di tecnologie. */
  tagIt: string[];
}
```

Popolarlo per tutti i progetti con i valori di `testi.md`. **`stack` resta invariato**: serve al lato inglese.

- [ ] **Step 4: la pagina elenco**

Due gruppi, *Software per le aziende* e *Prodotti e strumenti miei*, righe con classe `.riga`.

- [ ] **Step 5: i case study italiani** in `src/pages/lavori/[slug].astro`, gemelli di `en/work/[slug].astro` ma con `project.it` e `tagIt`.

- [ ] **Step 6: verificare**

Run: `npm run build`
Expected: dodici righe in `dist/lavori/index.html`; `grep -c 'Supabase' dist/lavori/index.html` → `0`; `grep -c 'Supabase' dist/en/work/spannum/index.html` → maggiore di `0`.

- [ ] **Step 7: commit**

```bash
git add src/data/projects.ts src/pages/lavori
git commit -m "feat(lavori): dodici progetti, date corrette, tag senza stack"
```

---

### Task 12: /ricerca con le dieci pubblicazioni

**Files:**
- Create: `src/pages/ricerca.astro`
- Modify: `src/components/Research.astro` (resta al lato inglese, invariato)
- Reference: `tavole/Ricerca.dc.html`, `testi.md` sezione `/ricerca`

**Interfaces:**
- Consumes: `pubblicazioni` dal task 6.
- Produces: la rotta `/ricerca`.

- [ ] **Step 1: la fascia dei numeri** — 10 · 533 · 3 · 1, con «citazioni, ad agosto 2026» sotto il secondo.

- [ ] **Step 2: il riquadro «cosa c'entra con la tua azienda»**, che è il pezzo che giustifica la pagina per un lettore non accademico. Testo verbatim da `testi.md`.

- [ ] **Step 3: l'elenco delle dieci pubblicazioni**, dalla più recente, con anno, titolo, descrizione in italiano, sede e metriche.

- [ ] **Step 4: verificare**

Run: `npm run build`
Expected: `grep -c 'Best Paper' dist/ricerca/index.html` maggiore di `0`; dieci titoli presenti.

- [ ] **Step 5: commit**

```bash
git add src/pages/ricerca.astro src/data/pubblicazioni.ts
git commit -m "feat(ricerca): dieci pubblicazioni, citazioni e Best Paper"
```

---

### Task 13: /chi-sono e /i-vostri-dati

**Files:**
- Create: `src/pages/chi-sono.astro`, `src/pages/i-vostri-dati.astro`
- Reference: `tavole/ChiSono.dc.html`, `tavole/Dati.dc.html`

**Interfaces:**
- Consumes: `chiSono`, `situazioniDati` dal task 6.
- Produces: le rotte `/chi-sono` e `/i-vostri-dati`.

- [ ] **Step 1: il riquadro della foto**

Finché la fotografia non c'è, resta il segnaposto tratteggiato della tavola, **visibilmente un segnaposto**: `background: #efece7`, `border: 1px dashed #b9b1a4`, con dentro la nota su che foto serve. Non mettere un'immagine finta.

- [ ] **Step 2: `/chi-sono`** — colonna sinistra con foto e «in breve», colonna destra con la biografia, poi «abitudini che vale la pena sapere prima».

- [ ] **Step 3: `/i-vostri-dati`** — la risposta corta su fondo blu, le tre situazioni numerate, «quello che non posso garantirvi», «su questo ho lavorato davvero», il rimando alla formazione.

- [ ] **Step 4: verificare**

Run: `npm run build`
Expected: entrambe le rotte esistono; `/i-vostri-dati` è raggiungibile dal piè di pagina di ogni pagina (`grep -c 'i-vostri-dati' dist/servizi/index.html` maggiore di `0`).

- [ ] **Step 5: commit**

```bash
git add src/pages/chi-sono.astro src/pages/i-vostri-dati.astro
git commit -m "feat: chi sono e la pagina sulla riservatezza"
```

---

### Task 14: /note con RSS

**Files:**
- Create: `src/pages/note.astro`, `src/pages/rss.xml.ts`
- Modify: `package.json` (`@astrojs/rss`)
- Reference: `tavole/Note.dc.html`

**Interfaces:**
- Consumes: `note` dal task 6.
- Produces: la rotta `/note` e il feed `/rss.xml`.

- [ ] **Step 1: installare il pacchetto**

```bash
npm install @astrojs/rss
```

- [ ] **Step 2: l'elenco degli articoli** — righe con classe `.riga`, data a sinistra su colonna da 130px, titolo, sommario, tag.

- [ ] **Step 3: il feed**

```ts
import rss from "@astrojs/rss";
import { note } from "../data/note";

export function GET(context: { site: URL }) {
  return rss({
    title: "Note — Alessandro Flaborea",
    description: "Quello che imparo mentre lo imparo.",
    site: context.site,
    items: note.map((n) => ({ title: n.titolo, description: n.sommario, pubDate: new Date(n.data), link: "/note" })),
  });
}
```

- [ ] **Step 4: il riquadro della raccolta email**

Resta **inerte** finché non è scelto un servizio (§9 della specifica). Il campo e il pulsante si disegnano, il `form` non ha `action`.

- [ ] **Step 5: verificare**

Run: `npm run build`
Expected: `dist/rss.xml` esiste e contiene sei elementi.

- [ ] **Step 6: commit**

```bash
git add package.json package-lock.json src/pages/note.astro src/pages/rss.xml.ts
git commit -m "feat(note): elenco degli articoli e feed RSS"
```

---

### Task 15: Il controllo delle rotte

Rete di sicurezza automatica: verifica che ogni rotta prevista esista, che nessuna pagina italiana dichiari un canonico inglese, e che i rimandi non puntino nel vuoto.

**Files:**
- Create: `scripts/verifica-rotte.mjs`
- Modify: `package.json` (script `verifica`)

**Interfaces:**
- Consumes: la cartella `dist/` prodotta da `npm run build`.
- Produces: `npm run verifica` che esce con codice 1 quando qualcosa manca.

- [ ] **Step 1: scrivere lo script**

```js
import { readFileSync, existsSync } from "node:fs";

const ROTTE = [
  "index", "servizi", "formazione", "lavori", "ricerca",
  "chi-sono", "i-vostri-dati", "note", "en",
];

let errori = 0;
const dice = (m) => { console.error("✗ " + m); errori++; };

for (const r of ROTTE) {
  const f = r === "index" ? "dist/index.html" : `dist/${r}/index.html`;
  if (!existsSync(f)) { dice(`manca la rotta /${r === "index" ? "" : r}`); continue; }
  const html = readFileSync(f, "utf8");
  if (html.includes("flaborea.com")) dice(`${f} nomina un dominio che non esiste`);
  if (r !== "en" && /hreflang="it" href="[^"]*\/it\//.test(html)) dice(`${f} punta ancora a /it/`);
}

if (!existsSync("dist/rss.xml")) dice("manca il feed RSS");
if (existsSync("dist/CNAME")) dice("il CNAME è tornato: il dominio non è ancora comprato");

console.log(errori === 0 ? "✓ tutte le rotte a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
```

- [ ] **Step 2: aggiungere lo script**

In `package.json`, dentro `"scripts"`:

```json
"verifica": "npm run build && node scripts/verifica-rotte.mjs"
```

- [ ] **Step 3: farlo girare**

Run: `npm run verifica`
Expected: `✓ tutte le rotte a posto`, uscita 0.

- [ ] **Step 4: commit**

```bash
git add scripts/verifica-rotte.mjs package.json
git commit -m "chore: controllo automatico delle rotte"
```

---

## Cosa resta fuori, e perché

Dalla §9 della specifica, nessuno di questi elementi è deciso e **nessuno va inventato durante l'implementazione**: modulo di contatto, prenotazione a calendario, WhatsApp, raccolta email, pagine privacy e cookie, il PDF del curriculum. Nelle pagine si disegnano ma restano inerti — un `form` senza `action`, un link con `href="#"` — e si aprono come lavoro successivo quando le scelte saranno prese.

**Una contraddizione della specifica, risolta qui.** La §8 osserva che il componente
inglese `Research.astro` elenca sei pubblicazioni invece di dieci e non riporta né le
citazioni né il Best Paper Award; la §10 dice però di non toccare il lato inglese. Vince la
§10: l'inglese resta a sei paper. È una perdita reale e consapevole, da recuperare in un
lavoro successivo dedicato al portfolio internazionale.

Restano aperte anche le sette domande in fondo alla specifica. Due bloccano la pubblicazione:

1. **Il dominio.** Il task 2 riporta il canonico su `aleflabo.github.io`. Quando `flaborea.com` è comprato e puntato, si rimette `site` e si ricrea `public/CNAME` — in quest'ordine, mai al contrario.
2. **La fotografia.** Il task 13 lascia un segnaposto dichiarato. Va sostituita prima di far vedere il sito a qualcuno.
