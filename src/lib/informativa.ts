import type { PaginaLegale } from "../data/legale";
import { sezioneStatistiche, type Statistiche } from "../data/analytics";
import type { Locale } from "../i18n/ui";
import {
  paragrafoConservazione,
  paragrafoInformativa,
  titoloSezioneConservazione,
  titoloSezioneScrivete,
  type ModuloContatto,
} from "../data/modulo";

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

/**
 * Con il modulo acceso, la privacy smette di dire che il modulo non è
 * collegato e dice dove vanno i dati: il primo paragrafo di «Se mi scrivete»
 * viene sostituito dal testo approvato su Web3Forms. Spento, la pagina resta
 * identica. Stesso principio di `conStatistiche`: un interruttore solo per il
 * modulo e per la frase che lo descrive.
 */
export function conModulo(pagina: PaginaLegale, lang: Locale, modulo: ModuloContatto | null): PaginaLegale {
  if (!modulo) return pagina;
  return {
    ...pagina,
    sezioni: pagina.sezioni.map((s) => {
      // Il primo paragrafo delle due sezioni che a modulo acceso diventano
      // false: «Se mi scrivete» e «Per quanto tempo».
      if (s.titolo === titoloSezioneScrivete[lang]) return { ...s, paragrafi: [paragrafoInformativa[lang], ...s.paragrafi.slice(1)] };
      if (s.titolo === titoloSezioneConservazione[lang]) return { ...s, paragrafi: [paragrafoConservazione[lang], ...s.paragrafi.slice(1)] };
      return s;
    }),
  };
}
