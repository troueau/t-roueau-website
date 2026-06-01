import { useState } from "react";
import { cn } from "@/lib/utils";

const CLOUDFRONT_URL = (import.meta.env.VITE_CLOUDFRONT_URL ?? "").replace(/\/$/, "");

type OptimizedImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "loading" | "decoding"
> & {
  src: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  wrapperClassName?: string;
};

const OptimizedImage = ({
  src,
  alt,
  className,
  aspectRatio,
  objectFit = "cover",
  wrapperClassName,
  ...props
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const url = src.startsWith("http")
    ? src
    : `${CLOUDFRONT_URL}/${src.replace(/^\//, "")}`;

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", wrapperClassName)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-foreground/5" />
      )}
      {!error ? (
        <img
          {...props}
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            "transition-opacity duration-500",
            aspectRatio ? "absolute inset-0 w-full h-full" : "w-full",
            objectFit === "cover" ? "object-cover" : "object-contain",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
