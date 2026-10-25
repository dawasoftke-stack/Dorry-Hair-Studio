import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  items: GalleryItem[];
  onNavigate: (newIndex: number) => void;
  onBookStyle: (styleName: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  currentIndex,
  items,
  onNavigate,
  onBookStyle
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery photo preview"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/80 hover:text-[#C6A15B] p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-[#C6A15B] p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-[#C6A15B] p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Main Lightbox Card */}
      <div
        className="relative max-w-4xl max-h-[90vh] bg-[#263522] border border-[#C6A15B]/30 rounded-md overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo view */}
        <div className="relative flex-1 flex items-center justify-center bg-black/40 overflow-hidden max-h-[65vh] sm:max-h-[70vh]">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-auto h-auto max-h-[65vh] sm:max-h-[70vh] max-w-full object-contain mx-auto"
          />
        </div>

        {/* Details & Action Bar */}
        <div className="p-4 sm:p-5 bg-[#263522] border-t border-[#C6A15B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C6A15B] bg-[#35452E] px-2 py-0.5 rounded-xs border border-[#C6A15B]/20">
                {currentItem.categoryLabel}
              </span>
              <span className="text-xs text-[#A5AD91]">
                {currentIndex + 1} of {items.length}
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#FFFDF8] font-medium">
              {currentItem.title}
            </h3>
            <p className="text-xs text-[#A5AD91] mt-0.5 line-clamp-2">
              {currentItem.caption}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookStyle(currentItem.title);
            }}
            className="shrink-0 inline-flex items-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-sm transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book This Style</span>
          </button>
        </div>
      </div>
    </div>
  );
};
