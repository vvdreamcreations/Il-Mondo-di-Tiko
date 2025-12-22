# Script PowerShell per convertire immagini PNG/JPG in WebP
# Richiede installazione di cwebp.exe (libwebp)

$imagesToConvert = @(
    "public\tiko-mascot.png",
    "public\tiko-saluta.png", 
    "public\il-mondo-di-tiko-logo.png",
    "public\vv-dream-creations-logo.png",
    "public\tiko-favicon.png"
)

Write-Host "=== Image Optimization Script ===" -ForegroundColor Cyan
Write-Host "This script converts PNG/JPG to WebP format" -ForegroundColor Cyan
Write-Host ""

# Check if cwebp is available
$cwebpPath = Get-Command cwebp -ErrorAction SilentlyContinue

if (-not $cwebpPath) {
    Write-Host "ERROR: cwebp not found!" -ForegroundColor Red
    Write-Host "Please install libwebp tools:" -ForegroundColor Yellow
    Write-Host "  Option 1: Download from https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html" -ForegroundColor Yellow
    Write-Host "  Option 2: Install via package manager (e.g., choco install webp)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Manual conversion alternative:" -ForegroundColor Cyan
    Write-Host "  Use online tools like:" -ForegroundColor Cyan
    Write-Host "  - https://cloudconvert.com/png-to-webp" -ForegroundColor Cyan
    Write-Host "  - https://convertio.co/png-webp/" -ForegroundColor Cyan
    exit 1
}

foreach ($img in $imagesToConvert) {
    if (Test-Path $img) {
        $outputPath = $img -replace '\.(png|jpg|jpeg)$', '.webp'
        Write-Host "Converting: $img" -ForegroundColor Green
        
        # Convert with quality 90 for good balance
        & cwebp -q 90 $img -o $outputPath
        
        if (Test-Path $outputPath) {
            $originalSize = (Get-Item $img).Length / 1KB
            $newSize = (Get-Item $outputPath).Length / 1KB
            $savings = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
            
            Write-Host "  Original: $([math]::Round($originalSize, 2)) KB" -ForegroundColor Gray
            Write-Host "  WebP: $([math]::Round($newSize, 2)) KB" -ForegroundColor Gray
            Write-Host "  Saved: $savings%" -ForegroundColor Cyan
        }
    } else {
        Write-Host "SKIP: $img (not found)" -ForegroundColor Yellow
    }
    Write-Host ""
}

Write-Host "Conversion complete!" -ForegroundColor Green
Write-Host "Remember to update image references in your code from .png to .webp" -ForegroundColor Yellow
