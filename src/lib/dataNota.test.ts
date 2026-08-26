import { describe, expect, it } from 'vitest';
import { dataEn, dataIt, dataUtc } from './dataNota';

describe('dataIt', () => {
  it('rende il mese abbreviato in italiano', () => {
    expect(dataIt('2026-08-25')).toBe('25 ago 2026');
  });

  it('non mette lo zero davanti al giorno', () => {
    expect(dataIt('2026-01-04')).toBe('4 gen 2026');
  });

  it('accetta anche un ISO con l\'ora attaccata', () => {
    expect(dataIt('2026-12-31T23:30:00Z')).toBe('31 dic 2026');
  });
});

describe('dataEn', () => {
  it('rende il mese abbreviato in inglese', () => {
    expect(dataEn('2026-08-25')).toBe('25 Aug 2026');
  });
});

describe('dataUtc', () => {
  it('mette la data a mezzanotte UTC', () => {
    expect(dataUtc('2026-08-25').toUTCString()).toBe('Tue, 25 Aug 2026 00:00:00 GMT');
  });

  // Il difetto vero che questa funzione esiste per evitare: con il
  // costruttore a tre numeri, in un fuso a est di Greenwich la mezzanotte
  // del 25 diventa il 24 nel feed. Il test gira sotto un fuso ostile.
  it('non slitta indietro di un giorno nei fusi a est', () => {
    const tz = process.env.TZ;
    process.env.TZ = 'Pacific/Auckland';
    try {
      expect(dataUtc('2026-08-25').toISOString()).toBe('2026-08-25T00:00:00.000Z');
    } finally {
      process.env.TZ = tz;
    }
  });
});
