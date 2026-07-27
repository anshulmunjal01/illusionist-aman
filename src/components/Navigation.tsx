import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, ChevronDown, Phone, Play, Image, Award, Film, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Magnetic from './Magnetic';
import { CONTACT_INFO } from '../data';

interface NavigationProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onToggleMediaDesk?: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Shows', path: '/shows', hasMegaMenu: true },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Videos', path: '/videos' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation({ theme, toggleTheme, onToggleMediaDesk }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Monitor scroll height to trigger glass background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close open menus for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMegaMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-[#F6F2EA]/90 dark:bg-[#040407]/85 backdrop-blur-md border-[#DDD4C7] dark:border-white/5 py-4 shadow-sm dark:shadow-2xl'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Typographic Logo */}
          <Link
            to="/"
            aria-label="Magician Aman Home"
            className="font-display text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase text-[#111111] dark:text-amber-100 hover:text-[#A77A2A] dark:hover:text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none rounded-md cursor-pointer font-bold flex items-center gap-1.5"
          >
            Illusionist Aman
          </Link>

          {/* Desktop Nav Items */}
          <nav role="navigation" aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === '/shows' && location.pathname === '/formats');

              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`font-sans text-[11px] uppercase tracking-widest transition-all duration-300 relative py-1 focus:outline-none cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'text-[#111111] dark:text-amber-400 font-bold'
                          : 'text-[#1D1D1D] hover:text-[#111111] dark:text-neutral-400 dark:hover:text-white font-medium'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          megaMenuOpen ? 'rotate-180 text-[#A77A2A] dark:text-amber-400' : 'text-[#222222] dark:text-neutral-400'
                        }`}
                      />

                      {/* Active Indicator Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A77A2A] dark:bg-amber-400"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Desktop Mega Menu Dropdown */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#07070b]/98 border border-[#DDD4C7] dark:border-white/10 shadow-[0_20px_50px_rgba(167,122,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-50 text-left"
                        >
                          <div className="grid grid-cols-2 gap-6">
                            {/* Left Column: Formats Quick Links */}
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-[#555555] dark:text-amber-400 font-bold block mb-3">
                                Showcase Formats
                              </span>
                              <div className="space-y-3">
                                <Link
                                  to="/shows"
                                  className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#EFE7DA] dark:hover:bg-white/[0.04] transition-colors"
                                >
                                  <div className="p-2 rounded-lg bg-[#A77A2A]/15 text-[#A77A2A] dark:bg-amber-400/10 dark:text-amber-400 border border-[#A77A2A]/30 dark:border-amber-400/20 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-4 h-4 text-[#A77A2A]" />
                                  </div>
                                  <div>
                                    <h4 className="font-display text-xs uppercase text-[#111111] dark:text-white tracking-wider font-semibold group-hover:text-[#A77A2A] dark:group-hover:text-amber-400 transition-colors">
                                      Grand Stage Illusions
                                    </h4>
                                    <p className="font-sans text-[10px] text-[#2F2F2F] dark:text-neutral-400 mt-0.5">
                                      Western-style illusions for arenas & auditoriums.
                                    </p>
                                  </div>
                                </Link>

                                <Link
                                  to="/shows"
                                  className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#EFE7DA] dark:hover:bg-white/[0.04] transition-colors"
                                >
                                  <div className="p-2 rounded-lg bg-[#A77A2A]/15 text-[#A77A2A] dark:bg-purple-400/10 dark:text-purple-400 border border-[#A77A2A]/30 dark:border-purple-400/20 group-hover:scale-110 transition-transform">
                                    <Award className="w-4 h-4 text-[#A77A2A]" />
                                  </div>
                                  <div>
                                    <h4 className="font-display text-xs uppercase text-[#111111] dark:text-white tracking-wider font-semibold group-hover:text-[#A77A2A] dark:group-hover:text-amber-400 transition-colors">
                                      Mind Reading & Mentalism
                                    </h4>
                                    <p className="font-sans text-[10px] text-[#2F2F2F] dark:text-neutral-400 mt-0.5">
                                      Interactive perception for high-net-worth galas.
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Right Column: Visual Preview Card */}
                            <div className="bg-[#EFE7DA] dark:bg-neutral-900/60 p-4 rounded-xl border border-[#DDD4C7] dark:border-white/5 flex flex-col justify-between">
                              <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-[#555555] dark:text-neutral-400 block mb-2 font-semibold">
                                  Cinematic Highlight
                                </span>
                                <h4 className="font-display text-xs uppercase text-[#111111] dark:text-amber-200 font-semibold">
                                  Private Yacht & Gala Shows
                                </h4>
                                <p className="font-sans text-[10px] text-[#2F2F2F] dark:text-neutral-400 mt-1 leading-relaxed">
                                  Exclusive close-up sleight of hand tailored for dignitaries and private guests.
                                </p>
                              </div>

                              <div className="pt-3 border-t border-[#DDD4C7] dark:border-white/5 flex items-center justify-between mt-3">
                                <Link
                                  to="/videos"
                                  className="text-[10px] uppercase font-mono tracking-widest text-[#111111] dark:text-amber-400 hover:text-[#A77A2A] flex items-center gap-1 font-bold"
                                >
                                  Watch Reel <Film className="w-3 h-3 text-[#A77A2A]" />
                                </Link>
                                <Link
                                  to="/gallery"
                                  className="text-[10px] uppercase font-mono tracking-widest text-[#555555] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white flex items-center gap-1 font-semibold"
                                >
                                  Pictorial Gallery <Image className="w-3 h-3 text-[#A77A2A]" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-sans text-[11px] uppercase tracking-widest transition-all duration-300 relative py-1 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-[#111111] dark:text-amber-400 font-bold'
                      : 'text-[#1D1D1D] hover:text-[#111111] dark:text-neutral-400 dark:hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A77A2A] dark:bg-amber-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-3">
            {/* Direct Call CTA */}
            <Magnetic intensity={0.2} className="hidden sm:inline-block">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="py-2.5 px-5 rounded-full font-sans text-[10px] uppercase tracking-widest font-semibold bg-[#111111] text-[#FFFFFF] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300 shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-[#111111] hover:border-[#A77A2A]"
              >
                <Phone className="w-3 h-3 fill-current text-[#FFFFFF]" />
                <span>Reserve</span>
              </a>
            </Magnetic>

            {/* The celestial theme toggle */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Mobile Burger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#111111] dark:text-amber-400 border border-[#DDD4C7] dark:border-amber-400/25 bg-[#FFFFFF] dark:bg-white/5 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
            key="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#F6F2EA]/98 dark:bg-[#040407]/98 backdrop-blur-2xl z-40 flex flex-col justify-center items-center px-6 select-none"
          >
            {/* Ambient light ray background */}
            <div className="absolute top-1/4 w-[300px] h-[300px] rounded-full bg-[#A77A2A]/10 dark:bg-amber-500/[0.03] blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center gap-5 text-center max-w-sm">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A77A2A]" />
                Navigation Vault
              </span>

              {NAV_ITEMS.map((item, idx) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === '/shows' && location.pathname === '/formats');
                return (
                  <motion.button
                    key={`mobile-nav-${item.path}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    onClick={() => handleNavigate(item.path)}
                    className={`font-display text-base sm:text-lg tracking-[0.25em] uppercase border-b border-transparent hover:border-[#A77A2A] pb-1 cursor-pointer transition-colors ${
                      isActive
                        ? 'text-[#111111] dark:text-amber-400 font-bold border-b-[#A77A2A]'
                        : 'text-[#1D1D1D] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white font-medium'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <div className="w-16 h-[1px] bg-[#DDD4C7] dark:bg-white/10 my-2" />

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="py-3 px-8 rounded-full font-sans text-xs tracking-widest uppercase font-semibold bg-[#111111] text-[#FFFFFF] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300 shadow-md flex items-center gap-2 cursor-pointer border border-[#111111] hover:border-[#A77A2A]"
              >
                <Phone className="w-3.5 h-3.5 fill-current text-[#FFFFFF]" />
                <span>Inquire & Reserve</span>
              </a>

              <p className="font-sans text-[10px] tracking-widest text-[#707070] dark:text-neutral-400 uppercase mt-2 font-medium">
                Illusionist Aman • Private Booking Desk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
