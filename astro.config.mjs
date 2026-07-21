// @ts-check
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

const rootDir = dirname(fileURLToPath(import.meta.url));
const sanityIndex = join(rootDir, 'node_modules/sanity/lib/index.js');
const sanityIndexUrl = pathToFileURL(sanityIndex).href;
const voidElementsShim = join(rootDir, 'src/shims/void-elements.js');
const reactCompilerRuntimeShim = join(rootDir, 'src/shims/react-compiler-runtime.js');
const useSyncExternalStoreShim = join(rootDir, 'src/shims/use-sync-external-store-shim.js');
const useSyncExternalStoreWithSelectorShim = join(
  rootDir,
  'src/shims/use-sync-external-store-with-selector.js',
);

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

/**
 * Astro 7 + embedded Studio is supported, but Vite 8 / Rolldown mis-resolves
 * bare `import … from "sanity"` to `sanity/package.json` (see exports
 * `"./package.json"`) during optimizeDeps → hundreds of MISSING_EXPORT errors.
 *
 * Fix: exclude `sanity` from dep optimization, force the real entry via
 * resolveId + rewrite self-imports. Keep `@sanity/astro`'s module-dedupe for
 * react / styled-components prebundling — do not add CJS transform plugins.
 */
function sanityEntryResolve() {
  return {
    name: 'sanity-entry-resolve',
    enforce: 'pre',
    resolveId(id) {
      const clean = id.split('?')[0].replace(/\\/g, '/');
      if (id === 'sanity' || clean.endsWith('/sanity/package.json')) {
        return sanityIndex;
      }
      if (id === 'void-elements' || clean.endsWith('/void-elements/index.js')) {
        return voidElementsShim;
      }
      if (
        id === 'react/compiler-runtime' ||
        clean.endsWith('/react/compiler-runtime.js') ||
        clean.endsWith('/react/compiler-runtime')
      ) {
        return reactCompilerRuntimeShim;
      }
      if (
        id === 'use-sync-external-store/shim' ||
        clean.endsWith('/use-sync-external-store/shim/index.js')
      ) {
        return useSyncExternalStoreShim;
      }
      if (
        id === 'use-sync-external-store/shim/with-selector' ||
        clean.endsWith('/use-sync-external-store/shim/with-selector.js')
      ) {
        return useSyncExternalStoreWithSelectorShim;
      }
      return null;
    },
    transform(code, id) {
      const clean = id.split('?')[0].replace(/\\/g, '/');
      if (!clean.includes('/node_modules/sanity/')) return null;
      if (!/\bfrom\s*["']sanity["']/.test(code) && !/\bimport\s*["']sanity["']/.test(code)) {
        return null;
      }
      const next = code
        .replaceAll('from "sanity"', `from ${JSON.stringify(sanityIndexUrl)}`)
        .replaceAll("from 'sanity'", `from ${JSON.stringify(sanityIndexUrl)}`)
        .replaceAll('import "sanity"', `import ${JSON.stringify(sanityIndexUrl)}`)
        .replaceAll("import 'sanity'", `import ${JSON.stringify(sanityIndexUrl)}`);
      return next === code ? null : next;
    },
  };
}

export default defineConfig({
  output: 'server',
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
      apiVersion: '2026-07-20',
      studioBasePath: '/admin',
      // studioUrl only — stega stays off until loadQuery enables it in draft mode.
      stega: {
        enabled: false,
        studioUrl: '/admin',
      },
    }),
    react(),
  ],
  adapter: vercel(),
  vite: {
    plugins: [sanityEntryResolve()],
    resolve: {
      alias: [
        { find: /^sanity$/, replacement: sanityIndex },
        { find: /^void-elements$/, replacement: voidElementsShim },
        { find: /^react\/compiler-runtime$/, replacement: reactCompilerRuntimeShim },
        {
          find: /^use-sync-external-store\/shim$/,
          replacement: useSyncExternalStoreShim,
        },
        {
          find: /^use-sync-external-store\/shim\/with-selector$/,
          replacement: useSyncExternalStoreWithSelectorShim,
        },
      ],
    },
    optimizeDeps: {
      // Avoid Rolldown resolving "sanity" → package.json during prebundle.
      exclude: ['sanity', '@sanity/vision'],
      // CJS entries that Sanity imports with named ESM bindings.
      include: [
        'react/compiler-runtime',
        'react-compiler-runtime',
        'styled-components',
        'lodash/startCase.js',
      ],
    },
    ssr: {
      noExternal: ['gsap'],
    },
  },
});
