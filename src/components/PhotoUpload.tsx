import { useCallback } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

interface PhotoUploadProps {
  onUpload: (files: File[]) => void;
}

const PhotoUpload = ({ onUpload }: PhotoUploadProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length > 0) onUpload(files);
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) onUpload(files);
    },
    [onUpload]
  );

  return (
    <motion.div
      id="upload"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6"
    >
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="group flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-card p-12 cursor-pointer transition-all duration-300 hover:glow-shadow"
      >
        <div className="rounded-full bg-secondary p-4 group-hover:bg-accent transition-colors">
          <ImagePlus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium mb-1">
            Drop your photos here
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse · Supports JPG, PNG, WebP
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </motion.div>
  );
};

export default PhotoUpload;
