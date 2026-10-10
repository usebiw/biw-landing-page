# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro + React (islands) + Tailwind CSS v4 — decided by the user, not delegated.

## Users

The landing's visitor is not BIW's end user (construction-company staff) but the **buyer/decision-maker** evaluating BIW as a purchase: a company owner, ops director, or IT/PM lead at a mid-size construction firm, comparing tools to control and track active construction projects. They land here from a search, referral, or link, need to understand what BIW does and for whom in seconds, and decide whether to request a demo or log in (existing customer).

BIW's own product (what the landing sells, not what it is) serves five internal roles: Gerencia General (read-only + approvals, executive KPI dashboard), Director de Proyecto (approves payment orders/non-conformities/changes, manages contractor assignment), Ingeniero Residente (full edit: daily progress, evidence photos, incident reports, crew attendance), Área Financiera (budget by chapters, invoices, payment orders, cash flow), Contratistas/Externos (restricted: only their own assigned activities, contracts, payment status).

## Product Purpose

BIW (Building Integrated Workflow) is a platform for real-time control and tracking of construction projects, spanning the whole organization from executive management down to on-site residents. Three pillars: total visibility (real-time info at every org level), site control (precise tracking of progress, quality, and schedule per project), and decision-making (consolidated data for timely, evidence-based decisions).

## Positioning

Purpose-built for construction project control specifically — not a generic PM tool. Its mechanism: schedule progress is computed by a database trigger from daily site records (accumulated progress never regresses without director approval), with an automatic alert whenever schedule delay exceeds 5%; budget execution is tracked chapter-by-item with automatic 80%-execution alerts and a hard block at 110% without explicit approval; contractor "cortes" (progress-billing cuts) follow a DRAFT → IN_REVIEW → APPROVED flow with dynamic advance-payment amortization redistributed proportionally across pending cuts. Three-layer permissions (backend enforcement + seeded roles + UI gating) and per-company multitenancy by subdomain (`<slug>.usebiw.com`).

## Operating Context

Source of truth for all copy/features: the team's Notion spec ("Análisis técnico y funcional completo para el desarrollo de la plataforma de control y seguimiento de proyectos de construcción", updated 2026-09-03). Notion MCP was not authenticated during this build session — content was authored from the spec excerpt pasted into the original request (objective, 5 roles, 4 core modules: Seguimiento de Avance, Control Presupuestal incl. cortes de contratista, Gestión de Personal, Reportes y Evidencias) plus later sections referenced by the user (multitenancy, authorization, infra, module status, dev conventions, security) but not fully re-derived from the live Notion pages. **Flag: re-run content pass against live Notion once authenticated to confirm exact wording and catch anything the excerpt omitted.**

**Critical truth constraint (Notion decision, 2026-08-29): production launch is web-only.** Offline-first and GPS geofencing (originally planned for the mobile app) are explicitly dropped for this release. The landing must never claim offline support or geofencing as current/shipping capabilities.

AI integrations (WhatsApp bot, delay prediction, Vision AI, narrative reports) are roadmap items, not shipped features — must be labeled as upcoming, not sold as current.

AWS/microservices architecture is the stage-2 (post-MVP) destination; the current MVP runs as a modular FastAPI monolith on a Hostinger VPS (Docker Compose, MinIO, Caddy). The landing should not claim AWS/microservices as the current architecture.

## Capabilities and Constraints

- No contact-submission backend exists yet; the form must validate client-side and post to a configurable endpoint (`PUBLIC_DEMO_ENDPOINT` env var), left undecided/placeholder.
- No WhatsApp Business number supplied yet — placeholder in `site.json.whatsappNumber`.
- No production domain confirmed yet for the landing's canonical/sitemap; placeholder `https://biw.siteops.tech` still in `astro.config.mjs`. The product moved to `usebiw.com` on 2026-09-06 (tenants at `<slug>.usebiw.com`), so the landing will live under that domain — set `site` once the exact host is decided.
- Real customer logos, testimonials, and usage metrics do not exist yet — explicitly excluded, not to be fabricated.
- **No login button/link anywhere on the landing** (2026-09-14 decision) — this site has no customer-facing auth entry point; visitors act via the contact form or WhatsApp only.
- The primary CTA is **"Contáctenos"/"Contact us"**, not "Solicitar demo"/"Request a demo" (renamed 2026-09-14; usted form since 2026-10-10) — the form itself still gathers demo-relevant fields (company, role, active job sites), but the label and section framing are general contact, not a demo-specific ask.
- **Voice is usted** (2026-10-10): the buyer is a company owner or director at a construction firm; the landing speaks to them formally and in the sector's own vocabulary.
- **Bilingual (es/en), URL-routed** (2026-09-14): Astro i18n with `prefixDefaultLocale: true` — every page lives at `/es/...` and `/en/...`, `/` redirects to `/es/`. Content collections carry a `locale` field; UI chrome strings live in `src/lib/i18n.ts`. Adding a third locale means: a new value in `astro.config.mjs` i18n.locales, a new page folder under `src/pages/<locale>/`, a `<locale>` variant of every content JSON file, and a new column in the `src/lib/i18n.ts` dictionary.
- **Paper (light) theme by default, dark optional** (2026-10-10): the toggle persists to `localStorage` and repaints the whole site via semantic CSS tokens (`src/styles/global.css`). Replaces the earlier dark-by-default identity.

## Brand Commitments

- Name: **BIW** (Building Integrated Workflow). The logo is the official raster "BiW" with the blue dot on the i (`public/brand/`, same files as the web app). Brand colors from the manual: paper `#F5F5F2`, ink `#0B0D10`, logo blue `#003CFF`.
- **Direction: "documento de obra"** (2026-10-10, owner's request after feeling the previous version looked AI-generated). The landing must read as made by professionals of the sector: paper ground, ink type, hairline rules, the product shown through the documents a builder already uses (budget by chapter, acta de corte with signatures). Full system in `DESIGN.md`.
- Explicitly rejected: glassmorphism, glow spheres, gradient headings, carousels, tickers, card grids, stock photos, dev jargon (RLS, multitenancy, seeds) on the buyer-facing surface.

## Evidence on Hand

None. No real customer logos, testimonials, usage numbers, case studies, or press exist for BIW yet. The two reference images (login screen, Dribbble-style construction landing) are visual/structural references only, not content to reuse verbatim. All product visuals are sample documents labeled once in their title block ("Valores de ejemplo"), with figures that add up. There is no photography: stock images were removed on purpose, and real job-site photos (or a team section) go in only when the company supplies them.

## Product Principles

1. Sell the mechanism, not a mood: every section should demonstrate BIW's actual behavior (trigger-computed progress, 80%/110% budget gates, DRAFT→IN_REVIEW→APPROVED cuts) rather than generic SaaS claims.
2. Never claim what isn't shipping: no offline, no geofencing, no AWS/microservices-as-current, no invented customers/metrics; AI features labeled roadmap only.
3. Look like the sector, not like a template: the documents, vocabulary and rigor of a construction company (see DESIGN.md).
4. Every module/role/flow claim traces back to the Notion spec excerpt provided; gaps are flagged, not filled with invention.
5. Built for a buyer evaluating construction-ops software: fast comprehension, credible operational depth, clear path to contact.

## Accessibility & Inclusion

No product-specific requirement was established beyond standard WCAG AA (contrast, keyboard nav, reduced motion) — applied as baseline engineering practice, not a stated user need.
