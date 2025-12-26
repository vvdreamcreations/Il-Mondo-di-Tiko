@echo off
echo ====================================
echo Test Rapido Memoria - Il Mondo di Tiko
echo ====================================
echo.

echo Avvio del server di sviluppo...
echo.
echo ISTRUZIONI:
echo 1. Attendi che il server sia avviato
echo 2. Apri Chrome DevTools (F12)
echo 3. Vai su "Performance" ^> "Memory"
echo 4. Fai uno snapshot all'avvio
echo 5. Naviga per 2-3 minuti
echo 6. Fai un altro snapshot
echo 7. Confronta l'utilizzo di memoria
echo.
echo RISULTATO ATTESO: ^<500MB (prima era ^>2GB)
echo.
pause

npm run dev
