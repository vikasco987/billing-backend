import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; // use alias
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 🔎 Debug Cloudinary env vars
    console.log("✅ Cloudinary config", {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "Loaded" : "❌ Missing",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "❌ Missing",
    });

    // Convert file → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "my_uploads" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Save to DB
    const saved = await prisma.upload.create({
      data: {
        text,
        imageUrl: uploadResponse.secure_url,
      },
    });

    return NextResponse.json(saved, { status: 200 });
  } catch (err: any) {
    console.error("❌ Upload API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
