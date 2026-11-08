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
export interface ModuloContatto {
  accessKey: string;
}

export const moduloContatto: ModuloContatto | null = null;
