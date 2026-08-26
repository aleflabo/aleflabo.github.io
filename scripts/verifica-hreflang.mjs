// scripts/verifica-hreflang.mjs — verifica mirata sugli `hreflang`
// (task 9, sito-inglese, richiesta esplicita: lo script del task 10 non
// esiste ancora, e il difetto delle diciassette pagine con `hreflang`
// verso rotte inglesi inesistenti l'ha trovato solo la revisione finale,
// non un controllo per singolo task).
//
// `scripts/verifica-rotte.mjs` già controlla i collegamenti interni, ma
// solo quelli con `href="/…"` relativo: gli `hreflang` di BaseLayout sono
// URL assoluti (`href="https://aleflabo.github.io/en/…"`), quindi quel
// controllo li salta silenziosamente — lo stesso motivo per cui il
// progetto italiano non si era accorto delle diciassette rotte morte.
//
// Per ogni file HTML in dist/: estrae le coppie
// <link rel="alternate" hreflang="…" href="…">, le elenca tutte, e
// verifica che il file di destinazione esista davvero sul disco.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const SITE = "https://aleflabo.github.io";

function trovaHtml(dir) {
  let file = [];
  for (const voce of readdirSync(dir)) {
    const percorso = join(dir, voce);
    if (statSync(percorso).isDirectory()) file = file.concat(trovaHtml(percorso));
    else if (voce.endsWith(".html")) file.push(percorso);
  }
  return file;
}

// Da un URL assoluto dichiarato in hreflang al file dist/ atteso.
// "https://aleflabo.github.io/en/services" -> "dist/en/services/index.html"
// "https://aleflabo.github.io/" -> "dist/index.html"
function fileAtteso(hrefAssoluto) {
  if (!hrefAssoluto.startsWith(SITE)) return { fuoriSito: true, percorso: hrefAssoluto };
  let percorso = hrefAssoluto.slice(SITE.length);
  if (percorso === "") percorso = "/";
  const pulito = percorso.replace(/\/+$/, "") || "/";
  const file = pulito === "/" ? join(DIST, "index.html") : join(DIST, pulito, "index.html");
  return { fuoriSito: false, percorso: pulito, file };
}

if (!existsSync(DIST)) {
  console.error(`✗ manca ${DIST}/: esegui prima "npm run build"`);
  process.exit(1);
}

const fileHtml = trovaHtml(DIST).sort();
let coppie = 0;
let mancanti = 0;
const righe = [];

for (const file of fileHtml) {
  const html = readFileSync(file, "utf8");
  const link = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/?>/g)];
  for (const [, lingua, href] of link) {
    coppie++;
    const attesa = fileAtteso(href);
    const sorgente = relative(DIST, file);
    if (attesa.fuoriSito) {
      mancanti++;
      righe.push(`✗ ${sorgente} → hreflang="${lingua}" → ${href} (fuori da ${SITE}, non verificabile come file)`);
      continue;
    }
    const esiste = existsSync(attesa.file);
    const esito = esiste ? "✓" : "✗";
    if (!esiste) mancanti++;
    righe.push(`${esito} ${sorgente} → hreflang="${lingua}" → ${attesa.percorso}${esiste ? "" : "  (MANCA " + attesa.file + ")"}`);
  }
}

console.log(`File HTML analizzati: ${fileHtml.length}`);
console.log(`Coppie hreflang trovate: ${coppie}`);
console.log("");
for (const riga of righe) console.log(riga);
console.log("");
console.log(
  mancanti === 0
    ? `✓ tutte le ${coppie} destinazioni hreflang esistono`
    : `✗ ${mancanti} destinazioni hreflang mancanti su ${coppie}`,
);
process.exit(mancanti === 0 ? 0 : 1);
