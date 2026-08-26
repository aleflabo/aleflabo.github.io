import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

// Le sette rotte inglesi (task 8/9, ramo sito-inglese) mancavano qui: senza
// di loro questo script non si accorgeva se una di esse spariva, esattamente
// come per le rotte italiane sopra.
const ROTTE = [
  "index", "servizi", "formazione", "lavori", "ricerca",
  "chi-sono", "i-vostri-dati", "note", "en",
  "en/services", "en/training", "en/work", "en/research",
  "en/about", "en/your-data", "en/notes",
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

// La pagina 404 deve stare esattamente in dist/404.html: GitHub Pages serve
// quel file, e solo quello, per ogni indirizzo che non esiste. Se finisse in
// una sottocartella — come succede a tutte le altre rotte — il sito
// continuerebbe a costruire senza errori e chi sbaglia un indirizzo tornerebbe
// a vedere la pagina di errore di GitHub, senza che niente lo segnali.
if (!existsSync("dist/404.html")) {
  dice("manca dist/404.html");
}

// Verifica RSS
if (!existsSync("dist/rss.xml")) {
  dice("manca il feed RSS");
} else {
  const rss = readFileSync("dist/rss.xml", "utf8");

  // Il feed deve avere tanti elementi quante sono le note in pagina. Prima
  // qui c'era il numero fisso 6: si è rotto nel momento in cui le note del
  // mockup sono state tolte, e un numero fisso non avrebbe comunque colto il
  // difetto vero — un feed che smette di seguire la pagina. Il confronto è
  // fra due cose costruite, quindi resta valido a zero note come a trenta.
  const items = rss.match(/<item>/g) || [];
  const paginaNote = readFileSync("dist/note/index.html", "utf8");
  const righe = paginaNote.match(/class="riga"/g) || [];
  if (items.length !== righe.length) {
    dice(
      `il feed ha ${items.length} elementi ma /note ne mostra ${righe.length}`,
    );
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

// Verifica che non resti testo italiano su una pagina inglese (ramo
// sito-inglese): è successo — tre etichette dentro un componente
// condiviso, trovate solo da un umano che guardava uno screenshot, non da
// un controllo. Si guarda solo il testo visibile (si tolgono <script> e
// <style>, poi i tag), perché nomi di classe e attributi CSS sono in
// italiano ovunque nel sito, anche nelle pagine inglesi, e non sono un
// difetto: cercare nell'HTML grezzo produrrebbe solo falsi positivi
// (es. class="scrivimi", data-astro-cid-*).
//
// L'elenco è di parole/parole-etichetta che non hanno una lettura inglese
// plausibile (niente "come", "note", "dove", "chi": sono anche parole o
// pezzi di parole inglesi legittimi).
const PAROLE_ITALIANE = [
  "è", "perché", "però", "questo", "questa", "questi", "queste", "cosa",
  "già", "ancora", "sono", "siamo", "vostro", "vostri", "nostro", "nostri",
  "delle", "degli", "nella", "dell",
  "scrivimi", "prenota", "grazie", "iscriviti", "contattami",
  "chiudi", "apri", "cerca", "leggi", "torna", "invia",
  "servizi", "formazione", "ricerca", "lavori",
];
const PAROLE_ITALIANE_SET = new Set(PAROLE_ITALIANE);

function testoVisibile(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

// Gli attributi testuali (task finale, blocco 6): il controllo sopra guardava
// solo il testo visibile, ma titolo e descrizione inglesi sbagliati (task 5)
// vivono in `content` di un <meta>, non fra i tag — lo stesso punto cieco per
// `aria-label`, `placeholder` e `alt`.
function testoAttributi(html) {
  const valori = [...html.matchAll(/\b(?:content|aria-label|placeholder|alt)="([^"]*)"/gi)];
  return valori.map((m) => m[1]).join(" ");
}

// Un blocco marcato `lang="it"` su una pagina inglese è italiano dichiarato,
// non italiano dimenticato: è il caso delle note non ancora tradotte, che
// l'elenco di /en/notes mostra in italiano per scelta del committente. Si
// toglie dal testo esaminato, insieme a tutto il suo sottoalbero, così il
// resto della pagina resta sorvegliato come prima.
//
// La marcatura vale come esenzione solo dentro la pagina. Se a portarla
// fosse <html>, l'intera pagina inglese sarebbe dichiarata italiana e il
// controllo si spegnerebbe da solo restando verde: quello è un difetto, e
// viene segnalato invece che assecondato.
function rimuoviSottoalberiItaliani(html, file) {
  const apertura = /<([a-z][a-z0-9]*)\b[^>]*\blang="it"[^>]*>/i;
  let out = html;
  for (let giri = 0; giri < 500; giri++) {
    const m = apertura.exec(out);
    if (!m) break;
    const tag = m[1].toLowerCase();
    if (tag === "html") {
      dice(`${file} dichiara <html lang="it"> ma sta sotto dist/en/`);
      return out;
    }
    const inizio = m.index;
    const chiusura = new RegExp(`<(/?)${tag}\\b`, "gi");
    chiusura.lastIndex = inizio + m[0].length;
    let profondita = 1;
    let mm;
    while ((mm = chiusura.exec(out))) {
      profondita += mm[1] ? -1 : 1;
      if (profondita === 0) break;
    }
    const fine = mm ? out.indexOf(">", mm.index) + 1 : out.length;
    out = `${out.slice(0, inizio)} ${out.slice(fine)}`;
  }
  return out;
}

function trovaParoleItaliane(html, file) {
  const sorvegliato = rimuoviSottoalberiItaliani(html, file);
  const testo = `${testoVisibile(sorvegliato)} ${testoAttributi(sorvegliato)}`;
  const parole = testo
    .toLowerCase()
    .split(/[^a-zàèéìòù]+/)
    .filter(Boolean);
  return [...new Set(parole.filter((p) => PAROLE_ITALIANE_SET.has(p)))];
}

// Non solo le rotte elencate in ROTTE (che finora lasciava fuori le otto
// pagine /en/work/<slug>, proprio quelle alimentate dai campi condivisi di
// projects.ts — l'unico posto dove l'italiano può passare inosservato):
// tutti i file sotto dist/en/.
if (existsSync("dist/en")) {
  for (const f of trovaHtml("dist/en")) {
    const html = readFileSync(f, "utf8");
    const trovate = trovaParoleItaliane(html, f);
    if (trovate.length > 0) {
      dice(`${f} ha testo italiano rimasto: ${trovate.join(", ")}`);
    }
  }
}

// Richiama scripts/verifica-hreflang.mjs (task 9, sito-inglese): è il
// controllo che «gli hreflang devono puntare a un file che esiste» — lo
// stesso che il task 10 chiedeva di scrivere qui, già fatto lì contro il
// difetto delle diciassette pagine. Non lo si riscrive: lo si richiama, così
// un solo comando (`npm run verifica`, che lancia questo script) dice se il
// sito è a posto, non due script che qualcuno può dimenticare di lanciare.
try {
  const output = execFileSync("node", ["scripts/verifica-hreflang.mjs"], {
    encoding: "utf8",
  });
  process.stdout.write(output);
} catch (e) {
  if (e.stdout) process.stdout.write(e.stdout);
  if (e.stderr) process.stderr.write(e.stderr);
  dice("gli hreflang non sono tutti a posto (dettagli sopra)");
}

console.log(errori === 0 ? "✓ tutte le rotte a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
