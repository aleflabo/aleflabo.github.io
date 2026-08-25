# Il sito italiano — documento di progetto

**Data:** 25 agosto 2026 · **Repo:** `aleflabo/aleflabo.github.io` · **Ramo:** `sito-italiano`
**Contesto strategico:** `~/knowledge-vault/docs/2026-08-24-visione-partita-iva.md`

## 0. Dove sta il progetto vero

**Questo documento è il riassunto delle decisioni. Non è la fonte.** Il disegno vero, con
ogni parola e ogni misura, sta in `2026-08-25-sito-italiano/`:

| File | Cos'è | Come si usa |
|---|---|---|
| `tavole/*.dc.html` | Le tredici tavole del mockup, sorgente completo | La verità su misure, colori, spaziature, struttura. Si aprono in un browser |
| `tavole/canvas.json` | Disposizione sulla tela, due pagine, note adesive | Contiene anche il ragionamento dietro ogni pagina |
| `testi.md` | **813 blocchi di testo estratti alla lettera**, pagina per pagina | La fonte del copy. **Copiare, non riscrivere** |
| `stile.md` | Token e foglio di stile condiviso, verbatim | Da portare in `tokens.css` e `global.css` |

Regola per chi implementa: **se una frase del sito non compare in `testi.md`, è stata
inventata.** Se una misura non compare nelle tavole, è stata indovinata. In entrambi i casi
si torna qui invece di decidere da soli.

Le dieci tavole delle pagine sono `Main` (home), `Servizi`, `Formazione`, `Lavori`,
`Ricerca`, `ChiSono`, `Dati`, `Note`, più `HomeMobile` (la home a 390px) e `Rotte` (la mappa,
tavola di lavoro e non una pagina del sito). `DirezioneA/B/C` sono le tre strade visive messe
a confronto: **è stata scelta la B**, le altre due restano come documentazione della scelta.

---

## 1. Il problema, in una frase

Il sito attuale è costruito per essere **assunto**. L'attività nuova ha bisogno che sia
**ingaggiato**. Sono due mestieri diversi: il primo si rivolge a un recruiter o a un CTO che
sa cosa sono CVPR e il RAG multimodale, il secondo al titolare di un'azienda che si fa una
domanda sola — «l'AI mi serve o è una moda?» — e sul sito quella domanda non trova risposta.

Il sito **non va rifatto**: è ben costruito (Astro 5, bilingue, otto case study, JSON-LD,
sitemap). Cambia chi entra dalla porta d'ingresso.

## 2. Le decisioni prese

| Decisione | Scelta |
|---|---|
| Pubblico | **Due, con gerarchia chiara.** Italiano per il compratore, inglese come portfolio |
| Lingua canonica | **Italiano.** Oggi è l'inglese: canonical, sitemap e OG vanno invertiti |
| Prezzi sul sito | **No.** Il lavoro di qualifica lo fanno la forma dichiarata degli ingaggi, «per chi non sono» e il modulo |
| Territorio | **Nessun riferimento visibile.** Né Veneto né città. Resta aperta l'ipotesi di tenerlo nei soli dati strutturati |
| Dominio | `flaborea.com`, **da comprare** |
| Scrittura | **Dentro il progetto**, con RSS e raccolta email |
| Direzione visiva | **B — accento caldo** (vedi §5) |

## 3. La mappa delle rotte

```
/                          italiano, la pagina del compratore
/servizi                   i quattro ingaggi + FAQ                        (nuova)
/formazione                aule, AI Act, le tre strade                    (nuova)
/note                      scrittura + RSS + email                        (nuova)
/i-vostri-dati             riservatezza                                   (nuova, dal piè di pagina)
/lavori                    era `/#work`, ora pagina vera
/lavori/[slug]             i case study, invariati nella forma
/ricerca                   era `/#research`, contenuto ampliato
/chi-sono                  era `/#about`, riscritta
/en/                       il sito di oggi, così com'è
/en/work/[slug]            i case study in inglese

/it/  →  /                 redirect permanente
/#work → /lavori           redirect
```

Menu: Servizi · Formazione · Lavori · Ricerca · Chi sono · Note · **[Parliamone]** · IT/EN.
La pagina sulla riservatezza vive nel piè di pagina, non nel menu: troppo importante per
essere raggiungibile solo dal FAQ, troppo di supporto per il menu.

Piè di pagina su **tutte** le pagine, quattro colonne: presentazione con CTA · Cosa faccio ·
Le prove · Altrove. Otto rimandi contestuali fra le pagine, ognuno collocato dove il
paragrafo ha appena aperto la domanda a cui il link risponde.

## 4. Il guasto da riparare per primo

`astro.config.mjs` dichiara `site: 'https://flaborea.com'` e `public/CNAME` punta lì, ma
**quel dominio non è registrato**. Canonical, sitemap, OG e JSON-LD indicano quindi tutti un
indirizzo inesistente: il sito sta dicendo ai motori di non indicizzare l'unico URL che
funziona (`aleflabo.github.io`).

**Non è una questione di design e viene prima di tutto il resto.** O si compra il dominio, o
si riporta `site` a `https://aleflabo.github.io` e si toglie il CNAME finché non è comprato.

