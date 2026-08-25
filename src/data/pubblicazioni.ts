export interface Pubblicazione {
  anno: string;
  titolo: string;
  descrizione: string;
  sede: string;
  metriche: string;
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
