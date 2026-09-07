# Il confronto con dariofontanel.com, struttura contro struttura

*7 settembre 2026. Committente: Alessandro Flaborea. Stato: da approvare.*

## Perché

> «secondo me l'intera struttura è molto claude like website. un po' come il sito
> https://dariofontanel.com/ . mi piace molto perchè scrollando c'è un'animazione molto
> figa che riesce a far percepire quale valore può dare ad un'azienda. anche la
> spiegazione di come lavora è molto chiara, mi pare più di quello che abbiamo
> costruito noi»

E, il 7 settembre, dopo la home rifatta: **«nel nostro sito secondo me non siamo ancora
a quel livello»**.

La prima metà di quella frase — l'animazione che fa percepire il valore — è stata
raccolta dalla PR #32. Questo documento affronta la seconda: **la spiegazione di come si
lavora, e da dove parte**.

Le due pagine sono state caricate in un browser vero, scorse fino in fondo, e la loro
struttura estratta nodo per nodo con la posizione e il corpo del testo. Quello che segue
è misurato, non ricordato.

## Le due pagine, affiancate

| | dariofontanel.com | flaborea.com (ramo `feat/home-visuale`) |
|---|---|---|
| altezza | 13.100px | 6.375px |
| sezioni | 7 | 8 |
| dove arriva il primo contenuto dopo l'apertura | 4.800px (36%) | 940px (15%) |
| la sezione più lunga | la risposta, 2.800px (21%) | come lavoro + le prove, 1.800px (28%) |
| numeri grandi in pagina | 3, a 115px | 4, a 26px |
| di chi sono quei numeri | **del lettore** | **miei** |
| a che punto arrivano le sue credenziali | 6ª sezione su 7 (82% di scorrimento) | 2ª su 8 (15%) |
| porte d'ingresso proposte | **una** (AI Audit) | **quattro** (i quattro ingaggi) |

## Le sette sezioni di Fontanel, in ordine

1. **Apertura** — occhiello «AI PER LE PMI ITALIANE», titolo a 64px, *una* frase, due
   pulsanti. Poi 4.000px di animazione agganciata allo scorrimento.
2. **IL PROBLEMA** — non un'affermazione: una domanda. «Quante di queste ore stanno
   facendo crescere davvero la tua azienda?» Sotto, tre numeri a **115px** — 11 ore,
   9 ore, 7 ore — e la legenda che li rende del lettore: «1 CELLA = 1 ORA DELLA
   SETTIMANA DEL TUO TEAM». Chiude indicando dove si va: «Scoprilo con un AI Audit ↓».
3. **LA RISPOSTA** — *una* cosa, con un nome proprio: l'AI Audit. Prima la tesi che
   giustifica perché serve («la maggior parte delle aziende parte dalla ricerca dello
   strumento, non dal problema»), poi l'offerta smontata in tre fasi visibili —
   Discovery, Analisi & priorità, Deliverables — ognuna con un titolo, cosa succede, e
   **un artefatto finto ma concreto**: una trascrizione con i minutaggi, una matrice,
   una roadmap.
4. **DOPO L'AUDIT** — due prodotti, che esistono solo dopo il primo passo.
5. **SENZA UN PROGETTO COMPLETO** — due opzioni minori, marcate A. e B.
6. **CHI FIRMA L'AUDIT** — qui, e solo qui, le sue credenziali: dottorato, 300+
   citazioni, Amazon, Snapchat.
7. **CONTATTI** — il modulo.

## Le nostre otto

1. **Occhiello** — titolo a 66px, intro, due pulsanti, riga di credibilità.
2. **Fascia numeri** — 10 articoli, 533 citazioni, 1 Best Paper Award, 2 anni da CTO,
   più la linea del tempo del percorso.
3. **Il problema** — «Le tre cose che mi vengono raccontate più spesso», tre citazioni.
4. **Metto insieme quello che avete già** — il diagramma.
5. **Come si svolge di solito un lavoro** — quattro passi.
6. **Le prove** — tre schede.
7. **Formazione** — una striscia.
8. **Parliamone** — territorio e modulo.

## Le cinque differenze che contano

Non sono di grafica. Sono di ordine e di proprietà.

### 1. I numeri grandi sono miei, non di chi legge — ed è la prima cosa che si vede

