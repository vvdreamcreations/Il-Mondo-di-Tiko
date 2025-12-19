# 📊 Setup Google Sheets + Apps Script - Guida Completa

## STEP 1: Crea Google Sheet (2 minuti)

### 1.1 Crea Foglio
1. Vai su [sheets.google.com](https://sheets.google.com)
2. Click **"Crea nuovo foglio"** (+ in basso a destra)
3. Rinomina foglio: **"VV Dream Creations - Sondaggio Temi"**

### 1.2 Struttura Dati

**Copia-incolla ESATTAMENTE questa tabella** (incluso header):

| tema_id | tema_nome | emoji | voti |
|---------|-----------|-------|------|
| fear | La paura | 😱 | 0 |
| jealousy | La gelosia tra fratelli | 😠 | 0 |
| sharing | La condivisione | 🤝 | 0 |
| sadness | La tristezza | 😢 | 0 |

**Importante**:
- Riga 1 = Header (tema_id, tema_nome, emoji, voti)
- Righe 2-5 = Dati temi
- Colonna A = ID tema (usato dal codice)
- Colonna D = Contatore voti

### 1.3 Copia URL

1. Copia l'URL completo dalla barra indirizzi
2. Esempio: `https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit`
3. **Mandami questo URL** (lo userò per estrarre ID)

---

## STEP 2: Crea Apps Script API (5 minuti)

### 2.1 Apri Editor Script

1. Nel foglio Google Sheets appena creato
2. Menu: **Estensioni** → **Apps Script**
3. Si apre nuovo tab con editor

### 2.2 Cancella Codice Default

1. Vedi codice:
```javascript
function myFunction() {
  
}
```
2. **Cancella tutto**

### 2.3 Incolla Questo Codice

**Copia-incolla ESATTAMENTE questo script**:

```javascript
// VV Dream Creations - Sondaggio API
// Questo script permette al sito di leggere e scrivere voti

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
  
  // Leggi tutti i dati
  const data = sheet.getRange(2, 1, 4, 4).getValues(); // Righe 2-5, colonne A-D
  
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
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    topics: topics,
    totalVotes: data.reduce((sum, row) => sum + (Number(row[3]) || 0), 0)
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Foglio1');
    const params = JSON.parse(e.postData.contents);
    const topicId = params.topicId;
    
    if (!topicId) {
      return errorResponse('Missing topicId');
    }
    
    // Trova riga del tema
    const data = sheet.getRange(2, 1, 4, 1).getValues(); // Colonna A (IDs)
    let rowIndex = -1;
    
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === topicId) {
        rowIndex = i + 2; // +2 perché partiamo da riga 2
        break;
      }
    }
    
    if (rowIndex === -1) {
      return errorResponse('Topic not found');
    }
    
    // Incrementa voti (colonna D)
    const currentVotes = sheet.getRange(rowIndex, 4).getValue() || 0;
    sheet.getRange(rowIndex, 4).setValue(currentVotes + 1);
    
    return successResponse({ message: 'Vote recorded', newVotes: currentVotes + 1 });
    
  } catch (error) {
    return errorResponse(error.toString());
  }
}

function successResponse(data) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    ...data
  })).setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: message
  })).setMimeType(ContentService.MimeType.JSON);
}
```

### 2.4 Salva Script

1. Click icona **💾 "Salva progetto"** (o Ctrl+S)
2. Rinomina progetto: **"Sondaggio API"**
3. Click **"Salva"**

---

## STEP 3: Deploy Come Web App (3 minuti)

### 3.1 Deploy

1. Click **"Deploy"** (blu in alto a destra) → **"Nuova distribuzione"**
2. Click icona ingranaggio ⚙️ → **"Web app"**

### 3.2 Configurazione Deploy

**Compila così**:
- **Descrizione**: `Sondaggio API v1`
- **Esegui come**: `Me (info@vvdreamcreations.it)` o il tuo account
- **Chi ha accesso**: **Chiunque** ⚠️ IMPORTANTE
- Click **"Esegui distribuzione"**

### 3.3 Autorizza

1. Click **"Autorizza accesso"**
2. Scegli tuo account Google
3. Click **"Avanzate"** (in basso)
4. Click **"Vai a Sondaggio API (non sicuro)"** (è sicuro, tranquilla!)
5. Click **"Allow" / "Consenti"**

### 3.4 COPIA URL API

Vedrai:
```
Web app
URL: https://script.google.com/macros/s/ABC123XYZ.../exec
```

**📋 COPIA QUESTO URL COMPLETO** e mandamelo!

**Esempio**:
```
https://script.google.com/macros/s/AKfycbyABC123XYZ456.../exec
```

---

## STEP 4: Test Veloce (1 minuto)

### 4.1 Test Lettura

1. Apri nuovo tab browser
2. Incolla URL API
3. Premi Invio

**Dovresti vedere**:
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

✅ **Se vedi questo = FUNZIONA!**

---

## ✅ Checklist Completa

Quando hai finito, mandami:
- [ ] ✅ URL Google Sheet (per verifica)
- [ ] ✅ URL API Apps Script (il link `/exec`)

Poi procedo con:
1. Integrazione API nel sondaggio
2. Fix bug voto modificabile
3. Fix messaggi persistenti
4. Creazione pagina "La Tua Voce"
5. Navbar riorganizzata
6. Deploy tutto

---

## 🆘 Problemi Comuni

**"Autorizzazione negata"**
→ Assicurati "Chi ha accesso" = "Chiunque"

**"URL non funziona"**
→ Copia URL intero, incluso `/exec` finale

**"Non vedo JSON"**
→ Controlla che struttura Sheet sia esatta (riga 1 = header, righe 2-5 = dati)

---

Fai questi passaggi e dimmi quando hai URL! 🚀
