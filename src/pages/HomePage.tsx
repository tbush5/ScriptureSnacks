import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuSection from '../components/MenuSection';

interface LocationState {
  scrollTo?: string;
}

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className="w-full">
      <section 
        id="home" 
        aria-labelledby="story-heading"
        className="scroll-mt-24 bg-[#fffaf4] px-6 pb-16 pt-6 text-[#49352e] sm:pb-20 sm:pt-8 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-20">
          <header className="text-center md:col-span-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#82558a]">
              Welcome to Scripture Snacks
            </p>
            <h1 id="story-heading" className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Every Snack has a Story
            </h1>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-light-purple" />
          </header>
          <figure className="relative order-2 w-full max-w-lg justify-self-start md:justify-self-end">
            <img
              src="/img/fall-collage-gallery.jpg"
              alt="A fall collage of Scripture Snacks baked goods"
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full rounded-t-full rounded-b-3xl object-cover shadow-lg"
              fetchPriority="high"
            />
            <figcaption className="absolute -bottom-5 -left-5 max-w-[calc(100%-0.5rem)] rounded-2xl bg-green-sea py-4 pl-6 pr-3 font-serif text-xl text-[#49352e] shadow-sm sm:-left-9">
              A little faith. A little sweetness.
            </figcaption>
          </figure>

          <div className="order-1 lg:py-8">
            <h2 className="mb-4 font-serif text-2xl">Here is the story</h2>
            <div className="space-y-5 text-base leading-8 text-[#6d5950] sm:text-lg">
              <p>
                Hello, I am Katie, and I started Scripture Snacks in a daydream. No, actually!
                I was on a plane in the sky while daydreaming about baking. I dreamt of a bakery
                where I worked to serve the Lord our God and serve his people. In this day of age eveyone seems busy,
                so please sit back and take a snack.
              </p>
            </div>
            <a
              href="#menu"
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
          <h2 id="order-heading" className="font-serif text-4xl sm:text-5xl">Order Section</h2>
          <div aria-hidden="true" className="mx-auto mt-5 h-1 w-16 rounded-full bg-light-purple" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
