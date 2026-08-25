export interface Nota {
  data: string;
  titolo: string;
  sommario: string;
  tag: string[];
}

// Dalla più recente, sezione /note.
export const note: Nota[] = [
  {
    data: "25 ago 2026",
    titolo: "Cosa chiede davvero l'AI Act alle piccole imprese",
    sommario:
      "Dal 2 febbraio 2025 chi usa strumenti di intelligenza artificiale deve garantire una formazione minima al personale ed essere in grado di dimostrarlo. Buona parte di quello che si legge in giro è allarmismo di chi vende corsi: qui c'è il testo dell'articolo 4, cosa comporta per un'azienda di trenta persone e cosa si riesce a fare in mezza giornata.",
    tag: ["Regole", "Da leggere in 5 minuti"],
  },
  {
    data: "18 ago 2026",
    titolo: "Perché ho costruito per primo il pezzo difficile",
    sommario:
      "In un progetto per un costruttore di macchine la parte più incerta era la conversione dei modelli CAD. L'ho affrontata prima del resto, con ottanta test. Se non avesse funzionato lo avremmo saputo dopo tre settimane, quando cambiare strada era ancora semplice.",
    tag: ["Come lavoro", "Manifattura"],
  },
  {
    data: "11 ago 2026",
    titolo: "Cosa succede ai tuoi dati quando incolli un preventivo in ChatGPT",
    sommario:
      "La risposta dipende da quale versione si sta usando e da come è configurata, e in azienda quasi nessuno lo sa. Tre cose che si possono controllare in dieci minuti.",
    tag: ["Rischi", "Da leggere in 5 minuti"],
  },
  {
    data: "4 ago 2026",
    titolo: "Metà delle richieste che ricevo si risolvono senza intelligenza artificiale",
    sommario:
      "Spesso il problema è che un'informazione che l'azienda già possiede non si riesce a recuperare quando serve. Sistemare quello costa meno e andrebbe comunque fatto prima.",
    tag: ["Opinioni"],
  },
  {
    data: "28 lug 2026",
    titolo: "Sei curriculum da due file di testo",
    sommario:
      "Quando i fatti sono scritti una volta sola, le varianti diventano sottrazioni da quel testo e smettono di essere copie da tenere allineate a mano. Un esempio piccolo di un principio che vale anche per le distinte base.",
    tag: ["Officina"],
  },
  {
    data: "21 lug 2026",
    titolo: "Tre cose che mi vengono chieste spesso e che di solito sconsiglio",
    sommario:
      "Il chatbot sul sito, il modello «addestrato sui nostri dati» e la dashboard che poi nessuno apre. Perché vengono chiesti, dove si inceppano e cosa si può fare al posto loro.",
    tag: ["Opinioni"],
  },
];
