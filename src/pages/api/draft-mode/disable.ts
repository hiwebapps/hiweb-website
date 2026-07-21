import type { APIRoute } from 'astro';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

export const prerender = false;

function clearPerspectiveCookie(
  cookies: Parameters<APIRoute>[0]['cookies'],
  isSecure: boolean,
) {
  cookies.set(perspectiveCookieName, '', {
    httpOnly: false,
    sameSite: isSecure ? 'none' : 'lax',
    secure: isSecure,
    path: '/',
    maxAge: 0,
  });
  cookies.delete(perspectiveCookieName, { path: '/' });
}

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:';
  clearPerspectiveCookie(cookies, isSecure);

  // Silent clear from the public site (no visible "exit preview" UI).
  if (url.searchParams.get('silent') === '1') {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const redirectTo = url.searchParams.get('redirect') || '/';
  return redirect(redirectTo, 307);
};
