# Il sito cambia faccia: «Laboratorio»

*8 novembre 2026. Committente: Alessandro Flaborea. Stato: **approvata** l'8 novembre («ok»), dopo una lettura
indipendente e le risposte del committente alle domande aperte.*

Materiali in [`2026-11-08-redesign-laboratorio/`](2026-11-08-redesign-laboratorio/):
`mockup-direzioni.html` (le tre direzioni provate; quella scelta è la scheda «A ·
Laboratorio», già con le modifiche chieste) e `posa.json` (i punti della posa calcolati
sulla foto).

## Da dove nasce

> «il mio attuale sito web personale è super lame e al 100% si capisce che è fatto da AI»

Riferimenti dati dal committente: jamie-dev-portfolio.netlify.app,
thanhlongnguyen.vercel.app, jrdev-port.netlify.app. Due su tre sono template con il
lorem ipsum. Quello che gli piace è l'atteggiamento: il nome in grande, una faccia, un
linguaggio da sviluppatore, qualcosa che si muove, poco testo.

La diagnosi, fatta guardando il sito accanto ai riferimenti:

- **La palette crema + Fraunces + terracotta + blu notte è oggi la firma più
  riconoscibile dei siti generati.** L'audit del 26 agosto
  (`docs/audit-taste-2026-08-26.md`) l'aveva difesa: quella conclusione era sbagliata.
- **La struttura è una landing SaaS**: occhiello → titolo con parola evidenziata → fascia
  numeri → tre card → passi numerati → tre card → fascia scura con modulo.
- Il proprietario del sito non si vede (niente foto, niente nome in grande), non si muove
  niente, e la home è lunga quasi sette schermate.

Sono state provate tre direzioni affiancate (vedi il mockup). Scelta: **A «Laboratorio»**,
con due innesti dalla B: la foto in card con la posa e le righe dei lavori con
l'anteprima al passaggio del mouse.

## Per chi

Direzione «C ibrida», scelta dal committente: la home è il portfolio di chi costruisce,
e porta due pubblici a due porte esplicite.

- **Chi è del mestiere** (CTO, startup, tech lead, recruiter): deve capire in cinque
  secondi chi è e cosa ha costruito.
- **Chi ha un'azienda** (il titolare di PMI che il sito serviva finora): trova la sua
  porta, i servizi e il modulo.

## Obiettivi

1. Tutte le pagine, italiane e inglesi, con il nuovo stile: home, servizi, formazione,
   lavori e scheda singola, ricerca, note e nota singola, chi sono, i-vostri-dati,
   privacy, cookie, 404.
2. Una home corta (vedi sotto). Tutto quello che oggi sta in home e non è nel mockup si
   sposta nelle pagine giuste, e non si perde.
3. Un modulo di contatto **che funziona davvero** e manda le richieste via mail.
4. Movimento misurato, in CSS e piccoli script, che rispetta `prefers-reduced-motion`.

## Non obiettivi

- Niente React, Tailwind, Magic UI o `motion` come dipendenze. Gli effetti del mockup si
  rifanno in CSS e in piccoli `<script>` di Astro. *Scelta di chi ha scritto questo
  documento, presentata al committente e non contestata.* Se un giorno serve un effetto
  che il CSS non sa fare (per esempio il campo di linee della variante C), si discute
  allora.
- Niente tema scuro. Il sito oggi è solo chiaro, e resta così. *Scelta mia.*
- Niente nuovi contenuti oltre quelli elencati più sotto in «Testi».
- Niente cambio di stack: Astro 5 statico su GitHub Pages, Sanity per le note.

## Anti-obiettivi: sarebbe un fallimento anche se funziona

- **Che sembri di nuovo generato.** Niente occhielli maiuscoli spaziati sopra i titoli
  (il committente li ha bocciati anche nel mockup: «molto AI»), niente file di tre card
  uguali, niente parola evidenziata nel titolo.
- **Riquadri vuoti in produzione.** Il committente oggi non ha screenshot né GIF dei
  progetti. Un riquadro grigio con scritto «[ screenshot ]» sul sito vero sembra rotto.
