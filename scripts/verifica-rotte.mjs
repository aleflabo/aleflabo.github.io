import { readFileSync, existsSync } from "node:fs";

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

if (existsSync("dist/CNAME")) dice("il CNAME è tornato: il dominio non è ancora comprato");

console.log(errori === 0 ? "✓ tutte le rotte a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
