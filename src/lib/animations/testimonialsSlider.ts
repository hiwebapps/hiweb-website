export function initTestimonialsSlider(scope: string | Element = '[data-testimonials]') {
  const root = typeof scope === 'string' ? document.querySelector<HTMLElement>(scope) : scope;
  if (!root || root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  const track = root.querySelector<HTMLElement>('[data-testimonials-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-testimonials-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-testimonials-next]');
  if (!track) return;

  const card = track.querySelector<HTMLElement>('.testimonial-card');
  const step = () => (card ? card.offsetWidth + 16 : 320);

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });

  next?.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });

  track.style.overflowX = 'auto';
  track.style.scrollSnapType = 'x mandatory';
  track.style.scrollbarWidth = 'none';
}
