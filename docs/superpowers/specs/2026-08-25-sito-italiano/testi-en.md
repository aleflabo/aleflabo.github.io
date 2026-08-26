# Tutti i testi del sito inglese

> Questo documento è **testo da approvare, non codice**. Nessuna pagina è
> stata costruita e nessun file di dati è stato toccato.
>
> Serve a rispondere a una domanda sola: *questo è l'inglese che vuoi
> pubblicare?* Quando la risposta è sì, si implementa; prima no.

## Come leggere le marcature

| Marca | Significato |
|---|---|
| `[RIUSATO]` | Inglese già scritto da te, copiato alla lettera. Sotto è indicato da dove viene. |
| `[TRADOTTO]` | Reso dall'italiano approvato (`testi.md` o i file dati italiani). Traduzione fedele: niente aggiunto, niente tolto. |
| `[DA SCRIVERE]` | Non esiste né in inglese né in italiano. Non l'ho inventato: è dichiarato. |

Due precisazioni sulle fonti:

- **`portale-ricambi` e `tire-hub`**: i campi `en` in `projects.ts` esistono ma
  sono testo scritto da un implementatore e mai approvato (per questo i due
  progetti hanno `soloItaliano: true` e oggi non compaiono nelle rotte
  inglesi). Li ho trattati come **inesistenti**: tutto ciò che segue per questi
  due progetti è tradotto dall'italiano approvato.
- Titoli delle pubblicazioni, sedi (CVPR, ICCV, IROS, ICLR, Pattern
  Recognition…), nomi propri (Procedo, Sapienza, PINlab, Fondimpresa, B4i,
  HomeSweatHome, Spannum) e numeri (10 articoli, 533 citazioni, 2021–2024,
  2024–2026) restano invariati e non sono contati né fra i riusati né fra i
  tradotti.

## Le rotte inglesi proposte

| Italiano | Inglese |
|---|---|
| `/` | `/en/` |
| `/servizi` | `/en/services` |
| `/formazione` | `/en/training` |
| `/lavori` | `/en/work` |
| `/lavori/[slug]` | `/en/work/[slug]` (già esiste) |
| `/ricerca` | `/en/research` |
| `/chi-sono` | `/en/about` |
| `/i-vostri-dati` | `/en/your-data` |
| `/note` | `/en/notes` |

`/en/work` e `/en/work/[slug]` esistono già come rotte: cambia il contenuto
della pagina indice, non l'indirizzo.

---

# 1. `/en/` — home

## Barra di navigazione

**[RIUSATO]** — `site.ts` → `en.nav`

- Work
- Research
- About
- Contact me *(usato oggi come pulsante di testata)*

**[TRADOTTO]** — le tre voci del menu italiano che in inglese non esistono
(`site.ts` → `it.menu`)

- Services
- Training
- Notes

> **Nota.** Il pulsante di testata italiano è «Parliamone» e il richiamo
> ripetuto ovunque è «Prenota mezz'ora» (`it.prenotaMezzora`). Il tuo inglese
> esistente dice `Contact me`. Sotto uso **Book half an hour**, che è la
> traduzione fedele del richiamo italiano; `Contact me` resta disponibile se
> preferisci tenere quello che c'è.

Selettore di lingua: **IT / EN** *(invariato)*

## Fascia d'apertura

**[TRADOTTO]** — `testi.md`, home, occhiello

> AI consulting and training

**[TRADOTTO]** — `testi.md`, home, titolo di pagina (h1)

> I help companies work out where AI is needed, and then I build it.

> **Nota.** In `site.ts` `en.hero.tagline` esiste già una frase tua: *«From
> research to product: I build AI systems that work in the real world.»* Non è
> la stessa cosa dell'h1 italiano — è il posizionamento del vecchio portfolio,
> non quello del consulente. Ho tradotto l'italiano approvato; la frase
> esistente è qui perché tu possa sceglierla al suo posto.

**[TRADOTTO]** — `testi.md`, home, sottotitolo

> Three years of a PhD in computer vision, then two as CTO of a startup that
> took that research inside companies that manufacture things. Now I work on
> my own.

**[TRADOTTO]** — `testi.md`, home, i due richiami

> Book half an hour →
>
> See what I've built

**[TRADOTTO]** — `testi.md`, home, riga di credibilità

> PhD in computer vision at Sapienza · Published at CVPR, ICCV, IROS ·
> Co-founder and CTO of **Procedo** from 2024 to 2026

> **Nota.** `en.hero.credibility` esiste ed è più corta: *«PhD in Computer
> Vision · CVPR/ICCV/IROS · Co-Founder of Procedo»*. L'italiano aggiunge
> «alla Sapienza» e «dal 2024 al 2026», e il 2024–2026 conta perché dice che
> il ruolo è finito. Per questo ho tradotto invece di riusare.

**[TRADOTTO]** — `testi.md`, home, i quattro numeri

> **10** published papers · **533** citations · **1** Best Paper Award ·
> **2** years as CTO

## Il problema

**[TRADOTTO]** — `testi.md`, home, occhiello e titolo di sezione

> The problem
>
> ### The three things I get told most often

**[TRADOTTO]** — `testi.md`, home, le tre voci

> **"I need this part."**
> An email arrives with a crooked photo. Before anyone can quote a price,
> someone has to work out which component it is, and it can take two people a
> couple of days.
>
> **"Only Bruno knows how to do it."**
> Forty years of the trade sitting in one person's head. Nobody has ever had
> the time to write it down, and in two years Bruno retires.
>
> **"We tried ChatGPT."**
> Someone in the office started using it on their own. It isn't clear with
> which documents, or whether the company agrees, and so far nobody has had
> the chance to talk about it.

## Come lavoro

**[TRADOTTO]** — `testi.md`, home, occhiello, titolo e sottotitolo di sezione

> How I work
>
> ### How a job usually goes
>
> Four steps. You can stop after any of them, and what has been done up to
> that point stays yours anyway.

**[TRADOTTO]** — `testi.md`, home, i quattro passi

> **01 · I listen**
> I spend half a day at your company, together with the people who do the work
> every day. It's how I understand how you work, and how you get an idea of
> the way I think.
> *What comes out of it:* a list of the places where time is lost, ordered by
> what they cost.
>
> **02 · Diagnosis**
> Two or three weeks to look at the data you actually have, the systems
> already in use and who takes care of what. At the end I write what would be
> worth doing, in what order, and which roads I'd leave alone.
> *What comes out of it:* a document that stays yours, and that you can show
> to whoever you like.
>
> **03 · I build**
> I always start with the part that might not work, so that if something turns
> out to be impossible we find out early, while changing course still costs
> little.
> *What comes out of it:* something your people open on Monday morning and
> actually use.
>
> **04 · I stay**
> Software nobody looks after stops being useful within a few months. If it's
> needed we stay in touch: maintenance, servers and the changes that come up
> along the way.
> *What comes out of it:* a person who knows the system and who you can call
> when you need to.

> **Nota di resa.** L'italiano alterna nome e verbo — «Ascolto, Diagnosi,
> Costruisco, Resto» — e in inglese l'alternanza si sente di più. Se preferisci
> una serie sola: *I listen · I diagnose · I build · I stay*.

**[TRADOTTO]** — `testi.md`, home, link di sezione

> The four ways of working together, in full →

## Le prove

**[TRADOTTO]** — `testi.md`, home, occhiello e titolo di sezione

> The evidence
>
> ### Some of the things I've built

**[TRADOTTO]** — `testi.md`, home, scheda 1

> Mechanical engineering · real client project
>
> ### 3D Parts Portal
>
> The customer opens the 3D model of the machine they bought, clicks the part
> they need, and the request reaches the company already matched to that
> component's internal code.
>
> `CAD pipeline, 80 tests` `Intellectual property protected`
>
> How it works →

> **Nota.** Il nome del progetto in `projects.ts` è un campo unico
> (`Portale ricambi 3D`), non tradotto per lingua. Se il sito inglese deve
> dire *3D Parts Portal*, il campo va sdoppiato.

**[TRADOTTO]** — `testi.md`, home, scheda 2

> Industry · in production
>
> ### Procedo
>
> Video shot on the shop floor becomes step-by-step procedures, and the people
> doing the work can ask questions of their own company's documentation. I was
> co-founder and CTO for two years; today I follow it as an advisor.
>
> `Industrial customers` `B4i Bocconi` `Angel round`
>
> How it works →

**[TRADOTTO]** — `testi.md`, home, scheda 3

> Live product · open to everyone
>
> ### Spannum
>
> A working-memory test built to the protocol published in the literature,
> with the sources cited and the limits stated. It's online and you can try it.
>
> `Online` `Age norms`
>
> Open it →

**[TRADOTTO]** — `testi.md`, home, link di sezione

> All the work, research included →

## Formazione

**[TRADOTTO]** — `testi.md`, home, occhiello, titolo e corpo

