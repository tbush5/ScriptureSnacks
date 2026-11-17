import { Heart } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ScriptureSnacksLogo from '../assets/ScriptureSnacksLogo.svg';

export default function Footer() {
  const linkClass = 'rounded-full text-sm text-[#6d5950] transition-colors hover:text-[#82558a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]';

  return (
    <footer className="border-t border-[#edb5c6] bg-[#f8d7e3] px-6 py-10 text-[#49352e] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <Link to="/" state={{ scrollTo: 'home' }} className="inline-flex items-center gap-1.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]">
              <img src={ScriptureSnacksLogo} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
              <span>
                <span className="block font-serif text-2xl leading-none">Scripture</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#82558a]">Snacks</span>
              </span>
            </Link>
            <p className="mt-4 font-serif text-lg text-[#6d5950]">A little faith. A little sweetness.</p>
          </div>
          <a
            href="https://www.instagram.com/scripturesnacksofvb/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 justify-self-center rounded-full px-4 py-3 text-sm font-medium text-[#82558a] transition-colors hover:bg-[#edb5c6]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]"
            aria-label="@scripturesnacksofvb on Instagram (opens in a new tab)"
          >
            <FaInstagram size={20} aria-hidden="true" />
            <span>@scripturesnacksofvb</span>
          </a>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-7 gap-y-4 md:justify-end">
            <Link to="/" state={{ scrollTo: 'home' }} className={linkClass}>Home</Link>
            <Link to="/" state={{ scrollTo: 'menu' }} className={linkClass}>Menu</Link>
            <Link to="/" state={{ scrollTo: 'order' }} className={linkClass}>Order</Link>
            <Link to="/gallery" onClick={() => window.scrollTo({ top: 0 })} className={linkClass}>Gallery</Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#edb5c6] pt-6 text-xs text-[#6d5950] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Scripture Snacks. All rights reserved.</p>
          <p className="flex items-center gap-1.5">Made with love <Heart size={13} aria-hidden="true" className="text-[#82558a]" /></p>
        </div>
      </div>
    </footer>
  );
}