- **Una posa sbagliata sulla foto.** Il committente l'ha notato subito nel mockup quando
  i punti erano messi a mano. I punti si calcolano con un modello, mai a occhio.
- **Perdere le garanzie che il sito ha già**: hreflang, slash finale, testo italiano
  vietato sulle pagine inglesi, 44px al tocco, dati strutturati, informative che dicono
  il vero. Le regole stanno nel `CLAUDE.md` della repo e valgono anche qui.

## Il sistema visivo

Preso dalla scheda A del mockup. I valori sono quelli del mockup; chi costruisce può
ritoccarli per il contrasto (vedi «Vincoli»).

| token | valore | uso |
|---|---|---|
| carta | `#f7f8fa` | fondo |
| inchiostro | `#101318` | testo |
| muto | `#5d6470` | testo secondario |
| filo | `#dfe3ea` | griglia, bordi, divisori |
| rilevamento | `#ff2d6f` | l'unico accento: cursore, posa, pulsante principale, hover |
| blu | `#2b59ff` | solo le celle che si accendono nella griglia, a bassissima opacità |

- **Caratteri:** Geist (testo e titoli) e Geist Mono (etichette, numeri, date, codice).
  **Ospitati nel sito**, come oggi Fraunces e Inter con `@fontsource-variable/*`
  (esistono `@fontsource-variable/geist` e `@fontsource-variable/geist-mono`, 5.3.0).
  Mai da Google Fonts: le informative promettono che il browser chiama solo questo
  dominio, e `verifica-rotte.mjs` lo controlla. Fraunces e Inter escono dalle
  dipendenze.
- **Griglia a filo** di 48px sullo sfondo, sfumata verso i bordi, con qualche cella che
  si accende piano. Contenitore con bordi laterali a filo, come un foglio tecnico.
- **Numeri in monospace** con cifre tabellari.
- **Raggi:** piccoli sugli elementi interni (4–7px), più morbidi sui contenitori come la
  card della foto (20px).

## La home

In quest'ordine. Il riferimento visivo è la scheda A del mockup.

1. **Barra**: `alessandro.flaborea` in mono, **le sei voci di oggi** (Servizi, Formazione,
   Lavori, Ricerca, Chi sono, Note), «Parliamone» e IT/EN. *Scelta mia: il mockup ne
   mostrava quattro per brevità, ma togliere Chi sono e Formazione dal menu lascerebbe
   senza ingresso le pagine dove vanno le sezioni spostate.*
2. **Nome** su due righe, grande, con un cursore rosso che lampeggia.
3. **«> costruisco ___»**: le parole che ruotano sono *computer vision*, *LLM applicati*,
   *agenti AI*, *software su misura*.
4. **Terminale** che scrive una volta `cat alessandro.json` e un piccolo JSON con fatti
   veri: dottorato (computer vision, Sapienza – PINlab), pubblicato a CVPR/ICCV/IROS, CTO
   di Procedo 2024–2026, adesso in proprio. Con `prefers-reduced-motion` compare già
   scritto.
5. **Pulsanti**: «Prenota mezz'ora →» (scende al modulo in fondo alla home) e «Guarda
   cosa ho costruito» (va ai lavori).
6. **Riquadro informazioni** a quattro celle: Venezia con l'orologio di Roma e il pallino
   verde, ex CTO Procedo, dottorato Sapienza – PINlab, CVPR · ICCV · IROS.
7. **La foto** in una card arrotondata e appena ruotata (vedi «La foto e la posa»).
8. **Quattro numeri** che contano da zero: 10 articoli pubblicati, 533 citazioni, 1 Best
   Paper Award, 2 anni da CTO.
9. **Le due porte**: «Per le aziende» → `/servizi`, «Per chi è del mestiere» →
   `/ricerca`. Al passaggio del mouse il bordo è percorso da un raggio rosso.
10. **«Alcune cose che ho costruito»**: le righe dei lavori (vedi «I lavori a righe»).
11. **Fascia dello stack** che scorre: Python, PyTorch, OpenCV, MediaPipe, Flask + Celery,
    PostgreSQL, Gemini, AWS, Astro, Angular, Laravel, Nuxt. *Elenco del mockup, da far
    confermare al committente insieme agli altri testi nuovi.*
