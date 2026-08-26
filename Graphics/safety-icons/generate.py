#!/usr/bin/env python3
"""Spectrum 3847 lab safety icon pack generator.

Glyphs are authored on a 96x96 grid using currentColor, so they can be
recolored with CSS `color:` or by string-replacing currentColor.
Badges compose glyphs into finished sign-style discs on a 120x120 grid.
"""
import os

BLUE = "#1D4988"
RED = "#A62022"

# ---------------------------------------------------------------- glyphs
# Each glyph: inner SVG markup for a 96x96 viewBox, drawn with currentColor.
S = 'stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"'
F = 'fill="currentColor"'

GLYPHS = {}

# Filled ISO-7010-style pictograms. Solid currentColor shapes; interior
# detail comes from evenodd cutouts and small gaps between shapes.
GLYPHS["safety-glasses"] = f'''
  <path fill-rule="evenodd" {F} d="M24 32 H72 C79 32 84 37 84 44 V50 C84 57 79 62 72 62 H60 C56.5 62 54 60 52.3 57 C51 54.8 50 54 48 54 C46 54 45 54.8 43.7 57 C42 60 39.5 62 36 62 H24 C17 62 12 57 12 50 V44 C12 37 17 32 24 32 Z M26.5 39 H33.5 A6.5 6.5 0 0 1 40 45.5 A6.5 6.5 0 0 1 33.5 52 H26.5 A6.5 6.5 0 0 1 20 45.5 A6.5 6.5 0 0 1 26.5 39 Z M62.5 39 H69.5 A6.5 6.5 0 0 1 76 45.5 A6.5 6.5 0 0 1 69.5 52 H62.5 A6.5 6.5 0 0 1 56 45.5 A6.5 6.5 0 0 1 62.5 39 Z"/>
  <rect x="2" y="41" width="10" height="12" rx="4" {F}/>
  <rect x="84" y="41" width="10" height="12" rx="4" {F}/>
'''

GLYPHS["hair-tied"] = f'''
  <circle cx="62" cy="19" r="9" {F}/>
  <circle cx="46" cy="38" r="16" {F}/>
  <path d="M17 84 C17 61 31 55 46 55 C61 55 75 61 75 84 Z" {F}/>
'''

GLYPHS["glove-work"] = f'''
  <rect x="32" y="20" width="8" height="30" rx="4" {F}/>
  <rect x="42" y="14" width="8" height="36" rx="4" {F}/>
  <rect x="52" y="17" width="8" height="33" rx="4" {F}/>
  <rect x="62" y="25" width="8" height="25" rx="4" {F}/>
  <path d="M32 44 H70 V64 H32 Z" {F}/>
  <line x1="34" y1="56" x2="22" y2="40" stroke="currentColor" stroke-width="11" stroke-linecap="round"/>
  <path d="M29 68 H73 L79 84 H23 Z" {F}/>
'''

GLYPHS["glove-nitrile"] = f'''
  <rect x="33" y="18" width="7" height="32" rx="3.5" {F}/>
  <rect x="42.2" y="11" width="7" height="39" rx="3.5" {F}/>
  <rect x="51.4" y="14" width="7" height="36" rx="3.5" {F}/>
  <rect x="60.6" y="23" width="7" height="27" rx="3.5" {F}/>
  <path d="M33 44 H67.6 V64 H33 Z" {F}/>
  <line x1="35" y1="55" x2="24" y2="40" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
  <rect x="27" y="68" width="46" height="10" rx="5" {F}/>
'''

GLYPHS["flame"] = f'''
  <path fill-rule="evenodd" {F} d="M52 10 C62 19 70 33 70 47 A22 22 0 0 1 26 47 C26 40 29 34 33 29 C34 35 37 39 42 40 C40 30 44 19 52 10 Z M48 47 C51 51 55 54 55 59 A7 7 0 0 1 41 59 C41 54 45 51 48 47 Z"/>
'''

GLYPHS["ear-protection"] = f'''
  <circle cx="48" cy="52" r="17" {F}/>
  <rect x="17" y="42" width="12" height="23" rx="6" {F}/>
  <rect x="67" y="42" width="12" height="23" rx="6" {F}/>
  <path d="M23 46 C23 24 73 24 73 46" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
'''

GLYPHS["respirator"] = f'''
  <path fill-rule="evenodd" {F} d="M26 44 A22 22 0 1 1 70 44 A22 22 0 1 1 26 44 Z M32 46 C32 41.5 40 39 48 39 C56 39 64 41.5 64 46 V56.5 C64 65 57 71 48 71 C39 71 32 65 32 56.5 Z"/>
  <path fill-rule="evenodd" {F} d="M35 47 C35 44 41 42 48 42 C55 42 61 44 61 47 V56 C61 63 55 68 48 68 C41 68 35 63 35 56 Z M48 51.5 A4 4 0 1 0 48 59.5 A4 4 0 1 0 48 51.5 Z"/>
  <path d="M18 78 C24 72 32 69 38 68 M78 78 C72 72 64 69 58 68" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/>
'''

