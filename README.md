# alessandroflaborea.me

Personal portfolio site for Alessandro Flaborea — built with [Astro](https://astro.build), bilingual (English / Italian), deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) 5 (static output)
- Plain CSS (design tokens in `src/styles/tokens.css`, shared rules in `src/styles/global.css`)
- Bilingual routing: English at `/`, Italian mirrored under `/it/` (see `src/i18n/ui.ts`)

## Project structure

```
src/
  components/   # Nav, Footer, Hero, Services, WorkList, WorkRow, Research, About, Contact, LangSwitch, StackChip
  data/         # site copy (site.ts) and case-study content (projects.ts), per locale
  i18n/         # locale list + path helpers
  layouts/      # BaseLayout (head, meta, Nav/Footer wrapper)
  pages/        # index.astro (EN), it/index.astro (IT), work/[slug].astro + it/work/[slug].astro (case studies)
  styles/       # tokens.css (design tokens), global.css (shared rules)
public/         # static assets served as-is (favicon, CNAME)
```

## Development

```bash
npm install
npm run dev       # local dev server
npm run check     # type-check with astro check
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Deployment

Pushing to the deploy branch triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` via GitHub Actions to GitHub Pages. The custom domain is configured through `public/CNAME`.
