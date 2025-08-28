
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  category: string;
  gradient: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  initialIndex?: number;
}

const GalleryModal = ({ isOpen, onClose, images, initialIndex = 0 }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [isZoomed, setIsZoomed] = React.useState(false);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'Escape') onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  if (!images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-black/95 border-gray-800">
        <DialogHeader className="absolute top-4 left-4 right-4 z-10">
          <div className="flex items-center justify-between text-white">
            <DialogTitle className="font-righteous text-xl">
              {currentImage.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                {currentIndex + 1} / {images.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
          <div 
            className={`relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
              isZoomed 
                ? 'w-full h-full' 
                : 'w-full h-[70vh] md:w-4/5 md:h-4/5 max-w-4xl'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div className={`w-full h-full bg-gradient-to-br ${currentImage.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                  {currentImage.category}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                    className="text-white hover:bg-white/10"
                  >
                    {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Share2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Download size={16} />
                  </Button>
                </div>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                {currentImage.description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 w-10 h-10 md:w-12 md:h-12"
          onClick={goToPrevious}
          disabled={images.length <= 1}
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 w-10 h-10 md:w-12 md:h-12"
          onClick={goToNext}
          disabled={images.length <= 1}
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </Button>

        {/* Thumbnail Strip - Hidden on mobile to save space */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-4xl hidden md:block">
          <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all duration-200 ${
                  index === currentIndex 
                    ? 'ring-2 ring-pink-500 opacity-100' 
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${image.gradient} opacity-90`} />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
