# La home, più visuale — progetto

3 settembre 2026. Committente: Alessandro Flaborea. Stato: **approvato nella
struttura, in attesa di undici stringhe e di una riga sul patto Procedo.**

## Dove sta questo design, e come si rigenera

Tre copie, apposta, perché nessuna delle tre basta da sola:

| Copia | Percorso | A cosa serve | Fragilità |
|---|---|---|---|
| Sorgente | `2026-09-03-home-visuale/tavole/*.dc.html` | La verità. Si modifica solo qui. | Non si apre da sola: manca `support.js`, che inietta l'editor. |
| Anteprima | `2026-09-03-home-visuale/anteprima/*.html` | Si apre con doppio clic, animazioni comprese. | I caratteri arrivano da Google Fonts: senza rete si vedono le riserve. |
| Immagini | `2026-09-03-home-visuale/immagini/*.png` | Si guardano in una PR, in una issue, da telefono. Numerate nell'ordine della pagina; `10-` e `11-` sono il mobile. | Ferme: non mostrano il movimento. |

Le anteprime **non si modificano a mano**: si rigenerano dalle tavole con

```bash
node scripts/tavole-anteprima.mjs docs/superpowers/specs/2026-09-03-home-visuale
```

Lo stesso comando senza argomenti rifà anche le tavole di agosto, che avevano
lo stesso difetto. Il canvas navigabile, con le note a margine, sta su
`https://claude.ai/code/artifact/01f6d366-870d-4551-a18e-180dd5d4ecbf`; è comodo
ma è **fuori dal repo**, quindi non è la fonte: le tavole lo sono.

Il file impacchettato `tavole/home-visuale.html` (2,5 MB) è in `.gitignore`: si
rifà dal seme e non ha niente che le tavole non abbiano già.

## Il problema che risolve

La home ha nove sezioni e tutte hanno la stessa forma: occhiello arancione,
titolo serif, testo o schede. Nessuna immagine, nessun cambio di scala, nessuna
pausa. Il risultato è che sembra tutto ugualmente importante, e quindi niente lo
è — e chi arriva non capisce in sei secondi cosa esce dalle mani di Alessandro.

Il rimedio non è aggiungere: è cambiare il ritmo, e mostrare invece di
raccontare.

## Decisioni prese, e da chi

Tutte del committente, il 3 settembre 2026, guardando le tavole:

1. **Direzione A**, «disegno tecnico»: un solo linguaggio visivo nuovo — linee
   sottili, nodi, fasci di luce che percorrono i collegamenti — nei colori e nei
   caratteri del sito. Scartate B («colore e scala») e C («scroll narrativo»),
   tenute in `tavole/DirezioneB.dc.html` e `DirezioneC.dc.html` per memoria.
2. **Da nove sezioni a otto.** Formazione si riduce a striscia, Territorio entra
   nel blocco del contatto, «Da dove viene» si fonde con la fascia dei numeri.
   Entra «Cosa costruisco». **«Come lavoro» resta per intero**, per scelta
   esplicita: è la sezione che spiega meglio come si lavora con lui.
3. **La testata resta a una colonna**, identica a oggi, senza diagramma.
4. **Il diagramma di «Cosa costruisco» dimostra una tesi:** dai dati e dagli
   strumenti che l'azienda ha già si tira fuori conoscenza.
5. **Materiale visivo:** diagrammi SVG costruiti da zero, più fotografia quando
   ci sarà. Nessuno screenshot di prodotto.

## Il vincolo che governa tutto il resto

**Con Procedo c'è un patto di non concorrenza scritto e in vigore.** Procedo si
nomina come credenziale al passato — la riga di credibilità in testata, la
scheda fra «Le prove» — ma il sito **non può presentare come propria offerta**
quello che Procedo vende.

Nella prima versione di questa sezione il diagramma descriveva esattamente il
meccanismo di Procedo: video girati in reparto → procedure passo-passo →
assistente sulle procedure. Era un errore, ed è stato tolto. Si ripresenterà,
perché `projects.ts` descrive Procedo meglio di qualsiasi altra cosa e quindi è
la fonte più comoda da cui pescare copy già approvata — ed è precisamente quella
da cui non si deve pescare quando si scrive dell'offerta.

Fonti sicure per le capacità: **Vault**, **Tracking costi**, **Agentic Workflow
Toolkit**.

