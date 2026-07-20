# Fase 2 — Design system desde Webflow

## Fuente

Export de homepage en `reference/webflow/` (gitignored):

- `index.html` — estructura Header / Footer / secciones
- `css/hiwebmar.webflow.shared.*.min.css` — tokens `:root` y reglas
- `images/` — assets de marca

## Hecho

- [x] Design tokens en [`src/styles/global.css`](../src/styles/global.css)
- [x] Assets de marca en [`public/images/`](../public/images/)
- [x] [`Header.astro`](../src/components/Header.astro) — glass sticky nav, mega-menú Servicios, CTAs WhatsApp + Agenda, menú móvil
- [x] [`Footer.astro`](../src/components/Footer.astro) — 5 columnas, gradiente, divisores SVG
- [x] [`Button.astro`](../src/components/Button.astro) — primary / whatsapp / teal
- [x] [`SectionWrapper.astro`](../src/components/SectionWrapper.astro)
- [x] [`Layout.astro`](../src/layouts/Layout.astro) — Plus Jakarta Sans, favicons, Header + Footer

## Tokens clave

| Token | Valor |
|-------|-------|
| `--color-primary` | `#4f9cff` |
| `--color-cta` | `#23272f` |
| `--color-page-bg` | `#0e0e11` |
| `--color-casi-blanco` | `#fafafa` |
| `--font-heading/body` | Plus Jakarta Sans |
| `--container-max` | `80rem` |
| Breakpoints | 479 / 767 / 991 |

## Cómo validar

```bash
npm run dev
```

Comparar Header/Footer contra https://www.hiwebmarketing.com y el HTML en `reference/webflow/index.html`.

## Siguiente: Fase 3

Schemas Sanity (post, author, category, testimonial, faq, siteSettings) + Studio usable + 2–3 blogs de prueba.
