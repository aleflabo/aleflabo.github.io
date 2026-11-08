/**
 * L'interruttore del modulo di contatto (spec 2026-11-08, § «Il modulo»).
 *
 * `null` = spento: il pulsante è disattivato, la pagina dice «Modulo non ancora
 * attivo.» e l'informativa dice che il modulo non è collegato a niente.
 * Per accenderlo: creare la chiave su web3forms.com con l'indirizzo che deve
 * ricevere le richieste e scriverla qui. Dallo stesso punto cambiano il modulo
 * (src/components/sezioni/Contatto.astro) e la privacy
 * (`conModulo` in src/lib/informativa.ts), e `verifica-rotte.mjs` fallisce se
 * le due cose non coincidono.
 *
 * La chiave di Web3Forms è pubblica per costruzione: finisce nel markup.
 */
import type { Locale } from '../i18n/ui';

export interface ModuloContatto {
  accessKey: string;
}

export const moduloContatto: ModuloContatto | null = null;

/**
 * Il primo paragrafo di «Se mi scrivete» nella privacy quando il modulo è
 * acceso: sostituisce quello che dice «non è ancora collegato». Testo
 * approvato l'8 novembre 2026 (testi.md, «Modulo di contatto acceso»).
 */
export const paragrafoInformativa: Record<Locale, string> = {
  it: "Se compilate il modulo di contatto, quello che scrivete (azienda, recapito, richiesta e urgenza) passa da Web3Forms, un servizio che lo riceve e me lo inoltra per mail. Web3Forms tratta quei dati per conto mio; per come li conserva vale la sua informativa (web3forms.com/privacy). Il modulo non usa cookie e non carica nulla da fuori: il vostro browser parla con Web3Forms solo nel momento in cui premete «Manda». Io conservo le richieste il tempo necessario a rispondervi e a portare avanti un eventuale lavoro insieme.",
  en: "If you fill in the contact form, what you write (company, contact details, request and urgency) goes through Web3Forms, a service that receives it and forwards it to me by email. Web3Forms processes that data on my behalf; how it stores it is set out in its own privacy policy (web3forms.com/privacy). The form uses no cookies and loads nothing from elsewhere: your browser only talks to Web3Forms at the moment you press «Send». I keep requests for as long as it takes to answer you and to carry out any work together.",
};

/** Il titolo della sezione da toccare, nelle due lingue. */
export const titoloSezioneScrivete: Record<Locale, string> = { it: 'Se mi scrivete', en: 'If you write to me' };