È la differenza più grossa e la più facile da correggere. A 940px, secondo blocco
della pagina, il lettore trova **10 · 533 · 1 · 2**: articoli, citazioni, premi, anni
da CTO. Sono fatti veri e verificati, ma parlano di me a qualcuno che è arrivato con un
problema suo.

Fontanel mette i suoi numeri identici per natura — 300+ citazioni, 15+ paper — alla
sesta sezione su sette, sotto un titolo che ne spiega il senso: **«CHI FIRMA
L'AUDIT»**. Non sono un vanto: sono la garanzia di chi mette la firma su una cosa che
il lettore, a quel punto, ha già capito di volere.

I suoi numeri grandi, invece, sono le ore della settimana di *chi legge*.

### 2. Il nostro problema è raccontato meglio, ma non si può misurare

Le tre citazioni — «Mi serve questo pezzo», «Lo sa fare solo Bruno», «Abbiamo provato
ChatGPT» — sono scritte meglio di qualunque riga della pagina di Fontanel: sono
concrete, hanno una voce, e chi lavora in un'azienda meccanica si riconosce.

Ma sono *ritratti*. Il lettore annuisce e passa oltre. La domanda di Fontanel, invece,
gli fa fare un conto sulla propria azienda, e chi ha fatto quel conto ha già un motivo
per continuare a scorrere. La differenza non è la qualità della scrittura: è che una
chiede al lettore di **fare qualcosa**.

### 3. Lui apre una porta, noi quattro

Tutta la sua pagina converge sull'AI Audit. Le altre offerte esistono in relazione a
quella: «dopo l'audit», «senza un progetto completo». Chi legge non deve scegliere:
gli viene detto da dove si comincia.

Noi presentiamo quattro ingaggi alla pari — Mezza giornata diagnostica, Audit AI,
Software su misura, Canone di servizio — dentro «Come si svolge di solito un lavoro».
Sono quattro passi di un percorso, ma stanno in pagina come quattro schede uguali, e
la scelta torna al lettore.

### 4. Lui fa vedere cosa si porta a casa, noi lo dichiariamo

Sotto ogni fase Fontanel mette un artefatto: la trascrizione con i minutaggi
(`00:47:12`, `04:12`, `11:38`), la matrice delle opportunità, la roadmap. Sono finti, e
si capisce che lo sono, ma dicono *che forma ha* la cosa che riceverai.

Noi scriviamo «Ne esce: un documento che resta tuo, e che puoi far leggere a chi
vuoi». È una promessa migliore della sua, ed è invisibile.

Il diagramma della PR #32 è l'unico posto dove facciamo vedere invece di dire — ma fa
vedere **come funziona il software**, non **che cosa succede quando mi ingaggi**.

### 5. Lui spende il 21% della pagina su una cosa sola

La sua sezione «LA RISPOSTA» è lunga 2.800px e parla di un solo prodotto. Il nostro
blocco più lungo, 1.800px, contiene quattro passi e tre progetti diversi.

Non è una questione di lunghezza — la nostra pagina è metà della sua e va benissimo —
ma di **quanto si insiste su un'idea prima di passare alla successiva**.

## La rilettura del committente, che è più precisa di questa analisi

Il 7 settembre, letta la tabella qui sopra:

> «quello che mi interessava di più dal sito di fontanel è che scrollando c'è un po' una
> storia raccontata verso l'esigenza di chi legge. da noi non emerge bene. "il problema"
> e "metto insieme quello che avete già" non fa capire quanto è possibile accelerare o
> integrazione tool ai secondo me»

Tre affermazioni, verificate una per una sul costruito e sui dati. **Tutte e tre
reggono, e due spostano la diagnosi.**

### «I numeri del lettore non ci sono» — falso, ma peggio

Ci sono già, e sono buoni. Due dei tre riquadri di «Il problema» portano una misura
nelle unità di chi legge:

| | la misura | dove sta |
|---|---|---|
| «Mi serve questo pezzo.» | «succede che **ci si mettano in due per un paio di giorni**» | corpo del riquadro, **15px** |
| «Lo sa fare solo Bruno.» | «**Quarant'anni** di mestiere… **fra due anni** Bruno va in pensione» | corpo del riquadro, **15px** |
| «Abbiamo provato ChatGPT.» | nessuna | — |

