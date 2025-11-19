// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import fetch from "node-fetch";
// import { PNG } from "pngjs";
// import EscPosEncoder from "esc-pos-encoder";

// export async function GET(req: Request) {
//   try {
//     // 🔥 AUTH CHECK HERE
//     const { userId } = auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const url = searchParams.get("url");
//     if (!url) {
//       return NextResponse.json({ error: "Missing logo URL" }, { status: 400 });
//     }

//     const response = await fetch(url);
//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Decode PNG
//     const png = PNG.sync.read(buffer);

//     // ESC/POS raster image
//     const encoder = new EscPosEncoder();
//     const escposData = encoder
//       .initialize()
//       .rasterBitImage(png.data, png.width, png.height, "d24")
//       .encode();

//     return NextResponse.json({
//       escposBase64: Buffer.from(escposData).toString("base64"),
//     });
//   } catch (err: any) {
//     console.error("Logo conversion error:", err);
//     return NextResponse.json(
//       { error: "Failed to convert logo", details: err.message },
//       { status: 500 }
//     );
//   }
// }













import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import fetch from "node-fetch";
import { PNG } from "pngjs";
import EscPosEncoder from "esc-pos-encoder";

export async function GET(req: Request) {
  try {
    // 🔥 AUTH CHECK HERE — MUST AWAIT
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "Missing logo URL" },
        { status: 400 }
      );
    }

    // Fetch remote logo
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Decode PNG to RGBA
    const png = PNG.sync.read(buffer);

    // Convert to ESC/POS raster format
    const encoder = new EscPosEncoder();
    const escposData = encoder
      .initialize()
      .rasterBitImage(png.data, png.width, png.height, "d24")
      .encode();

    return NextResponse.json({
      escposBase64: Buffer.from(escposData).toString("base64"),
    });
  } catch (err: any) {
    console.error("Logo conversion error:", err);
    return NextResponse.json(
      {
        error: "Failed to convert logo",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
