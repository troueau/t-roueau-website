import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs/promises";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

function s3PhotosPlugin() {
  let envVars: Record<string, string> = {};
  return {
    name: "s3-photos",
    configResolved(config: { mode: string; root: string }) {
      // loadEnv with '' prefix loads ALL vars from .env (not just VITE_*)
      envVars = loadEnv(config.mode, config.root, "");
    },
    async buildStart() {
      const region = envVars.AWS_REGION;
      const accessKeyId = envVars.AWS_ACCESS_KEY_ID;
      const secretAccessKey = envVars.AWS_SECRET_ACCESS_KEY;
      const bucket = envVars.S3_BUCKET_NAME;
      const cloudfrontUrl = (envVars.CLOUDFRONT_URL ?? "").replace(/\/$/, "");

      if (
        !region ||
        !accessKeyId ||
        !secretAccessKey ||
        !bucket ||
        !cloudfrontUrl
      ) {
        console.warn(
          "[s3-photos] Missing env vars, skipping photo list generation.",
        );
        return;
      }

      console.log("[s3-photos] Fetching photo list from S3...");

      const s3 = new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey },
      });
      const response = await s3.send(
        new ListObjectsV2Command({ Bucket: bucket, Prefix: "gallery/" }),
      );

      const urls = (response.Contents ?? [])
        .filter((obj) => {
          const ext = obj.Key?.split(".").pop()?.toLowerCase();
          return ext && IMAGE_EXTENSIONS.has(ext);
        })
        .sort(
          (a, b) =>
            (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0),
        )
        .map((obj) => `${cloudfrontUrl}/${obj.Key}`);

      await fs.mkdir("public", { recursive: true });
      await fs.writeFile("public/photos.json", JSON.stringify(urls));
      console.log(
        `[s3-photos] Generated public/photos.json with ${urls.length} photos.`,
      );
    },
  };
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [s3PhotosPlugin(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
