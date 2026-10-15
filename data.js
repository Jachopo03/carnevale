// TUTTI I CONTENUTI MODIFICABILI STANNO QUI. Il resto del sito non va toccato.
window.DATA = {
brand: "Carnevale di Ivrea",
hero: {
  titolo: "Carnevale<br>di Ivrea",
  testo: "Otto secoli di storia. Non uno spettacolo da guardare: una battaglia per la libertà, combattuta a colpi di arance.",
  fatti: ["Edizione 2027", "Dal 6 gennaio al 10 febbraio", "Il nostro viaggio: 6–9 febbraio"]
},
nav: [["info","Informazioni"],["programma","Programma"],["partecipa","Partecipa"],["novita","Novità"],["spese","Spese"],["luoghi","Luoghi"],["nostre","Le nostre"],["squadre","Squadre"],["personaggi","Personaggi"],["carri","Carri"],["storia","Storia"]],
info: {
  titolo: "Prima di partire",
  lead: "Poche regole, ma da rispettare. Ad Ivrea il carnevale si vive, e si vive vestiti nel modo giusto.",
  regole: [["red","Regola 1","Indossare sempre il Berretto Frigio."],["red","Regola 2","Divertirsi (e ubriacarsi, a piacere)."],["warn","Attenzione","Usciti dalle mura bisogna fare il giro per rientrare."],["warn","Attenzione","Per partecipare al carnevale non è obbligatorio partecipare al tiro delle arance."]],
  valigia: [["🧢","Berretto Frigio","Il cappello rosso a calza: segnala che sei un cittadino neutrale."],["🥾","Scarponi","Si cammina per ore su strade bagnate e piene di arance."],["👕","Vestiti brutti e sporcabili","Il succo d'arancia non va più via."]]
},
programma: {
  titolo: "Programma ufficiale 2027",
  lead: "Dall'apertura del 6 gennaio al Mercoledì delle Ceneri. Le stelle ★ indicano i giorni del nostro viaggio. Gli orari possono variare.",
  attivo: 4,
  giorni: [
   {tab:"6 gen",titolo:"Martedì 6 gennaio · Apertura",ev:[["08:30","Ritrovo dei Pifferi e Tamburi in Piazza di Città"],["09:00","Marcia di apertura dei Pifferi e Tamburi per il centro"],["12:00","Investitura ufficiale del Generale in Piazza di Città"],["14:00","Saluto dei Credendari al Magnifico Podestà e Cerimonia del Sale e del Pane"],["15:30","Corteo delle Componenti da piazza Ottinetti al Duomo"],["16:00","Santa Messa in Duomo e Cerimonia dei Ceri"]]},
   {tab:"24 gen",titolo:"Domenica 24 gennaio · Terzultima domenica",ev:[["09:00","Fagiolate a Bellavista e San Giovanni"],["09:15","Presa in consegna del Libro dei Verbali, in piazza Lamarmora"],["11:30","Prise du Drapeau in Piazza di Città: inizio ufficiale della Campagna"],["12:30","Pranzo di apertura del Carnevale"],["14:30","Alzata degli Abbà, parrocchia per parrocchia (fino alle 16:30)"],["17:00","Generala in Piazza di Città"]]},
   {tab:"31 gen",titolo:"Domenica 31 gennaio · Penultima domenica",ev:[["09:00","Fagiolate a Montenavale, Torre Balfredo, Cuj dij Vigne e Santi Pietro e Donato"],["10:00","Parata dei carri da getto in centro, presentazione in piazza del Rondolino e mercatino degli aranceri in piazza Ottinetti"],["12:00","Riappacificazione tra i rioni San Maurizio e Borghetto sul Ponte Vecchio"],["12:30","Pranzo della Croazia in Borghetto"],["14:30","Alzata degli Abbà"],["17:00","Generala in Piazza di Città"]]},
   {tab:"Gio 4",titolo:"Giovedì 4 febbraio · Giovedì Grasso",ev:[["09:00","Il Generale visita le scuole di Ivrea"],["14:00","Passaggio dei poteri in Piazza di Città e calzata del Berretto Frigio"],["14:30","Salita a cavallo del Generale e marcia del Corteo Storico"],["15:00","Feste dei bambini in piazza Ottinetti e piazza Maretta"],["16:00","Apertura della Fagiolata di via Palma"],["17:45","Generala in Piazza di Città"],["21:00","Bande e spettacoli in città"]]},
   {tab:"Sab 6 ★",titolo:"Sabato 6 febbraio · Sabato di Carnevale",ev:[["11:00","Parata della Scorta d'Onore della Mugnaia in piazza Ottinetti"],["15:00","Un'ora con i Citoyens: passeggiata nei luoghi del Carnevale"],["21:00","La Vezzosa Mugnaia si presenta dal balcone del Municipio"],["21:30","Corteo Storico, fiaccolata goliardica e sfilata delle squadre degli aranceri a piedi"],["22:30","Fuochi d'artificio sul Lungo Dora"],["23:00","Ballo della Mugnaia e del Generale, poi feste degli aranceri nelle piazze"]]},
   {tab:"Dom 7 ★",titolo:"Domenica 7 febbraio · Domenica di Carnevale",ev:[["09:00","Fagiolate (Castellazzo, San Lorenzo, via Dora Baltea, San Bernardo)"],["10:30","Preda in Dora sul Ponte Vecchio"],["11:00","Sfilata dei gruppi ospiti sul Lungo Dora"],["13:00","Inquadramento dei carri da getto in corso d'Azeglio"],["14:00","Corteo Storico e inizio della Battaglia delle Arance"],["17:30","Generala in Piazza di Città"]]},
   {tab:"Lun 8 ★",titolo:"Lunedì 8 febbraio · Lunedì di Carnevale",ev:[["09:30","Zappate degli Scarli (fino alle 11:30)"],["12:30","Consegna dell'Albero della Libertà in Piazza di Città"],["13:00","Trofeo Pich e Pala in Piazza di Città: sfida di tiro lungo"],["14:00","Corteo Storico con visita alle squadre (Asso di Picche e Morte comprese), poi Battaglia delle Arance"],["17:30","Generala in Piazza di Città"]]},
   {tab:"Mar 9 ★",titolo:"Martedì 9 febbraio · Martedì di Carnevale",ev:[["11:00","Palio degli Aranceri in piazza Ottinetti"],["14:00","Corteo Storico e Battaglia delle Arance"],["18:00","Premiazione delle squadre e dei carri da getto in Piazza di Città"],["20:15","Il Corteo parte per l'abbruciamento degli Scarli"],["21:30","Scarlo di San Salvatore in Piazza di Città, con la Mugnaia"],["22:15","Ultimo Scarlo (San Grato) in piazza Lamarmora"],["22:45","Saluto «Arvédze a giòbia 'n bot» in piazza Ottinetti"],["23:00","Verbale di chiusura in Piazza di Città"]]},
   {tab:"Mer 10",titolo:"Mercoledì 10 febbraio · Mercoledì delle Ceneri",ev:[["11:00","Polenta e merluzzo in piazza Lamarmora"]]}
  ]
},
partecipa: {
  titolo: "Ci sei?",
  lead: "Dicci se vieni, quanti giorni resti e se tiri. Ci serve per organizzare case e squadre.",
  giorni: [["sab","Sab 6"],["dom","Dom 7"],["lun","Lun 8"],["mar","Mar 9"]]
},
novita: {
  titolo: "Dal sito ufficiale",
  lead: "Le ultime notizie della Fondazione dello Storico Carnevale di Ivrea.",
  voci: [["Regolamento degli Aranceri a Piedi","Firmato il 9 luglio 2026 dall'Associazione Aranceri a Piedi e dalla Fondazione, approvato all'unanimità da tutte e nove le squadre."],["Carri da getto: regole aggiornate","Il regolamento firmato il 30 giugno 2026 entra in vigore con l'edizione 2027."],["Le arance diventano compost","Dal 16 al 18 ottobre, al Castello e Parco di Masino, ultima distribuzione gratuita del compost ricavato dalle arance della Battaglia 2026."]],
  link: [["Programma ufficiale","https://www.storicocarnevaleivrea.it/it/Edizione-2027/Programma-2007/"],["Guida ufficiale","https://www.storicocarnevaleivrea.it/it/chi-siamo/guida-ufficiale/"],["Biglietti online","https://www.storicocarnevaleivrea.it/it/Ticketing/Ticket-On-Line/"],["Instagram","https://instagram.com/carnevale_ivrea"]]
},
spese: {
  titolo: "Quanto costa",
  lead: "Le voci principali del viaggio. Bere, cene, pranzi, souvenir e gadget dipendono da te.",
  voci: [["Casa","35 € a notte"],["Viaggio in macchina","circa 15 €"],["Biglietto d'ingresso (solo domenica)","11 € online · 15 € sul posto"],["Berretto Frigio","6 € / 8 €"],["Iscrizione squadra","minimo 100 €"]]
},
luoghi: {
  titolo: "Luoghi importanti",
  lead: "Ogni piazza ha la sua squadra e la sua funzione.",
  voci: [["Vecchio Ponte","",["Preda in Dora"]],["Piazza Gioberti","",["Ingresso 3","Fagiolata"]],["Piazza di Città","Picche e Morte",["Mugnaia","Trofeo","Premiazione","Scarlo"]],["Piazza Ottinetti","Scacchi e Arduini",["I peggiori"]],["Borghetto","Tuchini",["Ingresso 1/2","Stazione"]],["Piazza Freguglia","Diavoli e Credendari",["Diavolandia"]],["Piazza Rondolino","Mercenari e Pantere",["Parco con cibo"]]]
},
nostre: {
  titolo: "Le squadre del cuore",
  lead: "Due squadre, una sola piazza: in Piazza di Città si sfidano Picche e Morte.",
  picche: {etichetta:"Dove tira il mio migliore amico",nome:"Aranceri Asso di Picche",testo:"Fondata nel 1947: la più antica tra le nove squadre a terra. Tira in Piazza di Città."},
  morte: {etichetta:"La mia squadra",nome:"Aranceri della Morte",testo:"Fondata nel 1954. Anche loro tirano in Piazza di Città, la piazza di Mugnaia, Trofeo, Premiazione e Scarlo."}
},
squadre: {
  titolo: "Le nove squadre a terra",
  lead: "Ogni squadra difende una piazza o un rione e affronta i carri a turno.",
  righe: [["Aranceri Asso di Picche",1947,"Piazza di Città",1],["Aranceri della Morte",1954,"Piazza di Città",1],["Aranceri Tuchini del Borghetto",1964,"Rione Borghetto"],["Aranceri Scacchi",1964,"Piazza Ottinetti"],["Aranceri Scorpioni d'Arduino",1966,"Piazza Ottinetti"],["Aranceri Pantera Nera",1966,"Piazza Rondolino"],["Diavoli Aranceri",1973,"Piazza Freguglia"],["Aranceri Mercenari",1974,"Piazza Rondolino"],["Credendari Aranceri",1985,"Piazza Freguglia"]]
},
personaggi: {
  titolo: "I personaggi",
  lead: "Il Carnevale è anche un cerimoniale con i suoi ruoli, tutti visibili nel programma.",
  voci: [["Il Generale","Il Giovedì Grasso il Sindaco gli affida simbolicamente i poteri civili della piazza. Guida lo Stato Maggiore."],["La Vezzosa Mugnaia","Si presenta dal balcone del Municipio il sabato sera. I fuochi d'artificio sono in suo onore."],["Il Magnifico Podestà","La domenica getta una pietra nella Dora: è la Preda in Dora, rifiuto di ogni tirannia."],["Gli Abbà","I piccoli priori delle cinque parrocchie cittadine, festeggiati con l'Alzata."],["Pifferi e Tamburi","Aprono il Carnevale il 6 gennaio e suonano la Generala in Piazza di Città."]]
},
carri: {
  titolo: "I carri da getto",
  sx: "<p>A differenza delle squadre a piedi, ancorate a un rione o a una piazza, i carri <b>sfilano continuamente lungo un percorso cittadino</b> e affrontano a turno tutte le 9 squadre a terra.</p><h3>Due categorie</h3><p><b>Pariglie</b>, a 2 cavalli: ospitano di solito da 10 a 12 aranceri.<br><b>Tiri a quattro</b>, a 4 cavalli: carri più grandi, con 12-15 aranceri.</p>",
  dx: "<h3>Com'è fatto un carro</h3><p><b>I tiratori</b> sono le guardie del tiranno: protezioni in cuoio e pesanti maschere di ferro con grata per difendersi dai colpi a raffica delle piazze.</p><p><b>I conducenti e i capocarro</b> guidano nel caos con precisione, per tutelare cavalli e folla.</p><p><b>La vestizione</b>: decorazione artigianale in legno e pittura, con stemma, nome storico e colori.</p>"
},
storia: {
  titolo: "La storia",
  citazione: "Ad Ivrea non si festeggia il Carnevale: lo si vive. E non si assiste a uno spettacolo: si combatte una guerra per la libertà.",
  html: "<p>Il Carnevale di Ivrea è una delle feste più antiche e uniche al mondo. Non è una sfilata di coriandoli, ma la rievocazione storica di una <b>vera rivolta popolare contro l'oppressione</b>.</p><h3>🗡️ Violetta e la testa del tiranno</h3><p>Nel Medioevo la città era schiacciata dal potere di un tiranno spietato, il Marchese Ranieri di Biandrate, che pretendeva lo <i>Ius Primae Noctis</i> su tutte le giovani spose. A spezzare la catena di soprusi fu <b>Violetta</b>, figlia di un mugnaio. La notte delle nozze finse di sottomettersi, condusse il tiranno nel castello, lo fece ubriacare e gli tagliò la testa con una spada nascosta. Mostrata la testa dal balcone, il popolo insorse e rase al suolo il castello, giurando che nessun tiranno avrebbe più dominato Ivrea.</p><h3>🍊 La Battaglia delle Arance</h3><p>È la rappresentazione dal vivo di quel giorno di rivolta.</p><ul><li><b>I tiratori a terra</b> sono il popolo: combattono a viso scoperto, senza maschere né protezioni pesanti.</li><li><b>I tiratori sui carri</b> sono le guardie del tiranno: indossano cuoio e maschere di ferro.</li><li><b>Le arance</b> simboleggiano i frutti sottratti dal feudatario e la testa mozza del tiranno.</li></ul><h3>🔴 Il Berretto Frigio</h3><p>Nei giorni di festa chiunque scenda in strada deve indossarlo. Nato nella Rivoluzione Francese sul modello del cappello degli schiavi liberati nell'antica Roma, ad Ivrea è simbolo di <b>neutralità e rispetto</b>: dice che sei un cittadino libero e ti protegge, almeno in teoria, dal tiro diretto delle arance mentre ti sposti tra le piazze.</p>"
},
footer: "Sito non ufficiale, fatto da un aranciere per gli amici. Il programma è tratto da <a href=\"https://www.storicocarnevaleivrea.it/it/home/\">storicocarnevaleivrea.it</a> (Fondazione dello Storico Carnevale di Ivrea, Palazzo della Credenza, Ivrea). Indossa il berretto, sporcati, divertiti."
};
