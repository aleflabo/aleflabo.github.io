import { emailContatto, type PaginaLegale } from '../legale';

// Privacy and cookie pages, English. Traduzione della gemella italiana:
// stessi fatti, stessa struttura. Se cambia una delle due deve cambiare
// l'altra — sono la stessa dichiarazione in due lingue, e una divergenza qui
// non è una sfumatura di tono, è una promessa diversa fatta a persone diverse.
export const privacy: PaginaLegale = {
  occhiello: 'Privacy',
  titolo: 'What happens to your data on this site',
  introduzione:
    "The short version: this site doesn't watch you. There are no analytics, no cookies, and nothing is loaded from third-party servers. Below is the long version, with the names of things.",
  aggiornamento: 'Last updated: 26 August 2026.',
  sezioni: [
    {
      titolo: 'Who processes the data',
      paragrafi: [
        `The data controller is Alessandro Flaborea. For any question about this page, or to exercise the rights listed below, write to ${emailContatto}.`,
      ],
    },
    {
      titolo: 'What the site collects when you visit',
      paragrafi: [
        "Nothing that reaches me. The pages are static files: no program runs on the server, there is no store where visits get written down, and I use neither Google Analytics nor any other measurement tool.",
        "The site is published on GitHub Pages. Like any service that delivers web pages, GitHub records the technical details of the connection — IP address, browser type, page requested — to run the service and protect it from abuse. Those logs stay with GitHub and I have no access to them. Their privacy notice describes that processing.",
      ],
    },
    {
      titolo: 'What your browser keeps',
      paragrafi: [
        "One thing. If you pick a language with the switch at the top, the site remembers it in a `localStorage` entry called `lang-chosen`. It exists so you aren't sent back to your browser's language every time after choosing the other one.",
        'It stays in your browser, is never sent anywhere and identifies no one. Clearing the site data in your browser settings removes it.',
      ],
    },
    {
      titolo: 'If you write to me',
      paragrafi: [
        "The contact form isn't connected to any service yet: nothing leaves and nothing arrives. When I connect it, this page will say so before the form works, not after.",
        "If you message me on WhatsApp using the button on the site, the conversation happens inside WhatsApp and WhatsApp Ireland Limited's notice applies. I keep those messages for as long as it takes to answer you and to carry out any work we do together.",
      ],
    },
    {
      titolo: 'The notes',
      paragrafi: [
        "The text of the notes is written in Sanity and fetched while the site is being built, not while you read: your browser never talks to Sanity. Any images inside a note, on the other hand, are served from their delivery network, so your browser requests that file from their server and at that moment their server sees the request's IP address.",
      ],
    },
    {
      titolo: 'For how long',
      paragrafi: [
        "I keep no data collected by the site, because the site collects none. What you send me directly — a message, an attachment — I keep for as long as it takes to answer you or to work together, and then I delete it.",
      ],
    },
    {
      titolo: 'Your rights',
      paragrafi: [
        `European Regulation 2016/679 gives you the right to ask what data of yours I hold, to correct it, to have it deleted, to restrict its use, to object to the processing and to receive it in a machine-readable format. Ask by writing to ${emailContatto}, and I answer within a month.`,
        'If you believe I am handling your data improperly, you can complain to the Italian data protection authority, the Garante per la protezione dei dati personali (garanteprivacy.it).',
      ],
    },
  ],
};

export const cookie: PaginaLegale = {
  occhiello: 'Cookies',
  titolo: 'This site uses no cookies',
  introduzione:
    "That isn't a polite formula, it's something you can check. Open your browser's developer tools, look at the cookies tab, and you'll find it empty.",
  aggiornamento: 'Last updated: 26 August 2026.',
  sezioni: [
    {
      titolo: "Why there's no banner",
      paragrafi: [
        'A banner exists to ask consent for cookies that profile or measure. There are none here — neither mine nor anyone else\'s — so there is nothing to consent to, and a banner asking permission for nothing is just one more obstacle between you and the page.',
      ],
    },
    {
      titolo: 'The one thing your browser keeps',
      paragrafi: [
        "If you pick a language with the switch at the top, the site remembers it in `localStorage` under `lang-chosen`. It isn't a cookie: it doesn't travel with requests to the server and reaches no one. It's your preference, held by your browser, and it only stops the site from sending you back to your system language after you chose the other one.",
        'Under European rules it falls among the technical means necessary to provide a service you asked for, and needs no consent. Clearing the site data in your browser settings removes it.',
      ],
    },
    {
      titolo: 'Nothing loaded from outside',
      paragrafi: [
        'The typefaces are hosted alongside the site, not pulled from Google Fonts. There are no embedded videos, maps, social buttons or tracking pixels. The only requests your browser makes while reading this page go to this site\'s own domain.',
        "There is one exception: images inside a note, which come from Sanity's delivery network. If you find one in a note, that request leaves.",
      ],
    },
    {
      titolo: 'If that ever changes',
      paragrafi: [
        'If I add a visit counter or a service that uses cookies, this page will say so before it happens, and a consent request will appear where it belongs.',
      ],
    },
  ],
};
