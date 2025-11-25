// src/lib/escpos/convertLogo.ts
import escpos from "node-escpos";
import { PNG } from "pngjs";

export async function convertPngBase64ToEscPos(base64Png: string) {
  const buffer = Buffer.from(base64Png, "base64");

  // Decode PNG
  const png = PNG.sync.read(buffer);

  // Use escpos Image
  const image = await escpos.Image.load(buffer);

  const device = new escpos.Console(); // Generates ESC/POS commands in memory
  const printer = new escpos.Printer(device);

  device.open(() => {});

  printer
    .align("ct")
    .raster(image)
    .newline();

  return Buffer.from(device.buffer);
}
