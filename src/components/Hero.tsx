import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Play, ChevronDown } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import Magnetic from './Magnetic';

interface HeroProps {
  onWatchShowreel: () => void;
  theme: 'dark' | 'light';
}

const ROTATING_ROLES = [
  'Western-Style Stage Illusionist',
  'Interactive Mentalist & Mind Reader',
  'Elite Parlor & Gala Performer',
  'Master of Interactive Perception',
  'Architect of Impossible Moments',
];

export default function Hero({ onWatchShowreel, theme }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const navigate = useNavigate();

  // Rotate roles with slow, luxurious timing
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full flex flex-col justify-between items-center px-6 py-24 overflow-hidden z-10"
    >
      {/* Background Volumetric Theatre Light & Fog */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#A77A2A]/[0.05] dark:bg-amber-400/[0.025] blur-[160px]" />
        <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-[#A77A2A]/[0.03] blur-[140px]" />
        {/* Soft Radial Contrast Veil behind hero text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,252,248,0.85)_0%,rgba(248,246,242,0.2)_70%)] dark:bg-transparent pointer-events-none" />
      </div>

      {/* Velvet Theatre Frame Border */}
      <div className="absolute inset-6 md:inset-10 border border-[#DDD4C7] dark:border-white/5 pointer-events-none z-0" />

      {/* Structural Spacing */}
      <div className="h-6" />

      {/* Main Center Title Section */}
      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center justify-center z-10 flex-1">
        
        {/* Subtle Gold Architectural Hairline Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 opacity-75"
        >
          <div className="w-16 h-16 rounded-full border border-[#A77A2A]/50 flex items-center justify-center p-3 relative bg-[#A77A2A]/[0.05]">
            <div className="w-full h-full border border-[#A77A2A]/30 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A77A2A] shadow-[0_0_8px_#A77A2A]" />
            </div>
          </div>
        </motion.div>

        {/* Primary Monolithic Title */}
        <div className="relative overflow-hidden mb-6 select-none max-w-full px-2">
          <motion.h1
            initial={{ y: 90, opacity: 0, filter: 'blur(12px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(1.65rem,6.5vw,5rem)] tracking-[0.12em] sm:tracking-[0.22em] md:tracking-[0.35em] text-[#111111] dark:text-amber-100 uppercase font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)] leading-tight max-w-full break-words"
          >
            Illusionist Aman
          </motion.h1>
        </div>

        {/* Rotating Roles Carousel */}
        <div className="h-8 md:h-10 overflow-hidden mb-8 sm:mb-12 flex items-center justify-center px-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 0.95, filter: 'blur(0px)' }}
              exit={{ y: -24, opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[11px] sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.3em] text-[#1D1D1D] dark:text-amber-300 uppercase font-medium text-center"
            >
              {ROTATING_ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Luxury Action Callouts with Magnetic physics */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none justify-center"
        >
          {/* Direct Reserve CTA - Primary Button */}
          <Magnetic intensity={0.25}>
            <a
              id="hero-call-cta"
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full sm:w-56 max-w-[280px] py-3.5 sm:py-4 px-6 sm:px-8 rounded-full font-sans text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold bg-[#111111] text-[#FFFFFF] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300 shadow-[0_4px_20px_rgba(17,17,17,0.15)] hover:shadow-[0_8px_28px_rgba(167,122,42,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-[#111111] hover:border-[#A77A2A]"
            >
              <Phone className="w-3.5 h-3.5 fill-current text-[#FFFFFF] dark:text-black shrink-0" />
              <span className="whitespace-nowrap">Inquire & Reserve</span>
            </a>
          </Magnetic>

          {/* Watch Showreel trigger - Secondary Button */}
          <Magnetic intensity={0.25}>
            <button
              id="hero-showreel-cta"
              onClick={onWatchShowreel}
              className="w-full sm:w-56 max-w-[280px] py-3.5 sm:py-4 px-6 sm:px-8 rounded-full font-sans text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold text-[#111111] hover:bg-[#EFE7DA] dark:text-amber-100 bg-transparent border border-[#A77A2A] dark:bg-white/[0.03] dark:border-white/10 dark:hover:border-amber-400/40 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#A77A2A] dark:text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">Showreel Film</span>
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <Magnetic intensity={0.15}>
        <motion.button
          onClick={() => navigate('/about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          className="flex flex-col items-center gap-2.5 cursor-pointer group text-[#5A5A5A] dark:text-neutral-400 mt-8 z-10 focus:outline-none"
        >
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase font-medium text-[#555555] dark:text-neutral-500">
            The Chronicle Below
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#A77A2A] dark:text-amber-400/80" />
          </motion.div>
        </motion.button>
      </Magnetic>
    </section>
  );
}
