import { gsap, ScrollTrigger } from '../gsap';

export function initScrollReveals(scope: string | Element = document.body) {
  const root = typeof scope === 'string' ? document.querySelector(scope) : scope;
  if (!root) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const sections = root.querySelectorAll('[data-reveal]');

    sections.forEach((section) => {
      const items = section.querySelectorAll('[data-reveal-item]');
      const targets = items.length ? items : [section];

      gsap.from(targets, {
        opacity: 0,
        y: 12,
        filter: 'blur(4px)',
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && root.contains(st.trigger as Node)) st.kill();
      });
    };
  });

  return mm;
}
