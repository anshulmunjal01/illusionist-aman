import { motion } from 'motion/react';
import { CLIENT_LOGOS } from '../data';

export default function Clients() {
  // Duplicate the client list to create a seamless infinite loop
  const duplicateLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section id="clients" className="relative py-16 bg-[#EFE7DA] dark:bg-black/10 z-10 border-t border-b border-[#DDD4C7] dark:border-amber-400/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Caption */}
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#555555] dark:text-neutral-500 text-center mb-8 font-mono font-bold">
          Trusted by Discerning Global Brands
        </p>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden select-none py-4">
          
          {/* Edge fade gradient mask (Left and Right) */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#EFE7DA] dark:from-[#050508] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#EFE7DA] dark:from-[#050508] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Row */}
          <div className="flex w-max items-center gap-12 sm:gap-20 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {duplicateLogos.map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="font-display text-sm md:text-lg lg:text-xl tracking-[0.25em] text-[#555555] hover:text-[#111111] dark:text-neutral-500 dark:hover:text-amber-400 uppercase font-semibold transition-all duration-300"
              >
                {client.name}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
