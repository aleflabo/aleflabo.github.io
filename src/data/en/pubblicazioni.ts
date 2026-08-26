// Testi inglesi di /en/research. Fonte: testi-en.md, sezione «5. /en/research»
// — tutti i blocchi sono [TRADOTTO]. Titoli, sedi, anni e stelle restano
// invariati; cambiano solo le descrizioni e le parole «citazioni»/«stelle».
import type { Pubblicazione, NumeroFascia } from "../pubblicazioni";

// Dalla più recente, sezione /en/research → «Publications».
export const pubblicazioni: Pubblicazione[] = [
  {
    anno: "2026",
    titolo: "TI-PREGO: Chain of Thought and In-Context Learning for Online Mistake Detection in Procedural Egocentric Videos",
    descrizione: "Noticing in real time that somebody is getting a step wrong, watching the video from their point of view.",
    sede: "Computer Vision and Image Understanding",
    metriche: "11 citations",
  },
  {
    anno: "2025",
    titolo: "Compositional Entailment Learning for Hyperbolic Vision-Language Models",
    descrizione: "Models that tie images and words together in a geometric space that respects hierarchies.",
    sede: "ICLR",
    metriche: "118 citations",
  },
  {
    anno: "2024",
    titolo: "Contracting Skeletal Kinematics for Human-Related Video Anomaly Detection",
    descrizione: "Recognising anomalous behaviour from skeleton movement alone. First author.",
    sede: "Pattern Recognition",
    metriche: "65 citations · 8 stars",
  },
  {
    anno: "2024",
    titolo: "PREGO: Online Mistake Detection in Procedural Egocentric Videos",
    descrizione: "Detecting mistakes in a procedure while it's being carried out. First author.",
    sede: "CVPR",
    metriche: "50 citations · 34 stars",
  },
  {
    anno: "2024",
    titolo: "Hyp2Nav: Hyperbolic Planning and Curiosity for Crowd Navigation",
    descrizione: "Moving a robot through a crowd without bumping into anyone.",
    sede: "IROS",
    metriche: "3 citations",
  },
  {
    anno: "2023",
    titolo: "Multimodal Motion Conditioned Diffusion Model for Skeleton-Based Video Anomaly Detection",
    descrizione: "The most cited and most used of my papers. First author.",
    sede: "ICCV",
    metriche: "147 citations · 93 stars",
  },
  {
    anno: "2023",
    titolo: "Are We Certain It's Anomalous?",
    descrizione: 'When the model says "this is an anomaly", how much you can believe it. Spotlight presentation.',
    sede: "CVPR Workshops (VAND)",
    metriche: "15 citations · 26 stars",
  },
  {
    anno: "2023",
    titolo: "Best Practices for 2-Body Pose Forecasting",
    descrizione: "Predicting how two interacting people will move. Best Paper Award.",
    sede: "CVPR Workshops (Precognition)",
    metriche: "17 citations",
  },
  {
    anno: "2023",
    titolo: "A Self-Supervised Algorithm to Detect Signs of Social Isolation in the Elderly",
    descrizione: "Recognising signs of social isolation in older people without labelled data.",
    sede: "Artificial Intelligence in Medicine",
    metriche: "29 citations",
  },
  {
    anno: "2023",
    titolo: "Query-Guided Networks for Few-Shot Fine-Grained Classification and Person Search",
    descrizione: "Finding a person again, or telling very similar categories apart, from very few examples.",
    sede: "Pattern Recognition",
    metriche: "39 citations",
  },
];

// I quattro numeri della fascia in cima a /en/research.
export const numeriFascia: NumeroFascia[] = [
  { numero: "10", etichetta: "published papers" },
  { numero: "533", etichetta: "citations, as of August 2026" },
  { numero: "3", etichetta: "as first author" },
  { numero: "1", etichetta: "Best Paper Award" },
];
