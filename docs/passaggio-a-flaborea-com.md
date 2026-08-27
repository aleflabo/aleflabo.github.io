# Passaggio a flaborea.com — checklist

Da spuntare in ordine. **L'ordine conta**: due passi invertiti mandano il sito
offline o pubblicano 74 collegamenti rotti.

Riferimento: issue #15.

> **Fatto il 27 agosto 2026: sezioni 1–5.** Il sito risponde su
> `https://flaborea.com` con il certificato attivo, `www` e
> `aleflabo.github.io` reindirizzano. Restano la casella di posta (6), la
> partita IVA (7) e Brevo (8).
>
> Il certificato è stato emesso in pochi minuti, non nelle 24 ore che GitHub
> dichiara come tetto.

---

## Prima di cominciare

- [x] Aspetta che il dominio risulti **attivo** nel pannello Aruba, non solo
      pagato. La registrazione di un `.com` è di solito questione di minuti, ma
      finché è «in registrazione» i record DNS non si possono salvare.

> **Il sito resta online per tutto il passaggio.** Continua a rispondere su
> `aleflabo.github.io` fino al passo 4, che è l'unico momento in cui cambia
> qualcosa per chi legge.

---

## 1. Verifica il dominio su GitHub (prima del DNS)

Serve a impedire che qualcun altro rivendichi `flaborea.com` su GitHub Pages
puntandolo al proprio repository. Va fatto **prima** di puntare il DNS.

- [x] GitHub → **Settings** dell'account (non del repository) → **Pages** →
      **Add a domain** → `flaborea.com`
- [x] GitHub mostra un record `TXT` da creare, del tipo
      `_github-pages-challenge-aleflabo` con un valore
- [x] Crea quel `TXT` nel pannello DNS di Aruba
- [x] Torna su GitHub e premi **Verify** — se dice che non trova il record,
      aspetta dieci minuti e riprova: è propagazione, non un errore

---

## 2. I record DNS su Aruba

Pannello Aruba → il dominio → **Gestione DNS**.

**Non toccare i record `MX`**: sono quelli delle caselle di posta. Ricevere
posta e servire il sito sono cose separate e convivono senza problemi.

- [x] Quattro record **A** per il dominio nudo (host vuoto o `@`):

  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

- [x] Un record **CNAME** per `www` che punta a `aleflabo.github.io.`
      (con il punto finale, se Aruba lo richiede)

  > Lasciato invece com'era, `www` → `flaborea.com`, e **funziona**: la
  > richiesta segue l'apex e arriva agli indirizzi di GitHub. Puntarlo
  > direttamente a `aleflabo.github.io` toglie un salto di risoluzione ed è la
  > forma documentata, ma non è urgente.
- [x] Se esiste già un record `A` che punta al parcheggio di Aruba, **va
      rimosso**: due destinazioni diverse per lo stesso nome danno un sito che
      funziona a intermittenza, a seconda di quale risposta arriva prima

- [x] Aspetta e controlla che risolva. Da terminale:

  ```bash
  dig +short flaborea.com
  dig +short www.flaborea.com
  ```

  Il primo deve elencare i quattro indirizzi qui sopra, il secondo
  `aleflabo.github.io`. **Non proseguire finché non è così**: di solito bastano
  dieci minuti, ma Aruba può metterci qualche ora.

---

## 3. Collega il dominio al repository

- [x] Repository `aleflabo.github.io` → **Settings** → **Pages** → **Custom
      domain** → `flaborea.com` → **Save**

> Da questo momento `aleflabo.github.io` **reindirizza** al dominio nuovo. È il
> motivo per cui il DNS va fatto prima: se il dominio non risolvesse ancora, il
> sito sarebbe irraggiungibile da entrambi gli indirizzi.

- [x] Aspetta che GitHub emetta il certificato — compare **Enforce HTTPS**
      sotto il campo del dominio. Può volerci fino a **24 ore**
- [x] Quando compare, **spunta Enforce HTTPS**

---

## 4. Le modifiche al codice

Un solo ramo, una sola PR, un solo deploy.

- [x] `astro.config.mjs`: `site: 'https://aleflabo.github.io'` diventa
      `site: 'https://flaborea.com'`
- [x] Crea `public/CNAME` con dentro una riga sola:

  ```
  flaborea.com
  ```

  Senza questo file il deploy successivo **cancella** il dominio impostato al
  passo 3: la GitHub Action ripubblica `dist/` da zero, e ciò che non è in
  `public/` non arriva.

- [x] `npm run verifica` → deve uscire 0
- [x] Controlla che il costruito dica il dominio nuovo:

  ```bash
  grep -o 'flaborea.com' dist/sitemap-0.xml | head -1
  grep -o 'rel="canonical" href="[^"]*"' dist/index.html
  ```

