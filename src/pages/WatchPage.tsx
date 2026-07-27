import React, { useEffect, useRef, useState, useCallback, TouchEvent } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useMedia } from '../MediaContext';
import {
  ArrowLeft,
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  PictureInPicture2,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  Clapperboard,
  Sparkles,
  Info
} from 'lucide-react';

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { videoItems } = useMedia();

  // Identify current video item
  const currentIdx = videoItems.findIndex((v) => v.id === id);
  const video = currentIdx !== -1 ? videoItems[currentIdx] : videoItems[0];

  // Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPipSupported, setIsPipSupported] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  // Touch Swipe gestures state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Determine prev and next videos
  const prevIdx = (currentIdx - 1 + videoItems.length) % videoItems.length;
  const nextIdx = (currentIdx + 1) % videoItems.length;
  const prevVideo = videoItems[prevIdx];
  const nextVideo = videoItems[nextIdx];

  // Update Page Title
  useEffect(() => {
    if (video) {
      document.title = `${video.title} | Illusionist Aman - Performance Player`;
    }
    return () => {
      document.title = 'Illusionist Aman - Stage Magic & Illusions';
    };
  }, [video]);

  // Clean Navigation Back logic - Returns to exact previous page and preserves scroll position
  const handleBack = useCallback(() => {
    // Safely stop video first
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.load();
    }
    setIsPlaying(false);

    // If navigated from within the app, navigate(-1) will return to exact previous route & scroll position
    if (window.history.length > 1 && location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/videos');
    }
  }, [navigate, location.key]);

  // Handle Video Disposing & Memory Cleanup on Unmount or Video Change
  useEffect(() => {
    const el = videoRef.current;
    setIsPlaying(true);
    setCurrentTime(0);

    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }

    return () => {
      if (el) {
        el.pause();
        el.removeAttribute('src');
        el.load();
      }
    };
  }, [id]);

  // Check Picture in Picture support
  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setIsPipSupported(Boolean(document.pictureInPictureEnabled));
    }
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape -> Go Back
      if (e.key === 'Escape') {
        e.preventDefault();
        handleBack();
        return;
      }
      // Left Arrow -> Previous Video
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(`/watch/${prevVideo.id}`);
        return;
      }
      // Right Arrow -> Next Video
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(`/watch/${nextVideo.id}`);
        return;
      }

      // Space -> Toggle Play/Pause
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
        return;
      }

      // M -> Toggle Mute
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
        return;
      }

      // F -> Toggle Fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, navigate, prevVideo.id, nextVideo.id]);

  // Video Time Updates
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
    const el = containerRef.current;
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
      console.error('Picture-in-picture error:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${video.title} | Illusionist Aman`,
      text: video.description || 'Watch this performance by Illusionist Aman',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy URL:', err);
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

    // Horizontal swipe
    if (Math.abs(diffX) > 70 && Math.abs(diffY) < 50) {
      if (diffX > 0) {
        // Swipe Left -> Next
        navigate(`/watch/${nextVideo.id}`);
      } else {
        // Swipe Right -> Prev
        navigate(`/watch/${prevVideo.id}`);
      }
    } else if (diffY < -120 && Math.abs(diffX) < 80) {
      // Swipe Down -> Back
      handleBack();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '0:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isYouTube = video?.videoUrl?.includes('youtube.com') || video?.videoUrl?.includes('youtu.be');

  if (!video) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] bg-[#030305] text-white flex flex-col justify-between overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Header Bar with Back Button, Counter, & Action Controls */}
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

        {/* Video Index Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest bg-amber-400/10 border border-amber-400/25 px-3 py-1 rounded-full uppercase">
            {currentIdx + 1} / {videoItems.length}
          </span>
          {video.category && (
            <span className="hidden md:inline-block font-sans text-xs text-neutral-300 uppercase tracking-widest font-medium">
              {video.category}
            </span>
          )}
        </div>

        {/* Action Controls: Share, Info Toggle, Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleShare}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-colors cursor-pointer flex items-center justify-center relative"
            title="Share Video Link"
            aria-label="Share video"
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
            title="Close Watch Page (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Main Stage Video Canvas */}
      <main className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Previous Video Arrow */}
        <button
          onClick={() => navigate(`/watch/${prevVideo.id}`)}
          className="absolute left-2 sm:left-6 p-3 sm:p-4 bg-black/60 hover:bg-amber-400 hover:text-black border border-white/15 text-white rounded-full transition-all duration-300 cursor-pointer z-30 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl group"
          title={`Previous: ${prevVideo.title}`}
          aria-label="Previous Video"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Next Video Arrow */}
        <button
          onClick={() => navigate(`/watch/${nextVideo.id}`)}
          className="absolute right-2 sm:right-6 p-3 sm:p-4 bg-black/60 hover:bg-amber-400 hover:text-black border border-white/15 text-white rounded-full transition-all duration-300 cursor-pointer z-30 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl group"
          title={`Next: ${nextVideo.title}`}
          aria-label="Next Video"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Video Player Display Box */}
        <div className="relative w-full max-w-5xl aspect-[16/9] max-h-[75vh] rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.9)] bg-black flex flex-col group/player">
          {isYouTube ? (
            <iframe
              src={`${video.videoUrl}?autoplay=1&mute=0&modestbranding=1&rel=0&showinfo=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnail}
                autoPlay
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Custom Controls Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 opacity-100 sm:opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 flex flex-col gap-2.5 z-20">
                {/* Progress Bar */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/25 accent-amber-400 rounded-lg appearance-none cursor-pointer hover:h-2.5 transition-all"
                  aria-label="Seek Video"
                />

                {/* Control Buttons & Indicators */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
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
                      aria-label="Replay"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Volume Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                        title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-red-400" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-16 h-1 bg-white/30 accent-amber-400 rounded appearance-none cursor-pointer hidden sm:block"
                        aria-label="Volume slider"
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
                        aria-label="Picture in Picture"
                      >
                        <PictureInPicture2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Fullscreen (F)"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 3. Bottom Information & Captions Panel */}
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
                    <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                    {video.category || 'Performance'}
                  </span>
                  {video.duration && (
                    <span className="font-mono text-[10px] text-neutral-300 bg-white/10 px-2 py-0.5 rounded font-medium">
                      {video.duration}
                    </span>
                  )}
                </div>
                <h1 className="text-base sm:text-2xl font-display text-white tracking-wider uppercase font-semibold">
                  {video.title}
                </h1>
                {video.description && (
                  <p className="text-neutral-300 font-sans text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed font-normal">
                    {video.description}
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
