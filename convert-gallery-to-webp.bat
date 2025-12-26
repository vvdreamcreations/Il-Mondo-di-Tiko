@echo off
echo ====================================
echo Conversione Immagini Gallery in WebP
echo ====================================
echo.

echo Installazione @squoosh/cli se necessario...
call npm list -g @squoosh/cli >nul 2>&1
if errorlevel 1 (
    echo Installazione @squoosh/cli...
    call npm install -g @squoosh/cli
)

echo.
echo Conversione immagini PNG...
for %%f in (public\Carosello\full\*.png) do (
    echo Convertendo %%~nxf...
    npx @squoosh/cli --webp "{quality: 85}" "%%f" -d public\Carosello\full\
)

echo.
echo Conversione immagini JPG...
for %%f in (public\Carosello\full\*.jpg) do (
    echo Convertendo %%~nxf...
    npx @squoosh/cli --webp "{quality: 85}" "%%f" -d public\Carosello\full\
)

echo.
echo ====================================
echo Conversione completata!
echo ====================================
echo Le nuove immagini WebP sono state create nella stessa cartella.
echo.
pause
