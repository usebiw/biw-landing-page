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

`sharp` is a devDependency required by `astro:assets` `<Image>` for the remote Unsplash photos in `ProjectShowcase.astro` — `astro.config.mjs` allowlists `images.unsplash.com` under `image.remotePatterns`. Any other remote image host needs the same allowlisting or the build fails at the "generating optimized images" step.

## Architecture

Astro 7 (static output) + React islands + Tailwind v4 (`@tailwindcss/vite`, not the `astro add tailwind` v3 integration). Marketing landing, bilingual (es/en), with light/dark themes — not an app, no auth.

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

`src/content.config.ts` defines the collections (`site`, `hero`, `pillars`, `modules`, `roles`, `flows`, `facts`, `security`, `roadmap`, `faqs`), every one carrying a `locale: 'es' | 'en'` field. `site`/`hero` are **singletons** loaded with the `file()` loader as a locale-keyed map in one file — `src/content/site.json` is `{"site-es": {...}, "site-en": {...}}`, fetched via `getEntry('site', \`site-${locale}\`)`. Every other collection uses `glob()` over `src/content/<name>/**/*.json`: the Spanish file keeps its plain name (`modules/avance.json`) and the English sibling adds `.en` (`modules/avance.en.json`); both carry the same `order`, and `roles/*.json` additionally carries a stable `roleKey` (e.g. `ingeniero-residente`) that's identical across its es/en pair — components key off `roleKey`, never off the localized `name`, whenever they need to correlate a role across locales (see `ProductDemo.tsx`).

Content was authored from a Notion spec excerpt pasted into the original build request — **Notion MCP was not authenticated during this build**, so nothing here was re-verified against the live Notion pages, in either language. Treat `src/content/**/*.json` as provisional until someone re-runs a content pass with Notion connected. Known placeholders needing real values: `site.json`'s `whatsappNumber` and `ogImage` (needs an actual 1200×630 asset) in both locale entries, and `PUBLIC_DEMO_ENDPOINT` (no env var set — `DemoCta.tsx` degrades to a local-success simulation when it's absent).

UI chrome that isn't "content" — section headings/intros, aria-labels, form labels, validation messages — lives in the dictionary at `src/lib/i18n.ts` (`useTranslations(locale)` → `t('some.path')`), not in content collections and not inlined in components. `src/lib/validation.ts` returns dictionary **keys** (e.g. `"form.validation.emailInvalid"`), never literal strings — callers translate with `t()`.

### Theming: CSS custom properties, not per-component light/dark classes

Dark is the default/original committed identity (from the production login screen); light is a real, fully-repainting alternate — not a per-section tweak. The mechanism is `[data-theme]` on `<html>`, toggled client-side (`ThemeToggle.astro`, persisted to `localStorage['biw-theme']`, applied pre-paint by a blocking inline script in `BaseLayout.astro` to avoid a flash) and a matching set of CSS custom properties in `src/styles/global.css` (`--surface-canvas`, `--surface-raised`, `--surface-card[-strong]`, `--text-primary`, `--text-secondary`, `--border-hairline[-strong]`, `--glass-*`). **Any new color on a surface that should track the toggle must be one of these `var(--x)` classes (e.g. `bg-[var(--surface-canvas)]`, `text-[var(--text-primary)]`) — a literal `bg-ink-950` or `text-white` on such a surface will not repaint when the user switches themes**, since Astro components render once at build time and can't re-choose a Tailwind class at runtime.

One spot is intentionally NOT theme-reactive, by design, not oversight: `Pillars.astro`'s "Control de obra" manifesto block (always dark, as a fixed accent card). Don't "fix" it to use the vars. (`RolesSection.astro` used to be a second fixed-light exception; it was converted to dark + theme-reactive on 2026-09-15 by explicit request.)

### Component layers (atomic design)

`src/components/{atoms,molecules,organisms,templates}` + `src/components/seo/*`. Atoms and molecules are `.astro` only, no domain knowledge, styled from the tokens/vars above (base palette in `@theme`: `ink-950/900/800`, `biw-400/500/600`, `mist-50/100`, `slate-500`, `signal-500`; fonts `Archivo Variable`/`Montserrat Variable`). `LandingTemplate.astro` assembles all 15 organisms in scroll order; each locale's `index.astro` wraps it in `BaseLayout` + `Seo` + `JsonLd`.

