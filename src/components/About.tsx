import { useState } from 'react';
import { motion } from 'motion/react';
import { TIMELINE_EVENTS } from '../data';
import { Sparkles, Milestone } from 'lucide-react';

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden z-10 border-t border-[#DDD4C7] dark:border-white/[0.03]">
      {/* Background Decorative Element */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-[#A77A2A]/10 dark:bg-purple-500/[0.01] blur-[120px] pointer-events-none" />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Portrait & Luxury Aura */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Pulsing Aura Behind Portrait */}
          <div
            className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-[#A77A2A]/20 via-[#7F5A1F]/15 to-transparent blur-[32px] pointer-events-none transition-all duration-700 ease-out z-0"
            style={{
              opacity: isHovered ? 1 : 0.25,
              scale: isHovered ? 1.08 : 0.96,
            }}
          />

          {/* Portrait Container */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2 }}
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_10px_30px_-5px_rgba(167,122,42,0.08)] dark:shadow-2xl border border-[#DDD4C7] dark:border-white/10 group cursor-crosshair z-10 bg-[#FFFFFF]"
          >
            {/* The Image */}
            <img
              src="https://lh3.googleusercontent.com/d/143nmuRx4yWftTgoIrb7BlV3Vf-dzDraW"
              alt="Portrait of Magician Aman"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://drive.google.com/thumbnail?id=143nmuRx4yWftTgoIrb7BlV3Vf-dzDraW&sz=w1200';
              }}
              className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105"
            />

            {/* Dark glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />

            {/* Subtle light leak shine animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none" />

            {/* Frame Corner Decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#A77A2A] opacity-70" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#A77A2A] opacity-70" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#A77A2A] opacity-70" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#A77A2A] opacity-70" />
          </motion.div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#707070] dark:text-neutral-400 mt-6 text-center z-10">
            Portrait Study • Modern Professional Approach • Chronicle of Magic
          </p>
        </div>

        {/* Right Column: Narrative Story & Timeline */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Section Header */}
          <div className="mb-8">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A77A2A] dark:text-amber-500" />
              The Art of Deception
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
              Reality is an Illusion
            </h2>
          </div>

          {/* Narrative Text */}
          <div className="space-y-6 font-sans text-sm md:text-base text-[#2F2F2F] dark:text-neutral-300 leading-relaxed max-w-2xl font-normal">
            <p>
              I believe magic is not about tricks. It is not about cheap sparkles, card fans, or rabbit-filled top hats. Magic is an emotional language—a deliberate dissolution of certainty. My work begins at the very limit of human perception, where what is known ceases to align with what is experienced.
            </p>
            <p className="border-l-2 border-[#A77A2A] pl-4 italic text-[#111111] dark:text-neutral-200 font-medium">
              “When I perform, I am not asking you to suspend your disbelief. I am inviting you to embrace wonder as a sensory physical coordinate.”
            </p>
            <p>
              For twelve years, I have engineered exclusive mentalism experiences and grand-scale stage illusions for discerning corporate audiences, luxury galas, and VIP clients globally. Trained in Paris under underground sleight-of-hand curators, my routines integrate advanced psychology, optical deception, and cinematic theatrical design.
            </p>
          </div>

          {/* Experience Milestones Timeline */}
          <div className="mt-14 border-t border-[#DDD4C7] dark:border-white/5 pt-10">
            <h3 className="font-display text-lg tracking-widest uppercase text-[#111111] dark:text-amber-200 mb-8 flex items-center gap-2 font-semibold">
              <Milestone className="w-5 h-5 text-[#A77A2A] dark:text-amber-500" />
              Chronological Milestones
            </h3>

            <div className="relative border-l border-[#DDD4C7] dark:border-white/10 pl-6 space-y-10 ml-3">
              {TIMELINE_EVENTS.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#A77A2A] dark:bg-amber-400 border border-[#F6F2EA] dark:border-neutral-950 shadow-[0_0_8px_rgba(167,122,42,0.6)]" />

                  {/* Year Tag */}
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1D1D1D] dark:text-amber-400">
                    {event.year}
                  </span>

                  {/* Milestone Content */}
                  <h4 className="font-display text-sm md:text-base tracking-widest uppercase text-[#111111] dark:text-white mt-1 font-semibold">
                    {event.title}
                  </h4>
                  <p className="font-sans text-xs text-[#555555] dark:text-neutral-400 uppercase tracking-widest mt-0.5 font-medium">
                    {event.subtitle}
                  </p>
                  <p className="font-sans text-xs md:text-sm text-[#2F2F2F] dark:text-neutral-400 mt-2 leading-relaxed font-normal">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
