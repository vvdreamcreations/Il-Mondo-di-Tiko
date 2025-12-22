import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Define images to resize
const images = [
    { name: 'il-mondo-di-tiko-logo.webp', width: 800 },
    { name: 'tiko-mascot.webp', width: 600 },
    { name: 'sfondo-bosco-statico.webp', width: 1080 },
    { name: 'vv-dream-creations-logo.webp', width: 500 }
];

async function resizeImages() {
    console.log('🖼️  Starting image resizing...');
    const publicDir = path.join(process.cwd(), 'public');

    for (const img of images) {
        const inputPath = path.join(publicDir, img.name);
        const outputPath = path.join(publicDir, `optimized-${img.name}`);

        if (!fs.existsSync(inputPath)) {
            console.warn(`⚠️  File not found: ${inputPath}`);
            continue;
        }

        try {
            console.log(`Processing: ${img.name} -> optimized-${img.name} (${img.width}px)`);

            await sharp(inputPath)
                .resize({ width: img.width, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`✅ Success: ${outputPath}`);
        } catch (error) {
            console.error(`❌ Error processing ${img.name}:`, error);
        }
    }
    console.log('✨ Image processing complete.');
}

resizeImages().catch(err => console.error(err));
