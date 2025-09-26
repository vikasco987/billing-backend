import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? "✅ Loaded" : "❌ Missing",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "✅ Loaded" : "❌ Missing",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "✅ Loaded" : "❌ Missing",
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "✅ Loaded" : "❌ Missing",
  });
}
