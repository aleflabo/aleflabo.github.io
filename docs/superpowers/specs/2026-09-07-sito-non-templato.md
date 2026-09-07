# Il sito smette di sembrare templato — primo giro: gli occhielli

*7 settembre 2026. Committente: Alessandro Flaborea. Stato: **approvata per intero** il
7 settembre — «approvati tutti, procedi», «In breve» compreso — ed eseguita nello stesso
ramo.*

## Da dove nasce

Guardando la home appena rifatta il committente ha detto che «l'intera struttura è
molto claude like», e ha messo accanto un riferimento: **<https://dariofontanel.com/>**.

> «un po' come il sito https://dariofontanel.com/ . mi piace molto perchè scrollando
> c'è un'animazione molto figa che riesce a far percepire quale valore può dare ad
> un'azienda. anche la spiegazione di come lavora è molto chiara, mi pare più di
> quello che abbiamo costruito noi»

Sono due cose distinte, e conviene tenerle separate perché portano a lavori diversi:

1. **Un'animazione che, scorrendo, fa percepire il valore.** Questo pezzo è stato preso
   sul serio nel ramo `feat/home-visuale` (PR #32): la sezione «Metto insieme quello che
   avete già» è un diagramma animato che dimostra la tesi invece di raccontarla.
2. **Una spiegazione di come si lavora più chiara della nostra.** Questo pezzo è ancora
   aperto. Sulla home i quattro passi hanno preso i nomi degli ingaggi di `/servizi`,
   ma la chiarezza del riferimento non è stata raggiunta né misurata — resta materia
   per il terzo giro, insieme a «il numero che appartiene a chi legge».

La parte misurabile della diagnosi, invece, era il numero: nove occhielli maiuscoli su
otto sezioni, contro il tetto di **uno ogni tre sezioni** che la skill anti-slop impone.
Sulla home la potatura è già stata fatta (ramo `feat/home-visuale`, commit `6fc8ff9`):
da nove a tre in italiano, da otto a tre in inglese.

Alla domanda «stai guardando solo la home? perché penso che il problema riguardi tutte
le nostre pagine» la risposta misurata è **sì, riguarda anche le altre**, e questa
specifica è il seguito che avevamo concordato: *«sì, va bene in una spec. allineerei
gli occhielli di tutte le pagine anche.»*

L'ordine dei lavori è del committente: **prima gli occhielli, il wording dopo**, in un
secondo giro con le frasi di sostituzione scritte da lui.

## Lo stato misurato

Contati sul costruito, non dedotti dal sorgente: `<p class="label">` dentro `<main>`,
e `<section>` per denominatore.

| pagina | sezioni | occhielli | tetto | |
|---|---:|---:|---:|---|
| `/formazione/` | 6 | 5 | 2 | sfora di 3 |
| `/chi-sono/` | 3 | 4 | 1 | sfora di 3 |
| `/i-vostri-dati/` | 6 | 4 | 2 | sfora di 2 |
| `/servizi/` | 5 | 3 | 1 | sfora di 2 |
| `/ricerca/` | 5 | 2 | 1 | sfora di 1 |
| `/lavori/` | 4 | 1 | 1 | a posto |
| `/note/` | 2 | 1 | 1 | a posto |
| le dieci schede di `/lavori/*` | — | 1 ciascuna | — | a posto |

Le cinque pagine inglesi corrispondenti (`/en/training/`, `/en/about/`,
`/en/your-data/`, `/en/services/`, `/en/research/`) rispecchiano le italiane occhiello
per occhiello, perché il corpo è lo stesso componente in `src/components/pagine/` e
cambiano solo i dati.

Le schede di progetto restano fuori discussione: il loro unico occhiello
(«Meccanica · Costruito da solo · 2026») porta tre dati che nel titolo non ci sono.
Non è un occhiello decorativo, è una riga di metadati.

## La regola d'ingaggio

Tre criteri, in quest'ordine.

1. **Il richiamo di pagina resta.** È quello che `TestataPagina` rende sopra l'h1
   («Servizi», «Formazione», «Chi sono», «Ricerca», «I vostri dati»): dice in che
   pagina si è, e nella potatura della home l'equivalente è sopravvissuto.
2. **Un occhiello di sezione resta solo se dice qualcosa che il suo h2 non dice.**
   Dove l'occhiello e il titolo dicono la stessa cosa con parole diverse, cade
   l'occhiello.
3. **Sotto il tetto.** Se dopo il criterio 2 ne restano ancora troppi, cade quello che
   si ripete su più pagine — «Onestà» compare identico su tre pagine, ed è proprio la
   ripetizione a far sembrare il sito uscito da uno stampo.

## Pagina per pagina: la proposta

Da approvare prima di scrivere una riga di codice. Nessuna stringa viene cancellata dai
file dati: le pagine smettono solo di passarla, esattamente come sulla home.

### `/formazione/` e `/en/training/` — da 5 a 2

| occhiello | h2 della sua sezione | |
|---|---|---|
| Formazione | *(richiamo di pagina)* | **resta** |
| Una cosa che conviene sapere | Chi sostiene il costo del corso | **resta** — inquadra una cosa che il titolo dà per scontata |
| Come si organizza | Corso introduttivo / Laboratorio / Percorso finanziato | cade |
| Chi sale in cattedra | Vengo dall'aula | cade — dice la stessa cosa |
| Onestà | Che cosa questo corso non è | cade — il titolo è già la dichiarazione |

### `/chi-sono/` e `/en/about/` — da 4 a 2

| occhiello | | |
|---|---|---|
| Chi sono | *(richiamo di pagina)* | **resta** |
| In breve | etichetta della scheda dati accanto al ritratto | **resta** — non è un occhiello di sezione, è l'intestazione di un elenco di fatti |
| Come lavoro, in concreto | Abitudini che vale la pena sapere prima | cade |
| Fuori dal lavoro | *(nessun h2)* | cade — la sezione si riconosce dal contenuto |

Il tetto qui è 1 su tre sezioni. «In breve» resta perché etichetta una lista, non una
sezione: se all'approvazione risulta che va contato, cade anche quello.

### `/i-vostri-dati/` e `/en/your-data/` — da 4 a 2

| occhiello | h2 della sua sezione | |
|---|---|---|
| I vostri dati | *(richiamo di pagina)* | **resta** |
| La risposta corta | *(nessun h2: è il riquadro d'apertura)* | **resta** — dice al lettore che può fermarsi lì |
| Onestà | Quello che non posso garantirvi | cade |
| Perché mi credete | Su questo ho lavorato davvero | cade |

### `/servizi/` e `/en/services/` — da 3 a 1

| occhiello | h2 della sua sezione | |
|---|---|---|
| Servizi | *(richiamo di pagina)* | **resta** |
| Onestà | Per chi non sono | cade |
| Domande | Quelle che mi vengono fatte quasi sempre | cade |

### `/ricerca/` e `/en/research/` — da 2 a 1

| occhiello | | |
|---|---|---|
| Ricerca | *(richiamo di pagina)* | **resta** |
| Cosa c'entra con la tua azienda | | cade |

Questo caso chiude anche un difetto del secondo giro senza scrivere copy nuova:
«la **tua** azienda» è una delle quattordici violazioni della regola del «voi»
(`.claude/rules/copy-e-tono.md`), e sparisce insieme all'occhiello.

### Il risultato — misurato sul costruito dopo l'esecuzione

Dieci occhielli in meno per lingua: gli italiani passano da 34 a 24, gli inglesi da
32 a 22. Ogni pagina rientra nel suo tetto tranne `/chi-sono`, che con «In breve»
resta a due contro un tetto di uno — è la sola scelta di questa specifica che sta in
piedi solo se «In breve» conta come etichetta di una lista e non come occhiello di
sezione. Se lo conti, cade anche quello e la pagina va a uno.

## Come si fa

L'idioma è già in uso nel repo, dalla potatura della home:

- la prop dell'occhiello diventa facoltativa (`occhiello?: string`),
- il markup la guarda (`{occhiello && <p class="label">{occhiello}</p>}`),
- la pagina smette di passarla.

**Nessuna stringa sparisce dai file dati né da `testi.md`/`testi-en.md`.** Restano
scritte dove sono: se una scelta si rivela sbagliata, si rimette la prop e torna, senza
che serva ritrovare le parole. I componenti da toccare sono cinque, tutti in
`src/components/pagine/`: `CorpoFormazione`, `CorpoChiSono`, `CorpoDati`,
`CorpoServizi`, `CorpoRicerca` — ognuno serve tutte e due le lingue, quindi ogni
modifica vale per la pagina italiana e per la sua gemella inglese.

## Come si verifica

1. `npm run check`, `npm test`, `npm run verifica` — tutte e tre.
2. Il conteggio degli occhielli per pagina torna quello della tabella «Il risultato»,
   misurato sul costruito e non sul sorgente.
3. **Il confronto guardato prima/dopo.** Si toccano componenti condivisi fra due
   lingue: il repo impone di estrarre il testo visibile delle pagine italiane prima e
   dopo e di **guardare le pagine**, non i byte. L'unica differenza attesa è la
   sparizione degli occhielli elencati qui; qualunque altra differenza è un difetto.
4. Le pagine inglesi perdono gli stessi occhielli delle italiane, non uno di più.

## Cosa non è in questa specifica

- **Il wording.** È il secondo giro, e le frasi di sostituzione le scrive il
  committente. L'elenco da riempire è in
  `2026-09-07-sito-non-templato/voi-non-tu.md`.
- **«Il numero che appartiene a chi legge»** — i quarant'anni di mestiere di Bruno resi
  come quaranta celle, una piena. Terzo giro.
- **I due debiti tecnici della PR #32**: il `min-height` al posto del `padding-block`
  (i +288px su `/ricerca`) e i 44px estesi ai tablet (29 bersagli piccoli a 768px).
  Toccano CSS condiviso e vogliono un giro di verifica loro.
- **`.claude/rules/procedo.md`**, che aspetta dal committente la riga sul perimetro.
