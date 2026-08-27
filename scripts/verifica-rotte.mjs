import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";
import { SITE } from "./sito.mjs";
import { COPPIE } from "../src/data/coppie.mjs";

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

// Nessuna pagina deve nominare un dominio del sito diverso da quello
// configurato. Prima qui c'era il nome «flaborea.com» scritto a mano, perché
// il dominio non esisteva ancora e comparire in pagina era un difetto: dal
// giorno dell'acquisto quella regola si è capovolta. Ora il confronto è con
// `site` di astro.config.mjs, così la verifica segue il sito invece di
// ripeterne il valore.
const DOMINI_DEL_SITO = ["flaborea.com", "aleflabo.github.io"];
function dominioEstraneo(html) {
  return DOMINI_DEL_SITO.some((d) => !SITE.includes(d) && html.includes(`//${d}`));
}

// Verifica rotte
for (const r of ROTTE) {
  const f = r === "index" ? "dist/index.html" : `dist/${r}/index.html`;
  if (!existsSync(f)) { dice(`manca la rotta /${r === "index" ? "" : r}`); continue; }
  const html = readFileSync(f, "utf8");
  if (dominioEstraneo(html)) dice(`${f} nomina un dominio diverso da ${SITE}`);
  if (r !== "en" && /hreflang="it" href="[^"]*\/it\//.test(html)) dice(`${f} punta ancora a /it/`);
}

