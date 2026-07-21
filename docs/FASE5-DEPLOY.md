# Fase 5 — Deploy Vercel + workflow editorial

## Producción

| Item | Valor |
|------|--------|
| URL | https://hiweb-website.vercel.app |
| Proyecto Vercel | `jahir-gosu/hiweb-website` |
| Project ID | `prj_du7JnlfF0ssEjAKqg2do9jbrPUv2` |
| Org / team ID | `team_I6QdDV4mRCHypqM6pWap20rA` |
| Sanity | `fxardjr1` / `production` |
| Studio | https://hiweb-website.vercel.app/admin |

> Nota: el CLI de Vercel autenticado en esta máquina usa el team **jahir-gosu**. El team **Hiweb** del MCP aún no tenía proyectos; el deploy se hizo en la cuenta disponible. Cuando conectes GitHub (`hiwebapps/hiweb-website`) desde el dashboard de Vercel con una cuenta que tenga acceso al org, los deploys por push a `main` quedarán automáticos.

## Env vars en Vercel (Production + Preview)

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_REVALIDATE_SECRET` (sensitive)
- `VERCEL_TOKEN` (sensitive — token personal de Vercel)
- `VERCEL_PROJECT_ID`
- `VERCEL_ORG_ID`

## CORS Sanity

Orígenes con credentials:

- `https://hiweb-website.vercel.app`
- `https://*.vercel.app`

## Rebuild al publicar (Sanity → Vercel)

No hay Deploy Hook de Git todavía (el proyecto no está linkeado al repo). En su lugar:

1. Endpoint serverless: `POST https://hiweb-website.vercel.app/api/sanity-webhook`
2. Header: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
3. El endpoint llama a la API de Vercel para **redeploy** de producción (nuevo build SSG que vuelve a fetch Sanity).

### Crear el webhook en Sanity Manage

La API de hooks de Sanity devolvió **503** durante el setup. Créalo a mano:

1. Abre https://www.sanity.io/manage/project/fxardjr1/api/webhooks  
2. **Create webhook**
   - Name: `Trigger Vercel rebuild`
   - URL: `https://hiweb-website.vercel.app/api/sanity-webhook`
   - Dataset: `production`
   - Trigger: Create + Update + Delete (drafts off)
   - Filter: `_type in ["post","author","category","testimonial","faq","siteSettings"]`
   - Projection: `{_id,_type}`
   - Method: `POST`
   - Header: `Authorization` = `Bearer <mismo SANITY_REVALIDATE_SECRET que en Vercel>`
3. Guarda y usa **Test webhook** o publica un documento.

### Probar el endpoint

```bash
curl -X POST https://hiweb-website.vercel.app/api/sanity-webhook \
  -H "Authorization: Bearer $SANITY_REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type":"faq"}'
```

Respuesta esperada: `{ "ok": true, "deploymentId": "...", "url": "..." }`.

## Checklist editorial (validado)

- [x] Home + `/blogs` + `/admin` en producción
- [x] Publish de FAQ + `POST /api/sanity-webhook` → nuevo deployment Ready
- [x] Contenido actualizado visible en https://hiweb-website.vercel.app

## Deploy local / CLI

```bash
npx vercel link --yes --scope jahir-gosu --project hiweb-website
npx vercel deploy --prod --yes
```

## Siguiente (post-Fase 5)

- Conectar GitHub `hiwebapps/hiweb-website` en Vercel (Deploy Hooks nativos).
- Apuntar `www.hiwebmarketing.com` / DNS cutover.
- Rotar `VERCEL_TOKEN` a un token dedicado de equipo (no el token de sesión del CLI).
