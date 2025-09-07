import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "❌ missing",
    api_key: process.env.CLOUDINARY_API_KEY ? "✅ loaded" : "❌ missing",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ loaded" : "❌ missing",
  });
}
