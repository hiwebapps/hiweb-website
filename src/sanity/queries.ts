import { defineQuery } from 'groq';

const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage{
    ...,
    alt
  },
  "author": author->{ name, "slug": slug.current, image },
  "categories": categories[]->{ title, "slug": slug.current }
`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteTitle,
    tagline,
    phone,
    email,
    whatsappUrl,
    address,
    socialLinks,
    footerBlurb,
    metaTitle,
    metaDescription,
    ogImage
  }
`);

export const postsQuery = defineQuery(`
  *[_type == "post" && language == "es" && defined(slug.current)]
  | order(publishedAt desc) {
    ${postCardFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && language == "es" && slug.current == $slug][0]{
    ${postCardFields},
    body,
    metaTitle,
    metaDescription,
    ogImage
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && language == "es" && defined(slug.current)]{
    "params": { "slug": slug.current }
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial" && language == "es"]
  | order(order asc) {
    _id,
    name,
    role,
    company,
    quote,
    image
  }
`);

export const faqsQuery = defineQuery(`
  *[_type == "faq" && language == "es"]
  | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`);
