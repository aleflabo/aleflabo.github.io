# Il sito inglese — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** dare al lato inglese le stesse sette pagine dell'italiano, così che il selettore di lingua funzioni ovunque e chi passa a EN non atterri sul sito vecchio.

**Architecture:** il markup diventa condiviso e riceve i testi come proprietà, invece di importare i dati italiani; i testi inglesi vivono in `src/data/en/`, gemelli dei file italiani e con le stesse interfacce. Nessuna pagina italiana cambia aspetto: la parametrizzazione è un refactor a comportamento invariato, verificato confrontando l'HTML prima e dopo.

**Tech Stack:** Astro 5 statico, TypeScript, CSS a mano con token, Vitest, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-25-sito-italiano-design.md` per l'impianto, e **`docs/superpowers/specs/2026-08-25-sito-italiano/testi-en.md` per ogni parola inglese** (1906 righe, 108 blocchi marcati).

## Global Constraints

- **Il copy inglese si copia da `testi-en.md`, non si scrive.** Ogni blocco è marcato `[RIUSATO]` (inglese suo, verbatim), `[TRADOTTO]` (dall'italiano approvato) o `[DA SCRIVERE]`. **Se un testo non è lì, fermarsi e chiedere.** Durante la costruzione del sito italiano ci sono stati **cinque** incidenti di copy inventato o omesso: è il difetto più costoso di questo progetto.
- **I sette blocchi `[DA SCRIVERE]` restano non scritti.** Non inventarli, non tradurli da qualcosa di simile. Dove manca il testo, la sezione si omette (Ruling K del progetto italiano: quando la fonte non basta, si accorcia la struttura, non si allunga la fonte).
- **Nessuna pagina italiana deve cambiare aspetto.** Le pagine italiane sono in produzione da oggi. Ogni task che tocca un componente condiviso confronta l'HTML italiano prima e dopo.
- **Misure e struttura**: le tavole in `docs/superpowers/specs/2026-08-25-sito-italiano/tavole/`. Il layout inglese è identico all'italiano.
- **Caratteri da `@fontsource-variable`**, mai un link a fonts.googleapis.com.
- I token e le classi di movimento esistono già in `tokens.css` e `global.css`: non ridefinirli.
- **Ogni task chiude con un commit** sul ramo `sito-inglese`. Nessuna push, nessuna PR: le fa il controllore.
- `npm run check`, `npm test` e `npm run verifica` devono passare alla fine di ogni task.

## Decisioni già prese, da eseguire senza rimetterle in discussione

1. **La biografia inglese esistente è superata e non si usa.** `site.ts` `en.about.body` dice al presente che guida la tecnologia di Procedo; non è vero da luglio 2026 ed è la stessa correzione già fatta in italiano. Si usa la biografia tradotta dall'italiano, che è aggiornata. La vecchia si cancella, non si affianca.
2. **L'occhiello inglese è quello tradotto dall'italiano**, non il vecchio «From research to product». La parità serve a far combaciare i due siti: se l'inglese tiene il posizionamento da portfolio, il selettore di lingua porta a un sito diverso.
3. **`portale-ricambi` e `tire-hub` restano fuori dalle rotte inglesi** (`soloItaliano: true`), perché il loro inglese non esiste ancora. **I loro campi `en` attuali vanno svuotati**: sono testo inventato da un implementatore, e lasciarlo lì è una trappola per il prossimo che passa. L'elenco inglese mostra dieci voci, l'italiano dodici: asimmetria dichiarata, non dimenticanza.
4. **I contenuti troppo italiani si traducono fedelmente e restano.** Fondi interprofessionali, enti accreditati, AI Act, «vengo in azienda»: tagliarli richiederebbe scrivere inglese sostitutivo che non esiste, e sarebbe invenzione. Le note del deck restano come lavoro successivo per il committente.
5. **Un solo feed RSS**, `/rss.xml`. Le note sono articoli italiani: `/en/notes` lo dichiara e punta allo stesso feed.
6. **`projects.ts.name` resta un campo unico.** Gli unici nomi italiani sono quelli dei due progetti esclusi dall'inglese, quindi il problema non si presenta.

---

### Task 1: La testata di pagina, una volta sola

Sei pagine italiane ripetono lo stesso blocco d'apertura — occhiello, titolo, filetto, introduzione — con il proprio `@media`. La revisione finale l'ha segnalato. Prima di duplicarlo altre sei volte per l'inglese, diventa un componente.

**Files:**
- Create: `src/components/TestataPagina.astro`
- Modify: `src/pages/servizi.astro`, `formazione.astro`, `ricerca.astro`, `chi-sono.astro`, `i-vostri-dati.astro`, `note.astro`, `lavori/index.astro`

**Interfaces:**
- Produces: `<TestataPagina occhiello titolo introduzione />` — `occhiello: string`, `titolo: string`, `introduzione: string`. Rende `<p class="label">`, `<h1>`, `<div class="divider">`, `<p class="intro">`.

- [ ] **Step 1: leggere le sette testate esistenti**

Apri i sette file e confronta i blocchi d'apertura. Annota **ogni** differenza di misura: alcune sono volute (vengono dalle tavole), altre sono deriva. Il componente deve riprodurre il caso maggioritario.

Run: `grep -n 'class="label"' src/pages/*.astro src/pages/lavori/index.astro`

- [ ] **Step 2: creare il componente**

```astro
---
interface Props { occhiello: string; titolo: string; introduzione: string; }
const { occhiello, titolo, introduzione } = Astro.props;
---
<div class="testata">
  <p class="label">{occhiello}</p>
  <h1>{titolo}</h1>
  <div class="divider"></div>
  <p class="intro">{introduzione}</p>
</div>
```

Lo `<style>` porta le misure che oggi stanno nelle pagine, comprese quelle del `@media`.

- [ ] **Step 3: catturare l'HTML italiano PRIMA della sostituzione**

```bash
npm run build
for p in servizi formazione ricerca chi-sono i-vostri-dati note lavori; do
  cp dist/$p/index.html /tmp/prima-$p.html
done
```

- [ ] **Step 4: sostituire nelle sette pagine**

Una pagina alla volta. Ogni pagina passa le proprie tre stringhe, che **restano quelle di `testi.md`**.

- [ ] **Step 5: verificare che l'italiano non sia cambiato**

```bash
npm run build
for p in servizi formazione ricerca chi-sono i-vostri-dati note lavori; do
  diff <(sed 's/data-astro-cid-[a-z0-9]*//g' /tmp/prima-$p.html) \
       <(sed 's/data-astro-cid-[a-z0-9]*//g' dist/$p/index.html) > /dev/null \
    && echo "$p: identico" || echo "$p: DIVERSO — controllare"
