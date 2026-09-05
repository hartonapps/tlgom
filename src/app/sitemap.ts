import type { MetadataRoute } from "next";
import { getPublicCollection } from "@/lib/firebase/public-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://tlgom.vercel.app").replace(/\/$/, "");
  const staticRoutes = ["", "/about-us", "/events", "/sermons", "/photo-gallery", "/give"].map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 }));
  const albums = await getPublicCollection("galleryAlbums") as Record<string, unknown>[];
  const albumRoutes = albums.filter((album) => album.visible !== false && typeof album.slug === "string").map((album) => ({ url: `${base}/photo-gallery/${album.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  return [...staticRoutes, ...albumRoutes];
}
