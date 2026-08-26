// src/pages/rss.xml.ts — il feed delle note (rotta `/rss.xml`).
//
// Gli articoli vengono da Sanity, come le pagine. Due difetti che questo
// file portava sono spariti con il cambio di fonte, non per una correzione:
//
// - le date non vanno più tradotte da «25 ago 2026» a un `Date`: Sanity
//   consegna un ISO, e `dataUtc` lo porta a mezzanogiorno UTC senza passare
//   dal costruttore a tre numeri, che leggeva i valori nel fuso della
//   macchina che costruisce e nel feed mandava tutto indietro di un giorno;
// - i `link` non puntano più tutti a `/note`. Prima le note non avevano una
//   pagina propria, quindi i sei elementi condividevano lo stesso `<guid>`
//   derivato dal link e gli aggregatori ne mostravano uno solo. Ora ogni
//   nota ha il suo indirizzo, che è anche il suo identificativo: `customData`
//   e lo slug fabbricato dal titolo non servono più.
//
// Il feed è in italiano e comprende tutte le note, tradotte o no: chi lo
// segue segue la persona, non una delle due lingue.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { dataUtc } from '../lib/dataNota';
import { tutteLeNote } from '../lib/note';

export async function GET(context: APIContext) {
  const note = await tutteLeNote();
  return rss({
    title: 'Note — Alessandro Flaborea',
    description: 'Quello che imparo mentre lo imparo.',
    site: context.site!,
    items: note.map((n) => ({
      title: n.titolo,
      description: n.sommario,
      pubDate: dataUtc(n.data),
      link: `/note/${n.slug}`,
    })),
  });
}
