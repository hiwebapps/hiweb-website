# Fase 3 — Sanity CMS + contenido de prueba

## Schemas (`src/sanity/schemas/`)

| Tipo | Uso |
|------|-----|
| `post` | Artículos del blog (slug = URL Webflow `/blogs/[slug]`) |
| `author` | Autores |
| `category` | Categorías del blog |
| `testimonial` | Testimonios de la home |
| `faq` | Preguntas frecuentes (general / redes / seo) |
| `siteSettings` | Singleton de configuración del sitio |

Todos incluyen campo oculto `language` con default `es` (i18n-ready). Posts y settings tienen grupo SEO.

## Studio

- Embebido en `/admin`
- Structure en español: Blog → Home (testimonios/FAQs) → Configuración
- Workspace desplegado: `hiweb-marketing` (`fxardjr1` / `production`)

```bash
npx sanity schema deploy   # tras cambiar schemas
npm run dev                # Studio en http://localhost:4321/admin
```

## Queries

Centralizadas en [`src/sanity/queries.ts`](../src/sanity/queries.ts):

- `postsQuery`, `postBySlugQuery`, `postSlugsQuery`
- `testimonialsQuery`, `faqsQuery`, `siteSettingsQuery`

## Contenido de prueba publicado

**Blog (slugs reales del sitio):**

1. `/blogs/auditoria-seo`
2. `/blogs/como-optimizar-tu-marketing-digital-hoy`
3. `/blogs/diferencias-entre-un-sitio-web-y-una-landing-page`

También: 1 autor, 3 categorías, 3 testimonios, 5 FAQs, `siteSettings`.

## Páginas Astro

- [`src/pages/blogs/index.astro`](../src/pages/blogs/index.astro) — listado
- [`src/pages/blogs/[slug].astro`](../src/pages/blogs/[slug].astro) — post + Portable Text

## Cómo probar con el equipo editorial

1. `npm run dev`
2. Abrir `/admin` e iniciar sesión con cuenta Sanity
3. Editar un artículo → Publish
4. Rebuild local (`npm run build`) o, en Fase 5, webhook → Vercel

## Siguiente: Fase 4

Home pixel-perfect sección por sección + animaciones GSAP, consumiendo testimonios/FAQs de Sanity.
