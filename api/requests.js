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
    /* Pathnames are a descending timestamp, and list() returns them in
       lexicographic order, so the first N are the newest N. Cap the read:
       the owner wants recent leads, and fetching every blob on every page
       load is what eventually times the function out. */
    const want = Math.min(parseInt(req.query && req.query.limit, 10) || 200, 1000);

    const refs = [];
    let cursor;
    do {
      const page = await list({ prefix:"requests/", limit:1000, cursor });
      for (const b of page.blobs){
        if (refs.length >= want) break;
        refs.push(b.pathname);
      }
      cursor = (refs.length < want && page.hasMore) ? page.cursor : null;
    } while (cursor);

    /* read in parallel batches — sequential reads are the slow path that
       turns a long lead list into a timeout */
    const out = new Array(refs.length).fill(null);
    const BATCH = 12;
    for (let i = 0; i < refs.length; i += BATCH){
      const slice = refs.slice(i, i + BATCH);
      await Promise.all(slice.map(async function(pathname, k){
        try {
          /* get(pathname, { access }) -> { statusCode, stream, ... } | null
             useCache:false because a private read otherwise serves up to 60s
             of CDN cache, and a brand-new lead must never be missing */
          const g = await get(pathname, { access:"private", useCache:false });
          if (!g || !g.stream) return;
          out[i + k] = JSON.parse(await new Response(g.stream).text());
        } catch(err){
          console.error("read failed:", pathname, err && err.message);
        }
      }));
    }

    const rows = out.filter(Boolean);
    rows.sort(function(a,b){ return String(b.received_at||"").localeCompare(String(a.received_at||"")); });
    res.setHeader("Cache-Control","no-store");
    res.status(200).json({ count: rows.length, truncated: rows.length >= want, requests: rows });
  } catch(e){
    res.status(500).json({error: (e && e.message) || "list failed"});
  }
};
