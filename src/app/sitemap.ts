import type { MetadataRoute } from "next";
import { getPublicCollection } from "@/lib/firebase/public-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://tlgom.vercel.app").replace(/\/$/, "");
  const staticRoutes = ["", "/about", "/about/history", "/events", "/sermons", "/photo-gallery", "/give", "/testimony", "/contact"].map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 }));
  const albums = await getPublicCollection("galleryAlbums") as Record<string, unknown>[];
  const albumRoutes = albums.filter((album) => album.visible !== false && typeof album.slug === "string").map((album) => ({ url: `${base}/photo-gallery/${album.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  const posts = await getPublicCollection("blogPosts") as Record<string, unknown>[];
  const postRoutes = posts.filter((post) => post.status === "published" && typeof post.slug === "string").map((post) => ({ url: `${base}/blog/${post.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  return [...staticRoutes, ...albumRoutes, ...postRoutes];
}
