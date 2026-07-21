import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField, seoFields, seoGroups } from './shared';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home (página)',
  type: 'document',
  groups: seoGroups,
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Nombre interno',
      type: 'string',
      group: 'content',
      initialValue: 'Home',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Secciones',
      type: 'array',
      group: 'content',
      description: 'Mini page builder: añade, reordena o quita componentes de la home.',
      of: [
        defineArrayMember({ type: 'homeHero' }),
        defineArrayMember({ type: 'homeAbout' }),
        defineArrayMember({ type: 'homeServices' }),
        defineArrayMember({ type: 'homePortfolio' }),
        defineArrayMember({ type: 'homeExperience' }),
        defineArrayMember({ type: 'homeProcess' }),
        defineArrayMember({ type: 'homeFaq' }),
        defineArrayMember({ type: 'homeFinalCta' }),
      ],
      options: {
        insertMenu: {
          views: [{ name: 'grid' }, { name: 'list' }],
        },
      },
    }),
    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: 'Home (página)' };
    },
  },
});
