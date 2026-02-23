export async function listPhotos(): Promise<string[]> {
  const res = await fetch("/photos.json");
  return res.json();
}
