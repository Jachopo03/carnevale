Deno.serve(async (req) => {
  if (req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")) {
    return new Response("non autorizzato", { status: 401 });
  }

  const { type, record } = await req.json();
  const giorni = (record.giorni || []).join(", ");

  let testo;
  if (!record.partecipa) {
    testo = `❌ ${record.nome} ${record.cognome} non viene`;
  } else {
    testo = `🍊 ${record.nome} ${record.cognome} viene (${giorni}), `
      + `${record.tira ? "tira" : "non tira"}`
      + `${record.dorme ? ", dorme da noi" : ""}`;
  }
  if (type === "UPDATE") testo = "✏️ Modifica: " + testo;

  const url = "https://api.callmebot.com/whatsapp.php"
    + `?phone=${Deno.env.get("WA_PHONE")}`
    + `&text=${encodeURIComponent(testo)}`
    + `&apikey=${Deno.env.get("WA_KEY")}`;

  const r = await fetch(url);
  return new Response(r.ok ? "ok" : "errore invio", { status: r.ok ? 200 : 502 });
});