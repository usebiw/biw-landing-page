---
name: BIW Landing
description: Construction-ops control platform landing — inherited login identity, glass instrument panels on a near-black ground.
colors:
  ink-950: "#04060B"
  ink-900: "#070A12"
  ink-800: "#0A0D14"
  biw-400: "#4D7BFF"
  biw-500: "#1450FF"
  biw-600: "#0D3AD1"
  mist-50: "#F4F6FA"
  mist-100: "#E7EBF3"
  slate-500: "#6B7789"
  signal-500: "#FF5A1F"
typography:
  display:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Montserrat Variable, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Montserrat Variable, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.biw-500}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.biw-600}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mist-50}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.mist-50}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  badge-blue:
    backgroundColor: "{colors.biw-500}"
    textColor: "{colors.biw-400}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  status-pill-warning:
    backgroundColor: "{colors.signal-500}"
    textColor: "{colors.signal-500}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  glass-panel:
    backgroundColor: "rgba(255,255,255,0.06)"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
---

# Design System: BIW Landing

## Overview

**Creative North Star: "The Glass Instrument Panel"**

BIW's landing is not a marketing skin painted over a product — it is the production login screen's own material (near-black ground, one electric-blue glow, mist-white panels) extended into a full site, with a construction-industry structural grammar (heavy display type, ticker rows, numbered process, stats band) laid on top of that inherited palette, never replacing it. Every glass surface exists because there is a blue glow behind it to refract; every orange pixel exists because it is reporting a real budget-gate reading. The site earns its "tecnológica" claim through live-feeling instrument readings (progress bars, dials, pills) rather than through generic SaaS iconography or stock gradients.

Rejected explicitly during the build: a stock-photo hero with a floating headline (category default, refused per THESIS); the nixie-tube counter's orange-on-black literalism (challenger, declined — conflicts with BIW's blue brand truth, though its "quantities are the interface" discipline was kept); any eyebrow/kicker line over a heading (craft-floor ban, removed from Hero.astro during the build).

**Key Characteristics:**
- Near-black ground (`#04060B`–`#0A0D14`) alternating with mist-white panels (`#F4F6FA`) for form/data surfaces.
- One accent color, blue (`#1450FF`), carried as a luminous sphere/glow motif behind every glass panel.
- Signal orange (`#FF5A1F`) is load-bearing semantic only — the 80%/110% budget-gate reading, never decorative.
- Asymmetric section composition (one large block + a secondary list/row) instead of repeated icon-card grids.
- Self-authored single-stroke SVG icon set; no icon fonts, no emoji.

## Colors

Two-color system by design: one blue accent carried through dark and light rhythm, one strictly semantic orange, everything else neutral ink/mist/slate.

### Primary
- **BIW Blue** (`#1450FF`, `biw-500`): the one accent. Used for the glow-sphere motif, primary buttons, focus rings, links, selection color, active progress-bar fill, scrollbar thumb. `biw-400` (`#4D7BFF`) is its lighter step for text-on-dark accents (badges, focus outline); `biw-600` (`#0D3AD1`) is its hover/pressed step.

### Neutral
- **Ink Black** (`#04060B`–`#0A0D14`, `ink-950`/`ink-900`/`ink-800`): the dominant page ground. `ink-950` is the deepest base, `ink-900`/`ink-800` step up for layered surfaces (cards, gradient panels).
- **Mist White** (`#F4F6FA`, `mist-50`): body text on dark, and the ground color for alternating light-rhythm panels/forms. `mist-100` (`#E7EBF3`) is its subtler step for light-panel borders.
- **Slate** (`#6B7789`, `slate-500`): secondary/muted text — subcopy, captions, placeholder text.

### Named Rules
**The Semantic Orange Rule.** `signal-500` (`#FF5A1F`) renders only the product's real budget-execution thresholds (80% warning, 110% hard block). It never labels "beta," "próximamente," "datos de ejemplo," or any other generic status — those use blue (`tone="blue"`) or neutral. This was a real bug during the build (see comments in `StatusPill.astro`, `Hero.astro`, `AiRoadmap.astro`) and is now enforced in the component's own doc comment.

