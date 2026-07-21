/**
 * ESM bridge for `react/compiler-runtime`.
 * React ships this entry as CJS; Sanity imports `{ c }` as ESM. When `sanity`
 * is excluded from Vite optimizeDeps (Rolldown package.json bug), the CJS
 * entry is loaded raw and named exports fail — re-export from the CJS build
 * via createRequire is awkward in the browser, so mirror the public API.
 */
import React from 'react';

/** @param {number} size */
export function c(size) {
  const internals =
    // @ts-expect-error React private API used by the compiler runtime
    React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  const dispatcher = internals?.H;
  if (dispatcher == null) {
    throw new Error('react/compiler-runtime: invalid hook call (no dispatcher)');
  }
  return dispatcher.useMemoCache(size);
}

export default { c };
