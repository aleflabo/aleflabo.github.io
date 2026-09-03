# La home, più visuale — progetto

3 settembre 2026. Tavole: `2026-09-03-home-visuale/tavole/`, canvas pubblicato su
`claude.ai/code/artifact/01f6d366-870d-4551-a18e-180dd5d4ecbf`.

## Il problema che risolve

La home ha nove sezioni e tutte hanno la stessa forma: occhiello arancione,
titolo serif, testo o schede. Non c'è una sola immagine, un solo cambio di
scala, una sola pausa. Il risultato è che sembra tutto ugualmente importante, e
quindi niente lo è — e chi arriva non capisce in sei secondi cosa esce dalle
mani di Alessandro.

Il rimedio non è aggiungere: è cambiare il ritmo, e mostrare invece di
raccontare.

## Decisioni prese, con chi le ha prese

Tutte del committente, il 3 settembre 2026, guardando le tavole:

1. **Direzione A**, «disegno tecnico»: un solo linguaggio visivo nuovo — linee
   sottili, nodi, fasci di luce che percorrono i collegamenti — nei colori e nei
   caratteri del sito.
2. **La home passa da nove sezioni a otto.** Formazione si riduce a striscia,
   Territorio entra nel blocco del contatto, «Da dove viene» si fonde con la
   fascia dei numeri. Entra una sezione nuova, «Cosa costruisco». «Come lavoro»
   resta per intero: è la sezione che spiega meglio come si lavora con lui.
3. **La testata resta a una colonna**, identica a oggi. Il primo esempio
   disegnato non è il portale ricambi: è un progetto troppo specifico e non
   ancora partito.
4. **Il diagramma di «Cosa costruisco» dimostra una tesi:** dai dati e dagli
   strumenti che l'azienda ha già si tira fuori conoscenza. Lo fa con un cambio
   di forma — disordine a sinistra, struttura connessa a destra — e con una riga
   tratteggiata che dal risultato torna indietro alla sua fonte.
5. **Materiale visivo:** diagrammi SVG costruiti da zero, più fotografia quando
   ci sarà. Nessuno screenshot di prodotto.

## Il vincolo che governa tutto il resto

**Con Procedo c'è un patto di non concorrenza scritto e in vigore.** Procedo si
nomina come credenziale al passato — la riga di credibilità in testata, la
scheda fra «Le prove» — ma il sito **non può presentare come propria offerta**
quello che Procedo vende.

Nella prima versione di questa sezione il diagramma descriveva esattamente il
meccanismo di Procedo (video in reparto → procedure passo-passo → assistente
sulle procedure). Era un errore, ed è stato tolto. Il rischio si ripresenterà,
perché `projects.ts` descrive Procedo meglio di qualsiasi altra cosa e quindi è
la fonte più comoda da cui pescare copy già approvata: è precisamente quella da
cui non si deve pescare quando si scrive dell'offerta.

Le fonti sicure per le capacità sono **Vault**, **Tracking costi** e **Agentic
Workflow Toolkit**.

> **Aperto.** Il perimetro preciso del patto non è scritto da nessuna parte nel
> repo. Va messo in `.claude/rules/procedo.md` con `paths:` sui file di copy,
> così si carica quando qualcuno tocca `src/data/`. Finché quella riga non
> arriva dal committente vale la lettura conservativa qui sopra, che
> probabilmente vieta più di quanto il contratto vieti davvero.

## La home, sezione per sezione

| # | Sezione | Cosa cambia |
|---|---------|-------------|
| 1 | Testata | **Niente.** Valori identici a `Occhiello.astro`. |
| 2 | Fascia scura | Fonde `FasciaNumeri` e `DaDoveViene`: i quattro numeri, un filo, poi «Dalla ricerca alla produzione» con le tre tappe e i due link. |
| 3 | Il problema | Fondo `--surface-warm`, titolo a 34px, e **ogni citazione prende la sua vignetta**: la richiesta che non si sa leggere, il sapere chiuso in una testa sola, i documenti che escono dall'azienda. |
| 4 | **Cosa costruisco** | Sezione nuova. Diagramma grande più tre prove. Vedi sotto. |
| 5 | Come lavoro | **Niente.** |
| 6 | Le prove | Ogni scheda prende una miniatura disegnata. Il portale ricambi si ripiglia il tag «In costruzione». Spannum lascia il posto all'Agentic Workflow Toolkit. |
| 7 | Formazione | Da blocco intero a striscia: titolo, il paragrafo sull'AI Act, tre pastiglie, un link. |
| 8 | Parliamone | I tre modi del territorio e «Venezia è la mia base» entrano qui sopra, come riga introduttiva sul blu. |

### La sezione nuova

Il diagramma è largo 1072px e alto 456. A sinistra undici frammenti di forma e
taglia diverse, storti, spenti, scollegati fra loro. In mezzo un nodo. A destra
gli stessi contenuti come struttura connessa, con un risultato evidenziato. Dal
risultato parte una riga tratteggiata che attraversa la tavola all'indietro fino
al frammento da cui viene, con sopra l'etichetta «da dove viene».

Sotto, tre prove con la frase di `projects.ts` da cui vengono: Vault, Tracking
costi, Agentic Workflow Toolkit. La terza dichiara in arancione **«strumenti
miei, per il mio team»**, perché è vero: l'integrazione con sistemi esistenti
Alessandro l'ha fatta per sé e per il suo team, mai per un cliente. La home non
può scrivere «collego i sistemi che avete già» finché resta così.

