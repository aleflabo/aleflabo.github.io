export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

/** Prefissa un percorso con la lingua (l'italiano è senza prefisso). */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "it" ? clean : `/en${clean === "/" ? "" : clean}`;
}
