import { NextResponse } from "next/server";
import { getPublicCollection, getPublicDocument } from "@/lib/firebase/public-data";

const resources = {
  events: { collection: "events" },
  sermons: { collection: "sermons" },
  albums: { collection: "galleryAlbums" },
  photos: { collection: "galleryPhotos" },
  giving: { collection: "siteSettings", document: "giving" },
  homepage: { collection: "siteSettings", document: "homepage" },
} as const;

export async function GET(_: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const config = resources[resource as keyof typeof resources];
  if (!config) return NextResponse.json({ error: "Unknown public resource" }, { status: 404 });
  let data = "document" in config ? await getPublicDocument(config.collection, config.document) : await getPublicCollection(config.collection);
  if (Array.isArray(data)) {
    data = data.filter((item) => item.enabled !== false && item.visible !== false);
  }
  return NextResponse.json({ data }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
