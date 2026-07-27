import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMedia } from '../MediaContext';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Sleight of Hand' | 'Stage Illusions' | 'Mentalism' | 'Private VIP' | 'Live Shows'>('All');
  const { galleryItems, openViewer } = useMedia();

  // Retrieve unique categories
  const categories = ['All', 'Sleight of Hand', 'Stage Illusions', 'Mentalism', 'Private VIP', 'Live Shows'] as const;

  // Filter gallery items based on selection
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleOpenPhoto = (itemId: string) => {
    const items = filteredItems.map((g) => ({
      id: g.id,
      type: 'image' as const,
      url: g.url,
      thumbnail: g.url,
      title: g.title,
      category: g.category,
      description: g.description,
    }));
    const index = filteredItems.findIndex((g) => g.id === itemId);
    openViewer(items, index !== -1 ? index : 0);
  };

  return (
    <section id="gallery" className="relative py-24 px-6 bg-[#F6F2EA] dark:bg-[#040407] z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Decorative radial gradients */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-[#A77A2A]/10 dark:bg-purple-950/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#7F5A1F]/10 dark:bg-amber-950/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center justify-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#A77A2A] dark:text-amber-500" />
            Pictorial Mysteries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
            Performance Gallery
          </h2>
          <p className="font-sans text-sm text-[#2F2F2F] dark:text-neutral-400 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
            Captured moments of real-time suspension, focus, and wonder. Untouched photography detailing the raw reaction of belief dissolving.
          </p>
        </div>

        {/* Filter Navigation Tabs with Magnetic touch */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat) => (
            <Magnetic key={cat} intensity={0.2}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#111111] border-[#111111] text-[#FFFFFF] dark:bg-amber-400 dark:border-amber-400 dark:text-black shadow-md'
                    : 'bg-transparent border-[#A77A2A] text-[#111111] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:bg-transparent dark:border-white/10 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </div>

        {/* Pinterest-style Masonry Layout */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              // Custom height classes based on aspect ratios for true Masonry feel
              const aspectClass = item.aspectRatio === 'portrait'
                ? 'aspect-[3/4]'
                : item.aspectRatio === 'square'
                ? 'aspect-square'
                : 'aspect-[16/10]';

              return (
                <motion.div
                  key={item.id}
                  layout
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${item.title}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleOpenPhoto(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenPhoto(item.id);
                    }
                  }}
                  className="break-inside-avoid relative w-full group cursor-pointer rounded-2xl overflow-hidden focus-visible:ring-2 focus-visible:ring-[#C9A35A] focus-visible:outline-none"
                >
                  <TiltCard className="w-full">
                    <div className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl`}>
                      <img
                        src={item.url}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 active:scale-105"
                      />

                      {/* Ambient Glow Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Metadata Content */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <span className="text-amber-400 font-mono text-[9px] uppercase tracking-widest block mb-1 font-bold">
                          {item.category}
                        </span>
                        <h3 className="text-white font-display text-sm sm:text-base tracking-wider uppercase font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-neutral-200 font-sans text-xs mt-1 line-clamp-2 leading-relaxed font-normal">
                          {item.description}
                        </p>
                        
                        {/* Expansion icon */}
                        <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5 text-amber-200" />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