## I testi che mancano

Undici stringhe. Non esistono in `testi.md`, in `index.astro` né in
`projects.ts`: le ho scritte io e vanno **approvate o riscritte dal
committente**. Sono tutte nella sezione nuova, e nelle tavole hanno il fondo
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
| 9 | Prova 1 | Da venti posti a uno solo |
| 10 | Prova 2 | Si aggiorna senza che nessuno lo tocchi |
| 11 | Prova 3 | Collegato a quello che usate già |

Vanno scritte in `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md`, che
resta la fonte approvata, prima che finiscano in `src/data/`.

## Il linguaggio visivo, come si costruisce

**Zero dipendenze e zero framework.** Skiper-ui è React più Tailwind: adottarlo
qui significherebbe portare React dentro un sito che oggi spedisce zero
JavaScript, il costo più alto del lavoro per il beneficio minore. Tutto si fa in
SVG e CSS. Se una singola animazione non ci stesse, il ripiego è `motion` di
motion.dev nella build vanilla (2,6 kB), mai il framework.

**Il fascio.** Riquadri in HTML, collegamenti e fasci in un solo `<svg>` dietro,
posizionato in assoluto. Ogni `<path>` porta `pathLength="100"`, che normalizza
la geometria: un solo `stroke-dasharray` vale per curve di lunghezza diversa, e
i ritardi restano leggibili. Le regole (`.base`, `.fascio`, `@keyframes fascio`)
stanno **una volta sola** in `src/styles/global.css`, accanto a quelle che ci
sono già — non ricopiate in ogni componente.

**L'innesco.** Oggi `main > section { animation: sali }` parte al caricamento con
ritardi progressivi: le sezioni in fondo alla pagina hanno già finito di animarsi
prima che qualcuno le veda. È un difetto che c'è adesso. Si sostituisce con una
trentina di righe di `IntersectionObserver` in `BaseLayout` che aggiunge una
classe quando l'elemento entra in vista; il CSS anima solo da lì. Sotto
`prefers-reduced-motion: reduce` non parte niente e resta il disegno, che si
legge lo stesso.

## Difetti trovati strada facendo, da correggere comunque

1. **La home racconta il portale ricambi meglio di quanto sia.** `projects.ts`
   ha `tagIt: [… "In costruzione"]` e scrive «il portale è in costruzione»;
   `leProve` in `index.astro` lascia cadere quel tag e ci mette sopra «commessa
   reale». Va rimesso.
2. **I colori del testo su fondo scuro non hanno un token.** `#a8c0d6` vive
   dentro `FasciaNumeri`, `#c7d8e6` e `#7f9ab3` non esistono ancora. Con la
   fascia scura che cresce servono in `tokens.css`, non sparsi nei componenti.

## Il vincolo che allarga il lavoro: `/en/`

**Ognuno di questi componenti è usato anche da `src/pages/en/index.astro`.** Non
è un lavoro solo italiano.

Regole che ne discendono:

- I componenti ricevono i testi come props e non importano nulla da `src/data/`:
  si mantiene. La home inglese passa le stringhe di `src/data/en/home.ts`.
- Le sezioni fuse e compattate valgono per entrambe le lingue: i testi inglesi
  esistono già in `testi-en.md`, non se ne inventa nessuno.
- **«Cosa costruisco» non compare sulla home inglese** finché il committente non
  scrive la copy in `testi-en.md`. La pagina inglese non passa quelle props e la
  sezione si salta — è la regola 2 del `CLAUDE.md`, «un campo vuoto salta la sua
  sezione», non un'eccezione.
- Tre componenti hanno consumatori fuori dalla home e le loro props **non
  possono diventare obbligatorie**: `ComeLavoro` (usato da `CorpoChiSono`),
  `Contatto` (da `BaseLayout` e da `en/notes/index`), `DaDoveViene` (citato in
  `Territorio`). L'ancora `#le-prove` è puntata da `Occhiello`: se la sezione
  cambia nome, l'ancora resta.

## Cosa non si tocca

La barra, il piè di pagina, le rotte, `localizedPath` e la barra finale, il
dominio in `astro.config.mjs`, l'interruttore delle statistiche in
`src/data/analytics.ts`, e `verifica-rotte.mjs` — che va lasciato severo com'è.
Il modulo di contatto resta inerte e continua a dirlo.

## Prima della PR

```bash
npm run check     # astro check — 0 errori
npm test          # vitest — tutti verdi
npm run verifica  # build + rotte, feed, link interni, hreflang, italiano su pagine inglesi
```

E, poiché il lavoro tocca componenti condivisi con il sito **in produzione**:
estrarre il testo visibile delle pagine italiane prima e dopo e confrontarlo
guardandolo, non con un hash — in questo repo un confronto byte a byte ha già
dichiarato «identiche» due versioni di cui una aggiungeva 16px di scorrimento
orizzontale su `/chi-sono`.

## Domande ancora aperte

1. **La riga sul perimetro del patto Procedo**, da mettere in `.claude/rules/`.
2. **Spannum esce dalla home** e resta su `/lavori`: confermare. L'alternativa è
   togliere il portale ricambi finché non parte.
3. **Il toolkit in home nomina GitHub e Notion**, che un titolare di PMI
   meccanica non conosce. È il prezzo dell'onestà: è l'unica integrazione vera.
4. **Le foto**: quando arrivano, e di cosa. Il progetto regge senza.