- [x] PR verso `main`, merge, e aspetta il deploy

---

## 5. Verifica che sia andata

- [x] `https://flaborea.com` risponde **200** e mostra il sito
- [x] `https://www.flaborea.com` porta allo stesso sito
- [x] `https://aleflabo.github.io` **reindirizza** a `flaborea.com` invece di
      servire una seconda copia — due domini che servono lo stesso contenuto
      sono contenuto duplicato per Google
- [x] Il lucchetto c'è: nessun avviso di certificato
- [x] Un indirizzo inventato dà la 404 del sito, non quella di GitHub:
      `https://flaborea.com/questa-non-esiste`

```bash
for u in https://flaborea.com https://www.flaborea.com https://aleflabo.github.io; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$u")"
done
```

---

## 6. La casella di posta, letta e scritta da Gmail

L'obiettivo: ricevere e **inviare** come `alessandro@flaborea.com` restando
dentro Gmail, senza aprire una seconda webmail.

### 6a. Crea la casella su Aruba

- [ ] Pannello Aruba → **Gestione Email** → crea `alessandro@flaborea.com`
- [ ] Segnati la password: serve a Gmail, e Aruba non la rimostra

I parametri, per quando servono:

| | server | porta | |
|---|---|---|---|
| **SMTP** (uscita) | `smtps.aruba.it` | 465 | SSL |
| **IMAP** (entrata) | `imaps.aruba.it` | 993 | SSL |
| **POP3** (entrata) | `pop3s.aruba.it` | 995 | SSL |

Nome utente: **sempre l'indirizzo completo**, non la parte prima della
chiocciola.

### 6b. Ricezione — prima l'inoltro

Va fatto **prima** dell'invio: al passo dopo Gmail manda un codice di verifica
a `alessandro@flaborea.com`, e senza inoltro dovresti andare a leggerlo nella
webmail di Aruba.

- [ ] Pannello Aruba → la casella → **inoltro** verso la tua Gmail
- [ ] Attiva anche **conserva una copia** sul server: se un domani cambi
      client, la posta è ancora lì
- [ ] Mandati una prova da un altro indirizzo e verifica che arrivi in Gmail

> L'alternativa è far scaricare la posta a Gmail via POP3
> (*Impostazioni → Account → Controlla la posta da altri account*), ma Gmail
> ci passa a intervalli suoi, anche di un'ora: per un recapito di lavoro
> pubblicato sul sito, l'inoltro è meglio.

### 6c. Invio — e qui si gioca tutto

Gmail → **Impostazioni** → **Account e importazione** → *Invia messaggi come*
→ **Aggiungi un altro indirizzo email**.

- [ ] Nome: `Alessandro Flaborea` · Indirizzo: `alessandro@flaborea.com`
- [ ] **Tratta come alias: sì** — così rispondendo a una mail arrivata lì,
      Gmail risponde da quell'indirizzo invece che dalla tua Gmail
- [ ] Alla schermata dopo, Gmail chiede il server SMTP:

  ```
  Server SMTP: smtps.aruba.it
  Porta:       465
  Nome utente: alessandro@flaborea.com
  Password:    quella della casella
  Connessione: SSL
  ```

> **Non scegliere «Invia tramite Gmail»**, se te lo propone. Le email
> partirebbero dai server di Google, che il record SPF di `flaborea.com`
> **non autorizza**: finirebbero in spam o verrebbero rifiutate, e te ne
> accorgeresti dai destinatari che non rispondono. Passando dall'SMTP di
> Aruba, l'SPF che Aruba ha già scritto le copre.

- [ ] Gmail manda un codice a `alessandro@flaborea.com`: arriva nella tua
      Gmail grazie all'inoltro del passo 6b. Incollalo per confermare

### 6d. Le impostazioni che evitano figure

- [ ] *Rispondi dallo stesso indirizzo a cui è stato inviato il messaggio* —
      così le risposte al lavoro partono da `@flaborea.com` e quelle personali
      dalla Gmail, senza doverci pensare
- [ ] Decidi se rendere `alessandro@flaborea.com` **predefinito** per i nuovi
      messaggi. Se il sito è il tuo biglietto da visita, conviene

### 6e. La prova che conta

- [ ] Scrivi da Gmail a un indirizzo esterno **scegliendo come mittente**
      `alessandro@flaborea.com`
- [ ] Aprilo dalla parte del destinatario e guarda l'intestazione completa:
      **SPF deve risultare `pass`**. Su Gmail: i tre puntini → *Mostra
      originale*

> Se SPF dice `fail` o `softfail`, quasi sempre è perché l'invio sta passando
> da Google e non dall'SMTP di Aruba: torna al passo 6c.

### 6f. Il sito

