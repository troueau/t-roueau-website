/**
 * Generates -800w.webp and -1600w.webp variants for every original .webp in S3.
 * Skips files that already have a size suffix.
 *
 * Usage:
 *   node scripts/resize-s3-images.mjs <bucket-name> [--dry-run]
 *
 * Prerequisites:
 *   bun add -d sharp   (or: npm i -D sharp)
 */

import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

const SIZES = [
  { suffix: "-800w", width: 800, quality: 80 },
  { suffix: "-1600w", width: 1600, quality: 82 },
];

const bucket = process.argv[2];
const dryRun = process.argv.includes("--dry-run");

if (!bucket) {
  console.error(
    "Usage: node scripts/resize-s3-images.mjs <bucket-name> [--dry-run]",
  );
  process.exit(1);
}

const s3 = new S3Client({});

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function listOriginals() {
  const originals = [];
  let token;
  do {
    const res = await s3.send(
      new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }),
    );
    for (const obj of res.Contents ?? []) {
      const key = obj.Key;
      if (!key.endsWith(".webp")) continue;
      if (SIZES.some((s) => key.endsWith(`${s.suffix}.webp`))) continue;
      originals.push(key);
    }
    token = res.NextContinuationToken;
  } while (token);
  return originals;
}

async function processKey(key) {
  console.log(`\n[${key}]`);
  const { Body } = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key }),
  );
  const srcBuffer = await streamToBuffer(Body);

  for (const { suffix, width, quality } of SIZES) {
    const destKey = key.replace(/\.webp$/, `${suffix}.webp`);

    if (dryRun) {
      console.log(`  (dry-run) would upload → ${destKey}`);
      continue;
    }

    const resized = await sharp(srcBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: destKey,
        Body: resized,
        ContentType: "image/webp",
      }),
    );

    const savedPct = (
      ((srcBuffer.length - resized.length) / srcBuffer.length) *
      100
    ).toFixed(1);
    console.log(
      `  ✓ ${destKey}  (${(resized.length / 1024).toFixed(0)} KB, saved ${savedPct}%)`,
    );
  }
}

const keys = await listOriginals();
console.log(
  `Found ${keys.length} original(s) in s3://${bucket}${dryRun ? " — dry run" : ""}`,
);

for (const key of keys) {
  await processKey(key);
}

console.log("\nDone.");
