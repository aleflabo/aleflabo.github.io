# La pagina della formazione, rifatta

*8 novembre 2026. Committente: Alessandro Flaborea. Stato: **da approvare**.*

Fa parte della tappa 2 del Laboratorio (spec `2026-11-08-redesign-laboratorio-design.md`):
`/formazione` e `/en/training` prendono lo schema «servizi» del mockup (scheda «A · Pagine
interne»), e in più cambiano contenuto come descritto qui.

## Da dove nasce

> «mi piacerebbe avere una pagina dedicata alla possibilità di fare formazione per le
> aziende riguardo l'ai. definiamola per bene. potremmo identificare diversi livelli di
> corso e potremmo anche fare riferimento a ai act e l'esigenza che hanno ora le aziende.»

Poi: corsi specifici su Python e su Claude Code, ciascuno con un livello base e uno
avanzato; la policy interna sull'uso dell'AI «come servizio a parte»; delle FAQ; e una
domanda da chiudere con fonti, «posso rilasciare attestazioni? per l'ai act va bene anche se
io non sono un ente?». La risposta è sì, ed è nella sezione «Fonti verificate».

## Cosa c'è oggi e cosa non va

La pagina esiste: intro, riquadro sull'AI Act, tre formati (Corso introduttivo 4 ore,
Laboratorio per funzione 8-12 ore, Percorso finanziato), «Chi sostiene il costo del corso»,
«Vengo dall'aula», «Che cosa questo corso non è», chiusura «Raccontami che azienda siete».

Difetti trovati nella review dell'8 novembre:

1. **La frase sull'articolo 4 è superata.** Dice che la norma «chiede alle aziende […] di
   garantire una formazione minima al personale, e di essere in grado di documentarla». Dal
   27 luglio 2026 l'articolo 4 riscritto dal Reg. (UE) 2026/1744 chiede di «take measures to
   support the development of AI literacy» e precisa che non richiede di garantire un
   livello. La documentazione non è imposta: la Commissione dice che basta un registro
   interno. **È un difetto in produzione oggi**, non solo del nuovo design.
2. Non dice **cosa resta all'azienda** a fine corso, che per l'AI Act è la cosa che conta.
3. Ogni corso ha una riga, **nessun programma**.
4. **Il «Percorso finanziato» non è un livello** ma un modo di pagare, e si ripete in «Chi
   sostiene il costo».
5. Mancano **dettagli pratici**: in presenza o online, quante persone, prerequisiti.
6. «Che cosa questo corso non è» esclude la programmazione, e nessuna pagina la offre.

## Obiettivi

- Due famiglie di corsi, ognuna con livelli e durate dichiarate.
- Per ogni corso: a chi serve, quanto dura, un programma a moduli, cosa resta.
- Un riquadro sull'AI Act **corretto** rispetto al testo in vigore.
- FAQ sull'AI Act, con le fonti linkate.
- La policy interna sull'uso dell'AI come servizio a parte.

## Non obiettivi

- Niente prezzi: il sito non pubblica listini (`/servizi`, FAQ «Quanto costa?»).
- Niente certificazioni con valore legale: Alessandro rilascia attestati di partecipazione.
- Niente iscrizione online ai corsi: il contatto passa dal modulo e dai canali di oggi.

## Anti-obiettivi

- **Allarmismo sull'AI Act.** Niente «sanzioni fino a…», niente conto alla rovescia. Il
  registro del sito è «senza allarmismi» (lo dice già `/i-vostri-dati`).
- **Affermazioni legali non verificabili.** Ogni frase sulla norma deve poggiare su una
  fonte citata in questo documento. Se una fonte non c'è, la frase non entra.
- **Promettere più di quello che un attestato privato è**: certifica la presenza, non una
  competenza né una conformità.

## La struttura della pagina

Schema «servizi» del mockup (testata con percorso in mono, celle, righe con dati in mono,
FAQ su due colonne, chiusura su fondo carta). In quest'ordine:

