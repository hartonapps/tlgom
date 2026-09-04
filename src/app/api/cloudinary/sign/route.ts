import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase/admin";
import { cloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    await verifyAdminToken(authorization.slice(7));

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary is not configured.");
    }

    const body = await request.json().catch(() => ({}));

    const folder =
      body.folder === "tlgom/gallery"
        ? "tlgom/gallery"
        : "tlgom/slideshow";

    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      apiSecret
    );

    return NextResponse.json({
      timestamp,
      folder,
      signature,
      apiKey,
      cloudName,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create upload signature.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
