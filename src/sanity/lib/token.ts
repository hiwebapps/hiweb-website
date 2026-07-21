export const token =
  (typeof import.meta !== 'undefined' && import.meta.env?.SANITY_API_READ_TOKEN) ||
  (typeof process !== 'undefined' && process.env?.SANITY_API_READ_TOKEN) ||
  undefined;

if (!token) {
  console.warn(
    'Missing SANITY_API_READ_TOKEN — Visual Editing / draft mode will fail until it is set.',
  );
}
