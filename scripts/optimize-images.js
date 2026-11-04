const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const imagesToOptimize = [
  'dashain-banner.jpg',
  'himalayan-mountains-parallax.jpg',
  'nepal-hero-panorama.jpg',
  'nepal-patro-heritage.jpg',
  'hero-calc-3d.jpg'
];

async function run() {
  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img);
    const outputPath = path.join(publicDir, img.replace('.jpg', '.webp'));
    if (fs.existsSync(inputPath)) {
      const inputStat = fs.statSync(inputPath);
      await sharp(inputPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);
      const outputStat = fs.statSync(outputPath);
      const reduction = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);
      console.log(`${img}: ${(inputStat.size / 1024).toFixed(0)}KB -> ${path.basename(outputPath)}: ${(outputStat.size / 1024).toFixed(0)}KB (-${reduction}%)`);
    }
  }
}

run().catch(console.error);

