import { gsap } from '../gsap';

const SPEED_PX_PER_SEC = 80;

/**
 * Infinite horizontal marquee driven by GSAP.
 * Measures the first duplicated group in px so the loop seam stays perfect
 * even after images load or the viewport resizes (Sanity-ready dynamic assets).
 */
export function initHeroMarquee(scope: string | Element = '[data-marquee]') {
  const root = typeof scope === 'string' ? document.querySelector(scope) : scope;
  if (!root) return;

  const track = root.querySelector<HTMLElement>('[data-marquee-track]');
  const group = root.querySelector<HTMLElement>('[data-marquee-group]');
  if (!track || !group) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    let tween: gsap.core.Tween | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const distance = () => group.offsetWidth;

    const play = (preserveProgress = false) => {
      const width = distance();
      if (width <= 0) return;

      const progress = preserveProgress && tween ? tween.progress() : 0;
      tween?.kill();

      gsap.set(track, { x: 0 });
      tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -width,
          duration: width / SPEED_PX_PER_SEC,
          ease: 'none',
          repeat: -1,
          immediateRender: false,
        },
      );
      if (progress > 0) tween.progress(progress);
    };

    const scheduleRebuild = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => play(true), 100);
    };

    play(false);

    const images = Array.from(track.querySelectorAll('img'));
    const waitForImages = images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        }),
    );

    void Promise.all(waitForImages).then(() => play(false));

    const ro = new ResizeObserver(scheduleRebuild);
    ro.observe(group);
    ro.observe(root);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      tween?.kill();
      gsap.set(track, { clearProps: 'transform' });
    };
  });

  return mm;
}
