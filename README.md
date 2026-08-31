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
| Live webhook test | The form posts to the LeadConnector hook but has not been fired against the real endpoint — one test submission will create a real record in the CRM |

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

### Three product lines

- **Écopavage** — recycled tire granulate. Bonds to asphalt, concrete, pavers, steel, roofing
  membrane, even bare gravel. Outdoor only, except stables and barns.
- **EPDM** — synthetic granulate. Requires a firm, non-granular base. The indoor and
  fine-finish product.
- **Polygranite** — a hybrid urethane polymer coating, not a granulate surfacing: two squeegee
  coats over a URALASTIC 90 primer. It is the only one of the three that goes on a **vertical**
  surface and the only one that bonds to **ceramic, wood and metal**, which makes it the
  balcony, stair and foundation product. Data and the twenty colour hexes come from
  Multiflexx (`groupemultiflex.com/revetement-polygranite`), the supplier; the swatch
  photography is in `assets/swatches-polygranite/`.

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

Three ranges, one per product. Every swatch on the site is the supplier's own
photographed chart rather than a flat colour chip, and every hex below was sampled from
the granulate in those photographs.

**Écopavage — 8 named blends + 12 CSBR granulates.** The blends are dosed at published
ratios from the numbered CSBR granulates, which are also sold on their own.

| Blend | Published mix | Sampled |
|---|---|---|
| GREIGE | 50 % CSBR grey · 50 % CSBR tan | `#6A635F` |
| GRIGIO | 70 % CSBR grey · 30 % CSBR black | `#68707B` |
| CARAMEL | 80 % CSBR tan · 20 % EPDM beige | `#8B7460` |
| MOKA | 50 % CSBR brown · 50 % CSBR tan | `#70594C` |
| SIERRA | 75 % CSBR tan · 25 % CSBR red | `#624539` |
| DAKOTA | 50 % CSBR grey · 50 % CSBR brown | `#4E4F50` |
| ONYX | 100 % CSBR black | `#474851` |
| TOPAZ | 80 % CSBR tan · 20 % EPDM eggshell | `#847263` |

CSBR-60 through CSBR-75: twelve through-coloured granulates including greens, blues and
two reds. Swatches in `assets/swatches-csbr/`.

**EPDM — 36 tones, named after grape varietals** (Sauvignon, Pinot, Chenin and Ruby each
run Blanc / Gris / Grigio; then Barolo, Barbera, Nebbiolo, Merlot, Malbec, Shiraz and the
rest). Swatches in `assets/swatches-epdm/`.

**Polygranite — 10 standard + 10 special order.** Flat colour chips, not photographs;
the supplier publishes no swatch photography for this line.

Two corrections came out of the supplier's live chart:

- It spells the blend **MOKA**, not MOCHA. The site said MOCHA, from the label on the
  company's own swatch photo.
- **SIERRA** and **DAKOTA** are current catalogue blends that were missing entirely.
- **TOPAZ** is kept because the company's own swatch folder has it, but it is *not* on
  the supplier's current page — worth confirming it is still sold.

### Quote form

Posts JSON to a LeadConnector (GoHighLevel) inbound webhook. The endpoint returns
`access-control-allow-origin: *`, so a normal cross-origin `fetch` works and the response
can be read — no `no-cors` guesswork.

Payload: `name, phone, email, city, application, application_key, area_sqft, colour, notes,
language, source, page, submitted_at`. `application` carries the human-readable label so a
lead lands in the inbox reading "Entrées et stationnements" rather than `res`.

Name and phone are required; the phone is checked for ten digits, since that is what actually
gets someone called back. A hidden honeypot field silently drops bots. If the post fails —
HTTP error or no network — the status line offers the phone number as a link rather than
stranding someone who has just typed out their whole job.

**It will not work inside the published Artifact.** The Artifact CSP blocks requests to
external hosts, so the fetch is refused there and the visitor sees the failure message with
the phone number. On the real host it works normally.

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

**The hero is generated, not a real job.** It was produced with fal (`flux-pro/v1.1-ultra`) as
art direction after the client rejected the photographed hero; the prompt is kept in
`assets/hero-prompt.txt` so it can be re-run or handed to a photographer as a brief. It must be
replaced with real photography before launch, and the footer notice on the page says so.

