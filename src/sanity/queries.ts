import { defineQuery } from 'groq';

/** Placeholder — add GROQ queries here as schemas land in Phase 3. */
export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings" && language == "es"][0]`,
);
