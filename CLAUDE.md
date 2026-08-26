# Istruzioni per Claude — sito di Alessandro Flaborea

Il README descrive **com'è fatto** il sito. Questo file dice **come si lavora**:
le regole che non si deducono leggendo il codice, e gli errori già commessi qui.

## Regole che non si negoziano

1. **Mai un commit diretto su `main`.** Ogni modifica passa da un ramo e una PR,
   anche una riga sola. Le PR di questo repo vanno su `main` — non c'è `staging`,
   quindi la regola globale «PR verso staging» qui non si applica.
2. **Il copy non si inventa mai.** Nemmeno una congiunzione, nemmeno per far
   quadrare una struttura. Le fonti approvate sono
   `docs/superpowers/specs/2026-08-25-sito-italiano/testi.md` (italiano) e
   `testi-en.md` (inglese). Se il testo non c'è, **si accorcia la struttura, non
   si allunga il testo**: un campo vuoto salta la sua sezione. Se serve davvero
   una frase nuova, la si chiede.
   *Perché:* sei incidenti di testo inventato in questo progetto, di cui uno mio.
3. **Non si modifica il prodotto per far passare una verifica.** Se un controllo
   fallisce, o il codice è sbagliato o il controllo è sbagliato: si sistema
   quello, non si allarga la maglia.
4. **Non si indebolisce `verifica-rotte.mjs`.** In particolare il controllo che
   vieta testo italiano sulle pagine inglesi: ha già trovato tre difetti veri che
   nessuna revisione aveva visto. L'italiano voluto su una pagina inglese si
   marca `lang="it"` sull'elemento (il controllo salta quei sottoalberi); la
   marcatura su `<html>` è rifiutata di proposito, perché spegnerebbe il
   controllo lasciandolo verde.

## Prima di aprire una PR

```bash
npm run check     # 0 errori
npm test          # tutti verdi
npm run verifica  # build + rotte, feed, link interni, hreflang, italiano
```

Tutti e tre. `npm run verifica` ricostruisce il sito, quindi copre anche `build`.

**Se tocchi un componente condiviso** (`BaseLayout`, `Nav`, `Footer`,
`TestataPagina`, qualsiasi cosa in `components/`), il sito italiano è **in
produzione**: estrai il testo visibile delle pagine italiane prima e dopo e
confrontalo. Non fidarti di un confronto di byte o di hash — su questo repo un
confronto byte-a-byte ha dichiarato «identico» un diff che aggiungeva 16px di
scorrimento orizzontale su `/chi-sono`. Guarda le pagine.

Chromium per gli screenshot si installa senza permessi di root:
`npx playwright install chromium`.

`tsconfig.json` esclude `studio/`: è un progetto a sé, con le proprie
dipendenze, e includerlo faceva morire `astro check` per esaurimento di
memoria. Se il controllo esce con «heap out of memory», il primo sospetto è
che qualcosa abbia rimesso quella cartella nel programma TypeScript.

## Le note

**Le note non stanno nel repo.** Vengono da Sanity (progetto `sn6gk82y`, dataset
`production`), lette in fase di costruzione.

Per scrivere o correggere una nota: si usa lo Studio, non un file. Se l'utente
chiede di aggiungere una nota, la risposta è «aprila nello Studio» — non creare
file di contenuto né reintrodurre `src/data/note.ts`.

**Il sito è statico: pubblicare una nota non cambia niente finché il sito non
viene ricostruito.** Ci pensa il webhook di Sanity, che chiama il
`repository_dispatch` di tipo `nota-pubblicata` nel workflow di deploy. Se una
nota pubblicata non compare, il sospetto numero uno è il webhook, non il codice.

Una nota è **italiana**. I campi inglesi (`titoloEn`, `sommarioEn`, `corpoEn`)
sono facoltativi e contano solo se ci sono **tutti e tre**: con meno di così la
nota resta italiana anche su `/en/notes`, marcata `lang="it"`. Non allentare
questa condizione — mezza traduzione produce una pagina che annuncia una lingua
e ne parla un'altra.

Lo schema sta in `studio/schemaTypes/nota.ts`. Cambiarlo richiede di aggiornare
anche `src/lib/note.ts` e le pagine che leggono quei campi: sono due copie della
stessa forma, e divergono in silenzio.

## Fatti da non sbagliare

Su questi si è già sbagliato, e sono verificabili nel CV (`~/cv/content/en.yaml`,
che per date e numeri **vince su qualsiasi altra fonte**, deck compresi).

- **Non è più operativo in Procedo**: co-fondatore e CTO dal 2024 al 2026, uscito
  a metà 2026. Tutti i verbi al passato. Non «dieci anni di ricerca»: dottorato
  di tre anni, poi due da CTO, prima una magistrale in data science.
- **Dieci articoli pubblicati, 533 citazioni.**
- **Il progetto si chiama Grip**, non «Tire Hub»: quello era il nome con cui era
  uscito. `/lavori/tire-hub` resta come rimando permanente.
- **`flaborea.com` non è ancora registrato.** `astro.config.mjs` punta a
  `aleflabo.github.io` e non c'è `public/CNAME`. Non reintrodurre quel dominio
  finché non è comprato: il sitemap punterebbe a un dominio che non risolve.

## Registro del tono

L'utente ha corretto il testo del sito molte volte. Le regole ricavate da quelle
correzioni:

- **Niente «non X, ma Y».** Ne erano state contate nove in una sola versione.
- **Niente titoli tutti uguali**: virgola e seconda proposizione, o apertura con
  un numero. Erano undici e undici.
- **Niente registro difensivo.** Non deve giustificarsi né dimostrare il proprio
  valore: è un professionista, il valore è nei fatti che elenca.
- **Niente sospetto verso chi legge.** Le richieste si formulano in positivo, non
  come cose che il cliente potrebbe sbagliare.
- **Niente critiche implicite a Procedo**, che nella stessa pagina è una
  credenziale.
- **Nessun riferimento geografico nel posizionamento** (Veneto orientale, «local»).
  Nella biografia i luoghi restano: sono biografia, non posizionamento.
- Registro **«voi»** con le aziende, non «tu».

## Cose ancora aperte

Vedi la issue #5. Le due visibili in produzione: la partita IVA nel piè di pagina
è `[DA INSERIRE]`, e la fotografia di `/chi-sono` è un riquadro segnaposto.
