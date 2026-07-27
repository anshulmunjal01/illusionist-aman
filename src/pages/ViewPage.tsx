import React, { useEffect, useState, useCallback, TouchEvent } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMedia } from '../MediaContext';
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  Check,
  Image as ImageIcon,
  Info
} from 'lucide-react';

export default function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { galleryItems } = useMedia();

  // Identify current gallery item
  const currentIdx = galleryItems.findIndex((g) => g.id === id);
  const item = currentIdx !== -1 ? galleryItems[currentIdx] : galleryItems[0];

  // Image Zoom & UI State
  const [zoomScale, setZoomScale] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  // Touch Swipe gestures state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Determine prev and next images
  const prevIdx = (currentIdx - 1 + galleryItems.length) % galleryItems.length;
  const nextIdx = (currentIdx + 1) % galleryItems.length;
  const prevItem = galleryItems[prevIdx];
  const nextItem = galleryItems[nextIdx];

  // Update Page Title
  useEffect(() => {
    if (item) {
      document.title = `${item.title} | Illusionist Aman - Photo Vault`;
    }
    return () => {
      document.title = 'Illusionist Aman - Stage Magic & Illusions';
    };
  }, [item]);

  // Clean Navigation Back logic - Returns to exact previous page and preserves scroll position
  const handleBack = useCallback(() => {
    if (window.history.length > 1 && location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/gallery');
    }
  }, [navigate, location.key]);

  // Reset Zoom on item change
  useEffect(() => {
    setZoomScale(1);
  }, [id]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleBack();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(`/view/${prevItem.id}`);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(`/view/${nextItem.id}`);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, navigate, prevItem.id, nextItem.id]);

  const handleShare = async () => {
    const shareData = {
      title: `${item.title} | Illusionist Aman`,
      text: item.description || 'View this photo of Illusionist Aman',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  // Touch Gesture Handling
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Horizontal swipe (only if not zoomed in)
    if (zoomScale === 1 && Math.abs(diffX) > 70 && Math.abs(diffY) < 50) {
      if (diffX > 0) {
        navigate(`/view/${nextItem.id}`);
      } else {
        navigate(`/view/${prevItem.id}`);
      }
    } else if (diffY < -120 && Math.abs(diffX) < 80) {
      // Swipe Down -> Back
      handleBack();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] bg-[#030305] text-white flex flex-col justify-between overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Top Header Controls */}
      <header className="relative w-full px-4 sm:px-8 py-3 sm:py-5 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-40">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white border border-white/15 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          title="Return to previous page (Esc)"
          aria-label="Back to previous page"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-sans text-xs tracking-wider uppercase font-semibold">
            Back
          </span>
        </button>

        {/* Index Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest bg-amber-400/10 border border-amber-400/25 px-3 py-1 rounded-full uppercase">
            {currentIdx + 1} / {galleryItems.length}
          </span>
          {item.category && (
            <span className="hidden md:inline-block font-sans text-xs text-neutral-300 uppercase tracking-widest font-medium">
              {item.category}
            </span>
          )}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setZoomScale((prev) => Math.max(prev - 0.4, 1))}
            disabled={zoomScale <= 1}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-colors disabled:opacity-30 cursor-pointer hidden sm:flex"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomScale((prev) => Math.min(prev + 0.4, 3))}
            disabled={zoomScale >= 3}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-colors disabled:opacity-30 cursor-pointer hidden sm:flex"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          {zoomScale > 1 && (
            <button
              onClick={() => setZoomScale(1)}
              className="p-2.5 bg-amber-400 text-black rounded-full transition-colors cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-colors cursor-pointer flex items-center justify-center relative"
            title="Share Image Link"
            aria-label="Share Image"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied && (
              <span className="absolute -bottom-8 right-0 bg-emerald-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                Link Copied!
              </span>
            )}
          </button>

          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className={`p-2.5 rounded-full border border-white/10 transition-colors cursor-pointer flex items-center justify-center ${
              showInfo ? 'bg-amber-400 text-black border-amber-400' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="Toggle Details"
            aria-label="Toggle Details"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Close Button */}
          <button
            onClick={handleBack}
            className="p-2.5 bg-neutral-900/90 hover:bg-amber-400 hover:text-black text-white rounded-full border border-white/20 shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
            title="Close View Page (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Main Picture Display Area */}
      <main className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Previous Image Button */}
        <button
          onClick={() => navigate(`/view/${prevItem.id}`)}
          className="absolute left-2 sm:left-6 p-3 sm:p-4 bg-black/60 hover:bg-amber-400 hover:text-black border border-white/15 text-white rounded-full transition-all duration-300 cursor-pointer z-30 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl group"
          title={`Previous: ${prevItem.title}`}
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Next Image Button */}
        <button
          onClick={() => navigate(`/view/${nextItem.id}`)}
          className="absolute right-2 sm:right-6 p-3 sm:p-4 bg-black/60 hover:bg-amber-400 hover:text-black border border-white/15 text-white rounded-full transition-all duration-300 cursor-pointer z-30 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl group"
          title={`Next: ${nextItem.title}`}
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Image Stage */}
        <div className="relative max-h-[75vh] w-full max-w-5xl flex items-center justify-center p-2">
          <motion.img
            key={item.id}
            src={item.url}
            alt={item.title}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoomScale }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-white/15 transition-transform duration-300"
          />
        </div>
      </main>

      {/* 3. Bottom Information & Metadata Bar */}
      <AnimatePresence>
        {showInfo && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-gradient-to-t from-black via-black/90 to-transparent p-4 sm:p-6 text-center sm:text-left z-40 border-t border-white/10 pb-safe"
          >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                  <span className="font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    {item.category || 'Gallery'}
                  </span>
                </div>
                <h1 className="text-base sm:text-2xl font-display text-white tracking-wider uppercase font-semibold">
                  {item.title}
                </h1>
                {item.description && (
                  <p className="text-neutral-300 font-sans text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed font-normal">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Keyboard / Swipe Hint */}
              <div className="hidden lg:flex flex-col items-end gap-1 text-[10px] text-neutral-400 font-mono tracking-widest uppercase shrink-0">
                <span>Use ← → keys or swipe to cycle</span>
                <span>Press Esc to return</span>
              </div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
