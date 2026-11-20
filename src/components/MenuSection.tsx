import { ArrowLeft, ArrowRight } from 'lucide-react';
import MenuCard from './MenuCard';
import { menuItems } from '../data/menuItems';
import { useMenuCarousel } from '../hooks/useMenuCarousel';

export default function MenuSection() {
  const { track, centeredItem, controlsVisible, flippedCards, setCardFlipped, carouselProps, dotsProps, scroll, scrollToItem } = useMenuCarousel(menuItems.length);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="scroll-mt-24 overflow-hidden bg-[#f6eee8] px-6 py-16 text-[#49352e] sm:py-20 lg:px-8">
      <div className="mx-auto mb-8 max-w-7xl">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#82558a]">Something sweet for you</p>
          <h2 id="menu-heading" className="font-serif text-4xl sm:text-5xl">My Menu</h2>
        </div>
      </div>
      <div className="menu-carousel relative mx-auto max-w-7xl" {...carouselProps}>
        <ul id="menu-cards" ref={track} aria-label="Baked goods, repeating carousel" className="menu-track flex gap-6 overflow-x-auto pb-6 pt-2">
          {[0, 1, 2].flatMap(copy => menuItems.map((item, index) => {
            const cardIndex = copy * menuItems.length + index;
            return <MenuCard key={`${copy}-${item.name}`} {...item} flipped={flippedCards.has(cardIndex)} onFlipChange={flipped => setCardFlipped(cardIndex, flipped)} />;
          }))}
        </ul>
        <button type="button" aria-label="Scroll menu left" aria-controls="menu-cards" onClick={() => scroll(-1)} className="absolute bottom-6 left-0 top-2 z-10 hidden w-[10%] cursor-pointer items-center justify-center bg-gradient-to-l from-transparent to-[#f6eee8]/95 text-[#82558a] opacity-0 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a] motion-reduce:transition-none md:flex">
          <ArrowLeft size={24} aria-hidden="true" className="pointer-events-none" />
        </button>
        <button type="button" aria-label="Scroll menu right" aria-controls="menu-cards" onClick={() => scroll(1)} className="absolute bottom-6 right-0 top-2 z-10 hidden w-[10%] cursor-pointer items-center justify-center bg-gradient-to-r from-transparent to-[#f6eee8]/95 text-[#82558a] opacity-0 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a] motion-reduce:transition-none md:flex">
          <ArrowRight size={24} aria-hidden="true" className="pointer-events-none" />
        </button>
        <div inert={!controlsVisible} aria-hidden={!controlsVisible} className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 motion-reduce:transition-none md:hidden ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <button type="button" aria-label="Previous menu item" aria-controls="menu-cards" onClick={() => scroll(-1)} className="pointer-events-auto absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9b8d7] bg-[#fffaf4]/95 text-[#82558a] shadow-md focus-visible:outline-2 focus-visible:outline-offset-2">
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next menu item" aria-controls="menu-cards" onClick={() => scroll(1)} className="pointer-events-auto absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9b8d7] bg-[#fffaf4]/95 text-[#82558a] shadow-md focus-visible:outline-2 focus-visible:outline-offset-2">
              <ArrowRight size={20} aria-hidden="true" />
            </button>
        </div>
      </div>
      <ul aria-label="Choose a menu item" className="mt-3 flex items-center justify-center" {...dotsProps}>
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