- [ ] Sostituisci l'indirizzo: vive in `emailContatto` dentro
      `src/data/legale.ts`, **un punto solo per sei occorrenze** — le due
      informative nelle due lingue e il canale «Mail» della home

> Non è cosmetica: oggi il sito pubblica la Gmail personale su pagine che
> `robots.txt` invita esplicitamente a indicizzare.

---

## 7. La partita IVA, quando ci sarà

- [ ] `src/components/Footer.astro`, costante `rigaFinale`: rimetti la voce
      accanto al `©`. In inglese l'etichetta è `VAT no.`, in italiano `P. IVA`

> `verifica-rotte.mjs` esce con 1 se `[DA INSERIRE]`, `[EMAIL]` o `[TODO]`
> finiscono nel costruito. Quel controllo esiste perché `[DA INSERIRE]` è stato
> pubblico per giorni senza che niente lo segnalasse.

---

## 8. Solo dopo: Brevo (issue #14)

Viene per ultimo perché **richiede un dominio verificato**, e farlo prima
significherebbe rifarlo dopo.

Un fornitore solo per entrambe le cose — la newsletter delle note e le email
transazionali delle altre app. La scelta e il confronto con MailerLite+Resend
stanno nella issue #14; in breve: 100.000 contatti contro 250, un account
invece di due, e **un solo mittente da aggiungere al record SPF invece di
due**.

- [ ] Crea l'account su brevo.com e aggiungi `flaborea.com` come dominio
      mittente
- [ ] **Il record SPF va unito, non aggiunto.** Aruba ne ha già creato uno per
      le caselle di posta, e **due record SPF sullo stesso dominio fanno
      fallire l'autenticazione di entrambi**: le email finiscono in spam o
      vengono rifiutate. Il mittente di Brevo va messo *dentro* il record che
      c'è già. Il risultato deve essere una riga sola:

  ```
  v=spf1 include:_spf.aruba.it include:spf.brevo.com ~all
  ```

  Prima di scrivere, guarda il valore esatto che ti indica il pannello Brevo:
  `spf.brevo.com` è quello standard, ma conferma.

- [ ] **DKIM**: i record `TXT` che Brevo fornisce si aggiungono normalmente,
      sono nomi distinti (tipo `mail._domainkey`) e non danno conflitto con
      quelli di Aruba
- [ ] **DMARC**, se Brevo lo propone: parti in sola osservazione
      (`p=none`) e stringi dopo qualche settimana, quando sei sicuro che tutti
      i mittenti legittimi passino
- [ ] Aspetta che Brevo dichiari il dominio **verificato**: finché non lo è, le
      email partono dal loro dominio condiviso e arrivano peggio
- [ ] Manda una prova a un indirizzo Gmail e guarda l'intestazione: SPF e DKIM
      devono risultare entrambi `pass`

### Poi, nel sito

- [ ] Il modulo di iscrizione di `/note` che scrive nella lista Brevo, con la
      **doppia conferma** attiva
- [ ] Il modulo di contatto della home, con validazione lato client e
      **messaggio di errore in linea, non un `alert()`**
- [ ] Togli le due frasi segnaposto: «Modulo non ancora attivo.» in
      `src/pages/index.astro` e «Iscrizione non ancora attiva.» in
      `src/pages/note/index.astro`
- [ ] Il canale «calendario» della home, se scegli un servizio di prenotazione
      (oggi non ha `href` e per questo non viene reso affatto)

- [ ] **Aggiorna `/privacy` nello stesso commit che collega il modulo.** Oggi
      la pagina dice: *«Il modulo di contatto non è ancora collegato a nessun
      servizio: al momento non parte nulla e non arriva nulla. Quando lo
      collegherò, questa pagina lo dirà prima che il modulo funzioni, non
      dopo.»* È una promessa scritta in un'informativa privacy, e va mantenuta
      nell'ordine in cui è scritta.

- [ ] Controlla `/cookie`: oggi afferma che il sito non usa **nessun** cookie,
      ed è verificabile aprendo gli strumenti per sviluppatori. Se il modulo
      Brevo ne introducesse uno, quella pagina diventa falsa il giorno stesso.

---

## Se qualcosa va storto

| sintomo | causa quasi certa |
|---|---|
| Il sito non si raggiunge da nessuno dei due indirizzi | Custom domain impostato prima che il DNS risolvesse — togli il custom domain dalle Settings, il sito torna su `aleflabo.github.io` |
| Il sito funziona a intermittenza | È rimasto un vecchio record `A` verso il parcheggio Aruba |
| Avviso di certificato | Il certificato non è ancora stato emesso: aspetta, fino a 24 ore |
| Il dominio sparisce dopo un deploy | Manca `public/CNAME` |
| Google indicizza due copie del sito | `aleflabo.github.io` non reindirizza: controlla il custom domain nelle Settings |
