import { defineField, defineType } from 'sanity';
import { languageField } from './shared';

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
});