Only two React islands exist, both deliberately not `client:load`, both taking `locale` as a prop (they can't call `Astro.currentLocale` themselves):
- `ProductDemo.tsx` (`client:visible`) — the per-role synthetic dashboard demo, roles looked up by `roleKey`.
- `DemoCta.tsx` (`client:idle`) — the "Contáctanos"/"Contact us" form, validated by `src/lib/validation.ts`.

Everything else is Astro with no framework runtime. Expandable module rows and FAQ are native `<details>` (zero JS). Small vanilla `<script>`s: `ThemeToggle` (circular View-Transition reveal + persist), `Carousel` (arrows/segments/keys/active slide), `SiteHeader` (scroll-spy + scrolled glass), `ApprovalFlows` (tabs), `FactsBand` (count-up), `ProjectShowcase` (photo skeleton → loaded), `RouteLoader` (navigation waiting state), `BaseLayout` (blocking pre-paint theme init + `[data-spotlight]` cursor light). All multi-instance-safe via `data-*` selectors, never page-unique ids.

### ClientRouter: scripts run once per session, not per page

`BaseLayout.astro` mounts `<ClientRouter />`, so ES ↔ EN and landing ↔ privacy navigations swap the DOM in place instead of reloading. **Bundled `<script>`s execute once for the whole session.** Any per-page setup (querying elements, observers, listeners on page nodes) must run inside `document.addEventListener('astro:page-load', …)` and tear down its previous run (the existing scripts use an `AbortController` aborted at the start of each `page-load`); anything global should be a single delegated `document` listener (see `ThemeToggle`, the spotlight in `BaseLayout`). A plain top-level `querySelectorAll(...).forEach(init)` works on first load and silently dies after the first language switch.

The router copies the incoming `<html>` attributes over the live one, which would wipe `data-theme` — `RouteLoader.astro` re-applies it in `astro:before-swap`. `RouteLoader` also owns the waiting state (no spinner): `html[data-navigating]` frosts `main`/`footer` (global.css) while a skeleton of the hero shimmers on top and a persisted (`transition:persist`) progress bar sweeps the top edge; the loader is wrapped to stay visible ≥420ms (0 under reduced motion) so prefetched switches don't flash, and links marked `data-locale-switch` keep the reader's relative scroll depth.

### Design rules baked into the code (violating these is a regression, not a style choice)

- **This landing has no login button or link, anywhere** (2026-09-14 product decision) — no customer-facing auth entry point exists on this surface. Don't reintroduce one without being asked.
- **The primary CTA is "Contáctanos"/"Contact us"**, not "Solicitar demo"/"Request a demo" (renamed 2026-09-14) — keep the dictionary key names (`header.cta`, `form.submit`, etc.) and just edit their text if the copy needs to change again.
- **`signal-500` (orange) is reserved exclusively for the two budget-instrument gates** (80% execution warning, 110% block) inside `ProductDemo.tsx`/`Hero.astro`. Nothing else — "Beta", "Próximamente", "Datos de ejemplo" — may use it; `StatusPill`'s `info`/`neutral` tones and `Badge`'s `blue`/`neutral` tones exist specifically so nothing reaches for orange out of convenience. A finish review caught this once already; a later pass caught the same mistake creeping back into a "Beta" pill and fixed it again — grep for `tone="warning"` / `tone="blocked"` before adding a new one.
- **No eyebrow/kicker above any heading**, anywhere. `Eyebrow.astro` was deleted for this reason — don't reintroduce the pattern.
- **No section may repeat "N identical icon+heading+paragraph cards" as its entire structure.** `Pillars` (manifesto + 2), `SecuritySection` (sticky isolation visual + list), `FactsBand` (budget-gate gauge + fact list), and `AiRoadmap`/`ModulesList`/`Faq` (rows inside one glass panel) are the precedent. `RolesSection.astro` is the one deliberate exception: 5 equal role cards inside `Carousel.astro` (explicit user request, 2026-09-15) — the carousel supplies the rhythm a static grid wouldn't. A 2×2 roadmap card grid was tried and reverted for this reason.
- **`GlassPanel`/`.glass*` utilities require a `.glow-sphere` (or equivalent blue glow) behind them.** Glass over a flat background is decorative glass, which is banned — it's only ever used where the blur has something to refract.
- **`Logo.astro`'s `tone` prop is `'auto' | 'onDark' | 'onLight'`**, default `auto` (tracks the live theme via CSS vars) — not a build-time `'dark' | 'light'` choice. It was renamed after a real bug where the old naming caused the wordmark to render invisible (dark text on the dark ground). Pass `onDark`/`onLight` only to force a fixed color on a surface that deliberately never repaints (none currently do).
- **`Icon.astro`'s glyph map only covers named icons** — passing a `content.icon` string that isn't in the map silently falls back to a checkmark. When a new content field drives an icon, add an explicit lookup dict at the call site (see `ModulesList.astro`'s `contentIconToGlyph`) rather than passing the raw string straight into `<Icon name={...}>`.
- **`RolesSection.astro` is dark** (2026-09-15) — it used to be a fixed-light `bg-mist-50` panel; that was removed by explicit request. Don't reintroduce a light section there.
- **`Carousel.astro`** (`src/components/molecules/`) is the shared horizontal scroll-snap carousel — native CSS snap does touch/momentum, the component's script only wires arrow buttons + dot indicators + arrow-key support via `closest('[data-carousel]')` scoping (supports multiple instances per page). Used by `RolesSection.astro` and `ProjectShowcase.astro`. Reuse it for any future slide-like content instead of hand-rolling scroll mechanics again. Slides are direct children of the default slot; the component doesn't care what they render, only that they're flex children (equal-height via default `align-items: stretch`).
- **Section headings are gradient (`SectionHeader.astro` → `Heading gradient` → `.text-gradient`)** by explicit user request (2026-09-15), as is the hero accent phrase (`.text-gradient-accent`). The Impeccable detector flags gradient text as slop on every run — that finding is expected here, don't "fix" it. Both utilities carry a small inline-end padding/negative margin because the -0.04em display tracking otherwise clips the last glyph out of `background-clip: text`.
- **Atmosphere (`molecules/Atmosphere.astro`) is what the glass refracts**: drifting 90px-blurred blue mesh blobs + masked dot grid + grain, first child of a `relative isolate overflow-hidden` section, content wrapper above it at `relative z-10`. `.glass-edge` (gradient hairline via masked `::before`, host must already be positioned) and `.spotlight` + `data-spotlight` (cursor light) are the glass finishing layers. A `backdrop-filter` nested inside another backdrop-filtered element (e.g. a dropdown inside the sticky header) can't blur the page behind it — give such surfaces a near-opaque canvas instead (see `.mobile-panel` in `SiteHeader`).
- **Glass is used more broadly than just the hero panel** — `Pillars` secondary cards, `FactsBand` tiles, and `RolesSection` carousel cards all carry `.glass-light`/`.glass-strong` (+ `.glass-interactive` for the hover lift). Blur is intentionally heavy (30–52px) — don't tone it down to a "subtle" frost.

### Product-truth constraints (from `PRODUCT.md`)

The copy must never claim: offline support, GPS geofencing, AWS/microservices as the *current* architecture, or invented customers/testimonials/usage numbers. AI features (WhatsApp bot, delay prediction, Vision AI, narrative reports) are roadmap-only and must stay visibly labeled "Próximamente". `PRODUCT.md` and the direction contract at `.impeccable/surfaces/src-pages-index-astro.md` are the sources of truth for what this product actually does — read them before adding a claim to the landing.

## Astro reference

- [Routing](https://docs.astro.build/en/guides/routing/) · [Components](https://docs.astro.build/en/basics/astro-components/) · [Framework components](https://docs.astro.build/en/guides/framework-components/) · [Content collections](https://docs.astro.build/en/guides/content-collections/) · [Styling](https://docs.astro.build/en/guides/styling/) · [i18n](https://docs.astro.build/en/guides/internationalization/)
