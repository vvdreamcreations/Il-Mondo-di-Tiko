# Raccomandazioni: Limitare Memoria Language Server

## Problema
Il process `language_server_windows_x64.exe` di Antigravity usa >8GB di RAM.

## Soluzioni Implementate

Abbiamo già ottimizzato:
- ✅ `.aiignore` - esclude file pesanti
- ✅ `tsconfig.json` - esclude directory non necessarie

## Raccomandazioni Aggiuntive

### 1. Impostazioni VSCode (se usi VSCode)

Crea `.vscode/settings.json`:

```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/public/Carosello/**": true,
    "**/public/Foglie/**": true,
    "**/public/Effetti-Luce/**": true,
    "**/*.webp": true,
    "**/*.png": true,
    "**/*.jpg": true,
    "**/*.mp4": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/public/**/*.webp": true,
    "**/public/**/*.png": true,
    "**/public/**/*.jpg": true,
    "**/public/**/*.mp4": true
  },
  "typescript.tsserver.maxTsServerMemory": 2048,
  "files.exclude": {
    "**/.git": true,
    "**/.vite": true,
    "**/dist": true
  }
}
```

### 2. Riavvia il Language Server

Dopo aver applicato le modifiche:
1. Chiudi completamente l'IDE
2. Riapri il progetto
3. Attendi l'indicizzazione completa
4. Monitora la RAM in Task Manager

**Risultato Atteso**: da >8GB a ~1.5-2GB

### 3. Se Antigravity Continua a Usare Troppa RAM

Opzioni:
- Disabilita temporaneamente Antigravity quando non lo usi
- Segnala il problema al team di Google Deepmind
- Usa un editor più leggero per modifiche rapide (es. Notepad++)

### 4. Monitoraggio Continuo

Usa questo comando PowerShell per monitorare:
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*language*"} | Select-Object ProcessName, @{Name="MemoryMB";Expression={[math]::Round($_.WorkingSet64/1MB,2)}}
```

## Note

Le ottimizzazioni fatte dovrebbero ridurre significativamente la memoria. Se il problema persiste, potrebbe essere un bug del language server che va segnalato.
