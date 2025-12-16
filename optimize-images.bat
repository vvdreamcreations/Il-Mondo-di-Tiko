@echo off
echo ========================================
echo   Ottimizzatore Immagini Gallery
echo ========================================
echo.
echo Questo script crea thumbnail 400x400px WebP
echo delle tue immagini per la Gallery
echo.
echo REQUISITO: ImageMagick installato
echo Installa con: winget install ImageMagick.ImageMagick
echo.
pause

cd public\Carosello

echo.
echo Creando thumbnail...
echo.

for %%f in (full\*.png full\*.jpg) do (
    echo Processando: %%~nxf
    magick "%%f" -resize 400x400^ -gravity center -extent 400x400 -quality 85 -define webp:lossless=false "thumbs\%%~nf.webp"
)

echo.
echo ========================================
echo   Completato!
echo ========================================
echo.
echo Thumbnail create in: public\Carosello\thumbs\
echo.
echo Prossimo passo: Modifica Gallery.tsx
echo.
pause
