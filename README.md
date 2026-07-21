# Hiweb Marketing — Sitio web en código

Migración de [hiwebmarketing.com](https://www.hiwebmarketing.com) de Webflow a **Astro + Sanity + GSAP + Vercel**.

Ver [AGENTS.md](AGENTS.md) para el mapa completo del proyecto (obligatorio para agentes de IA).

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Astro 7 (SSG) |
| CMS | Sanity (`fxardjr1` / `production`) — Studio en `/admin` |
| Animaciones | GSAP |
| Hosting | Vercel |
| Repo | [hiwebapps/hiweb-website](https://github.com/hiwebapps/hiweb-website) |

## Setup local

```bash
cp .env.example .env   # ya tiene projectId/dataset
npm install
npm run dev
```

- Sitio: http://localhost:4321  
- Studio: http://localhost:4321/admin  

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |

## Fases

- [x] Fase 0 — MCPs, skills, repo GitHub  
- [x] Fase 1 — Scaffold Astro + Sanity + GSAP  
- [x] Fase 2 — Export Webflow + design tokens + Header/Footer  
- [x] Fase 3 — Schemas + Studio + contenido de prueba  
- [x] Fase 4 — Home pixel-perfect + blog + GSAP  
- [ ] Fase 5 — Deploy Vercel + workflow editorial  
