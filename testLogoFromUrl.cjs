const fs = require("fs");
const fetch = require("node-fetch");
const { PNG } = require("pngjs");

async function convertPngToEscPos(buffer) {
  const png = PNG.sync.read(buffer);

  const width = png.width;
  const height = png.height;

  const bytesPerRow = Math.ceil(width / 8);

  let output = [];

  for (let y = 0; y < height; y++) {
    output.push(0x1B, 0x2A, 0x21, bytesPerRow & 0xFF, (bytesPerRow >> 8) & 0xFF);

    for (let byte = 0; byte < bytesPerRow; byte++) {
      let b = 0;

      for (let bit = 0; bit < 8; bit++) {
        const x = byte * 8 + bit;

        if (x < width) {
          const idx = (width * y + x) * 4;
          const r = png.data[idx];
          const g = png.data[idx + 1];
          const bgr = png.data[idx + 2];

          const gray = (r + g + bgr) / 3;
          const pixel = gray < 128 ? 1 : 0;

          b |= pixel << (7 - bit);
        }
      }

      output.push(b);
    }

    output.push(0x0A);
  }

  return Buffer.from(output);
}

async function run() {
  const url = "https://res.cloudinary.com/digpvlfup/image/upload/v1763467341/uploads/jz30zfvxgiouyv45eeet.png";

  console.log("Downloading...");
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());

  console.log("Converting PNG → ESC/POS...");
  const escpos = await convertPngToEscPos(buffer);

  fs.writeFileSync("logo_escpos.bin", escpos);
  console.log("✅ Saved logo_escpos.bin");
}

run();
