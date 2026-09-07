// Da tavola a pagina che si apre da sola.
//
// Le tavole di `docs/superpowers/specs/**/tavole/*.dc.html` sono Design
// Components: dentro un `<x-dc>`, con in testa `<script src="./support.js">`
// che nel repo non esiste — lo inietta l'editor al momento di renderizzare.
// Aperte in un browser, quindi, non mostrano niente.
//
// Questo script ne ricava una copia autoportante: prende lo `<style>` dentro
// `<helmet>` e il corpo dentro `<x-dc>`, e li rimette in un documento HTML
// normale. Il risultato si apre con doppio clic, animazioni comprese, e non
// dipende da nessuno strumento — che è il punto: il progetto della home deve
// restare leggibile anche fra due anni, quando l'editor che l'ha prodotto non
// sarà più installato da nessuna parte.
//
// L'unica dipendenza esterna che resta sono i caratteri, presi da Google
// Fonts: senza rete si vedono le riserve dichiarate (Georgia per Fraunces,
// il font di sistema per Inter), e l'impaginazione regge.
//
//   node scripts/tavole-anteprima.mjs docs/superpowers/specs/2026-09-03-home-visuale
//
// Senza argomenti rifà tutte le cartelle `tavole/` che trova.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const RADICE = "docs/superpowers/specs";

/** Il corpo di una tavola, senza il guscio dell'editor. */
function autoportante(sorgente) {
  const testa = sorgente.match(/<helmet>([\s\S]*?)<\/helmet>/)?.[1] ?? "";
  const corpo = (sorgente.match(/<x-dc>([\s\S]*?)<\/x-dc>/)?.[1] ?? "").replace(
    /<helmet>[\s\S]*?<\/helmet>/,
    "",
  );
  if (!corpo.trim()) return null;
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Generato da scripts/tavole-anteprima.mjs. Non si modifica a mano:
     la sorgente e' il .dc.html accanto, in tavole/. -->
${testa.trimEnd()}
</head>
<body>${corpo.trimEnd()}
</body>
</html>
`;
}

function cartelleTavole(dentro) {
  const trovate = [];
  for (const voce of readdirSync(dentro, { withFileTypes: true })) {
    if (!voce.isDirectory()) continue;
    const percorso = join(dentro, voce.name);
    if (voce.name === "tavole") trovate.push(percorso);
    else trovate.push(...cartelleTavole(percorso));
  }
  return trovate;
}

const richiesta = process.argv[2];
const cartelle = richiesta
  ? cartelleTavole(richiesta).concat(existsSync(join(richiesta, "tavole")) ? [] : [])
  : cartelleTavole(RADICE);

if (cartelle.length === 0) {
  console.error(`Nessuna cartella tavole/ sotto ${richiesta ?? RADICE}`);
  process.exit(1);
}

let scritte = 0;
for (const tavole of cartelle) {
  const destinazione = join(dirname(tavole), "anteprima");
  for (const nome of readdirSync(tavole).filter((n) => n.endsWith(".dc.html")).sort()) {
    const pagina = autoportante(readFileSync(join(tavole, nome), "utf8"));
    if (!pagina) {
      console.error(`saltata ${nome}: nessun <x-dc> dentro`);
      continue;
    }
    mkdirSync(destinazione, { recursive: true });
    const uscita = join(destinazione, basename(nome, ".dc.html") + ".html");
    writeFileSync(uscita, pagina, "utf8");
    console.log(uscita);
    scritte += 1;
  }
}
console.log(`${scritte} anteprime.`);
