# 🔧 Fix Finale Apps Script - CORS Completo

## Problema Identificato

**Errore browser**: `CORS policy: Response to preflight request doesn't pass access control check`

**Causa**: Apps Script non risponde correttamente alle richieste OPTIONS (preflight CORS)

## Soluzione: Script Apps Script COMPLETO con CORS

### IMPORTANTE: Copia ESATTAMENTE questo script

1. Apri [Google Sheets](https://docs.google.com/spreadsheets/d/18F4Kvou3fk5KdrdulEJKrH5cKp0bW8ztOLQBE6XfuZY/edit)
2. Menu → **Estensioni** → **Apps Script**
3. **SOSTITUISCI TUTTO** con questo codice:

```javascript
/**
 * VV Dream Creations - Sondaggio API
 * Con supporto CORS completo
 */

// Gestisce richieste OPTIONS per CORS preflight
function doOptions(e) {
  return getCorsResponse();
}

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
  
  return getCorsResponse(JSON.stringify(result));
}

// Gestisce richieste POST (salva voto)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
    var params = JSON.parse(e.postData.contents);
    var topicId = params.topicId;
    
    if (!topicId) {
      return getCorsResponse(JSON.stringify({
        success: false,
        error: 'Missing topicId'
      }));
    }
    
    var data = sheet.getRange(2, 1, 4, 1).getValues();
    var rowIndex = -1;
    
    for (var i = 0; i < data.length; i++) {
      if (data[i][0] === topicId) {
        rowIndex = i + 2;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return getCorsResponse(JSON.stringify({
        success: false,
        error: 'Topic not found'
      }));
    }
    
    var currentVotes = sheet.getRange(rowIndex, 4).getValue() || 0;
    sheet.getRange(rowIndex, 4).setValue(currentVotes + 1);
    
    var result = {
      success: true,
      message: 'Vote recorded',
      newVotes: currentVotes + 1
    };
    
    return getCorsResponse(JSON.stringify(result));
    
  } catch (error) {
    return getCorsResponse(JSON.stringify({
      success: false,
      error: error.toString()
    }));
  }
}

// Helper: Crea risposta con header CORS
function getCorsResponse(content) {
  var output = ContentService.createTextOutput(content || '');
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Header CORS essenziali
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  output.setHeader('Access-Control-Max-Age', '3600');
  
  return output;
}
```

### Passaggi Deploy

4. **Salva** (Ctrl+S)
5. **Test**: Click **Esegui** → scegli `doGet`
   - Dovrebbe dire "Esecuzione completata" ✅
6. **Deploy**:
   - Click **Deploy** → **Gestisci distribuzioni**
   - Click **cestino** 🗑️ sulla distribuzione vecchia
   - Click **Deploy** → **Nuova distribuzione**
   - Ingranaggio ⚙️ → **Web app**
   - **Chi ha accesso**: **Chiunque**
   - Click **Distribuisci**
7. **Copia nuovo URL `/exec`**
8. **Test URL**: Apri nel browser
   - Dovrebbe mostrare JSON con topics
9. **Mandami nuovo URL**

---

## Cosa Cambia

**Prima**: Script non gestiva OPTIONS → CORS falliva  
**Dopo**: 
- `doOptions()` risponde a preflight
- Tutti i metodi includono header CORS  
- POST funziona correttamente

---

Fai questi passaggi e mandami il nuovo URL!
