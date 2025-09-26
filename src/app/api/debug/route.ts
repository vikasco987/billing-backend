import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    db: process.env.DATABASE_URL ? "loaded" : "missing",
    cloud: process.env.CLOUDINARY_CLOUD_NAME ? "loaded" : "missing",
    clerk: process.env.CLERK_SECRET_KEY ? "loaded" : "missing",
  });
}
