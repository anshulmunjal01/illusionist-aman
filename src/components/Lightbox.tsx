import MediaViewerModal, { MediaViewerItem } from './MediaViewerModal';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  // Convert GalleryItems to MediaViewerItems
  const mediaItems: MediaViewerItem[] = items.map((item) => ({
    id: item.id,
    type: 'image',
    url: item.url,
    title: item.title,
    category: item.category,
    description: item.description,
  }));

  const handleNavigate = (newIdx: number) => {
    if (newIdx > currentIndex) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <MediaViewerModal
      isOpen={isOpen}
      items={mediaItems}
      currentIndex={Math.max(0, currentIndex)}
      onClose={onClose}
      onNavigate={handleNavigate}
    />
  );
}
