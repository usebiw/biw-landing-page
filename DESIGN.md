---
name: BIW Landing
description: Construction-ops control platform landing — "documento de obra": paper ground, ink type, hairline rules, the logo blue as the only accent.
colors:
  paper: "#F5F5F2"
  paper-2: "#ECECE7"
  sheet: "#FFFFFF"
  ink: "#0B0D10"
  ink-2: "#474C54"
  ink-3: "#767B84"
  rule: "#D9D9D2"
  accent: "#003CFF"
  accent-ink: "#0030CC"
  accent-soft: "#E5EBFF"
  signal: "#C2410C"
  signal-soft: "#FDEEE6"
typography:
  display:
    fontFamily: "Archivo Variable, sans-serif"
    fontStretch: "112%"
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Variable, sans-serif"
    fontStretch: "112%"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo Variable, sans-serif"
    fontStretch: "112%"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  sheet-label:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: "uppercase"
rounded:
  none: "0"
  control: "3px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    height: "48px (lg) / 40px (md)"
  button-secondary:
    backgroundColor: "transparent"
    border: "1px solid ink at 25%"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  sheet:
    backgroundColor: "{colors.sheet}"
    border: "1px solid {colors.rule}"
    shadow: "0 1px 0 rgb(11 13 16 / .04), 0 12px 24px -18px rgb(11 13 16 / .28)"
---

# Design System: BIW Landing

## Overview

**"Documento de obra."** The landing looks like the paperwork a construction company already trusts: budget sheets, actas de corte, the site log. Paper ground, ink type, hairline rules, one accent color. The buyer (owner, operations director, finance lead of a mid-size Colombian builder) should feel they are looking at work done by people who know how an obra runs, not at a generic SaaS template.

