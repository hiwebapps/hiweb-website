/** Hostnames allowed to be indexed by search engines (live site only). */
const INDEXABLE_HOSTS = new Set(['www.hiwebmarketing.com', 'hiwebmarketing.com']);

/**
 * Preview / Vercel / localhost must stay out of search results so they do not
 * compete with the live Webflow site during migration.
 */
export function shouldNoIndex(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return !INDEXABLE_HOSTS.has(host);
}
