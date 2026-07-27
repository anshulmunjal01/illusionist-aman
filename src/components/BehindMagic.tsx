import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, Hammer, BookOpen } from 'lucide-react';

export default function BehindMagic() {
  const preparationLayers = [
    {
      title: 'Psychological Blueprints',
      desc: 'Developing mental patterns and linguistic suggestion structures. Every word choice is calibrated to guide the subconscious of the spectators.',
      icon: BrainCircuit,
    },
    {
      title: 'Bespoke Mechanism Crafting',
      desc: 'Collaborating with luxury artisans to engineer physical apparatuses. Props are manufactured from custom metals, exotic woods, and crystal glass.',
      icon: Hammer,
    },
    {
      title: 'Micro-Muscle Calibration',
      desc: 'Four to six hours of daily manual sleight repetitions. Refining motion to achieve mathematical precision where physics appears to break.',
      icon: BookOpen,
    },
  ];

  return (
    <section id="behind-the-magic" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Background radial gradient */}
      <div className="absolute right-0 bottom-1/4 w-[450px] h-[450px] rounded-full bg-[#A77A2A]/10 dark:bg-amber-500/[0.008] blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Creative narrative and preparation cards */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
          {/* Header */}
          <div className="mb-8">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A77A2A] dark:text-amber-500" />
              The Mechanical Horizon
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
              Behind the Magic
            </h2>
            <p className="font-sans text-sm md:text-base text-[#2F2F2F] dark:text-neutral-400 mt-4 leading-relaxed max-w-2xl font-normal">
              True illusion is not spontaneous. It is a calculated construction. Behind every five-minute theatrical performance lies a sprawling blueprint of engineering, neuro-linguistic programming, and tireless physical practice.
            </p>
          </div>

          {/* Rehearsal Layers bento grid items */}
          <div className="space-y-6 mt-10">
            {preparationLayers.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#FFFFFF] dark:bg-white/[0.01] border border-[#DDD4C7] dark:border-white/5 shadow-sm"
              >
                <div className="p-3 bg-[#A77A2A]/15 dark:bg-amber-400/5 text-[#A77A2A] dark:text-amber-400 rounded-lg shrink-0">
                  <layer.icon className="w-5 h-5 text-[#A77A2A]" />
                </div>
                <div>
                  <h4 className="font-display text-xs md:text-sm tracking-widest uppercase text-[#111111] dark:text-white font-semibold">
                    {layer.title}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-[#2F2F2F] dark:text-neutral-400 mt-2.5 leading-relaxed font-normal">
                    {layer.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual illustration of props layouts */}
        <div className="lg:col-span-5 relative order-1 lg:order-2 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2 }}
            className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-[#DDD4C7] dark:border-white/5 shadow-md bg-[#FFFFFF]"
          >
            <img
              src="https://lh3.googleusercontent.com/d/1vM5mHXICFpnS1zUd5-lcEMLEUZ-SLr8t"
              alt="Magician Aman Portrait"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://drive.google.com/thumbnail?id=1vM5mHXICFpnS1zUd5-lcEMLEUZ-SLr8t&sz=w1200';
              }}
              className="w-full h-full object-cover transition-all duration-1000 ease-out hover:scale-105"
            />
            {/* Soft dark vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Backstage labels layout */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1.5 pointer-events-none">
              <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest">
                Rehearsal Ledger
              </span>
              <p className="font-display text-sm md:text-base text-white uppercase tracking-wider">
                Sleight Mechanics Session #1404
              </p>
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                Micro-Camera Capture • Geneva Workshop
              </span>
            </div>
          </motion.div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#707070] dark:text-neutral-400 mt-6 text-center">
            The Magician’s Table • Raw preparation • 4:00 AM
          </p>
        </div>

      </div>
    </section>
  );
}
