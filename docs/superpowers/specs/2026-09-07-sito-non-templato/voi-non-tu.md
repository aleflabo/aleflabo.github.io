# Il «voi» — il censimento, e la decisione che l'ha chiuso

*7 settembre 2026. **Chiuso: nessuna frase riscritta, la regola cambiata.***

## L'esito, prima dell'elenco

Il censimento cercava le violazioni di una regola — `.claude/rules/copy-e-tono.md`
diceva «alle aziende si dà del voi, mai del tu» — e ne ha trovate quattordici. Messe
davanti al committente perché le riscrivesse, la risposta è stata di **lasciarle
esattamente come sono**.

Non è una deroga: **la regola era sbagliata**. Le due persone non sono in concorrenza,
parlano a due lettori diversi, e `src/data/servizi.ts` lo mostra pulito sui quattro
ingaggi:

| campo | a chi parla | registro | esempio |
|---|---|---|---|
| `perChi` | la persona che decide | **tu** | «**Hai** un'idea e **vuoi** sapere se regge» |
| `cosaResta` | l'azienda che lo riceve | **voi** | «Un documento che **potete** far leggere a chiunque» |

Il caso che questo documento chiamava «il più netto», il numero 13, è in realtà la
dimostrazione più chiara: «Mi **scrivi** due righe su cosa **vorreste** smettere di fare
a mano». *Tu* scrivi a me; *la vostra azienda* vuole smettere di farlo a mano. Una frase,
due lettori, ed è giusta.

Per proporzione: sulle pagine italiane costruite ci sono **61 forme al «voi» e 13 al
«tu»**. `/privacy`, `/cookie` e `/i-vostri-dati` sono al voi da cima a fondo — l'ultima
se lo porta nell'indirizzo — e le pagine legali non sono una questione di stile.

Una sola eccezione osservata e lasciata stare: «Server compresi, e una persona che
risponde quando **chiami**» è un `cosaResta` scritto al tu.

La regola nuova sta in `.claude/rules/copy-e-tono.md` e dice anche la cosa che serve
davvero: **non si converte mai una persona nell'altra meccanicamente.** Una frase che le
mischia è probabilmente giusta; se sembra sbagliata si chiede, non si riscrive.

## L'elenco, tenuto come censimento

Resta qui perché è la prova su cui la decisione è stata presa, non perché ci sia
qualcosa da fare. Le righe `→` sotto ogni frase sono vuote e **restano vuote**: è quello
il risultato.

## `/` — home, sezione «Come lavoro»

Vengono da `src/pages/index.astro` (italiano) e `src/data/en/home.ts` (inglese).
L'inglese ha già `yours`/`you`, che vale per tutte e due le persone: cambia solo
l'italiano.

**1.** Intro dei quattro passi
> Quattro passi. Ci si può fermare dopo ognuno, e quello che è stato fatto fino a lì
> resta comunque **tuo**.

→

**2.** «Ne esce» del passo 02, Audit AI
> Un documento che resta **tuo**, e che **puoi** far leggere a chi **vuoi**.

→

**3.** «Ne esce» del passo 03, Software su misura
> Qualcosa che i **tuoi** aprono il lunedì mattina e usano davvero.

→

**4.** «Ne esce» del passo 04, Canone di servizio
> Una persona che conosce il sistema e che **puoi** chiamare quando serve.

→

---

## `/` e `/servizi/` — il blocco «Parliamone»

Da `src/data/legale.ts` e `src/data/servizi.ts`. Compaiono su tutte e due le pagine.

**5.** Sotto la mezz'ora
> Se non è il lavoro giusto per me **te** lo dico subito, e se conosco qualcuno più
> adatto **ti** metto in contatto.

→

**6.** Etichetta di un campo del modulo
> Come **ti** scrivo

→

**7.** Etichetta di un campo del modulo
> Cosa **vorresti** smettere di fare a mano

→

---

## `/servizi/` — i quattro ingaggi, riga «Per chi»

Da `src/data/servizi.ts`. Qui il «tu» stona di più, perché la riga accanto («Cosa
resta») dà già del voi.

**8.** Capire — Mezza giornata diagnostica
> **Hai** un'idea e **vuoi** sapere se regge prima di metterci soldi

→

**9.** Costruire — Software su misura
> **Hai** un processo preciso che **vuoi** togliere di mezzo

→

**10.** Mantenere — Canone di servizio
> **Hai** qualcosa in produzione e **preferiresti** non doverci pensare

→

**11.** Mantenere — «Cosa resta»
> Server compresi, e una persona che risponde quando **chiami**

→

---

## `/servizi/` — «Onestà» e «Come si comincia»

**12.** Per chi non sono
> Se **cerchi** un sito vetrina o un e-commerce, ci sono agenzie che lo fanno meglio di
> me e costano meno.

→

**13.** Come si comincia — **il «tu» e il «voi» nella stessa frase**
> Mi **scrivi** due righe su cosa **vorreste** smettere di fare a mano e ci sentiamo
> mezz'ora.

→

---

## `/ricerca/` — l'occhiello

**14.** Occhiello della seconda sezione
> Cosa c'entra con la **tua** azienda

→ *(già risolto: questo occhiello cade nel primo giro, quello degli occhielli.
Se preferisci che resti, serve la versione al «voi».)*

---

## Fuori elenco, verificati e lasciati stare

Trovati dal censimento e scartati a ragion veduta:

- `/lavori/` — «legge la postura e corregge l'esecuzione mentre **ti** alleni»:
  HomeSweatHome parla a chi si allena, non a un'azienda.
- `/ricerca/` — «TI-PREGO»: è il nome di un articolo.
- `/chi-sono/` — «**sei** mesi in Svezia»: è un numero.

## Quello che il censimento ha trovato pulito

Le altre tre regole del registro sono a zero su tutto il sito, e non c'è niente da
fare: **nessun «non X, ma Y»**, **nessun titolo con la virgola e la seconda
proposizione** (0 su 115 titoli italiani), **nessun titolo che apre con un numero**.
Erano rispettivamente nove, undici e undici in una versione passata.
