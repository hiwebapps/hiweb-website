import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField, seoFields, seoGroups } from './shared';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  groups: seoGroups,
  fields: [
    languageField,
    defineField({
      name: 'siteTitle',
      title: 'Nombre del sitio',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Eslogan',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'URL de WhatsApp',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: ['instagram', 'linkedin', 'tiktok', 'facebook', 'youtube'],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerBlurb',
      title: 'Texto del footer',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' };
    },
  },
});
