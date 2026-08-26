export interface Nota {
  data: string;
  titolo: string;
  sommario: string;
  tag: string[];
}

// Sezione /note, dalla più recente.
//
// Vuoto di proposito. Le sei voci che stavano qui erano titoli e sommari
// scritti per il mockup: non avevano un corpo — la riga puntava a `href="#"`
// — e mostrarle in produzione significava annunciare sei articoli che non
// esistono. Tolte su richiesta del committente.
//
// La pagina e il feed si adattano da soli: `/note` non rende la fascia
// dell'elenco quando questo array è vuoto, e `/rss.xml` esce con zero
// elementi. Aggiungere qui la prima nota vera la fa ricomparire in entrambi
// i posti senza toccare altro.
export const note: Nota[] = [];
