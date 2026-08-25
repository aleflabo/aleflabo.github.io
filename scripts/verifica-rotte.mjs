import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROTTE = [
  "index", "servizi", "formazione", "lavori", "ricerca",
  "chi-sono", "i-vostri-dati", "note", "en",
];

let errori = 0;
const dice = (m) => { console.error("✗ " + m); errori++; };

// Verifica rotte
for (const r of ROTTE) {
  const f = r === "index" ? "dist/index.html" : `dist/${r}/index.html`;
  if (!existsSync(f)) { dice(`manca la rotta /${r === "index" ? "" : r}`); continue; }
  const html = readFileSync(f, "utf8");
  if (html.includes("flaborea.com")) dice(`${f} nomina un dominio che non esiste`);
  if (r !== "en" && /hreflang="it" href="[^"]*\/it\//.test(html)) dice(`${f} punta ancora a /it/`);
}

// Verifica RSS
if (!existsSync("dist/rss.xml")) {
  dice("manca il feed RSS");
} else {
  const rss = readFileSync("dist/rss.xml", "utf8");

  // Conta elementi
  const items = rss.match(/<item>/g) || [];
  if (items.length !== 6) {
    dice(`il feed ha ${items.length} elementi, ne aspetto 6`);
  }

  // Verifica date a mezzanotte UTC
  const pubDates = rss.match(/<pubDate>[^<]+<\/pubDate>/g) || [];
  pubDates.forEach((dateTag, idx) => {
    if (!dateTag.endsWith("00:00:00 GMT</pubDate>")) {
      dice(`pubDate ${idx + 1} non è a mezzanotte UTC: ${dateTag}`);
    }
  });
}

// Verifica che gli href interni risolvano davvero (task 11): finora si
// controllava solo che le nove rotte sopra esistessero, non che i
// collegamenti dentro le pagine portassero da qualche parte. Due dei
// quattro bloccanti della revisione finale del ramo sito-italiano (LangSwitch
// verso rotte inglesi inesistenti, «Scrivimi» morto) sarebbero stati presi
// da un controllo così.
function trovaHtml(dir) {
  let file = [];
  for (const voce of readdirSync(dir)) {
    const percorso = join(dir, voce);
    if (statSync(percorso).isDirectory()) file = file.concat(trovaHtml(percorso));
    else if (voce.endsWith(".html")) file.push(percorso);
  }
  return file;
}

function esisteRotta(href) {
  // Solo il pezzo prima di un eventuale frammento conta come rotta.
  const [percorso] = href.split("#");
  if (percorso === "") return true; // solo un frammento sulla stessa pagina
  const pulito = percorso.replace(/\/+$/, "") || "/";
  return existsSync(join("dist", pulito, "index.html")) || existsSync(join("dist", pulito));
}

if (existsSync("dist")) {
  for (const file of trovaHtml("dist")) {
    const html = readFileSync(file, "utf8");
    const href = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    for (const h of href) {
      if (h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:")) continue;
      if (!h.startsWith("/") || h.startsWith("//")) continue; // esclude gli esterni
      if (!esisteRotta(h)) dice(`${file}: collegamento rotto verso ${h}`);
    }
  }
}

if (existsSync("dist/CNAME")) dice("il CNAME è tornato: il dominio non è ancora comprato");

console.log(errori === 0 ? "✓ tutte le rotte a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
