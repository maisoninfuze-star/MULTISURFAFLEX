/* Lists the stored quote requests for the owner's admin page.
 * Password is compared in constant time and never logged. */
const { list, get } = require("@vercel/blob");
const crypto = require("crypto");

function same(a, b){
  const A = Buffer.from(String(a)), B = Buffer.from(String(b));
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

module.exports = async function handler(req, res){
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected){ res.status(500).json({error:"ADMIN_PASSWORD is not set on the project"}); return; }

  const given = req.headers["x-admin-password"] || "";
  if (!given || !same(given, expected)){
    res.status(401).json({error:"mot de passe invalide"}); return;
  }

  try {
    const out = [];
    let cursor;
    do {
      const page = await list({ prefix:"requests/", limit:1000, cursor });
      for (const b of page.blobs){
        /* private store: the blob url is not publicly readable, so go through
           the SDK, which carries the same credentials put() and list() use */
        let text = null;
        try {
          /* get(pathname, { access }) -> { statusCode, stream, ... } | null
             useCache:false because a private read otherwise serves up to 60s
             of CDN cache, and a brand-new lead must never be missing */
          const g = await get(b.pathname, { access:"private", useCache:false });
          if (g && g.stream) text = await new Response(g.stream).text();
        } catch(err){
          console.error("read failed:", b.pathname, err && err.message);
        }
        if (text == null) continue;
        try { out.push(JSON.parse(text)); } catch(err){
          console.error("bad json:", b.pathname);
        }
      }
      cursor = page.hasMore ? page.cursor : null;
    } while (cursor);

    out.sort(function(a,b){ return String(b.received_at||"").localeCompare(String(a.received_at||"")); });
    res.setHeader("Cache-Control","no-store");
    res.status(200).json({ count: out.length, requests: out });
  } catch(e){
    res.status(500).json({error: (e && e.message) || "list failed"});
  }
};
