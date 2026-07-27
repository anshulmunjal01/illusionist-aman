import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on fresh forward navigation to main pages ('PUSH' / 'REPLACE')
    // Do NOT reset scroll position when going back ('POP') or when viewing full-screen media
    if (navType !== 'POP' && !pathname.startsWith('/watch') && !pathname.startsWith('/view')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, navType]);

  return null;
}
