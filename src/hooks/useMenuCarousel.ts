import { useEffect, useRef, useState } from 'react';
import type { FocusEvent, MouseEvent, PointerEvent } from 'react';
import { MenuCarouselController } from '../lib/menuCarousel';

export function useMenuCarousel(itemCount: number) {
  const track = useRef<HTMLUListElement>(null);
  const controller = useRef<MenuCarouselController | null>(null);
  const [centeredItem, setCenteredItem] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(() => new Set());
  const flippedCardsRef = useRef<Set<number>>(new Set());
  const controlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = track.current;
    if (!element || !itemCount) return;
    const mobile = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const closeMobileDescriptions = () => {
      if (!mobile.matches || flippedCardsRef.current.size === 0) return;
      flippedCardsRef.current = new Set();
      setFlippedCards(flippedCardsRef.current);
      instance.setDescriptionOpen(false, performance.now());
    };
    const instance = new MenuCarouselController(itemCount, {
      read: () => element.scrollLeft,
      write: position => { element.scrollLeft = position; },
      onCenteredItem: index => {
        setCenteredItem(index);
        if ([...flippedCardsRef.current].some(card => card % itemCount !== index)) closeMobileDescriptions();
      },
    });
    controller.current = instance;

    const measure = () => {
      const first = element.children[0] as HTMLElement;
      const nextCopy = element.children[itemCount] as HTMLElement;
      const loopWidth = nextCopy.offsetLeft - first.offsetLeft;
      if (instance.isMobile !== mobile.matches) closeMobileDescriptions();
      instance.configure({
        viewport: element.clientWidth,
        firstCenter: first.offsetLeft + first.offsetWidth / 2,
        step: loopWidth / itemCount,
        loopWidth,
      }, mobile.matches, reducedMotion.matches, performance.now());
    };
    const onScroll = () => instance.onScroll(performance.now());
    const onScrollEnd = () => instance.onScrollEnd(performance.now());
    let frame = 0;
    let inViewport = false;
    let running = false;
    const animate = (now: number) => {
      instance.tick(now);
      frame = requestAnimationFrame(animate);
    };
    const onVisibility = () => {
      const shouldRun = inViewport && !document.hidden;
      if (running === shouldRun) return;
      running = shouldRun;
      instance.setVisible(running, performance.now());
      if (running) frame = requestAnimationFrame(animate);
      else cancelAnimationFrame(frame);
    };
    // Stop scheduling animation frames when the menu cannot be seen.
    instance.setVisible(false, performance.now());
    const viewport = new IntersectionObserver(entries => {
      inViewport = entries.some(entry => entry.isIntersecting);
      onVisibility();
    });
    const resize = new ResizeObserver(measure);
    const visibility = new IntersectionObserver(entries => {
      const openCard = [...flippedCardsRef.current][0];
      if (openCard === undefined) return;
      if (entries.some(entry => entry.target === element.children[openCard] && !entry.isIntersecting)) {
        closeMobileDescriptions();
      }
    });
    measure();
    onVisibility();
    resize.observe(element);
    viewport.observe(element);
    for (const card of element.children) visibility.observe(card);
    mobile.addEventListener('change', measure);
    reducedMotion.addEventListener('change', measure);
    element.addEventListener('scroll', onScroll, { passive: true });
    element.addEventListener('scrollend', onScrollEnd);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      viewport.disconnect();
      visibility.disconnect();
      mobile.removeEventListener('change', measure);
      reducedMotion.removeEventListener('change', measure);
      element.removeEventListener('scroll', onScroll);
      element.removeEventListener('scrollend', onScrollEnd);
      document.removeEventListener('visibilitychange', onVisibility);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
      controller.current = null;
    };
  }, [itemCount]);

  const setCardFlipped = (cardIndex: number, flipped: boolean) => {
    const instance = controller.current;
    const next = instance?.isMobile ? new Set<number>() : new Set(flippedCardsRef.current);
    if (flipped) next.add(cardIndex);
    else next.delete(cardIndex);
    flippedCardsRef.current = next;
    setFlippedCards(next);
    instance?.setDescriptionOpen(instance.isMobile && next.size > 0, performance.now());
  };

  const closeDescriptionForNavigation = () => {
    if (!controller.current?.isMobile || flippedCardsRef.current.size === 0) return;
    flippedCardsRef.current = new Set();
    setFlippedCards(flippedCardsRef.current);
    controller.current.setDescriptionOpen(false, performance.now());
  };

  const focusProps = {
    onFocus: (event: FocusEvent<HTMLElement>) => {
      controller.current?.setKeyboardFocus(event.target.matches(':focus-visible'), performance.now());
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) controller.current?.setKeyboardFocus(false, performance.now());
    },
    onKeyDown: () => controller.current?.setKeyboardFocus(true, performance.now()),
  };

  const carouselProps = {
    ...focusProps,
    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      controller.current?.setHover((event.clientX - bounds.left) / bounds.width);
    },
    onMouseLeave: () => controller.current?.setHover(null),
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      controller.current?.setKeyboardFocus(false, performance.now());
      if (controller.current?.isMobile) tapStart.current = { x: event.clientX, y: event.clientY };
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      const start = tapStart.current;
      tapStart.current = null;
      if (!start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) return;
      setControlsVisible(true);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
      controlsTimeout.current = setTimeout(() => setControlsVisible(false), 3000);
    },
    onPointerCancel: () => { tapStart.current = null; },
    onTouchStart: () => controller.current?.beginTouch(performance.now()),
    onTouchEnd: () => controller.current?.endTouch(performance.now()),
    onTouchCancel: () => controller.current?.endTouch(performance.now()),
    onWheel: () => controller.current?.beginNativeScroll(performance.now()),
  };

  return {
    track,
    centeredItem,
    controlsVisible,
    flippedCards,
    setCardFlipped,
    carouselProps,
    dotsProps: {
      ...focusProps,
      onPointerDown: () => controller.current?.setKeyboardFocus(false, performance.now()),
      onMouseEnter: () => controller.current?.setHover(0.5),
      onMouseLeave: () => controller.current?.setHover(null),
    },
    scroll: (direction: -1 | 1) => {
      closeDescriptionForNavigation();
      controller.current?.move(direction, performance.now());
    },
    scrollToItem: (index: number) => {
      closeDescriptionForNavigation();
      controller.current?.goToItem(index, performance.now());
    },
  };
}