> Training
>
> ### It starts with people
>
> Four hours, at your company or in a classroom, to show people what these
> tools can do and where their limits are. We work on concrete cases.
>
> Since February 2025 the AI Act requires companies that use artificial
> intelligence tools to ensure a minimum level of training for their staff,
> and to be able to document it. You'll do that course anyway: it may as well
> be good for something.

**[TRADOTTO]** — `testi.md`, home, i tre formati in breve

> **4 hours · Introductory course**
> For the whole company, from the owner to the shop floor. What has changed in
> the last few years, what has stayed the same, and the concrete risks to your
> data.
>
> **8–12 hours · Workshop by function**
> Engineering office, purchasing, administration, sales. Each group works on
> its own documents, so what they learn can be used the next day.
>
> **Length agreed · Funded programme**
> Through accredited training bodies and interprofessional funds, when the
> company wants a long programme without committing its own cash.

**[TRADOTTO]** — `testi.md`, home, chiusura della sezione

> I taught for four years at Sapienza as a teaching assistant, and I was an
> invited speaker at Ferrari S.p.A.'s Data Science Hub. Courses are organised
> directly, or through accredited training bodies and interprofessional funds.
>
> How a course gets organised →

## Da dove viene quello che so

**[TRADOTTO]** — `testi.md`, home, occhiello, titolo e due paragrafi

> Where what I know comes from
>
> ### From research to production
>
> A master's in data science, then a PhD in computer vision at Sapienza, with
> the work published at conferences where it gets examined thoroughly before
> it comes out. I was then CTO of an industrial startup for two years, which is
> the job where you find out how much of that research survives contact with a
> real company.
>
> Every paper I published came out together with the code. It's the habit I
> still work with: technical decisions stay written down, and the software I
> hand over opens and reads.

**[TRADOTTO]** — `testi.md`, home, la linea del tempo

> **2021–2024** — PhD in computer vision, Sapienza — PINlab
> **CVPR · ICCV · IROS** — The main conferences in the field
> **2024–2026** — Co-founder and CTO of Procedo, an industrial startup
>
> The research, in full → · About me →

## Parliamone

**[RIUSATO]** — `site.ts` → `en.contact.title`

> Let's talk

**[TRADOTTO]** — `testi.md`, home, titolo di sezione e corpo

> ### Half an hour to see whether we can work together
>
> If it isn't the right job for me I'll tell you straight away, and if I know
> someone better suited I'll put you in touch.

> **Nota.** `en.contact.body` esiste — *«Have an interesting problem or an idea
> to build? Drop me a line.»* — ma è la chiusura del portfolio, non il modulo
> della home italiana. Riusato solo il titolo.

**[TRADOTTO]** — `testi.md`, home, il modulo

> **Company** — Registered name
> **How I get back to you** — Email or phone
> **What would you like to stop doing by hand** — Two lines are enough, even
> rough
> **How urgent is it** — `Just looking` `This year` `I have a problem right now`
>
> Send
>
> Or, if you'd rather skip the form:
> Pick half an hour in the calendar · WhatsApp · Email

## Piè di pagina

**[TRADOTTO]** — `testi.md`, piè di pagina (identico su tutte le pagine)

> **Alessandro Flaborea**
> AI consulting and training. From research to software that people use.
>
> Book half an hour
>
> **What I do** — Services · Training · Where your data ends up
> **The evidence** — Work · Research · About · Notes
> **Elsewhere** — LinkedIn · GitHub · Google Scholar · Italian site
>
> © 2026 Alessandro Flaborea · VAT no. [DA INSERIRE]
> Privacy · Cookies

> **Nota.** Nel piè di pagina italiano l'ultima voce di «Altrove» è *English
> site*; sul sito inglese diventa il rimando opposto, **Italian site**.

**[DA SCRIVERE]** — la partita IVA (`P. IVA [DA INSERIRE]` in `testi.md`).

**[DA SCRIVERE]** — le pagine **Privacy** e **Cookies**. I due link sono nel
piè di pagina di tutte le pagine, ma le pagine non esistono in nessuna delle
due lingue.

## `/` su telefono

La tavola `HomeMobile.dc.html` non introduce testo nuovo: è la stessa home con
meno schede e due frasi accorciate. Nessun blocco aggiuntivo da approvare.

---

# 2. `/en/services`

Fonte italiana: `testi.md` §`/servizi` e `src/data/servizi.ts`. Non esiste
inglese di partenza per nessuno dei blocchi di questa pagina: è tutta tradotta.

## Apertura

**[TRADOTTO]**

> Services
>
> # Four ways of working together
>
> You start with the first one. Each step stands on its own: you go on when the
> work calls for it, you can stop at any moment, and what has been done stays
> yours anyway.

## I quattro ingaggi

**[TRADOTTO]** — `servizi.ts` → `ingaggi[0]`

> Understand
>
> ## A diagnostic half-day
>
> I come to your company, watch how you work and ask a few questions. It's
> there to work out whether there's something worth taking on now, and
> sometimes the conclusion is that it can wait.
>
> **Who it's for** — It isn't clear where to start
> **How long** — One morning
> **What you keep** — A list of the places where time is lost, with what they
> cost written next to them

**[TRADOTTO]** — `servizi.ts` → `ingaggi[1]`

> Decide
>
> ## AI audit
>
> I look at the data you actually have, the systems already in use, who takes
> care of what and under which constraints. Then I write what would be worth
> doing, in what order, and which roads I'd leave alone.
>
> The document stays yours. If one day the work passes to somebody else, you
> hand it to them and they start from there.
>
> **Who it's for** — You have an idea and want to know whether it holds up
> before putting money into it
> **How long** — Two or three weeks
> **What you keep** — A document you can show to anyone, other suppliers
> included

**[TRADOTTO]** — `servizi.ts` → `ingaggi[2]`

> Build
>
> ## Custom software
>
> From automating a single step to a complete system. I always start with the
> part that might not work, so that if something turns out to be impossible we
> find out while changing course still costs little.
>
> The code is yours and I hand it over, so you don't stay tied to me longer
> than necessary.
>
> **Who it's for** — You have a specific process you want out of the way
> **How long** — From six weeks, in stages you approve one at a time
> **What you keep** — Something people actually use, plus the source code

**[TRADOTTO]** — `servizi.ts` → `ingaggi[3]`

> Maintain
>
> ## Service retainer
>
> Software nobody looks after stops being useful within a few months. The
> retainer keeps standing what we built: servers, updates and the hours of
> changes that are needed along the way.
>
> Twelve months, renewable, with notice to exit. The included hours are written
> in the contract.
>
> **Who it's for** — You have something in production and would rather not have
> to think about it
> **How long** — Twelve months, renewable, with an exit
> **What you keep** — Servers included, and a person who answers when you call

**[TRADOTTO]** — `testi.md`, link di sezione

> The evidence: what I've built →

## Per chi non sono

**[TRADOTTO]** — `servizi.ts` → `perChiNonSono`

> Honesty
>
> ## Who I'm not for
>
> - If you're looking for a brochure site or an e-commerce, there are agencies
>   that do it better than me and cost less.
> - If the goal is to introduce artificial intelligence without a specific
>   problem in mind, it's worth stopping earlier and looking for the problem.
> - If you need somebody there every day, it's better to hire a person than to
>   call a consultant.
> - If the data you'd need doesn't exist, or nobody has ever written it down,
>   the first job is collecting it, and that takes time.

## Domande

**[TRADOTTO]** — `servizi.ts` → `faq`

> Questions
>
> ## The ones I get asked almost every time
>
> ### Where does our data end up?
> It's the right question and it deserves more than one paragraph: there's a
> whole page that explains it, including the things I can't guarantee you. In
> short: the files stay yours and nobody uses them to train anything; what I
> build lives on infrastructure registered to you.
> → Read the page about data
>
> ### How much does it cost?
> It depends on three things: how complicated the hardest part is, how many
> systems you already have that it has to touch, and whether somebody needs to
> keep it alive afterwards. I don't publish a price list because a price
> written without knowing your case would be a made-up number. At the end of
> the diagnostic half-day you have a written quote with the items listed
> separately, and no obligation to go on.
>
> ### How long does it take?
> The half-day is one morning. The audit two or three weeks. A project starts
> at six weeks and proceeds in stages you approve one at a time, so you can
> stop at any point without losing what has been done.
>
> ### What do you need from us?
> Little, but that little is indispensable: half a day of the people who
> actually do the work, not only of the people who describe it; some real files
> instead of a cleaned-up example; and one person inside who can answer
> questions when they come up. Without that last one, projects stall, always.
>
> ### And what if it doesn't work?
> I start with the part that might not work precisely so we find out early. If
> it turns out something can't be done, I tell you, I hand over what I've
> understood up to that point and we stop: you pay for the work done and not
> for the promised result. It has happened, and it was money saved.

## Come si comincia

**[TRADOTTO]** — `testi.md`, `/servizi`, chiusura

> ## How it starts
>
> You write me two lines about what you'd like to stop doing by hand and we
> talk for half an hour. If there's room to work together we meet in person;
> otherwise I tell you straight away, and if I know someone better suited I put
> you in touch.
>
> Let's talk, half an hour

