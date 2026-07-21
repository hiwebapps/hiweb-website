import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = [
  { type: 'homePage', title: 'Home (página)', id: 'homePage' },
  { type: 'siteSettings', title: 'Configuración del sitio', id: 'siteSettings' },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Artículos')
                .schemaType('post')
                .child(
                  S.documentTypeList('post')
                    .title('Artículos')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Autores')
                .schemaType('author')
                .child(S.documentTypeList('author').title('Autores')),
              S.listItem()
                .title('Categorías')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categorías')),
            ]),
        ),
      S.divider(),
      ...SINGLETONS.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.id)
          .child(S.document().schemaType(item.type).documentId(item.id).title(item.title)),
      ),
      S.divider(),
      S.listItem()
        .title('Home — listas')
        .child(
          S.list()
            .title('Contenido reutilizable de la home')
            .items([
              S.listItem()
                .title('Testimonios')
                .schemaType('testimonial')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonios')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('FAQs')
                .schemaType('faq')
                .child(
                  S.documentTypeList('faq')
                    .title('FAQs')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            'post',
            'author',
            'category',
            'testimonial',
            'faq',
            'siteSettings',
            'homePage',
          ].includes(item.getId() ?? ''),
      ),
    ]);
