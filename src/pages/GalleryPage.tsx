import GallerySection from '../components/GallerySection';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export default function GalleryPage() {
  return (
    <div className="w-full pb-16">
      <Breadcrumbs />

      {/* Header Banner */}
      <section className="relative px-6 py-8 text-center max-w-5xl mx-auto border-b border-[#DDD4C7] dark:border-white/5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A77A2A]/15 border border-[#A77A2A]/30 text-[#111111] dark:text-amber-400 text-xs tracking-widest uppercase font-bold mb-4"
        >
          <Camera className="w-3.5 h-3.5 text-[#A77A2A] dark:text-amber-400" />
          <span>Visual Imagery Vault</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase text-[#111111] dark:text-amber-100 font-semibold"
        >
          Photography Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-[#2F2F2F] dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
        >
          High-definition visual capture of stage umbrella productions, flame wallet transpositions, celebrity encounters, and card mechanics.
        </motion.p>
      </section>

      {/* Main Masonry Gallery */}
      <GallerySection />
    </div>
  );
}
