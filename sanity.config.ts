import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { structure } from './src/sanity/structure';
import { resolve } from './src/sanity/presentation/resolve';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  'fxardjr1';

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  'production';

/** Preview origin for Presentation iframe (same host when Studio is embedded). */
function getPreviewOrigin() {
  if (typeof process !== 'undefined' && process.env.SANITY_STUDIO_PREVIEW_URL) {
    return process.env.SANITY_STUDIO_PREVIEW_URL;
  }
  // Embedded Studio: resolve at runtime in the browser so prod is not baked as localhost.
  if (typeof location !== 'undefined' && location.origin) {
    return location.origin;
  }
  return 'http://localhost:4321';
}

export default defineConfig({
  name: 'hiweb-marketing',
  title: 'Hiweb Marketing',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        initial: getPreviewOrigin(),
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2026-07-20' }),
  ],
  schema: {
    types: schemaTypes,
  },
});
