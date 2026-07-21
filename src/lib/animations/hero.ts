import { gsap } from '../gsap';

export function initHero(scope: string | Element = '[data-hero]') {
  const root = typeof scope === 'string' ? document.querySelector(scope) : scope;
  if (!root) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const items = root.querySelectorAll('[data-hero-item]');
    const orbs = root.querySelectorAll('.hero__glow');

    gsap.set(items, { opacity: 0, y: 12, filter: 'blur(4px)' });
    gsap.set(orbs, { scale: 0.92 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(orbs, { scale: 1, duration: 1.2, stagger: 0.08 }, 0).to(
      items,
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.1 },
      0.15,
    );

    return () => tl.kill();
  });

  return mm;
}