12. **Il modulo di contatto**, come blocco finale (vedi «Il modulo»).
13. **Piè di pagina** (vedi «Pagine interne»).

### Dove vanno le sezioni che escono dalla home

| sezione di oggi | dove va |
|---|---|
| «Le tre cose che mi vengono raccontate più spesso» (Il problema) | `/servizi`, in apertura |
| «Metto insieme quello che avete già» (il diagramma animato, PR #32) | `/servizi`, dopo il problema |
| «Come si svolge di solito un lavoro» (i quattro passi) | `/servizi` ne ha già la versione estesa: la sintesi della home **si toglie**, non si duplica |
| «Si comincia dalle persone» (formazione) | `/formazione` ha già i tre corsi: la sintesi **si toglie** |
| «Dalla ricerca alla produzione» | `/chi-sono` |
| «Venezia è la mia base» (`src/data/territorio.ts`) | `/chi-sono`. I dati strutturati continuano a leggere lo stesso file |
| La fascia numeri scura | sostituita dai quattro numeri del punto 8 |
| Il modulo e WhatsApp/mail | restano in fondo alla home, rifatti |

*Assegnazione mia, da verificare sul costruito: se una sezione in un'altra pagina stona,
si sposta.*

## La foto e la posa

- Card 4:5 (le stesse proporzioni della foto, così la posa combacia senza ritagli),
  arrotondata, ruotata di -2°. Al passaggio si raddrizza e si ingrandisce appena.
- **Desktop:** al passaggio del mouse o al focus da tastiera si disegna lo scheletro della
  posa, osso dopo osso. Poi compaiono i punti ed esce l'etichetta «pose · 11 keypoints».
  Senza riquadro di detection. Sotto la card, «↑ passaci sopra».
- **Telefono** (`hover: none`): la posa si disegna **una volta sola** quando la card entra
  nello schermo (IntersectionObserver, soglia 0,6). Lì «passaci sopra» non compare.
- **I punti sono calcolati, mai messi a mano.** Il 2026-11-08 sono stati calcolati con
  Keypoint R-CNN di torchvision (`keypointrcnn_resnet50_fpn`, pesi COCO) sulla foto
  `src/assets/alessandro-flaborea.jpg` ridotta a 640×800: persona con confidenza 1,00 e
  11 punti COCO visibili (naso, occhi, orecchie, spalle, gomiti, polsi). Anche e gambe
  sono fuori inquadratura, con confidenza negativa, e non si disegnano. I valori stanno
  in `posa.json`. Vanno in un file dati del sito, con un commento che dice come sono
  stati ottenuti. **Se cambia la foto o il suo ritaglio, si ricalcolano.**
- Lo strato SVG ha `width/height: 100%` espliciti e lo stesso ritaglio dell'immagine
  (`object-fit` ↔ `preserveAspectRatio`). Nel mockup una dimenticanza su questo punto
  aveva spostato tutto lo scheletro.

## I lavori a righe

- Una riga per progetto: anno in mono, nome grande, categoria in grigio a destra.
  **Nessun occhiello sopra il titolo.**
- Al passaggio il nome scivola a destra e prende l'accento, e una linea rossa si disegna
  sotto la riga.
- **Anteprima che segue il cursore**, con un leggero ritardo, e cambia da una riga
  all'altra. **Si mostra solo per i progetti che hanno un'immagine**: oggi non ce
  n'è nessuna, quindi in produzione l'anteprima non compare finché il committente non
  fornisce screenshot o GIF. Il componente si costruisce comunque, pronto ad accenderla.
  *Scelta mia, per l'anti-obiettivo dei riquadri vuoti: va confermata.*
- Telefono: niente anteprima, e sotto il nome compare la descrizione.
- In home quattro progetti: Portale ricambi 3D, Procedo, Spannum, Fanta Mundial, con
  testi e categorie da `testi.md`. `/lavori` usa lo stesso componente per tutti.
- **Home inglese:** Portale ricambi 3D è `soloItaliano` (nessun testo inglese approvato,
  nessuna rotta `/en/work/`), quindi lì le righe sono Procedo, Spannum, Fanta Mundial e
  Agentic Workflow Toolkit, tutti con testi inglesi già approvati. *Scelta mia.*

## Il modulo

- **Servizio: Web3Forms** (scelta del committente). Un normale `<form method="post">`
  verso `https://api.web3forms.com/submit` con la `access_key` nel markup (è pubblica per
  costruzione). **Nessuno script esterno**: così restano vere le frasi delle informative
  sul fatto che leggere la pagina non chiama altri domini.
- **Senza hCaptcha**, perché scrive cookie. Contro lo spam si usa il campo nascosto
  `botcheck` di Web3Forms.
- Campi: quelli di oggi (Azienda, Come ti scrivo, Cosa vorresti smettere di fare a mano,
  Quanto è urgente), con validazione nativa (`required` dove serve) e messaggi d'errore
  in linea.
- **Dopo l'invio**: `redirect` di Web3Forms verso una pagina di conferma del sito (IT ed
  EN). *Scelta mia: funziona anche senza JavaScript. Chi costruisce può aggiungere un
  invio via `fetch` con conferma in pagina, purché la versione senza JS resti.*
