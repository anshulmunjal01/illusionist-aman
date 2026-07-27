import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data';
import { Phone, Mail, MessageSquare, Instagram, Facebook, Calendar, ShieldAlert } from 'lucide-react';
import BookingForm from './BookingForm';

export default function ContactSection() {
  const contactCards = [
    {
      title: 'Direct Hotline',
      value: CONTACT_INFO.phoneDisplay,
      subtitle: 'Voice & Booking Management',
      href: `tel:${CONTACT_INFO.phone}`,
      icon: Phone,
      color: 'bg-amber-400/10 text-amber-500',
    },
    {
      title: 'Secure Electronic Mail',
      value: CONTACT_INFO.email,
      subtitle: 'Corporate Riders & Proposals',
      href: `mailto:${CONTACT_INFO.email}`,
      icon: Mail,
      color: 'bg-purple-400/10 text-purple-400',
    },
    {
      title: 'WhatsApp Concierge',
      value: 'Instant Text Sync',
      subtitle: '24/7 Response Hotline',
      href: CONTACT_INFO.whatsapp,
      icon: MessageSquare,
      color: 'bg-emerald-400/10 text-emerald-400',
    },
  ];

  const socialLinks = [
    { name: 'Instagram', href: CONTACT_INFO.instagram, icon: Instagram, username: '@magician_aman' },
    { name: 'Facebook', href: CONTACT_INFO.facebook, icon: Facebook, username: 'Aman Munjal' },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden z-10 border-t border-[#DDD4C7] dark:border-amber-400/[0.05]">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#A77A2A]/10 dark:bg-purple-950/[0.015] blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#555555] dark:text-amber-400 font-bold flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 text-[#A77A2A] dark:text-amber-500" />
          Secure Alignment
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#111111] dark:text-white mt-3 font-semibold">
          Schedule A Performance
        </h2>
        <p className="font-sans text-sm text-[#2F2F2F] dark:text-neutral-400 mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
          Contact our private booking desk directly. We accommodate corporate galas, exclusive yachts, high-end wedding receptions, and stadium tours.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Direct Action Contacts & Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <BookingForm />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {contactCards.map((card, idx) => (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.icon === MessageSquare ? '_blank' : undefined}
                rel={card.icon === MessageSquare ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col items-start p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#07070a]/75 border border-[#DDD4C7] dark:border-white/5 shadow-sm hover:shadow-md hover:border-[#A77A2A] transition-all duration-300 cursor-pointer"
              >
                <div className={`p-2.5 rounded-lg ${card.color} shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2`}>
                  <card.icon className="w-4 h-4 fill-current" />
                </div>
                <span className="font-mono text-[9px] text-[#707070] dark:text-neutral-400 uppercase tracking-widest block font-semibold">
                  {card.subtitle}
                </span>
                <h4 className="font-display text-xs tracking-wider uppercase text-[#111111] dark:text-white font-semibold group-hover:text-[#A77A2A] dark:group-hover:text-amber-400 transition-colors mt-0.5">
                  {card.title}
                </h4>
                <p className="font-sans text-xs text-[#111111] dark:text-neutral-300 font-bold truncate mt-1 w-full">
                  {card.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Social Channels & Notice Board */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#07070a]/75 border border-[#DDD4C7] dark:border-white/5 shadow-sm">
          
          {/* Socials group */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-[#111111] dark:text-amber-200 mb-6 font-semibold">
              Social Channels
            </h4>

            <div className="space-y-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[#2F2F2F] dark:text-neutral-400 hover:text-[#A77A2A] dark:hover:text-amber-400 transition-colors cursor-pointer group"
                >
                  <div className="p-2.5 rounded-lg bg-[#EFE7DA] dark:bg-white/[0.02] border border-[#DDD4C7] dark:border-white/5 text-[#A77A2A] shrink-0 group-hover:scale-105 transition-transform">
                    <social.icon className="w-5 h-5 text-[#A77A2A]" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#707070] dark:text-neutral-400 uppercase tracking-widest block font-medium">
                      {social.name}
                    </span>
                    <span className="font-sans text-xs md:text-sm font-bold tracking-wider text-[#111111] dark:text-neutral-200">
                      {social.username}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Secure Rider Note */}
          <div className="mt-8 border-t border-[#DDD4C7] dark:border-white/5 pt-6 flex items-start gap-3 text-[#2F2F2F] dark:text-neutral-400">
            <ShieldAlert className="w-5 h-5 text-[#A77A2A] dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[9px] text-[#111111] dark:text-amber-500 uppercase tracking-widest font-bold block mb-1">
                Technical Security Notice:
              </span>
              <p className="font-sans text-[11px] text-[#2F2F2F] dark:text-neutral-400 leading-relaxed font-normal">
                All booking contracts are executed under formal non-disclosure covenants if requested. Complete technical specifications (riders) are dispatched immediately upon contract execution.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