1. **Testata**: titolo e intro di oggi («Corsi che si usano il giorno dopo», «In aula si
   lavora sui documenti dell'azienda…»).
2. **Riquadro AI Act**, riscritto (vedi «Testi»): cosa chiede l'articolo 4 dopo luglio 2026,
   che vale anche per chi usa solo ChatGPT, e che il corso introduttivo è il modo più
   semplice di rispondere, con un registro da conservare.
3. **Per tutta l'azienda** (due corsi):
   - *Corso introduttivo*, 4 ore. Per tutti, dal titolare al reparto.
   - *Laboratorio per funzione*, 8-12 ore. Un reparto alla volta, sui documenti veri.
4. **Per i team tecnici** (due corsi, due livelli ciascuno):
   - *Python*: base 8 ore, avanzato 12-16 ore.
   - *Claude Code* (sviluppo con un agente AI): base 8 ore, avanzato 12-16 ore.
   - Il livello si dichiara, il programma si adatta al gruppo («lasciarlo aperto a diverse
     persone», committente).
5. **Ogni corso, in riga**: nome, livello e durata in mono, a chi serve, programma (3-5
   moduli), cosa serve dall'azienda.
   **Dettagli pratici, uguali per tutti i corsi** (committente): in presenza oppure online;
   **massimo 10 persone per lezione**. Per *Claude Code*: ognuno con il proprio portatile e
   un account con un piano attivo, per provare direttamente in aula («altrimenti si hittano
   i limiti»). Per i corsi tecnici base e avanzato stanno nella stessa
   riga come due colonne, non come quattro corsi.
6. **Cosa resta all'azienda**, una sezione sola per tutti i corsi:
   attestato di partecipazione per ogni persona; registro presenze con il programma svolto,
   da conservare come prova delle misure prese per l'articolo 4; i materiali del corso.
7. **Servizio a parte: la policy interna sull'uso dell'AI.** Non incluso nei corsi. Vedi
   «La policy interna» qui sotto.
8. **Chi sostiene il costo del corso**: le tre strade di oggi, invariate. Il «Percorso
   finanziato» smette di essere un formato e confluisce qui (la strada «Con i fondi
   interprofessionali» lo copre già).
9. **Domande frequenti sull'AI Act** (vedi sotto).
10. **Vengo dall'aula**: invariato.
11. **Che cosa questo corso non è**: senza la frase sulla programmazione (decisione del
    committente). Resta il resto, se ancora vero.
12. **Chiusura**: «Raccontami che azienda siete», sul fondo carta.

`/en/training` uguale, con i testi inglesi.

## La policy interna sull'uso dell'AI

Servizio a parte, proposto il 2026-11-08 e accettato dal committente. Compare su
`/formazione` **e su `/servizi`**. Su `/servizi` va in un blocco dopo i quattro ingaggi e non
come quinto ingaggio, perché la pagina si intitola «Quattro modi di lavorare insieme» e
quello è testo approvato (*scelta mia*).

- **Cosa contiene**: a chi si applica e quali strumenti; strumenti ammessi e chi approva i
  nuovi (account aziendali, non personali); cosa si può dare all'AI in tre colori (verde:
  testi pubblici e bozze generiche; giallo: documenti interni, solo su strumenti aziendali;
  rosso, mai: dati personali, dati sotto NDA, segreti industriali, credenziali);
  impostazioni da attivare (piani aziendali, esclusione dall'addestramento, conservazione);
  controllo umano prima di usare un risultato e nessuna decisione automatica sulle persone;
  quando dichiarare l'uso dell'AI; proprietà di testi e codice prodotti; referente; cosa
  fare se si sbaglia; collegamento con la formazione e il registro per l'articolo 4;
  revisione ogni 6-12 mesi.
- **Cosa si consegna**: un documento di 3-5 pagine, una pagina riassuntiva da far girare in
  azienda, l'elenco degli strumenti ammessi con le impostazioni.
- **Come si svolge, in circa una settimana**: un'ora di intervista con il titolare, una bozza
  in pochi giorni, una revisione insieme, la versione finale. Il committente ha detto «non ci
  vorrà troppo»; la settimana è una stima mia, da confermare quando approva i testi.
- **Cosa non è**: non sostituisce un parere legale, e la pagina lo dice.

## Le FAQ sull'AI Act

Domande e risposte di partenza. Le risposte finali le scrive chi implementa, le approva il
committente, e ognuna linka la sua fonte.

| domanda | risposta (sostanza) | fonte |
|---|---|---|
| Serve un attestato? | No, la norma non lo chiede; basta un registro interno delle formazioni. L'attestato che rilascio è utile come prova, non obbligatorio. | Commissione, Q&A AI literacy |
| Deve farlo un ente accreditato? | No, la norma non pone requisiti su chi forma. Un ente serve solo se il corso è finanziato da un fondo interprofessionale o entra in un catalogo regionale. | Commissione, Q&A; pagina stessa, «Chi sostiene il costo» |
| Quante ore servono? | La norma non fissa ore né programmi; dipende da ruoli, strumenti usati e rischi. Il corso introduttivo da 4 ore è la misura base che propongo. | Commissione, Q&A |
| Vale anche per chi usa solo ChatGPT? | Sì: l'obbligo riguarda chi usa sistemi di AI per l'azienda, senza soglie di dimensione. | Art. 4 AI Act (testo 2026/1744) |
| Riguarda anche collaboratori esterni? | Sì: «staff and other persons dealing with the operation and use of AI systems on their behalf». | Art. 4; Commissione, Q&A |
| Da quando si rischiano sanzioni? | L'obbligo esiste dal 2 febbraio 2025; le autorità nazionali vigilano dal 2 agosto 2026. | Commissione, Q&A |
| La legge italiana aggiunge obblighi? | No: la Legge 132/2025 dichiara di non produrre nuovi obblighi rispetto all'AI Act. | L. 132/2025, testo in GU |

## Fonti verificate (8 novembre 2026)

- **Commissione europea, «AI literacy – Questions & Answers»**, ultimo aggiornamento
  20 ottobre 2026: «There is no need for a certificate»; «can keep an internal record of
  trainings»; «no strict requirements or mandatory trainings are imposed»; vigilanza «from
  2 August 2026»; copertura anche di «a contractor, a service provider, a client».
  <https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers>
- **Regolamento (UE) 2026/1744 (Digital Omnibus on AI)**, GU UE del 24 luglio 2026, in
  vigore il 27 luglio 2026. Nuovo art. 4(1): «Providers and deployers of AI systems shall
  take measures to support the development of AI literacy of their staff and other persons
  dealing with the operation and use of AI systems on their behalf […] This obligation does
  not require providers or deployers to guarantee any specific level of AI literacy of any
  individual.» <https://eur-lex.europa.eu/eli/reg/2026/1744/oj>
  *Da confermare*: l'eventuale data di applicazione separata della modifica all'art. 4 (la
  lettura della pagina EUR-Lex si è interrotta prima dell'articolo finale; le fonti
  secondarie dicono 27 luglio 2026).
- **Legge 23 settembre 2025, n. 132**: non produce nuovi obblighi rispetto al Reg. (UE)
  2024/1689.
- **Attestato di partecipazione privato**: certifica la frequenza, non è una qualifica e non
  ha valore legale; il valore legale è riservato a titoli rilasciati da enti autorizzati
  (Regione, MIM, ECM, fondi, ordini). Fonti di settore, non norme.

Non è un parere legale. Gli aspetti fiscali (fattura, IVA) sono del commercialista.

## Testi

Regola 2 del `CLAUDE.md`: niente di inventato. Questa pagina richiede molto testo nuovo:
programmi dei sei moduli di corso, riquadro AI Act riscritto, FAQ, «cosa resta», policy.
**Li scrive chi implementa come bozza, in `testi.md` / `testi-en.md` marcati
`[DA APPROVARE]`, e il committente li approva prima del merge.**

**Correzione subito, separata dalla tappa 2** (*scelta mia*): una PR verso `main` che
**accorcia** la frase superata togliendo la parte falsa, senza aggiungere parole (regola 2:
«shorten the structure, do not lengthen the text»). La stessa affermazione è in produzione in
tre punti: `src/data/formazione.ts:43`, `src/data/en/formazione.ts:33` e la sezione «Si
comincia dalle persone» della home su `main` (`src/pages/index.astro`, che la tappa 1 toglie
ma che oggi è online). La frase nuova e completa arriva con la tappa 2.

## Il mockup

Lo schema «servizi» delle pagine interne è approvato (committente, 8 novembre: «mi sembra
tutto ok»). La riga dei corsi tecnici con base e avanzato affiancati non c'è: *scelta mia*,
si disegna nel mockup e si fa approvare prima del codice, come vuole la regola sulle scelte
visive.

## Lasciato a chi costruisce

- Verificare e citare fonti oltre a quelle elencate qui (per esempio la data di applicazione
  della modifica all'articolo 4 su EUR-Lex), aggiungendole alla sezione «Fonti verificate»
  con link e citazione. Una frase sulla norma entra solo con la sua fonte scritta qui.

- I nomi dei componenti e la scomposizione.
- Il disegno esatto delle righe dei corsi tecnici con due livelli affiancati, purché segua
  lo schema «servizi» del mockup e su telefono vada in colonna.
- La bozza dei programmi, partendo da quello che Alessandro ha già fatto (didattica alla
  Sapienza, Agentic Workflow Toolkit, i progetti in Python del sito).
