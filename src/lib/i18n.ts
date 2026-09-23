/**
 * i18n — UI-string dictionary and helpers. Content (copy that lives in
 * `src/content/**`) is NOT here; this covers section headings, intros,
 * aria-labels, form labels, validation messages, and other chrome that
 * isn't "content" per se. Routing is Astro's built-in i18n
 * (astro.config.mjs: locales es/en, prefixDefaultLocale: true), so every
 * page lives at /es/... and /en/....
 */
import { getRelativeLocaleUrl } from 'astro:i18n';

export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export const localeMeta: Record<Locale, { label: string; htmlLang: string; ogLocale: string }> = {
  es: { label: 'ES', htmlLang: 'es-CO', ogLocale: 'es_CO' },
  en: { label: 'EN', htmlLang: 'en-US', ogLocale: 'en_US' },
};

const dict = {
  header: {
    logoHome: { es: 'BIW — inicio', en: 'BIW — home' },
    mainNav: { es: 'Navegación principal', en: 'Main navigation' },
    openMenu: { es: 'Abrir menú', en: 'Open menu' },
    cta: { es: 'Contáctanos', en: 'Contact us' },
  },
  footer: {
    tagline: {
      es: 'Control y seguimiento de obras, de gerencia al frente de trabajo.',
      en: 'Construction control and tracking, from management to the field.',
    },
    siteLinks: { es: 'Enlaces del sitio', en: 'Site links' },
    privacyLink: { es: 'Política de datos', en: 'Privacy policy' },
    rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
    navigate: { es: 'Navegar', en: 'Navigate' },
    connect: { es: 'Contacto', en: 'Get in touch' },
    backToTop: { es: 'Volver arriba', en: 'Back to top' },
  },
  theme: {
    toggleToLight: { es: 'Cambiar a modo claro', en: 'Switch to light mode' },
    toggleToDark: { es: 'Cambiar a modo oscuro', en: 'Switch to dark mode' },
  },
  language: {
    switch: { es: 'Cambiar idioma', en: 'Switch language' },
  },
  loading: {
    page: { es: 'Cargando página…', en: 'Loading page…' },
    photo: { es: 'Cargando foto…', en: 'Loading photo…' },
  },
  hero: {
    panelTitle: { es: 'Avance real vs. programado', en: 'Actual vs. planned progress' },
    sampleData: { es: 'Datos de ejemplo', en: 'Sample data' },
    chapterLabel: { es: 'Capítulo · Estructura', en: 'Chapter · Structure' },
    chapterExecuted: { es: '80% ejecutado', en: '80% executed' },
    nearThreshold: { es: 'Cerca del umbral', en: 'Near threshold' },
    chapterFoundation: { es: 'Cimentación', en: 'Foundation' },
    chapterStructure: { es: 'Estructura', en: 'Structure' },
    chapterMasonry: { es: 'Mampostería', en: 'Masonry' },
    chipDelay: { es: 'Alerta automática al 5% de retraso', en: 'Automatic alert at 5% delay' },
    chipBlock: { es: 'Bloqueo al 110%', en: 'Hard block at 110%' },
    chipApprovals: { es: 'Aprobaciones con registro', en: 'Approvals on record' },
    realVsPlanned: {
      es: (real: number, planned: number) => `${real}% real · ${planned}% programado`,
      en: (real: number, planned: number) => `${real}% actual · ${planned}% planned`,
    },
  },
  modules: {
    heading: { es: 'Módulos', en: 'Modules' },
    intro: {
      es: 'Cuatro módulos que cubren el ciclo completo de control de obra, del registro diario en el frente hasta el cierre financiero con el contratista.',
      en: 'Four modules covering the full job-site control cycle, from the daily log on the work front to the financial close-out with the contractor.',
    },
  },
  productDemo: {
    heading: { es: 'El producto, en acción', en: 'The product, in action' },
    intro: {
      es: 'Cada rol entra al mismo sistema y ve una lectura distinta de la misma obra. Cambia de rol para ver cómo cambia el tablero.',
      en: 'Every role logs into the same system and sees a different read of the same site. Switch roles to see the dashboard change.',
    },
    tabsAriaLabel: { es: 'Ver el panel de BIW por rol', en: 'View the BIW dashboard by role' },
    sampleData: { es: 'Datos de ejemplo', en: 'Sample data' },
    toneOk: { es: 'En regla', en: 'On track' },
    toneWarning: { es: 'Cerca del 80%', en: 'Near 80%' },
    toneBlocked: { es: 'Bloqueado · 110%', en: 'Blocked · 110%' },
    legendReal: { es: 'Avance real', en: 'Actual progress' },
    legendPlanned: { es: 'Programado', en: 'Planned' },
    legendBudget: { es: 'Etiqueta: ejecución presupuestal', en: 'Tag: budget execution' },
  },
  roles: {
    heading: { es: '5 roles, un solo sistema', en: '5 roles, one system' },
    intro: {
      es: 'Cada persona ve solo lo que le corresponde: desde el dashboard ejecutivo de gerencia hasta la vista restringida del contratista sobre sus propias actividades.',
      en: 'Every person sees only what applies to them: from the executive dashboard for management to the restricted view a contractor gets of their own activities.',
    },
    carouselLabel: { es: 'Roles del sistema', en: 'System roles' },
  },
  carousel: {
    prev: { es: 'Anterior', en: 'Previous' },
    next: { es: 'Siguiente', en: 'Next' },
  },
  flows: {
    heading: {
      es: 'Flujos que ya conoces, ahora con registro',
      en: 'The flows you already run, now with a paper trail',
    },
    intro: {
      es: 'Las aprobaciones que hoy corren por WhatsApp o Excel quedan en un flujo trazable, con estado y responsable en cada paso.',
      en: "Approvals that today run over WhatsApp or Excel land in a traceable flow, with a status and an owner at every step.",
    },
    tabsLabel: { es: 'Elige un flujo de aprobación', en: 'Choose an approval flow' },
    step: { es: 'Paso', en: 'Step' },
    steps: { es: 'pasos', en: 'steps' },
  },
  security: {
    heading: { es: 'Seguridad y multitenancy', en: 'Security and multitenancy' },
    intro: {
      es: 'Cada empresa opera aislada, con permisos aplicados en tres capas independientes.',
      en: 'Every company operates in isolation, with permissions enforced across three independent layers.',
    },
    visualTitle: { es: 'Una empresa, un subdominio', en: 'One company, one subdomain' },
    visualIsolated: { es: 'Datos aislados (RLS)', en: 'Isolated data (RLS)' },
    layersTitle: { es: 'Cada acción cruza 3 capas', en: 'Every action crosses 3 layers' },
    layerBackend: { es: 'Backend', en: 'Backend' },
    layerSeeds: { es: 'Roles sembrados', en: 'Seeded roles' },
    layerUi: { es: 'Interfaz', en: 'Interface' },
    sampleTenants: { es: 'Subdominios de ejemplo', en: 'Sample subdomains' },
  },
  roadmap: {
    heading: { es: 'Lo que viene: IA aplicada a obra', en: "What's next: AI applied to the job site" },
    intro: {
      es: 'Estas capacidades están en el roadmap del producto — no forman parte del lanzamiento actual.',
      en: "These capabilities are on the product roadmap — they aren't part of the current launch.",
    },
    comingSoon: { es: 'Próximamente', en: 'Coming soon' },
  },
  showcase: {
    heading: { es: 'Así se ve el control de obra', en: 'This is what job-site control looks like' },
    intro: {
      es: 'Imágenes ilustrativas de referencia — no corresponden a proyectos reales de clientes de BIW.',
      en: "Illustrative reference images — they don't depict real BIW customer projects.",
    },
    illustrative: { es: 'Ilustrativo', en: 'Illustrative' },
    carouselLabel: { es: 'Fotos ilustrativas de obra', en: 'Illustrative job-site photos' },
    blocks: {
      es: [
        { alt: 'Fotografía ilustrativa de stock: estructura de concreto en una obra en construcción, no un proyecto real de un cliente de BIW.', caption: 'Estructura y avance de obra gruesa' },
        { alt: 'Fotografía ilustrativa de stock: trabajadores de construcción revisando planos en el frente de obra, no un proyecto real de un cliente de BIW.', caption: 'Seguimiento diario en el frente de obra' },
        { alt: 'Fotografía ilustrativa de stock: grúa torre y edificio en construcción, no un proyecto real de un cliente de BIW.', caption: 'Cronograma y presupuesto bajo control' },
        { alt: 'Fotografía ilustrativa de stock: ingeniero con casco revisando un tablet en una obra, no un proyecto real de un cliente de BIW.', caption: 'Evidencia fotográfica y bitácora digital' },
      ],
      en: [
        { alt: 'Illustrative stock photo: concrete structure on a construction site, not a real BIW customer project.', caption: 'Structure and shell progress' },
        { alt: 'Illustrative stock photo: construction workers reviewing plans on the work front, not a real BIW customer project.', caption: 'Daily tracking on the work front' },
        { alt: 'Illustrative stock photo: tower crane and building under construction, not a real BIW customer project.', caption: 'Schedule and budget under control' },
        { alt: 'Illustrative stock photo: engineer with a hard hat reviewing a tablet on site, not a real BIW customer project.', caption: 'Photo evidence and digital logbook' },
      ],
    },
  },
  faqs: {
    heading: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
  },
  contact: {
    heading: { es: 'Contáctanos', en: 'Contact us' },
    intro: {
      es: 'Cuéntanos de tu empresa y te mostramos cómo BIW controla tus obras desde el primer día.',
      en: "Tell us about your company and we'll show you how BIW controls your job sites from day one.",
    },
    whatsappTitle: { es: 'WhatsApp', en: 'WhatsApp' },
    whatsappBody: { es: 'Escríbenos directo al equipo de BIW.', en: 'Message the BIW team directly.' },
    privacyTitle: { es: 'Tus datos', en: 'Your data' },
    privacyBody: {
      es: 'Tratados según la Ley 1581 de 2012 (Habeas Data).',
      en: "Handled under Colombia's Law 1581 of 2012 (Habeas Data).",
    },
    formTitle: { es: 'Cuéntanos de tu operación', en: 'Tell us about your operation' },
  },
  form: {
    name: { es: 'Nombre completo', en: 'Full name' },
    company: { es: 'Empresa', en: 'Company' },
    role: { es: 'Cargo', en: 'Role' },
    email: { es: 'Correo', en: 'Email' },
    phone: { es: 'Teléfono', en: 'Phone' },
    activeProjects: { es: 'Obras activas', en: 'Active job sites' },
    consentPrefix: { es: 'Autorizo el tratamiento de mis datos personales según la', en: 'I authorize the use of my personal data under the' },
    consentLinkLabel: { es: 'política de tratamiento de datos', en: 'privacy policy' },
    submit: { es: 'Contáctanos', en: 'Contact us' },
    submitting: { es: 'Enviando…', en: 'Sending…' },
    successTitle: { es: '¡Listo! Ya recibimos tu mensaje.', en: "You're all set! We got your message." },
    successBody: {
      es: 'Un asesor de BIW se pondrá en contacto contigo muy pronto.',
      en: 'A BIW advisor will reach out to you shortly.',
    },
    genericError: {
      es: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.',
      en: "We couldn't send your message. Try again or reach us on WhatsApp.",
    },
    validation: {
      nameRequired: { es: 'Escribe tu nombre completo.', en: 'Enter your full name.' },
      companyRequired: { es: 'Escribe el nombre de tu empresa.', en: 'Enter your company name.' },
      roleRequired: { es: 'Escribe tu cargo.', en: 'Enter your role.' },
      emailRequired: { es: 'Escribe tu correo.', en: 'Enter your email.' },
      emailInvalid: { es: 'Escribe un correo válido.', en: 'Enter a valid email.' },
      phoneRequired: { es: 'Escribe tu teléfono.', en: 'Enter your phone number.' },
      phoneInvalid: { es: 'Escribe un teléfono válido.', en: 'Enter a valid phone number.' },
      activeProjectsRequired: {
        es: 'Cuéntanos cuántas obras activas manejas.',
        en: 'Tell us how many active job sites you run.',
      },
      activeProjectsInvalid: {
        es: 'Escribe solo el número de obras activas.',
        en: 'Enter just the number of active job sites.',
      },
      consentRequired: {
        es: 'Debes autorizar el tratamiento de tus datos para continuar.',
        en: 'You must authorize the use of your data to continue.',
      },
    },
  },
  notFound: {
    title: { es: 'Página no encontrada — BIW', en: 'Page not found — BIW' },
    description: {
      es: 'La página que buscas no existe o fue movida.',
      en: "The page you're looking for doesn't exist or was moved.",
    },
    heading: { es: 'No encontramos esta página', en: "We couldn't find this page" },
    body: {
      es: 'El enlace puede estar roto o la página fue movida. Vuelve al inicio para seguir explorando BIW.',
      en: 'The link may be broken or the page was moved. Head back home to keep exploring BIW.',
    },
    cta: { es: 'Volver al inicio', en: 'Back to home' },
  },
  privacy: {
    title: { es: 'Política de tratamiento de datos — BIW', en: 'Privacy policy — BIW' },
    description: {
      es: 'Política de tratamiento de datos personales de BIW, conforme a la Ley 1581 de 2012 (Habeas Data) en Colombia.',
      en: "BIW's personal-data privacy policy, under Colombia's Law 1581 of 2012 (Habeas Data).",
    },
    heading: { es: 'Política de tratamiento de datos personales', en: 'Personal data privacy policy' },
    lastUpdated: { es: 'Última actualización', en: 'Last updated' },
    intro: {
      es: '{{brand}}, identificada con NIT {{nit}} (en adelante, "BIW"), en cumplimiento de la Ley 1581 de 2012 y sus decretos reglamentarios, informa su política para el tratamiento de datos personales de las personas que diligencian el formulario de contacto o se ponen en contacto por WhatsApp en este sitio.',
      en: '{{brand}}, tax ID {{nit}} ("BIW"), in compliance with Colombian Law 1581 of 2012 and its implementing decrees, discloses its policy for handling the personal data of people who fill out the contact form or reach out via WhatsApp on this site.',
    },
    controllerTitle: { es: 'Responsable del tratamiento', en: 'Data controller' },
    controllerBody: {
      es: '{{brand}}, con domicilio en {{city}} y correo de contacto {{email}}, es responsable del tratamiento de los datos personales recolectados a través de este sitio.',
      en: '{{brand}}, located in {{city}}, contact email {{email}}, is responsible for the personal data collected through this site.',
    },
    dataTitle: { es: 'Datos que recolectamos', en: 'Data we collect' },
    dataBody: {
      es: 'Nombre completo, empresa, cargo, correo electrónico, teléfono y número de obras activas, suministrados voluntariamente al contactarnos.',
      en: 'Full name, company, role, email, phone, and number of active job sites, voluntarily provided when contacting us.',
    },
    purposeTitle: { es: 'Finalidad del tratamiento', en: 'Purpose of processing' },
    purposeBody: {
      es: 'Los datos se usan exclusivamente para contactar al solicitante con fines comerciales: agendar y realizar una demostración de la plataforma BIW, y dar seguimiento a esa solicitud. No se usan para fines distintos ni se venden ni se ceden a terceros ajenos a este propósito.',
      en: "The data is used exclusively to contact the requester for commercial purposes: scheduling and running a demonstration of the BIW platform, and following up on that request. It is not used for any other purpose, sold, or shared with third parties outside this purpose.",
    },
    rightsTitle: { es: 'Derechos del titular (Habeas Data)', en: 'Data subject rights (Habeas Data)' },
    rightsBody: {
      es: 'Como titular de los datos, usted tiene derecho a conocer, actualizar, rectificar y suprimir su información, así como a revocar la autorización otorgada, presentando una solicitud a {{email}}. Atenderemos su solicitud dentro de los términos establecidos por la ley.',
      en: 'As the data subject, you have the right to know, update, correct, and delete your information, and to revoke your authorization, by submitting a request to {{email}}. We will handle your request within the terms set by law.',
    },
    termTitle: { es: 'Vigencia', en: 'Retention' },
    termBody: {
      es: 'Sus datos se conservarán mientras sea necesario para la finalidad descrita o hasta que usted solicite su supresión, lo que ocurra primero.',
      en: 'Your data will be kept for as long as necessary for the stated purpose, or until you request its deletion, whichever comes first.',
    },
    contactTitle: { es: 'Contacto', en: 'Contact' },
    contactBody: {
      es: 'Para ejercer sus derechos o resolver dudas sobre esta política, escríbanos a {{email}}.',
      en: 'To exercise your rights or ask questions about this policy, write to us at {{email}}.',
    },
  },
} as const;

type Dict = typeof dict;
type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/** Dot-path lookup into the dictionary, resolved for one locale. Falls back
 * to Spanish (never to the raw key) if a translation is somehow missing. */
export function useTranslations(locale: Locale) {
  return function t<P extends string>(path: P): PathValue<Dict, P> extends { es: infer V; en: infer V }
    ? V
    : never {
    const parts = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = dict;
    for (const part of parts) node = node?.[part];
    if (node && typeof node === 'object' && (locale in node || 'es' in node)) {
      return (node[locale] ?? node.es) as never;
    }
    return node as never;
  };
}

/** Strip the current locale prefix from a pathname and rebuild it for
 * `target`, preserving the rest of the path (used by the language
 * switcher). */
export function getLocalizedPath(pathname: string, target: Locale): string {
  const withoutLocale = pathname.replace(/^\/(es|en)(\/|$)/, '/');
  return getRelativeLocaleUrl(target, withoutLocale);
}
