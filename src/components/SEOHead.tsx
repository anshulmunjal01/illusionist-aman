import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
}

const PAGE_SEO_DATA: Record<string, PageMeta> = {
  '/': {
    title: 'Magician Aman | Premier Stage Illusionist & Psychological Mentalist',
    description: 'Experience western-style stage magic, psychological mentalism, sleight of hand, and high-net-worth corporate galas worldwide with Illusionist Aman.',
    canonicalPath: '/',
  },
  '/about': {
    title: 'The Chronicle | Magician Aman - High-End Stage Illusionist',
    description: 'Explore the journey, artistic philosophy, master craftsmanship, and press achievements of international illusionist Aman.',
    canonicalPath: '/about',
  },
  '/shows': {
    title: 'Performance Formats | Magician Aman - Corporate Galas & VIP Shows',
    description: 'Discover curated show concepts designed for corporate galas, luxury wedding receptions, theater auditoriums, and VIP private soirées.',
    canonicalPath: '/shows',
  },
  '/formats': {
    title: 'Performance Formats | Magician Aman - Corporate Galas & VIP Shows',
    description: 'Discover curated show concepts designed for corporate galas, luxury wedding receptions, theater auditoriums, and VIP private soirées.',
    canonicalPath: '/formats',
  },
  '/gallery': {
    title: 'Visual Vault & Gallery | Magician Aman - Stage Photography',
    description: 'Browse high-definition photography capturing live stage umbrella productions, flame wallet transpositions, celebrity encounters, and card mechanics.',
    canonicalPath: '/gallery',
  },
  '/videos': {
    title: 'Performance Recordings & Video Vault | Magician Aman',
    description: 'Watch unedited close-up sleight of hand, telekinetic levitation, spectator choice synchronization, and grand flame illusions.',
    canonicalPath: '/videos',
  },
  '/testimonials': {
    title: 'Client Reviews & Endorsements | Magician Aman',
    description: 'Read verified testimonials and endorsements from corporate event organizers, luxury wedding planners, and VIP private hosts.',
    canonicalPath: '/testimonials',
  },
  '/contact': {
    title: 'Inquire & Reserve | Direct Booking Desk - Magician Aman',
    description: 'Contact the direct performance booking desk for corporate galas, luxury weddings, VIP private engagements, and custom illusion shows.',
    canonicalPath: '/contact',
  },
};

export default function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_SEO_DATA[location.pathname] || {
      title: '404 - Page Vanished | Magician Aman',
      description: 'The requested page has vanished into thin air. Return to the main portal of Magician Aman.',
      canonicalPath: location.pathname,
    };

    // Update Title
    document.title = meta.title;

    // Update Meta Description
    let descElement = document.querySelector('meta[name="description"]');
    if (!descElement) {
      descElement = document.createElement('meta');
      descElement.setAttribute('name', 'description');
      document.head.appendChild(descElement);
    }
    descElement.setAttribute('content', meta.description);

    // Update OG Title, Description, & URL
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', `https://magicianaman.com${meta.canonicalPath}`);

    // Update Twitter Title & Description
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.title);

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', meta.description);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://magicianaman.com${meta.canonicalPath}`);

    // Scroll window smoothly to top on page navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}
