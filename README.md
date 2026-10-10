# BIW — Landing page

Landing de marketing de **BIW (Building Integrated Workflow)**, plataforma de control y seguimiento de obras de construcción. Sitio estático, bilingüe (español/inglés), con tema claro tipo papel (por defecto) y oscuro opcional. Dirección visual «documento de obra»: ver `DESIGN.md`.

**Stack:** Astro 7 (output estático) · React 19 (una sola island: el formulario) · Tailwind CSS v4 · TypeScript strict · Vitest.

## Requisitos

- Node.js `>= 22.12.0`
- **pnpm** — no uses npm: el repo tiene `pnpm-lock.yaml` y `npm install` falla con `Cannot read properties of null (reading 'matches')`.

## Empezar

```sh
pnpm install
pnpm dev          # http://localhost:4321 → redirige a /es
```

## Scripts

| Comando        | Qué hace                                                     |
| :------------- | :----------------------------------------------------------- |
| `pnpm dev`     | Servidor de desarrollo                                       |
| `pnpm build`   | `astro check` + build a `dist/` (errores TS rompen el build) |
| `pnpm preview` | Sirve `dist/` localmente                                     |
| `pnpm check`   | Solo chequeo de tipos                                        |
| `pnpm lint`    | ESLint                                                       |
| `pnpm format`  | Prettier (con plugins de Astro y Tailwind)                   |
| `pnpm test`    | Vitest                                                       |

Antes de dar un cambio por terminado: `pnpm build && pnpm lint && pnpm test`.

## Rutas

| URL                                 | Página                           |
| :---------------------------------- | :------------------------------- |
| `/`                                 | Redirige a `/es`                 |
| `/es/` · `/en/`                     | Landing                          |
| `/es/privacidad` · `/en/privacidad` | Política de tratamiento de datos |
| `/404`                              | Página no encontrada             |

## Estructura

```text
src/
├── content/          # Copy de la landing (JSON, un archivo por idioma: x.json / x.en.json)
├── content.config.ts # Esquemas zod de las colecciones
├── lib/
│   ├── i18n.ts       # Diccionario de UI (headings, labels, aria, errores) + helpers de locale
│   ├── validation.ts # Validación del formulario de contacto
│   └── whatsapp.ts
├── styles/global.css # Tokens de color (papel/tinta/azul del logo), tema claro/oscuro, utilidades sheet/figures
├── components/       # Atomic design: atoms / molecules / organisms / templates / seo
├── layouts/BaseLayout.astro
└── pages/
    ├── es/  en/      # Wrappers finos por idioma
    ├── _shared/      # Implementación real de cada página (compartida entre idiomas)
    └── 404.astro
```

- **Textos:** el contenido de producto vive en `src/content/`; los textos de interfaz en `src/lib/i18n.ts`. Nada de copy hardcodeado en componentes.
- **Temas:** los colores que cambian con el tema usan las utilidades semánticas de `global.css` (`bg-paper`, `text-ink-2`, `border-rule`, …), nunca un hex suelto.
- **Agregar un idioma:** nuevo locale en `astro.config.mjs`, carpeta `src/pages/<locale>/`, archivo hermano `.<locale>.json` por cada entrada de contenido y columna nueva en el diccionario de `i18n.ts`.

## Variables de entorno

| Variable               | Uso                                                                                                   |
| :--------------------- | :---------------------------------------------------------------------------------------------------- |
| `PUBLIC_DEMO_ENDPOINT` | URL que recibe el formulario "Contáctenos" (`POST` JSON). Sin definir, el envío se simula localmente. |

## Pendientes antes de producción

- Número real de WhatsApp (`whatsappNumber` en `src/content/site.json`, ambos idiomas).
- Imagen Open Graph 1200×630 (`ogImage` en `site.json`).
- Backend para el formulario (`PUBLIC_DEMO_ENDPOINT`).
- Revisar el copy de `src/content/` contra la especificación en Notion (se redactó a partir de un extracto).
- Fotos propias de obra y/o sección de equipo cuando existan (hoy la landing no usa fotos: las de stock se quitaron a propósito). Un host de imágenes remoto nuevo debe agregarse a `image.remotePatterns` en `astro.config.mjs`.
- Confirmar con el equipo los pasos de implementación (`src/content/steps/`) y la frase «Le escribiremos en el próximo día hábil» del formulario: son promesas de servicio.
- Datos legales de la política de privacidad (razón social, NIT, ciudad, correo) en `PrivacyPage.astro`.

## Documentación del proyecto

- `PRODUCT.md` — qué es el producto, usuarios y qué **no** puede prometer la landing (offline, geofencing, clientes inventados, IA como disponible).
- `DESIGN.md` — sistema visual.
- `AGENTS.md` / `CLAUDE.md` — arquitectura y reglas de diseño para agentes de código.
