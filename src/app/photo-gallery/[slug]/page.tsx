import GalleryBrowser from "@/components/GalleryBrowser";
export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <GalleryBrowser slug={slug} />; }
