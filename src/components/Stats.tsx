import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATISTICS } from '../data';

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
}

function StatCounter({ value, suffix, label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Quadratic ease-out formula
      const easeOutValue = 1 - (1 - progressPercentage) * (1 - progressPercentage);
      setCount(Math.floor(easeOutValue * value));

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Glow highlight */}
      <div className="absolute w-24 h-24 bg-[#A77A2A]/10 blur-xl rounded-full -z-10" />

      {/* Numerical Counter */}
      <span className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-[#111111] dark:text-amber-100 uppercase font-semibold">
        {formatNumber(count)}
        <span className="text-[#A77A2A] dark:text-amber-500 font-sans font-bold text-3xl sm:text-4xl ml-0.5">
          {suffix}
        </span>
      </span>

      {/* Label descriptive */}
      <span className="font-sans text-xs md:text-sm tracking-[0.2em] text-[#2F2F2F] dark:text-neutral-400 uppercase mt-4 block font-bold">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-20 px-6 bg-[#EFE7DA] dark:bg-black/40 z-10 border-t border-b border-[#DDD4C7] dark:border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        
        {/* Bento Board Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {STATISTICS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative"
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
              
              {/* Elegant vertical divider lines */}
              {idx < STATISTICS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-14 bg-[#DDD4C7] dark:bg-white/5" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