done
```

Expected: sette «identico». Gli identificatori di scope cambiano ed è normale: per questo il `sed` li toglie. **Se una pagina risulta diversa, guarda il diff e capisci perché prima di proseguire** — potrebbe essere una deriva di misura che il componente ha normalizzato, e in quel caso va bene, ma va vista.

- [ ] **Step 6: commit**

```bash
git add src/components/TestataPagina.astro src/pages
git commit -m "refactor: la testata di pagina diventa un componente"
```

---

### Task 2: I componenti della home ricevono i testi

Gli otto componenti in `src/components/it/` importano i dati italiani. Per servire anche l'inglese devono riceverli.

**Files:**
- Move: `src/components/it/*.astro` → `src/components/sezioni/`
- Modify: gli otto componenti, `src/pages/index.astro`

**Interfaces:**
- Produces: otto componenti che prendono il contenuto via props. Le firme esatte le definisci tu leggendo ciascun componente, ma **il criterio è: nessun `import` da `src/data/` dentro un componente di sezione**.

- [ ] **Step 1: catturare la home italiana PRIMA**

```bash
npm run build && cp dist/index.html /tmp/prima-home.html
```

- [ ] **Step 2: spostare la cartella**

```bash
git mv src/components/it src/components/sezioni
```

Correggi gli import in `src/pages/index.astro`.

- [ ] **Step 3: parametrizzare, un componente alla volta**

Per ciascuno: sposta l'`import` dei dati dal componente alla pagina, e passa il contenuto come prop. Dopo ogni componente, `npm run check`.

Esempio con `IlProblema.astro`, che oggi importa i propri dati:

```astro
---
// prima
import { problemi } from '../../data/home';
---
```

diventa

```astro
---
// dopo
interface Props {
  occhiello: string;
  titolo: string;
  riquadri: { citazione: string; corpo: string }[];
}
const { occhiello, titolo, riquadri } = Astro.props;
---
```

e la pagina passa `<IlProblema occhiello={...} titolo={...} riquadri={...} />`.

**Alla fine dello step, scrivi nel rapporto la firma di tutti e otto i componenti**: il task 3 deve costruire `src/data/en/home.ts` in quella forma esatta, e senza le firme dovrebbe indovinarle.

Attenzione a `Occhiello.astro`: il titolo è spezzato parola per parola con lo `<span class="marker">` annidato. **Quella struttura non si tocca** — un difetto reale ci è costato un giro di correzioni. La stringa del titolo arriva come prop nella stessa forma con la barra verticale (`"…a capire|dove serve|l'intelligenza…"`), e la logica di spezzatura resta nel componente.

- [ ] **Step 4: verificare che la home italiana non sia cambiata**

```bash
npm run build
diff <(sed 's/data-astro-cid-[a-z0-9]*//g' /tmp/prima-home.html) \
     <(sed 's/data-astro-cid-[a-z0-9]*//g' dist/index.html) && echo "home: identica"
