import type { Metadata } from "next";
import GalleryBrowser from "@/components/GalleryBrowser";
import { getPublicCollection } from "@/lib/firebase/public-data";
import type { GalleryAlbum, GalleryPhoto } from "@/lib/gallery";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Photo Gallery | The Life Global Outreach Ministries", description: "Explore photographs, ministry moments, events, and memories from The Life Global Outreach Ministries.", alternates: { canonical: "/photo-gallery" }, openGraph: { title: "Photo Gallery | TLGOM", description: "Explore photographs, ministry moments, events, and memories from The Life Global Outreach Ministries.", url: "/photo-gallery", type: "website", images: [{ url: "/logo.png", width: 512, height: 512, alt: "The Life Global Outreach Ministries logo" }] }, twitter: { card: "summary_large_image", title: "Photo Gallery | TLGOM", description: "Explore photographs, ministry moments, events, and memories from The Life Global Outreach Ministries.", images: ["/logo.png"] } };

export default async function PhotoGalleryPage() { const albums = await getPublicCollection("galleryAlbums") as GalleryAlbum[]; const photos = await getPublicCollection("galleryPhotos") as GalleryPhoto[]; return <GalleryBrowser initialAlbums={albums} initialPhotos={photos} />; }
