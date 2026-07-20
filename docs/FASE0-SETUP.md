# Fase 0 — Checklist de setup

Estado de la migración Hiweb → Astro + Sanity + GSAP + Vercel.

## Completado automáticamente

- [x] `.cursor/mcp.json` con Sanity + Vercel MCP
- [x] GSAP skills instaladas (8 skills en `.agents/skills/`)
- [x] `.gitignore`, `.env.example`, `README.md`
- [x] Repositorio Git inicializado en `main`

## Acciones manuales requeridas (tú)

### 1. Autenticar MCPs en Cursor

1. Abre **Cursor Settings → Tools & MCP**
2. Activa **Sanity** y **Vercel**
3. Haz clic en **Needs login** en cada uno y completa OAuth

### 2. Login de Sanity CLI (para schemas y deploy de Studio)

```powershell
npx sanity@latest login --provider google
# o: --provider github
```

Luego re-ejecuta:

```powershell
npx sanity@latest mcp configure
```

### 3. Plugin de Sanity para Cursor

En el chat de Cursor escribe:

```
/add-plugin sanity
```

Esto agrega agent skills adicionales de Sanity (schemas, GROQ, SEO/AEO).

### 4. Cuentas externas (Fase 1)

| Servicio | Acción | URL |
|----------|--------|-----|
| Sanity | Crear proyecto `hiweb-marketing` | https://sanity.io/manage |
| Vercel | Importar repo después del scaffold | https://vercel.com/new |

## Verificación

Pregúntale al agente en Cursor:

- *"¿Qué skills de GSAP tienes disponibles?"* → debe listar gsap-core, gsap-scrolltrigger, etc.
- *"Lista los MCP tools de Sanity"* → debe mostrar herramientas tras OAuth

## Siguiente paso

**Fase 1**: scaffold Astro + `@sanity/astro` + `AGENTS.md`