> **Aperto.** Il perimetro del patto non è scritto da nessuna parte nel repo. Va
> messo in `.claude/rules/procedo.md` con `paths:` su `src/data/**`, così si
> carica quando qualcuno tocca la copy. Finché quella riga non arriva dal
> committente vale la lettura conservativa qui sopra, che quasi certamente
> vieta più di quanto vieti il contratto.

## La home, misurata

Il metro di questo lavoro non è l'estetica: è la lunghezza. Misurata sul
rendering, a 1440×900 e a 390×844.

| | Oggi | Proposta | |
|---|---:|---:|---|
| Desktop | 6355px · 7,1 schermate | **5667px · 6,3 schermate** | −11% |
| Telefono | 9357px · 11,1 schermate | **8605px · 10,2 schermate** | −8% |

Il numero del telefono comprende gli 843px del piè di pagina, che **non è
ancora stato toccato**: senza di lui la pagina disegnata è 7762px.

Una versione intermedia di questo progetto era, sul telefono, **più lunga di
oggi**: il ritmo era risolto e la lunghezza no, perché i due tagli veri
(formazione a striscia, fascia fusa) se li mangiava la sezione nuova. I quattro
tagli che seguono nascono da lì, non da un'intuizione.

### Dove va lo spazio, sul telefono

| Sezione | Oggi | Proposta | |
|---|---:|---:|---|
| Barra | 64 | 63 | |
| Testata | 745 | 748 | |
| Fascia scura (numeri + ricerca, fusi) | 1081 | **736** | −345 |
| Il problema (con le vignette) | 840 | 1091 | +251 |
| **Come lavoro** (nomi di /servizi + «Ne esce») | **1647** | **947** | **−700** |
| **Cosa costruisco** (nuova) | — | 1050 | +1050 |
| Le prove (con le miniature) | 1183 | 1345 | +162 |
| Formazione (a striscia) | 1115 | **503** | −612 |
| Territorio + Parliamone (fusi) | 1839 | **1281** | −558 |
| Piè di pagina | 843 | 843 | *da guardare* |
| **Totale** | **9357** | **8605** | **−752** |

### Le fasce a 1440px

| # | Sezione | Fondo | Padding fascia | Alt. | Immagine |
|---|---------|-------|----------------|-----:|----------|
| — | Barra | `--bg` | `22px 24px` | 85 | — |
| 1 | Testata | `--bg` | `92px 24px 64px` | 813 | `01-testata.png` |
| 2 | Fascia scura | `--accent` | `40px 24px 46px` | 445 | `02-fascia-scura.png` |
| 3 | Il problema | `--surface-warm` | `76px 24px` | 685 | `03-il-problema.png` |
| 4 | Cosa costruisco | `--bg` | `80px 24px 84px` | 874 | `04-cosa-costruisco.png` |
| 5 | Come lavoro | `--bg` | `72px 24px` | 945 | `05-come-lavoro.png` |
| 6 | Le prove | `--surface` | `72px 24px` | 787 | `06-le-prove.png` |
| 7 | Formazione | `--surface-warm` | `52px 24px` | 294 | `07-formazione.png` |
| 8 | Parliamone | `--accent` | `40px 24px 68px` | 734 | `08-parliamone.png` |

Contenitore ovunque: `max-width: 1120px; margin: 0 auto` — 1072px di contenuto
dentro i 24px di padding. Invariato rispetto a oggi.

Il ritmo sta nella colonna delle altezze: due fasce sotto i 450px (2 e 7) fanno
da pausa fra i blocchi lunghi, e i fondi si alternano invece di essere tutti
carta.

### I quattro tagli

1. **«Cosa costruisco» perde i tre pilastri.** Citavano tre progetti mentre «Le
   prove», due schermate sotto, ne mostra tre — e l'**Agentic Workflow Toolkit
   compariva due volte nella stessa pagina**. Erano due sezioni che facevano lo
   stesso mestiere. La sezione tiene la tesi e il diagramma; le prove le dà «Le
   prove». La dichiarazione «strumenti miei, per il mio team» non si perde:
   scende sulla scheda del toolkit, che è l'unico posto dove ora quel progetto
   vive.
