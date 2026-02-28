import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) => {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      touchStartX.current = null;
      if (Math.abs(delta) < 50) return;
      if (delta > 0 && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
      if (delta < 0 && currentIndex > 0) onNavigate(currentIndex - 1);
    },
    [currentIndex, images.length, onNavigate],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-secondary text-foreground hover:text-primary transition-colors z-10 hidden sm:block">
          <X className="w-6 h-6" />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-6 p-2 rounded-full bg-secondary text-foreground hover:text-primary transition-colors z-10 hidden sm:block">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-6 p-2 rounded-full bg-secondary text-foreground hover:text-primary transition-colors z-10 hidden sm:block">
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div className="select-none pointer-events-none">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]}
            alt=""
            className="max-h-[88vh] max-w-[88vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        <div className="absolute bottom-3 text-sm text-muted-foreground">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default Lightbox;
