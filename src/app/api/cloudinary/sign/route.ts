import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase/admin";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    await verifyAdminToken(authorization.slice(7));
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error("Cloudinary is not configured.");
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "tlgom/slideshow";
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET);
    return NextResponse.json({ timestamp, folder, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.CLOUDINARY_CLOUD_NAME });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create upload signature.";
    return NextResponse.json({ error: message }, { status: message.includes("required") ? 403 : 500 });
  }
}
