import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <p className="text-muted-foreground text-lg">
          No photos yet. Upload some to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        id="gallery"
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 px-6 max-w-7xl mx-auto"
      >
        {photos.map((src, i) => (
          <motion.div
            key={src + i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
            className="mb-4 break-inside-avoid cursor-pointer group"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
};

export default PhotoGallery;
