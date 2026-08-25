import type { ChiSonoCopy } from "../chiSono";

// Sezione /en/about. `testi-en.md` marca due versioni possibili della
// biografia: i cinque paragrafi [RIUSATO] di `site.ts` → `en.about.body`
// (scritti al presente, ruolo Procedo ancora in corso) e i cinque paragrafi
// [TRADOTTO] dall'italiano approvato di `chiSono.ts` (ruolo Procedo concluso
// a metà 2026). Il documento segnala esplicitamente che le due versioni si
// contraddicono e lascia la scelta a chi implementa (task-3-report.md).
// Qui uso la versione [TRADOTTO]: è quella coerente con il resto del sito
// inglese già tradotto in questo task (`home.ts` scrive «Co-founder and CTO
// of Procedo from 2024 to 2026», al passato), mentre la versione riusata al
// presente la contraddirebbe. Nessun testo è stato inventato: entrambe le
// versioni sono verbatim in `testi-en.md`, ho scelto quale delle due usare.
export const chiSono: ChiSonoCopy = {
  paragrafi: [
    "I started in Udine, with a degree in computer science and six months in Sweden that took away any idea of staying put. Then Rome: a master's in data science and a PhD at Sapienza's Perception and Intelligence Lab, where I spent three years on a problem that can be summed up like this — teaching a computer to watch somebody working and understand what they're doing.",
    "In the middle, a winter in Amsterdam working on a geometry different from the one we're used to, and four years in the classroom as a teaching assistant, which is where I found out that explaining something difficult to somebody who doesn't know it is a trade of its own.",
    "That research then became a product. I co-founded Procedo and was its CTO for two years: video shot on the shop floor turning into written procedures, inside real companies, with customers who paid and complained when something didn't work. That's where I learned the part you don't learn at university, which is how much of what you write in a paper survives contact with a factory floor.",
    "I left the operational role in mid-2026 and today I work on my own. The reason is simple: I like the part where you walk into a company you don't know, look at how it works and see where the time goes. In a company that's growing, that part keeps getting smaller.",
    "I still write code every day and publish what I learn. If you call me, the person who comes to your company and the person who then builds it are the same one.",
  ],
  inBreve: [
    "PhD in computer vision, Sapienza",
    "Ten published papers, the code for every one that could be opened",
    "Two years as CTO of an industrial startup",
    "Four years of teaching at university",
  ],
  abitudini: [
    {
      titolo: "I start with the hard part",
      testo: "In projects I take on first the thing that might not work. It costs a few extra weeks at the start and saves months when the answer is no.",
    },
    {
      titolo: "I write everything down",
      testo: "Every technical decision ends up in a document that somebody who doesn't program can read too. It's there for you if one day the work passes to somebody else.",
    },
    {
      titolo: "I say when it's better to stop",
      testo: "Sometimes the right thing to do is smaller than what was asked for, or shouldn't be done at all. I'd rather lose a project than deliver a useless one.",
    },
  ],
};
