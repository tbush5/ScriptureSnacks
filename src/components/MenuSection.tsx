import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MenuCard from './MenuCard';
import { menuItems } from '../data/menuItems';

export default function MenuSection() {
  const [centeredItem, setCenteredItem] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const hoverDirection = useRef(1);
  const focused = useRef(false);
  const interactingUntil = useRef(0);
  const buttonScroll = useRef<{ from: number; to: number; startedAt: number } | null>(null);

  useEffect(() => {
    const element = track.current;
    if (!element || menuItems.length === 0) return;

    // Three copies let the track wrap in either direction without a visible jump.
    const getLoopWidth = () => {
      const first = element.children[0] as HTMLElement;
      const next = element.children[menuItems.length] as HTMLElement;
      return next.offsetLeft - first.offsetLeft;
    };
    let loopWidth = getLoopWidth();
    element.scrollLeft = loopWidth;
    let lastCenteredItem = -1;
    const updateCenteredItem = () => {
      if (!loopWidth) return;
      const first = element.children[0] as HTMLElement;
      const center = element.scrollLeft + element.clientWidth / 2;
      const step = loopWidth / menuItems.length;
      const nearest = Math.round((center - first.offsetLeft - first.offsetWidth / 2) / step);
      const index = ((nearest % menuItems.length) + menuItems.length) % menuItems.length;
      if (index !== lastCenteredItem) {
        lastCenteredItem = index;
        setCenteredItem(index);
      }
    };
    updateCenteredItem();
    element.addEventListener('scroll', updateCenteredItem, { passive: true });

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime = 0;
    let position = element.scrollLeft;
    const resize = new ResizeObserver(() => {
      const nextWidth = getLoopWidth();
      if (loopWidth && nextWidth !== loopWidth) {
        buttonScroll.current = null;
        position = element.scrollLeft * nextWidth / loopWidth;
        element.scrollLeft = position;
      }
      loopWidth = nextWidth;
      updateCenteredItem();
    });
    resize.observe(element);
    const animate = (time: number) => {
      const elapsed = Math.min(time - (lastTime || time), 50);
      lastTime = time;
      const paused = hoverDirection.current === 0 || motion.matches || focused.current || time <= interactingUntil.current || document.hidden;
      const transition = buttonScroll.current;
      if (transition) {
        const progress = Math.min((time - transition.startedAt) / 900, 1);
        const eased = progress * progress * (3 - 2 * progress);
        position = transition.from + (transition.to - transition.from) * eased;
        if (progress === 1) buttonScroll.current = null;
      } else if (paused) {
        position = element.scrollLeft;
      } else {
        // One animation owns the position; preserve subpixels between frames.
        position += elapsed * 0.02 * hoverDirection.current;
      }
      // Wrap in this same frame instead of correcting it in a scroll listener.
      const wrap = loopWidth && position >= loopWidth * 2 ? -loopWidth : loopWidth && position < loopWidth / 2 ? loopWidth : 0;
      position += wrap;
      if (transition && wrap) {
        transition.from += wrap;
        transition.to += wrap;
      }
      if (transition || !paused || Math.abs(position - element.scrollLeft) > 2) element.scrollLeft = position;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      element.removeEventListener('scroll', updateCenteredItem);
    };
  }, []);

  const scrollToPosition = (target: number) => {
    const element = track.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      buttonScroll.current = null;
      element.scrollLeft = target;
      return;
    }
    buttonScroll.current = {
      from: element.scrollLeft,
      to: target,
      startedAt: performance.now(),
    };
  };

  const scroll = (direction: number) => {
    const element = track.current;
    if (!element || menuItems.length === 0) return;
    const first = element.children[0] as HTMLElement;
    const second = element.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    // Repeated clicks advance from the pending destination, even mid-animation.
    const current = buttonScroll.current?.to ?? element.scrollLeft;
    const nearest = Math.round((current + element.clientWidth / 2 - first.offsetLeft - first.offsetWidth / 2) / step);
    const target = first.offsetLeft + (nearest + direction) * step + first.offsetWidth / 2 - element.clientWidth / 2;
    interactingUntil.current = performance.now() + 3000;
    scrollToPosition(target);
  };

  const scrollToItem = (index: number) => {
    const element = track.current;
    if (!element) return;
    // Choose the nearest repeated copy so crossing the loop stays natural.
    const targets = [0, 1, 2].map(copy => {
      const card = element.children[copy * menuItems.length + index] as HTMLElement;
      return card.offsetLeft + card.offsetWidth / 2 - element.clientWidth / 2;
    });
    const nearest = targets.reduce((best, target) =>
      Math.abs(target - element.scrollLeft) < Math.abs(best - element.scrollLeft) ? target : best,
    );
    interactingUntil.current = performance.now() + 3000;
    scrollToPosition(nearest);
  };

  return (
    <section id="menu" aria-labelledby="menu-heading" className="scroll-mt-24 overflow-hidden bg-[#f6eee8] px-6 py-16 text-[#49352e] sm:py-20 lg:px-8">
      <div className="mx-auto mb-8 max-w-7xl">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#82558a]">Something sweet for you</p>
          <h2 id="menu-heading" className="font-serif text-4xl sm:text-5xl">Our menu</h2>
        </div>
      </div>
      <div
        className="menu-carousel relative mx-auto max-w-7xl"
        onMouseMove={event => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const pointerPosition = (event.clientX - bounds.left) / bounds.width;
          hoverDirection.current = pointerPosition < 0.1 ? -1 : pointerPosition > 0.9 ? 1 : 0;
        }}
        onMouseLeave={() => { hoverDirection.current = 1; }}
        onFocus={event => { focused.current = event.target.matches(':focus-visible'); }}
        onPointerDown={() => { focused.current = false; }}
        onKeyDown={() => { focused.current = true; }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) focused.current = false; }}
        onTouchStart={() => { buttonScroll.current = null; interactingUntil.current = Infinity; }}
        onTouchEnd={() => { interactingUntil.current = performance.now() + 3000; }}
        onTouchCancel={() => { interactingUntil.current = performance.now() + 3000; }}
        onWheel={() => { buttonScroll.current = null; interactingUntil.current = performance.now() + 3000; }}
      >
        <ul id="menu-cards" ref={track} aria-label="Baked goods, repeating carousel" className="menu-track flex gap-6 overflow-x-auto pb-6 pt-2">
          {[0, 1, 2].flatMap(copy => menuItems.map(item => <MenuCard key={`${copy}-${item.name}`} {...item} />))}
        </ul>
        <button type="button" aria-label="Scroll menu left" aria-controls="menu-cards" onClick={() => scroll(-1)} className="absolute bottom-6 left-0 top-2 z-10 flex w-[10%] cursor-pointer items-center justify-center bg-gradient-to-l from-transparent to-[#f6eee8]/95 text-[#82558a] opacity-0 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a] motion-reduce:transition-none">
          <ArrowLeft size={24} aria-hidden="true" className="pointer-events-none" />
        </button>
        <button type="button" aria-label="Scroll menu right" aria-controls="menu-cards" onClick={() => scroll(1)} className="absolute bottom-6 right-0 top-2 z-10 flex w-[10%] cursor-pointer items-center justify-center bg-gradient-to-r from-transparent to-[#f6eee8]/95 text-[#82558a] opacity-0 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a] motion-reduce:transition-none">
          <ArrowRight size={24} aria-hidden="true" className="pointer-events-none" />
        </button>
      </div>
      <ul
        aria-label="Choose a menu item"
        className="mt-3 flex items-center justify-center"
        onMouseEnter={() => { hoverDirection.current = 0; }}
        onMouseLeave={() => { hoverDirection.current = 1; }}
        onFocus={event => { focused.current = event.target.matches(':focus-visible'); }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) focused.current = false; }}
      >
        {menuItems.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              aria-label={`Show ${item.name}`}
              aria-current={centeredItem === index ? 'true' : undefined}
              aria-controls="menu-cards"
              onClick={() => scrollToItem(index)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a]"
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full border border-[#82558a] transition-colors duration-200 motion-reduce:transition-none ${centeredItem === index ? 'bg-[#82558a]' : 'bg-transparent'}`} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
