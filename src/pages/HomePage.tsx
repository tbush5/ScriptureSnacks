import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuSection from '../components/MenuSection';
import { scrollToSectionAfterLayout } from '../lib/scrollToSection';
import { homePhotoSizes, photoSrcSet } from '../lib/responsiveImages';

interface LocationState {
  scrollTo?: string;
}

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.scrollTo) {
      return scrollToSectionAfterLayout(state.scrollTo);
    }
  }, [location]);

  return (
    <main className="w-full">
      <section 
        id="home" 
        aria-labelledby="story-heading"
        className="scroll-mt-24 bg-[#fffaf4] px-6 pb-16 pt-6 text-[#49352e] sm:pb-20 sm:pt-8 lg:px-8"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-x-8 gap-y-10 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <header className="text-center md:col-span-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#82558a]">
              Welcome to Scripture Snacks
            </p>
            <h1 id="story-heading" className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Every Snack has a Story
            </h1>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-light-purple" />
          </header>
          <figure className="relative order-2 w-[75%] max-w-xs justify-self-center md:w-full md:justify-self-end">
            <img
              src="/img/pumpkin-muffin-gallery.webp"
              srcSet={photoSrcSet('/img/pumpkin-muffin-gallery.webp')}
              sizes={homePhotoSizes}
              alt="Pumpkin muffins on a wooden platter beside a sunflower"
              width={960}
              height={1280}
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-lg"
              fetchPriority="high"
            />
            <figcaption className="absolute -bottom-5 -left-5 max-w-[calc(100%-0.5rem)] rounded-2xl bg-green-sea py-4 pl-6 pr-3 font-serif text-xl text-[#49352e] shadow-sm sm:-left-9">
              Baked fresh for you with clean ingredients!
            </figcaption>
          </figure>

          <div className="order-1 lg:py-8">
            <h2 className="mb-4 font-serif text-2xl">Here is the story</h2>
            <div className="space-y-5 text-base leading-8 text-[#6d5950] sm:text-lg">
              <p>
                Hello, I am Katie, and I started Scripture Snacks in a daydream. No, actually!
                I was on a plane in the sky while daydreaming about baking. I dreamt of a bakery
                where I worked to serve the Lord our God and serve his people. In this day and age, everyone seems busy,
                so please sit back and take a snack.
              </p>
            </div>
            <a
              href="#menu"
              onClick={event => {
                event.preventDefault();
                scrollToSectionAfterLayout('menu');
              }}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#82558a] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6b4472] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]"
            >
              Explore the menu <span aria-hidden="true" className="ml-3">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <MenuSection />

      <section 
        id="order" 
        aria-labelledby="order-heading"
        className="scroll-mt-24 min-h-[70vh] flex items-center justify-center bg-[#fffaf4] px-6 py-16 text-[#49352e] sm:py-20 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 id="order-heading" className="font-serif text-4xl sm:text-5xl">Order</h2>
          <div aria-hidden="true" className="mx-auto mt-5 h-1 w-16 rounded-full bg-light-purple" />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#6d5950] sm:text-lg">
            Currently, for all online orders, contact me on Instagram at{' '}
            <a
              href="https://www.instagram.com/scripturesnacksofvb/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#82558a] hover:text-[#6b4472] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              @scripturesnacksofvb
            </a>{' '}
            or email me at{' '}
            <a
              href="mailto:scripturesnacksofvb@gmail.com"
              className="break-words font-medium text-[#82558a] hover:text-[#6b4472] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              scripturesnacksofvb@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
