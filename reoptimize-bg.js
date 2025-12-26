
import sharp from 'sharp';
import fs from 'fs';

const input = 'public/sfondo-mobile.png';
const output = 'public/sfondo-mobile.webp';

sharp(input)
    .resize({ width: 600 }) // Resize to 600px width (good enough for mobile bg)
    .webp({
        quality: 50,      // Aggressive quality reduction for background
        effort: 6,
        smartSubsample: true,
        alphaQuality: 50
    })
    .toFile(output)
    .then(info => {
        console.log('Optimization complete:', info);
        const stats = fs.statSync(output);
        console.log(`Final File Size: ${(stats.size / 1024).toFixed(2)} KB`);
    })
    .catch(err => console.error('Error:', err));
