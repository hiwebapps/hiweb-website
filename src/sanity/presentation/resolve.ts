import { defineLocations } from 'sanity/presentation';
import type { PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Artículo',
            href: doc?.slug ? `/blogs/${doc.slug}` : '/blogs',
          },
          { title: 'Índice del blog', href: '/blogs' },
        ],
      }),
    }),
    author: defineLocations({
      select: { title: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Autor', href: '/blogs' }],
      }),
    }),
    category: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Categoría', href: '/blogs' }],
      }),
    }),
    faq: defineLocations({
      select: { title: 'question' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'FAQ', href: '/' }],
      }),
    }),
    testimonial: defineLocations({
      select: { title: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Testimonio', href: '/' }],
      }),
    }),
    siteSettings: defineLocations({
      select: { title: 'siteTitle' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Configuración del sitio', href: '/' }],
      }),
    }),
    homePage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Home', href: '/' }],
      }),
    }),
  },
};
