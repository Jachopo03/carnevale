// Chiamate alle funzioni Supabase (RPC). Da caricare dopo config.js.
window.API = (function () {
  var C = window.CONFIG || {};
  function rpc(name, args) {
    return fetch(C.SUPABASE_URL + "/rest/v1/rpc/" + name, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: C.SUPABASE_ANON_KEY, Authorization: "Bearer " + C.SUPABASE_ANON_KEY },
      body: JSON.stringify(args || {})
    }).then(function (r) {
      return r.json().catch(function () { return null; }).then(function (b) {
        if (!r.ok) throw new Error((b && b.message) || String(r.status));
        return b;
      });
    });
  }
  return {
    rpc: rpc,
    posti: function () {
      if (!C.SUPABASE_URL || !C.SUPABASE_ANON_KEY) return Promise.resolve(0);
      return rpc("posti_letto").then(function (n) { return Number(n) || 0; });
    }
  };
})();
