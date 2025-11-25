"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPngBufferToEscPos = convertPngBufferToEscPos;
var pngjs_1 = require("pngjs");
/**
 * Convert a PNG buffer to a basic ESC/POS raster bit image.
 * Works for logos on most thermal printers.
 */
function convertPngBufferToEscPos(buffer) {
    var png = pngjs_1.PNG.sync.read(buffer);
    var width = png.width;
    var height = png.height;
    var data = png.data; // RGBA data
    var bytesPerRow = Math.ceil(width / 8);
    var totalBytes = bytesPerRow * height;
    var imageBytes = [];
    for (var y = 0; y < height; y++) {
        for (var xByte = 0; xByte < bytesPerRow; xByte++) {
            var byte = 0;
            for (var bit = 0; bit < 8; bit++) {
                var x = xByte * 8 + bit;
                if (x >= width)
                    continue;
                var idx = (y * width + x) * 4;
                var r = data[idx];
                var g = data[idx + 1];
                var b = data[idx + 2];
                var a = data[idx + 3];
                // Simple grayscale + alpha
                var luminance = (0.299 * r + 0.587 * g + 0.114 * b) * (a / 255);
                if (luminance < 128) {
                    byte |= 1 << (7 - bit);
                }
            }
            imageBytes.push(byte);
        }
    }
    var xL = width & 0xff;
    var xH = (width >> 8) & 0xff;
    var yL = height & 0xff;
    var yH = (height >> 8) & 0xff;
    var header = Buffer.from([
        0x1b, 0x40, // Initialize printer
        0x1b, 0x61, 0x01, // Center alignment
        0x1d, 0x76, 0x30, 0x00, xL, xH, yL, yH, // Raster image command
    ]);
    var body = Buffer.from(imageBytes);
    var footer = Buffer.from([0x0a]); // newline at end
    return Buffer.concat([header, body, footer]);
}
