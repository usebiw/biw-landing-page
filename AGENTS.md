# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
pnpm dev            # astro dev
pnpm build           # astro check && astro build (type errors fail the build)
pnpm preview         # serve dist/ locally
pnpm check           # astro check only
pnpm lint            # eslint . (flat config: eslint.config.mjs, typescript-eslint + eslint-plugin-astro)
pnpm format          # prettier --write . (prettier-plugin-astro + prettier-plugin-tailwindcss)
pnpm test            # vitest run
```

Requires Node `>= 22.12.0` (see `package.json` `engines`). Use **pnpm**, not npm (`pnpm-lock.yaml` + `pnpm-workspace.yaml`) — `npm install` fails here with `Cannot read properties of null (reading 'matches')`.

Routes: `/` redirects to `/es`; `/es/` and `/en/` are the landing; `/es/privacidad` and `/en/privacidad` the privacy page; `/404` is locale-agnostic (defaults to es). `PUBLIC_DEMO_ENDPOINT` env var is the POST target for the contact form (`DemoCta.tsx`) — unset means it simulates success locally instead of calling a backend.

Run a single test file: `pnpm exec vitest run src/lib/validation.test.ts` (currently the only test file — tests cover form validation only, not components).

There is no CI config in this repo yet — `pnpm build` (which runs `astro check` first) is the closest thing to a full gate; run it, `pnpm lint`, and `pnpm test` before considering a change done.

`sharp` is a devDependency used by `astro:assets`. The landing currently ships no photos (stock imagery was removed on purpose — see DESIGN.md); when real job-site photos arrive, local files under `src/assets/` need no config, while any remote image host must be added to `image.remotePatterns` in `astro.config.mjs` or the build fails at "generating optimized images".

## Architecture

Astro 7 (static output) + one React island + Tailwind v4 (`@tailwindcss/vite`, not the `astro add tailwind` v3 integration). Marketing landing, bilingual (es/en), paper theme by default with an optional dark theme — not an app, no auth.

### i18n routing (read this before touching pages/)

Astro's built-in i18n (`astro.config.mjs`: `locales: ['es','en']`, `defaultLocale: 'es'`, `routing.prefixDefaultLocale: true`) infers `Astro.currentLocale` **from the page's folder name**, not automatically from a single file — it does NOT multiply one `src/pages/index.astro` into `/es/` and `/en/` on its own. Routes actually live at:

```
src/pages/es/index.astro       src/pages/en/index.astro
src/pages/es/privacidad.astro  src/pages/en/privacidad.astro
src/pages/_shared/HomePage.astro     ← real implementation
src/pages/_shared/PrivacyPage.astro  ← real implementation
src/pages/404.astro             ← locale-agnostic, defaults to es
```

The `_shared/` folder is excluded from routing (Astro ignores any `_`-prefixed path under `src/pages`), so both locale folders import and render the exact same component — never duplicate a page's logic into two files. `astro.config.mjs`'s `redirects: { '/': '/es' }` generates the root meta-refresh redirect. Adding a locale means: a new entry in `astro.config.mjs` i18n.locales, a new `src/pages/<locale>/` folder (thin wrappers only), an `<locale>` JSON sibling for every content entry, and a new column in the `src/lib/i18n.ts` dictionary.

Every organism/page reads `const locale = (Astro.currentLocale === 'en' ? 'en' : 'es') as Locale` and filters content with it — never render unfiltered `getCollection(...)` results, or both locales' entries show at once.

### Content is data, never hardcoded copy

`src/content.config.ts` defines the collections (`site`, `hero`, `comparison`, `modules`, `roles`, `steps`, `security`, `faqs`), every one carrying a `locale: 'es' | 'en'` field. `site`/`hero` are **singletons** loaded with the `file()` loader as a locale-keyed map in one file — `src/content/site.json` is `{"site-es": {...}, "site-en": {...}}`, fetched via `getEntry('site', \`site-${locale}\`)`. Every other collection uses `glob()` over `src/content/<name>/**/*.json`: the Spanish file keeps its plain name (`modules/avance.json`) and the English sibling adds `.en` (`modules/avance.en.json`); both carry the same `order` (and `roles/*.json` the same `roleKey`). `modules` also carries a `group` (`obra` | `dinero` | `gente` | `archivo`) that drives the budget-style 1.1, 1.2… numbering in `ModulesIndex.astro`.

Copy was rewritten on 2026-10-10 from what the BIW platform actually does today (the monorepo's root CLAUDE.md and production notes): progress with photos, chapter budgets with 80 %/110 % gates, AIU or full-VAT contracts, actas de corte with advance and retention, quantity requests, payroll from attendance with director-approved overtime, versioned documents, oficios, equipment and rentals. Voice is **usted**. Known placeholders needing real values: `site.json`'s `whatsappNumber` and `ogImage` (needs an actual 1200×630 asset) in both locale entries, `PUBLIC_DEMO_ENDPOINT`, and the legal entity data in `PrivacyPage.astro`. The onboarding steps (`src/content/steps/`) describe a service promise (migration help, pilot on one project, accompaniment) — confirm with the team before launch.

UI chrome that isn't "content" — section headings/intros, aria-labels, form labels, validation messages — lives in the dictionary at `src/lib/i18n.ts` (`useTranslations(locale)` → `t('some.path')`), not in content collections and not inlined in components. `src/lib/validation.ts` returns dictionary **keys** (e.g. `"form.validation.emailInvalid"`), never literal strings — callers translate with `t()`.

### Theming: semantic tokens, paper by default

**Paper (light) is the default theme**; dark is an opt-in alternate. The mechanism is `[data-theme]` on `<html>` (`light` | `dark`), set pre-paint by a blocking inline script in `BaseLayout.astro` from `localStorage['biw-theme']` (only an explicit `dark` switches it; the OS preference does not), toggled by `ThemeToggle.astro`, and carried across ClientRouter swaps by `RouteLoader.astro`. `src/styles/global.css` defines the runtime tokens (`--paper`, `--paper-2`, `--sheet`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, `--rule-strong`, `--accent`, `--accent-ink`, `--accent-soft`, `--signal`, `--signal-soft`) and exposes them through `@theme inline` as Tailwind utilities (`bg-paper`, `text-ink-2`, `border-rule`, `bg-signal-soft`…). **Any color on a surface that should follow the toggle must be one of these utilities** — a literal hex or `text-white` won't repaint, since Astro components render once at build time. Constant brand colors (`biw-400/500/600`, `signal-500/600`) live in `@theme` for the few places that must not flip.

### Component layers (atomic design)

`src/components/{atoms,molecules,organisms,templates}` + `src/components/seo/*`. Atoms: `Button`, `Heading`, `Icon`, `LanguageSwitcher`, `Logo`, `ThemeToggle`. Molecules: `SectionHead` (the numbered title strip every section opens with), `NavLink`, `FaqItem`, `RouteLoader`. Organisms, in scroll order (`LandingTemplate.astro`): `SiteHeader`, `Hero` (full first screen, + `BudgetSheet`), `SiteElevation` (full-bleed, scroll-built tower), `Comparison` (01, + `SCurve`), `SurveyTape`, `ModulesIndex` (02), `CorteSection` (03, + `StructuralDetail`), `RolesTable` (04), `Implementation` (05), `SecuritySection` (06), `Faq` (07), `ContactSection` (08, wraps the `DemoCta` island), `SiteFooter`. The section number is hardcoded in each organism's `SectionHead` — keep it in step with the template order.

One React island remains: `DemoCta.tsx` (`client:idle`, takes `locale` as a prop) — the contact form, validated by `src/lib/validation.ts`. Everything else is Astro with no framework runtime; FAQ is native `<details>`. Small vanilla scripts: `BaseLayout` (scroll reveal + count-up), `ThemeToggle` (delegated click + persist), `SiteHeader` (scroll-spy + scrolled shadow), `RouteLoader` (navigation waiting state). `src/lib/format.ts` formats COP amounts and quantities per locale for the sample sheets.

### ClientRouter: scripts run once per session, not per page

`BaseLayout.astro` mounts `<ClientRouter />`, so ES ↔ EN and landing ↔ privacy navigations swap the DOM in place instead of reloading. **Bundled `<script>`s execute once for the whole session.** Any per-page setup (querying elements, observers, listeners on page nodes) must run inside `document.addEventListener('astro:page-load', …)` and tear down its previous run (the existing scripts use an `AbortController` aborted at the start of each `page-load`); anything global should be a single delegated `document` listener (see `ThemeToggle`, the spotlight in `BaseLayout`). A plain top-level `querySelectorAll(...).forEach(init)` works on first load and silently dies after the first language switch.

The router copies the incoming `<html>` attributes over the live one, which would wipe `data-theme` — `RouteLoader.astro` re-applies it in `astro:before-swap`. `RouteLoader` also owns the waiting state (no spinner): `html[data-navigating]` fades `main`/`footer` (global.css) while a skeleton of the hero shimmers on top and a persisted (`transition:persist`) progress bar sweeps the top edge; the loader is wrapped to stay visible ≥420ms (0 under reduced motion) so prefetched switches don't flash, and links marked `data-locale-switch` keep the reader's relative scroll depth.

### Design rules baked into the code (violating these is a regression, not a style choice)

Full system in `DESIGN.md`. The direction ("documento de obra", 2026-10-10) exists because the owner felt the previous dark/glass version looked AI-generated. In short:

- **Banned on this surface:** glass/backdrop-blur panels, glowing spheres, film grain, gradient text or fills, carousels, grids of identical icon+heading+paragraph cards, icon-in-rounded-square tiles, centered "heading + gray paragraph" section openers, floating "Beta"/"Datos de ejemplo" badges, stock photography. These were all removed; don't reintroduce them.
- **Motion is purposeful** (see DESIGN.md → Motion): scroll reveal via `data-reveal`, documents that work (`data-bar`, `data-count`, `data-stamp`, `data-pop`), drawings that trace themselves (`data-draw`, `data-rise`). All armed only under `html[data-js]` (set by BaseLayout's inline script and re-applied in RouteLoader's `astro:before-swap`, or content would stay hidden after a locale switch) and off under reduced motion.
- **Ambient motion from the first version is back on purpose** (owner request, 2026-10-10), re-drawn for paper: `drift-blob`, `plan-grid`, `orbit`, `float-tag`, `live-dot`, `spotlight`/`data-spotlight`, `lift`, `btn-sheen`, animated nav underline and circular theme reveal. The old module marquee was replaced by the scroll-linked `SurveyTape` (owner: marquees read as AI-made) — don't bring a marquee back. Don't remove them as "AI patterns" — see DESIGN.md → Ambient motion.
- **Color bands:** `scope-ink` (Implementación) and `scope-blue` (Contacto) re-tint a section; `scope-paper` keeps a sheet paper-colored inside them.
- **Every section opens with `SectionHead`** (heavy ink rule, sheet number + name left, heading + intro right, left-aligned). Comparable things go in tables or ruled lists.
- **Product proof = the documents the buyer already uses** (`BudgetSheet`, the acta in `CorteSection`). Sample figures must add up and are labeled once inside the title block (`sample.note`).
- **`signal` (orange) is reserved for the budget gates** (80 % warning, 110 % lock) and quantities over contract. Nothing else may use it.
- **Uppercase only via `.sheet-label`**, only in document title blocks and signature boxes.
- **No login button or link anywhere** (2026-09-14 product decision).
- **The primary CTA is "Contáctenos"/"Contact us"** (usted form since 2026-10-10; was "Contáctanos"). Keep the dictionary keys (`header.cta`, `form.submit`, …) and only edit their text.
- **Voice is usted** across the landing, form messages and 404.
- **`Logo.astro`** uses the official PNGs (`public/brand/`); `tone` is `'auto' | 'onDark' | 'onLight'`, default `auto` (ink letters on paper, white letters under `[data-theme='dark']`). There is no vector of the real logo — never use `assets/brand/svg/` (old lockup).
- **`Icon.astro`'s glyph map only covers named icons** — an unknown name silently falls back to a checkmark.

### Product-truth constraints (from `PRODUCT.md`)

The copy must never claim: offline support, GPS geofencing, AWS/microservices as the *current* architecture, or invented customers/testimonials/usage numbers. AI features (WhatsApp bot, delay prediction, Vision AI, narrative reports) are roadmap-only; the landing currently doesn't mention them at all. `PRODUCT.md` is the source of truth for what this product actually does — read it before adding a claim to the landing.

## Astro reference

- [Routing](https://docs.astro.build/en/guides/routing/) · [Components](https://docs.astro.build/en/basics/astro-components/) · [Framework components](https://docs.astro.build/en/guides/framework-components/) · [Content collections](https://docs.astro.build/en/guides/content-collections/) · [Styling](https://docs.astro.build/en/guides/styling/) · [i18n](https://docs.astro.build/en/guides/internationalization/)
