import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft, Layers, Video } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 text-center max-w-4xl mx-auto relative">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A77A2A]/10 dark:bg-amber-400/[0.03] blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A77A2A]/15 border border-[#A77A2A]/30 text-[#111111] dark:text-amber-400 text-xs tracking-widest uppercase font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#A77A2A] dark:text-amber-400" />
          <span>Sleight of Hand Error 404</span>
        </div>

        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl tracking-[0.2em] uppercase text-[#111111] dark:text-amber-100 font-bold">
          404
        </h1>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-[#111111] dark:text-white font-semibold">
            The Vanishing Act
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#2F2F2F] dark:text-neutral-400 leading-relaxed">
            The page or illusion sequence you are attempting to locate has vanished from this realm. Re-orient your trajectory through the primary portals below.
          </p>
        </div>

        {/* Navigation Portals */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#A77A2A] dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300 font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Grand Home</span>
          </button>

          <button
            onClick={() => navigate('/formats')}
            className="px-6 py-3 rounded-full bg-[#EFE7DA] dark:bg-white/10 text-[#111111] dark:text-amber-200 hover:bg-[#E3D8C6] dark:hover:bg-white/20 font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all cursor-pointer border border-[#DDD4C7] dark:border-white/10"
          >
            <Layers className="w-4 h-4 text-[#A77A2A] dark:text-amber-400" />
            <span>Explore Performance Formats</span>
          </button>

          <button
            onClick={() => navigate('/videos')}
            className="px-6 py-3 rounded-full bg-transparent border border-[#A77A2A] dark:border-amber-400/40 text-[#111111] dark:text-neutral-200 hover:bg-[#A77A2A] hover:text-white font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Video className="w-4 h-4 text-[#A77A2A] dark:text-amber-400" />
            <span>Video Vault</span>
          </button>
        </div>

        <div className="pt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-[#555555] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-amber-400 transition-colors font-mono cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Step back to previous location</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
