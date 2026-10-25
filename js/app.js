(function () {
  var D = window.DATA, C = window.CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };

  /* ---------- navbar ---------- */
  // Ogni voce è [id, etichetta] oppure [id, etichetta, "pagina.html"] per i link esterni (es. il profilo)
  $("#nav").innerHTML = '<div class="bar"><a class="brand" href="#top">' + esc(D.brand) + '</a>' +
    '<button class="burger" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu">☰</button>' +
    '<ul id="menu">' + D.nav.map(function (n) { return '<li><a href="' + (n[2] || '#' + n[0]) + '">' + esc(n[1]) + '</a></li>'; }).join("") + '</ul></div>';
  var nav = $("#nav"), burger = $(".burger", nav);
  function toggleMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.textContent = open ? "✕" : "☰";
  }
  burger.addEventListener("click", function () { toggleMenu(!nav.classList.contains("open")); });
  $$("#menu a").forEach(function (a) { a.addEventListener("click", function () { toggleMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggleMenu(false); });

  /* ---------- hero ---------- */
  $("#hero").innerHTML = '<div class="hero" id="top"><div class="wrap"><h1>' + D.hero.titolo + '</h1><p>' + esc(D.hero.testo) + '</p><div class="facts">' +
    D.hero.fatti.map(function (f) { return '<span>' + esc(f) + '</span>'; }).join("") + '</div></div></div>';

  /* ---------- sezioni ---------- */
  var head = function (o) { return '<h2>' + esc(o.titolo) + '</h2>' + (o.lead ? '<p class="lead">' + esc(o.lead) + '</p>' : ''); };
  var S = {};

  S.info = function () {
    var o = D.info;
    return head(o) + '<div class="rules">' + o.regole.map(function (r) { return '<div class="box ' + r[0] + '"><b>' + esc(r[1]) + '</b>' + esc(r[2]) + '</div>'; }).join("") + '</div>' +
      '<h3 style="margin-top:2rem">Cosa mettere in valigia</h3><div class="gear">' +
      o.valigia.map(function (g) { return '<div class="box"><img src="' + g[0] + '" alt="" style="width: 32px; height: 32px; object-fit: contain; margin-bottom: 0.5rem; display: block;"><b>' + esc(g[1]) + '</b>' + esc(g[2]) + '</div>'; }).join("") + '</div>';
  };

  S.programma = function () {
    var o = D.programma;
    return head(o) + '<div class="tabs" role="tablist" aria-label="Giorni">' +
      o.giorni.map(function (g, i) { return '<button role="tab" aria-selected="' + (i === o.attivo) + '" data-d="' + i + '">' + esc(g.tab) + '</button>'; }).join("") + '</div>' +
      o.giorni.map(function (g, i) {
        return '<ul class="day' + (i === o.attivo ? ' on' : '') + '"><li class="ttl">' + esc(g.titolo) + '</li>' +
          g.ev.map(function (e) { return '<li><span class="t">' + e[0] + '</span><span>' + esc(e[1]) + '</span></li>'; }).join("") + '</ul>';
      }).join("");
  };

  S.partecipa = function () {
    var o = D.partecipa;
    var radio = function (name, val, label) { return '<label><input type="radio" name="' + name + '" value="' + val + '" required> ' + label + '</label>'; };
    return head(o) +
      '<form class="rsvp" id="rsvp" novalidate>' +
      '<div class="row"><div><label class="f" for="nome">Nome</label><input type="text" id="nome" name="nome" maxlength="60" autocomplete="given-name" required></div>' +
      '<div><label class="f" for="cognome">Cognome</label><input type="text" id="cognome" name="cognome" maxlength="60" autocomplete="family-name" required></div></div>' +
      '<div class="row" style="margin-top:1rem"><div><label class="f" for="pin">Codice numerico (4-6 cifre)</label>' +
      '<input type="text" id="pin" name="pin" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" required>' +
      '<p class="note" style="margin:.3rem 0 0">Ti serve per rivedere o cambiare la risposta dal <a href="profilo.html">profilo</a>. Non perderlo.</p></div></div>' +
      '<fieldset><legend>Partecipi?</legend><div class="opts">' + radio("partecipa", "si", "Sì, ci sono") + radio("partecipa", "no", "No, stavolta no") + '</div></fieldset>' +
      '<div id="dettagli" hidden>' +
      '<fieldset><legend>Quanto ti fermi?</legend><div class="opts">' + radio("durata", "un_giorno", "Un giorno solo") + radio("durata", "due_tre", "Da 2 a 3 giorni") + radio("durata", "tutti", "Tutti i giorni") + '</div></fieldset>' +
      '<fieldset id="gg" hidden><legend id="ggl">Quali giorni?</legend><div class="opts">' +
      o.giorni.map(function (g) { return '<label><input type="checkbox" name="giorni" value="' + g[0] + '"> ' + esc(g[1]) + '</label>'; }).join("") + '</div></fieldset>' +
      '<fieldset id="dm" hidden><legend>Dormi da noi?</legend><div class="opts">' + radio("dorme", "si", "Sì, mi serve un posto letto") + radio("dorme", "no", "No, ho già da dormire") + '</div>' +
      '<p class="note" id="letti" style="margin:.5rem 0 0"></p></fieldset>' +
      '<fieldset><legend>Tiri le arance?</legend><div class="opts">' + radio("tira", "si", "Sì, tiro") + radio("tira", "no", "No, mi godo la festa") + '</div></fieldset></div>' +
      '<p style="margin:1.4rem 0 0"><button class="btn" type="submit" id="invia">Invia la risposta</button></p>' +
      '<p class="msg" id="msg" role="status" aria-live="polite"></p></form>';
  };

  S.spese = function () {
    var o = D.spese;
    return head(o) + '<div class="scroll"><table class="costs">' + o.voci.map(function (v) { return '<tr><td>' + esc(v[0]) + '</td><td>' + esc(v[1]) + '</td></tr>'; }).join("") + '</table></div>';
  };

  S.luoghi = function () {
    var o = D.luoghi;
    var imgHtml = o.immagine ? '<img src="' + o.immagine + '" alt="' + esc(o.titolo) + '" style="width:100%; border-radius:8px; margin: 1rem 0;">' : '';

    return head(o) + imgHtml + '<div class="places">' + o.voci.map(function (v, index) {
      var appleOverride = {
        "Piazza di Città": "Piazza Ferruccio Nazionale, Ivrea, Italy",
        "Piazza Rondolino": "Corso Botta, Ivrea, Italy",
        "Borghetto": "Via Guido Gozzano, Ivrea, Italy"
      };
      var queryApple = appleOverride[v[0]] || (v[0] + ", Ivrea, Italy");
      var queryGmaps = v[0] + ", Ivrea, Italy";

      var gmaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(queryGmaps);
      var apple = "https://maps.apple.com/?q=" + encodeURIComponent(queryApple);

      var tagsHtml = v[2].map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
      var boxId = "luogo-menu-" + index;

      var mapMenu = '<div id="' + boxId + '" style="display: none; margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid rgba(0,0,0,0.1); flex-direction: column; gap: 0.4rem; font-size: 0.9rem;" onclick="event.stopPropagation();">' +
        '<span style="font-weight: bold; font-size: 0.8rem; opacity: 0.8;">Apri con:</span>' +
        '<div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">' +
          '<a href="' + gmaps + '" target="_blank" rel="noopener noreferrer" style="background: #f1f3f4; color: #333; padding: 4px 10px; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">' +
            '<img src="https://img.icons8.com/?size=100&id=svxMiuKxGwZ3&format=png&color=000000" alt="Google Maps" style="width: 18px; height: 18px;"> Google Maps' +
          '</a>' +
          '<a href="' + apple + '" target="_blank" rel="noopener noreferrer" style="background: #f1f3f4; color: #333; padding: 4px 10px; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">' +
            '<img src="https://img.icons8.com/?size=100&id=9c6iBQaxdDK8&format=png&color=000000" alt="Apple Maps" style="width: 18px; height: 18px;"> Apple Maps' +
          '</a>' +
        '</div>' +
      '</div>';

      return '<div class="box" onclick="var m = document.getElementById(\'' + boxId + '\'); m.style.display = m.style.display === \'flex\' ? \'none\' : \'flex\';" style="cursor: pointer; position: relative;">' +
        '<h3>' + esc(v[0]) + '</h3>' +
        (v[1] ? '<p class="note" style="margin:0 0 .3rem">' + esc(v[1]) + '</p>' : '') +
        tagsHtml +
        mapMenu +
      '</div>';
    }).join("") + '</div>';
  };

  /*S.nostre = function () {
    var o = D.nostre, p = o.picche, m = o.morte;
    var card = function (cls, svg, x) { return '<div class="fcard ' + cls + '">' + svg + '<span class="me">' + esc(x.etichetta) + '</span><h3>' + esc(x.nome) + '</h3><p>' + esc(x.testo) + '</p></div>'; };
    var svgP = '<svg viewBox="0 0 100 100" aria-hidden="true"><path fill="#F28C0F" d="M50 8C50 8 12 38 12 60c0 14 11 22 22 22 6 0 11-2 14-6-1 8-4 14-10 18h24c-6-4-9-10-10-18 3 4 8 6 14 6 11 0 22-8 22-22C88 38 50 8 50 8z"/></svg>';
    var svgM = '<svg viewBox="0 0 100 100" aria-hidden="true"><path fill="#111" d="M50 8C28 8 14 24 14 44c0 12 5 20 12 25v14h12v-8h8v8h8v-8h8v8h12V69c7-5 12-13 12-25C86 24 72 8 50 8z"/><circle cx="36" cy="46" r="9" fill="#F28C0F"/><circle cx="64" cy="46" r="9" fill="#F28C0F"/><path d="M50 56l-5 10h10z" fill="#F28C0F"/></svg>';
    return head(o) + '<div class="feat">' + card("picche", svgP, p) + card("morte", svgM, m) + '</div>';
  };*/

  S.squadre = function () {
    var o = D.squadre;
    return head(o) + '<div class="scroll"><table class="sq"><thead><tr><th>Squadra</th><th>Fondata</th><th>Zona di tiro</th></tr></thead><tbody>' +
      o.righe.map(function (r) {
        var nomeSquadra = r[0];
        var anno = r[1];
        var zona = r[2];
        var evidenziata = r[3];
        var logoPath = r[4];
        var linkSito = r[5];
        var logoHtml = logoPath ? '<img src="' + logoPath + '" alt="" style="width: 24px; height: 24px; object-fit: contain; margin-right: 8px; vertical-align: middle;">' : '';
        var nomeCell = logoHtml + esc(nomeSquadra);
        if (linkSito) {
          nomeCell = '<a href="' + linkSito + '" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: inline-flex; align-items: center;">' + logoHtml + esc(nomeSquadra) + '</a>';
        } else {
          nomeCell = '<span style="display: inline-flex; align-items: center;">' + logoHtml + esc(nomeSquadra) + '</span>';
        }
        return '<tr' + (evidenziata ? ' class="hl"' : '') + '>' +
          '<td>' + nomeCell + '</td>' +
          '<td>' + anno + '</td>' +
          '<td>' + esc(zona) + '</td>' +
        '</tr>';
      }).join("") + '</tbody></table></div>';
  };

  S.personaggi = function () {
    var o = D.personaggi;
    return head(o) + '<div class="places">' + o.voci.map(function (v) {
      var img = v[2]
        ? '<img class="pf" src="' + v[2] + '" alt="' + esc(v[0]) + '" loading="lazy" onerror="this.remove()">'
        : '';
      return '<div class="box pbox">' + img + '<h3>' + esc(v[0]) + '</h3><p class="note" style="margin:0">' + esc(v[1]) + '</p></div>';
    }).join("") + '</div>';
  };

  S.carri = function () { var o = D.carri; return '<h2>' + esc(o.titolo) + '</h2><div class="two"><div>' + o.sx + '</div><div>' + o.dx + '</div></div>'; };
  S.storia = function () { var o = D.storia; return '<h2>' + esc(o.titolo) + '</h2><blockquote>' + esc(o.citazione) + '</blockquote>' + o.html; };

  $("#app").innerHTML = D.sezioni.map(function (id) {
    return S[id] ? '<section id="' + id + '"' + (id === "storia" ? ' class="story"' : '') + '>' + S[id]() + '</section>' : '';
  }).join("");
  $("#footer").innerHTML = '<div class="wrap">' + D.footer + '</div>';

  /* ---------- tab programma ---------- */
  var tabs = $$(".tabs button"), days = $$(".day");
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () {
      tabs.forEach(function (x, j) { x.setAttribute("aria-selected", j === i); days[j].classList.toggle("on", j === i); });
    });
  });

  /* ---------- form ---------- */
  var form = $("#rsvp"), msg = $("#msg");
  var val = function (n) { var r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : null; };
  var giorni = function () { return $$('input[name="giorni"]:checked', form).map(function (c) { return c.value; }); };

  // posti letto: null = non ancora caricati
  var occupati = null;
  function mostraLetti() {
    var liberi = Math.max(0, D.partecipa.letti - occupati);
    var si = form.querySelector('input[name="dorme"][value="si"]');
    si.disabled = liberi === 0;
    if (liberi === 0) si.checked = false;
    $("#letti").textContent = liberi === 0
      ? "Posti letto esauriti."
      : "Posti letto rimasti: " + liberi + " su " + D.partecipa.letti + ".";
  }
  function caricaLetti() {
    $("#letti").textContent = "Controllo i posti letto…";
    API.posti().then(function (n) { occupati = n; mostraLetti(); })
      .catch(function () { $("#letti").textContent = ""; });
  }

  function sync() {
    var vai = val("partecipa") === "si", d = val("durata");
    var multi = vai && (d === "due_tre" || d === "tutti");
    $("#dettagli").hidden = !vai;
    $("#gg").hidden = !(vai && (d === "un_giorno" || d === "due_tre"));
    $("#ggl").textContent = d === "due_tre" ? "Quali 2 o 3 giorni?" : "Quale giorno?";
    var max = d === "un_giorno" ? 1 : 3;
    var sel = giorni();
    while (sel.length > max) { form.querySelector('input[name="giorni"][value="' + sel.pop() + '"]').checked = false; }
    // «Dormi da noi?» compare solo da 2 giorni in su
    $("#dm").hidden = !multi;
    if (multi) { if (occupati === null) caricaLetti(); else mostraLetti(); }
  }
  form.addEventListener("change", sync);

  function show(t, ok) { msg.textContent = t; msg.className = "msg " + (ok ? "ok" : "err"); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = $("#nome").value.trim(), cognome = $("#cognome").value.trim(), pin = $("#pin").value.trim(), vai = val("partecipa");
    if (!nome || !cognome) return show("Inserisci nome e cognome.", false);
    if (!/^\d{4,6}$/.test(pin)) return show("Il codice deve essere di 4-6 cifre.", false);
    if (!vai) return show("Scegli se partecipi o no.", false);
    var rec = { nome: nome, cognome: cognome, pin: pin, partecipa: vai === "si", durata: null, giorni: null, tira: null, dorme: false };
    if (rec.partecipa) {
      var d = val("durata"), g = giorni();
      if (!d) return show("Scegli quanto ti fermi.", false);
      if (d === "un_giorno" && g.length !== 1) return show("Scegli il giorno in cui vieni.", false);
      if (d === "due_tre" && (g.length < 2 || g.length > 3)) return show("Scegli 2 o 3 giorni.", false);
      var multi = d === "due_tre" || d === "tutti";
      if (multi && !val("dorme")) return show("Dicci se dormi da noi.", false);
      if (!val("tira")) return show("Dicci se tiri le arance.", false);
      rec.durata = d;
      rec.giorni = d === "tutti" ? D.partecipa.giorni.map(function (x) { return x[0]; }) : g;
      rec.tira = val("tira") === "si";
      rec.dorme = multi && val("dorme") === "si";
    }
    var btn = $("#invia"); btn.disabled = true; show("Invio in corso…", true);
    send(rec).then(function (offline) {
      show(offline
        ? "Database non configurato: risposta salvata solo su questo dispositivo (modalità prova)."
        : "Grazie " + nome + ", risposta inviata! Ricorda il tuo codice: ti serve per modificarla dal profilo.", true);
      form.reset(); occupati = null; sync();
    }).catch(function (err) {
      if (err && err.message === "POSTI_ESAURITI") {
        show("Nel frattempo i posti letto sono finiti: scegli «No» a «Dormi da noi?» e reinvia.", false);
        caricaLetti();
      } else {
        show("Invio non riuscito. Controlla la connessione e riprova.", false);
      }
    }).then(function () { btn.disabled = false; });
  });

  function send(rec) {
    if (!C.SUPABASE_URL || !C.SUPABASE_ANON_KEY) {
      try { var k = "rsvp-prova", a = JSON.parse(localStorage.getItem(k) || "[]"); delete rec.pin; a.push(rec); localStorage.setItem(k, JSON.stringify(a)); } catch (x) {}
      return Promise.resolve(true);
    }
    return API.rpc("registra", {
      p_nome: rec.nome, p_cognome: rec.cognome, p_partecipa: rec.partecipa, p_durata: rec.durata,
      p_giorni: rec.giorni, p_tira: rec.tira, p_dorme: rec.dorme, p_pin: rec.pin
    }).then(function () { return false; });
  }
})();