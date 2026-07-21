/**
 * Sanity → Vercel rebuild webhook.
 * On publish, Sanity POSTs here; we redeploy production so Astro SSG re-fetches content.
 *
 * Auth: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 * Requires env: SANITY_REVALIDATE_SECRET, VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID
 */
export const prerender = false;

const PROJECT_ID = import.meta.env.VERCEL_PROJECT_ID ?? 'prj_du7JnlfF0ssEjAKqg2do9jbrPUv2';
const ORG_ID = import.meta.env.VERCEL_ORG_ID ?? 'team_I6QdDV4mRCHypqM6pWap20rA';

export async function POST({ request }: { request: Request }) {
  const expected = import.meta.env.SANITY_REVALIDATE_SECRET;
  const token = import.meta.env.VERCEL_TOKEN;

  if (!expected || !token) {
    return json({ ok: false, error: 'Missing SANITY_REVALIDATE_SECRET or VERCEL_TOKEN' }, 500);
  }

  const auth = request.headers.get('authorization') ?? '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  if (provided !== expected) {
    return json({ ok: false, error: 'Unauthorized' }, 401);
  }

  try {
    const latest = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&target=production&limit=1&teamId=${ORG_ID}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!latest.ok) {
      const body = await latest.text();
      return json({ ok: false, error: 'Failed to list deployments', detail: body }, 502);
    }

    const data = (await latest.json()) as { deployments?: Array<{ uid: string }> };
    const deploymentId = data.deployments?.[0]?.uid;
    if (!deploymentId) {
      return json({ ok: false, error: 'No production deployment found' }, 404);
    }

    const redeploy = await fetch(
      `https://api.vercel.com/v13/deployments?teamId=${ORG_ID}&forceNew=1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'hiweb-website',
          deploymentId,
          target: 'production',
        }),
      },
    );

    const redeployBody = await redeploy.json();
    if (!redeploy.ok) {
      return json({ ok: false, error: 'Redeploy failed', detail: redeployBody }, 502);
    }

    return json({
      ok: true,
      deploymentId: redeployBody.id ?? redeployBody.uid,
      url: redeployBody.url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return json({ ok: false, error: message }, 500);
  }
}

export function GET() {
  return json({ ok: true, service: 'sanity-rebuild-webhook' });
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
