import type { APIRoute } from 'astro';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const isSecure = new URL(request.url).protocol === 'https:';
  // Clear with the same attributes used when setting (SameSite/Secure), or browsers keep the cookie.
  cookies.set(perspectiveCookieName, '', {
    httpOnly: false,
    sameSite: isSecure ? 'none' : 'lax',
    secure: isSecure,
    path: '/',
    maxAge: 0,
  });
  cookies.delete(perspectiveCookieName, { path: '/' });
  return redirect('/', 307);
};
