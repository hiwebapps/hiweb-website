import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import { sanityClient } from 'sanity:client';
import { token } from '../../../sanity/lib/token';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  if (!token) {
    return new Response('Server misconfigured: missing SANITY_API_READ_TOKEN', {
      status: 500,
    });
  }

  const clientWithToken = sanityClient.withConfig({
    token,
    useCdn: false,
    perspective: 'published',
  });
  const { isValid, redirectTo = '/', studioPreviewPerspective } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  );

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  // Presentation loads the site in an iframe — cookies need SameSite=None; Secure on HTTPS.
  // Localhost HTTP cannot use Secure, so Lax is used there.
  const isSecure = new URL(request.url).protocol === 'https:';
  cookies.set(perspectiveCookieName, studioPreviewPerspective ?? 'drafts', {
    httpOnly: false,
    sameSite: isSecure ? 'none' : 'lax',
    secure: isSecure,
    path: '/',
  });

  return redirect(redirectTo, 307);
};
