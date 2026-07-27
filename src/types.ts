export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: string; // name of lucide-react icon
  image: string;
  exampleIllusion: string;
  highlightDetails: string[];
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

export interface VideoItem {
  id: string;
  videoUrl: string; // YouTube or premium mockup video loop
  title: string;
  duration: string;
  category: string;
  description: string;
  thumbnail: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  date: string;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
}
