import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

interface PhotoGalleryProps {
  photos: string[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());

  const handleLoad = (i: number) => {
    setLoadedSet((prev) => new Set(prev).add(i));
  };

  return (
    <>
      <div
        className="columns-2 lg:columns-3 xl:columns-4 gap-4 px-6 max-w-7xl mx-auto"
      >
        {photos.map((src, i) => (
          <motion.div
            key={src + i}
            className="mb-4 break-inside-avoid cursor-pointer group"
            onClick={() => setLightboxIndex(i)}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: (i % 4) * 0.07 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="overflow-hidden  bg-muted">
              <motion.img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={() => handleLoad(i)}
                animate={{ opacity: loadedSet.has(i) ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full object-cover"
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
