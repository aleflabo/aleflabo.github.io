// scripts/verifica-telefono.mjs — due difetti che si vedono solo su un
// telefono vero, e che nessun controllo sul sorgente prende: lo scorrimento
// orizzontale e i bersagli del tocco più bassi di 44px (sotto quella soglia
// il dito manca il link, ed è da lì che arriva la maggior parte di chi legge
// il sito).
//
// Gira FUORI da `npm run verifica`: gli serve un browser vero, e questo
// progetto non lo installa fra le dipendenze — l'`import` è dinamico e
// avvisa se manca, invece di far fallire ogni `npm install` del repo con un
// pacchetto che serve solo a questo script.
//
// Come si lancia (Playwright preso al volo, mai scritto in package.json):
//
//   npm i --no-save playwright && npx playwright install chromium   (una tantum)
//   npm run dev                                                     (in un terminale)
//   node scripts/verifica-telefono.mjs                              (in un altro)
//
// Va bene anche contro una build di produzione: `npm run build && npm run
// preview` al posto di `npm run dev`, e INDIRIZZO se la porta non è 4321.
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Serve Playwright, che questo progetto non ha fra le dipendenze apposta:");
  console.error("  npm i --no-save playwright && npx playwright install chromium");
  process.exit(2);
}

// I tablet sono entrati in lista quando la regola dei 44px è passata da
// `max-width: 640px` a `pointer: coarse`: 768 e 1024 sono esattamente le
// larghezze che prima restavano scoperte, ed è lì che il controllo serve.
const LARGHEZZE = [320, 360, 390, 414, 768, 1024];
const ROTTE = ["/", "/servizi/", "/chi-sono/", "/en/"];
const INDIRIZZO = process.env.INDIRIZZO ?? "http://localhost:4321";

let errori = 0;
let esentiTotali = 0;
const dice = (m) => { console.error("✗ " + m); errori++; };

const browser = await chromium.launch();
for (const rotta of ROTTE) {
  for (const larghezza of LARGHEZZE) {
    // `hasTouch` non è un dettaglio: senza, Chromium dichiara `pointer: fine`
    // e le tre regole dei 44px — `global.css`, `Nav.astro`, `Footer.astro` —
    // non si applicano affatto. Lo script misurerebbe una pagina che nessun
    // telefono vede mai, e i suoi numeri sarebbero falsi in entrambi i versi.
    // Finché la condizione era `max-width: 640px` la cosa non si notava.
    const pagina = await browser.newPage({
      viewport: { width: larghezza, height: 844 },
      hasTouch: true,
      isMobile: larghezza < 720,
    });
    await pagina.goto(INDIRIZZO + rotta, { waitUntil: "load" });
    const esito = await pagina.evaluate(() => ({
      largo: document.documentElement.scrollWidth,
      visibile: document.documentElement.clientWidth,
      // Il piè di pagina è incluso di proposito: i suoi bersagli sotto i
      // 44px erano un difetto reale, e nasconderli qui vorrebbe dire far
      // dire al controllo una cosa falsa. Adesso `Footer.astro` li copre.
      piccoli: [...document.querySelectorAll("main a, main button, nav a, footer a")]
        .filter((e) => e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44)
        // L'unica esenzione, e non è una maglia allargata per far passare il
        // controllo: WCAG 2.5.8 esenta i link «in linea», quelli dentro un
        // blocco di testo, dove il tocco è preciso quanto la lettura. È la
        // stessa esenzione che `global.css` già scrive nel prodotto, con la
        // stessa motivazione e — di proposito — con lo stesso identico
        // selettore, `main p a`: se un giorno una delle due cambia forma,
        // l'altra deve cambiare con lei. Sono esattamente due link su tutto
        // il sito: «Procedo» in .credibilita e il rimando inglese di 404.
        // Contati e stampati qui sotto, non fatti sparire.
        .filter((e) => !e.matches("main p a"))
        .map((e) => {
          const zona = e.closest("footer") ? "piè di pagina" : e.closest("nav") ? "nav" : "main";
          return `${zona}: ${(e.textContent || "").trim().slice(0, 40)}`;
        }),
      esenti: [...document.querySelectorAll("main p a")].filter(
        (e) => e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44,
      ).length,
    }));
    if (esito.largo > esito.visibile) {
      dice(`${rotta} a ${larghezza}px scorre in orizzontale (${esito.largo} contro ${esito.visibile})`);
    }
    if (esito.piccoli.length) {
      dice(`${rotta} a ${larghezza}px ha ${esito.piccoli.length} bersagli sotto i 44px: ${esito.piccoli.slice(0, 5).join(" · ")}`);
    }
    if (esito.esenti) {
      esentiTotali += esito.esenti;
    }
    await pagina.close();
  }
}
await browser.close();
console.log(
  `${esentiTotali} link in linea dentro un paragrafo, esenti per WCAG 2.5.8 e non contati`,
);
console.log(errori === 0 ? "✓ telefono a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