```

Expected: nessuna differenza.

- [ ] **Step 5: commit**

```bash
git add -A
git commit -m "refactor: i componenti di sezione ricevono i testi come proprietà"
```

---

### Task 3: I dati inglesi

**Files:**
- Create: `src/data/en/servizi.ts`, `formazione.ts`, `dati.ts`, `note.ts`, `chiSono.ts`, `pubblicazioni.ts`, `home.ts`
- Modify: `src/data/site.ts` (sezione `en`: `menu`, `piePagina`, `prenotaMezzora`)
- Source: `docs/superpowers/specs/2026-08-25-sito-italiano/testi-en.md`

**Interfaces:**
- Consumes: le interfacce già definite nei file italiani (`Ingaggio`, `Domanda`, `Formato`, `Situazione`, `Nota`, `Pubblicazione`). **Importale, non ridichiararle.**
- Produces: gli stessi nomi di export dei file italiani.

- [ ] **Step 1: creare i sei file gemelli**

Ogni file importa il proprio tipo dal gemello italiano:

```ts
import type { Ingaggio, Domanda } from "../servizi";

export const ingaggi: Ingaggio[] = [
  {
    chiave: "understand",
    etichetta: "Understand",
    nome: "A diagnostic half-day",
    corpo: [
      "I come to your company, watch how you work and ask a few questions. It's there to work out whether there's something worth taking on now, and sometimes the conclusion is that it can wait.",
    ],
    perChi: "It isn't clear where to start",
    durata: "One morning",
    cosaResta: "A list of the places where time is lost, with what they cost written next to them",
  },
  // Decide, Build, Maintain: stessa forma, testi in testi-en.md
];
```

**Ogni stringa esce da `testi-en.md`.** Se un blocco è marcato `[DA SCRIVERE]`, il campo resta stringa vuota e la pagina salterà la sezione.

- [ ] **Step 2: `home.ts`** con il contenuto delle sette fasce della home inglese, nella forma che i componenti parametrizzati del task 2 si aspettano.

- [ ] **Step 3: aggiungere `menu`, `piePagina` e `prenotaMezzora` alla sezione `en` di `site.ts`**, con le etichette inglesi di `testi-en.md`. **Non toccare la sezione `it`.**

- [ ] **Step 4: verificare i tipi**

Run: `npm run check`
Expected: 0 errori.

- [ ] **Step 5: commit**

```bash
git add src/data
git commit -m "content: i testi inglesi delle sette pagine"
```

---

### Task 4: Ripulire i due blocchi inglesi non approvati

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: svuotare i campi `en` di `portale-ricambi` e `tire-hub`**

`area`, `summary`, `problem`, `approach`, `result` diventano stringa vuota. `soloItaliano: true` **resta**. Aggiungi un commento che dica perché: quel testo era inventato e mai approvato, e i due progetti rientreranno nell'inglese quando il committente lo scriverà.

- [ ] **Step 2: verificare che l'inglese non li mostri e l'italiano sì**

```bash
npm run build
ls dist/en/work/ | wc -l          # 8
ls dist/lavori/ | grep -c index   # le rotte italiane restano 10 + index
```

- [ ] **Step 3: commit**

```bash
git add src/data/projects.ts
git commit -m "fix(projects): via il testo inglese mai approvato dei due progetti nuovi"
```

---

### Task 5: La home inglese

**Files:**
- Modify: `src/pages/en/index.astro` (riscritta con le sette fasce)
- Reference: `tavole/Main.dc.html`, `testi-en.md` sezioni «Fascia d'apertura» → «Parliamone»

**Interfaces:**
- Consumes: i componenti parametrizzati del task 2, `src/data/en/home.ts`.

- [ ] **Step 1: comporre la pagina** con gli stessi otto componenti della home italiana, alimentati dai dati inglesi. `lang="en"`, `path="/"`, `pathIt="/"`, `person={true}`. **Niente `detectLocale`**: sta sulla home italiana.

- [ ] **Step 2: la sezione del contatto deve avere `id="parliamone"`**, perché menu e piè di pagina inglesi ci puntano come in italiano.

- [ ] **Step 3: verificare**

```bash
npm run build
grep -c 'id="parliamone"' dist/en/index.html    # 1
```

Più gli scatti a 1440 e 390 (vedi «Verifica visiva» in fondo).

- [ ] **Step 4: commit**

```bash
git add src/pages/en/index.astro
git commit -m "feat(en): la home inglese"
```

---

### Task 6: /en/services e /en/training

**Files:**
- Create: `src/pages/en/services.astro`, `src/pages/en/training.astro`
- Reference: `tavole/Servizi.dc.html`, `tavole/Formazione.dc.html`, `testi-en.md`

- [ ] **Step 1: `/en/services`** — gemella di `src/pages/servizi.astro`, con `TestataPagina`, i quattro ingaggi da `src/data/en/servizi.ts`, «Who I'm not for» e il FAQ. `attiva="services"`.
- [ ] **Step 2: `/en/training`** — gemella di `formazione.astro`. Il riquadro sull'AI Act mantiene il tono di fatto: **niente sanzioni, niente allarmismo**, come in italiano.
- [ ] **Step 3: verificare** — le due rotte esistono, nessuna cifra in valuta su `/en/services`.

```bash
npm run build && grep -cE '[0-9]+ ?(€|EUR)' dist/en/services/index.html   # 0
```

- [ ] **Step 4: commit**

```bash
git add src/pages/en
git commit -m "feat(en): servizi e formazione"
```

---

### Task 7: /en/work e i case study inglesi

**Files:**
- Create: `src/pages/en/work/index.astro`
- Modify: `src/pages/en/work/[slug].astro` (aggiunta di `attiva`, dell'anno formattato e del collegamento di ritorno allineato)
- Reference: `tavole/Lavori.dc.html`, `testi-en.md`

- [ ] **Step 1: l'elenco**, due gruppi come in italiano — *Software for companies* e *My own products and tools* — con **dieci** voci: i due esclusi non compaiono.
- [ ] **Step 2: i tag inglesi.** In italiano i tag dicono cosa fa la cosa e a che punto è, senza nomi di tecnologie. **Sul lato inglese lo stack RESTA**: lì il lettore cerca proprio quelle parole. Usa `project.stack`, non `tagIt`.
- [ ] **Step 3: allineare `[slug].astro`** — `attiva="work"`, l'anno passato dall'helper `src/lib/anno.ts`. **Aggiungi al file una funzione che si chiama `annoEn`** e restituisce la forma inglese («2024–present», non «2024–oggi»); `annoIt` non si tocca, la usa il lato italiano in produzione, collegamento di ritorno coerente col titolo dell'elenco.
- [ ] **Step 4: verificare**

```bash
npm run build
ls dist/en/work/ | grep -v index.html | wc -l   # 8 case study
grep -c 'Supabase' dist/en/work/spannum/index.html   # maggiore di 0
```

- [ ] **Step 5: commit**

```bash
git add src/pages/en/work src/lib/anno.ts
git commit -m "feat(en): elenco dei lavori e case study allineati"
```

---

### Task 8: /en/research, /en/about, /en/your-data, /en/notes

**Files:**
- Create: `src/pages/en/research.astro`, `about.astro`, `your-data.astro`, `notes.astro`
- Reference: le tavole corrispondenti e `testi-en.md`

- [ ] **Step 1: `/en/research`** — le dieci pubblicazioni da `src/data/en/pubblicazioni.ts`, la fascia 10 · 533 · 3 · 1, e il riquadro «What this has to do with your company», che è il pezzo che giustifica la pagina.
- [ ] **Step 2: `/en/about`** — **la biografia tradotta dall'italiano**, non la vecchia `en.about.body`. Il riquadro della foto resta un segnaposto dichiarato, in inglese.
- [ ] **Step 3: `/en/your-data`** — le tre situazioni e «What I can't promise you», che è la sezione che rende credibile il resto: intera e non attenuata.
- [ ] **Step 4: `/en/notes`** — i sei articoli con titoli e sommari tradotti. La pagina **dichiara che gli articoli sono in italiano** e punta a `/rss.xml`, il feed unico. Il riquadro dell'iscrizione resta inerte: `<form>` senza `action`, `onsubmit="return false"`, pulsante disattivato, come in italiano.
- [ ] **Step 5: verificare** — le quattro rotte esistono; `grep -c 'Best Paper' dist/en/research/index.html` maggiore di 0.
- [ ] **Step 6: commit**

```bash
git add src/pages/en
git commit -m "feat(en): ricerca, chi sono, dati e note"
```

---

### Task 9: Il selettore di lingua su tutte le coppie

Adesso che le gemelle esistono, il selettore torna ovunque.

**Files:**
- Modify: `src/components/Nav.astro`, `src/components/Footer.astro`, tutte le pagine (aggiunta di `pathEn` / `pathIt`)

**Interfaces:**
- Consumes: `pathEn?: string` e `pathIt?: string` su `BaseLayout`, già esistenti.

- [ ] **Step 1: mappare le coppie.** Sette coppie di pagine più i case study:

| Italiano | Inglese |
|---|---|
| `/` | `/en/` |
| `/servizi` | `/en/services` |
| `/formazione` | `/en/training` |
| `/lavori` | `/en/work` |
| `/lavori/[slug]` | `/en/work/[slug]` — **solo se il progetto non è `soloItaliano`** |
| `/ricerca` | `/en/research` |
| `/chi-sono` | `/en/about` |
| `/i-vostri-dati` | `/en/your-data` |
| `/note` | `/en/notes` |

- [ ] **Step 2: passare `pathEn` su ogni pagina italiana e `pathIt` su ogni pagina inglese.**
- [ ] **Step 3: le due eccezioni.** I case study di `portale-ricambi` e `tire-hub` **non** ricevono `pathEn`: la gemella inglese non esiste. È il difetto che ha causato 404 su diciassette pagine nel progetto italiano — non ripeterlo al contrario.
- [ ] **Step 4: le voci di menu inglesi** puntano alle rotte inglesi, dalla sezione `en` di `site.ts`.
- [ ] **Step 5: verificare che nessun `hreflang` porti a un 404** — lo fa lo script del task 10.
- [ ] **Step 6: commit**

```bash
git add -A
git commit -m "feat(i18n): il selettore di lingua su tutte le coppie"
```

---

### Task 10: La rete di sicurezza conosce anche l'inglese

**Files:**
- Modify: `scripts/verifica-rotte.mjs`

- [ ] **Step 1: estendere l'elenco delle rotte**

```js
const ROTTE = [
  "index", "servizi", "formazione", "lavori", "ricerca",
  "chi-sono", "i-vostri-dati", "note",
  "en", "en/services", "en/training", "en/work",
  "en/research", "en/about", "en/your-data", "en/notes",
];
```

- [ ] **Step 2: aggiungere il controllo che è mancato al progetto italiano.** Per ogni pagina, se dichiara `<link rel="alternate" hreflang="...">`, **il file di destinazione deve esistere**. È il difetto che ha prodotto 404 su diciassette pagine: la rete deve conoscerlo.

- [ ] **Step 3: provarlo nei due sensi**

Sul sito integro: uscita 0. Poi introduci temporaneamente un `pathEn` verso una rotta inesistente, ricostruisci, verifica che segnali e esca con 1, e **togli la modifica**.

- [ ] **Step 4: commit**

```bash
git add scripts/verifica-rotte.mjs
git commit -m "chore(verifica): controlla anche le rotte inglesi e gli alternate"
```

---

### Task 11: Togliere quello che non serve più

Dopo il task 5 la home inglese non usa più i componenti della vecchia pagina unica, e la sezione `en` di `site.ts` porta campi che non rende più nessuno. La revisione finale del progetto italiano aveva segnalato lo stesso problema sul lato `it`: novanta righe di copy morto che contraddiceva il sito vivo. Non lasciamolo succedere due volte.

**Files:**
- Delete: i componenti della vecchia home inglese ormai orfani
- Modify: `src/data/site.ts`

- [ ] **Step 1: trovare gli orfani davvero**

```bash
for c in Hero Services WorkList Research About Contact WorkRow StackChip LangSwitch; do
  n=$(grep -rl "components/$c" src --include=*.astro | wc -l)
  echo "$c: $n riferimenti"
