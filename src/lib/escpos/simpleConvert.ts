import { PNG } from "pngjs";

/**
 * Convert a PNG buffer to a basic ESC/POS raster bit image.
 * Works for logos on most thermal printers.
 */
export function convertPngBufferToEscPos(buffer: Buffer) {
  const png = PNG.sync.read(buffer);

  const width = png.width;
  const height = png.height;
  const data = png.data; // RGBA data

  const bytesPerRow = Math.ceil(width / 8);
  const totalBytes = bytesPerRow * height;

  const imageBytes: number[] = [];

  for (let y = 0; y < height; y++) {
    for (let xByte = 0; xByte < bytesPerRow; xByte++) {
      let byte = 0;
      for (let bit = 0; bit < 8; bit++) {
        const x = xByte * 8 + bit;
        if (x >= width) continue;

        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // Simple grayscale + alpha
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) * (a / 255);
        if (luminance < 128) {
          byte |= 1 << (7 - bit);
        }
      }
      imageBytes.push(byte);
    }
  }

  const xL = width & 0xff;
  const xH = (width >> 8) & 0xff;
  const yL = height & 0xff;
  const yH = (height >> 8) & 0xff;

  const header = Buffer.from([
    0x1b, 0x40,        // Initialize printer
    0x1b, 0x61, 0x01,  // Center alignment
    0x1d, 0x76, 0x30, 0x00, xL, xH, yL, yH, // Raster image command
  ]);

  const body = Buffer.from(imageBytes);
  const footer = Buffer.from([0x0a]); // newline at end

  return Buffer.concat([header, body, footer]);
}
