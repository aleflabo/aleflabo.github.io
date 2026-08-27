export interface Pubblicazione {
  anno: string;
  titolo: string;
  descrizione: string;
  sede: string;
  metriche: string;
}

/**
 * L'arXiv di ogni pubblicazione che ne ha uno, per titolo.
 *
 * Sta qui e non dentro `pubblicazioni` perché i titoli sono identici nelle
 * due lingue: una mappa sola vale per /ricerca e per /en/research, e le due
 * pagine non possono divergere. La pagina linka i titoli e i dati
 * strutturati mettono lo stesso indirizzo in `sameAs` — che è il modo più
 * diretto per agganciare questa persona a un corpus già indicizzato altrove.
 *
 * Ogni voce è stata verificata il 27 agosto 2026 leggendo `citation_title`
 * sulla pagina arXiv corrispondente. **Il CV ne aveva una sbagliata**:
 * attribuiva `2301.09489` a «Multimodal Motion Conditioned Diffusion Model»,
 * mentre quell'identificatore è di «Contracting Skeletal Kinematics» — gli
 * URL erano sfalsati di una posizione, lo stesso difetto già capitato con
 * gli anni (vedi il commento sotto). Da qui in avanti si verifica prima di
 * scrivere.
 *
 * L'elenco è nove su dieci, e i nove sono l'elenco completo: vengono da una
 * query `au:"Flaborea"` sull'API di arXiv, che restituisce esattamente questi.
 * La decima — «A Self-Supervised Algorithm to Detect Signs of Social Isolation
 * in the Elderly» — su arXiv non c'è: è uscita solo su Artificial Intelligence
 * in Medicine, e la ricerca per titolo non dà risultati. Resta senza link e
 * senza `sameAs`, che è l'unica cosa onesta.
 */
export const arxivPerTitolo: Record<string, string> = {
  "TI-PREGO: Chain of Thought and In-Context Learning for Online Mistake Detection in Procedural Egocentric Videos":
    "https://arxiv.org/abs/2411.02570",
  "Compositional Entailment Learning for Hyperbolic Vision-Language Models":
    "https://arxiv.org/abs/2410.06912",
  "Contracting Skeletal Kinematics for Human-Related Video Anomaly Detection":
    "https://arxiv.org/abs/2301.09489",
  "PREGO: Online Mistake Detection in Procedural Egocentric Videos":
    "https://arxiv.org/abs/2404.01933",
  "Hyp2Nav: Hyperbolic Planning and Curiosity for Crowd Navigation":
    "https://arxiv.org/abs/2407.13567",
  "Multimodal Motion Conditioned Diffusion Model for Skeleton-Based Video Anomaly Detection":
    "https://arxiv.org/abs/2307.07205",
  "Are We Certain It's Anomalous?": "https://arxiv.org/abs/2211.09224",
  "Best Practices for 2-Body Pose Forecasting": "https://arxiv.org/abs/2304.05758",
  "Query-Guided Networks for Few-Shot Fine-Grained Classification and Person Search":
    "https://arxiv.org/abs/2209.10250",
};

/** L'arXiv di una pubblicazione, se ce l'ha. */
export function arxivDi(titolo: string): string | undefined {
  return arxivPerTitolo[titolo];
}

/**
 * Le sedi che sono riviste. Tutto il resto è una conferenza.
 *
 * Serve ai dati strutturati: `ScholarlyArticle.isPartOf` con `@type:
 * "Periodical"` dice «questo è uscito su una rivista», e su sei delle dieci
 * voci era falso — ICLR, CVPR, ICCV, IROS e i due workshop sono conferenze.
 * Dichiarare una conferenza come rivista, sulla pagina che regge la
 * credibilità scientifica del sito, è il genere di errore che chi legge
 * quei dati riconosce.
 *
 * L'elenco è esplicito e non dedotto dal nome: nel CV le riviste sono
 * riconoscibili perché portano un volume («Pattern Recognition, vol. 156»),
 * le conferenze perché dicono «Conference». Indovinare dalla stringa sarebbe
 * la stessa classe di errore degli URL sfalsati.
 */
const RIVISTE = new Set([
  "Computer Vision and Image Understanding",
  "Pattern Recognition",
  "Artificial Intelligence in Medicine",
]);

/** Se una sede è una rivista (`true`) o una conferenza (`false`). */
export function eUnaRivista(sede: string): boolean {
  return RIVISTE.has(sede);
}

