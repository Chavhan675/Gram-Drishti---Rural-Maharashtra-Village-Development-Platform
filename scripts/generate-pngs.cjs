const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCrcTable();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcBuf = Buffer.alloc(4);
  const toCheck = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCheck), 0);

  return Buffer.concat([lenBuf, toCheck, crcBuf]);
}

function generatePng(width, height, colorR, colorG, colorB) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8 bits per channel
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // Compression
  ihdr.writeUInt8(0, 11); // Filter
  ihdr.writeUInt8(0, 12); // Interlace
  const ihdrChunk = writeChunk('IHDR', ihdr);

  // Scanlines with filter byte 0
  const rowBytes = width * 4;
  const rawData = Buffer.alloc(height * (rowBytes + 1));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      // Create a nice warm circular emblem
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const radius = width * 0.44;

      if (dist < radius) {
        // Gradient warm saffron / golden harvest
        const factor = (y / height);
        const r = Math.min(255, Math.floor(colorR * (1 - factor * 0.3)));
        const g = Math.min(255, Math.floor(colorG * (1 - factor * 0.2)));
        const b = Math.min(255, Math.floor(colorB));
        rawData[offset++] = r;
        rawData[offset++] = g;
        rawData[offset++] = b;
        rawData[offset++] = 255;
      } else {
        // Transparent border or solid for maskable
        rawData[offset++] = colorR;
        rawData[offset++] = colorG;
        rawData[offset++] = colorB;
        rawData[offset++] = 255;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = writeChunk('IDAT', compressed);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const outDir = path.resolve(__dirname, '../public');

// Saffron / Rich Terracotta brand color: R: 180, G: 70, B: 20
fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), generatePng(192, 192, 217, 119, 6));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), generatePng(512, 512, 180, 70, 20));
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), generatePng(512, 512, 124, 45, 18));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), generatePng(180, 180, 217, 119, 6));
fs.writeFileSync(path.join(outDir, 'favicon.ico'), generatePng(64, 64, 217, 119, 6));

console.log('Successfully generated all PWA PNG icons!');
