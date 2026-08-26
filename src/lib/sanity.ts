// src/lib/sanity.ts — il client Sanity, usato solo in fase di costruzione.
//
// Il sito è statico: nessuna di queste chiamate parte dal browser di chi
// legge, e la chiave non esiste perché non serve — il dataset `production`
// è pubblico in lettura (verificato: una GET su
// https://sn6gk82y.api.sanity.io/.../data/query/production risponde 200
// senza credenziali). Se un domani il dataset diventasse privato servirebbe
// un token, e andrebbe messo fra i secret dell'Action, mai qui.
//
// `useCdn: false` di proposito: la CDN di Sanity serve a reggere il traffico
// di un sito che interroga a ogni visita, mentre qui l'interrogazione avviene
// una volta per costruzione. Con la CDN una nota appena pubblicata potrebbe
// non comparire nel sito ricostruito dal webhook, che è esattamente il
// difetto che il webhook esiste per evitare.
import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'sn6gk82y',
  dataset: 'production',
  apiVersion: '2026-08-26',
  useCdn: false,
});
