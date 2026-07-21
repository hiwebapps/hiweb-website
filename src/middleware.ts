import { defineMiddleware } from 'astro:middleware';
import { shouldNoIndex } from './lib/seo';

/** Belt-and-suspenders: keep crawlers off preview/staging hosts. */
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (!shouldNoIndex(context.url.hostname)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