## Blocco riusabile che oggi non ha un posto

**[RIUSATO]** — `site.ts` → `en.servicesLabel`, `en.servicesTitle`,
`en.services` (quattro voci)

> Capabilities
>
> ## What I build
>
> **Computer Vision systems** — Video understanding, pose and action
> recognition, on-device real-time inference.
>
> **LLM · RAG · Agentic systems** — Agentic pipelines, multimodal retrieval,
> tool-using assistants with real guardrails.
>
> **Data engineering & analytics** — API integrations, scheduled pipelines,
> geospatial analysis, forecasting.
>
> **Full product / MVP build** — From idea to a deployed product with real
> users, across the whole stack.

> **Nota.** Questo è inglese tuo e si riusa alla lettera, ma la struttura
> italiana non ha una sezione corrispondente: `/servizi` parla di **modi di
> lavorare insieme**, non di competenze tecniche. Le quattro voci stanno in
> piedi come sezione in più su `/en/services` (o sulla home inglese) se vuoi
> tenerle; altrimenti restano fuori. Decidi tu: io non le ho né inserite né
> buttate.

> ### Nota — contenuto costruito per il mercato italiano
>
> 1. **«I come to your company» / «One morning».** L'intero primo ingaggio
>    presuppone una visita di persona a mezza giornata. Per un lettore che
>    legge da fuori Italia è la prima cosa che non torna: o si dice che la
>    mezza giornata vale in un raggio geografico, o si prevede una versione a
>    distanza. Il testo italiano non lo dice, quindi non l'ho aggiunto.
> 2. **«Service retainer», dodici mesi con uscita su preavviso, «le ore incluse
>    sono scritte nel contratto».** È la forma del canone italiano. In inglese
>    *retainer* si capisce, ma un lettore anglosassone si aspetta di leggere
>    quante ore e con quanto preavviso — dettagli che l'italiano rimanda al
>    contratto.
> 3. **«A written quote with the items listed separately»** traduce
>    «preventivo con le voci separate», che in Italia è un documento con una
>    forma riconoscibile. Fuori è solo «a written quote».
> 4. **La partita IVA nel piè di pagina** è un obbligo italiano. Su un sito
>    inglese non comunica niente, ma non si può togliere finché il sito è
>    quello di un'attività italiana: al massimo si etichetta *VAT no.*

---

# 3. `/en/training`

Fonte italiana: `testi.md` §`/formazione` e `src/data/formazione.ts`. Nessun
inglese di partenza: tutta tradotta.

## Apertura

**[TRADOTTO]**

> Training
>
> # Courses you use the next day
>
> In the classroom we work on the company's own documents and on the cases that
> actually come up. The aim is that everyone leaves with something they can put
> into practice straight away.

## Una cosa che conviene sapere

**[TRADOTTO]** — `formazione.ts` → `riquadroAiAct`

> ## Something worth knowing
>
> Since 2 February 2025, Article 4 of the AI Act asks companies that use
> artificial intelligence tools to ensure a minimum level of training for their
> staff, and to be able to document it. It applies to companies that only use
> ChatGPT too, and it doesn't concern only the IT department.
>
> The basic course that satisfies that requirement is around four hours. It's
> training the company will do anyway: it's worth it being good for working
> better too.
>
> Where your data ends up →

## I tre formati

**[TRADOTTO]** — `formazione.ts` → `formati`

> **4 hours · Introductory course**
> For the whole company together, from the owner to the shop floor. How these
> tools work, the ways they get things wrong and how you notice they're getting
> things wrong, where the documents you paste into them end up, and which are
> the cases where they're genuinely worth using.
> *Who it's for:* everyone, including people who have never opened ChatGPT.
> *What you need to provide:* a room and a projector.
>
> **8–12 hours · Workshop by function**
> Engineering office, purchasing, administration, sales: each group works on its
> own documents and its own cases. We start from a task that takes hours today
> and try to shorten it, together, during the session.
> *Who it's for:* one department at a time, small groups.
> *What you need to provide:* real documents and permission to use them.
>
> **Length agreed · Funded programme**
> For when a long programme is needed without committing cash. It's built
> together with an accredited training body, which takes care of the
> administration and the reporting.
> *Who it's for:* companies with employees already enrolled with a fund.
> *What you need to provide:* knowing which fund you're enrolled with. The rest
> we work out together.

## Chi sostiene il costo del corso

**[TRADOTTO]** — `formazione.ts` → `strade`

> How it gets organised
>
> ## Who pays for the course
>
> ### Directly
> You contact me, we agree on the date and the contents, I invoice the company.
> It's the quickest route: we can start in a couple of weeks.
>
> ### Through an accredited training body
> The body organises it and I teach. It's the route to take when the course has
> to be part of a regional catalogue or carry formal recognition.
>
> ### With the interprofessional funds
> Companies with employees already pay 0.30% of their payroll into a fund such
> as Fondimpresa. That money can be used to train people, and it takes an
> accredited body to submit the plan.

## Chi sale in cattedra

**[TRADOTTO]** — `testi.md`, `/formazione`

> Who's teaching
>
> ## I come from the classroom
>
> Four years as a teaching assistant at Sapienza, from 2019 to 2023, during the
> PhD. Then two years building software people use every day. In a classroom
> you need both: the first to manage to make yourself understood, the second to
> teach things that hold up inside a company.
>
> I was also an invited speaker at Ferrari S.p.A.'s Data Science Hub.

## Che cosa questo corso non è

**[TRADOTTO]** — `testi.md`, `/formazione`

> Honesty
>
> ## What this course is not
>
> - It isn't a programming course. We work on the tools that already exist and
>   on how to bring them into everyday work. Writing code and training models is
>   a separate path.
> - There are no ready-made formulas to copy. Lists of tricks stop working at
>   the first change of model, while having understood how the tool reasons
>   stays with you.
> - I don't turn up with a saving percentage already written on the slides.
>   Before having seen how you work it would be a made-up number.

## Chiusura

**[TRADOTTO]** — `testi.md`, `/formazione`

> ## Tell me what kind of company you are
>
> How many of you there are, what you do and who would use these tools. From
> there we work out which of the three routes suits you.
>
> Book half an hour · WhatsApp

> ### Nota — contenuto costruito per il mercato italiano
>
> Questa è la pagina che regge di meno fuori d'Italia. In ordine di gravità:
>
> 1. **I fondi interprofessionali.** «Le aziende con dipendenti versano già lo
>    0,30% del monte salari a un fondo come Fondimpresa» descrive un meccanismo
>    che **fuori d'Italia non esiste**. Per un lettore straniero è una frase
>    senza riferimento: non sa cos'è un fondo interprofessionale, non versa lo
>    0,30%, e Fondimpresa non gli dice niente. Riguarda la terza strada e anche
>    il terzo formato («Percorso finanziato», «aziende già iscritte a un
>    fondo»), cioè un blocco su tre della pagina.
> 2. **Gli enti accreditati e il catalogo regionale.** L'accreditamento
>    regionale della formazione è un istituto italiano. In inglese l'ho reso
>    *accredited training body* e *regional catalogue*, che si capiscono come
>    parole ma non come sistema.
> 3. **L'AI Act.** È europeo, non italiano: regge per un lettore dell'Unione, e
>    l'articolo 4 vale anche per chi usa l'AI in Europa dall'estero. Ma per un
>    lettore americano o britannico è una regola che non lo riguarda, e sulla
>    pagina occupa il riquadro più visibile insieme al richiamo in home.
> 4. **«A room and a projector» e «one department at a time»** presuppongono un
>    corso in presenza. Vale la stessa osservazione fatta per la mezza giornata
>    diagnostica.
>
> Se decidi di tagliare, il taglio più piccolo che tiene in piedi la pagina è:
> togliere il terzo formato e la terza strada, e lasciare l'AI Act con una riga
> che dica che è una regola europea. Ma è una decisione tua: io segnalo.

---

# 4. `/en/work`

Fonti: `testi.md` §`/lavori` per il testo delle schede, `src/data/projects.ts`
per i case study. Le schede della pagina indice sono **tradotte**: l'italiano di
`testi.md` dice cose che i `summary` inglesi del portfolio non dicono (il ruolo
di advisor in Procedo, lo stato «in costruzione» del portale, la provenienza di
Tire Hub). I campi dei case study sono **riusati** dove l'inglese è tuo.

## Apertura

**[TRADOTTO]** — `testi.md`, `/lavori`

> Work
>
> # What I've built
>
> Above, the software made for a company's work; below, the products, the games
> and the things I built on my own. Each card says how it came about and where
> it stands.

## Software per le aziende

**[TRADOTTO]** — `testi.md`, titolo di sezione

> ## Software for companies

### Procedo — 2024–2026

**[TRADOTTO]** — `testi.md`, scheda (occhiello, corpo, etichette)

> Industry · in production
>
> ### Procedo
>
> A platform that turns video shot on the shop floor into step-by-step
> procedures, and lets the people doing the work ask questions of their own
> company's documentation. I was co-founder and CTO for two years: I led the
> architecture and took the AI part into production. Today I follow it as an
> advisor.
>
> `Computer vision` `Applied LLMs` `Per-customer data isolation` `B4i Bocconi`
> `Angel round`

