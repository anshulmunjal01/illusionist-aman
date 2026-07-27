import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Allow smooth cinematic exit
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="intro-loader-overlay"
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-[#030305] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Volumetric Spotlight Beam descending from top center */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.4, 0.25], scaleY: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[80vh] origin-top bg-gradient-to-b from-amber-200/15 via-amber-400/[0.04] to-transparent blur-3xl pointer-events-none"
          />

          {/* Moonlight Ray in background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/[0.02] blur-[150px] pointer-events-none" />

          {/* Floating microscopic dust motes inside spotlight */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(18)].map((_, idx) => (
              <motion.div
                key={`mote-${idx}`}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * 400 + 100,
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [null, Math.random() * -60 - 20],
                  x: [null, (Math.random() - 0.5) * 40],
                  opacity: [0, Math.random() * 0.4 + 0.1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 1.5,
                }}
                className="absolute w-1 h-1 rounded-full bg-amber-200/60 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
              />
            ))}
          </div>

          {/* Main Cinematic Title Emergence */}
          <div className="relative flex flex-col items-center justify-center text-center px-6">
            
            {/* Subtle Gold Emblem Hairline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.6 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8"
            />

            {/* Glowing Brand Name Emergence through Fog */}
            <div className="overflow-hidden py-2 px-4">
              <motion.h1
                initial={{ y: 50, opacity: 0, filter: 'blur(12px)', letterSpacing: '0.2em' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', letterSpacing: '0.4em' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-display text-2xl sm:text-3xl md:text-5xl tracking-[0.4em] text-neutral-100 font-extralight uppercase text-center drop-shadow-[0_4px_24px_rgba(212,175,55,0.2)]"
              >
                Illusionist Aman
              </motion.h1>
            </div>

            {/* Subtitle whisper */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-neutral-400 uppercase mt-4 font-light"
            >
              Where Certainty Dissolves
            </motion.p>
          </div>

          {/* Glass edge reflections in corners */}
          <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-amber-400/10 pointer-events-none" />
          <div className="absolute top-10 right-10 w-16 h-16 border-t border-r border-amber-400/10 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-16 h-16 border-b border-l border-amber-400/10 pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-amber-400/10 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
