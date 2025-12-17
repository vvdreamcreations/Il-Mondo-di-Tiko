# Configurazione Brevo per il Sondaggio

## Ottenere la Chiave API di Brevo

1. **Accedi al tuo account Brevo**: [https://app.brevo.com/](https://app.brevo.com/)

2. **Vai alle impostazioni API**:
   - Clicca sul tuo nome in alto a destra
   - Seleziona "SMTP & API"
   - Vai alla sezione "API Keys"

3. **Crea una nuova chiave API** (se non ne hai già una):
   - Clicca su "Generate a new API key"
   - Dai un nome descrittivo (es: "VV Dream Survey")
   - Copia la chiave generata (inizia con `xkeysib-...`)

4. **Configura la chiave nel codice**:
   - Apri il file `components/TopicSurvey.tsx`
   - Trova la riga 106 dove c'è scritto `'api-key': 'YOUR_BREVO_API_KEY'`
   - Sostituisci `YOUR_BREVO_API_KEY` con la tua chiave API

## Esempio di configurazione

```typescript
// Nel file TopicSurvey.tsx, linea 106
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'api-key': 'xkeysib-1234567890abcdef...' // La tua chiave qui
}
```

## Test dell'Email

Per testare che le email vengano inviate correttamente:

1. Avvia il server di sviluppo: `npm run dev`
2. Vai alla homepage e scorri fino al sondaggio
3. Vota per un tema
4. Controlla la tua casella email `fra.selfpublishing@gmail.com`

## Aggiornamento dei Voti nel File JSON

**IMPORTANTE**: Poiché stiamo usando GitHub per lo storage, i voti vengono salvati temporaneamente nel browser (localStorage) ma non persistono nel file JSON automaticamente.

Per aggiornare manualmente il file JSON con i voti reali:

1. Raccogli i voti dalle email che ricevi
2. Apri `public/survey-data.json`
3. Aggiorna manualmente i numeri dei voti
4. Fai commit e push su GitHub

### Automazione Future (Opzionale)

Per automatizzare l'aggiornamento del JSON, avresti bisogno di:
- Un backend serverless (es: Vercel Function, Netlify Function)
- Oppure GitHub Actions per aggiornare il file

Per ora, l'aggiornamento manuale è la soluzione più semplice e affidabile.

## Struttura Email Ricevuta

Ogni volta che qualcuno vota, riceverai un'email con:
- ✅ Il tema scelto
- 📊 La classifica aggiornata con numeri e percentuali
- 📈 Il totale dei voti

## Note di Sicurezza

⚠️ **IMPORTANTE**: La chiave API di Brevo è sensibile! 

Quando pubblichi il sito:
- NON fare commit della chiave API direttamente nel codice
- Usa variabili d'ambiente (`.env`)
- Oppure implementa un backend serverless che gestisce l'invio email

Per ora, per testare in locale, va bene inserire la chiave direttamente nel file.