GLYPHS["loose-items"] = f'''
  <path d="M38 7 L45 35 M58 7 L51 35" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="41" y="33" width="14" height="10" rx="3" {F}/>
  <path fill-rule="evenodd" {F} d="M38 47 H58 A4 4 0 0 1 62 51 V81 A4 4 0 0 1 58 85 H38 A4 4 0 0 1 34 81 V51 A4 4 0 0 1 38 47 Z M42 55 H54 A2.5 2.5 0 0 1 56.5 57.5 V60 A2.5 2.5 0 0 1 54 62.5 H42 A2.5 2.5 0 0 1 39.5 60 V57.5 A2.5 2.5 0 0 1 42 55 Z"/>
'''

# A long-gauntlet glove. The cuff is the whole point: it is what separates
# "heat gloves" from the work gloves in the no-gloves prohibition, so it is
# drawn tall and flared rather than cut off at the wrist.
GLYPHS["glove-heat"] = f'''
  <rect x="32" y="16" width="8" height="30" rx="4" {F}/>
  <rect x="42" y="10" width="8" height="36" rx="4" {F}/>
  <rect x="52" y="13" width="8" height="33" rx="4" {F}/>
  <rect x="62" y="21" width="8" height="25" rx="4" {F}/>
  <path d="M32 40 H70 V58 H32 Z" {F}/>
  <line x1="34" y1="52" x2="21" y2="35" stroke="currentColor" stroke-width="11" stroke-linecap="round"/>
  <path d="M28 60 H74 L80 88 H22 Z" {F}/>
'''

GLYPHS["shoe-closed-toe"] = f'''
  <path fill-rule="evenodd" {F} d="M26 74 V30 C26 24 30 20 36 20 H42 C46 20 48 23 48 27 V40 C48 46 52 50 58 51.5 L70 54.5 C78 56.5 84 61 84 68 V74 Z M31 30 H43 A1.75 1.75 0 0 1 43 33.5 H31 A1.75 1.75 0 0 1 31 30 Z M31 38 H43 A1.75 1.75 0 0 1 43 41.5 H31 A1.75 1.75 0 0 1 31 38 Z M31 46 H43 A1.75 1.75 0 0 1 43 49.5 H31 A1.75 1.75 0 0 1 31 46 Z"/>
  <path d="M26 78 H84 V82 A4 4 0 0 1 80 86 H30 A4 4 0 0 1 26 82 Z" {F}/>
'''

# ---------------------------------------------------------------- badges
# name -> (glyph, kind)   kind: required | prohibited | recommended
BADGES = {
    "safety-glasses-required":   ("safety-glasses", "required"),
    "hair-tied-required":        ("hair-tied", "required"),
    "closed-toe-shoes-required": ("shoe-closed-toe", "required"),
    "no-gloves":                 ("glove-work", "prohibited"),
    "no-flames":                 ("flame", "prohibited"),
    "no-loose-items":            ("loose-items", "prohibited"),
    "hearing-protection-required":    ("ear-protection", "required"),
    "heat-gloves-required":           ("glove-heat", "required"),
    "nitrile-gloves-required":        ("glove-nitrile", "required"),
    "hearing-protection-recommended": ("ear-protection", "recommended"),
    "respirator-recommended":         ("respirator", "recommended"),
    "nitrile-gloves-recommended":     ("glove-nitrile", "recommended"),
}


def glyph_svg(name):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" '
            f'role="img" aria-label="{name.replace("-", " ")}">'
            f'{GLYPHS[name]}</svg>\n')


def badge_svg(name, glyph, kind):
    label = name.replace("-", " ")
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" '
            f'role="img" aria-label="{label}">')
    if kind == "required":
        s = 0.70
        off = (120 - 96 * s) / 2
        body = (f'<circle cx="60" cy="60" r="56" fill="{BLUE}"/>'
                f'<g color="#FFFFFF" transform="translate({off:.1f} {off:.1f}) scale({s})">{GLYPHS[glyph]}</g>')
    elif kind == "recommended":
        s = 0.66
        off = (120 - 96 * s) / 2
        body = (f'<circle cx="60" cy="60" r="53" fill="none" stroke="{BLUE}" stroke-width="7"/>'
                f'<g color="{BLUE}" transform="translate({off:.1f} {off:.1f}) scale({s})">{GLYPHS[glyph]}</g>')
    else:  # prohibited
        s = 0.72
        off = (120 - 96 * s) / 2
        r = 50
        d = r * 0.7071
        body = (f'<circle cx="60" cy="60" r="{r}" fill="none" stroke="{RED}" stroke-width="8"/>'
                f'<g color="{RED}" transform="translate({off:.1f} {off:.1f}) scale({s})">{GLYPHS[glyph]}</g>'
                f'<line x1="{60-d:.1f}" y1="{60-d:.1f}" x2="{60+d:.1f}" y2="{60+d:.1f}" '
                f'stroke="{RED}" stroke-width="8" stroke-linecap="round"/>')
    return head + body + "</svg>\n"


def main():
    base = os.path.dirname(os.path.abspath(__file__))
    gdir = os.path.join(base, "glyphs")
    bdir = os.path.join(base, "badges")
    os.makedirs(gdir, exist_ok=True)
    os.makedirs(bdir, exist_ok=True)
    for name in GLYPHS:
        with open(os.path.join(gdir, f"{name}.svg"), "w") as f:
            f.write(glyph_svg(name))
    for name, (glyph, kind) in BADGES.items():
        with open(os.path.join(bdir, f"{name}.svg"), "w") as f:
            f.write(badge_svg(name, glyph, kind))
    print(f"wrote {len(GLYPHS)} glyphs, {len(BADGES)} badges")


if __name__ == "__main__":
    main()
