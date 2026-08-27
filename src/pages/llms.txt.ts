// src/pages/llms.txt.ts — la rotta `/llms.txt`.
//
// Convenzione emergente (non uno standard): una mappa in testo semplice di
// chi c'è dietro il sito, cosa offre e quali indirizzi contano, pensata per
// chi legge una pagina alla volta senza seguire i menu. Costa poco e toglie
// un'ambiguità: prima, `/llms.txt` e `/llms-full.txt` rispondevano 404.
//
// Niente frasi nuove: titoli, descrizioni e nomi vengono dai file di dati
// che alimentano già le pagine, e gli indirizzi da `context.site` come il
// canonico. Se un domani cambia una descrizione in pagina, cambia qui.
import type { APIContext } from 'astro';
import { ingaggi } from '../data/servizi';
import { formati } from '../data/formazione';
import { pubblicazioni, arxivDi, numeriFascia } from '../data/pubblicazioni';
import { territorio } from '../data/territorio';
import { emailContatto } from '../data/legale';
import { faq } from '../data/servizi';
import { projects } from '../data/projects';
import { frasePresentazione } from '../data/site';

/**
 * Unisce dei frammenti in una frase, con un punto solo fra l'uno e l'altro e
 * uno in fondo. Senza, un titolo che finisce per «?» — «Are We Certain It's
 * Anomalous?» — usciva come «…Anomalous?.».
 */
function frase(...pezzi: string[]): string {
  const unita = pezzi
    .map((x) => x.trim())
    .filter(Boolean)
    .reduce((acc, x) => (!acc ? x : /[.!?]$/.test(acc) ? `${acc} ${x}` : `${acc}. ${x}`), "");
  return /[.!?]$/.test(unita) ? unita : `${unita}.`;
}

const ROTTE: { percorso: string; nome: string; cosa: string }[] = [
  { percorso: '/servizi/', nome: 'Servizi', cosa: 'I quattro modi di lavorare insieme, con durata e cosa resta al cliente.' },
  { percorso: '/formazione/', nome: 'Formazione', cosa: 'I tre formati di corso, e come si finanziano.' },
  { percorso: '/lavori/', nome: 'Lavori', cosa: 'Le schede dei progetti: software per aziende, prodotti e cose costruite in proprio.' },
  { percorso: '/ricerca/', nome: 'Ricerca', cosa: 'Il dottorato e le dieci pubblicazioni.' },
  { percorso: '/chi-sono/', nome: 'Chi sono', cosa: 'La biografia e il modo di lavorare.' },
  { percorso: '/i-vostri-dati/', nome: 'Che fine fanno i vostri dati', cosa: 'Dove finiscono i dati aziendali quando si lavora con strumenti di AI.' },
  { percorso: '/note/', nome: 'Note', cosa: "Quello che imparo mentre lo imparo." },
  { percorso: '/privacy/', nome: 'Privacy', cosa: 'Cosa fa il sito con i dati di chi lo legge: niente.' },
];

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const t = territorio.it;

  const righe = [
    '# Alessandro Flaborea',
    '',
    // La frase approvata, letta da site.ts. Qui c'era una parafrasi scritta da
    // me: copy inventato, che la regola 2 del CLAUDE.md vieta — e in un file
    // pensato proprio per essere citato da terzi era il posto peggiore.
    `> ${frasePresentazione.it}`,
    '',
    `Sito in italiano su ${site}/ e in inglese su ${site}/en/. L'italiano è la versione principale.`,
    '',
    '## Dove',
    '',
    `${t.intro} ${t.corpo}`,
    '',
    ...t.modi.map((m) => `- ${m.etichetta}: ${m.dettaglio}`),
    '',
    '## Cosa offro',
    '',
    ...ingaggi.map((i) => `- **${i.nome}** (${i.durata}) — ${i.corpo[0]} Resta: ${i.cosaResta}.`),
    '',
    '## Formazione',
    '',
    ...formati.map((f) => `- **${f.nome}** (${f.ore}) — ${f.corpo}`),
    '',
    '## Ricerca',
    '',
    numeriFascia.map((n) => `${n.numero} ${n.etichetta}`).join(' · ') + '.',
    '',
    ...pubblicazioni.map((p) => {
      const arxiv = arxivDi(p.titolo);
      return `- ${p.anno} — ${frase(p.titolo, p.sede, p.metriche)}${arxiv ? ` ${arxiv}` : ''}`;
    }),
    '',
    // Le cinque domande di /servizi. Sono la parte del sito scritta nel
    // formato che un motore generativo cita più volentieri — domanda breve,
    // risposta autonoma — e lasciarle fuori da un file fatto apposta per
    // quello era una contraddizione.
    '## Domande che mi vengono fatte',
    '',
    ...faq.flatMap((d) => [`**${d.domanda}** ${d.risposta}`, '']),
    '## I lavori, uno per uno',
    '',
    ...projects
      .filter((p) => p.it.summary)
      .map((p) => `- [${p.name}](${site}/lavori/${p.slug}/): ${p.it.summary}`),
    '',
    '## Pagine',
    '',
    ...ROTTE.map((r) => `- [${r.nome}](${site}${r.percorso}): ${r.cosa}`),
    '',
    '## Contatti',
    '',
    `- Posta: ${emailContatto}`,
    '- WhatsApp: https://wa.me/393467202432',
    '- LinkedIn: https://www.linkedin.com/in/alessandro-flaborea',
    '- GitHub: https://github.com/aleflabo',
    '- Google Scholar: https://scholar.google.com/citations?user=HHDHIVoAAAAJ',
    '',
  ];

  return new Response(righe.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
