# Il sistema visivo, alla lettera

## Token

| Nome | Valore | A cosa serve |
|---|---|---|
| fondo | `#faf8f4` | la crema di tutte le pagine |
| superficie | `#ffffff` | schede e fasce chiare |
| fondo tenue | `#f4efe7` | piè di pagina, righe elenco al passaggio del mouse |
| testo | `#141414` | |
| testo tenue | `#55504a` | |
| bordo | `#e6ddd0` | filetti e contorni delle schede |
| struttura | `#1b3a5b` | fasce piene, riquadri importanti, colore dei link |
| azione | `#a8531d` | pulsanti, occhielli, filetti, hover dei link |
| evidenziatore | `#f0c9a4` | la banda sotto «dove serve» |
| su fondo blu | `#a8c0d6` `#cdd9e6` `#6d8aa8` | testo tenue, corpo, contorni |
| segnaposto | `#efece7` su `#b9b1a4` tratteggiato | riquadri della foto e dei fotogrammi |
| larghezza colonna | `1120px` | |
| raggio | `4px` (schede `6px`) | |

Caratteri: **Fraunces** 600 per i titoli (`letter-spacing: -0.015em`, `line-height: 1.04-1.05`),
**Inter** per tutto il resto (`line-height` 1.6-1.7).
Occhielli: `11.5px`, `letter-spacing: 0.2-0.22em`, maiuscolo, peso 700, colore azione.

## Il foglio di stile condiviso, da portare in `global.css`

Sono regole su tipi di elemento, non classi: valgono anche per le pagine scritte dopo.

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: "Inter", -apple-system, sans-serif; background: #faf8f4; color: #141414; }
    a { color: #1b3a5b; text-decoration: none; transition: color .2s; }
    a:hover { color: #a8531d; }
    p, span, li, div, label, input, textarea { font-family: "Inter", -apple-system, sans-serif; }
    h1, h2, h3 { font-family: "Fraunces", Georgia, serif; font-weight: 600; letter-spacing: -0.015em; line-height: 1.05; }

    @keyframes sali { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
    @keyframes tira { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    @keyframes evidenzia { from { background-size: 0% 100%; } to { background-size: 100% 100%; } }

    x-dc > div > div { animation: sali .7s cubic-bezier(.22,.8,.3,1) both; }
    x-dc > div > div:nth-child(1) { animation-delay: .02s }
    x-dc > div > div:nth-child(2) { animation-delay: .1s }
    x-dc > div > div:nth-child(3) { animation-delay: .18s }
    x-dc > div > div:nth-child(4) { animation-delay: .26s }
    x-dc > div > div:nth-child(n+5) { animation-delay: .32s }

    div[style*="width: 88px"][style*="height: 3px"] { transform-origin: left; animation: tira .8s cubic-bezier(.22,.8,.3,1) .4s both; }

    div[style*="background: #ffffff"][style*="border: 1px solid"] { transition: transform .3s cubic-bezier(.22,.8,.3,1), box-shadow .3s; }
    div[style*="background: #ffffff"][style*="border: 1px solid"]:hover { transform: translateY(-5px); box-shadow: 0 14px 32px rgba(40,24,10,.10); }

    a[style*="display: grid"] { transition: background .25s, padding-left .25s; border-radius: 4px; }
    a[style*="display: grid"]:hover { background: #f4efe7; padding-left: 14px; }

    a[style*="border-radius: 4px"][style*="font-weight: 600"] { transition: transform .2s, box-shadow .2s; }
    a[style*="border-radius: 4px"][style*="font-weight: 600"]:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(168,83,29,.28); }


    @keyframes parola { from { opacity: 0; transform: translateY(16px); filter: blur(7px); } to { opacity: 1; transform: none; filter: blur(0); } }
    .w { display: inline-block; animation: parola .62s cubic-bezier(.22,.8,.3,1) both; }
    .w:nth-child(1){animation-delay:.22s} .w:nth-child(2){animation-delay:.28s} .w:nth-child(3){animation-delay:.34s}
    .w:nth-child(4){animation-delay:.40s} .w:nth-child(5){animation-delay:.46s} .w:nth-child(6){animation-delay:.52s}
    .w:nth-child(7){animation-delay:.58s} .w:nth-child(8){animation-delay:.64s} .w:nth-child(9){animation-delay:.70s}
    .w:nth-child(10){animation-delay:.76s} .w:nth-child(11){animation-delay:.82s} .w:nth-child(12){animation-delay:.88s}
    .w:nth-child(13){animation-delay:.94s} .w:nth-child(14){animation-delay:1s}

                        @keyframes respira { 0%,100% { opacity: .5; transform: scale(1) } 50% { opacity: .85; transform: scale(1.05) } }
    .alone { animation: respira 9s ease-in-out infinite; }
    .freccia { display: inline-block; transition: transform .22s; }
    a:hover .freccia { transform: translateX(5px); }
    .marker { background-image: linear-gradient(to top, #f0c9a4 0 16px, transparent 16px); background-size: 0% 100%; background-repeat: no-repeat; animation: evidenzia .85s cubic-bezier(.22,.8,.3,1) .8s both; }
```

## Note

- `x-dc > div > div` diventa il selettore delle fasce di pagina nella struttura Astro
  (i figli diretti del contenitore di pagina).
- Le regole con `[style*="..."]` sono un espediente del mockup: in Astro diventano classi
  vere (`.scheda`, `.riga`, `.pulsante`, `.filetto`).
- L'evidenziatore usa `background-size` e non `::after` con `z-index: -1`: la seconda forma
  finisce dietro allo sfondo della pagina.