// Dalla più recente, sezione /ricerca → «Le pubblicazioni».
//
// Gli anni in testi.md sono resi in posizione ambigua (lo <span> dell'anno
// precede l'<h3> del titolo nel DOM sorgente, quindi nel file estratto ogni
// anno compare dopo le metriche della pubblicazione PRECEDENTE, sfalsando
// di uno la lettura in ordine visivo). Gli anni qui sotto sono stati
// verificati e corretti contro /home/aleflabo/cv/content/en.yaml, la fonte
// autorevole per date e metriche delle pubblicazioni. Vedi task-6-report.md
// per il dettaglio della correzione.
export const pubblicazioni: Pubblicazione[] = [
  {
    anno: "2026",
    titolo: "TI-PREGO: Chain of Thought and In-Context Learning for Online Mistake Detection in Procedural Egocentric Videos",
    descrizione: "Accorgersi in tempo reale che qualcuno sta sbagliando un passaggio, guardando il video dal suo punto di vista.",
    sede: "Computer Vision and Image Understanding",
    metriche: "11 citazioni",
  },
  {
    anno: "2025",
    titolo: "Compositional Entailment Learning for Hyperbolic Vision-Language Models",
    descrizione: "Modelli che legano immagini e parole in uno spazio geometrico che rispetta le gerarchie.",
    sede: "ICLR",
    metriche: "118 citazioni",
  },
  {
    anno: "2024",
    titolo: "Contracting Skeletal Kinematics for Human-Related Video Anomaly Detection",
    descrizione: "Riconoscere comportamenti anomali dal solo movimento dello scheletro. Primo autore.",
    sede: "Pattern Recognition",
    metriche: "65 citazioni · 8 stelle",
  },
  {
    anno: "2024",
    titolo: "PREGO: Online Mistake Detection in Procedural Egocentric Videos",
    descrizione: "Rilevare gli errori in una procedura mentre viene eseguita. Primo autore.",
    sede: "CVPR",
    metriche: "50 citazioni · 34 stelle",
  },
  {
    anno: "2024",
    titolo: "Hyp2Nav: Hyperbolic Planning and Curiosity for Crowd Navigation",
    descrizione: "Far muovere un robot in mezzo alla gente senza urtare nessuno.",
    sede: "IROS",
    metriche: "3 citazioni",
  },
  {
    anno: "2023",
    titolo: "Multimodal Motion Conditioned Diffusion Model for Skeleton-Based Video Anomaly Detection",
    descrizione: "Il più citato e il più usato dei miei lavori. Primo autore.",
    sede: "ICCV",
    metriche: "147 citazioni · 93 stelle",
  },
  {
    anno: "2023",
    titolo: "Are We Certain It's Anomalous?",
    descrizione: "Quando il modello dice «è un'anomalia», quanto ci si può credere. Presentazione spotlight.",
    sede: "CVPR Workshops (VAND)",
    metriche: "15 citazioni · 26 stelle",
  },
  {
    anno: "2023",
    titolo: "Best Practices for 2-Body Pose Forecasting",
    descrizione: "Prevedere come si muoveranno due persone che interagiscono. Best Paper Award.",
    sede: "CVPR Workshops (Precognition)",
    metriche: "17 citazioni",
  },
  {
    anno: "2023",
    titolo: "A Self-Supervised Algorithm to Detect Signs of Social Isolation in the Elderly",
    descrizione: "Riconoscere segnali di isolamento sociale negli anziani senza dati etichettati.",
    sede: "Artificial Intelligence in Medicine",
    metriche: "29 citazioni",
  },
  {
    anno: "2023",
    titolo: "Query-Guided Networks for Few-Shot Fine-Grained Classification and Person Search",
    descrizione: "Ritrovare una persona o distinguere categorie molto simili con pochissimi esempi.",
    sede: "Pattern Recognition",
    metriche: "39 citazioni",
  },
];

export interface NumeroFascia {
  numero: string;
  etichetta: string;
}

// I quattro numeri della fascia in cima a /ricerca.
export const numeriFascia: NumeroFascia[] = [
  { numero: "10", etichetta: "articoli pubblicati" },
  { numero: "533", etichetta: "citazioni, ad agosto 2026" },
  { numero: "3", etichetta: "da primo autore" },
  { numero: "1", etichetta: "Best Paper Award" },
];
