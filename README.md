# Multisurfaflex — website concept

Concept site for **Entreprise Multisurfaflex Inc.**, an éco-pavage (rubber paving) and EPDM
surfacing contractor based in Montréal-Est, Québec.

The whole site is one self-contained file, [`concept.html`](concept.html) — no build step, no
dependencies, no network calls except Google Fonts. Open it in a browser and it runs. Images are
embedded as data URIs so the file can be moved or hosted anywhere as-is.

```bash
python3 -m http.server 8712
# then open http://localhost:8712/
```

---

## Status: this is a concept, not a finished site

Most of the content is real and sourced. The parts that are not are marked in the page itself —
the footer carries a notice listing them, plus a **"Surligner chaque valeur de remplissage"**
toggle that highlights every placeholder region at once.

### Still needed before this can go live

| Item | Notes |
|---|---|
| Project photography | Three project tiles use generated textures. Real photos exist on the company Instagram. |
| Project areas (m² / ft²) | Currently shown as `— m²` |
| Hero photograph | **Currently AI-generated art direction, not a real job.** Must be replaced. |
| EPDM thickness and warranty | Marked "à confirmer" in the configurator |
| Email address | None found in any public listing |
| Years in business | Domain registered 2018; not confirmed |
| Form endpoint | The quote form does not submit anywhere yet |

There are **no invented customer reviews or ratings** anywhere on the page. The company has no
public reviews at time of writing, so none are shown.

---

## Domain situation

Worth resolving early, independently of this site:

- `multisurfaflex.com` — registered (Wix, renewed through 2028) but returns a **404**
  "ConnectYourDomain" error. This is the address linked from the company Instagram profile.
- `multisurfaflex.ca` — **not registered.** Search engines still index a stale entry for it.

The plan is to launch on the `.com` and disconnect the old Wix site.

---

## What the site is built on

### Product data

Technical figures, colour names and blend ratios come from the **GoRubber "Écopavage" brochure
(2024)**. Multisurfaflex is an installer member of the GoRubber network. The brochure is not
included in this repo — it is GoRubber's document, not ours.

| | |
|---|---|
| Granule | 1–3 mm recycled tire, 99.9 % metal removed |
| Binder | Polyurethane, cast in place |
| Compressive strength | 600 PSI |
| Void space | 27–29 % |
| Permeability | 5 800 gal/hr |
| Recycling | 1 tire per 10 ft² |
| Cure | 24 h foot · 72 h car · 1 week truck |
| Service life | 25–30 yrs+ |
| Installed | 25 years in Canada, 10+ in Québec |

### Two product lines

- **Écopavage** — recycled tire granulate. Bonds to asphalt, concrete, pavers, steel, roofing
  membrane, even bare gravel. Outdoor only, except stables and barns.
- **EPDM** — synthetic granulate. Requires a firm, non-granular base. The indoor and
  fine-finish product.

### Colour system

Four solid colours — Noir, Gris, Beige, Brun — and four named factory blends at published ratios:

| Blend | Mix |
|---|---|
| GREIGE | 50 % gris / 50 % beige |
| MOKA | 50 % brun / 50 % beige |
| GRIGIO | 50 % gris / 50 % noir |
| ONYX | 100 % noir |

The manufacturer's full catalogue is wider (red, green, blue, Eggshell). It was trimmed to the
four tones actually visible in the company's own project photography.

### Service area

Cities listed on the site are taken from geotags on the company's own Instagram posts:
Rosemère, Saint-Jérôme, Repentigny, Lachine, L'Assomption, Longueuil, Blainville,
Rivière-des-Prairies–Pointe-aux-Trembles, Montréal and Greater Montréal.

---

## How the page works

Bilingual FR/EN throughout — every string, including generated content, number formatting
(`9,5` vs `9.5`) and `<html lang>`. French is the default.

All imagery apart from the hero is **drawn procedurally on canvas**: a seeded granule renderer
scatters irregular coloured polygons in a binder matrix. This is honest to the product — the
surface genuinely is coloured granules bound in polyurethane — and it means the cross-sections,
before/after slider and project tiles need no photography to be accurate.

Interactive pieces:

- **Hero** — the photograph resurfaces itself on load: a drained, desaturated frame is revealed
  in full colour behind a jagged granular front. Falls back to procedural texture if the image
  fails, and skips the animation for `prefers-reduced-motion` or a hidden tab.
- **Before / after** — draggable and keyboard accessible; both states drawn procedurally.
- **Application cross-sections** — real layer build-ups per application, with the product
  (Écopavage or EPDM) declared for each.
- **Blend configurator** — surface type × colours × ratio, live granule re-render, emitting a
  spec code (`GREIGE · GRI 50 / BEI 50 · ÉCOPAVAGE`) that auto-fills the quote form.

Tested clean from **360 px to 1440 px**, in both light and dark themes.

---

## Layout

```
concept.html            the site — self-contained, this is the deliverable
index.html              redirect, so GitHub Pages serves the site at the repo root
assets/hero.jpg         hero image as embedded in the page (1800 px)
assets/hero-source-2k.png   full-resolution hero source (2752 × 1536)
assets/logo.png         company logo mark, cleaned and cut to a circle
```

`assets/` is provided for future edits — `concept.html` already embeds everything it needs and
does not read from it.
