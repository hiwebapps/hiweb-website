// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
      apiVersion: '2026-07-20',
      studioBasePath: '/admin',
    }),
    react(),
  ],
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['gsap'],
    },
  },
});
