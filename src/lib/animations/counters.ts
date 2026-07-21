import { gsap, ScrollTrigger } from '../gsap';

function formatValue(value: number, format: string) {
  if (format === 'compact') {
    if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`;
    if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  }
  return String(Math.round(value));
}

export function initCounters(scope: string | Element = document.body) {
  const root = typeof scope === 'string' ? document.querySelector(scope) : scope;
  if (!root) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const counters = root.querySelectorAll<HTMLElement>('[data-counter]');

    counters.forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      if (!target) return;

      const prefix = el.dataset.prefix ?? '';
      const suffix = el.dataset.suffix ?? '';
      const format = el.dataset.format ?? 'plain';
      const state = { value: 0 };

      gsap.to(state, {
        value: target,
        duration: 1.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${formatValue(state.value, format)}${suffix}`;
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
