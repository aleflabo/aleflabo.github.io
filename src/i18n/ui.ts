export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

/**
 * Prefissa un percorso con la lingua (l'italiano è senza prefisso) e chiude
 * sempre con la barra.
 *
 * La barra finale non è un dettaglio di stile: GitHub Pages serve
 * `/servizi/` e risponde 301 a `/servizi`. Finché questa funzione la
 * ometteva, il sito dichiarava tre indirizzi diversi per la stessa pagina —
 * quello servito (con la barra), il `rel="canonical"` e gli `hreflang` di
 * BaseLayout (senza), e quello della sitemap (con) — e tutti e 712 i
 * collegamenti interni passavano da un redirect. Da qui esce l'unica forma
 * buona, e canonico, alternati, `og:url` e menu la seguono insieme.
 *
 * I file statici (`/rss.xml`, `/favicon.svg`) non passano di qui: sono file,
 * non rotte, e la barra li romperebbe.
 */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const conLingua = locale === "it" ? clean : `/en${clean === "/" ? "" : clean}`;
  const [rotta, frammento] = conLingua.split("#");
  const chiusa = rotta.endsWith("/") ? rotta : `${rotta}/`;
  return frammento === undefined ? chiusa : `${chiusa}#${frammento}`;
}
