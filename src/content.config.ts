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
    headlineAccent: z.string().describe('the bold/accent word(s) inside headline'),
    subcopy: z.string(),
    ctaPrimary: z.string(),
    ctaWhatsapp: z.string(),
    chips: z.array(z.string()).length(3),
  }),
});

const pillars = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/pillars` }),
  schema: z.object({
    locale: localeField,
    title: z.string(),
    description: z.string(),
    icon: z.enum(['visibility', 'control', 'decision']),
  }),
});

const modules = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/modules` }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    name: z.string(),
    summary: z.string(),
    detail: z.string(),
    icon: z.string(),
    status: z.enum(['live', 'beta', 'roadmap']).default('live'),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/roles` }),
  schema: z.object({
    locale: localeField,
    /** Stable, locale-independent key (e.g. "gerencia-general") so
     * ProductDemo.tsx can look up its synthetic per-role snapshot without
     * depending on the localized display name. Same value in the es/en
     * sibling files for the same role. */
    roleKey: z.string(),
    order: z.number(),
    name: z.string(),
    access: z.string(),
    responsibilities: z.array(z.string()),
  }),
});

const flows = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/flows` }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    name: z.string(),
    description: z.string(),
    steps: z.array(z.string()).min(2),
  }),
});

const facts = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/facts` }),
  schema: z.object({
    locale: localeField,
    value: z.string(),
    label: z.string(),
  }),
});

const security = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/security` }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const roadmap = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/roadmap` }),
  schema: z.object({
    locale: localeField,
    order: z.number(),
    name: z.string(),
    description: z.string(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: `./src/content/faqs` }),
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
  pillars,
  modules,
  roles,
  flows,
  facts,
  security,
  roadmap,
  faqs,
};
