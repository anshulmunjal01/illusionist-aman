import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const [showSparkles, setShowSparkles] = useState(false);

  const handleToggle = () => {
    toggleTheme();
    // Fire a quick particle burst
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 900);
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={handleToggle}
      className="relative p-2.5 rounded-full border border-[#E8E0D5] hover:border-[#D7C19C] dark:border-amber-400/30 bg-[#FFFCF7] dark:bg-white/5 backdrop-blur-md text-[#2E2E2E] dark:text-amber-400 hover:text-[#C8A86B] dark:hover:text-amber-300 transition-colors focus:outline-none cursor-pointer z-50 overflow-hidden shadow-sm dark:shadow-none"
      aria-label="Toggle celestial alignment"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -40 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-purple-300"
            >
              <Moon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: 40 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-[#A87B3B]"
            >
              <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(200,168,107,0.4)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small sparkling background particles inside switch */}
        {showSparkles && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 text-amber-300 absolute animate-ping" />
          </motion.div>
        )}
      </div>

      {/* Floating stardust ring animation surrounding button */}
      <AnimatePresence>
        {showSparkles && (
          <motion.div
            key="theme-sparkles-container"
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(6)].map((_, idx) => {
              const angle = (idx * Math.PI * 2) / 6;
              const x = Math.cos(angle) * 24;
              const y = Math.sin(angle) * 24;
              return (
                <motion.span
                  key={`theme-sparkle-${idx}`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                  animate={{ x, y, opacity: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full pointer-events-none"
                  style={{
                    top: '45%',
                    left: '45%',
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