## 5. Il sistema visivo — direzione «accento caldo»

Estensione dei token esistenti in `src/styles/tokens.css`, non sostituzione.

| Token | Prima | Adesso |
|---|---|---|
| `--bg` | `#faf9f7` | `#faf8f4` (crema più calda) |
| `--border` | `#e2ded7` | `#e6ddd0` |
| `--text-muted` | `#555555` | `#55504a` |
| `--accent` | `#1b3a5b` | **resta**: è la struttura (fasce piene, riquadri) |
| `--azione` | — | **`#a8531d`** terracotta: pulsanti, occhielli, filetti, hover dei link |
| `--evidenziatore` | — | `#f0c9a4` |
| `--maxw` | `1080px` | `1120px` |

Caratteri invariati: Fraunces per i titoli, Inter per il testo.

**Il movimento va scritto come regole generali in `global.css`, non come classi sui
componenti** — così vale anche per le pagine scritte dopo:

- entrata scaglionata delle fasce di pagina (`sali`, ritardi progressivi)
- il filetto sotto i titoli si disegna da sinistra (`tira`, `transform-origin: left`)
- le schede si sollevano al passaggio del mouse
- le righe degli elenchi si scaldano e rientrano di 14px
- i pulsanti si alzano di 2px con ombra
- **titolo della home parola per parola** (`parola`: opacità + traslazione + sfocatura, 60ms di scarto)
- **evidenziatore** sotto «dove serve»: `background-size` da `0%` a `100%`
- alone caldo che respira nell'occhiello
- freccia del pulsante che scivola

## 6. Le pagine

### `/` — home, sette blocchi
Occhiello (titolo 66px animato, sottotitolo, due CTA, riga credenziali) · **fascia blu coi
numeri** (10 articoli · 533 citazioni · 1 Best Paper · 2 anni da CTO) · il problema (tre
riquadri con frasi vere) · come lavoro (quattro passi con durata e «ne esce») · le prove
(portale ricambi, Procedo, Spannum) · formazione · da dove viene quello che so · contatto.

Sulla home **non compaiono stack né sigle tecniche**: vivono su `/lavori` e `/ricerca`.

### `/servizi`
Quattro ingaggi con etichette **Capire · Decidere · Costruire · Mantenere**, ciascuno con
*per chi*, *quanto dura*, *cosa resta*. Poi «per chi non sono» (quattro righe oneste) e un
**FAQ di cinque domande**, fra cui «Quanto costa?» che regge la scelta di non pubblicare
prezzi.

### `/formazione`
Ore dichiarate (4 · 8-12 · concordata), riquadro sull'**AI Act** come contesto e non come
minaccia, le tre strade per organizzare un corso, la credenziale d'aula (quattro anni da
assistente alla didattica, Ferrari), e «che cosa questo corso non è».

### `/lavori`
Due gruppi **per materia, non per chi ha pagato**: *Software per le aziende* (Procedo,
portale ricambi, Tire Hub, Cost Tracking) e *Prodotti e strumenti miei* (Spannum, Fanta
Mundial, Agentic Toolkit, Paesello, il video generativo, Contrada Navigator, Vault,
HomeSweatHome). Dodici voci.

I tag **non contengono nomi di tecnologie**: dicono cosa fa la cosa e a che punto è
(«Esiti aggiornati da soli», non «pg_cron»). Sul lato inglese lo stack **resta**, perché lì
il lettore cerca proprio quelle parole.

### `/ricerca`
Dieci pubblicazioni con sede, anno, citazioni e stelle. Fascia con **10 · 533 · 3 da primo
autore · 1 Best Paper Award**. In cima il riquadro «cosa c'entra con la tua azienda», che
traduce la ricerca in una frase che un capo reparto riconosce e mostra la linea diretta fino
a Procedo.

### `/chi-sono`
Foto (**da fornire**), arco biografico intero, «abitudini che vale la pena sapere prima».

### `/i-vostri-dati`
Tre situazioni tenute separate (ChatGPT usato per conto proprio · il software che costruisco
io · i documenti per la diagnosi), «quello che non posso garantirvi», e le prove tecniche
(isolamento per cliente in Procedo, proprietà intellettuale nel portale ricambi).

### `/note`
Sei articoli con data, titolo, sommario e tag. RSS e raccolta email.

## 7. Le regole di scrittura, ricavate a forza di correzioni

