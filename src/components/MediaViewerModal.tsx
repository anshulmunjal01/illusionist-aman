import React, { useEffect, useRef, useState, TouchEvent, ChangeEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  PictureInPicture2
} from 'lucide-react';

export interface MediaViewerItem {
  id: string;
  type: 'image' | 'video';
  url: string; // Image URL or Video URL
  thumbnail?: string;
  title: string;
  category?: string;
  description?: string;
  duration?: string;
}

interface MediaViewerModalProps {
  isOpen: boolean;
  items: MediaViewerItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export default function MediaViewerModal({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: MediaViewerModalProps) {
  const currentItem = items[currentIndex];

  // Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPipSupported, setIsPipSupported] = useState(false);

  // Image Zoom State
  const [zoomScale, setZoomScale] = useState(1);

  // Mobile Touch Gestures State
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragY, setDragY] = useState(0);

  // Accessibility & Focus Memory
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  // Safe Index Navigation
  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    const newIdx = (currentIndex - 1 + items.length) % items.length;
    setZoomScale(1);
    onNavigate?.(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    const newIdx = (currentIndex + 1) % items.length;
    setZoomScale(1);
    onNavigate?.(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  // Clean Modal Close Routine
  const handleClose = useCallback(() => {
    // Pause and clear video source
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setDragY(0);

    onClose();
  }, [onClose]);

  // Handle Scroll Locking & History Popstate (Android Back Button)
  useEffect(() => {
    if (!isOpen) return;

    // Save focused element
    lastActiveElementRef.current = document.activeElement as HTMLElement;

    // Prevent body scroll & scrollbar jump
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Android back button / Browser history popstate handler
    window.history.pushState({ mediaModalOpen: true }, '');

    const handlePopState = () => {
      handleClose();
    };

    window.addEventListener('popstate', handlePopState);

    // Page Visibility API - Pause video when tab becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;

      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Restore focus on close
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen, handleClose]);

  // Keyboard Shortcuts (Esc, Arrows, Space, M, F)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      // Arrows
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Video Controls
      if (currentItem?.type === 'video' && videoRef.current) {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          togglePlay();
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          toggleMute();
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          toggleFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentItem, handleClose, handlePrev, handleNext]);

  // Check Picture-in-Picture Support
  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setIsPipSupported(Boolean(document.pictureInPictureEnabled));
    }
  }, []);

  // Video Time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (newVol: number) => {
    if (!videoRef.current) return;
    videoRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol === 0) {
      videoRef.current.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    const el = modalContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const togglePip = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Touch Swipe Handling (Vertical swipe down to close, horizontal swipe for prev/next)
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY;

    if (diffY > 0) {
      setDragY(diffY);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchEndY - touchStartY;

      if (diffY > 120) {
        // Swipe down threshold triggered -> Close modal
        handleClose();
        return;
      }
    }

    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;

      if (Math.abs(diffX) > 60) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }

    setTouchStartY(null);
    setTouchStartX(null);
    setDragY(0);
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '0:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!isOpen || !currentItem) return null;

  const isYouTube = currentItem.url.includes('youtube.com') || currentItem.url.includes('youtu.be');

  return (
    <AnimatePresence>
      <motion.div
        key="media-viewer-backdrop"
        ref={modalContainerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${currentItem.title} viewer`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
        style={{ transform: `translateY(${dragY}px)`, transition: dragY === 0 ? 'transform 0.2s ease-out' : 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClose}
      >
        {/* Top Header Controls Bar */}
        <div
          className="relative w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-30 pt-safe"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Index Counter & Category */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm text-amber-400 font-semibold tracking-wider bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full uppercase">
              {currentIndex + 1} / {items.length}
            </span>
            {currentItem.category && (
              <span className="hidden sm:inline-block font-sans text-xs text-neutral-300 uppercase tracking-widest font-medium">
                {currentItem.category}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentItem.type === 'image' && (
              <>
                <button
                  onClick={() => setZoomScale((prev) => Math.max(prev - 0.4, 1))}
                  disabled={zoomScale <= 1}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoomScale((prev) => Math.min(prev + 0.4, 3))}
                  disabled={zoomScale >= 3}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Prominent Large Close Button */}
            <button
              onClick={handleClose}
              className="p-2.5 bg-neutral-900/90 hover:bg-amber-400 hover:text-black text-white rounded-full border border-white/20 shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Stage Media Area */}
        <div
          className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
          onClick={handleClose}
        >
          {/* Previous Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 p-3 bg-black/60 hover:bg-amber-400 hover:text-black border border-white/10 text-white rounded-full transition-all duration-300 cursor-pointer z-30 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl"
              aria-label="Previous Media"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Next Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 p-3 bg-black/60 hover:bg-amber-400 hover:text-black border border-white/10 text-white rounded-full transition-all duration-300 cursor-pointer z-30 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl"
              aria-label="Next Media"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Media Display Window */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[75vh] w-full max-w-5xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ scale: currentItem.type === 'image' ? zoomScale : 1 }}
          >
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.url}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (currentItem.url.includes('143nmuRx4yWftTgoIrb7BlV3Vf-dzDraW')) {
                    target.src = 'https://drive.google.com/thumbnail?id=143nmuRx4yWftTgoIrb7BlV3Vf-dzDraW&sz=w1200';
                  } else if (currentItem.url.includes('1vM5mHXICFpnS1zUd5-lcEMLEUZ-SLr8t')) {
                    target.src = 'https://drive.google.com/thumbnail?id=1vM5mHXICFpnS1zUd5-lcEMLEUZ-SLr8t&sz=w1200';
                  }
                }}
                className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/10 pointer-events-auto"
              />
            ) : isYouTube ? (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <iframe
                  src={`${currentItem.url}?autoplay=1&mute=0&modestbranding=1&rel=0&showinfo=0`}
                  title={currentItem.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9] w-full max-w-4xl rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black flex flex-col group/player">
                <video
                  ref={videoRef}
                  src={currentItem.url}
                  poster={currentItem.thumbnail}
                  autoPlay
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                />

                {/* Custom HTML5 Video Player Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 opacity-100 sm:opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-20">
                  {/* Progress Seek Bar */}
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/20 accent-amber-400 rounded-lg appearance-none cursor-pointer hover:h-2 transition-all"
                  />

                  {/* Player Controls Strip */}
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }}
                        className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                        title="Replay"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleMute}
                          className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                        >
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-16 h-1 bg-white/20 accent-amber-400 rounded appearance-none cursor-pointer hidden sm:block"
                        />
                      </div>

                      <span className="font-mono text-[11px] text-neutral-300 ml-2">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPipSupported && (
                        <button
                          onClick={togglePip}
                          className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                          title="Picture-in-Picture"
                        >
                          <PictureInPicture2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                        title="Fullscreen (F)"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Metadata & Caption Panel */}
        <div
          className="w-full bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 sm:p-6 text-center sm:text-left z-30 border-t border-white/5 pb-safe"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                {currentItem.category && (
                  <span className="text-amber-400 font-sans text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
                    {currentItem.category}
                  </span>
                )}
                {currentItem.duration && (
                  <span className="font-mono text-[10px] text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
                    {currentItem.duration}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-2xl font-display text-white tracking-wider uppercase font-semibold">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="text-neutral-300 font-sans text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                  {currentItem.description}
                </p>
              )}
            </div>

            <div className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase shrink-0">
              Swipe down or press Esc to close
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