**[RIUSATO]** — `projects.ts` → `procedo.en` (`area`, `problem`, `approach`,
`result`), per `/en/work/procedo`

> **Industrial AI**
>
> **Problem** — Manufacturing teams document, optimize, and train on physical
> procedures by hand, a slow process that rarely keeps pace with how work
> actually happens on the floor.
>
> **Approach** — As CTO and co-founder I led the architecture and
> productionization of the core AI: turning long operational video into clear,
> step-by-step procedures; letting teams get grounded answers from their own
> documentation; and an assistant that helps them work with those procedures
> safely. The platform runs in the cloud, isolated per customer.
>
> **Result** — Procedo runs in production for industrial customers, was
> selected for Bocconi's B4i accelerator, and closed an angel round.

**[RIUSATO]** — `projects.ts` → `procedo.en.summary`

> An AI platform that turns raw shop-floor video into structured manufacturing
> knowledge, in production with real industrial customers.

> **Nota.** Questo `summary` è tuo e si riusa, ma è scritto al presente e non
> dice che il ruolo è finito. La scheda italiana lo dice («oggi la seguo come
> advisor»). Se il `summary` inglese resta com'è, la pagina indice e la pagina
> del case study raccontano due stati diversi.

### 3D Parts Portal — 2026

**[TRADOTTO]** — `testi.md`, scheda

> Mechanical engineering · real client project
>
> ### 3D Parts Portal
>
> The customer opens the 3D model of the machine they bought, clicks the part
> they need, and the request reaches the company already matched to that
> component's internal code. Today that same request is an email with a photo,
> and before the quote somebody has to go hunting for the code. The CAD
> conversion pipeline is finished and tested; the portal itself is under
> construction.
>
> `CAD pipeline` `80 tests` `IP protected` `Under construction`

**[TRADOTTO]** — `projects.ts` → `portale-ricambi.it`, per
`/en/work/portale-ricambi`

> **Mechanical engineering**
>
> **Problem** — Today that same request is an email with a photo, and before
> the quote somebody has to go hunting for the code.
>
> **Result** — The CAD conversion pipeline is finished and tested; the portal
> is under construction.

**[DA SCRIVERE]** — l'**Approach** del case study `portale-ricambi`.
`testi.md` dedica a questo progetto un paragrafo di tre frasi, già consumate da
summary, problem e result: non c'è una quarta frase da cui ricavare
l'approccio, in italiano né in inglese. Il campo `en.approach` in `projects.ts`
esiste ma è testo non approvato e l'ho ignorato, come da istruzione.

### Tire Hub — 2026

**[TRADOTTO]** — `testi.md`, scheda

> Automotive · business management
>
> ### Tire Hub
>
> A management dashboard for the tyre trade: customer and stock records,
> area-by-area statistics and the daily work of the people at the counter. It
> comes from an initiative of mine and not from a client job: I built it
> starting from an automatic generation tool, then rebuilt by hand the parts
> that matter, to see how far you get.
>
> `Business management` `Area-by-area statistics` `My own initiative`

**[TRADOTTO]** — `projects.ts` → `tire-hub.it`, per `/en/work/tire-hub`

> **Automotive**
>
> **Problem** — It comes from an initiative of mine and not from a client job.
>
> **Approach** — I built it starting from an automatic generation tool, then
> rebuilt by hand the parts that matter, to see how far you get.

**[DA SCRIVERE]** — il **Result** del case study `tire-hub`. `testi.md` dedica
due frasi al progetto, già consumate da summary, problem e approach. Il campo
`en.result` in `projects.ts` esiste ma è testo non approvato e l'ho ignorato.

### Cost Tracking — 2025

**[TRADOTTO]** — `testi.md`, scheda

> Monitoring · internal use
>
> ### Cost Tracking
>
> A dashboard that holds together the daily spend on cloud, GitHub and LLM
> services for a small team, with currency conversion and amortisation of
> subscriptions. It runs on its own with scheduled jobs and a table that records
> every sync, so when something doesn't add up you can see where.
>
> `Multiple providers in one view` `Daily sync` `Runs unattended`

**[RIUSATO]** — `projects.ts` → `procedo-tracking-costs.en`, per
`/en/work/procedo-tracking-costs`

> **Monitoring**
>
> **Summary** — An internal cost dashboard that tracks daily and monthly cloud,
> GitHub, and LLM spend for a small team, with FX conversion and subscription
> amortization.
>
> **Problem** — A small team's cloud and tooling costs were scattered across
> multiple providers with no single view, making it hard to spot spend spikes
> or forecast burn.
>
> **Approach** — Built a Next.js dashboard backed by Supabase, with scheduled
> Edge Functions syncing cloud cost data, GitHub billing, and FX rates daily
> via pg_cron, zod-validated data models, and magic-link auth restricted to the
> team's domain.
>
> **Result** — Runs unattended in production with a sync_runs observability
> table, giving the team a single daily view of cross-provider spend.

## Prodotti e strumenti miei

**[TRADOTTO]** — `testi.md`, titolo di sezione e corpo

> ## My own products and tools
>
> Born out of curiosity or a need of my own. Some have real users and can be
> opened right now; one is a video.

### Spannum — 2026

**[TRADOTTO]** — `testi.md`, scheda

> Applied psychometrics · online
>
> ### Spannum
>
> A working-memory test built to the protocol published in the literature, with
> age norms and the sources cited. It also states what the evidence doesn't
> support: training improves the task, not intelligence. It's open to everyone
> and you can try it right now.
>
> `Online and public` `Age norms` `Installs on your phone`

**[RIUSATO]** — `projects.ts` → `spannum.en`, per `/en/work/spannum`

> **Applied psychometrics**
>
> **Summary** — A working-memory test and trainer that turns the digit-span
> protocol into a consumer web app, with age norms and a shareable report.
>
> **Problem** — The digit-span task is a well-validated measure of working
> memory, but it lives in research papers and clinical settings. The consumer
> apps that borrow its name mostly drop the protocol and promise to make you
> smarter.
>
> **Approach** — I built the test to the published protocol, forward and
> backward, digits and letters, with stimuli spoken by the browser's built-in
> speech synthesis rather than pre-recorded audio. Results are scored against
> age norms from the literature, and the site is explicit about what the
> evidence supports: training improves the task, not general intelligence. The
> public site is prerendered so crawlers and answer engines see the real
> content; the app itself is an installable PWA on a separate domain.
>
> **Result** — Live and open to the public at spannum.com, with a shareable
> report, comparison against age norms, and the peer-reviewed sources cited on
> the site.

### Fanta Mundial — 2026

**[TRADOTTO]** — `testi.md`, scheda

> Gamification · with real users
>
> ### Fanta Mundial
>
> A World Cup prediction league with around forty active players: accounts,
> predictions with closing windows, scoring, a live leaderboard and a scheduled
> job that fetches the results from an external API and updates everything
> without anyone touching anything.
>
> `Around forty players` `Results that update themselves` `In production`

**[RIUSATO]** — `projects.ts` → `fanta-mundial.en`, per
`/en/work/fanta-mundial`

> **Gamification**
>
> **Summary** — A full-stack prediction league with ~40 real users and
> automated result syncing.
>
> **Problem** — A private World Cup prediction league needed real accounts,
> live standings, and scores that update themselves without manual entry.
>
> **Approach** — Built a modular Streamlit app on Supabase: bcrypt auth,
> per-match predictions with lock windows, scoring, a live leaderboard, and a
> scheduled job that pulls match results from an external API and updates
> standings automatically.
>
> **Result** — Deployed on Streamlit Community Cloud with around 40 active
> players. Covered by pytest; result-syncing runs unattended.

### Agentic Workflow Toolkit — 2026

**[TRADOTTO]** — `testi.md`, scheda

> Agentic tooling · daily use
>
> ### Agentic Workflow Toolkit
>
> A set of agents that automate the repetitive work of a technical team: the
> standup that cross-references GitHub activity with Notion tasks, the
> architecture documentation that regenerates itself by reading the code, and
> the review of prompts before they go into production.
>
> `Automated standup` `Regenerated documentation` `Prompt review`

**[RIUSATO]** — `projects.ts` → `agentic-toolkit.en`, per
`/en/work/agentic-toolkit`

> **Agentic tooling**
>
> **Summary** — A suite of AI-agent skills that automate my team's ops and
> engineering workflows, from daily standups to LLM-prompt review.
>
> **Problem** — Recurring team and engineering chores, running standups,
> tracking sprints across Notion and GitHub, keeping platform docs current, and
> reviewing LLM prompts before they ship, quietly consumed time and drifted out
> of date.
>
> **Approach** — I built a set of Claude Code skills, each a focused agent with
> the right tools wired in: a standup skill that cross-references GitHub
> activity with Notion tasks and drafts the daily update; a platform-map skill
> that scans the repo and regenerates the architecture docs; and a
> prompt-review skill that audits LLM prompts for efficacy and regressions
> across the extraction pipeline and the chat agents.
>
> **Result** — Routine ops and documentation now run as one-command agent
> invocations instead of manual work, and every prompt change gets a consistent
> review before it ships.

