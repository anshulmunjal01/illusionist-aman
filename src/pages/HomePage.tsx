import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Showreel from '../components/Showreel';
import Stats from '../components/Stats';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useMedia } from '../MediaContext';

interface HomePageProps {
  theme: 'dark' | 'light';
}

export default function HomePage({ theme }: HomePageProps) {
  const navigate = useNavigate();
  const { videoItems, openViewer } = useMedia();

  const handleWatchShowreel = () => {
    const items = videoItems.map((v) => ({
      id: v.id,
      type: 'video' as const,
      url: v.videoUrl,
      thumbnail: v.thumbnail,
      title: v.title,
      category: v.category,
      description: v.description,
      duration: v.duration,
    }));
    openViewer(items, 0);
  };

  return (
    <div className="w-full">
      {/* Hero Cover */}
      <Hero onWatchShowreel={handleWatchShowreel} theme={theme} />

      {/* Featured Performance Categories */}
      <section className="relative py-12">
        <Categories />
        <div className="max-w-7xl mx-auto px-6 text-center mt-6">
          <button
            onClick={() => navigate('/formats')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#A77A2A] text-[#FFFFFF] hover:text-[#FFFFFF] dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-black font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 shadow-md hover:scale-105"
          >
            <span>Explore All Performance Formats</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Master Showreel Player */}
      <Showreel />

      {/* National Experience Statistics */}
      <Stats />

      {/* Corporate Clients Marquee */}
      <Clients />

      {/* Reviews & Testimonials Preview */}
      <section className="relative py-12">
        <Testimonials />
        <div className="max-w-7xl mx-auto px-6 text-center mt-6">
          <button
            onClick={() => navigate('/testimonials')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-[#A77A2A] text-[#111111] hover:bg-[#A77A2A] hover:text-[#FFFFFF] dark:bg-transparent dark:border-amber-400/30 dark:hover:border-amber-400 dark:text-amber-200 font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#A77A2A] dark:text-amber-400" />
            <span>Read All Client Reviews & FAQs</span>
          </button>
        </div>
      </section>

      {/* Booking Contact Section */}
      <ContactSection />
    </div>
  );
}