2. **«Come lavoro» tiene i nomi e il «Ne esce»**, e lascia andare i quattro
   corpi: su `/servizi` ci sono già, più per esteso. Sul telefono era il blocco
   più grande della pagina, 1647px → 947. Sul desktop il risparmio è minore
   (1048 → 945) perché l'altezza della riga la detta la colonna «Ne esce», larga
   230px: è un dato utile per non aspettarsi troppo dalla stessa mossa altrove.

   **E i nomi cambiano.** Tolti i corpi, «Ascolto» e «Resto» restano soli e
   smettono di parlare del lavoro per parlare della persona: la sezione suona
   come una terapia invece che come un mestiere. I quattro passi prendono i nomi
   degli ingaggi di `servizi.ts` — **Mezza giornata diagnostica, Audit AI,
   Software su misura, Canone di servizio** — che sono già approvati, esistono
   in inglese (`A diagnostic half-day`, `AI audit`, `Custom software`,
   `Service retainer`, dove il problema era identico: «I listen», «I stay») e
   **costano zero**: a 390px stanno comunque su una riga, quindi la sezione
   resta 947px.

   Due alternative sono state misurate e scartate. Tenere la prima frase di ogni
   corpo legge bene ma recupera **110px in tutto** — tre corpi su quattro erano
   già corti e «Costruisco» è un periodo unico che non si spezza senza
   riscriverlo. Tornare alla sezione intera costa 700px sul telefono.
   Il confronto fra le quattro versioni sta in `tavole/ComeLavoro.dc.html` e in
   `immagini/12-come-lavoro-varianti.png`.

   > **Conseguenza da non lasciare implicita.** `index.astro` porta oggi un
   > commento che dice apposta che i quattro passi della home **non** devono
   > coincidere con gli `ingaggi` di `/servizi`: uno racconta come si svolge un
   > lavoro, l'altro elenca cosa si compra. Questa decisione lo rovescia, e il
   > commento va riscritto con la ragione nuova — non cancellato.
3. **Le vignette del telefono da 80 a 64px.** Vale poco, ma è gratis.
4. **Il piè di pagina**, guardato e non ancora toccato: sotto.

### Il piè di pagina

843px sul telefono, il quinto blocco della pagina per dimensione — e sta su
**ogni pagina del sito**, non solo sulla home.

| Parte | Alt. |
|---|---:|
| Presentazione, frase e pulsante | 179 |
| «Cosa faccio», 3 voci | 112 |
| «Le prove», 4 voci | 140 |
| «Altrove», 4 voci | 140 |
| Distanze fra i quattro blocchi (`gap: 40px` × 3) | 120 |
| Padding della griglia | 76 |
| Barra finale | 76 |

Due cose, e tirano in direzioni opposte:

- **I quattordici link sono alti 28px** (`font-size: 14px; line-height: 2`),
  sotto il minimo di 44 per il tocco. È lo stesso difetto dei link di sezione, e
  **correggerlo allunga il piè di pagina**, non lo accorcia: quattordici voci a
  44px sono 224px in più.
- I 120px di distanze fra blocchi impilati sono il solo spazio davvero
  sprecato.

Quindi: la lunghezza del piè di pagina **è il suo contenuto**. Accorciarlo
sul serio vuol dire decidere quali dei quattordici link smettono di stare lì —
una decisione di struttura, non di CSS. La via che risolve tutte e due le cose è
mettere i tre gruppi di link su **due colonne** sotto i 640px: le voci possono
salire a 44px senza che il blocco cresca.

> **Aperto.** Il piè di pagina sta su ogni pagina del sito: cambiarlo ha un
> raggio molto più largo di questo lavoro. Va fatto **dopo**, in una PR sua,
> quando la home è in produzione e si può confrontare una cosa alla volta.

### Cosa cambia, sezione per sezione

1. **Testata** — niente. Valori identici a `Occhiello.astro`: `h1` 66px,
   `line-height: 1.04`, `max-width: 19ch`; intro 20px su 54ch; divisore 88×3px.
2. **Fascia scura** — fonde `FasciaNumeri` e `DaDoveViene`. Sopra i quattro
   numeri (Fraunces 26px bianco, etichetta 14px `#a8c0d6`, `gap: 56px`), poi un
   filo `rgba(255,255,255,.16)` con `margin: 34px 0 30px`, poi una griglia
   `1fr 420px`: a sinistra occhiello, «Dalla ricerca alla produzione» a 28px,
   l'intro a 15.5px su 62ch e i due link; a destra le tre tappe, ognuna con un
   filetto verticale `2px` in `rgba(240,201,164,.5)` e 16px di rientro.
