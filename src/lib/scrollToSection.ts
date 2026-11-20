// Wait for the mobile menu and route to finish rendering before measuring.
export function scrollToSectionAfterLayout(id: string) {
  let frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (!section) return;
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      if (window.matchMedia('(max-width: 767px)').matches) {
        const header = document.querySelector<HTMLElement>('[data-site-header]');
        const offset = header?.getBoundingClientRect().height ?? 0;
        window.scrollTo({ top: Math.max(0, window.scrollY + section.getBoundingClientRect().top - offset), behavior });
      } else {
        section.scrollIntoView({ behavior, block: 'start' });
      }
    });
  });
  return () => cancelAnimationFrame(frame);
}
