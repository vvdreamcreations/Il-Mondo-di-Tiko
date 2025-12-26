const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/Carosello/full';
const quality = 85;

// File da convertire
const filesToConvert = [
    '03.png',
    '04.png',
    '06.png',
    '1.png',
    '10.png',
    '12.png',
    '16.png',
    'Coniglietto 1.jpg',
    'Coniglietto 2.jpg',
    'Coniglietto 3.jpg',
    'Pennello 1.jpg',
    'Pennello 2.jpg',
    'Pennello 3.jpg'
];

async function convertToWebP(filename) {
    const inputPath = path.join(inputDir, filename);
    const outputFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(inputDir, outputFilename);

    try {
        console.log(`Converting ${filename}...`);
        await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);

        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

        console.log(`✓ ${filename} → ${outputFilename}`);
        console.log(`  Size: ${(inputSize / 1024 / 1024).toFixed(2)}MB → ${(outputSize / 1024 / 1024).toFixed(2)}MB (-${reduction}%)`);
    } catch (error) {
        console.error(`✗ Error converting ${filename}:`, error.message);
    }
}

async function convertAll() {
    console.log('========================================');
    console.log('Conversione Immagini Gallery a WebP');
    console.log('========================================\n');

    for (const file of filesToConvert) {
        await convertToWebP(file);
        console.log('');
    }

    console.log('========================================');
    console.log('Conversione completata!');
    console.log('========================================');
}

convertAll().catch(console.error);
