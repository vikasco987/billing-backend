import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { PNG } from "pngjs";
import EscPosEncoder from "esc-pos-encoder";

// GET /api/logo/convert?url=<logo_url>
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    if (!url) return NextResponse.json({ error: "Missing logo URL" }, { status: 400 });

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Decode PNG
    const png = PNG.sync.read(buffer);

    // Convert to ESC/POS raster
    const encoder = new EscPosEncoder();
    const escposData = encoder
      .initialize()
      .rasterBitImage(png.data, png.width, png.height, "d24")
      .encode();

    // Return Base64
    return NextResponse.json({ escposBase64: Buffer.from(escposData).toString("base64") });
  } catch (err: any) {
    console.error("Logo conversion error:", err);
    return NextResponse.json({ error: "Failed to convert logo", details: err.message }, { status: 500 });
  }
}
