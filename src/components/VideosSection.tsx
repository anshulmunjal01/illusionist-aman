import { motion } from 'motion/react';
import { useMedia } from '../MediaContext';
import { Play, Clapperboard, Eye } from 'lucide-react';

export default function VideosSection() {
  const { videoItems, openViewer } = useMedia();

  const performanceVideos = videoItems.filter((v) => v.id !== 'vid-showreel');

  const handleVideoClick = (videoId: string) => {
    const items = performanceVideos.map((v) => ({
      id: v.id,
      type: 'video' as const,
      url: v.videoUrl,
      thumbnail: v.thumbnail,
      title: v.title,
      category: v.category,
      description: v.description,
      duration: v.duration,
    }));
    const index = performanceVideos.findIndex((v) => v.id === videoId);
    openViewer(items, index !== -1 ? index : 0);
  };

  return (
    <section id="videos" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden z-10 border-t border-[#E8E0D5] dark:border-amber-400/[0.05]">
      {/* Background Decorative glow */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] rounded-full bg-[#C8A86B]/10 dark:bg-purple-500/[0.01] blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#5A5A5A] dark:text-amber-400 font-bold flex items-center justify-center gap-2">
          <Clapperboard className="w-4 h-4 text-[#C9A35A] dark:text-amber-500" />
          The Illusion In Motion
        </span>
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#161616] dark:text-white mt-3 font-semibold break-words">
          Performance Recordings
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#3A3A3A] dark:text-neutral-400 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
          Witness illusions captured live under direct observation. Absolute transparency, no edits, no post-production effects.
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {performanceVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            role="button"
            tabIndex={0}
            aria-label={`Play performance video: ${video.title}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            onClick={() => handleVideoClick(video.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleVideoClick(video.id);
              }
            }}
            className="video-card relative group rounded-2xl overflow-hidden bg-[#FFFCF8] dark:bg-[#07070a] border border-[#E8E0D5] dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#C9A35A] focus-visible:outline-none"
          >
            {/* Hover borders */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A35A]/50 rounded-2xl transition-all duration-500 pointer-events-none z-10" />

            <div>
              {/* Thumbnail Stage */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent pointer-events-none" />

                {/* Floating Play Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-[#111111] dark:bg-amber-400 text-[#FFFFFF] dark:text-black rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md font-mono text-[10px] text-white tracking-wider">
                  {video.duration}
                </span>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#111111]/85 dark:bg-black/65 backdrop-blur-md font-sans text-[10px] text-[#FFFFFF] dark:text-amber-300 tracking-widest uppercase font-semibold">
                  {video.category}
                </span>
              </div>

              {/* Text Meta Container */}
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-sm md:text-base tracking-wider text-[#161616] dark:text-white uppercase line-clamp-1 group-hover:text-[#C9A35A] dark:group-hover:text-amber-400 transition-colors font-semibold">
                  {video.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#3A3A3A] dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed font-normal">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Micro Details Row */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-[#E8E0D5] dark:border-white/5 flex items-center justify-between text-[#5A5A5A] dark:text-neutral-500">
              <span className="font-sans text-[10px] uppercase tracking-widest font-mono font-semibold">Aesthetic Capture</span>
              <span className="flex items-center gap-1 font-sans text-xs text-[#161616] dark:text-amber-400 font-bold">
                <Eye className="w-3.5 h-3.5 text-[#C9A35A]" />
                Inspect Performance
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
