/**
 * La posa disegnata sopra il ritratto della home.
 *
 * I punti sono calcolati da un modello, mai messi a mano: nel mockup lo erano,
 * e il committente se n'è accorto al primo sguardo. Il 2026-11-08 sono stati
 * ricavati con Keypoint R-CNN di torchvision (`keypointrcnn_resnet50_fpn`, pesi
 * COCO) su `src/assets/alessandro-flaborea.jpg` ridotta a 640×800. Persona con
 * confidenza 1,00. Restano gli undici punti COCO visibili; anche, ginocchia e
 * caviglie sono fuori dall'inquadratura e il modello li dà con confidenza
 * negativa. L'uscita grezza sta in
 * `docs/superpowers/specs/2026-11-08-redesign-laboratorio/posa.json`.
 *
 * Se cambiano la foto o il suo ritaglio, questi numeri si ricalcolano.
 */
export interface Posa {
  quadro: { larghezza: 640; altezza: 800 };
  /** Nell'ordine: naso, occhio sx, occhio dx, orecchio sx, orecchio dx,
   *  spalla sx, spalla dx, gomito sx, gomito dx, polso sx, polso dx. */
  punti: [number, number][];
  /** Coppie di indici in `punti`, lo scheletro COCO ristretto ai punti visibili. */
  ossa: [number, number][];
}

export const posa: Posa = {
  quadro: { larghezza: 640, altezza: 800 },
  punti: [
    [314, 257], [342, 221], [280, 216], [371, 237], [218, 235],
    [465, 442], [121, 461], [551, 670], [137, 692], [266, 654], [438, 652],
  ],
  ossa: [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6],
    [5, 6], [5, 7], [6, 8], [7, 9], [8, 10],
  ],
};
