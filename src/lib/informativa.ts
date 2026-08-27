import type { PaginaLegale } from "../data/legale";
import { sezioneStatistiche, type Statistiche } from "../data/analytics";
import type { Locale } from "../i18n/ui";

/**
 * Aggiunge all'informativa la sezione che descrive lo strumento di statistica,
 * quando ce n'è uno.
 *
 * Il senso è che le due cose non possano divergere: il giorno in cui
 * `statistiche` in src/data/analytics.ts smette di essere `null`, lo script
 * compare in pagina **e** l'informativa lo dice, dallo stesso interruttore.
 * Su questo progetto è già successo il contrario — una pagina che descriveva
 * `localStorage` mesi dopo che era stato tolto — ed è il motivo per cui il
 * CLAUDE.md chiede che le pagine legali si riscrivano prima, non dopo.
 *
 * La sezione va **prima** dell'ultima, che nelle due pagine è quella che parla
 * di cosa succederà se le cose cambiano: è la chiusura, e resta in fondo.
 */
export function conStatistiche(
  pagina: PaginaLegale,
  lang: Locale,
  statistiche: Statistiche | null,
): PaginaLegale {
  if (!statistiche) return pagina;
  const nuova = sezioneStatistiche(lang, statistiche);
  const sezioni = [...pagina.sezioni];
  sezioni.splice(Math.max(sezioni.length - 1, 0), 0, nuova);
  return { ...pagina, sezioni };
}
