import { gsap } from '../gsap';
import { initHero } from './hero';
import { initHeroMarquee } from './heroMarquee';
import { initScrollReveals } from './scrollReveals';
import { initCounters } from './counters';
import { initTestimonialsSlider } from './testimonialsSlider';

export function initHomeAnimations() {
  const ctx = gsap.context(() => {
    initHero();
    initHeroMarquee();
    initScrollReveals();
    initCounters();
    initTestimonialsSlider();
  });

  return ctx;
}