3. **Il problema** — fondo `--surface-warm`, titolo a 34px (era 32), e **ogni
   citazione prende la sua vignetta**, 286×104px sopra la frase: la richiesta
   che non si sa leggere (foto storta → linea interrotta → «?»); il sapere
   chiuso in una testa sola (un cerchio pieno, sei vuoti tratteggiati, nessun
   collegamento); i documenti che escono dall'azienda (un perimetro
   tratteggiato, tre frecce che lo attraversano, una nuvola fuori).
   Le tre vignette **non hanno fasci**: usano `.interrotto`. Il movimento
   arancione compare solo dove qualcosa funziona, ed è il contrasto con la
   sezione 4 a fare il lavoro.
4. **Cosa costruisco** — sezione nuova, vedi sotto.
5. **Come lavoro** — prende i nomi degli ingaggi di `/servizi` e tiene il «Ne
   esce»; i corpi lasciano la home e restano su `/servizi`.
6. **Le prove** — ogni scheda prende una miniatura 338×86px sopra l'occhiello.
   Il portale ricambi si ripiglia il tag «In costruzione». **Spannum lascia il
   posto all'Agentic Workflow Toolkit** (aperto, punto 2 in fondo).
7. **Formazione** — da blocco intero a striscia: griglia `400px 1fr`, a sinistra
   occhiello, titolo 26px e il link; a destra il paragrafo sull'AI Act e tre
   pastiglie `9px 14px` con la durata in `--azione`.
8. **Parliamone** — sopra il modulo entrano «Dove lavoro», «Venezia è la mia
   base», l'intro del territorio e i tre modi in riga, chiusi da un filo.

## La sezione nuova, per intero

Contenitore `position: relative; width: 1072px; height: 456px`, con un solo
`<svg width="1072" height="456">` in `position: absolute; inset: 0` dietro, e i
riquadri in HTML sopra, posizionati in assoluto.

**A sinistra, il disordine.** Undici frammenti, tutti `<rect rx="3">` con
`stroke: #c2b6a2; stroke-width: 1.5`, dentro un `<g transform="rotate(…)">` fra
−7° e +6°, con una o tre barrette `#e6ddd0` alte 4px a suggerire del testo. Tre
di essi sono `stroke-dasharray="4 5"`. Occupano `x` 14→312, `y` 26→332. Le
misure esatte stanno in `tavole/Main.dc.html`; **si generano con una funzione,
non si scrivono a mano** — vedi `scratchpad/sezione.py` nel diario di lavoro, o
si riscrive in tre righe.

**I fasci in entrata**, `pathLength="100"`:

```
M 312  92 C 372  92 384 200 434 200     ritardo 0s
M 312 200 L 434 200                     ritardo .4s
M 312 308 C 372 308 384 200 434 200     ritardo .8s
```

**Il nodo centrale**, in HTML: `left: 434px; top: 162px; width: 190px;
height: 76px`, fondo bianco, `border: 1.5px solid var(--azione)`,
`box-shadow: 0 0 0 7px rgba(240,201,164,.32), 0 12px 34px rgba(168,83,29,.14)`.
Dentro, Fraunces 19px e un'etichetta 10.5px maiuscoletta.

**I fasci in uscita**:

```
M 624 200 C 684 200 700 112 752 112     ritardo 1.6s
M 624 200 L 752 200                     ritardo 2s
M 624 200 C 684 200 700 288 752 288     ritardo 2.4s
```

**A destra, la struttura.** Cinque `<rect height="36" rx="4">` a
`(752, 94, 120)`, `(752, 182, 120)`, `(752, 270, 120)`, `(916, 137, 130)` e
`(916, 227, 130)`; l'ultimo è l'evidenziato — `fill: #fdf3e9`,
`stroke: var(--azione)`, `stroke-width: 1.5`. Dentro ognuno due barrette, la
prima `--azione` al 55%, la seconda `#e0b98f`. I collegamenti fra loro sono un
solo path in `#e0b98f`:

```
M 872 112 L 916 155  M 872 200 L 916 173  M 872 200 L 916 245
M 872 288 L 916 263  M 940 191 L 940 227
```

**La riga che porta l'argomento.** Dal nodo evidenziato, `.interrotto`:

```
M 981 263 L 981 424 L 150 424 L 150 332
```