### Paesello — 2026

**[TRADOTTO]** — `testi.md`, scheda

> Social game · online
>
> ### Paesello
>
> The odd-one-out game, with the difference that the words are written by the
> players and come from the places in their own town: Nino's bar, the low wall
> in front of the school. Everyone's phone shows the same word except one, the
> outsider, who has to talk about it without knowing what it is. Underneath
> there's a build where the security sits in the database and every row belongs
> to whoever wrote it, with automated tests that run before every release.
>
> `Phone game` `Words written by the players` `In production`

**[DA SCRIVERE]** — problem / approach / result di un eventuale
`/en/work/paesello`. Paesello non è in `projects.ts`: esiste solo la scheda
di `testi.md`, quindi non ha un case study nemmeno in italiano.

### A story across several scenes — 2025

**[TRADOTTO]** — `testi.md`, scheda

> Generative video
>
> ### A story across several scenes
>
> A wedding video, generated end to end, with a story that runs across several
> scenes. Generating one scene is easy and everybody does it; the hard part is
> generating ten in which the same people stay recognisable — same face, same
> clothes, same light — and the story holds from beginning to end. The work on
> images came out of that too: what interests me is the point where these tools
> stop being a demo and start holding up a delivery.
>
> `Generative video` `Continuity across scenes` `Images`
> `SCENE 1` `SCENE 2` `SCENE 3` `SCENE 4`
>
> *[ Four frames from the video, chosen to show that the characters stay the
> same. Better still: the video itself ]*

**[DA SCRIVERE]** — problem / approach / result di un eventuale case study, e
il **titolo inglese definitivo**. «Una storia in più scene» non è in
`projects.ts` e non ha un nome proprio: *A story across several scenes* è la
mia resa dell'italiano, non un nome che hai scelto.

### Contrada Navigator — 2025

**[TRADOTTO]** — `testi.md`, scheda

> Civic data · geospatial
>
> ### Contrada Navigator
>
> The historical rules that assign each street of a town to its contrada,
> odd and even house numbers included, reconstructed from the registers and put
> on a navigable map. With participation trends from 2012 and a projection out
> to 2034.
>
> `Interactive map` `2012–2025 time series` `Projections to 2034`

**[RIUSATO]** — `projects.ts` → `contrada-navigator.en`, per
`/en/work/contrada-navigator`

> **Data analytics**
>
> **Summary** — A civic data project mapping an Italian town's historical
> neighborhoods, with participation forecasts through an interactive web map.
>
> **Problem** — A town's historic contrada (neighborhood) boundaries and
> participation trends lived in scattered records, with no way to explore them
> or project future turnout.
>
> **Approach** — Built a Python analysis layer in Streamlit and pandas to model
> street-to-contrada mapping rules and 2012-2025 trends, then a separate React
> and TypeScript web app with an interactive Leaflet map for exploring the data.
>
> **Result** — Produces forecasts of participation through 2034 and a
> public-facing interactive map of the town's neighborhoods.

> **Nota.** Il tuo inglese glossa già *contrada* come *neighborhood*: la scheda
> tradotta sopra usa la parola nuda, come fa l'italiano. Conviene tenere la
> glossa anche nella scheda.

### Personal Vault — 2024–oggi

**[TRADOTTO]** — `testi.md`, scheda

> Knowledge systems
>
> ### Personal Vault
>
> A personal knowledge base in which an append-only inbox feeds a wiki curated
> by an agent, with schemas for clients, projects, people and concepts, links
> between the entries and commands to ingest, query and check them. I use it
> every day.
>
> `Wiki curated by an agent` `Daily use` `Data constraints`

**[RIUSATO]** — `projects.ts` → `vault.en`, per `/en/work/vault`

> **Knowledge systems**
>
> **Summary** — A personal knowledge base that ingests notes and documents and
> interlinks them into a navigable wiki, following Karpathy's 'LLM wiki'
> pattern.
>
> **Problem** — Personal notes, ideas, and documents accumulate faster than
> they can be organized, and manual note-taking rarely produces a system that
> stays useful over time.
>
> **Approach** — Paired Obsidian with a Claude Code agent: an append-only raw
> inbox feeds an LLM-curated wiki with entity schemas for clients, projects,
> people, and concepts, wikilinks and a graph view, and slash commands for
> ingesting, querying, and linting the vault.
>
> **Result** — A living personal wiki with strict data-governance constraints,
> used daily to search, brief, and disambiguate across a growing base of notes.

### HomeSweatHome — 2021–2023

**[TRADOTTO]** — `testi.md`, scheda

> Computer vision · MVP
>
> ### HomeSweatHome
>
> A personal trainer that reads your posture from a laptop webcam and corrects
> your execution while you train, without sending anything to the cloud because
> the delay would make the advice useless. I designed the architecture and built
> the perception part. Reached a working MVP, presented at Bocconi's
> IdeaBoosterLab.
>
> `Posture reading` `Real time` `No cloud`

**[RIUSATO]** — `projects.ts` → `homesweathome.en`, per
`/en/work/homesweathome`

> **Computer Vision**
>
> **Summary** — An AI virtual trainer that reads posture and movement from a
> laptop webcam and coaches workouts in real time, entirely on-device.
>
> **Problem** — People training at home have no one watching their form, and
> cloud round-trips are too slow to give useful feedback mid-exercise.
>
> **Approach** — As part of the founding team I designed the architecture and
> built the perception core: real-time posture and movement analysis and an
> on-device action recognition model, both light enough to run smoothly on
> consumer hardware.
>
> **Result** — Reached a working MVP presented at the demo day of Bocconi
> University's IdeaBoosterLab accelerator.

## E poi c'è la ricerca

**[TRADOTTO]** — `testi.md`, `/lavori`, chiusura

> ## And then there's the research
>
> Ten published papers, more than five hundred citations and the code of every
> one that could be opened. That's where the part of these projects that can't
> be improvised comes from.
>
> Go to the research → · How I work →

## Etichette della pagina case study

**[RIUSATO]** — `site.ts` → `en.caseStudy`, `en.workTitle`, `en.workLiveLabel`,
`en.workCodeLabel`, `en.workSeeMore`

> Selected work · Problem · Approach · Result · Live · Code · See more

---

# 5. `/en/research`

Fonti: `testi.md` §`/ricerca` e `src/data/pubblicazioni.ts` per il corpo della
pagina; `site.ts` → `en.research` e `Research.astro` per l'inglese già scritto.

## Apertura

**[TRADOTTO]** — `testi.md`, `/ricerca`

> Research
>
> # The research the rest comes from
>
> A PhD at Sapienza's Perception and Intelligence Lab, from 2021 to 2024, and a
> research period at the University of Amsterdam. Anomaly detection, action
> recognition and procedural learning: understanding what a person is doing by
> watching them.

> **Nota.** `en.research.title` e `en.research.intro` esistono — *«Research &
> recognition»* e *«PhD at the Perception and Intelligence Lab (PINlab),
> Sapienza University of Rome. Visiting researcher in Amsterdam. Invited
> speaker at Ferrari S.p.A.»* — ma sono l'intestazione della sezione del
> vecchio portfolio, non il titolo e l'introduzione della pagina italiana. Ho
> tradotto l'italiano; il tuo inglese è qui se preferisci riusarlo.

**[TRADOTTO]** — `pubblicazioni.ts` → `numeriFascia`

> **10** published papers · **533** citations, as of August 2026 · **3** as
> first author · **1** Best Paper Award

## Cosa c'entra con la tua azienda

**[TRADOTTO]** — `testi.md`, `/ricerca`

> What this has to do with your company
>
> No jargon: I spent years teaching a computer to watch a person at work and
> notice that they're getting a step wrong, while they're doing it.
>
> It's the same question a shop-floor supervisor asks walking between the
> stations. Procedo came out of that, and so does the way I approach the
> problems people bring me: first you look at how the work is really done, then
> you decide what to automate.
>
> Where that research became a product →

## Le pubblicazioni

**[TRADOTTO]** — `testi.md`, `/ricerca`, titolo e introduzione della lista

> ## Publications
>
> Most recent first. Where a public repository exists, the GitHub stars are
> shown.

**[TRADOTTO]** — `pubblicazioni.ts`, le dieci descrizioni. Titoli, sedi, anni e
metriche sono invariati; solo il numero delle citazioni e la parola «stelle»
cambiano lingua.