E i miei numeri — 10 articoli, 533 citazioni, 1 Best Paper, 2 anni da CTO — stanno a
**26px**, in una fascia tutta loro, **due schermate più in alto**.

Quindi non manca il numero del lettore: **manca la gerarchia**. Due uomini per due
giorni è un numero più forte di 533 citazioni per chiunque arrivi con un preventivo da
fare, ed è scritto undici pixel più piccolo. Fontanel non ha numeri migliori dei nostri:
li ha messi a 115px.

**Questo cambia la proposta B.** Non serve inventare un numero: serve promuovere quello
che c'è già.

### «Non fa capire quanto è possibile accelerare» — vero, ed è un buco nei dati

Non è un problema di scrittura. Il campo `result` di tutti e dieci i progetti in
`src/data/projects.ts` descrive **lo stato del progetto**, mai **il guadagno del
cliente**:

> «Procedo gira in produzione presso clienti industriali, è stata selezionata
> dall'acceleratore B4i di Bocconi e ha chiuso un round angel.»
> «La pipeline di conversione dei CAD è finita e collaudata; il portale è in
> costruzione.»
> «Le operazioni di routine e la documentazione ora girano come invocazioni di agenti a
> un comando invece che a mano.»

Sono onesti e sono invisibili a chi si chiede quanto ci guadagna. **Il dato non esiste
nel repo perché non è mai stato misurato**, quindi nessuna riscrittura lo può produrre —
e inventarlo è vietato due volte: dalla regola 2 e da una frase del sito stesso, su
`/formazione`: «Non arrivo con una percentuale di risparmio già scritta sulle slide.
Prima di aver visto come lavorate sarebbe un numero inventato.»

C'è una sola via onesta, e non è di copy: **misurare un prima/dopo su un lavoro vero**,
anche uno solo, anche approssimato, e scriverlo. Il candidato naturale è il portale
ricambi, perché il suo «prima» è già scritto in pagina — due persone per due giorni — e
manca solo il «dopo».

Finché quel numero non esiste, la cosa corretta da fare **non** è aggirare il problema
con un'altra formulazione: è dire che non c'è.

### «Integrazione tool AI» — vero, e su questo la pagina tace quasi del tutto

Sulla home la parola che allude ai sistemi aziendali è **una**: «gestionali», dentro
l'elenco dei frammenti del diagramma, «Cartelle, fogli, caselle di posta, gestionali».
Le altre tre sono documenti. Il nodo centrale dice «Legge e collega, ogni giorno, da
solo».

Il diagramma fa quindi vedere che l'AI **legge dei documenti sparsi**. Non fa vedere che
**si aggancia ai software che in azienda girano già**, che è il lavoro vero e la
differenza fra un assistente e un'integrazione.

Fontanel lo dice tre volte e in tre modi: «Integrazioni con i software già in uso» fra i
punti delle implementazioni custom, «AIOS si connette ai tuoi software» come prodotto, e
la lista «CRM, supporto clienti, riunioni, comunicazioni interne, email».

## Cosa proporrei di cambiare

Quattro interventi più una misura, in ordine di quanto cambiano la pagina. **Da
approvare, e ognuno chiede una frase nuova: la regola 2 del CLAUDE.md le vuole da te.**

Il filo che li tiene insieme è quello che il committente ha chiesto — *una storia che
scorrendo va verso l'esigenza di chi legge* — e in questa forma la pagina la racconta
così: **il tuo problema, con la tua misura → una porta sola da cui si comincia → cosa
si aggancia a quello che avete già → chi firma.** Oggi comincia da chi firma.

### A. La fascia dei numeri scende, e cambia titolo

Sposta i quattro numeri dalla seconda posizione a dopo «Le prove», sotto
un'intestazione che ne dica il senso invece di esibirli — l'equivalente di «CHI FIRMA
L'AUDIT». La linea del tempo va con loro.

Costo: nessuna copy nuova per lo spostamento; **una** frase nuova per l'intestazione.
Rischio: la pagina perde presto la prova che so di cosa parlo. Si compensa con la riga
di credibilità in testata, che resta dov'è.

### B. I numeri che il problema ha già smettono di essere corpo del testo

*Riscritta dopo la rilettura del committente: la versione precedente proponeva di
aggiungere un numero, ed era sbagliata — i numeri ci sono già.*