più la punta di freccia `M 144 340 L 150 330 L 156 340`. A metà del tratto
orizzontale, un `<span>` con fondo `--bg` e `padding: 0 12px` la interrompe e la
nomina: **«da dove viene»**. È questa riga a dire la cosa che il resto del
diagramma non dice — che la conoscenza resta attaccata alla sua fonte — e va
trattata come il pezzo più importante del disegno, non come una decorazione.

**Sotto il diagramma non c'è altro.** I tre pilastri che stavano qui sono
usciti: citavano gli stessi progetti che «Le prove» mostra due schermate dopo.
La sezione dice la tesi e la disegna; le prove le dà chi di dovere.

La dichiarazione che l'integrazione è vera solo per lui vive ora sulla scheda
del toolkit fra «Le prove», come pastiglia in `--azione` su `#fdf3e9`:
**«Strumenti miei, per il mio team»**. La home **non può scrivere «collego i
sistemi che avete già»** finché resta così.

## Il mobile, che non è un ripiego

**È da qui che arriva la maggior parte del traffico.** La tavola a 390px
(`tavole/HomeMobile.dc.html`, immagini `10-` e `11-`) vale quanto quella a 1440,
e va guardata prima di considerare finita qualunque sezione.

Misurato sul rendering a 390×844, `deviceScaleFactor: 2`: **7762px** per la
pagina intera meno il piè di pagina, e **nessuno scorrimento orizzontale**. La
tavola disegna tutte le sezioni: nessun numero del mobile è stimato.

> Quest'ultimo è un **requisito, non un risultato**. In questo repo una versione
> ha già aggiunto 16px di scorrimento orizzontale su `/chi-sono`, e un confronto
> byte a byte l'aveva dichiarata identica. Si verifica a 320, 360, 390 e 414px,
> guardando, con `document.documentElement.scrollWidth`.

**Le soglie sono già nel repo e non cambiano:** 720px (il menu si chiude dietro
il pulsante, `Nav.astro`), 640px (le sezioni passano a una colonna), 400px (la
barra va a capo).

| Sezione | Cosa fa a ≤640px |
|---|---|
| Barra | `18px 20px`, marchio 16px, pulsante a due tratti 22×1.5px. Ogni voce del menu aperto ha `min-height: 44px` — c'è già. |
| Testata | `44px 20px 40px`; occhiello 10.5px su 22ch; `h1` **34px**, `line-height: 1.08`, `text-wrap: pretty`; divisore 72×3; intro 16.5px; i due CTA in colonna, `gap: 14px`, il primo a tutta larghezza. |
| Fascia scura | `26px 20px 32px`; i quattro numeri in griglia **2×2**, `gap: 18px 24px`, valore 24px ed etichetta 13px **abbreviata** («articoli», «Best Paper»): a 390px le etichette lunghe mandano a capo il numero. Le tre tappe in colonna. |
| Il problema | `48px 20px`; una colonna, `gap: 16px`; scheda `22px 24px 24px`; la vignetta resta `viewBox="0 0 286 104"` e si scala a 302px di larghezza — **non si ridisegna**. |
| Cosa costruisco | `48px 20px 52px`; titolo 26px; il diagramma diventa **350×592 verticale**. Le due didascalie laterali si fondono in un unico paragrafo sotto il disegno, e la sezione finisce lì. |
| Come lavoro | Ogni passo è numero + nome in linea, poi «Ne esce». 947px contro i 1647 di oggi, e i nomi sono quelli di `/servizi`. |
| Le prove | `44px 20px`; colonna, `gap: 28px`; miniatura 330px; `h3` 22px. |
| Formazione | `40px 20px 44px`; le tre pastiglie in colonna, `padding: 11px 14px`. |
| Parliamone | Invariata, più la riga del territorio che va in colonna. |

### Il diagramma girato di 90°

Contenitore `350×592`. Sopra il disordine — **otto** frammenti invece di undici,
perché a 350px di larghezza undici diventano illeggibili: la quantità è un dato
del componente, non un numero scritto due volte. In mezzo il nodo, `left: 75px;
top: 246px; width: 200px; height: 80px`. Sotto la struttura: tre righe da
252×38 a `x=58`, `y=366 / 422 / 478`, l'ultima evidenziata, con il filetto di
collegamento verticale a `x=42` in `--tratto-tenue`.

