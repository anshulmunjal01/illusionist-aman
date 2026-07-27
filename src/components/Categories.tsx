import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../data';
import TiltCard from './TiltCard';

// Helper to resolve icon components dynamically
const IconWrapper = ({ name, className }: { name: string; className: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Sparkles;
  return <IconComponent className={className} />;
};

export default function Categories() {
  return (
    <section id="categories" className="relative py-24 px-6 bg-[#EFE7DA] dark:bg-black/20 z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Decorative center light ray glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#A77A2A]/10 dark:bg-amber-500/[0.015] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold">
            Tailored Experiences
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
            Performance Formats
          </h2>
          <p className="font-sans text-sm md:text-base text-[#2F2F2F] dark:text-neutral-400 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
            Every showcase is an architectural event, customized to synchronize with the scale of the environment and the intellectual curiosity of the audience.
          </p>
        </div>

        {/* Categories Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            >
              <TiltCard className="p-8 h-full flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#08080d]">
                <div>
                  {/* Header Row: Icon and Title */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-[#A77A2A]/15 dark:bg-amber-400/5 text-[#A77A2A] dark:text-amber-400 border border-[#A77A2A]/30 dark:border-amber-400/20">
                      <IconWrapper name={cat.icon} className="w-6 h-6 text-[#A77A2A]" />
                    </div>
                    <span className="font-mono text-[10px] text-[#555555] dark:text-neutral-400 uppercase tracking-widest font-bold">
                      Format 0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl tracking-wider uppercase text-[#111111] dark:text-amber-100 mb-3 font-semibold">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm md:text-base text-[#2F2F2F] dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>

                  {/* Custom Highlights Lists */}
                  <ul className="space-y-2 border-t border-[#E7DED0] dark:border-white/5 pt-4 mb-6">
                    {cat.highlightDetails.map((detail, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs md:text-sm text-[#2F2F2F] dark:text-neutral-400 font-normal">
                        <Icons.Check className="w-3.5 h-3.5 text-[#A77A2A] dark:text-amber-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unique Example Illusion Showcase */}
                <div className="bg-[#EFE7DA] dark:bg-white/[0.02] rounded-xl p-4 border border-[#DDD4C7] dark:border-white/5 mt-auto">
                  <span className="font-sans text-[10px] text-[#1D1D1D] dark:text-amber-400 uppercase tracking-widest font-bold block mb-1">
                    Signature Illusion Sample:
                  </span>
                  <p className="font-sans text-xs italic text-[#2F2F2F] dark:text-neutral-400 font-normal">
                    {cat.exampleIllusion}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Custom Small Showcase Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 border-t border-[#DDD4C7] dark:border-white/5 pt-12">
          {[
            {
              title: 'Private Yacht Events',
              desc: 'High-end parlor sleight of hand in dynamic maritime spaces.',
            },
            {
              title: 'Exclusive Birthdays',
              desc: 'Interactive prestige magic that transforms key family milestones.',
            },
            {
              title: 'Diplomatic Gatherings',
              desc: 'Impeccable, culturally respectful mentalism for international delegations.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-white/[0.01] border border-[#DDD4C7] dark:border-white/[0.02] text-center shadow-sm dark:shadow-none"
            >
              <h4 className="font-display text-xs sm:text-sm tracking-widest uppercase text-[#111111] dark:text-amber-200 font-bold">
                {item.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#2F2F2F] dark:text-neutral-400 mt-2 font-normal leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
