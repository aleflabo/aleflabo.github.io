/**
 * Porta una `meta description` dentro la finestra utile in SERP senza
 * riscriverla.
 *
 * Quattro pagine la sfondavano: /chi-sono con 375 caratteri (il primo
 * paragrafo della biografia copiato di peso), /lavori/procedo con 305,
 * /ricerca con 260 e /en/research con 243. Google ne mostra circa 160, e
 * tagliava a metà frase — su /lavori/procedo proprio prima di
 * «co-fondatore e CTO», che è il pezzo che conta.
 *
 * Il taglio avviene per frasi intere, mai a metà parola: il testo che resta
 * è testo approvato, solo più corto. È l'unico modo di rientrare senza
 * violare la regola 2 del CLAUDE.md — il copy non si inventa; se non c'è, si
 * accorcia la struttura.
 */

// Sopra questa soglia si interviene. Fra 160 e 175 caratteri il taglio che
// farebbe Google è di poche parole, e non vale la pena toccare il testo.
const SOGLIA = 175;
// La lunghezza a cui si riporta il testo quando si interviene.
const LIMITE = 160;
// Il pavimento. Senza, `/servizi` — 170 caratteri, prima frase «Si parte dal
// primo.» — si riduceva a venti caratteri: una descrizione peggiore di quella
// troppo lunga. Sotto questa soglia il taglio per frasi si scarta e si va a
// troncamento dichiarato.
const MINIMO = 110;

/**
 * Divide un testo in frasi. Il punto conta come fine frase solo quando è
 * seguito da spazio e maiuscola: così «S.p.A.» e «vol. 156» non spezzano
 * nulla, mentre «…fermo. Poi Roma:» sì.
 */
export function frasi(testo: string): string[] {
  const pezzi: string[] = [];
  let corrente = "";
  for (let i = 0; i < testo.length; i++) {
    corrente += testo[i];
    if (![".", "!", "?"].includes(testo[i])) continue;
    const dopo = testo.slice(i + 1);
    // Fine del testo, oppure spazio seguito da una maiuscola o da una
    // virgoletta di apertura.
    if (dopo === "" || /^\s+["«“(]?[A-ZÀÈÉÌÒÙ]/.test(dopo)) {
      // Una sigla puntata («S.p.A.», «U.S.A.»): la lettera prima del punto è
      // maiuscola e quella prima ancora è un punto o l'inizio.
      const precedente = corrente.slice(-3);
      if (/(^|\.)[A-ZÀÈÉÌÒÙ]\.$/.test(precedente)) continue;
      pezzi.push(corrente.trim());
      corrente = "";
    }
  }
  if (corrente.trim()) pezzi.push(corrente.trim());
  return pezzi;
}

/**
 * Il testo intero se sta nel limite; altrimenti quante frasi intere ci
 * stanno, almeno una. Se anche la prima frase da sola sfonda il limite si
 * taglia all'ultima parola intera e si chiude con i puntini: meglio un
 * troncamento dichiarato che uno fatto da Google a metà parola.
 */
export function descrizioneMeta(
  testo: string,
  limite: number = LIMITE,
  soglia: number = SOGLIA,
  minimo: number = MINIMO,
): string {
  const pulito = testo.trim();
  if (pulito.length <= soglia) return pulito;

  const pezzi = frasi(pulito);
  let out = "";
  for (const frase of pezzi) {
    const candidato = out ? `${out} ${frase}` : frase;
    if (candidato.length > limite) break;
    out = candidato;
  }
  if (out.length >= minimo) return out;

  const tagliato = pulito.slice(0, limite - 1);
  const ultimoSpazio = tagliato.lastIndexOf(" ");
  return `${tagliato.slice(0, ultimoSpazio > 0 ? ultimoSpazio : tagliato.length).replace(/[,;:]$/, "")}…`;
}
