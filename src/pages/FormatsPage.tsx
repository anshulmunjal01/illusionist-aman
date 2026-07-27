import Categories from '../components/Categories';
import Showreel from '../components/Showreel';
import Clients from '../components/Clients';
import Breadcrumbs from '../components/Breadcrumbs';
import { WHY_CHOOSE_ITEMS } from '../data';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Eye, Users, Sliders } from 'lucide-react';

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  Eye: Eye,
  Users: Users,
  Sliders: Sliders,
};

export default function FormatsPage() {
  return (
    <div className="w-full pb-16">
      <Breadcrumbs />

      {/* Header Banner */}
      <section className="relative px-6 py-8 text-center max-w-5xl mx-auto border-b border-[#DDD4C7] dark:border-white/5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A77A2A]/15 border border-[#A77A2A]/30 text-[#111111] dark:text-amber-400 text-xs tracking-widest uppercase font-bold mb-4"
        >
          <Layers className="w-3.5 h-3.5 text-[#A77A2A] dark:text-amber-400" />
          <span>Performance Formats</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase text-[#111111] dark:text-amber-100 font-semibold"
        >
          Curated Showcases
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm md:text-base text-[#2F2F2F] dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
        >
          Discover tailored show concepts designed for Corporate Galas, Luxury Receptions, Theater Auditoriums, and Intimate VIP Soirées.
        </motion.p>
      </section>

      {/* Main Categories Cards */}
      <Categories />

      {/* Master Showreel Player */}
      <Showreel />

      {/* Why Choose Aman Feature Grid */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto border-t border-[#DDD4C7] dark:border-white/5">
        <div className="text-center mb-12">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold">
            Bespoke Distinction
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase text-[#111111] dark:text-white mt-2 font-semibold">
            Why Event Producers Choose Aman
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const IconComponent = (ICON_MAP as any)[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-white/[0.015] border border-[#DDD4C7] dark:border-white/5 shadow-md dark:shadow-none"
              >
                <div className="p-3 w-fit rounded-xl bg-[#A77A2A]/10 border border-[#A77A2A]/20 text-[#A77A2A] mb-4">
                  <IconComponent className="w-5 h-5 text-[#A77A2A]" />
                </div>
                <h3 className="font-display text-sm tracking-wider uppercase text-[#111111] dark:text-amber-200 mb-2 font-semibold">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#2F2F2F] dark:text-neutral-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Corporate & Celebrity Client Roster */}
      <Clients />
    </div>
  );
}
