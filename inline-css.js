import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function inlineCss() {
    console.log('🚀 Inlining Critical CSS...');

    const distDir = path.resolve('dist');
    const htmlPath = path.join(distDir, 'index.html');

    if (!fs.existsSync(htmlPath)) {
        console.error('❌ dist/index.html not found. Run build first.');
        process.exit(1);
    }

    let html = fs.readFileSync(htmlPath, 'utf-8');

    // Find the CSS file in assets
    // Vite generates assets/index.[hash].css
    const textCssFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.css'));

    if (textCssFiles.length === 0) {
        console.log('⚠️ No CSS files found in dist/assets');
        return;
    }

    // Assuming one main css file or we inline all of them
    for (const cssFile of textCssFiles) {
        const cssPath = path.join(distDir, 'assets', cssFile);
        const cssContent = fs.readFileSync(cssPath, 'utf-8');

        console.log(`📦 Inlining ${cssFile} (${(cssContent.length / 1024).toFixed(2)} KB)`);

        // Replace the link tag with style tag
        // Vite link tag looks like: <link rel="stylesheet" crossorigin href="/assets/index.D...css">
        // We match by filename to be safe
        const linkRegex = new RegExp(`<link[^>]*href=["']\/assets\/${cssFile}["'][^>]*>`, 'i');

        if (linkRegex.test(html)) {
            html = html.replace(linkRegex, `<style>${cssContent}</style>`);
            console.log('✅ CSS injected into HTML');

            // Optional: Remove the original CSS file? 
            // Better to keep it if referenced elsewhere, but for pure inline it's redundant.
            // Let's keep it for safety unless we want to be super clean.
            // fs.unlinkSync(cssPath); 
        } else {
            console.warn(`⚠️ Could not find link tag for ${cssFile}`);
        }
    }

    fs.writeFileSync(htmlPath, html);
    console.log('✨ HTML updated with inlined CSS');
}

inlineCss().catch(console.error);
