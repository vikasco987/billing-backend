const fs = require("fs");

// Replace this with the base64 returned from your backend ESC/POS conversion
const base64 = "PASTE_YOUR_ESC_POS_BASE64_HERE";

if (!base64 || base64.length === 0) {
  console.error("❌ Base64 string is empty!");
  process.exit(1);
}

const bytes = Buffer.from(base64, "base64");

// Save in the current folder
fs.writeFileSync("logo_escpos.bin", bytes);
console.log("✅ Saved ESC/POS bytes to logo_escpos.bin");