Every other photograph is the company's own, and the colour swatches are the manufacturer's
factory samples. The driveway that previously served as the hero was moved into the gallery
rather than dropped.

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
The site has **five views**: the home page, one page per product (Écopavage, EPDM,
Polygranite), and the gallery. The nav's *Galerie* link swaps
between them rather than scrolling to a section — `#gallery` in the URL opens the gallery
directly, and the brand mark returns home. There is no build step or router involved; it is a
`data-view` attribute on `<body>` and two CSS rules.

- **Gallery** — its own view, not a home-page section: a filterable grid with a category menu (Driveways, Pool surrounds, Balconies
  and patios, Sidewalks, Interior), live counts per category, and a keyboard-navigable
  lightbox (arrow keys, Escape, focus returns to the thumbnail). The lightbox walks the
  *filtered* set, so "2 / 4" means the second of four driveways, not of the whole library.

  **Adding photos:** append the base64 to `GALLERY` and a matching entry to `GAL_CAP` with
  `{c: category, fr: caption, en: caption}`. Counts, the menu and the lightbox all follow
  automatically; a category with no photos hides itself. Categories live in `GAL_CATS`.
- **Logo** — the mark is a tire, so it also takes a turn in the nav on arrival and half a turn
  on hover.

**On logo resolution:** the client supplied the master artwork at 1254px, which is what the
site now uses — cut to a transparent circle and quantized to 32 colours, so the embedded copy
is 560px but only ~20 KB. Nothing draws it above native: the splash mark renders at 0.7x and
the nav mark at 0.11x of the source pixels.

Note the master reads **"PAVING 100% RECYCLED · 100% RECYCLED TIRES"** — English on both arcs.
The older lockup recovered from the Wix site (`assets/logo-lockup.png`) reads
**"PNEUS 100% RECYCLÉS · 100% RECYCLED TIRES"**, which is bilingual. On a French-default site
the bilingual arc may be the better one; worth confirming which is current.
- **Blend configurator** — surface type and one of the six blends. The preview tiles the
  manufacturer's actual swatch photograph rather than a simulation, and emits a spec code
  (`GREIGE · ÉCOPAVAGE`) that auto-fills the quote form.

### On phones

- `viewport` meta with `viewport-fit=cover` — without it a phone lays the page out at ~980 px
  and zooms out. The artifact viewer injects its own, so this only shows up on a real host.
- A fixed **action bar** below 768 px: tap-to-call `438 530-2020` and jump to the quote form.
  For a contractor, calling is the conversion — it should never be more than one tap away.
- Every interactive target clears 40 px; buttons, chips and the language toggle clear 44–48.
- Form fields are 16 px, below which iOS zooms the page in on focus.
- `svh` rather than `vh` for the hero, so the collapsing browser chrome does not clip it.
- `touch-action: manipulation` to drop the 300 ms tap delay, and a branded tap highlight.

### Photography

The job photos were shot on phones over several years and vary in white balance and exposure.
They are corrected on a **neutral-referenced** basis: the illuminant is estimated only from
genuinely low-saturation highlights — concrete, siding, sky — and the level stretch runs on
luminance rather than per channel.

This matters. A standard grey-world balance reads these frames as "too warm", because most of
the frame *is* the tan surface, and neutralises the product's own colour. The first pass did
exactly that and had to be thrown away. **The surface colour is the thing being sold and is
never adjusted.**

**The hero stacks on phones and portrait tablets.** A 16:9 photograph inside a tall portrait
box loses roughly two thirds of the frame to the crop, so below 900px — or whenever the viewport
is taller than 5:4 — the picture runs full width at its own aspect ratio and the copy sits
underneath it on the navy ground. Measured crop is 0% on every phone and portrait tablet, and
0–5% on desktop.

Touch targets are sized by `@media (pointer: coarse)` rather than by viewport width, because an
834px iPad is a touch screen: sizing by breakpoint alone left twenty 16px-tall footer links, a
26px language toggle and both tap-to-call numbers under-sized at that width.

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
assets/logo.png         the roundel as used on the site (560px, quantized, transparent)
assets/logo-master.png  the client's master artwork, cut to a circle (1246px)
assets/logo-wordmark.png  "Multisurfaflex / PAVAGE ÉCORESPONSABLE" wordmark (388px)
assets/logo-lockup.png  the full horizontal lockup as recovered (600x315)
```

`assets/` is provided for future edits — `concept.html` already embeds everything it needs and
does not read from it.
