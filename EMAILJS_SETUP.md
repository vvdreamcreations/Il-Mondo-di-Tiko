# 📧 Setup EmailJS per Form Suggerimenti

## ⚠️ Azione Richiesta

Per far funzionare il nuovo form di suggerimento temi, devi:

### 1. Installare EmailJS

Apri **PowerShell come Amministratore** e esegui:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd "C:\Users\f_vis\Desktop\Video-Prog\Il-Mondo-di-Tiko"
npm install @emailjs/browser
```

### 2. Configurare EmailJS

Hai già un account EmailJS, quindi:

1. **Vai su**: [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)

2. **Email Services** → Connetti il tuo email provider (Gmail, etc.)
   - Copia il **Service ID** (es: `service_abc123`)

3. **Email Templates** → Create New Template
   - Name: `Topic Suggestion`
   - Template ID verrà generato automaticamente (es: `template_xyz789`)
   - Content template:
   ```
   Nuovo suggerimento tema ricevuto!

   Nome: {{from_name}}
   Email: {{from_email}}
   
   Tema Suggerito:
   {{topic_suggestion}}
   
   ---
   Questo messaggio è stato inviato dal form su vvdreamcreations.it
   ```
   - To Email: `info@vvdreamcreations.it`
   - Save

4. **Account** → General → Copia la **Public Key** (es: `AbC123XyZ`)

### 3. Aggiornare il Codice

Apri `components/TopicSuggestionForm.tsx` e sostituisci le righe 25-33:

```typescript
await emailjs.send(
  'SERVICE_ID_QUI',      // ← Il tuo Service ID
  'TEMPLATE_ID_QUI',     // ← Il tuo Template ID  
  {
    from_name: name,
    from_email: email || 'Non fornita',
    topic_suggestion: topic,
    to_name: 'Francesca',
  },
  'PUBLIC_KEY_QUI'       // ← La tua Public Key
);
```

**Esempio compilato**:
```typescript
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  {
    from_name: name,
    from_email: email || 'Non fornita',
    topic_suggestion: topic,
    to_name: 'Francesca',
  },
  'AbC123XyZ'
);
```

### 4. Testare

1. Avvia il server: `npm run dev`
2. Vai su http://localhost:3002
3. Scrolla fino al form "Suggerisci un Tema Personalizzato"
4. Compila e invia
5. Controlla la tua email!

---

## ✅ Fatto!

Una volta configurato, il form
funzionerà sia in locale che su GitHub Pages (perché EmailJS funziona lato client).

**Vantaggi**:
- ✅ Funziona su hosting statico
- ✅ API key sicura (gestita da EmailJS)
- ✅ Email dirette a info@vvdreamcreations.it
- ✅ Form separato per non confondere l'utente

---

**Hai bisogno di aiuto?** Dimmi dove ti blocchi! 🚀
