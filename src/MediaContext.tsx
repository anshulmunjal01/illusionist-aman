import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VideoItem, GalleryItem } from './types';
import { VIDEO_ITEMS, GALLERY_ITEMS } from './data';
import { getMedia, setMedia, deleteMedia, clearAllMedia } from './indexedDB';
import MediaViewerModal, { MediaViewerItem } from './components/MediaViewerModal';

interface MediaContextType {
  videoItems: VideoItem[];
  galleryItems: GalleryItem[];
  loading: boolean;
  setVideoFile: (id: string, file: File, isThumbnail?: boolean) => Promise<void>;
  setGalleryFile: (id: string, file: File) => Promise<void>;
  resetItem: (id: string) => Promise<void>;
  resetAll: () => Promise<void>;
  openViewer: (items: MediaViewerItem[], index?: number) => void;
  closeViewer: () => void;
  setViewerIndex: (index: number) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}

export function MediaProvider({ children }: { children: ReactNode }) {
  const [videoItems, setVideoItems] = useState<VideoItem[]>(VIDEO_ITEMS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [loading, setLoading] = useState(true);
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});

  // Global Media Viewer Modal State
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    items: MediaViewerItem[];
    currentIndex: number;
  }>({
    isOpen: false,
    items: [],
    currentIndex: 0,
  });

  const openViewer = (items: MediaViewerItem[], index = 0) => {
    setViewerState({
      isOpen: true,
      items,
      currentIndex: Math.max(0, Math.min(index, items.length - 1)),
    });
  };

  const closeViewer = () => {
    setViewerState((prev) => ({ ...prev, isOpen: false }));
  };

  const setViewerIndex = (index: number) => {
    setViewerState((prev) => ({ ...prev, currentIndex: index }));
  };

  // Utility to clear old blob URLs
  const revokeAllBlobUrls = (urls: Record<string, string>) => {
    Object.values(urls).forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  };

  const loadMediaFromDb = async () => {
    try {
      const activeUrls: Record<string, string> = {};

      // Load Video files and custom thumbnails
      const updatedVideos = await Promise.all(
        VIDEO_ITEMS.map(async (item) => {
          const newItem = { ...item };
          
          // 1. Check for custom video file
          const videoBlob = await getMedia(`video-file-${item.id}`);
          if (videoBlob) {
            const vUrl = URL.createObjectURL(videoBlob);
            newItem.videoUrl = vUrl;
            activeUrls[`video-file-${item.id}`] = vUrl;
          }

          // 2. Check for custom video thumbnail file
          const thumbBlob = await getMedia(`video-thumb-${item.id}`);
          if (thumbBlob) {
            const tUrl = URL.createObjectURL(thumbBlob);
            newItem.thumbnail = tUrl;
            activeUrls[`video-thumb-${item.id}`] = tUrl;
          }

          return newItem;
        })
      );

      // Load Gallery files
      const updatedGallery = await Promise.all(
        GALLERY_ITEMS.map(async (item) => {
          const newItem = { ...item };
          const imgBlob = await getMedia(`gallery-${item.id}`);
          if (imgBlob) {
            const imgUrl = URL.createObjectURL(imgBlob);
            newItem.url = imgUrl;
            activeUrls[`gallery-${item.id}`] = imgUrl;
          }
          return newItem;
        })
      );

      // Clean up previous blob URLs
      revokeAllBlobUrls(blobUrls);

      setBlobUrls(activeUrls);
      setVideoItems(updatedVideos);
      setGalleryItems(updatedGallery);
    } catch (error) {
      console.error('Failed to load assets from IndexedDB:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMediaFromDb();
    return () => {
      revokeAllBlobUrls(blobUrls);
    };
  }, []);

  const setVideoFile = async (id: string, file: File, isThumbnail = false) => {
    const key = isThumbnail ? `video-thumb-${id}` : `video-file-${id}`;
    await setMedia(key, file);
    await loadMediaFromDb();
  };

  const setGalleryFile = async (id: string, file: File) => {
    const key = `gallery-${id}`;
    await setMedia(key, file);
    await loadMediaFromDb();
  };

  const resetItem = async (id: string) => {
    // Attempt deleting all possible keys for this ID
    await deleteMedia(`video-file-${id}`);
    await deleteMedia(`video-thumb-${id}`);
    await deleteMedia(`gallery-${id}`);
    await loadMediaFromDb();
  };

  const resetAll = async () => {
    await clearAllMedia();
    await loadMediaFromDb();
  };

  return (
    <MediaContext.Provider
      value={{
        videoItems,
        galleryItems,
        loading,
        setVideoFile,
        setGalleryFile,
        resetItem,
        resetAll,
        openViewer,
        closeViewer,
        setViewerIndex,
      }}
    >
      {children}
      <MediaViewerModal
        isOpen={viewerState.isOpen}
        items={viewerState.items}
        currentIndex={viewerState.currentIndex}
        onClose={closeViewer}
        onNavigate={setViewerIndex}
      />
    </MediaContext.Provider>
  );
}
