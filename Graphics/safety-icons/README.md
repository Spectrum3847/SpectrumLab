# Spectrum 3847 Lab Safety Icon Pack

SVG safety icons for machine-shop signage. Palette sampled from the PM-1130V sign.

## Structure

- `glyphs/` — bare pictograms in filled ISO-7010 style (solid silhouettes, detail via cutouts), 96×96 viewBox, drawn entirely in `currentColor`. Recolor with CSS (`color: #fff`), an inline `style`, or by string-replacing `currentColor`. Scale to any size — everything is vector with round caps.
- `badges/` — finished sign-style icons, 120×120 viewBox, fixed colors:
  - **Required** — solid blue disc (`#1D4988`), white glyph
  - **Recommended** — blue outlined ring, blue glyph
  - **Prohibited** — red ring + 45° slash (`#A62022`), red glyph
- `preview.html` — contact sheet of everything at several sizes, light and dark.
- `generate.py` — the generator. Edit a glyph path or add a new badge mapping and re-run `python3 generate.py` to rebuild every SVG consistently.

## Glyph → badge map

| Glyph | Badge | Kind |
|---|---|---|
| safety-glasses | safety-glasses-required | required |
| hair-tied | hair-tied-required | required |
| shoe-closed-toe | closed-toe-shoes-required | required |
| ear-protection | hearing-protection-required | required |
| glove-heat | heat-gloves-required | required |
| glove-nitrile | nitrile-gloves-required | required |
| glove-work | no-gloves | prohibited |
| flame | no-flames | prohibited |
| loose-items | no-loose-items | prohibited |
| ear-protection | hearing-protection-recommended | recommended |
| respirator | respirator-recommended | recommended |
| glove-nitrile | nitrile-gloves-recommended | recommended |

A glyph can back more than one badge — `ear-protection` and `glove-nitrile` each render
in both a required and a recommended kind, because the lab requires hearing protection at
some machines and merely recommends it at others.

## Where these are used on the site

`generate.py` writes into `Graphics/safety-icons/`; the badges are copied to
`public/safety-icons/badges/` and served from there. Two consumers:

- **`src/components/MachineSOP.astro`** — the PPE pill row at the top of all 26 machine SOP
  pages. Its `PPE_BADGES` map points each `ppe={[...]}` key at a badge filename.
- **`src/components/SafetyIcon.astro`** — inline use from MDX, e.g. the icon legend on
  the PPE page.

After editing a glyph, re-run the generator **and re-copy**:

```bash
python generate.py && cp badges/*.svg ../../public/safety-icons/badges/ && cp glyphs/*.svg ../../public/safety-icons/glyphs/
```

## Brand palette (from the PM-1130V sign)

| Token | Hex | Use |
|---|---|---|
| Blue | `#1D4988` | Required / recommended badges |
| Red | `#A62022` | Prohibition ring, slash, "never" glyphs |
| Purple | `#59197B` | Header bars |
| Deep purple | `#3E005C` | Footer bars, dark backgrounds |
| Accent purple | `#6E02A2` | Section labels |

## Usage in signs

Inline the SVG (preferred — keeps `currentColor` working and lets print CSS apply), or reference via `<img>` for the fixed-color badges. Example of recoloring a glyph:

```html
<span style="color:#fff; width:64px; display:inline-block">
  <!-- paste glyphs/flame.svg contents here -->
</span>
```

To build a new badge kind (e.g. yellow warning triangle), copy one of the badge branches in `generate.py`.
