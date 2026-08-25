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

### Site palette

White ground, blue structure, green accent — the GoRubber EPDM palette, sampled from
`gorubber.net/surfaces-epdm`, at the client's request.

| Role | Value |
|---|---|
| Ground | `#FFFFFF` |
| Ink | `#0F2437` |
| Accent (links, buttons) | `#0064AD` |
| Green mark | `#80CE48` |
| Green as text | `#457A1E` |

**There is no automatic dark mode.** The client asked for white, so the design commits to it:
a visitor whose device is in dark mode still gets the white page (`color-scheme: light`).
The photography panels carry their own dark palette explicitly, which is what stops the page
looking washed out.

Their lime `#80CE48` is only **1.94:1** on white, so it is used as a graphic mark and never as
small text on the light ground — `--lime-ink` stands in where green has to be read. Their blue
clears 6.1:1 and carries the links and buttons. Every pairing in both themes was checked at
4.5:1 or better.

The photography panels — hero, cross-sections, configurator, project tiles, quote, splash —
stay dark in both themes, so the product always sits on a consistent ground.

### Colour system

The six named blends the company actually sells. The mixes below are transcribed from the
label printed on each factory swatch, in `assets/swatches/`; the hexes are sampled from the
granulate in the same photographs.

| Blend | Published mix | Sampled |
|---|---|---|
| CARAMEL | 80 % CSBR tan · 20 % EPDM beige | `#8C7560` |
| TOPAZ | 80 % CSBR tan · 20 % EPDM eggshell | `#847263` |
| GRIGIO | 70 % CSBR grey · 30 % CSBR black | `#69717C` |
| GREIGE | 50 % CSBR grey · 50 % CSBR tan | `#6A635F` |
| MOCHA | 50 % CSBR brown · 50 % CSBR tan | `#71594B` |
| ONYX | 100 % CSBR black | `#464850` |

The wider catalogue also runs twelve numbered CSBR codes (CSBR-60 through CSBR-75), including
reds, greens and blues. The site shows only the six named blends, which cover the work in the
company's own project archive.

### Service area

Cities listed on the site are taken from geotags on the company's own Instagram posts:
Rosemère, Saint-Jérôme, Repentigny, Lachine, L'Assomption, Longueuil, Blainville,
Rivière-des-Prairies–Pointe-aux-Trembles, Montréal and Greater Montréal.

---

## How the page works

### Typefaces

| Role | Face | Why |
|---|---|---|
| Display | **Bricolage Grotesque** | Variable width and optical size; real character in the letterforms, and the accented caps sit properly rather than being squeezed |
| Body | **Instrument Sans** | Clean humanist sans that suits the blue/white palette; a serif read bookish against it |
| Spec labels and data | **Martian Mono** | Wide, engineered, tabular — carries the granulometry, ratios and blend codes |

Bricolage tops out at `wdth 100` (Archivo went to 125), so the width settings were re-tuned
rather than carried over and silently clamped.

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

**On logo resolution:** the best raster available is 147px, recovered from the archived Wix
site's lockup (the Instagram avatar was only 128px, and Wix's larger renders are token-gated
now). Nothing on the page draws it above that: the splash mark is set to 73px and the wordmark
to 194px, which is exactly 1:1 at 2x DPR. The scale in the splash is carried by the SVG ring,
which is vector and sharp at any size. **If the original vector (AI/EPS/SVG) turns up, the mark
can be made as large as we like** — that is the only thing holding it back.
- **Blend configurator** — surface type and one of the six blends. The preview tiles the
  manufacturer's actual swatch photograph rather than a simulation, and emits a spec code
  (`GREIGE · ÉCOPAVAGE`) that auto-fills the quote form.

Tested clean from **360 px to 1440 px**, including with the device set to dark mode.

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
assets/logo.png         the roundel, cut to a circle (147px — the best available)
assets/logo-wordmark.png  "Multisurfaflex / PAVAGE ÉCORESPONSABLE" wordmark (388px)
assets/logo-lockup.png  the full horizontal lockup as recovered (600x315)
```

`assets/` is provided for future edits — `concept.html` already embeds everything it needs and
does not read from it.
