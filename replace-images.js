import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const images = [
    'il-mondo-di-tiko-logo.webp',
    'tiko-mascot.webp',
    'sfondo-bosco-statico.webp',
    'vv-dream-creations-logo.webp'
];

console.log('🔄 Replacing images with optimized versions...');

for (const img of images) {
    const optimizedPath = path.join(publicDir, `optimized-${img}`);
    const originalPath = path.join(publicDir, img);

    if (fs.existsSync(optimizedPath)) {
        try {
            // Remove original
            if (fs.existsSync(originalPath)) {
                fs.unlinkSync(originalPath);
            }
            // Rename optimized to original
            fs.renameSync(optimizedPath, originalPath);
            console.log(`✅ Replaced: ${img}`);
        } catch (err) {
            console.error(`❌ Error replacing ${img}:`, err);
        }
    } else {
        console.warn(`⚠️ Optimized file not found: ${optimizedPath}`);
    }
}
console.log('✨ All images updated.');