> **2026 · TI-PREGO: Chain of Thought and In-Context Learning for Online
> Mistake Detection in Procedural Egocentric Videos**
> Noticing in real time that somebody is getting a step wrong, watching the
> video from their point of view.
> *Computer Vision and Image Understanding · 11 citations*
>
> **2025 · Compositional Entailment Learning for Hyperbolic Vision-Language
> Models**
> Models that tie images and words together in a geometric space that respects
> hierarchies.
> *ICLR · 118 citations*
>
> **2024 · Contracting Skeletal Kinematics for Human-Related Video Anomaly
> Detection**
> Recognising anomalous behaviour from skeleton movement alone. First author.
> *Pattern Recognition · 65 citations · 8 stars*
>
> **2024 · PREGO: Online Mistake Detection in Procedural Egocentric Videos**
> Detecting mistakes in a procedure while it's being carried out. First author.
> *CVPR · 50 citations · 34 stars*
>
> **2024 · Hyp2Nav: Hyperbolic Planning and Curiosity for Crowd Navigation**
> Moving a robot through a crowd without bumping into anyone.
> *IROS · 3 citations*
>
> **2023 · Multimodal Motion Conditioned Diffusion Model for Skeleton-Based
> Video Anomaly Detection**
> The most cited and most used of my papers. First author.
> *ICCV · 147 citations · 93 stars*
>
> **2023 · Are We Certain It's Anomalous?**
> When the model says "this is an anomaly", how much you can believe it.
> Spotlight presentation.
> *CVPR Workshops (VAND) · 15 citations · 26 stars*
>
> **2023 · Best Practices for 2-Body Pose Forecasting**
> Predicting how two interacting people will move. Best Paper Award.
> *CVPR Workshops (Precognition) · 17 citations*
>
> **2023 · A Self-Supervised Algorithm to Detect Signs of Social Isolation in
> the Elderly**
> Recognising signs of social isolation in older people without labelled data.
> *Artificial Intelligence in Medicine · 29 citations*
>
> **2023 · Query-Guided Networks for Few-Shot Fine-Grained Classification and
> Person Search**
> Finding a person again, or telling very similar categories apart, from very
> few examples.
> *Pattern Recognition · 39 citations*

**[RIUSATO]** — `site.ts` → `en.research.scholarLabel`

> Full list on Google Scholar →

**[TRADOTTO]** — `testi.md`, `/ricerca`, secondo link

> The code on GitHub →

## Perché ogni articolo esce con il codice

**[TRADOTTO]** — `testi.md`, `/ricerca`, chiusura

> ## Why every paper comes out with the code
>
> A paper that comes out with the code can be redone from scratch: anyone
> downloads the repository, runs the experiments and gets the same numbers.
> It's how I worked for every publication, and it's the same thing I bring to
> projects: what I hand over opens, reads and runs.

## Blocchi riusabili che oggi non hanno un posto

**[RIUSATO]** — `site.ts` → `en.research.openSource`

> Every result below is fully open source: each paper ships with its complete
> implementation.

**[RIUSATO]** — `Research.astro`, le sei descrizioni inglesi dei repository

> **MoCoDAD** · *ICCV 2023* — Diffusion model over skeleton motion for video
> anomaly detection.
>
> **PREGO** · *CVPR 2024* — Online mistake detection in procedural egocentric
> video.
>
> **COSKAD** · *Pattern Recognition* — Contracting skeletal kinematics for
> human-related anomaly detection.
>
> **hycoclip** · *ICLR 2025* — Compositional entailment learning for hyperbolic
> vision-language models.
>
> **hyp2nav** · *IROS 2024* — Hyperbolic planning and curiosity for crowd
> navigation.
>
> **BestPractices2Body** · *CVPR Workshop* — Best practices for two-body human
> pose forecasting.

> **Nota.** Queste sei descrizioni parlano dei **repository**, non degli
> articoli: sono un elenco diverso da «Le pubblicazioni» e infatti dicono altre
> cose (i dieci articoli hanno descrizioni proprie, tradotte sopra). La pagina
> italiana `/ricerca` non ha un elenco di repository: ha un solo link, «Il
> codice su GitHub». Se vuoi tenere il blocco dei sei repository sul sito
> inglese, è inglese tuo e si riusa così com'è; altrimenti resta fuori insieme
> alla riga sull'open source.

---

# 6. `/en/about`

Fonti: `testi.md` §`/chi-sono` e `src/data/chiSono.ts`; `site.ts` →
`en.about` per l'inglese già scritto.

## Apertura

**[RIUSATO]** — `site.ts` → `en.about.title`

> About

**[TRADOTTO]** — `testi.md`, `/chi-sono`, titolo di pagina

> # Alessandro Flaborea

## La biografia — due versioni, ne va scelta una

**[RIUSATO]** — `site.ts` → `en.about.body`, i cinque paragrafi, alla lettera

> I build AI systems that understand the physical world.
>
> As CTO and Co-Founder of Procedo, I lead the technology behind turning raw
> shop-floor video into structured manufacturing knowledge: extracting
> step-by-step procedures from operational video, grounded question-answering
> over a company's own documentation, and AI assistants that help industrial
> teams document, optimize, and train their work. It's the point where my
> research finally became a product people use every day.
>
> That research is where the story starts. I recently completed a PhD at the
> Perception and Intelligence Lab (PINlab) at Sapienza University of Rome,
> working on Anomaly Detection, Action Recognition, Procedural Learning, and
> Hyperbolic Neural Networks. Along the way I spent time in Amsterdam as a
> visiting researcher, and published at top AI and computer vision venues
> including CVPR, ICCV, and IROS, as well as journals such as Pattern
> Recognition and Artificial Intelligence in Medicine.
>
> I've always had the urge to build something of my own. Before Procedo I
> co-founded HomeSweatHome, an AI virtual trainer that coaches people through
> their workouts in real time. I was also invited to speak at Ferrari S.p.A.'s
> Data Science Hub on generative AI and computer vision use cases.
>
> The common thread through all of it is curiosity: for new problems, new
> places, and new people. It has taken me from Udine to Rome, and from
> Gothenburg to Amsterdam, and it is the same thing that pulls me toward
> whatever I build next.

**[TRADOTTO]** — `chiSono.ts` → `paragrafi`, i cinque paragrafi italiani
approvati

> I started in Udine, with a degree in computer science and six months in
> Sweden that took away any idea of staying put. Then Rome: a master's in data
> science and a PhD at Sapienza's Perception and Intelligence Lab, where I
> spent three years on a problem that can be summed up like this — teaching a
> computer to watch somebody working and understand what they're doing.
>
> In the middle, a winter in Amsterdam working on a geometry different from the
> one we're used to, and four years in the classroom as a teaching assistant,
> which is where I found out that explaining something difficult to somebody
> who doesn't know it is a trade of its own.
>
> That research then became a product. I co-founded Procedo and was its CTO for
> two years: video shot on the shop floor turning into written procedures,
> inside real companies, with customers who paid and complained when something
> didn't work. That's where I learned the part you don't learn at university,
> which is how much of what you write in a paper survives contact with a
> factory floor.
>
> I left the operational role in mid-2026 and today I work on my own. The
> reason is simple: I like the part where you walk into a company you don't
> know, look at how it works and see where the time goes. In a company that's
> growing, that part keeps getting smaller.
>
> I still write code every day and publish what I learn. If you call me, the
> person who comes to your company and the person who then builds it are the
> same one.

> **Nota — le due versioni non possono stare sulla stessa pagina.** Il tuo
> inglese esistente e l'italiano approvato dicono cose diverse, e in due punti
> si contraddicono:
>
> - **Il tempo verbale.** `en.about.body` dice *«As CTO and Co-Founder of
>   Procedo, I lead the technology…»*, al presente. L'italiano approvato dice
>   che il ruolo operativo è finito a metà 2026 e che oggi lavori per conto
>   tuo. Sulla home inglese la stessa cosa è già scritta come «from 2024 to
>   2026». Riusare i cinque paragrafi alla lettera significa pubblicare un
>   sito in cui la home dice che il ruolo è finito e la pagina «About» dice che
>   è in corso.
> - **Cosa vendono.** I cinque paragrafi inglesi sono la biografia di un
>   ricercatore-costruttore: chiudono su «whatever I build next». I cinque
>   italiani sono la biografia di un consulente: chiudono su «la persona che
>   viene in azienda e la persona che poi costruisce sono la stessa», che è
>   l'argomento di vendita dell'intera pagina.
>
> Ho lasciato entrambe le versioni marcate e intatte, senza ritoccare la tua.
> La scelta è tua. Se tieni la versione inglese esistente, va corretto almeno
> il secondo paragrafo, e a quel punto non è più riuso alla lettera.

## In breve

**[TRADOTTO]** — `chiSono.ts` → `inBreve`

> **In brief**
>
> - PhD in computer vision, Sapienza
> - Ten published papers, the code for every one that could be opened
> - Two years as CTO of an industrial startup
> - Four years of teaching at university

**[TRADOTTO]** — `testi.md`, `/chi-sono`, i tre richiami

> Book the diagnostic half-day · Download my CV · What I've built

## Abitudini

**[TRADOTTO]** — `chiSono.ts` → `abitudini`

