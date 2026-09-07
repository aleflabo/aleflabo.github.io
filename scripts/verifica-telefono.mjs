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

const LARGHEZZE = [320, 360, 390, 414];
const ROTTE = ["/", "/servizi/", "/chi-sono/", "/en/"];
const INDIRIZZO = process.env.INDIRIZZO ?? "http://localhost:4321";

let errori = 0;
const dice = (m) => { console.error("✗ " + m); errori++; };

const browser = await chromium.launch();
for (const rotta of ROTTE) {
  for (const larghezza of LARGHEZZE) {
    const pagina = await browser.newPage({ viewport: { width: larghezza, height: 844 } });
    await pagina.goto(INDIRIZZO + rotta, { waitUntil: "load" });
    const esito = await pagina.evaluate(() => ({
      largo: document.documentElement.scrollWidth,
      visibile: document.documentElement.clientWidth,
      // Il piè di pagina è incluso di proposito: i suoi bersagli sotto i
      // 44px sono un difetto reale e noto (task 13, non questo ramo), e
      // nasconderli qui vorrebbe dire far dire al controllo una cosa falsa.
      piccoli: [...document.querySelectorAll("main a, main button, nav a, footer a")]
        .filter((e) => e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 44)
        .map((e) => {
          const zona = e.closest("footer") ? "piè di pagina" : e.closest("nav") ? "nav" : "main";
          return `${zona}: ${(e.textContent || "").trim().slice(0, 40)}`;
        }),
    }));
    if (esito.largo > esito.visibile) {
      dice(`${rotta} a ${larghezza}px scorre in orizzontale (${esito.largo} contro ${esito.visibile})`);
    }
    if (esito.piccoli.length) {
      dice(`${rotta} a ${larghezza}px ha ${esito.piccoli.length} bersagli sotto i 44px: ${esito.piccoli.slice(0, 5).join(" · ")}`);
    }
    await pagina.close();
  }
}
await browser.close();
console.log(errori === 0 ? "✓ telefono a posto" : `${errori} problemi`);
process.exit(errori === 0 ? 0 : 1);
