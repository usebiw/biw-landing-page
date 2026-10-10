import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

/**
 * Content schemas — the contract between content and the organisms that
 * render it. Copy lives here, never hardcoded in components.
 *
 * i18n: every collection carries a `locale` field ('es' | 'en'). Singletons
 * (`site`, `hero`) are keyed `site-es`/`site-en` inside one JSON file
 * (`file()` loader needs a map, not a flat object). Multi-entry collections
 * keep the Spanish file at its plain name (e.g. `modules/avance.json`,
 * locale: 'es') and add an English sibling with an `.en` suffix
 * (`modules/avance.en.json`, locale: 'en') — organisms filter
 * `getCollection(name, (e) => e.data.locale === Astro.currentLocale)`.
 *
 * Every claim here must be something BIW does today (see PRODUCT.md):
 * no offline, no geofencing, no invented customers or numbers.
 */

const localeField = z.enum(['es', 'en']);

const site = defineCollection({
  loader: file('src/content/site.json'),
  schema: z.object({
    locale: localeField,
    brandName: z.literal('BIW'),
    brandFull: z.literal('Building Integrated Workflow'),
    tagline: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().max(160),
    ogImage: z.string(),
    whatsappNumber: z.string().describe('E.164 without +, e.g. 573001234567'),
    whatsappMessage: z.string(),
    demoEndpoint: z.string().optional(),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
});

const hero = defineCollection({
  loader: file('src/content/hero.json'),
  schema: z.object({
    locale: localeField,
    headline: z.string(),
    subcopy: z.string(),
    ctaPrimary: z.string(),
    ctaWhatsapp: z.string(),
    /** One plain line under the CTAs naming the local specifics BIW handles. */
    localNote: z.string(),
  }),
});

/** "Hoy" vs. "Con BIW" — how each job is done today and what changes. */
const comparison = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/comparison' }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    area: z.string(),
    today: z.string(),
    withBiw: z.string(),
  }),
});

/** Platform index, grouped like the chapters of a budget. */
const modules = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/modules' }),
  schema: z.object({
    locale: localeField,
    group: z.enum(['obra', 'dinero', 'gente', 'archivo']),
    order: z.number(),
    name: z.string(),
    summary: z.string(),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/roles' }),
  schema: z.object({
    locale: localeField,
    /** Stable, locale-independent key, identical in the es/en siblings. */
    roleKey: z.string(),
    order: z.number(),
    name: z.string(),
    does: z.string(),
    sees: z.string(),
  }),
});

/** How a new company gets onto BIW, in order. */
const steps = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/steps' }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    title: z.string(),
    body: z.string(),
  }),
});

const security = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/security' }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    title: z.string(),
    description: z.string(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    question: z.string(),
    answer: z.string(),
  }),
});

export const collections = {
  site,
  hero,
  comparison,
  modules,
  roles,
  steps,
  security,
  faqs,
};
