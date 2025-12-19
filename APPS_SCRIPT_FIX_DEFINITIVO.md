# ⚠️ URGENTE: Apps Script NON Aggiornato

## 🔍 Problema Confermato

Ho testato il sito live e confermato:

✅ **Frontend Funziona**: Invia correttamente `{"topicId":"sadness", "previousVote":"jealousy"}`  
❌ **Backend NON Funziona**: Apps Script ignora `previousVote` e aggiunge sempre voti

---

## ✅ SOLUZIONE: Aggiorna Apps Script ORA

### **Passo 1: Apri Apps Script**
1. Vai a [Google Sheet](https://docs.google.com/spreadsheets/d/18F4Kvou3fk5KdrdulEJKrH5cKp0bW8ztOLQBE6XfuZY/edit)
2. Menu → **Estensioni** → **Apps Script**

### **Passo 2: SOSTITUISCI TUTTO con questo codice**

```javascript
/**
 * VV Dream Creations - Sondaggio API con Voto Unico
 * Gestisce sostituzione voto precedente
 */

// GET: Leggi dati sondaggio
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
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      topics: topics,
      totalVotes: totalVotes
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// POST: Salva voto con sostituzione
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
    var params = JSON.parse(e.postData.contents);
    var topicId = params.topicId;
    var previousVote = params.previousVote || null;
    
    Logger.log('POST ricevuto - topicId: ' + topicId + ', previousVote: ' + previousVote);
    
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
    
    // Trova righe
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
          error: 'Topic not found: ' + topicId
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // DECREMENTA voto precedente se esiste e diverso
    if (oldRowIndex !== -1 && oldRowIndex !== newRowIndex) {
      var oldVotes = sheet.getRange(oldRowIndex, 4).getValue() || 0;
      sheet.getRange(oldRowIndex, 4).setValue(Math.max(0, oldVotes - 1));
      Logger.log('Decrementato voto precedente, riga ' + oldRowIndex + ': ' + oldVotes + ' -> ' + Math.max(0, oldVotes - 1));
    }
    
    // INCREMENTA nuovo voto SOLO se diverso dal precedente
    if (oldRowIndex !== newRowIndex) {
      var currentVotes = sheet.getRange(newRowIndex, 4).getValue() || 0;
      sheet.getRange(newRowIndex, 4).setValue(currentVotes + 1);
      Logger.log('Incrementato nuovo voto, riga ' + newRowIndex + ': ' + currentVotes + ' -> ' + (currentVotes + 1));
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Vote recorded',
        replaced: oldRowIndex !== -1 && oldRowIndex !== newRowIndex,
        debug: {
          topicId: topicId,
          previousVote: previousVote,
          oldRow: oldRowIndex,
          newRow: newRowIndex
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Errore: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### **Passo 3: Salva e Testa**
1. **Salva** (Ctrl+S)
2. Click **Esegui** → Scegli `doGet` → Deve dire "Esecuzione completata"
3. **NON serve rideploy** (URL rimane uguale)

### **Passo 4: Verifica Immediata**
1. Vai su sito → CTRL+F5
2. Vota un tema → Conta voti
3. **Cambia voto** → Conta di nuovo
4. **TOTALE DEVE RIMANERE UGUALE** ✅

---

## 🎯 Come Funziona

**Quando cambi voto da "Gelosia" → "Tristezza":**

```
Frontend invia: {"topicId":"sadness", "previousVote":"jealousy"}
         ↓
Apps Script:
  1. Cerca riga "jealousy" → Decrementa (-1)
  2. Cerca riga "sadness" → Incrementa (+1)
  3. Totale rimane UGUALE ✅
```

**Risultato**: 1 utente = 1 voto, sempre!

---

## 📊 Verifica Google Sheet

Dopo l'aggiornamento, controlla colonna D:
- Solo il tema selezionato ha +1
- Tema precedente ha -1
- Totale accurato

**Fatto! Sistema voto unico attivo.** 🎉
