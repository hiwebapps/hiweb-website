# Fase 1 — Scaffold completado

## Hecho

- Astro 7 (TypeScript strict) en la raíz del repo
- Integraciones: `@sanity/astro`, `@astrojs/react`, `@astrojs/vercel`
- GSAP + registro central en `src/lib/gsap.ts`
- Studio embebido en `/admin` (`studioBasePath`)
- Proyecto Sanity conectado: `fxardjr1` / dataset `production`
- CORS: `http://localhost:4321` (credentials)
- Estructura de carpetas según AGENTS.md (placeholders listos para Fases 2–4)
- `npm run build` OK (home + `/admin`)

## Comandos

```bash
npm run dev      # http://localhost:4321  ·  Studio: /admin
npm run build
```

## Siguiente: Fase 2

Export de Webflow → `reference/webflow/` → design tokens en `src/styles/global.css` → Header/Footer/Layout pixel-perfect.