**The Glow-Requires-Glass Rule.** Glass/blur surfaces (`.glass`, `.glass-strong`, `.glass-light`) never sit on a flat background. Each one is composed directly on top of a `.glow-sphere` element (or a hero ground that is already glowing) so the backdrop-blur has something to refract.

## Typography

**Display Font:** Archivo Variable (with sans-serif fallback)
**Body Font:** Montserrat Variable (with sans-serif fallback)

**Character:** A heavy, tightly-tracked display face (800/900 weight, -0.04em tracking) for headlines paired with a workmanlike, uppercase-tracked Montserrat for body copy and micro-labels — technical confidence over editorial warmth.

### Hierarchy
- **Display** (800, `clamp(3rem, 6vw, 6rem)` / up to 96px desktop, line-height 0.98): hero H1 only, `Heading size="display"`.
- **Headline** (800, `clamp(2.25rem, 4vw, 3rem)`, line-height 1.1): section H2s, `Heading size="xl"`.
- **Title** (700, 1.25rem, line-height 1.3): card/subsection H3s, `Heading size="md"`/`"lg"`.
- **Body** (400, 1.125rem, line-height 1.6): subcopy and descriptions, capped `max-w-[60–62ch]`.
- **Label** (600, 0.75rem, letter-spacing 0.1em, uppercase): KPI chips, badges, status pills, input labels, wordmark caption.

### Named Rules
**The Display-Ceiling Rule.** Display type never exceeds 6rem/96px (`lg:text-[6rem]`), reserved for the hero H1 alone; no other heading is sized to compete with it.

## Layout

Content sits in a `max-w-7xl` centered container with `px-6` gutters. The hero splits `lg:grid-cols-[55%_45%]` (copy/CTAs left, glass instrument right) — the only asymmetric ratio observed, and it recurs conceptually (not literally) in Pillars' `[1.3fr_1fr]` split. Section rhythm is generous vertical space: `py-24` to `md:py-32` between organisms. Two-tone rhythm alternates dark ink sections with occasional mist-white panels for form/data surfaces (per OWN-WORLD), rather than a single flat background throughout.

## Elevation & Depth

Hybrid: mostly flat dark surfaces with tonal layering (`ink-950` → `ink-900` → `ink-800`, or `white/[.03]` to `white/[.1]` overlays) for card hierarchy, plus one deliberate lifted device — the glass panel — which always carries a blue-tinted shadow (`0 20px 60px -15px rgba(20,80,255,0.35)` for `.glass`, stronger for `.glass-strong`) and an inset highlight to sell the frosted-glass edge. Buttons carry a single soft blue shadow on the primary variant (`shadow-[0_20px_45px_-18px_rgba(20,80,255,0.65)]`); nothing else casts a shadow.

### Shadow Vocabulary
- **glass** (`inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 60px -15px rgba(20,80,255,0.35)`): default glass panel, `backdrop-blur(20px)`.
- **glass-strong** (`inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 70px -18px rgba(20,80,255,0.45)`): the hero's featured instrument panel, `backdrop-blur(28px)`.
- **glass-light** (`inset 0 1px 0 rgba(255,255,255,0.5), 0 20px 50px -20px rgba(20,80,255,0.18)`): light-panel variant for form/data surfaces on the mist-white rhythm.
- **button-primary glow** (`0 20px 45px -18px rgba(20,80,255,0.65)`): primary CTA only.

### Named Rules
**The Blue-Tinted Shadow Rule.** Every shadow in the system carries the blue accent tint (`rgba(20,80,255,...)`), never a neutral black shadow — depth reads as glow, not as generic elevation.

## Shapes

Consistently rounded, no sharp corners and no hard-offset neobrutalist shadows anywhere in the build. `rounded-lg` (8px) is the default for buttons, badges, pills, inputs, and small cards (22 occurrences, the most common radius). `rounded-2xl` (16px) is reserved for larger containers — glass panels and pillar/section cards (8 occurrences). `rounded-full` appears only on true circular elements (status-dot, glow-sphere, scrollbar thumb). Borders are hairline and translucent (`border-white/10`, `border-white/15`) rather than solid or colored, except where a tone requires a colored border (badges, status pills use `{tone}-500/30` borders).

