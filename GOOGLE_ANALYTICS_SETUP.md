# 📊 Setup Google Analytics 4 - Guida Completa

## 🎯 Obiettivo

Implementare Google Analytics con tracking completo di:
- ✅ Visite e pageviews
- ✅ Eventi voto sondaggio (con nome tema)
- ✅ Eventi suggerimento tema
- ✅ Click sui libri
- ✅ Iscrizioni newsletter

---

## 📋 Passo 1: Ottieni il Measurement ID

### 1.1 Vai su Google Analytics

Apri: **[https://analytics.google.com](https://analytics.google.com)**

### 1.2 Crea Account (se non ce l'hai già)

- Clicca **"Start measuring"** o **"Inizia misurazione"**
- **Account name**: `VV Dream Creations` (o quello che preferisci)
- Accetta i termini di servizio
- Clicca **"Next"** / "Avanti"

### 1.3 Crea Proprietà

- **Property name**: `Il Mondo di Tiko`
- **Reporting time zone**: `Italy`
- **Currency**: `EUR - Euro`
- Clicca **"Next"**

### 1.4 Dettagli Business

- **Industry**: `Arts & Entertainment` o `Publishing`
- **Business size**: `Small`
- **How you plan to use Google Analytics**: Seleziona quello che vuoi
- Clicca **"Create"**

### 1.5 Setup Data Stream

- Seleziona piattaforma: **"Web"**
- **Website URL**: `https://vvdreamcreations.it` (o il tuo dominio GitHub Pages)
- **Stream name**: `VV Dream Creations Website`
- Clicca **"Create stream"**

### 1.6 COPIA IL MEASUREMENT ID! 🔑

Dopo aver creato lo stream, vedrai:

```
Measurement ID: G-XXXXXXXXXX
```

**Esempio**: `G-ABC123DEF4`

📋 **COPIA QUESTO CODICE** e mandamelo!

---

## ⏳ Cosa Succede Dopo

Una volta che mi dai il Measurement ID, io:

1. ✅ Installo Google Analytics nel sito
2. ✅ Configuro eventi personalizzati:
   - `survey_vote` → quando votano (parametro: tema scelto)
   - `topic_suggestion` → quando inviano suggerimento
   - `book_click` → quando aprono dettagli libro
   - `newsletter_signup` → quando si iscrivono
3. ✅ Pubblico tutto su GitHub
4. ✅ Ti spiego come vedere i dati su Analytics

---

## 📊 Cosa Vedrai su Google Analytics

### Report in Tempo Reale
- Utenti online adesso
- Pagine che stanno guardando
- Eventi che stanno scatenando

### Report Eventi
Vedrai tabelle tipo:

| Evento | Conteggio | Parametri |
|--------|-----------|-----------|
| survey_vote | 45 | tema: La paura (12), Gelosia (15), ... |
| topic_suggestion | 8 | - |
| book_click | 23 | book: La Paura di Tiko, ... |
| newsletter_signup | 6 | - |

### Esempio Analisi
Potrai rispondere a domande tipo:
- "Quante persone hanno votato questa settimana?"
- "Quale tema sta vincendo in tempo reale?"
- "Quanti suggerimenti ho ricevuto questo mese?"
- "Quale libro viene aperto di più?"

---

## 🔐 Privacy & GDPR

**Nota**: Google Analytics è GDPR-compliant se configurato correttamente.

Dopo l'implementazione, ti consiglierò di:
1. Aggiungere Cookie Banner (posso farlo in futuro)
2. Aggiornare Privacy Policy (puoi usare generator online)
3. Attivare anonimizzazione IP (lo faccio io in setup)

---

## ⏭️ Prossimo Passo

**Dammi il tuo Measurement ID** (formato `G-XXXXXXXXXX`) e procedo con l'implementazione completa! 🚀

Dovrebbe essere qualcosa tipo: `G-1A2B3C4D5E`
