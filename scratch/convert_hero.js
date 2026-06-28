import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const brainImage = 'C:/Users/marya/.gemini/antigravity/brain/500035ab-d4e4-4285-86d1-1c7a3beb07f4/hero_riyadh_v2_1782642268196.png';
const localImage = './scratch/hero_riyadh_v2.png';
const outputDir = './public/images';

async function generateImages() {
  try {
    console.log('Copying image locally...');
    fs.copyFileSync(brainImage, localImage);
    console.log('Image copied successfully. Generating optimized hero images...');

    // Ensure output dir exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 1200.jpg (fallback)
    await sharp(localImage)
      .resize(1200, 800, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, 'hero-riyadh-1200.jpg'));
    console.log('Generated hero-riyadh-1200.jpg');

    // 1200.webp
    await sharp(localImage)
      .resize(1200, 800, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, 'hero-riyadh-1200.webp'));
    console.log('Generated hero-riyadh-1200.webp');

    // 800.webp
    await sharp(localImage)
      .resize(800, 533, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, 'hero-riyadh-800.webp'));
    console.log('Generated hero-riyadh-800.webp');

    // 1200.avif
    await sharp(localImage)
      .resize(1200, 800, { fit: 'cover' })
      .avif({ quality: 75 })
      .toFile(path.join(outputDir, 'hero-riyadh-1200.avif'));
    console.log('Generated hero-riyadh-1200.avif');

    // 800.avif
    await sharp(localImage)
      .resize(800, 533, { fit: 'cover' })
      .avif({ quality: 75 })
      .toFile(path.join(outputDir, 'hero-riyadh-800.avif'));
    console.log('Generated hero-riyadh-800.avif');

    // Clean up local temp copy
    fs.unlinkSync(localImage);
    console.log('All optimized images generated successfully and temp files cleaned up!');
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

generateImages();