> How I work, concretely
>
> ## Habits worth knowing about first
>
> ### I start with the hard part
> In projects I take on first the thing that might not work. It costs a few
> extra weeks at the start and saves months when the answer is no.
>
> ### I write everything down
> Every technical decision ends up in a document that somebody who doesn't
> program can read too. It's there for you if one day the work passes to
> somebody else.
>
> ### I say when it's better to stop
> Sometimes the right thing to do is smaller than what was asked for, or
> shouldn't be done at all. I'd rather lose a project than deliver a useless
> one.

## Fuori dal lavoro

**[TRADOTTO]** — `testi.md`, `/chi-sono`

> **Outside work**
>
> The thread that holds it all together is curiosity, for new problems, new
> places and new people. It took me from Udine to Rome and from Gothenburg to
> Amsterdam, and it still decides what I build at weekends.

> **Nota.** È quasi la stessa frase di `en.about.body[4]`, che però chiude su
> *«…the same thing that pulls me toward whatever I build next»* invece che sui
> fine settimana. Se scegli la biografia inglese esistente, questo blocco la
> ripete: se ne tiene uno solo.

## Segnaposto

Il riquadro della foto (`[ LA TUA FOTO ]`) e la sua didascalia in `testi.md`
sono un'istruzione per te, non testo pubblicato: non hanno bisogno di una
versione inglese.

---

# 7. `/en/your-data`

Fonti: `testi.md` §`/i-vostri-dati` e `src/data/dati.ts`. Nessun inglese di
partenza: tutta tradotta.

## Apertura

**[TRADOTTO]** — `dati.ts` → `rispostaCorta`

> Your data
>
> # Where your data ends up
>
> It's the question almost nobody asks out loud and almost everybody asks
> themselves. This page answers at length, without generic reassurance, so you
> can decide before signing anything.
>
> **The short answer**
> Your files stay yours and nobody uses them to train anything. What I build
> lives on infrastructure registered to you; the documents you give me to
> understand the problem stay on my computer, and at the end of the job I
> delete them.
>
> Below is the long version, which is the one that counts: the things you have
> just read need checking, and here is how.

## Situazioni che vengono confuse spesso

**[TRADOTTO]** — `testi.md`, `/i-vostri-dati`, titolo e introduzione

> ## Situations that often get confused
>
> The risk changes enormously depending on what you're doing. Keeping them
> apart is already half the answer.

**[TRADOTTO]** — `dati.ts` → `situazioniDati[0]`

> **1 · When somebody in the office uses ChatGPT on their own**
>
> It's the most common situation and the least controlled. What happens depends
> almost entirely on which version is being used: personal subscriptions and
> business ones treat data differently, and in some cases the content of the
> conversations can be used to improve the service, unless somebody goes into
> the settings.
>
> The thing to do isn't to ban the tool, because it would get used anyway, out
> of sight. It's to look together at which versions are in use, at what their
> terms say today, and to write two lines of internal rule that people can
> actually follow.

**[TRADOTTO]** — `dati.ts` → `situazioniDati[1]`

> **2 · When I build something for you**
>
> Here the control is total, because we make the choices ourselves. The data
> sits on infrastructure registered to your company, in Europe, with the
> credentials in your hands. If the relationship ends tomorrow, I step out and
> the system stays on.
>
> **Separation per customer.** Every company has its own data isolated from the
> others, and the separation is enforced by the database, not by the program
> running on top of it. It's the difference between a rule you can get round by
> mistake and one you can't.
>
> **Only the bare minimum leaves.** If an external model is needed, it gets the
> piece of information required to answer, not the archive. In the parts
> portal, for instance, the end customer sees the geometry they need to
> recognise the part and not the machine's complete model.
>
> **Access log.** Who saw what and when stays written down. It's there for the
> day somebody asks.
>
> **Deletion on request.** When the job ends, the data you gave me is deleted
> and I confirm it to you in writing.

**[TRADOTTO]** — `dati.ts` → `situazioniDati[2]`

> **3 · When you give me documents so I can understand the problem**
>
> For the diagnosis I need real files, not cleaned-up examples: an export from
> your management system, a list of items, a few working documents. Depending
> on the company they can be drawings, price lists, production sheets,
> contracts or simply emails. They stay on my computer, they don't end up in
> any external service, and at the end of the job I delete them. If you'd
> rather, we can sign a confidentiality agreement before the first meeting even
> happens: I don't take it badly, it's a reasonable request.
>
> When fake data is enough to find out whether something works, I use fake
> data. It happens more often than people think.

## Quello che non posso garantirvi

**[TRADOTTO]** — `dati.ts` → `quelloCheNonPossoGarantirvi`

> Honesty
>
> ## What I can't guarantee you
>
> - I don't control what external providers do with their own systems. I can
>   choose them, configure them and read you their terms, but their rules are
>   written by them and change over time.
> - No configuration holds if credentials get passed around in chats. The most
>   fragile part of any system is people's habits, and it's also why I insist
>   on training.
> - I'm not a lawyer. On contracts and formal obligations your own adviser has
>   the last word, and is right to have it.

## Su questo ho lavorato davvero

**[TRADOTTO]** — `dati.ts` → `suQuestoHoLavoratoDavvero`

> Why you'd believe me
>
> ## I've actually worked on this
>
> At Procedo every industrial customer had their own data isolated from the
> others, and it's a requirement you design in at the start or you never get.
> In the parts portal, protecting intellectual property is a section of the
> project, decided before writing any code: for a machine builder, handing a
> supplier the drawings of their own machines is the most delicate thing there
> is. The same holds for a distributor's price lists, for a practice's client
> records, or for the recipes of somebody who manufactures.
>
> The same rules apply to the things I build for myself: the security sits in
> the database and the program is treated as if it were untrustworthy, because
> sooner or later it will be.
>
> If you're looking at this page because somebody has told you about the AI
> Act: the part concerning staff training has been in force since February
> 2025, and you'll find it explained without alarmism on the training page.
>
> Go to the training → · The four ways of working together →

## Chiusura

**[TRADOTTO]** — `testi.md`, `/i-vostri-dati`

> ## Ask me the question this page doesn't answer
>
> If it's a good question it ends up on this page, so the next company finds it
> already written.
>
> Write to me

> ### Nota — contenuto costruito per il mercato italiano
>
> 1. **La domanda che la pagina risponde è una preoccupazione locale.** «È la
>    domanda che quasi nessuno fa ad alta voce» descrive un rapporto italiano
>    fra PMI e fornitore. Un lettore anglosassone che si preoccupa dei dati si
>    aspetta un'altra forma: DPA, sub-processor, dove sono i server, chi ha
>    firmato cosa. La pagina risponde bene, ma risponde a domande che non gli
>    sono state insegnate a fare in quest'ordine.
> 2. **«In Europa»** è un argomento di vendita in Italia e in Europa. Per un
>    cliente statunitense o britannico può essere neutro o addirittura un
>    problema (residenza del dato fuori dal proprio paese).
> 3. **«Il vostro consulente ha l'ultima parola»** presuppone il commercialista
>    o il consulente di fiducia, figura che nel mondo anglosassone non ha lo
>    stesso ruolo. L'ho reso *your own adviser*, che è più vago dell'italiano.
> 4. **«Un accordo di riservatezza»** → *confidentiality agreement*: fuori
>    d'Italia si direbbe NDA, ed è una parola che il lettore si aspetta di
>    vedere.
> 5. **Il richiamo finale all'AI Act** riporta il problema segnalato per
>    `/en/training`: è una norma europea su una pagina che parla a chiunque.

---

# 8. `/en/notes`

Fonti: `testi.md` §`/note` e `src/data/note.ts`. Nessun inglese di partenza.

## Apertura

**[TRADOTTO]** — `testi.md`, `/note`

> Notes
>
> # What I'm learning
>
> I write about what works inside companies and about what hasn't worked. In
> Italian, short, roughly once a week.
>
> Who writes this →

> **Nota — questa frase, sul sito inglese, si contraddice da sola.** «In
> italiano» tradotto è *«In Italian»*: la pagina inglese annuncia che le note
> sono in un'altra lingua. È una decisione che devi prendere tu, e sono tre:
> tradurre anche gli articoli (che oggi non esistono nemmeno in italiano),
> lasciare l'elenco in inglese e gli articoli in italiano dichiarandolo, oppure
> non pubblicare `/en/notes` finché non c'è materiale in inglese. Io ho
> tradotto fedelmente e segnalo.

## Le note

**[TRADOTTO]** — `note.ts`, le sei voci