- **Niente casella di consenso.** La base giuridica è rispondere a una richiesta
  dell'interessato. Accanto al pulsante una riga con il link all'informativa.
- WhatsApp e mail restano sotto il modulo, come alternativa.
- **Per il committente:** la `access_key` si crea su web3forms.com con l'indirizzo che deve
  ricevere le richieste. Senza la chiave il modulo non può essere provato.
- **Il rifacimento esce con il modulo spento** (decisione del committente: «intanto
  mettiamo non attivo»). Il modulo si costruisce completo, nel nuovo stile, dietro un
  interruttore sul modello di `statistiche` in `src/data/analytics.ts`: una sola costante
  con la `access_key`, oggi `null`. Con `null` il pulsante è disattivato e la pagina dice
  «Modulo non ancora attivo», come oggi, e restano WhatsApp e mail. Valorizzata la
  chiave, il modulo si accende **e** le informative mostrano la sezione che lo descrive.
  Accenderlo sarà un cambio di una riga più l'approvazione di quel testo legale.

### Le informative

Con l'interruttore acceso (vedi sopra), `/privacy`, `/i-vostri-dati` e le versioni inglesi
mostrano una sezione sul modulo. Con l'interruttore spento non compare, perché non
sarebbe vera. La sezione dice: quali
dati, verso chi (Web3Forms come responsabile del trattamento, con il link alla sua privacy
policy), perché, per quanto tempo. È testo legale nuovo: lo scrive chi costruisce e lo
approva il committente. `/cookie` non cambia.

Le frasi in `PROMESSE_SENZA_TERZI` di `verifica-rotte.mjs` riguardano ciò che il browser
carica **leggendo** una pagina, e restano vere con un modulo senza script. Se una di
quelle frasi smette di esserlo, si cambiano la frase e il controllo insieme, mai il
controllo da solo (regola 3 del `CLAUDE.md`).

## La newsletter su `/note`

Resta **inattiva, nel nuovo stile**, con la scritta «Iscrizione non ancora attiva»
(decisione del committente). Nessun collegamento a Web3Forms per ora.

## Le pagine interne

Stesso sistema della home: griglia a filo, Geist e Geist Mono, accento unico, intestazione
di pagina con il titolo grande e una riga in mono al posto dell'occhiello. **Prima di
implementarle si fa un mockup** dei loro schemi (pagina di testo lungo come servizi, pagina
elenco come lavori, note e ricerca, scheda singola di un lavoro o di una nota, pagina
legale, 404, piè di pagina) e il committente lo approva. Le pagine non sono ancora
disegnate: questo documento non decide la loro forma.

## Testi

Regola 2 del `CLAUDE.md`: i testi non si inventano. Valgono anche le regole di
`.claude/rules/copy-e-tono.md`, compreso il «tu» a chi legge e il «voi» all'azienda.

**Nuovi in italiano**, già visti nel mockup e approvati dal committente insieme alla
direzione («mi pare ok il resto»):

