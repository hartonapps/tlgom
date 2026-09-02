import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase/admin";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    await verifyAdminToken(authorization.slice(7));
    const { publicId, publicIds } = await request.json();
    const ids = Array.isArray(publicIds) ? publicIds : publicId ? [publicId] : [];
    await Promise.all(ids.filter(Boolean).map((id: string) => cloudinary.uploader.destroy(id, { invalidate: true, resource_type: "image" })));
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
