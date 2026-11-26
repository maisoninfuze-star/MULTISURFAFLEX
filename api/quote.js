/* Receives the quote form, keeps a copy, forwards to GoHighLevel.
 *
 * Order matters: GHL is the critical path and runs first. Storing is
 * best-effort — if the blob write fails the lead still reaches the CRM,
 * which is exactly how the site behaved before this function existed.
 */
const { put } = require("@vercel/blob");

const HOOK = "https://services.leadconnectorhq.com/hooks/A1Y2JfCdzrvuEDvZsXfy" +
             "/webhook-trigger/4f46e334-c95a-4dcb-b843-685255b961a6";

const FIELDS = ["name","phone","email","city","application","application_key",
                "area_sqft","colour","notes","language","source","page",
                "notify_email","submitted_at"];

function clean(body){
  const out = {};
  for (const k of FIELDS){
    const v = body[k];
    out[k] = typeof v === "string" ? v.slice(0, 2000) : (v == null ? "" : String(v).slice(0,2000));
  }
  return out;
}

module.exports = async function handler(req, res){
  if (req.method !== "POST") { res.status(405).json({error:"method"}); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch(e){ body = {}; } }
  if (!body || typeof body !== "object") body = {};

  /* honeypot: silently accept so a bot learns nothing */
  if (body.website) { res.status(200).json({ok:true}); return; }

  if (!String(body.name||"").trim() || !String(body.phone||"").trim()){
    res.status(400).json({error:"name and phone are required"}); return;
  }

  const rec = clean(body);
  rec.received_at = new Date().toISOString();
  rec.ip_country  = req.headers["x-vercel-ip-country"] || "";

  let forwarded = false, ghlError = "";
  try {
    const r = await fetch(HOOK, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(rec)
    });
    forwarded = r.ok;
    if (!r.ok) ghlError = "HTTP " + r.status;
  } catch(e){ ghlError = e.message; }
  rec.forwarded_to_crm = forwarded;
  if (ghlError) rec.crm_error = ghlError;

  let stored = false;
  try {
    /* newest-first ordering for free: blob list is lexicographic by pathname,
       so store a descending timestamp key */
    const inv = (1e13 - Date.now()).toString().padStart(14,"0");
    const rand = Math.random().toString(36).slice(2,8);
    await put("requests/" + inv + "-" + rand + ".json", JSON.stringify(rec, null, 1), {
      access:"private", contentType:"application/json", addRandomSuffix:false
    });
    stored = true;
  } catch(e){
    console.error("blob write failed:", e && e.message);
  }

  /* the submission counts as accepted if EITHER path kept it */
  if (!forwarded && !stored){ res.status(502).json({error:"not stored"}); return; }
  res.status(200).json({ok:true, forwarded, stored});
};
