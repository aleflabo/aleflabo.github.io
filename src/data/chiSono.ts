export interface ChiSonoCopy {
  paragrafi: string[];
  inBreve: string[];
  abitudini: { titolo: string; testo: string }[];
}

// Sezione /chi-sono. NB: i paragrafi 1 e 4 contengono riferimenti geografici
// (Udine, Svezia, Roma, Amsterdam) presenti alla lettera in testi.md — vedi
// segnalazione nel report, il vincolo del task li vorrebbe assenti.
export const chiSono: ChiSonoCopy = {
  paragrafi: [
    "Ho cominciato a Udine, con una laurea in informatica e sei mesi in Svezia che mi hanno tolto l'idea di restare fermo. Poi Roma: una magistrale in data science e un dottorato al Perception and Intelligence Lab della Sapienza, dove ho passato tre anni su un problema che si può riassumere così — insegnare a un computer a guardare qualcuno che lavora e capire cosa sta facendo.",
    "Nel mezzo un inverno ad Amsterdam a lavorare su una geometria diversa da quella a cui siamo abituati, e quattro anni in aula come assistente alla didattica, che è dove ho scoperto che spiegare una cosa difficile a chi non la conosce è un mestiere a parte.",
    "Quella ricerca poi è diventata un prodotto. Ho co-fondato Procedo e ne sono stato CTO per due anni: video girati in reparto che diventano procedure scritte, dentro aziende vere, con clienti che pagavano e si lamentavano quando qualcosa non funzionava. È lì che ho imparato la parte che all'università non si impara, cioè quanto di quello che scrivi in un articolo sopravvive al contatto con un capannone.",
    "Ho lasciato il ruolo operativo a metà 2026 e oggi lavoro per conto mio. Il motivo è semplice: mi piace la parte in cui si entra in un'azienda che non conosco, si guarda come lavora e si capisce dove si perde tempo. In una società che cresce quella parte diventa sempre più piccola.",
    "Continuo a scrivere codice tutti i giorni e a pubblicare quello che imparo. Se mi chiami, la persona che viene in azienda e la persona che poi costruisce sono la stessa.",
  ],
  inBreve: [
    "Dottorato in computer vision, Sapienza",
    "Dieci articoli pubblicati, il codice di tutti quelli che si potevano aprire",
    "Due anni da CTO di una startup industriale",
    "Quattro anni di aula all'università",
  ],
  abitudini: [
    {
      titolo: "Comincio dalla parte difficile",
      testo: "Nei progetti affronto per prima la cosa che potrebbe non funzionare. Costa qualche settimana in più all'inizio e fa risparmiare mesi quando la risposta è no.",
    },
    {
      titolo: "Scrivo tutto",
      testo: "Ogni decisione tecnica finisce in un documento leggibile anche da chi non programma. Serve a te se un domani il lavoro passa a qualcun altro.",
    },
    {
      titolo: "Dico quando conviene fermarsi",
      testo: "Capita che la cosa giusta da fare sia più piccola di quella che era stata chiesta, o che non vada fatta. Preferisco perdere un progetto che consegnarne uno inutile.",
    },
  ],
};
