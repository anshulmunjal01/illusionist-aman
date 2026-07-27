import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const currentItem = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 px-6 max-w-5xl mx-auto overflow-hidden z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Background ambient radial lights */}
      <div className="absolute right-10 top-10 w-[300px] h-[300px] rounded-full bg-[#A77A2A]/10 dark:bg-amber-500/[0.01] blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A77A2A] dark:text-amber-500" />
          Testaments of Belief
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
          Client Testimonials
        </h2>
      </div>

      {/* Testimonial Active Display Area */}
      <div className="relative min-h-[350px] md:min-h-[280px] flex items-center justify-center">
        
        {/* Giant luxury quote emblem in the background */}
        <Quote className="absolute -top-10 left-6 md:left-20 w-32 h-32 text-[#DDD4C7]/50 dark:text-neutral-850/10 pointer-events-none -z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl p-8 md:p-10 rounded-2xl bg-[#FFFFFF] dark:bg-[#07070a]/75 border border-[#DDD4C7] dark:border-white/5 backdrop-blur-md shadow-sm dark:shadow-lg"
          >
            {/* Rating Stars Row */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(currentItem.rating)].map((_, i) => (
                <Star key={`testimonial-star-${currentItem.id}-${i}`} className="w-4 h-4 fill-current text-[#A77A2A] dark:text-amber-400" />
              ))}
            </div>

            {/* Quote Body text */}
            <blockquote className="font-sans text-base sm:text-lg lg:text-xl text-[#2F2F2F] dark:text-neutral-200 leading-relaxed italic mb-8 font-normal">
              "{currentItem.text}"
            </blockquote>

            {/* Author details block */}
            <div className="flex items-center gap-4 border-t border-[#DDD4C7] dark:border-white/5 pt-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#A77A2A]/15 border border-[#A77A2A]/30 text-[#A77A2A] dark:text-amber-400 font-display text-sm font-bold shrink-0">
                {currentItem.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-display text-sm tracking-wider uppercase text-[#111111] dark:text-white font-semibold">
                  {currentItem.name}
                </h4>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigational controls footer */}
      <div className="flex items-center justify-between mt-10 max-w-4xl mx-auto px-2">
        {/* Slides Index Dots */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-[#111111] dark:bg-amber-400' : 'w-2 bg-[#DDD4C7] dark:bg-white/10 hover:bg-[#A77A2A]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Previous / Next buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-[#FFFFFF] dark:bg-transparent border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white hover:border-[#A77A2A] dark:hover:border-amber-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm dark:shadow-none"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-[#FFFFFF] dark:bg-transparent border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white hover:border-[#A77A2A] dark:hover:border-amber-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm dark:shadow-none"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