done
```

**Cancella solo quelli a zero riferimenti.** `LangSwitch` e `StackChip` quasi certamente servono ancora: guarda il numero, non la memoria.

- [ ] **Step 2: trovare i campi morti di `site.ts`**

```bash
for k in hero servicesTitle servicesLabel services workTitle workLiveLabel workCodeLabel workSeeMore caseStudy research about nav; do
  n=$(grep -rn "site\.\(en\|it\)\.$k\|\.$k" src --include=*.astro | grep -v "data/site.ts" | wc -l)
  printf "%-16s %s usi
" "$k" "$n"
done
```

- [ ] **Step 3: cancellare i campi a zero usi da entrambe le sezioni**, e con loro le voci dell'interfaccia `SiteCopy` che restano senza riscontro. Se un campo è usato da una lingua sola, **resta**: annota quale.

- [ ] **Step 4: verificare che non si sia rotto niente**

```bash
npm run check && npm run verifica && npm test
```

Expected: 0 errori, uscita 0, 3/3.

- [ ] **Step 5: commit**

```bash
git add -A
git commit -m "chore: via i componenti orfani e il copy morto in site.ts"
```

---

## Verifica visiva, obbligatoria su ogni pagina nuova

Un Chromium autonomo è già installato. Per ogni rotta costruita:

```bash
cd /home/aleflabo/aleflabo.github.io && npm run build
(python3 -m http.server 8905 --directory dist &)
cd /tmp/claude-1000/-home-aleflabo-paesello/76d0a886-2450-4e32-9ca1-60bdbf3598e1/scratchpad/shot
sed -i 's|http://[^/]*|http://127.0.0.1:8905|' scatta.mjs
node scatta.mjs http://127.0.0.1:8905/en/services/ en-services-1440.png 1440 900
node scatta.mjs http://127.0.0.1:8905/en/services/ en-services-390.png 390 844
```

Lo script stampa `scrollWidth/clientWidth`: se differiscono c'è scorrimento orizzontale ed è un difetto. **Guardare anche le immagini**, non solo i numeri: nel progetto italiano il controllo statico aveva dichiarato corretto un evidenziatore che non compariva.

## Cosa resta fuori

I sette blocchi `[DA SCRIVERE]`: partita IVA nel piè di pagina, pagine Privacy e Cookies, l'approccio del portale ricambi, il risultato di Tire Hub, i case study di Paesello e del video, e il testo delle sei note. Restano vuoti finché il committente non li scrive.

Restano fuori anche le sette note del deck sui contenuti che stonano fuori d'Italia — fondi interprofessionali, enti accreditati, presenza fisica, formule contrattuali. Sono in fondo a `testi-en.md`, sezione per sezione, e sono una decisione editoriale del committente, non un difetto da correggere.
