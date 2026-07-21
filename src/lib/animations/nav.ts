import { gsap } from '../gsap';

/**
 * Navbar interactions: desktop mega-menu + full-screen mobile sheet.
 * Subtle premium motion — fade/slide with light stagger; respects reduced motion.
 */
export function initNav(scope: string | Element = '[data-nav]') {
  const root = typeof scope === 'string' ? document.querySelector<HTMLElement>(scope) : scope;
  if (!(root instanceof HTMLElement) || root.dataset.navReady === 'true') return;

  root.dataset.navReady = 'true';

  const sheet = document.querySelector<HTMLElement>('[data-nav-sheet]');
  const burger = root.querySelector<HTMLElement>('[data-nav-toggle]');
  const sheetClose = sheet?.querySelector<HTMLElement>('[data-nav-sheet-close]');
  const dropdown = root.querySelector<HTMLElement>('[data-dropdown]');
  const dropdownToggle = root.querySelector<HTMLElement>('[data-dropdown-toggle]');
  const dropdownPanel = root.querySelector<HTMLElement>('[data-dropdown-panel]');

  const mm = gsap.matchMedia();
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let sheetTween: gsap.core.Timeline | null = null;
  let dropdownTween: gsap.core.Timeline | null = null;
  let sheetOpen = false;

  if (dropdownPanel) gsap.set(dropdownPanel, { xPercent: -50 });

  const lockScroll = (lock: boolean) => {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  };

  const setBurger = (open: boolean) => {
    burger?.setAttribute('aria-expanded', String(open));
    burger?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    root.classList.toggle('is-open', open);
  };

  const closeDropdown = (animate = true) => {
    if (!dropdownPanel || dropdownPanel.hasAttribute('hidden')) return;

    const finish = () => {
      dropdownPanel.setAttribute('hidden', '');
      dropdown?.classList.remove('is-open');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
      gsap.set(dropdownPanel, { clearProps: 'opacity,y,scale,visibility' });
      gsap.set(dropdownPanel, { xPercent: -50 });
    };

    dropdownTween?.kill();

    if (!animate || reduce) {
      finish();
      return;
    }

    dropdownTween = gsap.timeline({ onComplete: finish });
    dropdownTween.to(dropdownPanel, {
      opacity: 0,
      y: -8,
      scale: 0.98,
      xPercent: -50,
      duration: 0.18,
      ease: 'power2.in',
    });
  };

  const openDropdown = () => {
    if (!dropdownPanel) return;
    closeDropdown(false);
    dropdownPanel.removeAttribute('hidden');
    dropdown?.classList.add('is-open');
    dropdownToggle?.setAttribute('aria-expanded', 'true');

    dropdownTween?.kill();

    if (reduce) {
      gsap.set(dropdownPanel, { opacity: 1, y: 0, scale: 1, xPercent: -50 });
      return;
    }

    const items = dropdownPanel.querySelectorAll('.nav__dropdown-col');
    gsap.set(dropdownPanel, {
      opacity: 0,
      y: -10,
      scale: 0.98,
      xPercent: -50,
      transformOrigin: '50% 0%',
    });
    gsap.set(items, { opacity: 0, y: 10 });

    dropdownTween = gsap.timeline();
    dropdownTween
      .to(
        dropdownPanel,
        { opacity: 1, y: 0, scale: 1, xPercent: -50, duration: 0.28, ease: 'power3.out' },
        0,
      )
      .to(items, { opacity: 1, y: 0, duration: 0.28, stagger: 0.04, ease: 'power2.out' }, 0.06);
  };

  const openSheet = () => {
    if (!sheet || sheetOpen) return;
    sheetOpen = true;
    setBurger(true);
    lockScroll(true);
    sheet.hidden = false;
    sheet.setAttribute('aria-hidden', 'false');

    sheetTween?.kill();

    const sections = sheet.querySelectorAll('[data-sheet-section]');
    const items = sheet.querySelectorAll('[data-sheet-item]');
    const footer = sheet.querySelector('[data-sheet-footer]');

    // Header mirrors the closed navbar — show instantly, no fade.
    gsap.set(sheet, { autoAlpha: 1 });
    gsap.set(sheet.querySelector('[data-sheet-header]'), { clearProps: 'opacity,transform' });

    if (reduce) {
      gsap.set([sections, items, footer], { clearProps: 'all' });
      return;
    }

    gsap.set(sections, { opacity: 0, y: 16 });
    gsap.set(items, { opacity: 0, y: 14 });
    gsap.set(footer, { opacity: 0, y: 20 });

    sheetTween = gsap.timeline();
    sheetTween
      .to(sections, { opacity: 1, y: 0, duration: 0.34, stagger: 0.06, ease: 'power3.out' }, 0)
      .to(items, { opacity: 1, y: 0, duration: 0.3, stagger: 0.028, ease: 'power2.out' }, 0.04)
      .to(footer, { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out' }, 0.08);
  };

  const closeSheet = () => {
    if (!sheet || !sheetOpen) return;
    sheetOpen = false;

    const sections = sheet.querySelectorAll('[data-sheet-section]');
    const items = sheet.querySelectorAll('[data-sheet-item]');
    const footer = sheet.querySelector('[data-sheet-footer]');

    const finish = () => {
      sheet.hidden = true;
      sheet.setAttribute('aria-hidden', 'true');
      gsap.set(sheet, { clearProps: 'opacity,visibility' });
      gsap.set([sections, items, footer], { clearProps: 'opacity,transform' });
      setBurger(false);
      lockScroll(false);
    };

    sheetTween?.kill();

    if (reduce) {
      finish();
      return;
    }

    // Fade menu content only; header stays put, then swap back to the real navbar.
    sheetTween = gsap.timeline({ onComplete: finish });
    sheetTween.to([sections, items, footer], {
      opacity: 0,
      duration: 0.16,
      ease: 'power2.in',
    });
  };

  burger?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (sheetOpen) closeSheet();
    else openSheet();
  });

  sheetClose?.addEventListener('click', (event) => {
    event.stopPropagation();
    closeSheet();
  });

  dropdownToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = dropdownPanel?.hasAttribute('hidden');
    if (willOpen) openDropdown();
    else closeDropdown(true);
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Node | null;
    if (!target) return;
    if (dropdown && !dropdown.contains(target)) closeDropdown(true);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (sheetOpen) closeSheet();
    else closeDropdown(true);
  });

  sheet?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeSheet());
  });

  mm.add('(min-width: 992px)', () => {
    if (sheetOpen) closeSheet();
    return () => undefined;
  });

  return () => {
    sheetTween?.kill();
    dropdownTween?.kill();
    lockScroll(false);
    delete root.dataset.navReady;
    mm.revert();
  };
}
