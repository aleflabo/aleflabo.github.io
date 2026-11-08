// src/data/home.ts — le sezioni italiane uscite dalla home con il Laboratorio
// (spec 2026-11-08, «Dove vanno le sezioni che escono dalla home»). Stavano
// come costanti in src/pages/index.astro; spostate qui alla lettera, commenti
// compresi, perché ora le leggono /servizi e /chi-sono. La gemella inglese è
// src/data/en/home.ts.
import { localizedPath } from '../i18n/ui';

// --- IlProblema ---
// I tre `vignetta` sono letterali di un tipo unione lato componente
// (task 8): senza `as const` TypeScript li allargherebbe a `string` e
// `astro check` li rifiuterebbe allo spread sulle props.
export const ilProblema = {
  occhiello: 'Il problema',
  titolo: 'Le tre cose che mi vengono raccontate più spesso',
  riquadri: [
    {
      citazione: '«Mi serve questo pezzo.»',
      corpo: 'Arriva una mail con una foto storta. Prima di poter fare un preventivo bisogna capire di quale componente si tratti, e succede che ci si mettano in due per un paio di giorni.',
      vignetta: 'richiesta' as const,
    },
    {
      citazione: '«Lo sa fare solo Bruno.»',
      corpo: "Quarant'anni di mestiere che stanno nella testa di una persona sola. Nessuno ha mai avuto il tempo di metterli per iscritto, e fra due anni Bruno va in pensione.",
      vignetta: 'unaTestaSola' as const,
    },
    {
      citazione: '«Abbiamo provato ChatGPT.»',
      corpo: "Qualcuno in ufficio ha cominciato a usarlo per conto suo. Non è chiaro con quali documenti, né se l'azienda sia d'accordo, e finora nessuno ha avuto occasione di parlarne.",
      vignetta: 'fuoriDaCasa' as const,
    },
  ],
};

// --- CosaCostruisco ---
// Le otto stringhe sono alla lettera da testi.md, sezione «Cosa
// costruisco»: `verifica-rotte.mjs` fa fallire la build se una di queste
// finisce in pagina senza stare lì (task 11, home-visuale).
export const cosaCostruisco = {
  occhiello: 'Cosa costruisco',
  titolo: 'Metto insieme quello che avete già',
  intro: "I documenti di un'azienda stanno in cartelle, in caselle di posta e dentro i gestionali, e ognuno di quei posti sa una parte di quello che serve. Costruisco sistemi che li leggono tutti e li tengono collegati, così quello che sapete sta in un posto solo e ogni pezzo resta attaccato al documento da cui viene.",
  nodo: { titolo: 'Legge e collega', sottotitolo: 'ogni giorno, da solo' },
  ritorno: 'da dove viene',
  didascaliaSinistra: 'Cartelle, fogli, caselle di posta, gestionali.',
  didascaliaDestra: 'Un posto solo dove cercare.',
};

// --- DaDoveViene ---
// `corpo` è caduto (task 11, home-visuale): la fascia scura non lo rende
// più da quando FasciaNumeri.astro l'ha reso facoltativo e ha smesso di
// leggerlo (task 5).
export const daDoveViene = {
  occhiello: 'Da dove viene quello che so',
  titolo: 'Dalla ricerca alla produzione',
  intro: "Una magistrale in data science, poi un dottorato in computer vision alla Sapienza, con il lavoro pubblicato in conferenze dove viene esaminato a fondo prima di uscire. Sono poi stato due anni CTO di una startup industriale, che è il mestiere in cui si scopre quanto di quella ricerca sopravvive al contatto con un'azienda vera.",
  tappe: [
    { valore: '2021–2024', etichetta: 'Dottorato in computer vision, Sapienza – PINlab' },
    { valore: 'CVPR · ICCV · IROS', etichetta: 'Le conferenze principali del settore' },
    { valore: '2024–2026', etichetta: 'Co-fondatore e CTO di Procedo, startup industriale' },
  ],
  linkRicerca: 'La ricerca, per intero',
  hrefRicerca: localizedPath('it', '/ricerca'),
  linkChiSono: 'Chi sono',
  hrefChiSono: localizedPath('it', '/chi-sono'),
};

