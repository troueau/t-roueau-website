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

const HERO_PHOTO =
  "https://ddrrqia38iv2z.cloudfront.net/B332122-R1-32-14A.webp";
const HERO_INDEX = -1;

function resized(url: string, suffix: "-800w" | "-1600w"): string {
  return url.replace(/\.webp$/, `${suffix}.webp`);
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());

  const allPhotos = [HERO_PHOTO, ...photos];

  const handleLoad = (i: number) => {
    setLoadedSet((prev) => new Set(prev).add(i));
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6">
        <motion.img
          src={resized(HERO_PHOTO, "-1600w")}
          srcSet={`${resized(HERO_PHOTO, "-1600w")} 1600w, ${HERO_PHOTO} 7728w`}
          sizes="(max-width: 1280px) 83vw, 1067px"
          onClick={() => setLightboxIndex(0)}
          alt=""
          loading="eager"
          decoding="async"
          onLoad={() => handleLoad(HERO_INDEX)}
          animate={{ opacity: loadedSet.has(HERO_INDEX) ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full md:w-9/12 object-contain cursor-pointer mx-auto border-white border-4"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          fetchPriority="high"
        />
      </div>
      <div
        id="gallery"
        className="columns-2 lg:columns-3 xl:columns-4 gap-4 px-6 max-w-7xl mx-auto scroll-mt-20">
        {photos.map((src, i) => (
          <motion.div
            key={src + i}
            className="mb-4 break-inside-avoid cursor-pointer group"
            onClick={() => setLightboxIndex(i + 1)}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: (i % 4) * 0.07,
            }}
            whileHover={{ scale: 1.02 }}>
            <div className="overflow-hidden bg-muted select-none pointer-events-none">
              <motion.img
                src={resized(src, "-800w")}
                srcSet={`${resized(src, "-800w")} 800w, ${resized(src, "-1600w")} 1600w`}
                sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 308px"
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={() => handleLoad(i)}
                animate={{ opacity: loadedSet.has(i) ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={allPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
};

export default PhotoGallery;
