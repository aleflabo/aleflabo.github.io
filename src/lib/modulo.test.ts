import { describe, it, expect } from 'vitest';
import { attributiModulo } from './modulo';

const SITO = 'https://flaborea.com';

describe('attributiModulo', () => {
  it('interruttore spento: niente action, niente campi nascosti', () => {
    expect(attributiModulo(null, 'it', SITO)).toEqual({ nascosti: {} });
  });
  it('acceso: invia a Web3Forms con la chiave', () => {
    const a = attributiModulo({ accessKey: 'chiave-di-prova' }, 'it', SITO);
    expect(a.action).toBe('https://api.web3forms.com/submit');
    expect(a.method).toBe('post');
    expect(a.nascosti.access_key).toBe('chiave-di-prova');
    expect(a.nascosti.subject).toBe('Nuova richiesta da flaborea.com');
    expect(a.nascosti.from_name).toBe('flaborea.com');
  });
  it('il reindirizzo resta sullo stesso dominio, con la barra finale', () => {
    expect(attributiModulo({ accessKey: 'k' }, 'it', SITO).nascosti.redirect).toBe('https://flaborea.com/grazie/');
    expect(attributiModulo({ accessKey: 'k' }, 'en', SITO + '/').nascosti.redirect).toBe('https://flaborea.com/en/thanks/');
  });
});
