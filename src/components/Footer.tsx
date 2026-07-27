import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#EFE7DA] dark:bg-[#020204] z-10 border-t border-[#DDD4C7] dark:border-white/5 py-16 px-6 overflow-hidden">
      
      {/* Decorative radial gradients */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[150px] bg-[#A77A2A]/10 dark:bg-amber-500/[0.012] blur-3xl pointer-events-none rounded-full" />

      {/* Main Grid content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#DDD4C7] dark:border-white/5 pb-12 items-start">
        
        {/* Left Column: Brand & Story snippet */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <h3 className="font-display text-lg tracking-[0.35em] uppercase text-[#111111] dark:text-amber-100 font-semibold select-none">
            Illusionist Aman
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#2F2F2F] dark:text-neutral-400 mt-4 leading-relaxed max-w-sm font-normal">
            Crafting premium interactive mentalism and grand-scale stage illusions. Dissolving certainty to build memorable wonder.
          </p>
        </div>

        {/* Center Column: Quick Navigation Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-[10px] tracking-widest uppercase text-[#111111] dark:text-amber-400 font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#2F2F2F] dark:text-neutral-400 font-medium">
              <li>
                <Link to="/" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Chronicle
                </Link>
              </li>
              <li>
                <Link to="/shows" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Shows
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-widest uppercase text-[#111111] dark:text-amber-400 font-bold mb-4">
              Details
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#2F2F2F] dark:text-neutral-400 font-medium">
              <li>
                <Link to="/videos" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Recordings
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Reviews & FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#111111] dark:hover:text-white transition-colors">
                  Booking Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Social Networks */}
        <div className="md:col-span-3 flex flex-col justify-start items-start md:items-end md:text-right">
          <h4 className="font-display text-[10px] tracking-widest uppercase text-[#111111] dark:text-amber-400 font-bold mb-4">
            Direct Networks
          </h4>
          <div className="flex items-center gap-4 text-[#111111]">
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#FFFFFF] dark:bg-white/[0.02] border border-[#A77A2A] dark:border-white/5 rounded-full text-[#111111] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:hover:text-amber-400 transition-colors shadow-sm"
              aria-label="Instagram Feed Link"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#FFFFFF] dark:bg-white/[0.02] border border-[#A77A2A] dark:border-white/5 rounded-full text-[#111111] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:hover:text-amber-400 transition-colors shadow-sm"
              aria-label="Facebook Page Link"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Sub-Footer Copyright block */}
      <div className="max-w-7xl mx-auto pt-8 flex items-center justify-center text-center text-[#555555] dark:text-neutral-500 text-[10px] uppercase tracking-[0.2em] relative font-normal">
        <p>© 2026 Illusionist Aman. All Rights Reserved.</p>
      </div>

    </footer>
  );
}