> **25 Aug 2026 — What the AI Act actually asks of small companies**
> Since 2 February 2025, anyone using artificial intelligence tools has to
> ensure a minimum level of staff training and be able to demonstrate it. A
> good part of what you read around is alarmism from people selling courses:
> here is the text of Article 4, what it means for a company of thirty people,
> and what can be done in half a day.
> `Rules` `5-minute read`
>
> **18 Aug 2026 — Why I built the hard piece first**
> In a project for a machine builder the most uncertain part was converting the
> CAD models. I took it on before the rest, with eighty tests. If it hadn't
> worked we'd have known three weeks later, while changing course was still
> easy.
> `How I work` `Manufacturing`
>
> **11 Aug 2026 — What happens to your data when you paste a quote into
> ChatGPT**
> The answer depends on which version is being used and how it's configured,
> and inside a company almost nobody knows. Three things you can check in ten
> minutes.
> `Risks` `5-minute read`
>
> **4 Aug 2026 — Half the requests I get are solved without artificial
> intelligence**
> Often the problem is that a piece of information the company already has
> can't be retrieved when it's needed. Fixing that costs less and should have
> been done first anyway.
> `Opinions`
>
> **28 Jul 2026 — Six CVs from two text files**
> When the facts are written down once, the variants become subtractions from
> that text and stop being copies to keep aligned by hand. A small example of a
> principle that holds for bills of materials too.
> `Workshop`
>
> **21 Jul 2026 — Three things I often get asked for and usually advise
> against**
> The chatbot on the website, the model "trained on our data" and the dashboard
> nobody opens. Why they get asked for, where they jam, and what can be done
> instead.
> `Opinions`

**[DA SCRIVERE]** — **il testo delle sei note**. Esistono titolo e sommario, in
italiano; gli articoli non esistono in nessuna delle due lingue. Sul sito
italiano il problema è già aperto; su quello inglese si somma alla scelta di
lingua qui sopra.

## Iscrizione

**[TRADOTTO]** — `testi.md`, `/note`, chiusura

> ## I'll send them to you by email
>
> One email when something new comes out, nothing else. You unsubscribe with
> one click.
>
> `your@email.com` — Sign me up
>
> Or via RSS

---

# Riepilogo

## Conteggio

| Marca | Blocchi |
|---|---|
| `[RIUSATO]` | **18** |
| `[TRADOTTO]` | **83** |
| `[DA SCRIVERE]` | **7** |
| **Totale** | **108** |

Un «blocco» è un'unità marcata di questo documento: a volte una riga (un
richiamo, un'etichetta), a volte un gruppo che viene sempre insieme (i cinque
paragrafi della biografia, i quattro campi di un case study, le sei note).

Per pagina:

| Pagina | Riusati | Tradotti | Da scrivere |
|---|---|---|---|
| `/en/` | 2 | 25 | 2 |
| `/en/services` | 1 | 9 | — |
| `/en/training` | — | 7 | — |
| `/en/work` (+ `[slug]`) | 10 | 18 | 4 |
| `/en/research` | 3 | 7 | — |
| `/en/about` | 2 | 6 | — |
| `/en/your-data` | — | 8 | — |
| `/en/notes` | — | 3 | 1 |

Il riuso è concentrato dove il vecchio portfolio e la nuova struttura si
sovrappongono davvero: i case study dei progetti e le etichette di sistema. Le
pagine nuove — servizi, formazione, dati, note — non avevano inglese di
partenza, e infatti sono tradotte per intero.

## I sette `[DA SCRIVERE]`

| # | Dove | Cosa manca |
|---|---|---|
| 1 | `/en/` piè di pagina | La partita IVA (`P. IVA [DA INSERIRE]`, già aperto in italiano). |
| 2 | `/en/` piè di pagina | Le pagine **Privacy** e **Cookies**: i link ci sono, le pagine no, in nessuna delle due lingue. |
| 3 | `/en/work/portale-ricambi` | L'**Approach**. L'italiano approvato dedica al progetto tre frasi, già consumate da summary, problem e result. |
| 4 | `/en/work/tire-hub` | Il **Result**. Stessa ragione: due frasi in tutto. |
| 5 | `/en/work/paesello` | Problem, approach e result: Paesello non è in `projects.ts` e non ha un case study nemmeno in italiano. |
| 6 | `/en/work/…` (video) | Problem, approach, result **e il nome inglese** di «Una storia in più scene». *A story across several scenes* è la mia resa, non un nome scelto da te. |
| 7 | `/en/notes` | Il testo delle sei note. Esistono titolo e sommario; gli articoli non esistono in nessuna lingua. |

I punti 3 e 4 sono esattamente i due progetti il cui inglese in `projects.ts` è
testo non approvato. Ignorandolo, i due buchi che l'italiano ha sempre avuto
tornano a vedersi: sono buchi veri, non un effetto della traduzione.

## Contenuti che stonano fuori dall'Italia

Le note per esteso stanno alla fine delle rispettive pagine. Qui l'elenco, dal
più grave.

1. **I fondi interprofessionali** (`/en/training`). «Le aziende con dipendenti
   versano già lo 0,30% del monte salari a un fondo come Fondimpresa»: il
   meccanismo **fuori d'Italia non esiste**. Riguarda una delle tre strade di
   finanziamento e uno dei tre formati di corso, cioè un blocco su tre della
   pagina.
2. **Enti accreditati e catalogo regionale** (`/en/training`). L'accreditamento
   regionale della formazione è un istituto italiano; in inglese restano parole
   comprensibili che descrivono un sistema che il lettore non ha.
3. **Le note sono in italiano** (`/en/notes`). La pagina inglese dice di sé
   «In Italian, short, roughly once a week». O si traducono gli articoli, o si
   dichiara la cosa apertamente, o la pagina non si pubblica.
4. **L'AI Act** (`/en/training`, `/en/your-data`, home). È europeo, quindi
   regge per un lettore dell'Unione, ma è la leva di vendita più visibile del
   sito e per un lettore americano o britannico è una regola che non lo
   riguarda.
5. **Tutto ciò che presuppone la presenza fisica** (`/en/services`,
   `/en/training`). «Vengo in azienda», «una mattina», «una sala e un
   proiettore», «un reparto alla volta»: l'offerta è costruita su una visita in
   sede, e per un lettore fuori Italia è la prima cosa che non torna. L'italiano
   non dice mai entro quale raggio, quindi non l'ho aggiunto.
6. **Le formule contrattuali italiane** (`/en/services`). Il «canone di
   servizio» reso *service retainer*; il «preventivo con le voci separate»,
   che in Italia è un documento con una forma riconoscibile; la partita IVA nel
   piè di pagina, obbligo italiano che su un sito inglese non comunica nulla e
   che comunque non si può togliere.
7. **La forma della preoccupazione sui dati** (`/en/your-data`). La pagina
   risponde benissimo alle domande che fa una PMI italiana; un lettore
   anglosassone si aspetta DPA, sub-processor, NDA, residenza del dato. «In
   Europa» per lui può essere neutro o addirittura un difetto. E «il vostro
   consulente ha l'ultima parola» presuppone il commercialista di fiducia.
8. **Dettagli minori, tutti difendibili.** «Bruno» sulla home è un archetipo
   italiano e funziona lo stesso in inglese; *contrada* va glossata come fa già
   il tuo inglese; «Ragione sociale» → *registered name*.

## Preoccupazioni

1. **`en.about.body` contraddice l'italiano approvato.** Il tuo inglese dice al
   presente che guidi la tecnologia di Procedo; l'italiano dice che hai
   lasciato il ruolo operativo a metà 2026, e la home inglese scrive «from 2024
   to 2026». Ho lasciato le due versioni una accanto all'altra su `/en/about`,
   intatte e marcate: ne va pubblicata una sola. Riusare quella esistente alla
   lettera significa pubblicare un sito che si contraddice in due punti.
2. **Lo stesso problema, più piccolo, in `procedo.en.summary`**: è al presente e
   non dice che il ruolo è finito, mentre la scheda italiana dice «oggi la
   seguo come advisor».
3. **Riusare `en.hero` alla lettera sposta il posizionamento.** «From research
   to product: I build AI systems that work in the real world» è il portfolio
   del ricercatore; l'h1 italiano è la promessa del consulente. Se il sito
   inglese deve vendere la stessa cosa dell'italiano, l'h1 va tradotto — è
   quello che ho fatto — e il vecchio hero resta inutilizzato.
4. **Tre blocchi di inglese tuo non hanno un posto nella nuova struttura**:
   le quattro *capabilities* (`en.services`), la riga sull'open source
   (`en.research.openSource`) e le sei descrizioni dei repository in
   `Research.astro`. Sono riusabili alla lettera e li ho messi dove
   starebbero, ma la struttura italiana non prevede quelle sezioni: vanno
   tenute in più o lasciate fuori. Non ho deciso io.
5. **`soloItaliano: true` va tolto quando questo testo è approvato.** I due
   progetti oggi esclusi dalle rotte inglesi hanno qui una traduzione
   dall'italiano approvato: appena la validi, il campo perde la sua ragione
   d'essere e i campi `en` non approvati in `projects.ts` vanno **sostituiti**,
   non affiancati.
6. **Il campo `name` dei progetti è unico per entrambe le lingue.** «Portale
   ricambi 3D» sul sito inglese resta italiano finché il campo non si sdoppia.
   Vale anche per il video, che un nome proprio non ce l'ha in nessuna lingua.
7. **Paesello e il video non sono in `projects.ts`.** Esistono solo come schede
   su `/lavori`. Se `/en/work` li mostra, o restano schede senza pagina, o
   qualcuno scrive i due case study — e non c'è italiano da cui tradurli.