I fasci in entrata scendono da tre frammenti al nodo; ne esce uno solo, dritto.
La riga «da dove viene» non può attraversare i riquadri come fa su desktop:
scende lungo il margine destro, passa sotto tutto e risale a sinistra fino al
frammento, con l'etichetta sul tratto orizzontale in basso.

```
M 310 497 L 332 497 L 332 560 L 18 560 L 18 118 L 24 118
```

### Il tocco

Ogni cosa che si preme ha **almeno 44px di altezza**, link di sezione compresi
(«La ricerca, per intero →», «Come funziona →»): oggi sono `<a>` in linea alti
21px, ed è il difetto più diffuso della home su telefono. `Nav.astro` applica
già la regola alle sue voci sotto i 720px; va estesa, non riscritta da capo.

`:active` esiste già in `global.css` e resta l'unico riscontro possibile dove
`:hover` non c'è. I fasci non dipendono dal puntatore e funzionano uguale.

## I colori: cosa c'è e cosa manca

Usati nelle tavole e già in `tokens.css`:

`--bg #faf8f4` · `--surface #ffffff` · `--surface-warm #f4efe7` ·
`--text #141414` · `--text-muted #55504a` · `--border #e6ddd0` ·
`--accent #1b3a5b` · `--azione #a8531d` · `--evidenziatore #f0c9a4` ·
`--text-faint #8a8177`

**Da aggiungere a `src/styles/tokens.css`.** Sono sei, e finché non hanno un
nome finiranno ricopiati a mano in ogni componente:

| Valore | Nome proposto | Dove serve | Occ. |
|--------|---------------|-----------|-----:|
| `#c2b6a2` | `--tratto-inerte` | linee e forme spente nei diagrammi, `.interrotto` | 30 |
| `#a8c0d6` | `--su-accent` | etichette su fondo `--accent` (esiste già dentro `FasciaNumeri`) | 15 |
| `#e0b98f` | `--tratto-tenue` | collegamenti di secondo livello, barrette dei nodi | 7 |
| `#c7d8e6` | `--su-accent-forte` | testo corrente su fondo `--accent` | 5 |
| `#fdf3e9` | `--evidenziatore-tenue` | fondo dei nodi e delle schede evidenziate | 4 |
| `#7f9ab3` | `--su-accent-debole` | testo terziario su fondo `--accent` | 3 |

`#7a736a`, una volta sola sulla riga di credibilità, **non è un errore**: è il
valore che sta già in `Occhiello.astro`. Si lascia.

## La scala tipografica, com'è usata

Serif (Fraunces, 600) — 66 testata · 34 titolo di sezione grande · 32 titolo di
sezione · 30 numero del passo · 28 titolo su fondo scuro · 26 numeri della
fascia e titolo della striscia · 24 nome di progetto · 22 nome del passo ·
20 citazione · 19 titolo di prova · 17 marchio.

Sans (Inter) — 20 intro della testata · 16 intro di sezione · 15.5 corpo lungo ·
15 corpo di scheda · 14.5 corpo breve · 14 voci di menu ed etichette · 13.5
etichetta di nodo · 12.5 didascalia di diagramma · 12 pastiglia e provenienza ·
11.5 occhiello (`letter-spacing: .2em`, maiuscoletto) · 10.5–11 etichetta
interna al diagramma (`letter-spacing: .14em`).

## Il movimento

**Zero dipendenze e zero framework.** Skiper-ui è React più Tailwind: adottarlo
significherebbe portare React dentro un sito che oggi spedisce zero JavaScript
— il costo più alto del lavoro per il beneficio minore. Tutto si fa in SVG e
CSS. Se una singola animazione non ci stesse, il ripiego è `motion` di
motion.dev nella build vanilla (2,6 kB), mai il framework.

**Il fascio.** Un `@keyframes fascio { from { stroke-dashoffset: 100 } to
{ stroke-dashoffset: -100 } }`, `3.4s linear infinite`, su un tratto
`stroke-dasharray: 11 89`, `stroke-width: 2.5`, `stroke-linecap: round`, colore
`--azione`, con `filter: drop-shadow(0 0 4px rgba(168,83,29,.55))`. Ogni
`<path>` porta **`pathLength="100"`**: normalizza la geometria, così lo stesso
`dasharray` vale per curve di lunghezza diversa e i ritardi restano leggibili.
Sotto, un tratto `.base` in `--border` largo 1.5px che disegna il percorso
fermo.

