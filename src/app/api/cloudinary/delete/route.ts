import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase/admin";
import { cloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    await verifyAdminToken(authorization.slice(7));
    const { publicId, publicIds, assets } = await request.json();
    const legacyIds = Array.isArray(publicIds) ? publicIds : publicId ? [publicId] : [];
    const requestedAssets = Array.isArray(assets) ? assets : legacyIds.map((id) => ({ publicId: id, resourceType: "image" }));
    await Promise.all(requestedAssets.filter((asset) => typeof asset?.publicId === "string" && asset.publicId).map((asset) => cloudinary.uploader.destroy(asset.publicId, { invalidate: true, resource_type: asset.resourceType === "video" ? "video" : "image" })));
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
