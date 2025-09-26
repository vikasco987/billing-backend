import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? "✅ Present" : "❌ Missing",
    CLOUDINARY_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "✅ Present" : "❌ Missing",
    CLERK_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "✅ Present" : "❌ Missing"
  });
}
