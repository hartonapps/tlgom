import type { Metadata } from "next";
import GalleryBrowser from "@/components/GalleryBrowser";
import { getPublicCollection } from "@/lib/firebase/public-data";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const albums = await getPublicCollection("galleryAlbums") as GalleryAlbum[];
  const album = albums.find((item) => item.slug === slug);
  const name = album?.name || slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const title = `${name} | Photo Gallery | The Life Global Outreach Ministries`;
  const description = album?.description || `Explore photographs from ${name} at The Life Global Outreach Ministries.`;
  return { title, description, alternates: { canonical: `/photo-gallery/${slug}` }, openGraph: { title, description, url: `/photo-gallery/${slug}`, type: "website", images: [{ url: album?.coverImageUrl || "/logo.png", width: 1200, height: 630, alt: `${name} gallery` }] }, twitter: { card: "summary_large_image", title, description, images: [album?.coverImageUrl || "/logo.png"] } };
}

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const albums = await getPublicCollection("galleryAlbums") as GalleryAlbum[]; const photos = await getPublicCollection("galleryPhotos") as GalleryPhoto[]; return <GalleryBrowser slug={slug} initialAlbums={albums} initialPhotos={photos} />; }
