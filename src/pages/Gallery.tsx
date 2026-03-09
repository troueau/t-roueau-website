import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import PhotoGallery from "@/components/PhotoGallery";
import { listPhotos } from "@/lib/s3";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        backgroundColor: "hsl(var(--primary))",
      }}
    />
  );
};

const Gallery = () => {
  const { data: allFiles = [], isError } = useQuery({
    queryKey: ["photos"],
    queryFn: listPhotos,
  });

  const photos = allFiles.filter((url) => !/-\d+w\.webp$/.test(url));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollProgress />

      <Header showProjects showAbout />

      <div className="pt-14 pb-16 space-y-16 flex-1">
        <div className="text-center">
          {isError ? (
            <p className="text-destructive">Failed to load photos.</p>
          ) : null}
        </div>

        <PhotoGallery photos={photos} />

        <div className="text-center">
          <p className="text-muted-foreground">
            {photos.length + 1} photo{photos.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
