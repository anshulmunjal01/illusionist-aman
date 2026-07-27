import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, ChevronUp } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface FloatingControlsProps {
  onToggleMediaDesk?: () => void;
}

export default function FloatingControls({ }: FloatingControlsProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3.5 pointer-events-auto">
      <AnimatePresence>
        {/* WhatsApp Button */}
        <motion.a
          id="floating-whatsapp-btn"
          key="floating-ctrl-whatsapp"
          href={CONTACT_INFO.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.3 }}
          className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.5)] border border-emerald-500/20 flex items-center justify-center cursor-pointer relative group"
          aria-label="Direct WhatsApp Booking"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute right-14 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            WhatsApp Booking
          </span>
        </motion.a>

        {/* Call Button */}
        <motion.a
          id="floating-call-btn"
          key="floating-ctrl-call"
          href={`tel:${CONTACT_INFO.phone}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-3.5 bg-amber-500 hover:bg-amber-400 text-black rounded-full shadow-[0_4px_16px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_24px_rgba(245,158,11,0.5)] border border-amber-400/20 flex items-center justify-center cursor-pointer relative group"
          aria-label="Call Now for Booking"
        >
          <Phone className="w-5 h-5 fill-current" />
          <span className="absolute right-14 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Call Live
          </span>
        </motion.a>

        {/* Scroll To Top */}
        {showScroll && (
          <motion.button
            id="floating-scroll-top-btn"
            key="floating-ctrl-scroll"
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 15 }}
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ duration: 0.3 }}
            className="p-3.5 bg-[#FFFFFF] dark:bg-white/10 hover:bg-[#EFE7DA] dark:hover:bg-white/20 text-[#111111] dark:text-amber-200 rounded-full border border-[#DDD4C7] dark:border-white/10 backdrop-blur-md shadow-md flex items-center justify-center cursor-pointer group transition-colors"
            aria-label="Scroll to Pinnacle"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
