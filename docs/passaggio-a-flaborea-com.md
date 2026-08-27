# Passaggio a flaborea.com — checklist

Da spuntare in ordine. **L'ordine conta**: due passi invertiti mandano il sito
offline o pubblicano 74 collegamenti rotti.

Riferimento: issue #15.

---

## Prima di cominciare

- [ ] Aspetta che il dominio risulti **attivo** nel pannello Aruba, non solo
      pagato. La registrazione di un `.com` è di solito questione di minuti, ma
      finché è «in registrazione» i record DNS non si possono salvare.

> **Il sito resta online per tutto il passaggio.** Continua a rispondere su
> `aleflabo.github.io` fino al passo 4, che è l'unico momento in cui cambia
> qualcosa per chi legge.

---

## 1. Verifica il dominio su GitHub (prima del DNS)

Serve a impedire che qualcun altro rivendichi `flaborea.com` su GitHub Pages
puntandolo al proprio repository. Va fatto **prima** di puntare il DNS.

- [ ] GitHub → **Settings** dell'account (non del repository) → **Pages** →
      **Add a domain** → `flaborea.com`
- [ ] GitHub mostra un record `TXT` da creare, del tipo
      `_github-pages-challenge-aleflabo` con un valore
- [ ] Crea quel `TXT` nel pannello DNS di Aruba
- [ ] Torna su GitHub e premi **Verify** — se dice che non trova il record,
      aspetta dieci minuti e riprova: è propagazione, non un errore

---

## 2. I record DNS su Aruba

Pannello Aruba → il dominio → **Gestione DNS**.

**Non toccare i record `MX`**: sono quelli delle caselle di posta. Ricevere
posta e servire il sito sono cose separate e convivono senza problemi.

- [ ] Quattro record **A** per il dominio nudo (host vuoto o `@`):

  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

- [ ] Un record **CNAME** per `www` che punta a `aleflabo.github.io.`
      (con il punto finale, se Aruba lo richiede)
- [ ] Se esiste già un record `A` che punta al parcheggio di Aruba, **va
      rimosso**: due destinazioni diverse per lo stesso nome danno un sito che
      funziona a intermittenza, a seconda di quale risposta arriva prima

- [ ] Aspetta e controlla che risolva. Da terminale:

  ```bash
  dig +short flaborea.com
  dig +short www.flaborea.com
  ```

  Il primo deve elencare i quattro indirizzi qui sopra, il secondo
  `aleflabo.github.io`. **Non proseguire finché non è così**: di solito bastano
  dieci minuti, ma Aruba può metterci qualche ora.

---

## 3. Collega il dominio al repository

- [ ] Repository `aleflabo.github.io` → **Settings** → **Pages** → **Custom
      domain** → `flaborea.com` → **Save**

> Da questo momento `aleflabo.github.io` **reindirizza** al dominio nuovo. È il
> motivo per cui il DNS va fatto prima: se il dominio non risolvesse ancora, il
> sito sarebbe irraggiungibile da entrambi gli indirizzi.

- [ ] Aspetta che GitHub emetta il certificato — compare **Enforce HTTPS**
      sotto il campo del dominio. Può volerci fino a **24 ore**
- [ ] Quando compare, **spunta Enforce HTTPS**

---

## 4. Le modifiche al codice

Un solo ramo, una sola PR, un solo deploy.

- [ ] `astro.config.mjs`: `site: 'https://aleflabo.github.io'` diventa
      `site: 'https://flaborea.com'`
- [ ] Crea `public/CNAME` con dentro una riga sola:

  ```
  flaborea.com
  ```

  Senza questo file il deploy successivo **cancella** il dominio impostato al
  passo 3: la GitHub Action ripubblica `dist/` da zero, e ciò che non è in
  `public/` non arriva.

- [ ] `npm run verifica` → deve uscire 0
- [ ] Controlla che il costruito dica il dominio nuovo:

  ```bash
  grep -o 'flaborea.com' dist/sitemap-0.xml | head -1
  grep -o 'rel="canonical" href="[^"]*"' dist/index.html
  ```

- [ ] PR verso `main`, merge, e aspetta il deploy

---

## 5. Verifica che sia andata

- [ ] `https://flaborea.com` risponde **200** e mostra il sito
- [ ] `https://www.flaborea.com` porta allo stesso sito
- [ ] `https://aleflabo.github.io` **reindirizza** a `flaborea.com` invece di
      servire una seconda copia — due domini che servono lo stesso contenuto
      sono contenuto duplicato per Google
- [ ] Il lucchetto c'è: nessun avviso di certificato
- [ ] Un indirizzo inventato dà la 404 del sito, non quella di GitHub:
      `https://flaborea.com/questa-non-esiste`

```bash
for u in https://flaborea.com https://www.flaborea.com https://aleflabo.github.io; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$u")"
done
```

---

## 6. La casella di posta

- [ ] Crea `alessandro@flaborea.com` nel pannello Aruba
- [ ] Configurala dove leggi la posta (IMAP), o inoltrala alla Gmail
- [ ] Mandati una mail di prova da un altro indirizzo e verifica che arrivi

- [ ] **Sostituisci l'indirizzo nel sito.** Vive in un punto solo:
      `emailContatto` in `src/data/legale.ts`. Cambiare quella riga cambia
      tutte e sei le occorrenze — le due informative nelle due lingue e il
      canale «Mail» della home.

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

## 8. Solo dopo: Resend e MailerLite (issue #14)

Vengono per ultimi perché **Resend richiede un dominio verificato**, e farlo
prima significherebbe rifarlo dopo.

- [ ] Resend: crea l'account e aggiungi `flaborea.com` come dominio di invio
- [ ] **Attenzione al record SPF.** Aruba ne ha già creato uno per le sue
      caselle. Due record `SPF` sullo stesso dominio **fanno fallire
      l'autenticazione di entrambi**: il mittente di Resend va aggiunto dentro
      quello che c'è già, non in un record nuovo. Il risultato deve essere una
      riga sola, tipo:

  ```
  v=spf1 include:_spf.aruba.it include:amazonses.com ~all
  ```

  (il secondo `include` è quello che ti indicherà Resend)

- [ ] DKIM: i record che Resend fornisce si aggiungono normalmente, sono `TXT`
      distinti e non danno conflitto
- [ ] MailerLite: account e modulo di iscrizione
- [ ] **Aggiorna `/privacy` nello stesso commit che collega il modulo.** Oggi
      la pagina dice: *«Il modulo di contatto non è ancora collegato a nessun
      servizio: al momento non parte nulla e non arriva nulla. Quando lo
      collegherò, questa pagina lo dirà prima che il modulo funzioni, non
      dopo.»* È una promessa scritta in un'informativa privacy
- [ ] Togli le due frasi segnaposto: «Modulo non ancora attivo.» in
      `src/pages/index.astro` e «Iscrizione non ancora attiva.» in
      `src/pages/note/index.astro`

---

## Se qualcosa va storto

| sintomo | causa quasi certa |
|---|---|
| Il sito non si raggiunge da nessuno dei due indirizzi | Custom domain impostato prima che il DNS risolvesse — togli il custom domain dalle Settings, il sito torna su `aleflabo.github.io` |
| Il sito funziona a intermittenza | È rimasto un vecchio record `A` verso il parcheggio Aruba |
| Avviso di certificato | Il certificato non è ancora stato emesso: aspetta, fino a 24 ore |
| Il dominio sparisce dopo un deploy | Manca `public/CNAME` |
| Google indicizza due copie del sito | `aleflabo.github.io` non reindirizza: controlla il custom domain nelle Settings |
