# AGENTS.md — Hiweb Marketing Website

Guía para agentes de IA que trabajen en este repositorio. Léela antes de buscar en el proyecto.

## Propósito del proyecto

Migración de [www.hiwebmarketing.com](https://www.hiwebmarketing.com) (agencia de marketing digital en Mérida, México) de **Webflow** a código propio, **pixel-perfect** respecto al sitio actual.

**Stack:** Astro (SSG) + Sanity (CMS, Studio embebido en `/admin`) + GSAP (animaciones) + Vercel (hosting) + GitHub (`hiwebapps/hiweb-website`).

**Estado:** MVP en construcción — home pixel-perfect + blog conectado a Sanity. Idioma: solo español (`es`), con schemas preparados para i18n futuro (campo `language`). El resto del sitio (servicios, portafolio, landings, recursos interactivos, inglés) es post-MVP.

**Plan por fases:** ver [docs/FASE0-SETUP.md](docs/FASE0-SETUP.md) y [docs/FASE1-SCAFFOLD.md](docs/FASE1-SCAFFOLD.md). Fases 0–1 completadas (MCPs + scaffold Astro/Sanity/GSAP).

## Mapa de carpetas

```
.
├── AGENTS.md              # Este archivo
├── README.md              # Overview del stack y setup
├── astro.config.mjs       # Config Astro: integraciones @sanity/astro, react, vercel; studioBasePath: '/admin'
├── sanity.config.ts       # Config del Sanity Studio embebido (workspace, schemas, structure en español)
├── .env.example           # Variables de entorno requeridas (copiar a .env)
├── .cursor/
│   ├── mcp.json           # MCPs del proyecto: Sanity (mcp.sanity.io) y Vercel (mcp.vercel.com)
│   └── rules/             # Reglas de convenciones: astro, sanity, gsap
├── .agents/skills/        # 8 GSAP agent skills oficiales (no editar)
├── docs/                  # Documentación de fases y decisiones
├── reference/webflow/     # Export HTML/CSS/JS de Webflow — SOLO referencia pixel-perfect, gitignored
├── public/                # Assets estáticos (favicons, imágenes que no viven en Sanity)
└── src/
    ├── components/        # Componentes .astro por sección de página (Hero.astro, Services.astro, Testimonials.astro, Faq.astro, Header.astro, Footer.astro...)
    ├── layouts/           # Layout.astro: <head> con SEO/OG/schema.org, Header, Footer, slot
    ├── pages/             # Rutas: index.astro (home), blogs/index.astro (listado), blogs/[slug].astro (post)
    ├── lib/
    │   ├── gsap.ts        # ÚNICO punto de registro de GSAP + plugins; importa gsap desde aquí, nunca directo
    │   └── animations/    # Una animación por archivo: hero.ts, scroll-reveals.ts, counters.ts, testimonials-slider.ts...
    ├── sanity/
    │   ├── schemas/       # Un schema por documento: post.ts, author.ts, category.ts, testimonial.ts, faq.ts, siteSettings.ts + index.ts que los exporta
    │   ├── queries.ts     # TODAS las queries GROQ centralizadas — nunca escribir GROQ inline en páginas
    │   └── image.ts       # Helper urlFor() para imágenes de Sanity
    └── styles/
        └── global.css     # Design tokens de Webflow como CSS custom properties (colores, tipografía, espaciados, breakpoints)
```

Si un archivo de esta lista aún no existe, es porque su fase no ha llegado; créalo en la ubicación indicada.

## Dónde vive cada cosa

| Necesitas... | Ve a... |
|--------------|---------|
| Agregar/editar un tipo de contenido del CMS | `src/sanity/schemas/` (un archivo por schema, registrar en `index.ts`) |
| Consultar contenido de Sanity | `src/sanity/queries.ts` (agregar la query ahí, importarla en la página) |
| Crear/editar una animación | `src/lib/animations/` (un archivo por animación; GSAP se importa de `src/lib/gsap.ts`) |
| Cambiar estilos globales o tokens | `src/styles/global.css` |
| Agregar una sección a una página | `src/components/` (componente `.astro` autocontenido) |
| SEO, meta tags, schema.org | `src/layouts/Layout.astro` (recibe props por página) |
| Comparar contra el diseño original | `reference/webflow/` (export de Webflow) o https://www.hiwebmarketing.com |

## Convenciones de nombres

- **Componentes Astro:** PascalCase — `Hero.astro`, `ServiceCard.astro`
- **Archivos TS (lib, animations, schemas):** camelCase — `scrollReveals.ts`, `siteSettings.ts`
- **Schemas de Sanity:** nombre del documento en singular y camelCase — `post`, `caseStudy`, `siteSettings`
- **Rutas/páginas:** kebab-case igual que las URLs actuales del sitio — `/blogs/[slug]`, `/cotiza-ahora/ads`
- **Clases CSS:** kebab-case; tokens como `--color-primary`, `--font-heading`
- **Contenido y UI:** en español; código, variables y commits en inglés o español consistente (prefijo convencional: `feat:`, `fix:`, `chore:`)

## Flujo de contenido: Webflow → Sanity → Astro

```
Webflow (sitio actual, fuente de verdad del diseño)
  │  1. Export de código → reference/webflow/ (tokens, estructura HTML, assets)
  │  2. Contenido CMS (blogs, portafolio) → CSV export o scraping → Sanity vía MCP/scripts
  ▼
Sanity Content Lake (fuente de verdad del contenido)
  │  Editores usan Studio en /admin (crear, editar, publicar)
  │  Al publicar → webhook → Deploy Hook de Vercel → rebuild (~1-2 min)
  ▼
Astro (build estático)
  │  queries.ts trae contenido con GROQ en build time
  ▼
Vercel (producción en main, previews por PR)
```

**Regla crítica de URLs:** los slugs deben coincidir EXACTAMENTE con los actuales (`/blogs/[slug]`, `/servicios/[slug]`, `/portafolio/[slug]`) para no perder SEO al lanzar.

## Reglas rápidas

1. Render **estático por defecto**; solo `/admin` y endpoints API usan servidor.
2. GSAP siempre desde `src/lib/gsap.ts`; cleanup con `gsap.context()`; respetar `prefers-reduced-motion` con `gsap.matchMedia()`.
3. GROQ solo en `queries.ts`; cargar el schema con el MCP de Sanity antes de escribir queries nuevas.
4. Todo texto visible al usuario debe venir de Sanity si es contenido editorial (testimonios, FAQs, posts); hardcodear solo microcopy estructural.
5. No editar `.agents/skills/` ni `reference/webflow/`.
6. Detalle de convenciones por tecnología: `.cursor/rules/astro-conventions.mdc`, `sanity-conventions.mdc`, `gsap-conventions.mdc`.
