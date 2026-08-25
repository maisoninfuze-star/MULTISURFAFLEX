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
| Project areas and cities | Each project tile needs its municipality and square footage attached |
| Photo vetting | Frames were checked for house numbers, faces and third-party signage — worth a second pass by someone who knows the jobs |
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

The six named blends the company actually sells. Every hex below was sampled from the
manufacturer's own swatch photography, held in `assets/swatches/`.

| Blend | Sampled |
|---|---|
| CARAMEL | `#8C7560` |
| TOPAZ | `#847263` |
| GRIGIO | `#69717C` |
| GREIGE | `#6A635F` |
| MOCHA | `#71594B` |
| ONYX | `#464850` |

The wider catalogue also runs twelve numbered CSBR codes (CSBR-60 through CSBR-75), including
reds, greens and blues. The site shows only the six named blends, which cover the work in the
company's own project archive.

### Service area

Cities listed on the site are taken from geotags on the company's own Instagram posts:
Rosemère, Saint-Jérôme, Repentigny, Lachine, L'Assomption, Longueuil, Blainville,
Rivière-des-Prairies–Pointe-aux-Trembles, Montréal and Greater Montréal.

---

## How the page works

Bilingual FR/EN throughout — every string, including generated content, number formatting
(`9,5` vs `9.5`) and `<html lang>`. French is the default.

Photography is the company's own throughout — hero, project tiles — and the colour swatches are
the manufacturer's factory samples.

The cross-sections and the before/after slider are **drawn procedurally on canvas**: a seeded
granule renderer scatters irregular coloured polygons in a binder matrix. This is honest to the
product — the surface genuinely is coloured granules bound in polyurethane — and it lets those
two diagrams stay accurate without needing a photograph of every build-up.

Interactive pieces:

- **Hero** — the photograph resurfaces itself on load: a drained, desaturated frame is revealed
  in full colour behind a jagged granular front. Falls back to procedural texture if the image
  fails, and skips the animation for `prefers-reduced-motion` or a hidden tab.
- **Before / after** — draggable and keyboard accessible; both states drawn procedurally.
- **Application cross-sections** — real layer build-ups per application, with the product
  (Écopavage or EPDM) declared for each.
- **Opening splash** — the mark rolls in behind a rim that draws itself and a tread ring that
  runs, then the name rises and the overlay lifts. It ships in the HTML so it owns the very
  first paint, and a pre-paint script skips it on repeat views in the same session and under
  `prefers-reduced-motion` — so there is never a flash either way. Tap to skip; a failsafe
  removes it regardless at 5.2 s. `#intro` replays it, `#introhold` freezes it for review.
  The hero's own reveal is held back until the overlay lifts, so it is never wasted behind it.
- **Gallery** — twelve more jobs in a grid, each opening in a keyboard-navigable lightbox
  (arrow keys, Escape, focus returns to the thumbnail).
- **Logo** — the mark is a tire, so it also takes a turn in the nav on arrival and half a turn
  on hover.
- **Blend configurator** — surface type and one of the six blends. The preview tiles the
  manufacturer's actual swatch photograph rather than a simulation, and emits a spec code
  (`GREIGE · ÉCOPAVAGE`) that auto-fills the quote form.

Tested clean from **360 px to 1440 px**, in both light and dark themes.

---

## Layout

```
concept.html            the site — self-contained, this is the deliverable
index.html              redirect, so GitHub Pages serves the site at the repo root
assets/hero.jpg         hero image as embedded in the page (1800 px)
assets/hero-source.jpg  full-resolution hero source (4032 × 2268)
assets/projects/        the three project photographs, as embedded
assets/gallery/         the twelve gallery photographs, full resolution
assets/swatches/        the six factory colour swatches, full resolution
assets/logo.png         company logo mark, cleaned and cut to a circle
```

`assets/` is provided for future edits — `concept.html` already embeds everything it needs and
does not read from it.
