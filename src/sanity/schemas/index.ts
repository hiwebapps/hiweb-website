import { author } from './author';
import { category } from './category';
import { faq } from './faq';
import { homePage } from './homePage';
import {
  homeAbout,
  homeExperience,
  homeFaq,
  homeFinalCta,
  homeHero,
  homePortfolio,
  homeProcess,
  homeServices,
} from './blocks/homeSections';
import { post } from './post';
import { siteSettings } from './siteSettings';
import { testimonial } from './testimonial';

export const schemaTypes = [
  author,
  category,
  post,
  testimonial,
  faq,
  siteSettings,
  homePage,
  homeHero,
  homeAbout,
  homeServices,
  homePortfolio,
  homeExperience,
  homeProcess,
  homeFaq,
  homeFinalCta,
];
