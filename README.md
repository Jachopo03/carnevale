# Carnevale di Ivrea 2027

Sito non ufficiale, fatto da un aranciere per gli amici, per organizzare il viaggio al Carnevale di Ivrea (6–9 febbraio 2027).

Contiene informazioni, programma, mappa dei luoghi, squadre, personaggi, storia e un **modulo di partecipazione** con gestione dei posti letto, un'**area profilo** per modificare la propria risposta e un'**area gestori** per vedere chi viene.

## Funzionalità

- **Sito pubblico** (`index.html`): una sola pagina con navbar, programma a tab, spese, luoghi con link a Google/Apple Maps, squadre, personaggi, carri e storia.
- **Modulo "Partecipa"**: nome, cognome, codice numerico (4–6 cifre), durata, giorni, posto letto, tiro delle arance. I posti letto sono limitati (6) e controllati lato database.
- **Profilo** (`profilo.html`): chi ha già risposto rientra con nome, cognome e codice e modifica la propria risposta. Dopo 5 codici errati l'accesso si blocca per 15 minuti.
- **Area gestori** (`gestori.html`): login con email e password (Supabase Auth). Mostra presenze per giorno, chi tira e chi no, chi non viene, e permette di eliminare una persona.

## Stack

- HTML, CSS e JavaScript puro, senza build né dipendenze da installare.
- [Supabase](https://supabase.com) (Postgres + Auth + RPC) come database.
- Font da Google Fonts; `supabase-js` caricato da CDN solo in `gestori.html`.

## Struttura del progetto

```
.
├── index.html            # sito pubblico
├── profilo.html          # modifica della propria risposta
├── gestori.html          # area riservata ai gestori
├── css/
│   └── style.css
├── js/
│   ├── config.js         # URL e chiave pubblica di Supabase
│   ├── data.js           # TUTTI i contenuti modificabili del sito
│   ├── api.js            # chiamate RPC a Supabase
│   └── app.js            # rendering delle sezioni e logica del modulo
└── img/                  # loghi squadre, foto personaggi, mappa, icone

## Modificare i contenuti

Testi, programma, spese, luoghi, squadre e personaggi si cambiano **solo in `js/data.js`**: il resto del sito non va toccato.

Alcuni punti utili:

- `nav`: elenco delle sezioni; ogni voce è `[id, etichetta]` oppure `[id, etichetta, "pagina.html"]` per i link esterni.
- `partecipa.letti`: numero di posti letto mostrato nel modulo.
- `partecipa.giorni`: codici dei giorni usati dal modulo e dall'area gestori (`sab`, `dom`, `lun`, `mar`).
- `squadre.righe`: `[nome, anno, zona, evidenziata, logo, sito]`.

> ⚠️ Il limite di posti letto è scritto in **due** posti: `partecipa.letti` in `data.js` (solo per la visualizzazione) e il numero `6` nelle funzioni SQL `registra` e `profilo_aggiorna` (quello che vale davvero). Se lo cambi, aggiornali entrambi.

### Risposte già presenti senza codice

Le righe inserite prima dell'introduzione del PIN non hanno `pin_hash`. Per assegnarne uno a mano:

```sql
update public.partecipazioni
set pin_hash = crypt('1234', gen_salt('bf'))
where id = 123;
```

## Provare in locale

Basta un server statico qualsiasi, ad esempio:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

Se `SUPABASE_URL` o `SUPABASE_ANON_KEY` sono vuoti, il modulo funziona in **modalità prova**: la risposta viene salvata solo nel `localStorage` del browser e il PIN non viene memorizzato. In questa modalità profilo e area gestori non funzionano.

## Pubblicazione

È un sito completamente statico: va bene qualsiasi hosting (GitHub Pages, Netlify, Cloudflare Pages, ecc.). Basta caricare la cartella così com'è.

## Note

- `gestori.html` e `profilo.html` hanno `noindex,nofollow`, ma non sono nascoste: l'accesso è protetto da login/codice, non dall'indirizzo.
- Il sito è per uso privato tra amici: nessun dato oltre a nome, cognome e preferenze di viaggio viene raccolto.

## Licenza

Progetto amatoriale, non affiliato alla Fondazione dello Storico Carnevale di Ivrea. Loghi e marchi delle squadre appartengono ai rispettivi proprietari.