Vincolanti per ogni testo nuovo:

1. **Mai la costruzione «non X, ma Y»** e mai la frase-schiaffo a fine paragrafo. È il tic più
   riconoscibile della scrittura generata (ne erano state trovate nove).
2. **I titoli non aprono con un numero** salvo quando il numero è informazione, e **non hanno
   virgola più seconda proposizione**. Erano undici e undici.
3. **Mai giustificarsi.** Niente «ce ne sono di migliori del mio», «per questo non lo fanno
   tutti», «senza dovervi fidare di me». Il riflesso rientra ogni volta che il testo tocca le
   credenziali accademiche: è il punto da rileggere per primo.
4. **Mai «ha senso».** Vago. Si dice cosa succede.
5. **Mai giudicare cosa serve al lettore** («ha senso solo per chi…»). Si dice cosa c'è dentro.
6. **Registro:** il *tu* è per chi legge, il *voi* per l'azienda. Le cose consegnate sono
   dell'azienda («il codice è vostro»), le promesse sono personali («te lo dico subito»).
7. **Niente allarmismo sull'AI Act.** L'obbligo si cita come fatto; l'angolo è «il corso lo
   farete comunque, vale la pena che serva».
8. **Nessun riferimento geografico visibile.**

## 8. Correzioni ai dati esistenti

In `src/data/projects.ts`, verificate contro `~/cv/content/en.yaml`:

- **Procedo**: indicato `2023–Present`, il ruolo di CTO è **luglio 2024 – luglio 2026**;
  oggi è **advisor**. Il tempo dei verbi va al passato ovunque.
- **HomeSweatHome**: indicato `2022`, è **2021–2023**.

In `src/components/Research.astro`: i paper elencati sono sei (quelli con repository
pubblico), le pubblicazioni sono **dieci**. Mancano le citazioni e il **Best Paper Award**
(CVPR Workshops Precognition 2023).

I conteggi per singolo articolo presi dal CV sommano 494 mentre il totale corrente è **533**:
il CV è indietro. Sul sito il totale va datato, oppure si tengono solo il totale e le stelle.

## 9. Le cose che il mockup presuppone e che vanno collegate

Il disegno mostra elementi che non sono statici e per cui serve una scelta tecnica. Nessuno
di questi è deciso.

| Elemento | Dove | Cosa serve decidere |
|---|---|---|
| Modulo di contatto | home, quattro campi | Dove finiscono gli invii. Il sito è statico su GitHub Pages: serve un servizio esterno o una function |
| Prenotazione a calendario | home, formazione, chi sono | Quale strumento, e se si incorpora o si linka |
| WhatsApp | home, formazione | Un `wa.me` con numero e messaggio precompilato |
| Raccolta email | `/note` | Quale servizio, e il consenso |
| RSS | `/note` | Feed generato da Astro |
| Curriculum in PDF | `/chi-sono` | I PDF li produce già il repo `cv` (RenderCV → Typst): va deciso se copiarli a mano o automatizzare |
| Privacy e cookie | piè di pagina | Due pagine che oggi non esistono. Servono se c'è un modulo |

Va tenuto presente che **il sito è statico**: ogni elemento che riceve dati richiede un
servizio di terze parti, e ognuno di quei servizi va poi raccontato nella pagina sulla
riservatezza, che sarebbe incoerente altrimenti.

## 10. Fuori perimetro

Il lato inglese non si tocca: stessi contenuti, stesso stack dichiarato, stessa struttura,
spostato sotto `/en/`. Nessuna riscrittura dei case study esistenti nella forma. Nessun
listino. Nessuna pagina per settore.

## 11. Domande ancora aperte

1. **Il dominio** — comprare `flaborea.com` o riportare `site` a `aleflabo.github.io`.
2. **La foto** — serve per `/chi-sono` e per la colonna destra dell'occhiello.
3. **Una testimonianza vera** — è l'unico buco rimasto rispetto alla concorrenza, e si chiude
   solo chiedendo a qualcuno (Procedo, il costruttore del portale ricambi, un ex socio).
4. **Le affermazioni che presuppongono una clientela già avuta** — «le tre cose che mi vengono
   raccontate più spesso», «metà delle richieste che ricevo», «è successo». Difendibili da due
   anni di clienti in Procedo, non dal primo mese in proprio. Da decidere caso per caso.
5. **I nomi dei quattro passi** — la home dice *Ascolto · Diagnosi · Costruisco · Resto*,
   `/servizi` dice *Mezza giornata diagnostica · Audit AI · Software su misura · Canone*. O si
   allineano, o si cambia il testo del link che li collega.
6. **Il territorio invisibile** — geografia nei soli dati strutturati per la ricerca locale.
7. **I fotogrammi del video** per la scheda «Una storia in più scene».