This replaced (2026-10-10) an earlier dark, glassmorphic look — glow spheres, frosted cards, gradient headings, carousels — that the owner felt read as AI-generated. Those patterns are now banned on this surface (see Don'ts).

## Colors

All colors come from the brand manual (`assets/brand/README.md` in the monorepo): paper `#F5F5F2`, ink `#0B0D10`, and the logo blue `#003CFF`, sampled from the official logo's dot.

- **Paper** (`paper`, default theme) is the page ground; **paper-2** marks alternating sections (like a shaded band on a printout). **Sheet** (white) is reserved for documents lying on the paper: the budget sheet, the acta de corte, the contact form.
- **Ink** for text, three steps: `ink` (primary), `ink-2` (body/secondary), `ink-3` (meta, column headers, "today" column).
- **Rule** is the hairline that structures everything. `rule-strong` (= ink) is the heavy rule that opens each section.
- **Accent** (logo blue) only for: the primary button, active nav underline, links, the "Con BIW" column header, chapter numbers in the platform index, small checkmarks, on-track progress bars. Never as a background wash, never as a glow.
- **Signal** (burnt orange) is **semantic only**: the 80 % warning and 110 % lock on budget chapters, quantities over contract. Nothing decorative may use it.
- Dark theme exists (toggle, persisted under `biw-theme`), flipping the same tokens: ink ground, paper text, white-alpha rules, accent `#3366FF`. Light/paper is the default; the OS preference does not switch it.

Components use the semantic utilities generated from `@theme inline` in `src/styles/global.css` (`bg-paper`, `bg-sheet`, `text-ink-2`, `border-rule`, `text-accent-ink`, `bg-signal-soft`…). Never a literal hex on a surface that must follow the theme.

## Typography

One family: **Archivo Variable** with its width axis (`@fontsource-variable/archivo/wdth.css`).

- Headings: weight 700, `font-stretch: 112%` (semi-expanded), tracking `-0.02em`, `text-wrap: balance`. Sturdy, engineering-like; not the ultra-tight `-0.04em` display look.
- Body: Archivo 400 at normal width, 16–18px, line-height 1.6, `text-wrap: pretty`.
- Figures: `.figures` utility (tabular, lining numerals) on every table, total, percentage and code.
- `.sheet-label` (11px, uppercase, 0.06em) is the **only** uppercase text, and lives only in document title blocks and signature boxes — where real plans and actas print it.
- Percentages carry a non-breaking space ("80 %") so they never split.

## Layout

- 12-column grid inside `max-w-7xl`, 24px gutters, 16px+ side padding on phones.
- Every section opens with `SectionHead`: a 2px ink rule, then the sheet number and name in columns 1–3 ("03 Cortes de obra") and the heading + intro in columns 4–12. Always left-aligned. Section content aligns to the same columns (row labels in 1–3, content in 4–12), so the page reads like a drawing set.
- Sections are numbered 01–08 in scroll order (the number is passed to `SectionHead` in each organism; keep it in step with `LandingTemplate.astro`).
- Lists of comparable things are **tables or ruled lists**, never card grids: Hoy vs. Con BIW, the platform index (budget-style 1.1, 1.2… numbering), roles × what they do × what they see.

## Motion

Added 2026-10-10 after the owner found the flat version "hostil y seca". Motion is **purposeful and tied to the trade** — the documents work, the site gets built — never decorative atmosphere. All of it lives in `global.css` (Motion block) plus the reveal script in `BaseLayout.astro`, armed only under `html[data-js]` and fully disabled by `prefers-reduced-motion`.

- `data-reveal` (+ `--i` for stagger): blocks settle in (fade + 16px rise) the first time they enter the viewport. Section heads draw their heavy rule left to right.
- `data-bar` (`--w`): progress bars fill to their value. `data-count` (+ `data-suffix`, `data-delay`): a percentage counts up — only on figures that belong to a document.
- `data-after`: a label that appears once its bar has arrived. `data-stamp` (+ `--delay`): a rubber stamp lands (`.stamp` utility) — "Bloqueado" on the budget sheet, "Aprobado" on the acta.
- `data-pop`: numbered callouts pop onto the document in order. Hovering a note highlights its callout (CSS `:has()` in `CorteSection.astro`).
- `data-draw` (paths with `pathLength="1"`) and `data-rise`: line drawings trace themselves and building floors fill bottom-up (`SiteElevation.astro`, module pictograms). `.sway`: the crane's load swings ±1.6° — the only infinite animation.
- Hover: table rows tint, row markers lengthen, module names turn accent. No lifts, no glows.

## Ambient motion (restored from the first version, 2026-10-10)

The owner asked to keep the paper style but bring back the first version's animations. They return re-drawn for paper, as utilities in `global.css` (Ambient motion block), all off under reduced motion:

- `drift-blob` (`--blob` color): soft blurred blobs drifting slowly — behind the hero sheet, in the Implementación and Contacto bands.
- `plan-grid`: faint drawing grid behind the hero sheet. `orbit`: dashed survey circles rotating slowly behind it, each with a node.
- `float-tag`: small paper tags bobbing beside the budget sheet (5 % delay alert, 110 % lock, named approvals). `live-dot`: pinging "Al día" dot in the sheet's title block.
- `spotlight` + `data-spotlight`: cursor light on documents (script in `BaseLayout`). `lift`: documents rise 4px on hover.
- `btn-sheen`: light sweep on primary buttons. Nav links grow their underline. The theme toggle reveals the new theme in a circle (View Transition).
- `SurveyTape.astro` (replaced the module marquee, which read as a template): the modules laid along a surveyor's tape with chainages K0+000…, moved only by the reader's scroll.

## Drawings (the imagery, until real photos exist)

Three plan-style line drawings carry the page's imagery, all inline SVG on theme tokens:

- `SiteElevation.astro` — full-bleed elevation right after the hero: delivered tower, tower in structure, foundations, tower crane, concrete mixer (drum turning), crews in hard hats, site office. Tower 2 is built by scroll (floors, formwork, crew, hook and the "Real %" label follow the reader's progress through the section).
- `SCurve.astro` — control: planned vs. actual S-curve in section 01, shaded gap, "Hoy" marker and the >5 % alert stamp. Values are computed in the component so curve and labels agree.
- `StructuralDetail.astro` — construction: footings, columns with rebar and ties, beams and a 0.40 m waffle slab, labeled with the acta's items 2.01–2.04 (section 03). Steel traces first, then concrete pours.

## Color bands

Rhythm comes from three scopes in `global.css`, applied to a whole section: default paper / `bg-paper-2` bands, `scope-ink` (dark band — Implementación) and `scope-blue` (logo-blue band — Contacto). `scope-paper` re-asserts paper tokens on a sheet inside a colored band (the contact form).

## Elevation & Depth

Flat. The only shadow is `.sheet`: one tight, low shadow so a document reads as paper on paper. No glow, no blur, no colored shadows, no hover lifts.

## Shapes

Square. Controls (buttons, inputs) have a 3px radius; sheets and sections have none. Callout markers (numbered circles on the acta) are the only round shapes besides the logo dot.

## Components

- **Buttons** (`Button.astro`): `primary` (solid accent, white text) and `secondary` (ink outline). Flat color change on hover; no sheen, no shadow.
- **Sheets** (`BudgetSheet.astro`, `CorteSection.astro`): a title block row (BIW · document name · project · date, with "Valores de ejemplo" once in the block), a ruled table with tabular figures, totals under a heavy rule, footnotes in `ink-2`. Sample values must add up.
- **Callouts**: numbered circles placed on the document, explained in a numbered list beside it — the drawing-annotation pattern.
- **Inputs**: 44px, 1px `rule` border on `sheet`, 3px radius, accent border on focus; labels are sentence-case `text-sm font-medium` above the field.
- **FAQ**: native `<details>`, ruled rows, plus/minus mark.
- **Icons** (`Icon.astro`): sparse — CTA arrows, WhatsApp, lock, checks. Never an icon-in-a-rounded-square tile.

## Do's and Don'ts

### Do:
- Show the product through the documents the buyer already uses (budget by chapter, acta de corte, signature route).
- Write in the sector's words: residente, director de obra, interventoría, APU, AIU, corte, retegarantía, anticipo.
- Address the reader as **usted**.
- Keep every claim true to what BIW does today (see `PRODUCT.md`).

### Don't:
- Glass/backdrop-blur panels, glowing spheres, film grain.
- Gradient text or gradient fills of any kind.
- Centered "heading + gray paragraph" section openers, eyebrow pills above headings, uppercase tracked labels outside document title blocks.
- Carousels. Glass, glows and gradient text stay out even though the first version's motion came back (see Ambient motion).
- Grids of identical icon + heading + paragraph cards.
- Stock photography. When real job-site photos exist, use them; until then, line drawings in the plan style (`SiteElevation`, pictograms) carry the imagery.
- Floating "Datos de ejemplo" / "Beta" badges. Sample data is labeled once, inside the document's title block.