- «costruisco» + le quattro parole che ruotano
- «Venezia» con l'orologio
- «Per le aziende», «Per chi è del mestiere»
- «↑ passaci sopra», «pose · 11 keypoints»
- le chiavi del JSON nel terminale (`dottorato`, `pubblicato_a`, `cto`, `adesso`)
- l'elenco dello stack nella fascia

**Dal mockup, tenute come proposto** (il committente non ha obiettato): «diagnosi · audit ·
software · formazione →» e «paper · codice · note →» in fondo alle porte, il contatore
«4 di 12 · /lavori», le descrizioni accorciate di Procedo e Fanta Mundial nelle righe dei
lavori (tagli di frasi approvate, senza parole nuove). **Tolta** l'etichetta «1040 · home»
sopra il nome, che era solo decorazione.

**Da scrivere**, a cura di chi costruisce, e da far approvare al committente prima del
merge: la versione inglese di tutto quanto sopra, il testo della pagina di conferma del
modulo, le sezioni delle informative sul modulo, la riga accanto al pulsante.

Ogni testo approvato entra in `testi.md` / `testi-en.md` prima di entrare nel codice.

## Vincoli

- Le tre verifiche prima di ogni PR (`npm run check`, `npm test`, `npm run verifica`) e
  `verifica-telefono.mjs` quando cambia il CSS di dimensioni e aree di tocco. Il nuovo CSS
  deve mantenere la regola dei 44px nei tre punti dove vive oggi (o dove finirà dopo il
  rifacimento di `global.css`, `Nav.astro`, `Footer.astro`), sempre su `pointer: coarse`.
- **Contrasto AA** su tutto il testo, misurato sui nodi di testo e non sugli elementi.
  Il sito di oggi ha difetti noti, tutti dovuti a `--text-faint` e `#999`: il rifacimento è
  l'occasione per chiuderli, non per rifarli.
- `prefers-reduced-motion`: niente rotazione delle parole, terminale già scritto, numeri
  già al valore finale, marquee ferma, posa visibile senza animazione.
- Il sito italiano è **in produzione** e ogni push su `main` va online. Vedi «Come si
  consegna».
- Le trappole del `CLAUDE.md` (server di sviluppo vecchio dopo un cambio di branch,
  `preview` che cambia porta in silenzio, screenshot che perde il touch) valgono tutte,
  in particolare nei confronti prima e dopo.

## Come si consegna

*Scelta mia.* Un branch d'integrazione `feat/redesign-laboratorio`, con una PR per tappa
**verso quel branch**, e un solo merge su `main` alla fine. Così il sito in produzione
non mostra mai metà pagine nuove e metà vecchie.

1. **Base e home**: si apre con un **piccolo mockup** di ciò che il mockup scelto non
   mostra ma la home usa: barra completa con IT/EN e menu a tendina sul telefono, blocco
   del modulo, piè di pagina. Approvato quello, token, caratteri, `BaseLayout`, `Nav`,
   `Footer`, la home e lo spostamento delle sezioni. *Scelta mia: così la tappa 1 non
   consegna pezzi provvisori e la tappa 2 non deve ridisegnare il piè di pagina.*
2. **Pagine interne**: prima il mockup e la sua approvazione, poi l'implementazione.
3. **Modulo e informative**: modulo Web3Forms dietro l'interruttore spento, pagina di
   conferma, testi legali pronti ma visibili solo a interruttore acceso. Non blocca il
   merge: si accende dopo, quando arriva la chiave.
4. **Merge su `main`**, dopo un giro completo delle verifiche e un confronto visivo di
   tutte le pagine, IT ed EN.

## Lasciato a chi costruisce

- La scomposizione in componenti Astro e i nomi dei file.
- Come rifare in CSS/JS gli effetti del mockup (griglia che si accende, raggio sul bordo,
  numeri che contano, marquee, anteprima che segue il cursore), purché il risultato sia
  quello del mockup e rispetti `prefers-reduced-motion`.
- Il ritocco dei valori di colore per il contrasto, purché resti un solo accento.
- Cosa fare di `docs/audit-taste-2026-08-26.md`: almeno un banner che dica che la parte
  sulla palette è superata.
