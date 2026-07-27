import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMedia } from '../MediaContext';
import { X, Upload, RotateCcw, Clapperboard, Image as ImageIcon, Check, Info } from 'lucide-react';

interface MediaDeskProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaDesk({ isOpen, onClose }: MediaDeskProps) {
  const { videoItems, galleryItems, setVideoFile, setGalleryFile, resetItem, resetAll } = useMedia();
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveId(id);
    } else if (e.type === "dragleave") {
      setDragActiveId(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, id: string, type: 'video' | 'thumb' | 'gallery') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveId(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await processUpload(id, file, type);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, id: string, type: 'video' | 'thumb' | 'gallery') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await processUpload(id, file, type);
    }
  };

  const processUpload = async (id: string, file: File, type: 'video' | 'thumb' | 'gallery') => {
    setUploadingId(`${type}-${id}`);
    try {
      if (type === 'video') {
        // Must be mp4/mov
        if (!file.type.startsWith('video/')) {
          alert('Please select a valid video file (MP4, MOV, etc.)');
          return;
        }
        await setVideoFile(id, file, false);
      } else if (type === 'thumb') {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file (JPG, PNG, etc.)');
          return;
        }
        await setVideoFile(id, file, true);
      } else if (type === 'gallery') {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file (JPG, PNG, etc.)');
          return;
        }
        await setGalleryFile(id, file);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingId(null);
    }
  };

  const isCustomFile = (id: string, type: 'video' | 'thumb' | 'gallery') => {
    if (type === 'video') {
      const item = videoItems.find(v => v.id === id);
      return item ? item.videoUrl.startsWith('blob:') : false;
    } else if (type === 'thumb') {
      const item = videoItems.find(v => v.id === id);
      return item ? item.thumbnail.startsWith('blob:') : false;
    } else {
      const item = galleryItems.find(g => g.id === id);
      return item ? item.url.startsWith('blob:') : false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admin-media-desk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-neutral-950/98 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            key="admin-media-desk-content"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-neutral-900/90 border border-amber-400/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(245,158,11,0.05)] text-white overflow-hidden"
          >
          {/* Header Panel */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-neutral-950/50">
            <div>
              <h2 className="font-display text-lg tracking-wider text-amber-400 uppercase flex items-center gap-2">
                <span>Performer Media Desk</span>
                <span className="font-mono text-[9px] bg-amber-400/10 text-amber-300 px-2.5 py-0.5 rounded-full uppercase tracking-widest">Active Sync</span>
              </h2>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Upload your actual performance MP4 clips and photography portfolio directly to the web client. Uses IndexedDB for instant, persistent caching.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to restore all original placeholder assets?')) {
                    await resetAll();
                  }
                }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-md text-xs font-sans tracking-wide flex items-center gap-1.5 border border-white/5 transition-all cursor-pointer"
                title="Reset All to Default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All
              </button>
              <button
                onClick={onClose}
                className="p-1.5 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-md border border-white/5 transition-all cursor-pointer"
                aria-label="Close Media Desk"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/5 bg-neutral-950/20 px-4">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-5 py-4 font-display text-xs uppercase tracking-widest border-b-2 font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'videos'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              Performance Clips ({videoItems.length})
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-5 py-4 font-display text-xs uppercase tracking-widest border-b-2 font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'photos'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Portfolio Gallery ({galleryItems.length})
            </button>
          </div>

          {/* Core scrollable desk area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Informational banner */}
            <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-300/90 font-sans leading-relaxed">
                <strong>How to use:</strong> Match your uploaded files with the descriptions on the page. Your videos are played locally via HTML5, so large MP4 files run flawlessly inside the preview. No cloud account or server uploads needed! Files will remain saved in this browser until you clear cache or click "Reset All".
              </div>
            </div>

            {activeTab === 'videos' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoItems.map((video) => {
                  const isCustomVid = isCustomFile(video.id, 'video');
                  const isCustomThumb = isCustomFile(video.id, 'thumb');

                  return (
                    <div
                      key={video.id}
                      className="border border-white/5 rounded-xl bg-neutral-950/30 p-5 flex flex-col justify-between hover:border-amber-400/10 transition-colors"
                    >
                      <div>
                        {/* Title and Badge */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display text-sm uppercase text-amber-400 tracking-wide">
                            {video.id === 'vid-showreel' ? '🎥 Primary Showreel' : video.title}
                          </h3>
                          <span className="font-mono text-[9px] bg-white/5 text-neutral-400 px-2 py-0.5 rounded tracking-widest uppercase shrink-0">
                            {video.duration} • {video.category}
                          </span>
                        </div>
                        <p className="text-neutral-400 font-sans text-xs line-clamp-2 leading-relaxed mb-4">
                          {video.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          {/* 1. Video File Upload Slot */}
                          <div
                            onDragEnter={(e) => handleDrag(e, `${video.id}-vid`)}
                            onDragOver={(e) => handleDrag(e, `${video.id}-vid`)}
                            onDragLeave={(e) => handleDrag(e, `${video.id}-vid`)}
                            onDrop={(e) => handleDrop(e, video.id, 'video')}
                            className={`border border-dashed rounded-lg p-4 text-center flex flex-col items-center justify-center relative group min-h-[110px] transition-all cursor-pointer ${
                              dragActiveId === `${video.id}-vid`
                                ? 'border-amber-400 bg-amber-400/5'
                                : isCustomVid
                                ? 'border-emerald-500/30 bg-emerald-500/[0.02]'
                                : 'border-white/10 hover:border-white/25 bg-neutral-950/20'
                            }`}
                          >
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleFileSelect(e, video.id, 'video')}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {uploadingId === `video-${video.id}` ? (
                              <div className="animate-pulse font-sans text-xs text-amber-400">Processing...</div>
                            ) : isCustomVid ? (
                              <>
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                                  <Check className="w-4 h-4" />
                                </div>
                                <span className="font-sans text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Video Synced</span>
                                <span className="font-mono text-[8px] text-neutral-500 mt-1">HTML5 Native Playback</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 transition-colors mb-2" />
                                <span className="font-sans text-[10px] text-neutral-300 font-medium tracking-wide">Upload Clip (.mp4)</span>
                                <span className="font-sans text-[8px] text-neutral-500 mt-1">Drag and drop or tap</span>
                              </>
                            )}
                          </div>

                          {/* 2. Thumbnail Image Upload Slot */}
                          <div
                            onDragEnter={(e) => handleDrag(e, `${video.id}-thumb`)}
                            onDragOver={(e) => handleDrag(e, `${video.id}-thumb`)}
                            onDragLeave={(e) => handleDrag(e, `${video.id}-thumb`)}
                            onDrop={(e) => handleDrop(e, video.id, 'thumb')}
                            className={`border border-dashed rounded-lg p-4 text-center flex flex-col items-center justify-center relative group min-h-[110px] transition-all cursor-pointer ${
                              dragActiveId === `${video.id}-thumb`
                                ? 'border-amber-400 bg-amber-400/5'
                                : isCustomThumb
                                ? 'border-emerald-500/30 bg-emerald-500/[0.02]'
                                : 'border-white/10 hover:border-white/25 bg-neutral-950/20'
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileSelect(e, video.id, 'thumb')}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {uploadingId === `thumb-${video.id}` ? (
                              <div className="animate-pulse font-sans text-xs text-amber-400">Processing...</div>
                            ) : isCustomThumb ? (
                              <>
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                                  <Check className="w-4 h-4" />
                                </div>
                                <span className="font-sans text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Thumbnail Synced</span>
                                <span className="font-mono text-[8px] text-neutral-500 mt-1">Custom JPG/PNG</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 transition-colors mb-2" />
                                <span className="font-sans text-[10px] text-neutral-300 font-medium tracking-wide">Upload Cover Cover</span>
                                <span className="font-sans text-[8px] text-neutral-500 mt-1">Drag and drop or tap</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Controls Footer */}
                      {(isCustomVid || isCustomThumb) && (
                        <div className="flex justify-end gap-3 border-t border-white/5 pt-3 mt-4">
                          <button
                            onClick={() => resetItem(video.id)}
                            className="px-2.5 py-1 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded text-[10px] font-mono uppercase tracking-widest text-neutral-400 border border-white/5 hover:border-red-500/20 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Reset Slot
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.map((item) => {
                  const isCustomImg = isCustomFile(item.id, 'gallery');

                  return (
                    <div
                      key={item.id}
                      className="border border-white/5 rounded-xl bg-neutral-950/30 p-5 flex flex-col justify-between hover:border-amber-400/10 transition-colors"
                    >
                      <div>
                        {/* Image Preview or placeholder */}
                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black mb-4 border border-white/5">
                          <img
                            src={item.url}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 font-mono text-[8px] text-amber-300 tracking-wider uppercase">
                            {item.aspectRatio}
                          </span>
                        </div>

                        {/* Text description */}
                        <h3 className="font-display text-xs uppercase text-amber-400 tracking-wide mb-1">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block mb-4">
                          Category: {item.category}
                        </span>

                        {/* Upload Trigger */}
                        <div
                          onDragEnter={(e) => handleDrag(e, item.id)}
                          onDragOver={(e) => handleDrag(e, item.id)}
                          onDragLeave={(e) => handleDrag(e, item.id)}
                          onDrop={(e) => handleDrop(e, item.id, 'gallery')}
                          className={`border border-dashed rounded-lg p-4 text-center flex flex-col items-center justify-center relative group min-h-[110px] transition-all cursor-pointer ${
                            dragActiveId === item.id
                              ? 'border-amber-400 bg-amber-400/5'
                              : isCustomImg
                              ? 'border-emerald-500/30 bg-emerald-500/[0.02]'
                              : 'border-white/10 hover:border-white/25 bg-neutral-950/20'
                          }`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileSelect(e, item.id, 'gallery')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          {uploadingId === `gallery-${item.id}` ? (
                            <div className="animate-pulse font-sans text-xs text-amber-400">Processing...</div>
                          ) : isCustomImg ? (
                            <>
                              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                                <Check className="w-4 h-4" />
                              </div>
                              <span className="font-sans text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Photo Synced</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 transition-colors mb-2" />
                              <span className="font-sans text-[10px] text-neutral-300 font-medium tracking-wide">Replace Photo</span>
                              <span className="font-sans text-[8px] text-neutral-500 mt-1">Drag and drop or tap</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Controls Footer */}
                      {isCustomImg && (
                        <div className="flex justify-end gap-3 border-t border-white/5 pt-3 mt-4">
                          <button
                            onClick={() => resetItem(item.id)}
                            className="px-2.5 py-1 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded text-[10px] font-mono uppercase tracking-widest text-neutral-400 border border-white/5 hover:border-red-500/20 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Reset Slot
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Footer Panel */}
          <div className="p-4 border-t border-white/5 bg-neutral-950/40 text-center text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
            Designed for Illusionist Aman • 100% Client-Side Privacy Enabled
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
