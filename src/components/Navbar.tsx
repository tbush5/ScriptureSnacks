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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-light-purple/90 backdrop-blur-md shadow-xl border-b border-slate-800/60 py-3'
          : 'bg-light-purple text-white py-4 shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          <Link
            to="/"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <img
              src={ScriptureSnacksLogo}
              alt=""
              className="w-10 h-10 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
                Scripture
              </span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                Snacks
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection('home')}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-all"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-all"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-all"
            >
              Order
            </button>
            <Link
              to="/gallery"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-all"
            >
              Gallery
            </Link>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('order')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 rounded-full text-sm shadow-md flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => scrollToSection('home')}
            className="w-full text-left px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="w-full text-left px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('order')}
            className="w-full text-left px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Order Online
          </button>
          <Link
            to="/gallery"
            className="block w-full text-left px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Gallery
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
