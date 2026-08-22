# ISO 7010 symbols

Source files for the safety symbols used on the printable placards in
`public/signage/`. Downloaded from Wikimedia Commons, where each is released into
the **public domain** — no attribution required, none of ours to claim.

| File | Code | Meaning | Commons |
| --- | --- | --- | --- |
| `ISO_7010_M004.svg` | M004 | Wear eye protection | [File:ISO 7010 M004.svg](https://commons.wikimedia.org/wiki/File:ISO_7010_M004.svg) |
| `ISO_7010_M008.svg` | M008 | Wear safety footwear | [File:ISO 7010 M008.svg](https://commons.wikimedia.org/wiki/File:ISO_7010_M008.svg) |
| `ISO_7010_P028.svg` | P028 | Do not wear gloves | [File:ISO 7010 P028.svg](https://commons.wikimedia.org/wiki/File:ISO_7010_P028.svg) |
| `ISO_7010_P015.svg` | P015 | No reaching in | [File:ISO 7010 P015.svg](https://commons.wikimedia.org/wiki/File:ISO_7010_P015.svg) |

P015 is not on a placard yet. It's the right symbol if we ever put the
chip-clearing or "don't reach into the chuck" rule back on a sign.

The placards inline these rather than linking them, so a placard saved or printed
from a browser still carries its symbols.

## The ISO palette

Match these exactly when drawing a symbol we don't have:

| Role | Colour |
| --- | --- |
| Mandatory disc (blue) | `#005387` |
| Prohibition ring and bar (red) | `#b71f2e` |
| Warning field (yellow) | `#f6bd16` |
| Pictogram (black) | `#0e1313`, `#000000` on warning |
| Pictogram (white, on blue) | `#ffffff` |

## Gaps

ISO 7010 has no symbol for three things our placards need, so those pictograms are
not ISO — they are drawn into the correct ISO field so they still read as the right
category:

- **Tie back long hair** — mandatory, blue disc. Traced from line art supplied by
  the lab (`external-Ponytail-health-beauty-and-fashion-line-vectorslab.jpg`). The
  hair is filled solid and the face left as negative space, because the original's
  hairline strokes are about 1% of its width and vanish below roughly 80 px.
  **Licence unconfirmed** — the source looks like a commercial stock icon, so
  check the terms cover use on a public site, or replace it with something we own.
  Everything else in this folder is public domain; this one glyph is not.
- **No loose items** (lanyards, sleeves, jewellery) — prohibition, drawn as a
  lanyard and ID badge, the usual offender in a school shop.
- **Lathe entanglement** ("It Spins. It Grabs.") — warning triangle. The nearest
  ISO symbols are W024 (crushing of hands) and W025 (counter-rotating rollers);
  neither depicts a spindle, so the pictogram is a rotating chuck.

### Redrawing the hair glyph from scratch

If the licence forces a replacement, these are the failure modes from the attempts
before this one, all of which looked fine at 150 px and fell apart at badge size:
tracing the tail as an outline and returning along a parallel inner edge hollows it
into a crescent that reads as a headset hook; curling the tip back toward the neck
traps a field-coloured gap that reads as a hood; a separate tie band knocked out in
the disc colour turns the crown into a cap; and drawing facial anatomy at all is
wasted, since a nose and chin dissolve by 53 px. What carries the meaning is the
outline of the hair mass — crown plus tail — not the face.
