import { defineField } from 'sanity';

/** Campo i18n-ready — oculto con default `es` hasta activar document-internationalization. */
export const languageField = defineField({
  name: 'language',
  title: 'Idioma',
  type: 'string',
  readOnly: true,
  hidden: true,
  initialValue: 'es',
});

/** Campos SEO reutilizables (grupo `seo`). */
export const seoFields = [
  defineField({
    name: 'metaTitle',
    title: 'Título SEO',
    type: 'string',
    group: 'seo',
    validation: (rule) => rule.max(70).warning('Idealmente ≤ 60–70 caracteres'),
  }),
  defineField({
    name: 'metaDescription',
    title: 'Descripción SEO',
    type: 'text',
    rows: 3,
    group: 'seo',
    validation: (rule) => rule.max(160).warning('Idealmente ≤ 155–160 caracteres'),
  }),
  defineField({
    name: 'ogImage',
    title: 'Imagen Open Graph',
    type: 'image',
    group: 'seo',
    options: { hotspot: true },
  }),
];

export const seoGroups = [
  { name: 'content', title: 'Contenido', default: true },
  { name: 'seo', title: 'SEO' },
];
