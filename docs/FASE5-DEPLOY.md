# Fase 5 — Deploy Vercel + workflow editorial

## Producción (team Hiweb)

| Item | Valor |
|------|--------|
| URL producción | https://hiweb-website-xi.vercel.app |
| Studio | https://hiweb-website-xi.vercel.app/admin |
| Team Vercel | **Hiweb** (`team_gkiLLQv9laYqwef1UaTvRazB`) |
| Repo | `hiwebapps/hiweb-website` (Git conectado) |
| Sanity | `fxardjr1` / `production` |
| Proyecto Vercel | `prj_YXfVbxPMBzpF54ZpgIexpm1lIxop` |

### Deployment Protection

Si la URL pide login de Vercel: **Settings → Deployment Protection** → desactivar en Production (o solo Preview).

## Env vars (Production + Preview)

Obligatorias:

- `PUBLIC_SANITY_PROJECT_ID` = `fxardjr1`
- `PUBLIC_SANITY_DATASET` = `production`
- `SANITY_STUDIO_PROJECT_ID` = `fxardjr1`
- `SANITY_STUDIO_DATASET` = `production`
- `SANITY_API_READ_TOKEN` = token Viewer (Visual Editing / Presentation)

Opcional: `SANITY_STUDIO_PREVIEW_URL` = `https://hiweb-website-xi.vercel.app`

Con SSR (`output: 'server'`), el contenido **publicado** se lee en cada request — el Deploy Hook ya no es obligatorio para ver texto nuevo. Sigue útil tras cambios de código. Preview visual: ver [VISUAL-EDITING.md](./VISUAL-EDITING.md).

## Rebuild editorial — Deploy Hook + webhook Sanity

Deploy Hook de Vercel: ya creado (Settings → Git → Deploy Hooks → `sanity-publish` / branch `main`).  
**No pegues la URL del Deploy Hook en chats ni docs** — cualquiera con el link puede disparar un deploy.

### Crear el webhook en Sanity

1. [sanity.io/manage](https://www.sanity.io/manage) → proyecto `fxardjr1` → **API → Webhooks** → Create.
2. Config:
   - **Name:** `vercel-rebuild`
   - **URL:** pegar el Deploy Hook de Vercel
   - **Dataset:** `production`
   - **Trigger:** Create + Update + Delete
   - **Drafts / versions:** off
   - **Filter:** `_type in ["post","author","category","testimonial","faq","siteSettings"]`
   - **Projection:** `{_id,_type}`
   - **HTTP method:** POST

### Si Manage / API de hooks falla (503)

Incidente Sanity en curso: **[Issue Viewing Webhooks](https://www.sanity-status.com)** (`Webhooks: partial_outage`) — la página/API de hooks no carga ni deja crear. No es un error de tu config.

**Workaround temporal:** después de publicar en Studio, dispara un rebuild con:

```bash
curl -X POST "<TU_DEPLOY_HOOK_URL>"
```

(o abre la URL del Deploy Hook en el navegador). Estado: [sanity-status.com](https://www.sanity-status.com). Cuando vuelva a `operational`, crea el webhook con la config de arriba.

Verificado: el Deploy Hook responde **201** y encola deploy en Vercel.

### Alternativa — `/api/sanity-webhook`

Solo si prefieres no usar Deploy Hook:

- Env: `SANITY_REVALIDATE_SECRET`, `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID` (`team_gkiLLQv9laYqwef1UaTvRazB`)
- Webhook Sanity → `POST https://hiweb-website-xi.vercel.app/api/sanity-webhook`
- Header: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`

(También depende de la API de hooks de Sanity para crearse.)

## CORS Sanity

Orígenes con credentials:

- `https://hiweb-website-xi.vercel.app`
- `https://*.vercel.app`
- (legacy) `https://hiweb-website-dg6tjesyv-hiweb.vercel.app`

## Deploy anterior (jahir-gosu)

`jahir-gosu/hiweb-website` → https://hiweb-website.vercel.app — archivable cuando Hiweb sea la fuente de verdad.

## Siguiente

- Cuando Sanity Hooks API esté OK → crear webhook `vercel-rebuild`.
- Cutover DNS `www.hiwebmarketing.com` cuando toque.