Le tre regole — `.base`, `.fascio`, `.interrotto` — e il `@keyframes` stanno
**una volta sola** in `src/styles/global.css`, accanto a quelle che ci sono già.
Non si ricopiano nei componenti.

**L'innesco, che oggi è sbagliato.** `main > section { animation: sali }` parte
al caricamento con ritardi progressivi: le sezioni in fondo hanno già finito di
animarsi prima che qualcuno le veda, e con una pagina più lunga il difetto
peggiora. Si sostituisce con un `IntersectionObserver` in `BaseLayout` (una
trentina di righe, `is:inline`) che aggiunge una classe quando l'elemento entra
in vista; il CSS anima solo da lì, **una volta sola**.

**Movimento ridotto.** Sotto `@media (prefers-reduced-motion: reduce)` non parte
niente: né `sali`, né `fascio`, né `evidenzia`. Resta il disegno fermo, che si
legge lo stesso — il diagramma non perde nessuna informazione senza il fascio,
ed è un requisito, non una cortesia.

## Mappa dei componenti

| File | Cosa gli succede |
|------|------------------|
| `src/pages/index.astro` | Perde `FasciaNumeri`, `DaDoveViene` e `Territorio` come sezioni a sé; guadagna `CosaCostruisco`; passa `territorio` a `Contatto`. |
| `src/pages/en/index.astro` | Stessa struttura, **senza** `CosaCostruisco`. |
| `sezioni/FasciaNumeri.astro` | Assorbe `DaDoveViene`. Props nuove: `daDoveViene?`. Se manca, rende solo i numeri. |
| `sezioni/DaDoveViene.astro` | Si cancella. È citato in `Territorio.astro`: verificare il riferimento prima. |
| `sezioni/Territorio.astro` | Si cancella come sezione; i suoi testi passano a `Contatto`. |
| `sezioni/Contatto.astro` | Props nuove: `territorio?`, facoltativa: senza, rende solo il modulo. |
| `sezioni/IlProblema.astro` | Ogni riquadro guadagna una vignetta, scelta per indice o per chiave. |
| `sezioni/BloccoFormazione.astro` | Diventa striscia. Perde `formati[].corpo` e `chiusura` dalla home; restano su `/formazione`. |
| `sezioni/LeProve.astro` | Ogni scheda guadagna una miniatura, e i tag possono portarne uno in evidenza («In costruzione», «Strumenti miei, per il mio team»). |
| `sezioni/CosaCostruisco.astro` | **Nuovo.** Tesi, diagramma, e basta. Due disposizioni, orizzontale e verticale, con la soglia a 640px e il numero di frammenti come dato. |
| `sezioni/ComeLavoro.astro` | Il corpo di ogni passo diventa facoltativo e la home non lo passa. I nomi dei passi arrivano da `ingaggi` di `servizi.ts` invece che da stringhe proprie della home. |
| `sezioni/Occhiello.astro` | Invariato. Contiene l'ancora `#le-prove`: se la sezione cambia nome, l'ancora resta. |
| `styles/tokens.css` | Sei token nuovi. |
| `styles/global.css` | `.base`, `.fascio`, `.interrotto`, `@keyframes fascio`; `sali` passa all'innesco per visibilità. |
| `layouts/BaseLayout.astro` | L'`IntersectionObserver`. |

Regola che non cambia: **i componenti ricevono i testi come props e non
importano niente da `src/data/`.**

## I testi che mancano

Otto stringhe — erano undici prima che i tre pilastri uscissero. Non esistono
in `testi.md`, in `index.astro` né in `projects.ts`: le ho scritte io e vanno
**approvate o riscritte dal committente**. Nelle tavole hanno il fondo
arancione chiaro.

| # | Dove | Proposta |
|---|------|----------|
| 1 | Occhiello | Cosa costruisco |
| 2 | Titolo | Quello che avete già, in una forma che si può interrogare |
| 3 | Apertura | I dati e gli strumenti di un'azienda sono sparsi in venti posti diversi e nessuno ha tempo di rimetterli in ordine a mano. Costruisco sistemi che li leggono, li tengono collegati e vi rispondono dicendo ogni volta da quale documento arriva la risposta. |
| 4 | Nodo centrale | Legge e collega |
| 5 | Nodo centrale, sotto | ogni giorno, da solo |
| 6 | Riga di ritorno | da dove viene |
| 7 | Didascalia sinistra | Venti posti diversi: cartelle, fogli, mail, ticket, gestionali. |
| 8 | Didascalia destra | Una cosa sola da interrogare, dove ogni risposta resta attaccata al documento da cui viene. |