## Components

### Buttons
- **Shape:** `rounded-lg` (8px), `px-5 py-2.5` (md) or `px-7 py-3.5` (lg).
- **Primary:** solid `biw-500` background, white text, blue glow shadow; hover darkens to `biw-600`.
- **Ghost:** transparent, `mist-50` text, hairline `border-white/15`, hover fills `white/[.08]`.
- **Outline:** transparent, `mist-50` text, `border-biw-400`, hover tints `biw-500/10`. Hero always ships all three (Solicitar demo / Iniciar sesión / WhatsApp) as a fixed triad, not an arbitrary count.

### Badges / Status Pills
- **Badge:** uppercase tracked label (`rounded-lg`, `border`), tone = `blue` | `orange` | `neutral`. `orange` is reachable but reserved (see Named Rules).
- **StatusPill:** same shape plus a leading `size-1.5` current-color dot, tone = `ok` | `info` | `neutral` | `warning` | `blocked`. `warning`/`blocked` are signal-orange and hard-reserved for the 80%/110% budget gate; every other status uses `ok` (blue), `info`, or `neutral`.

### Cards / Containers
- **Corner Style:** `rounded-2xl` for section-level cards, `rounded-lg` for nested elements.
- **Background:** flat tonal layers (`bg-white/[.03]`) for secondary cards, or a `biw-600/20` → `ink-900` gradient for the featured/manifesto card in an asymmetric section.
- **Shadow Strategy:** none on flat cards; blue-tinted glass shadow only on `GlassPanel`.
- **Border:** hairline `border-white/10`.

### Inputs / Fields
- **Style:** `rounded-lg`, `bg-white/[.04]`, hairline `border-white/15`, label is uppercase-tracked `slate-500` micro-copy above the field, required marker is signal-orange asterisk.
- **Focus:** `biw-400` border + always-visible 2px outline ring (never suppressed).
- **Error:** border and message switch to `signal-500` — the one other legitimate use of signal orange besides the budget gate (form-validation error, not decorative).

### Glass Panel (signature component)
`GlassPanel` (`strength: 'light' | 'strong'`) is the system's signature device: a frosted, blue-shadowed surface that must sit on a `.glow-sphere` ground. It renders the hero's live product-demo instrument (progress bars, budget-gate reading) and recurs anywhere a "data surface floating on the dark ground" is needed. It has no meaning without the glow behind it — see Named Rules.

### Icons
Self-authored single-stroke (1.5px) SVG set (`Icon.astro`), 22 named glyphs, `currentColor` fill-none. No external icon library, no icon fonts, no emoji/unicode glyphs used as icons anywhere in the build.

## Do's and Don'ts

### Do:
- **Do** carry the blue glow-sphere behind every glass/blur surface (`.glass`, `.glass-strong`, `.glass-light`) — never place glass over a flat background.
- **Do** reserve `signal-500` orange strictly for the 80%/110% budget-execution gate reading and form-validation errors — nothing else.
- **Do** compose sections asymmetrically (one large block + a secondary list/row), per `Pillars.astro`, `RolesSection.astro`, `SecuritySection.astro`, `AiRoadmap.astro`, `ModulesList.astro`.
- **Do** use the self-authored single-stroke SVG icon set (`Icon.astro`) for any new icon need.
- **Do** label every synthetic product-demo data point visibly ("Datos de ejemplo") in a blue-tone badge — never orange, never unlabeled.

### Don't:
- **Don't** place an eyebrow/kicker line above any heading, anywhere in the site — a craft-floor ban already enforced by removal from `Hero.astro` during the build; this is a defect-class ban carried by the incumbent system, not a decorative option to reintroduce.
- **Don't** repeat the "grid of N identical icon+heading+text cards" as a full section scaffold — the established pattern is an asymmetric large-block-plus-list composition.
- **Don't** use `signal-500` orange decoratively (badges for "beta," "próximamente," generic highlights) — it is load-bearing semantics for the budget-gate instrument only.
- **Don't** introduce hard-offset/neobrutalist shadows, icon-font glyphs, or a system display face — none exist in this build and none fit the glass-instrument world.
