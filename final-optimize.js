
import sharp from 'sharp';
import fs from 'fs';

const input = 'public/sfondo-mobile.png';
const output = 'public/sfondo-mobile.webp';

sharp(input)
    .resize({ width: 480 }) // Smallest acceptable mobile width
    .webp({
        quality: 40,      // Low quality (it's a background, details matter less)
        effort: 6,
        smartSubsample: true
    })
    .toFile(output)
    .then(info => {
        console.log('Final Optimization complete:', info);
        const stats = fs.statSync(output);
        console.log(`Final File Size: ${(stats.size / 1024).toFixed(2)} KB`);
    })
    .catch(err => console.error('Error:', err));
