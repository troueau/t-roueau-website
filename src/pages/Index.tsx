import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PhotoUpload from "@/components/PhotoUpload";
import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleUpload = useCallback((files: File[]) => {
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...newUrls, ...prev]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <div className="py-16 space-y-16">
        <div className="text-center">
          <h2 className="text-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
            My Work
          </h2>
          <p className="text-muted-foreground">
            {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </p>
        </div>

        <PhotoUpload onUpload={handleUpload} />
        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
};

export default Index;
