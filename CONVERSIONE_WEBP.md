# Guida Rapida: Conversione Immagini Gallery in WebP

## Opzione 1: Usando uno strumento online (PIÙ SEMPLICE)

1. Vai su https://squoosh.app/
2. Trascina i file da `public\Carosello\full\` (solo PNG e JPG)
3. Seleziona formato **WebP** con qualità **85%**
4. Scarica i file convertiti
5. Sostituisci i file nella cartella `public\Carosello\full\`

## Opzione 2: Usando NPM (se hai Node.js)

```powershell
# Installa sharp
npm install -g sharp-cli

# Converti PNG
sharp -i "public/Carosello/full/*.png" -o "public/Carosello/full/{name}.webp" --webp '{"quality":85}'

# Converti JPG
sharp -i "public/Carosello/full/*.jpg" -o "public/Carosello/full/{name}.webp" --webp '{"quality":85}'
```

## File da Convertire

I seguenti file devono essere convertiti in WebP:

**PNG (7 file)**:
- 03.png (6.2 MB)
- 04.png (12.9 MB) 
- 06.png (5.5 MB)
- 1.png (9.2 MB)
- 10.png (4.1 MB)
- 12.png (9.0 MB)
- 16.png (4.3 MB)

**JPG (6 file)**:
- Coniglietto 1.jpg
- Coniglietto 2.jpg
- Coniglietto 3.jpg
- Pennello 1.jpg
- Pennello 2.jpg
- Pennello 3.jpg

## Dopo la Conversione

1. Verifica che tutti i file `.webp` siano creati
2. Testa il sito con `npm run dev`
3. Se tutto funziona, puoi eliminare i vecchi PNG/JPG per risparmiare spazio

## Nota Importante

Il codice è già stato aggiornato per usare i file WebP. Devi solo creare i file mancanti.
