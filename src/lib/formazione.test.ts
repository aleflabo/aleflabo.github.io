import { describe, it, expect } from 'vitest';
import { corsi, faqAiAct, riquadroAiAct, dettagliPratici } from '../data/formazione';
import * as en from '../data/en/formazione';
import { fontiAiAct } from '../data/fontiAiAct';

const durata = (lista: typeof corsi, nome: string, livello?: string) =>
  lista.find((c) => c.nome === nome)!.livelli.find((l) => l.nome === livello)!.durata;

describe('formazione', () => {
  it('le durate sono quelle della spec', () => {
    expect(durata(corsi, 'Corso introduttivo')).toBe('4 ore');
    expect(durata(corsi, 'Laboratorio per funzione')).toBe('8-12 ore');
    for (const c of ['Python', 'Claude Code']) {
      expect(durata(corsi, c, 'base')).toBe('8 ore');
      expect(durata(corsi, c, 'avanzato')).toBe('12-16 ore');
    }
  });
  it('due famiglie, due corsi ciascuna, niente «Percorso finanziato», in tutte e due le lingue', () => {
    for (const lista of [corsi, en.corsi]) {
      expect(lista.filter((c) => c.famiglia === 'azienda')).toHaveLength(2);
      expect(lista.filter((c) => c.famiglia === 'tecnici')).toHaveLength(2);
    }
    expect(corsi.some((c) => c.nome === 'Percorso finanziato')).toBe(false);
    expect(en.corsi.some((c) => c.nome === 'Funded programme')).toBe(false);
  });
  it('ogni frase sulla norma ha una fonte verificata, in tutte e due le lingue', () => {
    for (const lista of [faqAiAct, en.faqAiAct]) {
      expect(lista).toHaveLength(7);
      for (const d of lista) expect(fontiAiAct[d.fonte]?.href).toMatch(/^https:\/\//);
    }
    for (const r of [riquadroAiAct, en.riquadroAiAct]) expect(fontiAiAct[r.fonte]).toBeDefined();
  });
  it('dichiara il massimo di 10 persone', () => {
    expect(dettagliPratici.join(' ')).toMatch(/10 persone/);
    expect(en.dettagliPratici.join(' ')).toMatch(/10 people/);
  });
});
