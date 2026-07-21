# Visual Editing (Presentation)

Editores pueden previsualizar la home y el blog **dentro del Studio**, con click-to-edit y drafts, sin publicar.

## Cómo usarlo (producción)

1. Abre Studio: [https://hiweb-website-xi.vercel.app/admin](https://hiweb-website-xi.vercel.app/admin)
2. En la barra izquierda, abre **Presentation** (no solo Structure).
3. Navega la preview (home `/`, blog `/blogs`, artículo `/blogs/[slug]`).
4. Haz click en un texto con overlay → salta al campo en Studio.
5. Edita un draft → la preview recarga y muestra el cambio.
6. **Publish** cuando esté listo. Visitantes sin cookie ven solo `published`.

Fuera del iframe de Presentation, el botón **Salir del preview** limpia la cookie de draft.

### Local

`astro dev` + `/admin` puede fallar en Astro 7 (Vite 8 / Rolldown). Opciones:

- Usar Studio en **producción** para Presentation, o
- `npm run studio` (Sanity Vite aparte) + `npm run dev` para el front, con `SANITY_STUDIO_PREVIEW_URL=http://localhost:4321`

## Requisitos de entorno

| Variable | Dónde | Notas |
|----------|--------|--------|
| `SANITY_API_READ_TOKEN` | Local `.env` + Vercel (Production + Preview) | Token **Viewer**. Sin él, `/api/draft-mode/enable` responde 500. |
| `SANITY_STUDIO_PREVIEW_URL` | Opcional | Solo si Studio y front no comparten origen. Embebido: se usa `location.origin`. |
| `PUBLIC_SANITY_*` / `SANITY_STUDIO_*` | Ya configuradas | Project `fxardjr1`, dataset `production` |

CORS con **Allow credentials** debe incluir el origen del sitio (prod + `http://localhost:4321` + previews `*.vercel.app` si aplica).

## Cómo crear el token Viewer

1. Entra a [sanity.io/manage](https://www.sanity.io/manage) → proyecto **Hiweb** (`fxardjr1`).
2. **API** → **Tokens** → **Add API token**.
3. Nombre: p. ej. `visual-editing-viewer`.
4. Permisos: **Viewer** (solo lectura; suficiente para drafts + stega).
5. Copia el token (solo se muestra una vez).
6. En Vercel → Project → **Settings** → **Environment Variables**:
   - Name: `SANITY_API_READ_TOKEN`
   - Value: el token
   - Environments: Production + Preview (+ Development si usas `vercel env pull`)
7. Redeploy para que el runtime lo tenga.

Nunca uses un token Editor/Admin en el front; no lo prefijes con `PUBLIC_`.

## Arquitectura

- Astro `output: 'server'` (Vercel) — draft mode lee cookie por request.
- `loadQuery` → `published` sin cookie; `drafts` + stega con cookie.
- `presentationTool` + locations en [`src/sanity/presentation/resolve.ts`](../src/sanity/presentation/resolve.ts).
- Overlays: [`SanityVisualEditing.tsx`](../src/components/SanityVisualEditing.tsx) en [`Layout.astro`](../src/layouts/Layout.astro).
- Enable/disable: [`/api/draft-mode/enable`](../src/pages/api/draft-mode/enable.ts), [`disable`](../src/pages/api/draft-mode/disable.ts).

## Checklist de prueba (prod)

- [ ] `SANITY_API_READ_TOKEN` en Vercel y redeploy
- [ ] `/admin` → Presentation carga la home
- [ ] Click en FAQ/testimonio/título de post abre el campo
- [ ] Cambio en draft se ve tras reload sin Publish
- [ ] Visitante sin cookie no ve drafts
- [ ] `/api/draft-mode/enable` sin secret → 401 (no 404 ni 500)
