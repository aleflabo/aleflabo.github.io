# Audit di design — 26 agosto 2026

Passata la checklist di [taste-skill](https://www.tasteskill.dev) (`redesign-existing-projects`)
su tutte le pagine, a 1440px e a 390px, con gli screenshot davanti e non solo il
codice.

La skill esiste per raddrizzare interfacce generate in serie. **Questo sito non
è uno di quelli**, e buona parte della checklist lo certifica invece di
correggerlo. Perciò l'elenco è diviso in tre: quello che il sito fa già bene,
quello che vale la pena cambiare, e — la parte che conta di più — **quello che la
checklist consiglia e che qui sarebbe un peggioramento**.

---

## 1. Quello che il sito fa già bene

Non è cortesia: sono voci della checklist che risultano già soddisfatte, e
sapere quali evita di «sistemarle» per sbaglio.

| Voce della checklist | Stato qui |
|---|---|
| «Inter dappertutto» | Fraunces per i titoli, Inter per il testo — l'accoppiata serif+sans che la skill stessa raccomanda per l'editoriale |
| «Ombre nere generiche» | Le due ombre del sito sono già tinte: `rgb(40 24 10 / 10%)` e `rgb(168 83 29 / 28%)`, cioè il marrone e la terracotta del fondo |
| «Estetica gradiente viola/blu» | Assente. La tavolozza è crema, blu notte e terracotta |
| «Nero puro `#000`» | Il testo è `#141414`, il fondo `#faf8f4` |
| «FAQ a fisarmonica» | La FAQ è una lista affiancata, che è proprio la sostituzione suggerita |
| «Nessun anello di focus» | `:focus-visible` è definito per link, bottoni, input, textarea e select |
| «Scorrimento a scatti» | `scroll-behavior: smooth` |
| «`z-index` arbitrari tipo 9999» | Un solo `z-index` in tutto il sito, e vale `10` |
| «Zuppa di div» | 84 `<section>`, `<nav>`, `<main>`, `<article>`, `<footer>`: la struttura è semantica |
| «Manca la favicon» | C'è |
| «Nessuna indicazione della pagina corrente» | `Nav` riceve `attiva` e marca la voce |
| «Titoli In Maiuscolo Su Ogni Parola» | Nessuno: tutti in stile frase |
| «Nomi e numeri finti» | Nessuno. I numeri sono veri e verificabili |

---

## 2. Quello che vale la pena cambiare

Ordinato per rapporto fra valore e rischio, come suggerisce la skill.

### Alto valore, rischio nullo

**A1. Non esiste una pagina 404.** Chi sbaglia un indirizzo — o segue un vecchio
link a una nota — riceve la pagina di errore di GitHub Pages: fondo scuro,
carattere di sistema, la scritta «GitHub Pages». Nessuna navigazione, nessun
modo di tornare indietro, e il marchio si interrompe di colpo. Ora che le note
hanno un indirizzo per pezzo, sbagliarne uno è diventato possibile per davvero.
Costa una pagina.

**A2. Sei collegamenti non portano da nessuna parte.** `href="#"` in:

| Dove | Che cosa promette |
|---|---|
| `/formazione` e `/en/training` | «WhatsApp» |
| `/chi-sono` e `/en/about` | «Scarica il curriculum» / «Download my CV» |
| `Footer.astro`, in tutte le pagine | «Privacy» e «Cookie» |

Il peggiore è il curriculum: dice *scarica* e non scarica niente. La skill è
netta — o portano da qualche parte, o si vedono disattivati. Il PDF del CV
esiste già in `~/cv`: quello si chiude subito.

**A3. Manca il collegamento «salta al contenuto».** Chi naviga da tastiera deve
attraversare tutta la barra a ogni pagina. È una decina di righe.

**A4. Nessun riscontro alla pressione.** Ci sono gli stati `:hover` e c'è il
focus, ma nessun `:active`: premendo un pulsante non succede niente finché non
si rilascia. Su touch, dove `:hover` non esiste, è l'unico riscontro possibile.

**A5. I numeri non sono a larghezza fissa.** La fascia «10 · 533 · 1 · 2» e le
date delle note usano cifre proporzionali. Una riga di
`font-variant-numeric: tabular-nums` e le colonne si allineano.

**A6. Si usano due soli pesi.** 600 e 700, in 84 dichiarazioni. Manca il 500 per
la gerarchia intermedia — le etichette, i metadati, le didascalie. Fraunces e
Inter sono entrambi variabili: il peso c'è già, è solo mai chiesto.

### Da valutare

**B1. Otto griglie a tre colonne uguali.** La skill la chiama la disposizione
più riconoscibilmente automatica che esista. Alcune qui sono legittime — la
fascia dei numeri, i tre corsi, che *sono* tre cose parallele. Ma «Le tre cose
che mi sento dire più spesso» e «Alcune delle cose che ho costruito» sono
contenuti di lunghezza diversa forzati in colonne uguali. Vale la pena provare
almeno una delle due a due colonne sfalsate.

**B2. Un solo raggio, in cinquanta punti.** `var(--radius)` = 4px su tutto:
schede, riquadri, immagini, campi. La skill suggerisce di variarlo — più
stretto dentro, più morbido nei contenitori. È un ritocco piccolo e reversibile.

**B3. Il piè di pagina ha quattro colonne.** «Semplifica: le vie di navigazione
principali e i link obbligatori per legge». Qui però tre colonne sono corte e la
quarta è «Altrove». Lo segnalo perché è in checklist, non perché mi convinca.

**B4. Nessuna validazione nel modulo.** Oggi il modulo è inerte, quindi il punto
è rimandato — ma diventa vero il giorno in cui si collega. Con esso arrivano il
messaggio di errore in linea e il banner dei cookie, che è già nella issue #5.

---

## 3. Quello che la checklist consiglia e che qui non farei

Questa è la parte che conta. La skill è tarata su chi genera interfacce a
raffica; applicarla alla lettera su un sito che ha una direzione propria la
cancellerebbe.

**Cambiare i caratteri.** La skill dice di sostituire Inter con Geist, Outfit o
Satoshi. Ma il difetto che descrive è *Inter dappertutto*, e qui Inter fa solo il
testo: i titoli sono Fraunces. È esattamente l'accoppiata che la skill
raccomanda due righe più sotto. Cambiare significherebbe buttare l'identità
visiva per rispettare una regola che qui non si applica.

**Ridurre a un solo colore d'accento.** Ce ne sono tre, ma non sono tre gusti:
sono tre ruoli. `--accent` blu notte è struttura, `--azione` terracotta è ciò
che si può premere, `--evidenziatore` pesca è ciò che viene sottolineato. Il
difetto che la regola vuole evitare è la varietà decorativa; questa è grammatica.

**Le due fasce scure.** La checklist segnala le sezioni scure in mezzo a una
pagina chiara come «un copia-incolla venuto male». Qui sono due, entrambe
volute, e scandiscono il ritmo: i numeri e l'invito finale. Sono anche le due
cose che devono fermare l'occhio.

**Grana, vetro smerigliato, bordi illuminati, parallasse, scorrimento con
inerzia.** Sono i «potenziamenti» della skill, e sono il motivo per cui non li
farei: **il sito oggi non spedisce un solo file JavaScript.** La home è 25 KB di
HTML e 1,9 KB di script scritti a mano. Lo scorrimento con inerzia da solo
significa importare una libreria. Per uno che vende «dalla ricerca alla
produzione» e ha una pagina intera su dove finiscono i dati, la sobrietà tecnica
*è* l'argomento di vendita.

**Immagini di sfondo segnaposto.** La skill suggerisce `picsum.photos` per
riempire le sezioni piatte. Su un sito che promette di dire come stanno le cose,
mettere fotografie prese a caso sarebbe la contraddizione più costosa
disponibile. La fotografia che manca è una sola, ed è la sua, in `/chi-sono`.

**Gli occhielli in maiuscoletto.** La checklist li segnala. Qui sono un sistema
coerente che marca l'inizio di ogni fascia in tutte e diciassette le pagine.
Toglierli non è una correzione: è un altro disegno.

---

## Se si dovesse fare una cosa sola

La 404 e i sei collegamenti morti. Non sono questioni di gusto: sono promesse
che il sito fa e non mantiene, e sono le uniche voci di questo elenco che un
visitatore incontra come un errore invece che come uno stile.
