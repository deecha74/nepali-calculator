const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImages() {
  const faviconSrc = 'C:/Users/Dell/.gemini/antigravity/brain/5fd2866b-ba60-4f0c-a7f2-60fd13d008d0/.user_uploaded/media_1794215539194_e2949a88.png';
  const logoSrc = 'C:/Users/Dell/.gemini/antigravity/brain/5fd2866b-ba60-4f0c-a7f2-60fd13d008d0/.user_uploaded/media_1794215553536_3d6f36f9.png';

  console.log('Generating favicon.ico from:', faviconSrc);

  const sizes = [16, 32, 48, 64, 128, 256];
  const pngBuffers = [];

  for (const s of sizes) {
    const buf = await sharp(faviconSrc).resize(s, s).png().toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(sizes.length, 4); // count

  let offset = 6 + (16 * sizes.length);
  const dirEntries = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('app/favicon.ico', icoBuffer);
  console.log('favicon.ico successfully replaced in public/ and app/ (size: ' + icoBuffer.length + ' bytes)');

  // Also write PNG icons for web and mobile devices
  await sharp(faviconSrc).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(faviconSrc).resize(192, 192).png().toFile('public/favicon.png');
  await sharp(faviconSrc).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(faviconSrc).resize(16, 16).png().toFile('public/favicon-16x16.png');
  console.log('PNG favicons generated in public/');

  // Second image: Logo
  console.log('Processing second image for logo:', logoSrc);
  
  // Save high-resolution PNG logo and webp logo
  // Check if logo needs trimming or has transparency
  const logoImage = sharp(logoSrc);
  await logoImage.clone().png({ quality: 100 }).toFile('public/logo.png');
  await logoImage.clone().png({ quality: 100 }).toFile('public/nepalicalc-logo.png');
  await logoImage.clone().webp({ quality: 95 }).toFile('public/logo.webp');
  await logoImage.clone().webp({ quality: 95 }).toFile('public/nepalicalc-logo.webp');
  console.log('Logo saved to public/logo.png, public/nepalicalc-logo.png, and webp versions.');

  const meta = await sharp(logoSrc).metadata();
  console.log('Logo dimensions:', meta.width, 'x', meta.height);
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});