Vanno scritte in `2026-08-25-sito-italiano/testi.md`, che resta la fonte
approvata, **prima** che finiscano in `src/data/`.

Le frasi già approvate che la sezione cita restano frammenti, con i puntini a
segnare dove l'originale continua: sono spezzoni di una frase sola di
`projects.ts`, e presentarli con maiuscola e punto fermo li trasformerebbe in
citazioni che nessuno ha mai scritto.

## Il vincolo che allarga il lavoro: `/en/`

**Ognuno dei componenti toccati è usato anche da `src/pages/en/index.astro`.**
Non è un lavoro solo italiano.

- Le sezioni fuse e compattate valgono per entrambe le lingue: i testi inglesi
  esistono già in `testi-en.md`, non se ne inventa nessuno.
- **«Cosa costruisco» non compare sulla home inglese** finché il committente non
  scrive la copy in `testi-en.md`. La pagina inglese non passa quelle props e la
  sezione si salta: è la regola 2 del `CLAUDE.md` — «un campo vuoto salta la sua
  sezione» — non un'eccezione fatta per l'occasione.
- **Nessuno dei componenti toccati ha consumatori fuori dalle due home.**
  Verificato con `grep -rl "import <Nome> from"`: `Occhiello`, `FasciaNumeri`,
  `IlProblema`, `ComeLavoro`, `LeProve`, `BloccoFormazione`, `Contatto` sono
  importati solo da `src/pages/index.astro` e `src/pages/en/index.astro`.
  Le props restano comunque **facoltative** dove il piano lo dice, perché è la
  forma giusta — un campo vuoto salta la sua sezione, ed è la regola 2 del
  `CLAUDE.md` — non perché qualcun altro le ometta.
- `verifica-rotte.mjs` controlla che non ci sia italiano sulle pagine inglesi.
  Va lasciato severo: se la home inglese resta indietro, deve essere lui a
  dirlo.

## Difetti trovati strada facendo, da correggere comunque

1. **La home racconta il portale ricambi meglio di quanto sia.** `projects.ts`
   ha `tagIt: [… "In costruzione"]` e scrive «il portale è in costruzione»;
   `leProve` in `index.astro` lascia cadere quel tag e ci mette sopra «commessa
   reale». Va rimesso, a prescindere da questo lavoro.
2. **Sei colori senza token**, elencati sopra.
3. **`main > section` si anima fuori vista**, descritto sopra.

## Cosa non si tocca

La barra, il piè di pagina, le rotte, `localizedPath` e la barra finale, il
dominio in `astro.config.mjs`, l'interruttore delle statistiche in
`src/data/analytics.ts`, e `verifica-rotte.mjs`. Il modulo di contatto resta
inerte e continua a dirlo.

## Prima della PR

```bash
npm run check     # astro check — 0 errori
npm test          # vitest — tutti verdi
npm run verifica  # build + rotte, feed, link interni, hreflang, italiano su pagine inglesi
```

E, poiché il lavoro tocca componenti condivisi con il sito **in produzione**:
estrarre il testo visibile delle pagine italiane prima e dopo e confrontarlo
**guardandolo**, non con un hash — in questo repo un confronto byte a byte ha
già dichiarato «identiche» due versioni di cui una aggiungeva 16px di
scorrimento orizzontale su `/chi-sono`.

Le anteprime vanno rigenerate se le tavole cambiano, e committate insieme.

## Domande ancora aperte

1. **La riga sul perimetro del patto Procedo**, da mettere in `.claude/rules/`.
   Blocca la copy della sezione nuova.
2. **Spannum esce dalla home** e resta su `/lavori`: confermare. L'alternativa è
   togliere il portale ricambi finché non parte.
3. **Il toolkit in home nomina GitHub e Notion**, che un titolare di PMI
   meccanica non conosce. È il prezzo dell'onestà: è l'unica integrazione vera.
4. **Le foto**: quando arrivano, e di cosa. Il progetto regge senza — e i punti
   foto vanno progettati guardando prima il telefono, non il desktop.
