# Hiweb Marketing — Sitio web en código

Migración de [hiwebmarketing.com](https://www.hiwebmarketing.com) de Webflow a **Astro + Sanity + GSAP + Vercel**.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Astro (SSG) |
| CMS | Sanity + Studio embebido en `/admin` |
| Animaciones | GSAP (ScrollTrigger, etc.) |
| Hosting | Vercel |
| Versionado | GitHub (`hiwebapps/hiweb-website`) |

## Fase 0 — Setup completado

### MCPs en Cursor (`.cursor/mcp.json`)

- **Sanity** — `https://mcp.sanity.io` (OAuth)
- **Vercel** — `https://mcp.vercel.com` (OAuth)

**Autenticación manual requerida:** abre *Cursor Settings → Tools & MCP*, activa ambos servidores y completa el login OAuth cuando aparezca *Needs login*.

### Skills instaladas

- **GSAP** — `greensock/gsap-skills` (en `.cursor/skills/` o reglas del proyecto)
- **Sanity plugin** — instalar en Cursor chat: `/add-plugin sanity`

### Cuentas pendientes (Fase 1)

1. Crear proyecto en [sanity.io/manage](https://sanity.io/manage)
2. Conectar este repo en [vercel.com](https://vercel.com) (después del scaffold Astro)

## Desarrollo local

> Disponible a partir de la Fase 1.

```bash
npm install
npm run dev
```
