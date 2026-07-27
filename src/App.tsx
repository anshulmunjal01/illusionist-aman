import { useState, useEffect, lazy, Suspense, Dispatch, SetStateAction } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Core layout & global components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import BackgroundEffect from './components/BackgroundEffect';
import CustomCursor from './components/CustomCursor';
import FloatingControls from './components/FloatingControls';
import SEOHead from './components/SEOHead';
import Loader from './components/Loader';
import MediaDesk from './components/MediaDesk';

// Page Views with Lazy Loading for Code Splitting and Performance
import HomePage from './pages/HomePage';
const ChroniclePage = lazy(() => import('./pages/ChroniclePage'));
const FormatsPage = lazy(() => import('./pages/FormatsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const WatchPage = lazy(() => import('./pages/WatchPage'));
const ViewPage = lazy(() => import('./pages/ViewPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="w-8 h-8 rounded-full border-2 border-[#A77A2A] border-t-transparent animate-spin" />
    </div>
  );
}

function AnimatedRoutes({ theme }: { theme: 'dark' | 'light' }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/about" element={<ChroniclePage />} />
            <Route path="/shows" element={<FormatsPage />} />
            <Route path="/formats" element={<FormatsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function MainAppContent({
  theme,
  toggleTheme,
  loading,
  setLoading,
  mediaDeskOpen,
  setMediaDeskOpen
}: {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  mediaDeskOpen: boolean;
  setMediaDeskOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const isMediaPage = location.pathname.startsWith('/watch/') || location.pathname.startsWith('/view/');

  return (
    <div className="relative min-h-screen font-sans bg-[#F6F2EA] dark:bg-[#030305] text-[#2F2F2F] dark:text-neutral-100 selection:bg-[#A77A2A] selection:text-white dark:selection:bg-amber-400 dark:selection:text-black transition-colors duration-700 overflow-x-hidden">
      {/* 1. Cinematic Preloader Overlay */}
      <Loader onComplete={() => setLoading(false)} />

      {/* When preloader completes, render the multi-page landscape */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen flex flex-col justify-between"
        >
          {/* 2. Atmospheric Theatre Fog & Light Ray Canvas (Hidden on full-screen media) */}
          {!isMediaPage && <BackgroundEffect theme={theme} />}

          {/* 3. Optical Lens Cursor */}
          <CustomCursor />

          {/* 4. Sticky Header Navigation (Hidden on full-screen media) */}
          {!isMediaPage && (
            <Navigation
              theme={theme}
              toggleTheme={toggleTheme}
              onToggleMediaDesk={() => setMediaDeskOpen(true)}
            />
          )}

          {/* 5. Multi-Page View Routes */}
          <main id="main-content" className="flex-1 w-full relative z-10" tabIndex={-1}>
            <AnimatedRoutes theme={theme} />
          </main>

          {/* 6. Footer (Hidden on full-screen media) */}
          {!isMediaPage && <Footer />}

          {/* 7. Floating Controls (Hidden on full-screen media) */}
          {!isMediaPage && <FloatingControls onToggleMediaDesk={() => setMediaDeskOpen(true)} />}

          {/* 8. Media Desk Manager Overlay */}
          <MediaDesk isOpen={mediaDeskOpen} onClose={() => setMediaDeskOpen(false)} />
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mediaDeskOpen, setMediaDeskOpen] = useState(false);

  // Theme support (persisted in localStorage)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Align document root with theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Keyboard shortcut to open hidden Media Desk (Ctrl+Shift+M or Cmd+Shift+M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setMediaDeskOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <SEOHead />
      <ScrollToTop />
      <ScrollProgress />
      
      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#A77A2A] focus:text-white focus:rounded-lg focus:shadow-xl font-mono text-xs uppercase tracking-widest font-bold"
      >
        Skip to main content
      </a>

      <MainAppContent
        theme={theme}
        toggleTheme={toggleTheme}
        loading={loading}
        setLoading={setLoading}
        mediaDeskOpen={mediaDeskOpen}
        setMediaDeskOpen={setMediaDeskOpen}
      />
    </BrowserRouter>
  );
}
