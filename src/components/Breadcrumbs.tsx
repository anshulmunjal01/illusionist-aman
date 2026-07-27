import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  // Pretty label mappings
  const labelMap: Record<string, string> = {
    about: 'Chronicle & Bio',
    shows: 'Performance Formats',
    formats: 'Performance Formats',
    gallery: 'Pictorial Gallery',
    videos: 'Recorded Showreels',
    testimonials: 'Client Reviews & FAQs',
    contact: 'Booking Desk',
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-7xl mx-auto px-6 pt-28 pb-4 z-20 relative">
      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#5A5A5A] dark:text-neutral-400 font-medium">
        <Magnetic intensity={0.2}>
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-[#161616] dark:hover:text-amber-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </Magnetic>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = labelMap[name.toLowerCase()] || name.replace(/-/g, ' ');

          return (
            <div key={routeTo} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-[#C9A35A] dark:text-amber-500/60" />
              {isLast ? (
                <span className="text-[#161616] dark:text-amber-400 font-bold">
                  {formattedName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-[#161616] dark:hover:text-amber-400 transition-colors"
                >
                  {formattedName}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
