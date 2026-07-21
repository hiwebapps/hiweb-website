/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly SANITY_API_READ_TOKEN?: string;
  readonly SANITY_STUDIO_PREVIEW_URL?: string;
  readonly SANITY_REVALIDATE_SECRET?: string;
  readonly VERCEL_TOKEN?: string;
  readonly VERCEL_PROJECT_ID?: string;
  readonly VERCEL_ORG_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
