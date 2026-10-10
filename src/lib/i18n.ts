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
    cta: { es: 'Contáctenos', en: 'Contact us' },
  },
  footer: {
    tagline: {
      es: 'Control de obra para constructoras, del frente de trabajo a la gerencia.',
      en: 'Job-site control for construction companies, from the work front to management.',
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
  },
  hero: {
    chipDelay: { es: 'Alerta automática al 5 % de retraso', en: 'Automatic alert at 5 % delay' },
    chipBlock: { es: 'Bloqueo al 110 %', en: 'Lock at 110 %' },
    chipApprovals: { es: 'Aprobaciones con nombre y fecha', en: 'Approvals with name and date' },
    live: { es: 'Al día', en: 'Up to date' },
  },
  tape: {
    label: { es: 'Módulos de BIW', en: 'BIW modules' },
    caption: { es: 'Trece módulos, de punta a punta de la obra', en: 'Thirteen modules, end to end on the job site' },
  },
  sample: {
    note: { es: 'Valores de ejemplo', en: 'Sample figures' },
  },
  elevation: {
    title: {
      es: 'Alzado de una obra de ejemplo: torre 1 entregada, torre 2 en estructura con su avance real frente al programado, torre 3 en cimentación, grúa torre, mixer de concreto y cuadrillas.',
      en: 'Elevation of a sample project: tower 1 delivered, tower 2 in structure with actual vs. planned progress, tower 3 in foundations, tower crane, concrete mixer and crews.',
    },
    t1: { es: 'Torre 1', en: 'Tower 1' },
    t1Status: { es: 'Entregada', en: 'Delivered' },
    t2: { es: 'Torre 2', en: 'Tower 2' },
    t2Status: { es: 'Estructura · 12 pisos', en: 'Structure · 12 floors' },
    t3: { es: 'Torre 3', en: 'Tower 3' },
    t3Status: { es: 'Cimentación · pilotes', en: 'Foundations · piles' },
    office: { es: 'Campamento', en: 'Site office' },
    realLabel: { es: 'Real', en: 'Actual' },
    plannedLabel: { es: 'Programado', en: 'Planned' },
    caption: {
      es: 'Así ve gerencia una obra en BIW: lo construido, lo que está en ejecución y lo que falta, al día. Baje y la torre 2 avanza. Obra de ejemplo.',
      en: 'How management sees a project in BIW: what is built, what is under way and what is left, up to date. Scroll and tower 2 goes up. Sample project.',
    },
    legendBuilt: { es: 'Construido', en: 'Built' },
    legendWorking: { es: 'En ejecución', en: 'Under way' },
    legendPlanned: { es: 'Por construir', en: 'To build' },
  },
  scurve: {
    title: { es: 'Curva S · avance acumulado', en: 'S-curve · cumulative progress' },
    project: { es: 'Torre 2 · estructura', en: 'Tower 2 · structure' },
    today: { es: 'Corte', en: 'As of' },
    month: { es: 'Mes', en: 'Month' },
    months: { es: 'Meses de obra', en: 'Months on site' },
    todayMark: { es: 'Hoy', en: 'Today' },
    gap: { es: 'Desviación', en: 'Deviation' },
    alert: {
      es: (month: number, pct: number) => `Mes ${month} · retraso ${pct}\u00a0% · alerta al director`,
      en: (month: number, pct: number) => `Month ${month} · ${pct}\u00a0% behind · director alerted`,
    },
    aria: {
      es: 'Curva S de una obra de ejemplo: el avance real va por debajo del programado y BIW alerta al director cuando el retraso pasa del 5\u00a0%.',
      en: 'S-curve of a sample project: actual progress runs below planned, and BIW alerts the director once the delay passes 5\u00a0%.',
    },
    footnote: {
      es: 'El avance real sale de los registros diarios de la obra; nadie lo digita en la curva. Pasado el 5\u00a0% de retraso se avisa al director, pasado el 10\u00a0% la alerta es roja.',
      en: "Actual progress comes from the site's daily logs; nobody types it into the curve. Past 5\u00a0% delay the director is alerted; past 10\u00a0% the alert turns red.",
    },
  },
  detail: {
    title: { es: 'Detalle estructural · pórtico tipo', en: 'Structural detail · typical frame' },
    scale: { es: 'Sin escala · lo que se cobra en el acta n.º 04', en: 'Not to scale · what bill no. 04 charges for' },
    aria: {
      es: 'Detalle estructural de un pórtico: zapatas, columnas con acero de refuerzo y estribos, vigas y placa aligerada de 0,40 m, rotulados con los ítems 2.01 a 2.04 del acta de corte.',
      en: 'Structural detail of a frame: footings, columns with reinforcing steel and ties, beams and a 0.40 m waffle slab, labeled with items 2.01 to 2.04 of the progress bill.',
    },
  },
  budgetSheet: {
    title: { es: 'Control presupuestal por capítulos', en: 'Budget control by chapter' },
    project: { es: 'Obra', en: 'Project' },
    projectName: { es: 'Edificio residencial · Torre 2', en: 'Residential building · Tower 2' },
    cutoff: { es: 'Corte', en: 'As of' },
    cutoffDate: { es: '30 sep. 2026', en: 'Sep 30, 2026' },
    chapter: { es: 'Capítulo', en: 'Chapter' },
    budget: { es: 'Presupuesto', en: 'Budget' },
    executed: { es: 'Ejecutado', en: 'Spent' },
    pct: { es: '% ejec.', en: '% spent' },
    statusOk: { es: 'En regla', en: 'On track' },
    statusWarn: { es: 'Alerta 80 %', en: '80 % alert' },
    statusBlock: { es: 'Bloqueado', en: 'Locked' },
    footnote: {
      es: 'Al pasar el 110 % el capítulo queda bloqueado hasta que el director lo apruebe.',
      en: 'Past 110 % the chapter stays locked until the director approves it.',
    },
    chapters: {
      es: ['Cimentación', 'Estructura', 'Mampostería', 'Instalaciones hidrosanitarias', 'Acabados'],
      en: ['Foundations', 'Structure', 'Masonry', 'Plumbing', 'Finishes'],
    },
  },
  comparison: {
    label: { es: 'El día a día', en: 'Day to day' },
    heading: {
      es: 'Lo que hoy depende de un Excel y de la memoria de alguien',
      en: "What today depends on a spreadsheet and someone's memory",
    },
    intro: {
      es: 'BIW no le inventa un proceso nuevo a su equipo. Toma el que ya tienen y le pone controles que hoy dependen de que alguien revise a tiempo.',
      en: "BIW doesn't invent a new process for your team. It takes the one you already run and adds the checks that today depend on someone reviewing in time.",
    },
    today: { es: 'Hoy', en: 'Today' },
    withBiw: { es: 'Con BIW', en: 'With BIW' },
    curveTitle: { es: 'El control, en una sola curva', en: 'Control, in one curve' },
    curveBody: {
      es: 'Programado contra real, mes a mes. Lo que el residente registra hoy mueve la curva hoy, y la desviación se ve antes de que sea un problema.',
      en: 'Planned against actual, month by month. What the site engineer logs today moves the curve today, and the gap shows before it becomes a problem.',
    },
  },
  modules: {
    label: { es: 'Plataforma', en: 'Platform' },
    heading: { es: 'Todo lo de la obra, en un mismo sistema', en: 'Everything on the job site, in one system' },
    intro: {
      es: 'Trece módulos que hablan entre sí: lo que el residente registra en la obra es lo mismo que financiero paga y gerencia revisa.',
      en: 'Thirteen modules that talk to each other: what the site engineer logs is the same thing finance pays and management reviews.',
    },
    groups: {
      obra: { es: 'Obra', en: 'Site' },
      dinero: { es: 'Dinero', en: 'Money' },
      gente: { es: 'Gente', en: 'People' },
      archivo: { es: 'Archivo', en: 'Records' },
    },
  },
  corte: {
    label: { es: 'Cortes de obra', en: 'Progress billing' },
    heading: {
      es: 'Un corte de contratista como lo hace su equipo, sin las cuentas a mano',
      en: 'A subcontractor progress bill the way your team does it, without the hand math',
    },
    intro: {
      es: 'El acta es la misma que su residente y su director ya conocen. La diferencia es lo que BIW revisa antes de que llegue a pago.',
      en: 'The document is the one your site engineer and director already know. The difference is what BIW checks before it reaches payment.',
    },
    docTitle: { es: 'Acta de corte de obra n.º 04', en: 'Progress bill no. 04' },
    contractor: { es: 'Contratista', en: 'Subcontractor' },
    contractorName: { es: 'Estructuras del Norte S.A.S.', en: 'Estructuras del Norte S.A.S.' },
    contract: { es: 'Contrato', en: 'Contract' },
    period: { es: 'Periodo', en: 'Period' },
    periodValue: { es: '1 – 30 sep. 2026', en: 'Sep 1 – 30, 2026' },
    item: { es: 'Ítem', en: 'Item' },
    description: { es: 'Descripción', en: 'Description' },
    unit: { es: 'Und.', en: 'Unit' },
    contracted: { es: 'Contratado', en: 'Contracted' },
    previous: { es: 'Anterior', en: 'Previous' },
    thisCut: { es: 'Este corte', en: 'This bill' },
    cumulative: { es: 'Acumulado', en: 'To date' },
    value: { es: 'Valor', en: 'Amount' },
    held: { es: 'Retenido', en: 'Held' },
    over: { es: 'Excede lo contratado en', en: 'Over contract by' },
    subtotal: { es: 'Subtotal obra', en: 'Work subtotal' },
    admin: { es: 'Administración 8 %', en: 'Administration 8 %' },
    unforeseen: { es: 'Imprevistos 2 %', en: 'Contingency 2 %' },
    profit: { es: 'Utilidad 5 %', en: 'Profit 5 %' },
    vatProfit: { es: 'IVA sobre utilidad 19 %', en: 'VAT on profit 19 %' },
    gross: { es: 'Total bruto', en: 'Gross total' },
    advance: { es: 'Amortización anticipo 30 %', en: 'Advance repayment 30 %' },
    retention: { es: 'Retegarantía 5 %', en: 'Retention 5 %' },
    net: { es: 'Neto a pagar', en: 'Net payable' },
    signatures: { es: 'Ruta del acta', en: 'Approval route' },
    sigDraft: { es: 'Borrador', en: 'Draft' },
    sigReview: { es: 'En revisión', en: 'In review' },
    sigApprove: { es: 'Aprobación', en: 'Approval' },
    sigDraftRole: { es: 'Residente', en: 'Site engineer' },
    sigReviewRole: { es: 'Evidencias cargadas', en: 'Evidence attached' },
    sigApproverRole: { es: 'Director de obra', en: 'Project director' },
    sigApproveRole: { es: 'Pendiente', en: 'Pending' },
    stampApproved: { es: 'Aprobado', en: 'Approved' },
    items: {
      es: ['Concreto columnas 4000 psi', 'Acero de refuerzo 60.000 psi', 'Placa aligerada e = 0,40 m', 'Concreto vigas aéreas'],
      en: ['Column concrete 4000 psi', 'Reinforcing steel 60,000 psi', 'Waffle slab, 0.40 m', 'Beam concrete'],
    },
    notes: {
      es: [
        { title: 'Contra lo contratado', body: 'Cada ítem muestra lo ejecutado frente al total pactado, corte tras corte.' },
        { title: 'Lo que se pasa, no entra', body: 'Si el acumulado supera lo contratado, el valor queda retenido hasta que el director apruebe una solicitud de cantidades.' },
        { title: 'AIU según el contrato', body: 'Administración, imprevistos y utilidad salen del contrato. Si es de IVA pleno, se liquida así. Nadie lo vuelve a calcular.' },
        { title: 'Descuentos solos', body: 'El anticipo se amortiza y la retegarantía se descuenta en cada corte, sin hojas aparte.' },
        { title: 'Firmas con nombre', body: 'El acta pasa de borrador a revisión y a aprobada, y cada paso queda a nombre de quien lo dio.' },
      ],
      en: [
        { title: 'Against the contract', body: 'Each item shows what has been executed against the agreed total, bill after bill.' },
        { title: "Overruns don't get through", body: 'If the running total exceeds the contract, the amount is held until the director approves a quantity request.' },
        { title: 'AIU from the contract', body: "Administration, contingency and profit come from the contract. If it's a full-VAT contract, it's billed that way. Nobody recalculates it." },
        { title: 'Deductions on their own', body: 'The advance is repaid and retention is withheld on every bill, with no side spreadsheets.' },
        { title: 'Named sign-offs', body: 'The bill moves from draft to review to approved, and every step is recorded under the name of whoever gave it.' },
      ],
    },
  },
  roles: {
    label: { es: 'Para quién', en: "Who it's for" },
    heading: { es: 'Cada persona de la constructora tiene su lugar', en: 'Everyone in the company has their place' },
    intro: {
      es: 'Todos trabajan sobre la misma información, pero cada uno ve y aprueba lo que le toca.',
      en: 'Everyone works on the same information, but each person sees and approves only their part.',
    },
    colRole: { es: 'Rol', en: 'Role' },
    colDoes: { es: 'Qué hace en BIW', en: 'What they do in BIW' },
    colSees: { es: 'Qué ve', en: 'What they see' },
  },
  steps: {
    label: { es: 'Implementación', en: 'Onboarding' },
    heading: { es: 'Así empezamos con una constructora', en: 'How we start with a construction company' },
    intro: {
      es: 'Sin proyectos de meses ni consultores eternos. Primero una obra, con su equipo, y después el resto.',
      en: 'No months-long projects or endless consultants. One project first, with its team, then the rest.',
    },
    localTitle: { es: 'Hecho para la operación colombiana', en: 'Built for Colombian operations' },
    local: {
      es: [
        'Contratos con AIU o con IVA pleno',
        'Actas de corte con anticipo y retegarantía',
        'Nómina con prestaciones de ley y festivos colombianos',
        'Montos en pesos colombianos',
        'Datos tratados según la Ley 1581 de 2012',
      ],
      en: [
        'Contracts with AIU or full VAT',
        'Progress bills with advance payments and retention',
        'Payroll with statutory benefits and Colombian public holidays',
        'Amounts in Colombian pesos',
        "Data handled under Colombia's Law 1581 of 2012",
      ],
    },
  },
  security: {
    label: { es: 'Seguridad', en: 'Security' },
    heading: { es: 'La información de su empresa, en su lugar', en: "Your company's information, kept in its place" },
  },
  faqs: {
    label: { es: 'Preguntas', en: 'Questions' },
    heading: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
  },
  contact: {
    label: { es: 'Contacto', en: 'Contact' },
    heading: { es: 'Hablemos de sus obras', en: "Let's talk about your projects" },
    intro: {
      es: 'Cuéntenos cuántas obras maneja y cómo las controla hoy. Le escribimos para mostrarle BIW sobre un caso parecido al suyo.',
      en: "Tell us how many projects you run and how you control them today. We'll get back to you to show BIW on a case close to yours.",
    },
    whatsappTitle: { es: 'Por WhatsApp', en: 'On WhatsApp' },
    whatsappBody: { es: 'Escríbale directo al equipo de BIW.', en: 'Message the BIW team directly.' },
    privacyTitle: { es: 'Sus datos', en: 'Your data' },
    privacyBody: {
      es: 'Tratados según la Ley 1581 de 2012 (Habeas Data).',
      en: "Handled under Colombia's Law 1581 of 2012 (Habeas Data).",
    },
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
    submit: { es: 'Contáctenos', en: 'Contact us' },
    submitting: { es: 'Enviando…', en: 'Sending…' },
    successTitle: { es: 'Recibimos su mensaje.', en: 'We got your message.' },
    successBody: {
      es: 'Le escribiremos en el próximo día hábil para coordinar la demostración.',
      en: "We'll write to you within the next business day to set up the demo.",
    },
    genericError: {
      es: 'No pudimos enviar su mensaje. Inténtelo de nuevo o escríbanos por WhatsApp.',
      en: "We couldn't send your message. Try again or reach us on WhatsApp.",
    },
    validation: {
      nameRequired: { es: 'Escriba su nombre completo.', en: 'Enter your full name.' },
      companyRequired: { es: 'Escriba el nombre de su empresa.', en: 'Enter your company name.' },
      roleRequired: { es: 'Escriba su cargo.', en: 'Enter your role.' },
      emailRequired: { es: 'Escriba su correo.', en: 'Enter your email.' },
      emailInvalid: { es: 'Escriba un correo válido.', en: 'Enter a valid email.' },
      phoneRequired: { es: 'Escriba su teléfono.', en: 'Enter your phone number.' },
      phoneInvalid: { es: 'Escriba un teléfono válido.', en: 'Enter a valid phone number.' },
      activeProjectsRequired: {
        es: 'Cuéntenos cuántas obras activas maneja.',
        en: 'Tell us how many active job sites you run.',
      },
      activeProjectsInvalid: {
        es: 'Escriba solo el número de obras activas.',
        en: 'Enter just the number of active job sites.',
      },
      consentRequired: {
        es: 'Debe autorizar el tratamiento de sus datos para continuar.',
        en: 'You must authorize the use of your data to continue.',
      },
    },
  },
  notFound: {
    title: { es: 'Página no encontrada — BIW', en: 'Page not found — BIW' },
    description: {
      es: 'La página que busca no existe o fue movida.',
      en: "The page you're looking for doesn't exist or was moved.",
    },
    heading: { es: 'No encontramos esta página', en: "We couldn't find this page" },
    body: {
      es: 'El enlace puede estar roto o la página fue movida. Vuelva al inicio para seguir conociendo BIW.',
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
