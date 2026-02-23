import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import PhotoGallery from "@/components/PhotoGallery";
import { listPhotos } from "@/lib/s3";
import Footer from "@/components/Footer";

const Index = () => {
  const { data: photos = [], isLoading, isError } = useQuery({
    queryKey: ["photos"],
    queryFn: listPhotos,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="py-16 space-y-16 flex-1" id="gallery">
        <div className="text-center">
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-destructive">Failed to load photos.</p>
          ) : null}
        </div>

        <PhotoGallery photos={photos} />

        <div className="text-center">
          <p className="text-muted-foreground">
            {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
