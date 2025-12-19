# 🔧 Fix CORS per Google Sheets API

## Problema
Il sondaggio mostra "Impossibile caricare il sondaggio" perché Apps Script blocca le richieste da vvdreamcreations.it (CORS error).

## Soluzione

### STEP 1: Aggiorna Script Apps Script

1. Apri [Google Sheets](https://docs.google.com/spreadsheets/d/18F4Kvou3fk5KdrdulEJKrH5cKp0bW8ztOLQBE6XfuZY/edit)
2. Menu **Estensioni** → **Apps Script**
3. **CANCELLA TUTTO il codice attuale**
4. **Copia-incolla ESATTAMENTE questo nuovo codice**:

```javascript
// VV Dream Creations - Sondaggio API con CORS Fix

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
  
  const data = sheet.getRange(2, 1, 4, 4).getValues();
  
  const topics = {};
  data.forEach(row => {
    const [id, name, emoji, votes] = row;
    topics[id] = {
      id: id,
      name: name,
      emoji: emoji,
      votes: Number(votes) || 0
    };
  });
  
  const result = {
    success: true,
    topics: topics,
    totalVotes: data.reduce((sum, row) => sum + (Number(row[3]) || 0), 0)
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
    const params = JSON.parse(e.postData.contents);
    const topicId = params.topicId;
    
    if (!topicId) {
      return createResponse({ success: false, error: 'Missing topicId' });
    }
    
    const data = sheet.getRange(2, 1, 4, 1).getValues();
    let rowIndex = -1;
    
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === topicId) {
        rowIndex = i + 2;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return createResponse({ success: false, error: 'Topic not found' });
    }
    
    const currentVotes = sheet.getRange(rowIndex, 4).getValue() || 0;
    sheet.getRange(rowIndex, 4).setValue(currentVotes + 1);
    
    return createResponse({ success: true, message: 'Vote recorded', newVotes: currentVotes + 1 });
    
  } catch (error) {
    return createResponse({ success: false, error: error.toString() });
  }
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### STEP 2: Salva

1. Click **Salva** (💾 o Ctrl+S)
2. Assicurati che si chiami "Sondaggio API"

### STEP 3: RE-DEPLOY (Importante!)

1. Click **Deploy** → **Gestisci distribuzioni**
2. Click icona **matita** ✏️ sulla distribuzione esistente
3. In basso, **"Nuova versione"** → Scrivi: `Fix CORS`
4. Click **"Distribuisci"**
5. **Copia il nuovo URL `/exec`** (potrebbe essere cambiato)
6. **Mandamelo di nuovo!**

### STEP 4: Verifica

Apri nel browser l'URL `/exec` che ti danno.

Dovresti vedere:
```json
{
  "success": true,
  "topics": {
    "fear": {"id":"fear","name":"La paura","emoji":"😱","votes":0},
    ...
  },
  "totalVotes": 0
}
```

---

## ⚠️ Checklist Verifica

- [ ] Cancellato vecchio codice Apps Script
- [ ] Incollato nuovo codice con CORS fix
- [ ] Salvato
- [ ] Re-deployed (matita → nuova versione)
- [ ] Copiato nuovo URL `/exec`
- [ ] Testato URL nel browser → vedo JSON
- [ ] Mandato URL nuovo all'assistente

---

Dopo questi passaggi, il sondaggio funzionerà! 🚀
