import { defineArrayMember, defineField, defineType } from 'sanity';

/** Link reutilizable (label + href). */
export const linkFields = [
  defineField({
    name: 'label',
    title: 'Texto',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'href',
    title: 'URL',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
];

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'lede', title: 'Descripción', type: 'text', rows: 4 }),
    defineField({ name: 'ctaLabel', title: 'CTA — texto', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA — URL', type: 'string' }),
    defineField({
      name: 'marqueeAriaLabel',
      title: 'Aria label del marquee',
      type: 'string',
    }),
    defineField({
      name: 'marqueeItems',
      title: 'Logos del marquee',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'src',
              title: 'Ruta de imagen',
              type: 'string',
              description: 'Ruta en /public, p. ej. /images/logo.png',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
          ],
          preview: {
            select: { title: 'alt', subtitle: 'src' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Hero', subtitle: 'Sección Hero' }),
  },
});

export const homeAbout = defineType({
  name: 'homeAbout',
  title: 'About',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Cuerpo', type: 'text', rows: 4 }),
    defineField({
      name: 'points',
      title: 'Puntos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'text', title: 'Texto', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        }),
      ],
    }),
    defineField({
      name: 'imageSrc',
      title: 'Imagen — ruta',
      type: 'string',
      description: 'Ruta en /public',
    }),
    defineField({ name: 'imageAlt', title: 'Imagen — alt', type: 'string' }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'About', subtitle: 'Sección About' }),
  },
});

export const homeServices = defineType({
  name: 'homeServices',
  title: 'Servicios',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'intro', title: 'Introducción', type: 'text', rows: 3 }),
    defineField({
      name: 'cards',
      title: 'Tarjetas de servicio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'blurb', title: 'Descripción', type: 'text', rows: 2 }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({ name: 'ctaLabel', title: 'CTA — texto', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA — URL', type: 'string' }),
            defineField({
              name: 'tone',
              title: 'Tono visual',
              type: 'string',
              options: {
                list: [
                  'default',
                  'orange',
                  'purple',
                  'green',
                  'blue',
                  'red',
                  'pink',
                  'blue2',
                  'yellow',
                ],
              },
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'blurb' } },
        }),
      ],
    }),
    defineField({
      name: 'fullWidthTitle',
      title: 'Card 360 — título',
      type: 'string',
    }),
    defineField({
      name: 'fullWidthBody',
      title: 'Card 360 — cuerpo',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'fullWidthCtaLabel', title: 'Card 360 — CTA texto', type: 'string' }),
    defineField({ name: 'fullWidthCtaHref', title: 'Card 360 — CTA URL', type: 'string' }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Servicios', subtitle: 'Sección Servicios' }),
  },
});

export const homePortfolio = defineType({
  name: 'homePortfolio',
  title: 'Portafolio',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'viewAllLabel', title: 'Ver todos — texto', type: 'string' }),
    defineField({ name: 'viewAllHref', title: 'Ver todos — URL', type: 'string' }),
    defineField({
      name: 'projects',
      title: 'Proyectos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'string' }),
            defineField({ name: 'imageSrc', title: 'Imagen — ruta', type: 'string' }),
            defineField({ name: 'tags', title: 'Tags', type: 'string' }),
            defineField({ name: 'summary', title: 'Resumen', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'tags' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Portafolio', subtitle: 'Sección Portafolio' }),
  },
});

export const homeExperience = defineType({
  name: 'homeExperience',
  title: 'Experiencia',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'staticLabel',
              title: 'Label estático (sin contador)',
              type: 'string',
              description: 'Si se llena, se muestra en lugar del contador numérico',
            }),
            defineField({ name: 'prefix', title: 'Prefijo', type: 'string' }),
            defineField({ name: 'value', title: 'Valor numérico', type: 'number' }),
            defineField({ name: 'suffix', title: 'Sufijo', type: 'string' }),
            defineField({
              name: 'format',
              title: 'Formato',
              type: 'string',
              options: { list: ['plain', 'compact'] },
            }),
            defineField({ name: 'label', title: 'Descripción', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'staticLabel', prefix: 'prefix', value: 'value', suffix: 'suffix' },
            prepare: ({ title, prefix, value, suffix }) => ({
              title: title || `${prefix ?? ''}${value ?? ''}${suffix ?? ''}` || 'Stat',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Título de testimonios',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Experiencia',
      subtitle: 'Sección Experiencia (+ testimonios CMS)',
    }),
  },
});

export const homeProcess = defineType({
  name: 'homeProcess',
  title: 'Proceso',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'ctaLabel', title: 'CTA — texto', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA — URL', type: 'string' }),
    defineField({
      name: 'steps',
      title: 'Pasos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'n', title: 'Número', type: 'string' }),
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'body', title: 'Cuerpo', type: 'text', rows: 3 }),
            defineField({ name: 'cardTitle', title: 'Card — título', type: 'string' }),
            defineField({ name: 'cardBody', title: 'Card — cuerpo', type: 'text', rows: 2 }),
            defineField({ name: 'imageSrc', title: 'Imagen — ruta', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'n' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Proceso', subtitle: 'Sección Proceso' }),
  },
});

export const homeFaq = defineType({
  name: 'homeFaq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'ID (category)',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Redes', value: 'redes' },
                  { title: 'SEO', value: 'seo' },
                ],
              },
            }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'id' } },
        }),
      ],
    }),
    defineField({
      name: 'emptyState',
      title: 'Texto vacío',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'FAQ',
      subtitle: 'Sección FAQ (+ documentos FAQ)',
    }),
  },
});

export const homeFinalCta = defineType({
  name: 'homeFinalCta',
  title: 'CTA final',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Cuerpo', type: 'text', rows: 3 }),
    defineField({ name: 'primaryCtaLabel', title: 'CTA primario — texto', type: 'string' }),
    defineField({ name: 'primaryCtaHref', title: 'CTA primario — URL', type: 'string' }),
    defineField({ name: 'secondaryCtaLabel', title: 'CTA secundario — texto', type: 'string' }),
    defineField({ name: 'secondaryCtaHref', title: 'CTA secundario — URL', type: 'string' }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'CTA final', subtitle: 'Sección CTA final' }),
  },
});