«Due persone per un paio di giorni» e «quarant'anni in una testa sola, due anni alla
pensione» escono dal corpo a 15px e diventano la cosa grande del riquadro, con la frase
che li spiega sotto. Non è un'aggiunta: è un'inversione di gerarchia dentro un riquadro
che esiste già.

Il terzo riquadro, «Abbiamo provato ChatGPT», non ha un numero e **non deve prenderne
uno inventato**: resta come sta. Un'asimmetria di due su tre è onesta; tre su tre con
uno finto no.

Sopra i due numeri serve la riga che li rende del lettore — l'equivalente di «1 CELLA =
1 ORA DELLA SETTIMANA DEL TUO TEAM». È **quella** riga a fare il lavoro, non il numero.

Costo: **una** frase nuova, la riga di legenda. I due numeri sono copy già approvata,
spostata di posto e di corpo. E le quaranta celle di Bruno, che erano l'idea del terzo
giro, diventano il modo di disegnare il secondo numero invece di un'invenzione a parte.

### B-bis. Il «quanto» che manca va misurato, non scritto

Nessuno dei dieci progetti registra un guadagno del cliente. Finché non c'è, la pagina
non può dire di quanto accelera — e non deve fingerlo.

**Non è un intervento di sito: è una misura da fare.** Il candidato è il portale
ricambi, il cui «prima» è già in pagina («in due per un paio di giorni») e a cui manca
solo il «dopo». Un solo numero vero, anche approssimato, anche dichiarato come tale,
vale più di tutta questa specifica.

Costo: niente codice. Una domanda al cliente del portale ricambi.

### D. Il diagramma smette di parlare solo di documenti

Dei quattro frammenti che entrano nel nodo, tre sono documenti (cartelle, fogli,
caselle di posta) e uno solo allude a un sistema (gestionali). Il diagramma dimostra
quindi che l'AI **legge**, non che **si aggancia**.

L'intervento più piccolo che chiude il buco è dentro la geometria che già esiste:
i frammenti si dividono in due nature — quelli che sono documenti e quelli che sono
software in uso — e la didascalia di sinistra lo dice.

Costo: **una** frase nuova per la didascalia, più i nomi dei sistemi, che però non sono
copy: sono fatti. E vanno presi da aziende vere, non da un elenco plausibile.

Nota di perimetro: questo è il punto della home dove si passa più vicino all'offerta di
Procedo, e `.claude/rules/procedo.md` va riletta prima di scrivere. «Tenere collegate
fonti sparse che l'azienda ha già» sta dentro; l'assistente sulle procedure girate in
reparto no.

### C. Una porta sola, dichiarata

Il primo dei quattro passi, «Mezza giornata diagnostica», diventa l'ingresso, e gli
altri tre si dichiarano come quello che viene dopo. Non serve toglierli né cambiarne i
nomi: serve dire che si comincia da lì.

Costo: **una** frase nuova. È l'intervento che rende più chiara «la spiegazione di come
lavora», che è la metà del riferimento ancora aperta.

## Cosa non copierei

- **I 4.000px di animazione in apertura.** Costano il 36% della pagina prima che si
  legga qualcosa, e il diagramma della PR #32 ottiene lo stesso effetto in 900px.
- **Gli artefatti finti.** Su un sito che dice «non arrivo con una percentuale di
  risparmio già scritta sulle slide», una trascrizione inventata con i minutaggi finti
  è esattamente il registro che questo sito ha deciso di non avere. Se si vuole far
  vedere un deliverable, si fa vedere quello vero, anonimizzato.
- **«Trasforma l'AI nel vantaggio competitivo della tua azienda».** È la frase che la
  skill anti-slop segnala per prima, e il nostro titolo — che dice cosa faccio e in
  che ordine — è migliore.

## Come si verifica

1. I tre cancelli, più `verifica-telefono.mjs`.
2. Il confronto guardato prima/dopo su dodici pagine: si tocca la home, quindi
   `index.astro` e i suoi componenti di sezione.
3. **Il conto rifatto sul costruito**: dove arriva il primo numero che appartiene al
   lettore, e a che percentuale di scorrimento arrivano le mie credenziali. Sono le due
   righe della tabella qui sopra che questo lavoro esiste per cambiare.
