import { Sparkles, Play } from 'lucide-react';
import { useMedia } from '../MediaContext';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

export default function Showreel() {
  const { videoItems, openViewer } = useMedia();
  
  const showreelItem = videoItems[0]; // Primary Showreel

  const handleWatch = () => {
    const items = videoItems.map((v) => ({
      id: v.id,
      type: 'video' as const,
      url: v.videoUrl,
      thumbnail: v.thumbnail,
      title: v.title,
      category: v.category,
      description: v.description,
      duration: v.duration,
    }));
    openViewer(items, 0);
  };

  return (
    <section id="showreel" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Visual Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A77A2A] dark:text-amber-500 animate-pulse" />
          The Cinematographer’s Eye
        </span>
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold break-words">
          Featured Showreel
        </h2>
      </div>

      {/* Interactive Video Box with 3D Tilt */}
      <div className="max-w-5xl mx-auto">
        <TiltCard
          onClick={handleWatch}
          className="relative aspect-[16/9] w-full cursor-pointer group"
        >
          {/* Thumbnail Image */}
          <img
            src={showreelItem.thumbnail}
            alt="Illusionist Aman Showreel"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Ambient Dark Overlay */}
          <div className="absolute inset-0 bg-neutral-950/45 group-hover:bg-neutral-950/35 transition-colors duration-500" />

          {/* Floating Particle Glow effect */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-neutral-950/80 pointer-events-none" />

          {/* Play Button Trigger with Magnetic Attraction */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
            <Magnetic intensity={0.4}>
              <div className="relative">
                {/* Pulsing ring halos */}
                <div className="absolute -inset-4 rounded-full border border-amber-400/30 animate-ping duration-[2.5s] pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-purple-500/10 animate-ping duration-[3.5s] pointer-events-none" />

                {/* Glowing Center Button */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-400 hover:bg-amber-300 rounded-full flex items-center justify-center shadow-[0_0_28px_rgba(245,158,11,0.5)] transition-colors duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-current translate-x-0.5" />
                </div>
              </div>
            </Magnetic>
            <span className="font-display text-[10px] sm:text-xs tracking-[0.25em] text-white uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2">
              Watch Showreel ({showreelItem.duration})
            </span>
          </div>

          {/* Cinematic Subtitles overlay bar */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex items-end justify-between pointer-events-none z-10">
            <div className="max-w-md">
              <span className="font-mono text-[8px] sm:text-[9px] text-amber-400 uppercase tracking-widest block mb-0.5 sm:mb-1">
                Live in Las Vegas & Dubai
              </span>
              <p className="font-display text-xs sm:text-lg text-white uppercase tracking-wider font-light line-clamp-1">
                {showreelItem.title}
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">
                Resolution
              </span>
              <span className="font-mono text-xs text-white font-light">4K UHD • 60 FPS</span>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