// I segnaposto non devono finire in pagina. `[EMAIL]` nelle informative è il
// caso vivo: un'informativa che non dice a chi scrivere non permette di
// esercitare i diritti che elenca, e il difetto si legge solo aprendo la
// pagina. Stesso trattamento per «[DA INSERIRE]», che è stato pubblicato per
// giorni nel piè di pagina di tutte e trentacinque le pagine senza che niente
// lo segnalasse.
for (const f of trovaHtml("dist")) {
  const html = readFileSync(f, "utf8");
  for (const segnaposto of ["[EMAIL]", "[DA INSERIRE]", "[TODO]"]) {
    if (html.includes(segnaposto)) {
      dice(`${f} contiene il segnaposto ${segnaposto}`);
    }
  }
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

// Il file CNAME deve esserci e dire il dominio configurato. Finché il
// dominio non era comprato questo controllo diceva l'opposto — segnalava il
// CNAME come un errore. Adesso è il contrario che è un errore: senza quel
// file la GitHub Action ripubblica dist/ da zero e il dominio impostato nelle
// impostazioni del repository sparisce al primo deploy, riportando il sito su
// aleflabo.github.io senza che niente lo segnali.
const atteso = SITE.replace(/^https?:\/\//, "");
if (!existsSync("dist/CNAME")) {
  dice(`manca dist/CNAME: senza, il prossimo deploy perde ${atteso}`);
} else {
  const cname = readFileSync("dist/CNAME", "utf8").trim();
  if (cname !== atteso) dice(`dist/CNAME dice «${cname}», ma il sito è ${atteso}`);
}

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

// ---------------------------------------------------------------------------
// Controlli nati dall'audit SEO/GEO del 27 agosto 2026. Tutti e quattro
// riguardano difetti che il sito ha avuto davvero in produzione e che nessuna
// revisione aveva colto, perché non si vedono aprendo una pagina.
// ---------------------------------------------------------------------------

// 1. La barra finale. GitHub Pages serve `/servizi/` e risponde 301 a
// `/servizi`. Finché `localizedPath` la ometteva, il sito dichiarava tre
// indirizzi diversi per la stessa pagina — quello servito, il canonico e
// quello della sitemap — e tutti e 712 i collegamenti interni passavano da un
// redirect. Qui si controlla che nessun href interno e nessun canonico la
// perda di nuovo.
const ESTENSIONI_FILE = /\.(css|js|mjs|svg|png|jpe?g|webp|avif|ico|xml|pdf|txt|json|woff2?)$/i;

// Le pagine di rimbalzo che Astro genera per `redirects` non sono pagine: un
// `<meta http-equiv="refresh">`, un `noindex` e un canonico che punta ALTROVE
// per definizione. Vanno saltate da tutti i controlli che seguono, altrimenti
// ognuna produce tre segnalazioni per un comportamento corretto.
function eUnRimbalzo(html) {
  return /http-equiv="refresh"/i.test(html) && /name="robots" content="noindex"/i.test(html);
}
function rottaSenzaBarra(href) {
  const [percorso] = href.split("#");
  if (percorso === "" || percorso === "/") return false;
  if (ESTENSIONI_FILE.test(percorso)) return false; // è un file, non una rotta
  return !percorso.endsWith("/");
}

if (existsSync("dist")) {
  for (const file of trovaHtml("dist")) {
    const html = readFileSync(file, "utf8");
    if (eUnRimbalzo(html)) continue;

    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      if (href.startsWith("//")) continue; // esterno senza schema
      if (rottaSenzaBarra(href)) {
        dice(`${file}: collegamento interno senza barra finale verso ${href} (risponde 301)`);
      }
    }

    const canonico = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (canonico) {
      const percorso = canonico[1].slice(SITE.length);
      if (rottaSenzaBarra(percorso)) {
        dice(`${file}: il canonico ${canonico[1]} risponde 301 (manca la barra finale)`);
      }
      // Il canonico deve dire l'indirizzo di QUESTA pagina, non di un'altra:
      // dist/servizi/index.html → /servizi/.
      const atteso = "/" + relative("dist", file).replace(/index\.html$/, "").replace(/\\/g, "/");
      const attesoPulito = atteso === "/404.html" ? null : atteso;
      if (attesoPulito && percorso !== attesoPulito) {
        dice(`${file}: il canonico dice ${percorso} ma la pagina sta in ${attesoPulito}`);
      }
    }
  }
}

// 2. Il `robots.txt` deve indicare la sitemap sul dominio configurato. Per due
// settimane, dopo il passaggio a flaborea.com, ha continuato a indicarla su
// aleflabo.github.io: alcuni crawler scartano una direttiva `Sitemap` che
// punta fuori dal dominio del `robots.txt` che stanno leggendo.
if (!existsSync("dist/robots.txt")) {
  dice("manca dist/robots.txt");
} else {
  const robots = readFileSync("dist/robots.txt", "utf8");
  const riga = robots.match(/^Sitemap:\s*(\S+)/m);
  if (!riga) dice("dist/robots.txt non dichiara nessuna Sitemap");
  else if (!riga[1].startsWith(SITE)) {
    dice(`dist/robots.txt indica la sitemap su ${riga[1]}, ma il sito è ${SITE}`);
  }
}

// 3. Gli `hreflang` del costruito e le coppie di src/data/coppie.mjs devono
// dire la stessa cosa. La sitemap legge quel file, le pagine leggono le props
// `pathEn`/`pathIt`: senza questo confronto le due verità possono divergere
// senza che niente lo segnali — ed è esattamente com'è nato il difetto per cui
// la sitemap dichiarava alternati su quattro URL su trentotto.
{
  const attese = new Set(COPPIE.map(([it, en]) => `${it} ${en}`));
  const trovate = new Set();
  for (const file of existsSync("dist") ? trovaHtml("dist") : []) {
    const html = readFileSync(file, "utf8");
    if (eUnRimbalzo(html)) continue;
    const link = [...html.matchAll(/hreflang="(it|en)" href="([^"]+)"/g)];
    const it = link.find(([, l]) => l === "it")?.[2];
    const en = link.find(([, l]) => l === "en")?.[2];
    if (!it || !en) continue;
    const coppia = `${it.slice(SITE.length)} ${en.slice(SITE.length)}`;
    trovate.add(coppia);
    if (!attese.has(coppia)) {
      dice(`${file}: dichiara la coppia ${coppia}, che non sta in src/data/coppie.mjs`);
    }
  }
  for (const attesa of attese) {
    if (!trovate.has(attesa)) {
      dice(`src/data/coppie.mjs dichiara la coppia ${attesa}, che nessuna pagina costruita conferma`);
    }
  }
}

// 4. La `meta description`. Google ne mostra circa 160 caratteri: /chi-sono ne
// dichiarava 375 (il primo paragrafo della biografia copiato di peso) e
// /lavori/procedo 305, tagliata prima di «co-fondatore e CTO», che è il pezzo
// che conta. `descrizioneMeta` in src/lib/ le riporta dentro tagliando per
// frasi intere; questo controlla che il risultato ci sia davvero.
const MAX_DESCRIZIONE = 175;
const MIN_DESCRIZIONE = 50;
for (const file of existsSync("dist") ? trovaHtml("dist") : []) {
  const html = readFileSync(file, "utf8");
  if (eUnRimbalzo(html)) continue;
  const d = html.match(/<meta name="description" content="([^"]*)"/);
  if (!d) {
    dice(`${file}: nessuna meta description`);
    continue;
  }
  const lunghezza = d[1].length;
  if (lunghezza > MAX_DESCRIZIONE) {
    dice(`${file}: meta description di ${lunghezza} caratteri (massimo ${MAX_DESCRIZIONE})`);
  }
  // La 404 risponde 404 e non finisce in nessun indice: il pavimento non la
  // riguarda. Il tetto sì, perché costa nulla e la tiene in riga.
  if (file.endsWith("404.html")) continue;
  if (lunghezza < MIN_DESCRIZIONE) {
    dice(`${file}: meta description di soli ${lunghezza} caratteri (minimo ${MIN_DESCRIZIONE})`);
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
