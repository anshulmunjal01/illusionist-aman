import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Corporate Gala',
    customEventType: '',
    eventDate: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState({
    formatName: '',
    mailtoUrl: '',
    emailText: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields (Full Name, Phone Number, and Email).');
      return;
    }

    if (formData.eventType === 'Others' && !formData.customEventType.trim()) {
      setStatus('error');
      setErrorMessage('Please specify your custom showcase or event concept details.');
      return;
    }

    setStatus('submitting');

    const effectiveFormat = formData.eventType === 'Others' 
      ? (formData.customEventType.trim() || 'Custom Showcase Concept') 
      : formData.eventType;

    const subject = `Direct Booking Inquiry: ${effectiveFormat} - ${formData.name}`;
    const rawBody = `DIRECT PERFORMANCE BOOKING INQUIRY
========================================
Client Name: ${formData.name}
Phone Number: ${formData.phone}
Email Address: ${formData.email}
Showcase Format: ${effectiveFormat}
Target Event Date: ${formData.eventDate || 'To Be Finalized'}

Event Details & Requirements:
${formData.message.trim() || 'No additional technical requirements specified.'}

========================================
Sent via Direct Booking Desk
Destination Email: ${CONTACT_INFO.email}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(rawBody);
    const mailtoUri = `mailto:${CONTACT_INFO.email}?subject=${encodedSubject}&body=${encodedBody}`;

    // Dispatch directly to info.kreativecornerz@gmail.com via FormSubmit service
    try {
      await fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          Name: formData.name,
          Phone: formData.phone,
          Email: formData.email,
          'Showcase Format': effectiveFormat,
          'Event Date': formData.eventDate || 'To Be Finalized',
          'Message Details': formData.message.trim() || 'No extra requirements specified',
          _template: 'table',
        }),
      });
    } catch (err) {
      console.log('FormSubmit direct mail dispatch executed with fallback:', err);
    }

    setSubmittedSummary({
      formatName: effectiveFormat,
      mailtoUrl: mailtoUri,
      emailText: rawBody,
    });
    setStatus('success');

    // Launch email application as secondary direct action
    try {
      window.location.href = mailtoUri;
    } catch (err) {
      console.log('Mailto handler executed', err);
    }
  };

  const handleCopy = () => {
    if (!submittedSummary.emailText) return;
    navigator.clipboard.writeText(submittedSummary.emailText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#07070a]/80 p-6 sm:p-8 rounded-2xl border border-[#DDD4C7] dark:border-white/5 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E7DED0] dark:border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A77A2A] dark:text-amber-400" />
          <h3 className="font-display text-lg uppercase tracking-wider text-[#111111] dark:text-white font-semibold">
            Direct Booking Desk Form
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#A77A2A] dark:text-amber-400 bg-[#A77A2A]/10 px-2.5 py-1 rounded-md font-bold">
          Direct to {CONTACT_INFO.email}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="alert"
            aria-live="polite"
            className="p-6 rounded-xl bg-[#F8F5EE] dark:bg-neutral-900/90 border border-[#DDD4C7] dark:border-amber-400/20 text-[#111111] dark:text-neutral-100 text-center space-y-4"
          >
            <CheckCircle2 className="w-12 h-12 text-[#A77A2A] dark:text-amber-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-display text-base uppercase font-semibold text-[#111111] dark:text-amber-200">
                Inquiry Generated for Mail Dispatch
              </h4>
              <p className="font-sans text-xs text-[#2F2F2F] dark:text-neutral-300 leading-relaxed max-w-lg mx-auto">
                Thank you, <strong>{formData.name}</strong>. Your inquiry for <strong>{submittedSummary.formatName}</strong> has been formatted and targeted directly to <span className="font-bold text-[#111111] dark:text-amber-300">{CONTACT_INFO.email}</span>.
              </p>
            </div>

            {/* Email Dispatch Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={submittedSummary.mailtoUrl}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#A77A2A] text-white font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Email App</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#EFE7DA] dark:bg-white/10 hover:bg-[#E3D8C6] dark:hover:bg-white/20 text-[#111111] dark:text-amber-200 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#DDD4C7] dark:border-white/10"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Inquiry Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Inquiry Text</span>
                  </>
                )}
              </button>
            </div>

            <p className="font-mono text-[10px] text-[#555555] dark:text-neutral-400 pt-2">
              Recipient: {CONTACT_INFO.email} | Phone: {CONTACT_INFO.phoneDisplay}
            </p>

            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  eventType: 'Corporate Gala',
                  customEventType: '',
                  eventDate: '',
                  message: '',
                });
              }}
              className="mt-2 text-xs text-[#A77A2A] dark:text-amber-400 underline font-semibold cursor-pointer hover:opacity-80"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            aria-label="Private Performance Booking Form"
            className="space-y-4"
            noValidate
          >
            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-300 text-xs flex items-center gap-2 font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#2F2F2F] dark:text-neutral-300 font-semibold mb-1"
                >
                  Full Name <span className="text-rose-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alexander Wright"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EA] dark:bg-neutral-900/80 border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-white placeholder:text-[#707070] dark:placeholder:text-neutral-400 text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#2F2F2F] dark:text-neutral-300 font-semibold mb-1"
                >
                  Phone Number <span className="text-rose-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  aria-required="true"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98999 79654"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EA] dark:bg-neutral-900/80 border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-white placeholder:text-[#707070] dark:placeholder:text-neutral-400 text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="booking-email"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#2F2F2F] dark:text-neutral-300 font-semibold mb-1"
                >
                  Email Address <span className="text-rose-600" aria-hidden="true">*</span>
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alexander@luxuryevents.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EA] dark:bg-neutral-900/80 border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-white placeholder:text-[#707070] dark:placeholder:text-neutral-400 text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all"
                />
              </div>

              {/* Showcase Format Dropdown */}
              <div>
                <label
                  htmlFor="booking-event-type"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#2F2F2F] dark:text-neutral-300 font-semibold mb-1"
                >
                  Showcase Format
                </label>
                <select
                  id="booking-event-type"
                  name="eventType"
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EA] dark:bg-neutral-900/80 border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all cursor-pointer"
                >
                  <option value="Corporate Gala">Corporate Gala & Award Night</option>
                  <option value="Grand Stage Illusions">Grand Stage Illusions</option>
                  <option value="Mind Reading & Mentalism">Mind Reading & Mentalism</option>
                  <option value="Luxury Wedding Reception">Luxury Wedding Reception</option>
                  <option value="Private Yacht / VIP Soirée">Private Yacht / VIP Soirée</option>
                  <option value="Others">Others / Custom Showcase Concept</option>
                </select>
              </div>
            </div>

            {/* Custom Showcase Specification (When 'Others' is selected) */}
            {formData.eventType === 'Others' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3.5 rounded-xl bg-[#A77A2A]/10 border border-[#A77A2A]/30 space-y-1.5"
              >
                <label
                  htmlFor="booking-custom-event-type"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#111111] dark:text-amber-300 font-semibold"
                >
                  Specify Custom Showcase Concept <span className="text-rose-600">*</span>
                </label>
                <input
                  id="booking-custom-event-type"
                  name="customEventType"
                  type="text"
                  required
                  value={formData.customEventType}
                  onChange={(e) => setFormData({ ...formData, customEventType: e.target.value })}
                  placeholder="e.g. Festival Headliner, Luxury Brand Launch, TV Special..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] dark:bg-neutral-900/90 border border-[#DDD4C7] dark:border-amber-400/20 text-[#111111] dark:text-white placeholder:text-[#707070] dark:placeholder:text-neutral-400 text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all"
                />
              </motion.div>
            )}

            {/* Event Date */}
            <div>
              <label
                htmlFor="booking-date"
                className="block font-mono text-[10px] uppercase tracking-widest text-[#2F2F2F] dark:text-neutral-300 font-semibold mb-1"
              >
                Target Event Date
              </label>
              <input
                id="booking-date"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EA] dark:bg-neutral-900/80 border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all cursor-pointer"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label
                htmlFor="booking-message"
                className="block font-mono text-[10px] uppercase tracking-widest text-[#2F2F2F] dark:text-neutral-300 font-semibold mb-1"
              >
                Event Details & Technical Requirements
              </label>
              <textarea
                id="booking-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention guest count, venue location, or specific illusion requests..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6F2EA] dark:bg-neutral-900/80 border border-[#DDD4C7] dark:border-white/10 text-[#111111] dark:text-white placeholder:text-[#707070] dark:placeholder:text-neutral-400 text-xs focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 rounded-xl bg-[#111111] text-[#FFFFFF] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300 font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A77A2A] focus-visible:outline-none shadow-md border border-[#111111] hover:border-[#A77A2A]"
            >
              <Send className="w-4 h-4 text-[#FFFFFF] dark:text-black" />
              <span>{status === 'submitting' ? 'Formatting Mail Payload...' : 'Send Direct Booking Inquiry'}</span>
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
