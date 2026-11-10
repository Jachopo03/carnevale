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
      '<div class="mode" role="group" aria-label="Cosa vuoi fare?">' +
      '<button type="button" data-m="new" aria-selected="true"><i aria-hidden="true">✨</i><b>Mi iscrivo</b><small>Non ho ancora risposto</small></button>' +
      '<button type="button" data-m="edit" aria-selected="false"><i aria-hidden="true">✏️</i><b>Modifico la risposta</b><small>Ho già risposto</small></button></div>' +
      '<form class="rsvp" id="rsvp" novalidate><p class="fh" id="fh">✨ Nuova risposta</p>' +
      '<div class="row"><div><label class="f" for="nome">Nome</label><input type="text" id="nome" name="nome" maxlength="60" autocomplete="given-name" required></div>' +
      '<div><label class="f" for="cognome">Cognome</label><input type="text" id="cognome" name="cognome" maxlength="60" autocomplete="family-name" required></div></div>' +
      '<div class="row" style="margin-top:1rem"><div><label class="f" for="pin">Codice numerico (4-6 cifre)</label>' +
      '<input type="text" id="pin" name="pin" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" required>' +
      '<p class="note" id="pinnote" style="margin:.3rem 0 0">Scegli un codice di 4-6 cifre: ti serve per rivedere o cambiare la tua risposta. Non perderlo.</p></div></div>' +
      '<p id="entrabox" style="margin:1.2rem 0 0" hidden><button class="btn pri" type="button" id="entra">Accedi alla mia risposta</button></p>' +
      '<div id="corpo"><fieldset><legend>Partecipi?</legend><div class="opts">' + radio("partecipa", "si", "Sì, ci sono") + radio("partecipa", "no", "No, stavolta no") + '</div></fieldset>' +
      '<div id="dettagli" hidden>' +
      '<fieldset><legend>Quanto ti fermi?</legend><div class="opts">' + radio("durata", "un_giorno", "Un giorno solo") + radio("durata", "due_tre", "Da 2 a 3 giorni") + radio("durata", "tutti", "Tutti i giorni") + '</div></fieldset>' +
      '<fieldset id="gg" hidden><legend id="ggl">Quali giorni?</legend><div class="opts">' +
      o.giorni.map(function (g) { return '<label><input type="checkbox" name="giorni" value="' + g[0] + '"> ' + esc(g[1]) + '</label>'; }).join("") + '</div></fieldset>' +
      '<fieldset id="dm" hidden><legend>Dormi da noi?</legend><div class="opts">' + radio("dorme", "si", "Sì, mi serve un posto letto") + radio("dorme", "no", "No, ho già da dormire") + '</div>' +
      '<p class="note" id="letti" style="margin:.5rem 0 0"></p></fieldset>' +
      '<fieldset><legend>Tiri le arance?</legend><div class="opts">' + radio("tira", "si", "Sì, tiro") + radio("tira", "no", "No, mi godo la festa") + '</div></fieldset></div>' +
      '<p style="margin:1.4rem 0 0"><button class="btn" type="submit" id="invia">Invia la risposta</button><button class="btn ghost" type="button" id="esci" hidden>Esci</button></p></div>' +
      '<p class="msg" id="msg" role="status" aria-live="polite"></p></form>';
  };

  S.spese = function () {
    var o = D.spese;
    return head(o) + '<div class="scroll"><table class="costs">' + o.voci.map(function (v) { return '<tr><td>' + esc(v[0]) + '</td><td>' + esc(v[1]) + '</td></tr>'; }).join("") + '</table></div>';
  };

  S.luoghi = function () {
    var o = D.luoghi;
    var appleOverride = {
      "Piazza di Città": "Piazza Ferruccio Nazionale, Ivrea, Italy",
      "Piazza Rondolino": "Corso Botta, Ivrea, Italy",
      "Borghetto": "Via Guido Gozzano, Ivrea, Italy"
    };
    var img = o.immagine ? '<button class="mapz" type="button" aria-label="Ingrandisci la mappa"><img src="' + o.immagine + '" alt="' + esc(o.titolo) + '"><span>🔍 Tocca per ingrandire</span></button>' : '';
    return head(o) + img + '<div class="lst">' + o.voci.map(function (v, index) {
      var gmaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v[0] + ", Ivrea, Italy");
      var apple = "https://maps.apple.com/?q=" + encodeURIComponent(appleOverride[v[0]] || (v[0] + ", Ivrea, Italy"));
      var tags = v[2].map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
      var id = "luogo-" + index;
      return '<div class="pl" style="--i:' + index + '"><button class="pl-h" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        '<span class="num">' + (index + 1) + '</span><span class="pl-t"><b>' + esc(v[0]) + '</b>' + (v[1] ? '<small>' + esc(v[1]) + '</small>' : '') + '<span class="tags">' + tags + '</span></span><span class="chev" aria-hidden="true">›</span></button>' +
        '<div class="pl-b" id="' + id + '"><div><div class="go">' +
        '<a href="' + gmaps + '" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/?size=100&id=svxMiuKxGwZ3&format=png&color=000000" alt=""> Google Maps</a>' +
        '<a href="' + apple + '" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/?size=100&id=9c6iBQaxdDK8&format=png&color=000000" alt=""> Apple Maps</a>' +
        '</div></div></div></div>';
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
    return head(o) +
      '<div class="slider" id="sq">' + o.righe.map(function (r) {
        var ini = r[0].replace(/^(Aranceri|Diavoli|Credendari) ?/, "").charAt(0) || r[0].charAt(0);
        var logo = r[4] ? '<img src="' + r[4] + '" alt="">' : "";
        return '<div class="box sqc' + (r[3] ? ' hl' : '') + '"><div class="monogram">' + esc(ini) + logo + '</div>' +
          '<h3><button class="card-link" type="button" aria-expanded="false">' + esc(r[0]) + '</button></h3>' +
          '<span class="tag">Dal ' + r[1] + '</span><span class="tag">' + esc(r[2]) + '</span>' +
          (r[5] ? '<div><a class="link" href="' + r[5] + '" target="_blank" rel="noopener noreferrer">Sito della squadra ↗</a></div>' : '') + '</div>';
      }).join("") + '</div>';
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

  /* ---------- luoghi: apertura voci e mappa a schermo intero ---------- */
  function lightbox(src, alt) {
    var o = document.createElement("div"); o.className = "lb";
    o.innerHTML = '<button class="lb-x" type="button" aria-label="Chiudi">✕</button><div class="lb-s"><img src="' + src + '" alt="' + esc(alt) + '"></div>';
    document.body.appendChild(o); document.body.style.overflow = "hidden";
    function chiudi() { o.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", k); }
    function k(e) { if (e.key === "Escape") chiudi(); }
    o.addEventListener("click", function (e) { if (e.target === o || e.target.className === "lb-x") chiudi(); });
    document.addEventListener("keydown", k);
  }
  document.addEventListener("click", function (e) {
    var h = e.target.closest(".pl-h");
    if (h) {
      var p = h.parentNode, apri = !p.classList.contains("open");
      $$(".pl.open").forEach(function (x) { if (x !== p) { x.classList.remove("open"); $(".pl-h", x).setAttribute("aria-expanded", "false"); } });
      p.classList.toggle("open", apri); h.setAttribute("aria-expanded", apri);
      return;
    }
    var z = e.target.closest(".mapz");
    if (z) { var im = $("img", z); lightbox(im.src, im.alt); }
  });

  /* ---------- personaggi: carosello a scatti ---------- */
  var pg = $("#personaggi .places");
  if (pg) {
    var cards = $$(".pbox", pg), cur = 0, stop = false, back = 0, raf = 0;
    var pn = document.createElement("div"); pn.className = "pgnav";
    pn.innerHTML = '<button class="pgb" type="button" data-d="-1" aria-label="Personaggio precedente">\u2039</button><span class="pgd" aria-hidden="true">' +
      cards.map(function () { return "<i></i>"; }).join("") + '</span><button class="pgb" type="button" data-d="1" aria-label="Personaggio successivo">\u203A</button>';
    pg.parentNode.insertBefore(pn, pg.nextSibling);
    var dots = $$("i", pn);
    var padL = function () { return parseFloat(getComputedStyle(pg).paddingLeft) || 0; };
    function nearest() {
      if (pg.scrollLeft + pg.clientWidth >= pg.scrollWidth - 3) return cards.length - 1;
      var x = pg.getBoundingClientRect().left + padL(), best = 0, bd = 1e9;
      cards.forEach(function (c, i) { var d = Math.abs(c.getBoundingClientRect().left - x); if (d < bd) { bd = d; best = i; } });
      return best;
    }
    function mark() {
      cur = nearest();
      cards.forEach(function (c, i) { c.classList.toggle("act", i === cur); });
      dots.forEach(function (d, i) { d.classList.toggle("on", i === cur); });
    }
    function go(i) {
      i = (i + cards.length) % cards.length;
      pg.scrollTo({ left: cards[i].getBoundingClientRect().left - pg.getBoundingClientRect().left + pg.scrollLeft - padL(), behavior: "smooth" });
    }
    function hold() { stop = true; clearTimeout(back); back = setTimeout(function () { stop = false; }, 6000); }
    pn.addEventListener("click", function (e) { var b = e.target.closest(".pgb"); if (b) { go(cur + Number(b.getAttribute("data-d"))); hold(); } });
    ["pointerdown", "touchstart", "wheel", "focusin"].forEach(function (ev) { pg.addEventListener(ev, hold, { passive: true }); });
    pg.addEventListener("mouseenter", function () { stop = true; clearTimeout(back); });
    pg.addEventListener("mouseleave", hold);
    pg.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(mark); }, { passive: true });
    setInterval(function () {
      var r = pg.getBoundingClientRect();
      if (stop || document.hidden || r.bottom < 0 || r.top > innerHeight) return;
      go(cur + 1);
    }, 3800);
    mark(); addEventListener("resize", mark); addEventListener("load", mark);
  }

  /* ---------- tab programma ---------- */
  var tabs = $$(".tabs button"), days = $$(".day");
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () {
      tabs.forEach(function (x, j) { x.setAttribute("aria-selected", j === i); days[j].classList.toggle("on", j === i); });
    });
  });

  // i tab partono dal primo giorno del viaggio (i precedenti restano a sinistra)
  tabs.forEach(function (b) { b.addEventListener("click", function () { b.parentNode.scrollTo({ left: Math.max(0, b.offsetLeft - 8), behavior: "smooth" }); }); });
  function tabIniziale() { var t = $('.tabs button[aria-selected="true"]'); if (t) t.parentNode.scrollLeft = Math.max(0, t.offsetLeft - 8); }
  tabIniziale(); addEventListener("load", tabIniziale);

  /* ---------- form: iscrizione o modifica ---------- */
  var form = $("#rsvp"), msg = $("#msg"), mode = "new", cred = null;
  var ERR = {
    CREDENZIALI: "Nome, cognome o codice non corretti. Dopo 5 errori l'accesso si blocca per 15 minuti.",
    POSTI_ESAURITI: "Nel frattempo i posti letto sono finiti: scegli «No» a «Dormi da noi?» e riprova.",
    PIN_NON_VALIDO: "Codice non valido."
  };
  var NOTE = {
    "new": "Scegli un codice di 4-6 cifre: ti serve per rivedere o cambiare la tua risposta. Non perderlo.",
    "edit": "Inserisci lo stesso codice che hai scelto quando hai risposto. Dopo 5 errori l'accesso si blocca per 15 minuti."
  };
  var val = function (n) { var r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : null; };
  var giorni = function () { return $$('input[name="giorni"]:checked', form).map(function (c) { return c.value; }); };
  var setR = function (n, v) { $$('input[name="' + n + '"]', form).forEach(function (i) { i.checked = (i.value === v); }); };

  // posti letto: null = non ancora caricati (il numero non si mostra, solo l'eventuale esaurimento)
  var occupati = null;
  function mostraLetti() {
    var liberi = Math.max(0, D.partecipa.letti - occupati);
    var si = form.querySelector('input[name="dorme"][value="si"]');
    si.disabled = liberi === 0;
    if (liberi === 0) si.checked = false;
    $("#letti").textContent = liberi === 0 ? "Posti letto esauriti." : "";
  }
  function caricaLetti() { API.posti().then(function (n) { occupati = n; mostraLetti(); }).catch(function () {}); }

  function sync() {
    var vai = val("partecipa") === "si", d = val("durata");
    var multi = vai && (d === "due_tre" || d === "tutti");
    $("#dettagli").hidden = !vai;
    $("#gg").hidden = !(vai && (d === "un_giorno" || d === "due_tre"));
    $("#ggl").textContent = d === "due_tre" ? "Quali 2 o 3 giorni?" : "Quale giorno?";
    var max = d === "un_giorno" ? 1 : 3;
    var sel = giorni();
    while (sel.length > max) { form.querySelector('input[name="giorni"][value="' + sel.pop() + '"]').checked = false; }
    $("#dm").hidden = !multi;
    if (multi) { if (occupati === null) caricaLetti(); else mostraLetti(); }
  }
  form.addEventListener("change", sync);

  function show(t, ok) { msg.textContent = t; msg.className = "msg " + (ok ? "ok" : "err"); }

  function setMode(m) {
    var id = [$("#nome").value, $("#cognome").value, $("#pin").value], edit = m === "edit";
    mode = m; cred = null;
    $$(".mode button").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-m") === m); });
    form.reset(); $("#nome").value = id[0]; $("#cognome").value = id[1]; $("#pin").value = id[2];
    ["nome", "cognome", "pin"].forEach(function (k) { $("#" + k).readOnly = false; });
    $("#entrabox").hidden = !edit; $("#corpo").hidden = edit; $("#esci").hidden = true;
    $("#invia").textContent = edit ? "Salva le modifiche" : "Invia la risposta";
    $("#fh").textContent = edit ? "✏️ Accedi alla tua risposta" : "✨ Nuova risposta";
    $("#pinnote").textContent = NOTE[m]; msg.textContent = ""; occupati = null; sync();
    form.classList.remove("swap"); void form.offsetWidth; form.classList.add("swap");
  }
  $$(".mode button").forEach(function (b) {
    b.addEventListener("click", function () { var m = b.getAttribute("data-m"); if (m !== mode) setMode(m); });
  });
  $("#esci").addEventListener("click", function () { setMode("edit"); });

  // modifica: accesso con nome, cognome e codice
  $("#entra").addEventListener("click", function () {
    var c = { p_nome: $("#nome").value.trim(), p_cognome: $("#cognome").value.trim(), p_pin: $("#pin").value.trim() };
    if (!c.p_nome || !c.p_cognome || !c.p_pin) return show("Compila nome, cognome e codice.", false);
    if (!C.SUPABASE_URL || !C.SUPABASE_ANON_KEY) return show("Database non configurato: la modifica non è disponibile in modalità prova.", false);
    var b = $("#entra"); b.disabled = true; show("Accesso in corso…", true);
    Promise.all([API.rpc("profilo_leggi", c), API.posti()]).then(function (r) {
      var p = r[0]; cred = c; occupati = r[1] - (p.dorme ? 1 : 0);
      setR("partecipa", p.partecipa ? "si" : "no"); setR("durata", p.durata);
      var gs = p.giorni || [];
      $$('input[name="giorni"]', form).forEach(function (i) { i.checked = gs.indexOf(i.value) > -1; });
      setR("tira", p.tira == null ? null : (p.tira ? "si" : "no")); setR("dorme", p.dorme ? "si" : "no");
      ["nome", "cognome", "pin"].forEach(function (k) { $("#" + k).readOnly = true; });
      $("#entrabox").hidden = true; $("#corpo").hidden = false; $("#esci").hidden = false;
      $("#fh").textContent = "✏️ Ciao " + p.nome + ", modifica la tua risposta";
      msg.textContent = ""; sync();
    }).catch(function (e) { show(ERR[e.message] || "Errore: " + e.message, false); })
      .then(function () { b.disabled = false; });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var edit = mode === "edit";
    if (edit && !cred) return show("Prima accedi alla tua risposta.", false);
    var nome = $("#nome").value.trim(), cognome = $("#cognome").value.trim(), pin = $("#pin").value.trim(), vai = val("partecipa");
    if (!edit) {
      if (!nome || !cognome) return show("Inserisci nome e cognome.", false);
      if (!/^\d{4,6}$/.test(pin)) return show("Il codice deve essere di 4-6 cifre.", false);
    }
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
    var btn = $("#invia"); btn.disabled = true; show(edit ? "Salvataggio in corso…" : "Invio in corso…", true);
    (edit ? salva(rec) : send(rec)).then(function (offline) {
      if (edit) {
        show("Modifiche salvate.", true);
        return API.posti().then(function (n) { occupati = n - (rec.dorme ? 1 : 0); sync(); }).catch(function () {});
      }
      show(offline
        ? "Database non configurato: risposta salvata solo su questo dispositivo (modalità prova)."
        : "Grazie " + nome + ", risposta inviata! Ricorda il tuo codice: ti serve per modificarla da qui, scegliendo «Modifico la risposta».", true);
      form.reset(); occupati = null; sync();
    }).catch(function (err) {
      if (err && ERR[err.message]) { show(ERR[err.message], false); if (err.message === "POSTI_ESAURITI") caricaLetti(); }
      else show("Invio non riuscito. Controlla la connessione e riprova.", false);
    }).then(function () { btn.disabled = false; });
  });

  function salva(rec) {
    return API.rpc("profilo_aggiorna", {
      p_nome: cred.p_nome, p_cognome: cred.p_cognome, p_pin: cred.p_pin, p_partecipa: rec.partecipa,
      p_durata: rec.durata, p_giorni: rec.giorni, p_tira: rec.tira, p_dorme: rec.dorme
    });
  }

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

  /* ---------- design v4: effetti (barra, sfondo dinamico, forme, comparsa) ---------- */
  var root = document.documentElement, motionOK = true;

  // slider squadre
  var sq = $("#sq");
  if (sq) {
    // copia delle card per un giro continuo senza interruzioni
    var n0 = sq.children.length;
    Array.prototype.slice.call(sq.children).forEach(function (c) {
      var k = c.cloneNode(true); k.setAttribute("aria-hidden", "true");
      $$("button,a", k).forEach(function (x) { x.tabIndex = -1; });
      sq.appendChild(k);
    });
    $$(".card-link", sq).forEach(function (b) {
      b.addEventListener("click", function () {
        var c = b.closest(".box"), open = !c.classList.contains("open");
        c.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
      });
    });
    // scorrimento automatico lento e continuo; si ferma al tocco e riparte dopo 4 secondi
    var pos = 0, pausa = false, ripresa = 0, ultimo = 0, VEL = 26, giro = 0; // px al secondo
    function misura() { giro = sq.children[n0].offsetLeft - sq.children[0].offsetLeft; }
    misura(); addEventListener("resize", misura); addEventListener("load", misura);
    function ferma() { pausa = true; clearTimeout(ripresa); }
    function riparti() { clearTimeout(ripresa); ripresa = setTimeout(function () { pos = sq.scrollLeft; if (giro && pos >= giro) pos -= giro; pausa = false; }, 4000); }
    ["pointerdown", "touchstart", "mouseenter", "focusin", "wheel"].forEach(function (ev) { sq.addEventListener(ev, ferma, { passive: true }); });
    ["touchend", "pointerup", "mouseleave", "focusout"].forEach(function (ev) { sq.addEventListener(ev, riparti, { passive: true }); });
    function drift(t) {
      var dt = Math.min(t - ultimo, 64) / 1000; ultimo = t;
      var r = sq.getBoundingClientRect();
      if (!pausa && !document.hidden && r.bottom > 0 && r.top < innerHeight) {
        pos += VEL * dt; if (giro && pos >= giro) pos -= giro;
        sq.scrollLeft = pos;
      }
      requestAnimationFrame(drift);
    }
    requestAnimationFrame(drift);
  }

  // hero: pulsanti, posti letto, riduci movimento
  var hw = $("#hero .wrap");
  if (hw) {
    hw.insertAdjacentHTML("beforeend", '<div class="cta-row"><a class="btn pri" href="#partecipa">Ci sono! Rispondi ora</a><a class="btn ghost" href="#programma">Vedi il programma</a></div>');
    var h1 = $("h1", hw);
    if (h1) {
      var parts = h1.innerHTML.split(/<br\s*\/?>/i), k = 0;
      h1.setAttribute("aria-label", parts.join(" ").replace(/<[^>]+>/g, ""));
      h1.innerHTML = parts.map(function (line, li) {
        return '<span class="ln ln' + (li + 1) + '" aria-hidden="true">' + line.replace(/<[^>]+>/g, "").split(" ").map(function (w) {
          return '<span class="wd">' + w.split("").map(function (c) { return '<span class="ch" style="--i:' + (k++) + '">' + esc(c) + '</span>'; }).join("") + '</span>';
        }).join(" ") + '</span>';
      }).join("");
    }
  }
  // fascia scorrevole e forme di sfondo
  $("#hero").insertAdjacentHTML("afterend", '<div class="mq" aria-hidden="true"><div>' +
    (new Array(11).join("ARANCE ✦ LIBERTÀ ✦ BERRETTO FRIGIO ✦ MUGNAIA ✦ BATTAGLIA ✦ ")) + '</div></div>');
  var mqd = $(".mq div"); mqd.innerHTML = '<span>' + mqd.innerHTML + '</span><span>' + mqd.innerHTML + '</span>';
  document.body.insertAdjacentHTML("afterbegin", '<div class="fx" aria-hidden="true"><i class="orb orb-1"></i><i class="orb orb-2"></i><i class="orb orb-3"></i>' +
    '<svg class="cap" viewBox="0 0 120 120"><path d="M14 96c-4-40 8-82 52-84 20-1 32 10 36 26 4 14 14 20 16 30 1 6-4 10-12 10-10 0-14-6-20-6-14 0-10 24-30 24-22 0-40 4-42 0z" fill="#C23A1B"/><path d="M12 96h96v14H12z" fill="#7A1F12"/></svg></div>');
  var fx = $(".fx"), bar = document.createElement("div"); bar.className = "pbar"; $("#nav").appendChild(bar);

  // sfondo che sfuma tra i colori delle sezioni
  var secs = $$("#hero .hero, main>section[id]"), A = [], tick = 0;
  var hx = function (h) { h = h.replace("#", ""); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); };
  function meas() {
    A = secs.map(function (e) {
      var c = getComputedStyle(e), r = e.getBoundingClientRect();
      return { t: r.top + scrollY, h: r.height, b: hx(c.getPropertyValue("--sb").trim() || "#ffffff"), f: c.getPropertyValue("--sf").trim() || "#17130F" };
    });
    // confine tra una sezione e la successiva + ampiezza della fascia di sfumatura
    // (mai oltre il 42% dell'altezza di ciascuna: ogni sezione conserva il proprio colore "pieno")
    A.forEach(function (a, i) {
      var n = A[i + 1];
      if (!n) { a.e = Infinity; a.w = 0; return; }
      a.e = (a.t + a.h + n.t) / 2;
      a.w = Math.min(innerHeight * .32, a.h * .42, n.h * .42);
    });
  }
  function paint() {
    tick = 0; if (!A.length) return;
    var y = scrollY + innerHeight * .5, i = 0;
    while (i < A.length - 1 && y > A[i].e + A[i].w) i++;
    var a = A[i], b = A[Math.min(i + 1, A.length - 1)], t = (a === b || !a.w) ? 0 : (y - (a.e - a.w)) / (2 * a.w);
    t = Math.max(0, Math.min(1, t)); t = t * t * (3 - 2 * t);
    root.style.setProperty("--page", "rgb(" + a.b.map(function (v, k) { return Math.round(v + (b.b[k] - v) * t); }) + ")");
    root.style.setProperty("--fg", t > .5 ? b.f : a.f);
    var m = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (m > 0 ? scrollY / m * 100 : 0) + "%";
    fx.style.setProperty("--sy", scrollY);
    if (motionOK) {
      var vc = scrollY + innerHeight / 2;
      secs.forEach(function (s, k) {
        var q = A[k], p = (vc - (q.t + q.h / 2)) / (q.h / 2 + innerHeight / 2);
        s.style.setProperty("--sp", Math.max(-1, Math.min(1, p)).toFixed(3));
      });
    }
    var h = $(".hero"); if (h) h.style.setProperty("--py", Math.min(scrollY, 700) * .15 + "px");
  }
  meas(); paint();
  addEventListener("scroll", function () { if (!tick) tick = requestAnimationFrame(paint); }, { passive: true });
  addEventListener("resize", function () { meas(); paint(); });
  addEventListener("load", function () { meas(); paint(); });
  setTimeout(function () { meas(); paint(); }, 800);
  if (motionOK && window.matchMedia && matchMedia("(hover:hover)").matches) {
    addEventListener("mousemove", function (e) {
      fx.style.setProperty("--mx", e.clientX / innerWidth - .5); fx.style.setProperty("--my", e.clientY / innerHeight - .5);
    }, { passive: true });
  }

  // comparsa delle sezioni allo scroll
  if ("IntersectionObserver" in window) {
    root.classList.add("js");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("in", e.isIntersecting); });
    }, { threshold: .04, rootMargin: "0px 0px -6% 0px" });
    $$("main>section").forEach(function (x) { io.observe(x); });
    $$(".gear").forEach(function (x) { io.observe(x); });
    $$(".story>*").forEach(function (x) { if (x.tagName !== "H2") io.observe(x); });
  }
})();