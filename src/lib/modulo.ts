import type { Locale } from '../i18n/ui';
import { localizedPath } from '../i18n/ui';
import type { ModuloContatto } from '../data/modulo';

/**
 * Gli attributi del <form> di contatto. Spento: niente action, quindi il
 * modulo non può inviare niente. Acceso: un POST semplice a Web3Forms, senza
 * script, con il reindirizzo alla pagina di conferma sullo stesso dominio (il
 * piano gratuito di Web3Forms lo permette solo così; verificato l'8 novembre
 * 2026 sulla loro documentazione).
 */
export function attributiModulo(
  m: ModuloContatto | null,
  lang: Locale,
  site: string,
): { action?: string; method?: 'post'; nascosti: Record<string, string> } {
  if (!m) return { nascosti: {} };
  const dominio = site.replace(/\/$/, '');
  return {
    action: 'https://api.web3forms.com/submit',
    method: 'post',
    nascosti: {
      access_key: m.accessKey,
      subject: 'Nuova richiesta da flaborea.com',
      from_name: 'flaborea.com',
      redirect: dominio + localizedPath(lang, lang === 'it' ? '/grazie' : '/thanks'),
    },
  };
}
