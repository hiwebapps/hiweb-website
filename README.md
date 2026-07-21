# Hiweb Marketing — Sitio web en código

Migración de [hiwebmarketing.com](https://www.hiwebmarketing.com) de Webflow a **Astro + Sanity + GSAP + Vercel**.

Ver [AGENTS.md](AGENTS.md) para el mapa completo del proyecto (obligatorio para agentes de IA).

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Astro 7 (SSR en Vercel — Visual Editing) |
| CMS | Sanity (`fxardjr1` / `production`) — Studio en `/admin` + Presentation |
| Animaciones | GSAP |
| Hosting | Vercel |
| Repo | [hiwebapps/hiweb-website](https://github.com/hiwebapps/hiweb-website) |

## Setup local

```bash
cp .env.example .env   # projectId/dataset + SANITY_API_READ_TOKEN (Viewer)
npm install
npm run dev
```

- Sitio: http://localhost:4321  
- Studio: http://localhost:4321/admin → **Presentation** para preview visual  

Guía: [docs/VISUAL-EDITING.md](docs/VISUAL-EDITING.md). En Vercel (Production + Preview) añade la misma `SANITY_API_READ_TOKEN`.

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Dev server Astro |
| `npm run studio` | Sanity Studio standalone (alternativa local si `/admin` falla) |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |

## Fases

- [x] Fase 0 — MCPs, skills, repo GitHub  
- [x] Fase 1 — Scaffold Astro + Sanity + GSAP  
- [x] Fase 2 — Export Webflow + design tokens + Header/Footer  
- [x] Fase 3 — Schemas + Studio + contenido de prueba  
- [x] Fase 4 — Home pixel-perfect + blog + GSAP  
- [x] Fase 5 — Deploy Vercel + workflow editorial  
