import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import fetch from "node-fetch";
import { convertPngBufferToEscPos } from "@/lib/escpos/simpleConvert";

export async function GET() {
  try {
    // Authenticate user
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the latest business profile for this user
    const profile = await prisma.businessProfile.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!profile || !profile.logoUrl) {
      return NextResponse.json({ error: "Logo not found" }, { status: 404 });
    }

    // Fetch the PNG logo from Cloudinary (or your URL)
    const res = await fetch(profile.logoUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch logo" }, { status: 400 });
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert PNG buffer to ESC/POS
    const escpos = convertPngBufferToEscPos(buffer);

    // Return as Base64
    return NextResponse.json({ escposBase64: escpos.toString("base64") });
  } catch (err: any) {
    console.error("Logo conversion error:", err);
    return NextResponse.json(
      { error: "Failed to convert logo", details: err.message },
      { status: 500 }
    );
  }
}
