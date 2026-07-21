# Fase 4 — Home pixel-perfect + GSAP

## Nav fix

El mega-menú de Servicios no se cerraba porque `.nav__dropdown { display: grid }` anulaba el comportamiento nativo de `[hidden]`. Se forzó:

```css
.nav__dropdown[hidden] { display: none !important; }
```

También: cierre con click fuera, Escape, y listeners sin duplicar.

## Secciones de la home

| Componente | Contenido |
|------------|-----------|
| `Hero.astro` | Eyebrow, H1, lede, CTA |
| `LogoMarquee.astro` | Logos de clientes (GSAP loop) |
| `About.astro` | Value prop + checklist + foto equipo |
| `Services.astro` | 9 servicios + card Marketing 360 |
| `Portfolio.astro` | 4 casos destacados |
| `Experience.astro` | Contadores + testimonios (Sanity) |
| `Process.astro` | 4 pasos |
| `Faq.astro` | Tabs + acordeón (Sanity) |
| `FinalCta.astro` | CTA final |

## Animaciones (`src/lib/animations/`)

- `hero.ts` — entrada staggered
- `logoMarquee.ts` — scroll infinito
- `scrollReveals.ts` — ScrollTrigger `once`
- `counters.ts` — count-up al viewport
- `testimonialsSlider.ts` — prev/next
- `home.ts` — orquestación + `gsap.context()` cleanup

Respetan `prefers-reduced-motion`.

## Cómo validar

```bash
npm run dev
```

Comparar contra https://www.hiwebmarketing.com y `reference/webflow/index.html`.

## Siguiente: Fase 5

Deploy Vercel + webhook Sanity → rebuild automático + prueba editorial.
