import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField, seoFields, seoGroups } from './shared';

const navLinkMember = defineArrayMember({
  type: 'object',
  fields: [
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
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
});

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  groups: [
    ...seoGroups,
    { name: 'chrome', title: 'Header / Footer' },
  ],
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
      title: 'Texto del footer (legacy)',
      type: 'text',
      rows: 3,
      group: 'content',
      hidden: true,
    }),
    defineField({
      name: 'header',
      title: 'Header / Navbar',
      type: 'object',
      group: 'chrome',
      fields: [
        defineField({ name: 'brandLabel', title: 'Marca', type: 'string' }),
        defineField({
          name: 'navLinks',
          title: 'Links de navegación',
          type: 'array',
          of: [navLinkMember],
          description: 'Sin mega-menú en esta fase — solo links planos.',
        }),
        defineField({ name: 'whatsappLabel', title: 'WhatsApp — texto', type: 'string' }),
        defineField({ name: 'whatsappHref', title: 'WhatsApp — URL', type: 'string' }),
        defineField({ name: 'ctaLabel', title: 'CTA — texto', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA — URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'chrome',
      fields: [
        defineField({ name: 'brandLabel', title: 'Marca', type: 'string' }),
        defineField({ name: 'blurb', title: 'Texto intro', type: 'text', rows: 3 }),
        defineField({ name: 'contactHeading', title: 'Columna contacto — título', type: 'string' }),
        defineField({ name: 'phoneLabel', title: 'Teléfono — texto', type: 'string' }),
        defineField({ name: 'phoneHref', title: 'Teléfono — href', type: 'string' }),
        defineField({ name: 'emailLabel', title: 'Email — texto visible', type: 'string' }),
        defineField({ name: 'emailHref', title: 'Email — mailto', type: 'string' }),
        defineField({ name: 'servicesHeading', title: 'Columna servicios — título', type: 'string' }),
        defineField({
          name: 'serviceLinks',
          title: 'Links de servicios',
          type: 'array',
          of: [navLinkMember],
        }),
        defineField({ name: 'socialHeading', title: 'Columna redes — título', type: 'string' }),
        defineField({
          name: 'socialNavLinks',
          title: 'Links de redes (footer)',
          type: 'array',
          of: [navLinkMember],
        }),
        defineField({ name: 'presenceHeading', title: 'Columna presencia — título', type: 'string' }),
        defineField({
          name: 'presenceLinks',
          title: 'Links de presencia',
          type: 'array',
          of: [navLinkMember],
        }),
        defineField({ name: 'localesHeading', title: 'Columna idiomas — título', type: 'string' }),
        defineField({
          name: 'localeLinks',
          title: 'Links de idioma',
          type: 'array',
          of: [navLinkMember],
        }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' };
    },
  },
});
