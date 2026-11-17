import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import ScriptureSnacksLogo from '../assets/ScriptureSnacksLogo.svg';

type SectionId = 'home' | 'menu' | 'order';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[#edb5c6] px-6 text-[#49352e] transition-all duration-300 lg:px-8 ${
        isScrolled
          ? 'bg-[#f8d7e3]/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-[#f8d7e3] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">

          <Link
            to="/"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-1.5 group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]"
          >
            <img
              src={ScriptureSnacksLogo}
              alt=""
              className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div>
              <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#49352e] block leading-none">
                Scripture
              </span>
              <span className="mt-1 block text-[10px] text-[#82558a] font-semibold tracking-[0.25em] uppercase">
                Snacks
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection('home')}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#6d5950] hover:text-[#82558a] hover:bg-[#e4c6eb]/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#6d5950] hover:text-[#82558a] hover:bg-[#e4c6eb]/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a]"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#6d5950] hover:text-[#82558a] hover:bg-[#e4c6eb]/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a]"
            >
              Order
            </button>
            <Link
              to="/gallery"
              className="px-4 py-2 rounded-full text-sm font-medium text-[#6d5950] hover:text-[#82558a] hover:bg-[#e4c6eb]/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82558a]"
            >
              Gallery
            </Link>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('order')}
              className="bg-[#82558a] hover:bg-[#6b4472] text-white font-semibold px-5 py-3 rounded-full text-sm shadow-sm flex items-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82558a]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="rounded-full p-2 text-[#82558a] hover:bg-[#e4c6eb]/40 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-[#e9ddd4] mt-4 pt-3 pb-2 space-y-2">
          <button
            onClick={() => scrollToSection('home')}
            className="w-full text-left px-4 py-3 rounded-xl text-[#6d5950] hover:bg-[#e4c6eb]/40 hover:text-[#82558a] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#82558a]"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="w-full text-left px-4 py-3 rounded-xl text-[#6d5950] hover:bg-[#e4c6eb]/40 hover:text-[#82558a] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#82558a]"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('order')}
            className="w-full text-left px-4 py-3 rounded-xl text-[#6d5950] hover:bg-[#e4c6eb]/40 hover:text-[#82558a] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#82558a]"
          >
            Order Online
          </button>
          <Link
            to="/gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 rounded-xl text-[#6d5950] hover:bg-[#e4c6eb]/40 hover:text-[#82558a] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#82558a]"
          >
            Gallery
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
