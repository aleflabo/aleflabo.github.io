import { describe, expect, it } from "vitest";
import {
  attivita,
  briciole,
  faq,
  idAttivita,
  idPersona,
  persona,
  pubblicazioniLd,
  sitoWeb,
} from "./datiStrutturati";

const SITE = "https://flaborea.com";

describe("persona", () => {
  it("dà all'entità un @id stabile sul dominio", () => {
    expect(persona({ site: SITE, lang: "it" })["@id"]).toBe("https://flaborea.com/#persona");
  });

  // Il dominio arrivava scritto a mano nel layout: al passaggio a
  // flaborea.com i dati strutturati avrebbero continuato a dichiarare il
  // vecchio indirizzo. Ora tutto si costruisce da `site`.
  it("costruisce ogni URL dal dominio ricevuto", () => {
    const p = persona({ site: "https://esempio.test", lang: "it" });
    expect(p.url).toBe("https://esempio.test/");
    expect(p["@id"]).toBe("https://esempio.test/#persona");
  });

  it("colloca la persona a Venezia, in Veneto", () => {
    const p = persona({ site: SITE, lang: "it" });
    expect(p.address.addressLocality).toBe("Venezia");
    expect(p.address.addressRegion).toBe("Veneto");
    expect(p.address.addressCountry).toBe("IT");
  });

  it("dice la città in inglese sulla pagina inglese", () => {
    expect(persona({ site: SITE, lang: "en" }).address.addressLocality).toBe("Venice");
  });

  // `image` e `email` sono opzionali perché non ogni pagina li ha sotto mano;
  // quando mancano il campo non deve comparire vuoto.
  it("omette immagine e posta quando non arrivano", () => {
    const p = persona({ site: SITE, lang: "it" });
    expect(p).not.toHaveProperty("image");
    expect(p).not.toHaveProperty("email");
  });

  it("mette la posta in forma di mailto", () => {
    const p = persona({ site: SITE, lang: "it", email: "a@b.it", immagine: `${SITE}/ritratto.webp` });
    expect(p.email).toBe("mailto:a@b.it");
    expect(p.image).toBe("https://flaborea.com/ritratto.webp");
  });
});

describe("attivita", () => {
  it("dichiara le aree servite, di persona e da remoto", () => {
    const nomi = attivita({ site: SITE, lang: "it", servizi: [] }).areaServed.map((a) => a.name);
    expect(nomi).toEqual(["Veneto", "Friuli-Venezia Giulia", "Italia"]);
  });

  it("traduce le aree sulla pagina inglese", () => {
    const nomi = attivita({ site: SITE, lang: "en", servizi: [] }).areaServed.map((a) => a.name);
    expect(nomi).toContain("Italy");
    expect(nomi).not.toContain("Italia");
  });

  // Il fornitore è un riferimento all'`@id` di Person, non una seconda copia
  // dei suoi campi: è la ragione per cui gli `@id` esistono.
  it("rimanda alla persona invece di ripeterla", () => {
    const a = attivita({ site: SITE, lang: "it", servizi: [] });
    expect(a.provider).toEqual({ "@id": idPersona(SITE) });
    expect(a["@id"]).toBe(idAttivita(SITE));
  });

  it("porta i servizi nel catalogo delle offerte", () => {
    const a = attivita({
      site: SITE,
      lang: "it",
      servizi: [{ nome: "Mezza giornata diagnostica", descrizione: "Mezza giornata in azienda." }],
    });
    expect(a.hasOfferCatalog.itemListElement).toHaveLength(1);
    expect(a.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe("Mezza giornata diagnostica");
  });
});

describe("faq", () => {
  it("rende ogni domanda una Question con la sua risposta", () => {
    const f = faq([{ domanda: "Quanto costa?", risposta: "Dipende dal lavoro." }]);
    expect(f["@type"]).toBe("FAQPage");
    expect(f.mainEntity[0].name).toBe("Quanto costa?");
    expect(f.mainEntity[0].acceptedAnswer.text).toBe("Dipende dal lavoro.");
  });
});

describe("pubblicazioniLd", () => {
  const elenco = [
    { titolo: "PREGO", anno: "2024", sede: "CVPR", url: "https://arxiv.org/abs/2404.01933" },
    { titolo: "Senza arXiv", anno: "2023", sede: "Pattern Recognition" },
  ];

  it("numera le voci a partire da uno", () => {
    const l = pubblicazioniLd(SITE, elenco);
    expect(l.itemListElement.map((v) => v.position)).toEqual([1, 2]);
  });

  it("porta l'arXiv in url e sameAs quando c'è", () => {
    const primo = pubblicazioniLd(SITE, elenco).itemListElement[0].item;
    expect(primo.sameAs).toBe("https://arxiv.org/abs/2404.01933");
    expect(primo["@type"]).toBe("ScholarlyArticle");
  });

  // Metà delle dieci pubblicazioni non ha un arXiv nel CV, che è la fonte
  // autorevole. Restano dichiarate lo stesso: inventare un identificatore
  // sarebbe peggio che ometterlo.
  it("dichiara anche le voci senza URL", () => {
    const secondo = pubblicazioniLd(SITE, elenco).itemListElement[1].item;
    expect(secondo).not.toHaveProperty("sameAs");
    expect(secondo.headline).toBe("Senza arXiv");
  });
});

describe("briciole", () => {
  it("rende assoluti i percorsi ricevuti", () => {
    const b = briciole(SITE, [
      { nome: "Home", percorso: "/" },
      { nome: "Lavori", percorso: "/lavori/" },
    ]);
    expect(b.itemListElement[1].item).toBe("https://flaborea.com/lavori/");
    expect(b.itemListElement[1].position).toBe(2);
  });
});

describe("sitoWeb", () => {
  it("dichiara la lingua della pagina e rimanda alla persona", () => {
    const s = sitoWeb({ site: SITE, lang: "en" });
    expect(s.inLanguage).toBe("en");
    expect(s.publisher).toEqual({ "@id": idPersona(SITE) });
  });
});
