import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FaqItemProps {
  key?: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItemRow({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-[#DDD4C7] dark:border-white/5 last:border-none py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 font-display text-sm md:text-base tracking-wider uppercase text-[#111111] dark:text-white hover:text-[#A77A2A] dark:hover:text-amber-400 transition-colors focus:outline-none cursor-pointer group"
      >
        <span className="font-semibold leading-relaxed">{question}</span>
        <span className="p-1.5 rounded-full bg-[#EFE7DA] dark:bg-white/[0.02] border border-[#DDD4C7] dark:border-white/5 text-[#555555] group-hover:text-[#A77A2A] shrink-0">
          <ChevronDown
            className="w-4 h-4 transition-transform duration-500 text-[#A77A2A]"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-row-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-xs md:text-sm text-[#2F2F2F] dark:text-neutral-400 mt-4 leading-relaxed max-w-4xl pl-3 border-l-2 border-[#A77A2A] font-normal">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 px-6 max-w-4xl mx-auto overflow-hidden z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Background radial gradient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#A77A2A]/10 dark:bg-amber-500/[0.015] blur-[100px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#A77A2A] dark:text-amber-500" />
          The Sphere of Inquiry
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordions List Container */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#07070a]/75 border border-[#DDD4C7] dark:border-white/5 shadow-sm">
        {FAQS.map((faq, idx) => (
          <FaqItemRow
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === idx}
            onToggle={() => handleToggle(idx)}
          />
        ))}
      </div>
    </section>
  );
}
