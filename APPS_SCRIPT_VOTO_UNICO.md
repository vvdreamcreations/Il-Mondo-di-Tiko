# 🔧 Apps Script - Voto Unico (Sostituzione)

## Script Aggiornato con Logica Voto Unico

Sostituisci **tutto** il codice Apps Script con questo:

```javascript
/**
 * VV Dream Creations - Sondaggio API
 * Supporta voto unico: sostituisce voto precedente invece di aggiungerne uno nuovo
 */

// Gestisce richieste GET (leggi dati)
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
  var data = sheet.getRange(2, 1, 4, 4).getValues();
  var topics = {};
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    topics[row[0]] = {
      id: row[0],
      name: row[1],
      emoji: row[2],
      votes: Number(row[3]) || 0
    };
  }
  
  var totalVotes = 0;
  for (var i = 0; i < data.length; i++) {
    totalVotes += Number(data[i][3]) || 0;
  }
  
  var result = {
    success: true,
    topics: topics,
    totalVotes: totalVotes
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Gestisce richieste POST (salva voto con sostituzione)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
    var params = JSON.parse(e.postData.contents);
    var topicId = params.topicId;
    var previousVote = params.previousVote || null;
    
    if (!topicId) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing topicId'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = sheet.getRange(2, 1, 4, 1).getValues();
    var newRowIndex = -1;
    var oldRowIndex = -1;
    
    // Trova riga del nuovo tema
    for (var i = 0; i < data.length; i++) {
      if (data[i][0] === topicId) {
        newRowIndex = i + 2;
      }
      if (previousVote && data[i][0] === previousVote) {
        oldRowIndex = i + 2;
      }
    }
    
    if (newRowIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Topic not found'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Se c'è un voto precedente diverso, decrementalo
    if (oldRowIndex !== -1 && oldRowIndex !== newRowIndex) {
      var oldVotes = sheet.getRange(oldRowIndex, 4).getValue() || 0;
      sheet.getRange(oldRowIndex, 4).setValue(Math.max(0, oldVotes - 1));
    }
    
    // Incrementa il nuovo tema SOLO se è diverso dal precedente
    if (oldRowIndex !== newRowIndex) {
      var currentVotes = sheet.getRange(newRowIndex, 4).getValue() || 0;
      sheet.getRange(newRowIndex, 4).setValue(currentVotes + 1);
    }
    
    var result = {
      success: true,
      message: 'Vote recorded',
      replaced: oldRowIndex !== -1 && oldRowIndex !== newRowIndex
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Cosa Fa

**Voto Precedente**:
- Frontend invia `topicId` (nuovo voto) + `previousVote` (voto precedente)
- Se `previousVote` esiste e ≠ `topicId`: decrementa vecchio tema
- Incrementa nuovo tema SOLO se diverso dal precedente

**Risultato**:
- ✅ Un utente = un voto
- ✅ Può cambiare scelta
- ✅ Totale voti rimane corretto

## Deploy

1. Apri Apps Script
2. Sostituisci tutto con questo codice
3. Salva (Ctrl+S)
4. Test: Esegui `doGet`
5. **NON serve rideploy** - URL rimane uguale
6. Fatto! ✅
