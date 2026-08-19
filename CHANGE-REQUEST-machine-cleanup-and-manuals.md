# Change Request: Remove decommissioned machines, add manual links, filament research

Handoff doc — not part of the site content collection. Three independent pieces of work below: (1) delete two machines and every reference to them, (2) add specific manual/tutorial links to five existing machine pages, (3) reference data for every filament actually purchased by the lab (per real order history), for whoever expands the filament guide.

---

## 1. Delete decommissioned machines

**Delete these files:**
- `src/content/docs/cnc/shopsabre-23.mdx`
- `src/content/docs/cnc/` (the whole folder — `shopsabre-23.mdx` is the only file in it)
- `src/content/docs/forming/box-pan-brake.mdx`

**`astro.config.mjs` sidebar** — in the `CNC & Laser Cutting` section, remove the ShopSabre item:
```js
{ label: 'ShopSabre 23 CNC Router', slug: 'cnc/shopsabre-23' },
```
No CNC machine remains in that section once this is gone — consider renaming the section label to just `Laser Cutting`. Your call.

In the `Sheet Metal & Forming` section, remove the Box & Pan Brake item:
```js
{ label: 'Box & Pan Brake', slug: 'forming/box-pan-brake' },
```

**`src/data/navigation.ts`** — remove from the `Machines` top-menu items array:
```js
{ label: 'ShopSabre 23 Router', href: '/cnc/shopsabre-23/', blurb: 'CNC router — speeds, feeds & CAM' },
```
(Box & Pan Brake was never in the top menu — nothing to remove there.)

### Downstream references that will break — fix each

- **`src/content/docs/cutting/drill-press-shear.mdx:123`** — "Related pages" line links to `[Box & Pan Brake](/forming/box-pan-brake/)`. Drop that segment.
- **`src/content/docs/forming/langmuir-titan-25t.mdx:173`** — "Related pages" line links to `[Box & Pan Brake](/forming/box-pan-brake/)`. Drop that segment.
- **`src/content/docs/waterjet/wazer-pro.mdx:187`** — last sentence points flat-aluminum-with-pockets work to `[ShopSabre CNC router](/cnc/shopsabre-23/)`. Rewrite or drop the sentence — there's no longer a CNC router to redirect to.
- **`src/content/docs/safety/gloves-and-ppe.mdx:47`** — glove-hazard table has a row `| CNC router (ShopSabre) | ... |`. Remove the row (no CNC router left in the lab).
- **`src/content/docs/index.mdx:69` and `:71`** — two `explore-card` links, one to `/cnc/shopsabre-23/`, one to `/forming/box-pan-brake/`. Remove both cards.
- **`src/content/docs/overview/lab-tour.mdx:64`** — prose lists lab machines including "the ShopSabre CNC router". Drop that clause.
- **`src/content/docs/overview/lab-tour.mdx:74`** — `**CNC:**` bullet only lists ShopSabre. Remove the whole bullet line.
- **`src/content/docs/maintenance/schedules.mdx:49`** — weekly-tasks bullet mentions ShopSabre spoilboard vacuuming. Remove it.
- **`src/content/docs/maintenance/schedules.mdx:86-91`** — dedicated `### [ShopSabre 23 CNC Router](/cnc/shopsabre-23/)` subsection with its own task table. Remove the whole subsection.
- **`src/data/maintenance.json`** — remove the top-level weekly-tasks string mentioning ShopSabre (`"ShopSabre: vacuum spoilboard and rails..."`) and remove the `"shopsabre-23": [...]` machine-tasks key entirely.
- **`src/data/tools-procurement.json`** — remove the `"shopsabre-23": {...}` object (procurement record for a machine that no longer exists on the site).
- **`src/data/consumables.json`** — remove the `single-flute-endmills` entry (id `single-flute-endmills`, `"machines": ["shopsabre-23"]`) — it's CNC-router-specific tooling with no remaining consumer. If there's a reason to keep it around for a future router, at minimum drop the `machines` tag reference to `shopsabre-23`.

Box & Pan Brake never had entries in `consumables.json`, `maintenance.json`, or `tools-procurement.json` — nothing to clean up there.

---

## 2. Manual & tutorial links to embed

Add these as `<TutorialLink>` entries in each page's existing `## Resources` section (all five pages already have one — add to it, don't create a new section). Research was done via live web search/fetch on 2026-08-18; flagged items could not be independently confirmed and should get a manual check before publishing.

### Gweike Cloud M3 Ultra — `src/content/docs/lasers/gweike-m3-ultra.mdx`
- Already present and confirmed live: **Gweike Cloud Documentation** — https://www.gweikecloud.com/pages/gweikecloud-documentation
- "MLaser tutorials" — **no separate MLaser tutorial page exists.** MLaser is the M-Series control software itself, distributed as a download (`Mlaser-v0.0.1.51_Beta.zip`) from the Documentation portal above — that link already covers it. Closest thing to a video tutorial series: YouTube playlist "Gweike M Series Laser System" — https://www.youtube.com/playlist?list=PLh-EoQc39hqRqw7xiJkvqm-WMkPhxLduo — **unverified**, couldn't confirm the playlist is MLaser-software-specific rather than general M-series hardware. Preview it before adding.

### Langmuir Titan 25T — `src/content/docs/forming/langmuir-titan-25t.mdx`
- Already present and confirmed current: **Titan 25T Quick Start Operating Manual (PDF)** — https://forum.langmuirsystems.com/uploads/short-url/zypmJaUfCvNX2UBHZYZVX7J6uy8.pdf (no newer manual found after checking langmuirsystems.com/downloads and /support/titan25t)
- New — **BendControl video tutorial**: "Mastering Bend Control with Langmuir Systems TITAN 25T!" — https://www.youtube.com/watch?v=0cCH_b2FtTE (2024-07-18, explicitly about the BendControl software)

### Thunder Nova 35 — `src/content/docs/lasers/thunder-nova-35.mdx`
- Already present and confirmed: **Thunder Laser USA Support Portal / knowledge base** — https://support.thunderlaserusa.com/ (confirmed via search results resolving into the KB structure, e.g. https://support.thunderlaserusa.com/portal/en/kb/thunderlaser-usa; direct fetch was blocked by bot protection, so this is search-confirmed not fetch-confirmed). No page changes needed here — the requested link is already on the page.

### WAZER Pro — `src/content/docs/waterjet/wazer-pro.mdx`
- Already present: **WAZER Pro User Manual Downloads** page — https://support.wazer.com/wazer-pro-user-manual-downloads — confirmed this page lists "WAZER Pro Full User Manual Ver 1.4" by name (plus _DK/_KR language variants). The download links on that page are dynamic/gated, so link the landing page itself rather than a guessed PDF filename — that satisfies "v1.4" without a broken direct link.
- New — **WAM software guides**: landing page https://support.wazer.com/miscellaneous-downloads/wam-manual-download, direct PDF https://support.wazer.com/s/WAM-section_B_V14.pdf ("WAM section_B_V1.4"), and the FAQ/procedures hub https://support.wazer.com/resources/maintenance/wam-procedures. Recommend adding the landing page as the primary link.

### xTool MetalFab — `src/content/docs/lasers/xtool-metalfab.mdx`
- Already present: **xTool MetalFab User Manual** (https://support.xtool.com/article/1760) and **MetalFab CNC Cutter Setup & Use Guide** (https://support.xtool.com/article/1913) — both reconfirmed live.
- New — **xTool support hub**: general root is https://support.xtool.com/, but more specific per-product hub pages exist and are a better fit: https://support.xtool.com/product/56 (MetalFab Laser Welder) and https://support.xtool.com/product/55 (MetalFab CNC Cutter). Recommend linking both product hub pages rather than the generic root.

---

## 3. Filament reference data (from real order history)

Context: `src/data/filaments.json` currently models only **5 generic material buckets** (`pla`, `petg`, `tpu`, `pa-cf`, `pc`), each rendered by `<FilamentCard>` on [filament-guide.mdx](src/content/docs/3d-printing/filament-guide.mdx). The lab's actual Amazon/Bambu/3D-Fuel/go3dprint order history covers **28 distinct products** spanning specialty variants the current schema doesn't represent (glass/carbon-fiber-reinforced PETG, PPA, PLA; multiple TPU/TPE hardnesses; taulman nylon family; PC-CF). This section is raw research for whoever decides how to fold it in — as new `FilamentCard` entries, a separate "specialty/engineering filament" table, or just inline notes. **Not a request to restructure `filaments.json` — that's a design decision for the other AI/you to make.**

Research pulled live via WebSearch/WebFetch on 2026-08-18. Fields marked **NOT FOUND** or **COULD NOT VERIFY** could not be confirmed from a manufacturer/first-party source — spot-check those against the physical spool label before publishing. Several manufacturer domains (taulman3d.com, bambulab.com direct fetch, thunderlaserusa.com) block automated fetching, so some figures are WebSearch-snippet-confirmed rather than page-confirmed; noted inline.

### Bambu Lab-brand (direct from bambulab.com — all RFID-tagged, auto-profile in Bambu Studio/AMS)

**PPA-CF** (Black, SKU 73100, 0.75kg) — https://us.store.bambulab.com/products/ppa-cf
Nozzle 280–320°C · Bed 100–120°C (Engineering/Textured/Smooth PEI, no Cool Plate) · Speed <100mm/s · Dry 100–140°C/8–12h (mandatory, hygroscopic) · **Hardened nozzle required** (0.6mm first choice, no 0.2mm) · Enclosure required · **Not AMS-compatible** (any AMS model — external spool holder only) · Support: no dedicated Bambu product (see PET/PA support note below) · Distinct product from PAHT-CF (higher modulus/strength, different resin family — PPA vs PA12) · Carbon dust — gloves for handling.

**PAHT-CF** (Black, 0.5kg / 1kg) — https://us.store.bambulab.com/products/paht-cf
Successor to discontinued "PA-CF"; "plain PAHT" does not exist as a product — treat as shorthand for this. Nozzle 260–300°C · Bed 90–120°C · Speed not published · Dry 80°C/12h mandatory, highly hygroscopic · **Hardened nozzle + hardened extruder gears required** · Enclosure required (open-frame unsuitable) · AMS: standard AMS/AMS HT yes, AMS Lite no · Support: Bambu "Support for PA/PET" (now discontinued — see below; community fallback is ABS/ASA as interface) · Remove supports within 2h of printing (moisture swelling sticks them) · Carbon dust hazard.

**PET-CF** (Black, 0.5kg / 1kg) — https://us.store.bambulab.com/products/pet-cf
Nozzle 260–300°C · Bed 70–100°C · Speed ≤100mm/s (0.6mm nozzle recommended) · Dry 80°C/8–12h, highly hygroscopic · **Hardened nozzle + gears required** · Not compatible with 0.2mm stainless nozzle or Bambu Liquid Glue · AMS: standard yes, Lite no, AMS HT best-suited for drying · Support: same discontinued-support caveat as PAHT-CF · **Distinct SKU from PETG-CF below** — different base resin (PET vs PETG) and different temps, not a naming variant.

**PETG-CF** (Black, 1kg) — https://us.store.bambulab.com/products/petg-cf
Nozzle 240–270°C · Bed 60–80°C · Speed <200mm/s, fan 0–40% · Dry 65°C/8h · **Hardened nozzle + gears required** · AMS: standard yes, **AMS Lite yes** (one of only two CF filaments AMS Lite–compatible, with PLA-CF), AMS 2 Pro yes · Support: Bambu Support for PLA/PETG · Enclosure recommended, not mandatory · Glossier finish than PLA-CF, hides layer lines.

**PLA-CF** (Burgundy Red, 1kg) — https://us.store.bambulab.com/products/pla-cf
Nozzle 210–240°C · Bed 45–65°C · Speed <250mm/s, fan 50–100% · Dry 55°C/8h (low hygroscopicity vs. nylon/PET-CF, still recommended); optional anneal 55–60°C/6–12h for heat resistance · Hardened nozzle recommended (not strictly mandatory — Bambu engineered this + PETG-CF to minimize gear wear) · AMS: standard yes, **AMS Lite yes**, AMS 2 Pro yes · Support: "Support for PLA New Edition" (formerly Support W) · No enclosure required, full printer lineup compatible · Matte finish, near-invisible layer lines, low warp. Burgundy Red confirmed via third-party retailer listings; verify swatch on live page before publishing.

**PLA Sparkle** (Royal Purple Sparkle, HEX #483D8B, SKU 13700, 1kg) — https://us.store.bambulab.com/products/pla-sparkle
Nozzle ~220°C (color-specific, not first-party-page-confirmed) · Bed ~55°C · Speed not published (excluded from the standard PLA spec row on Bambu's wiki) · Dry ~55°C/8h if needed (mild hygroscopicity) · 0.4mm hardened steel nozzle recommended (metal-particle filled), no 0.2mm · No enclosure needed · AMS: all models compatible · Support: standard Bambu PLA/PETG support if needed.

**Support for PA/PET** (0.5kg) — https://us.store.bambulab.com/products/support-for-pa-pet
**DISCONTINUED** — Bambu's own product page states this and recommends **Bambu ABS or ASA as the replacement** for PA/PET support applications going forward. (Historical specs, if any remaining stock is on hand: nozzle 280–300°C, bed 80–110°C with glue, dry 80°C/8–12h mandatory, hardened nozzle only, AMS standard/HT yes — Lite no.) Was the correct support for PAHT-CF, PA6-CF, PA6-GF, PET-CF.

**PC** (White, 1kg) — https://us.store.bambulab.com/products/pc-filament
Nozzle 260–290°C · Bed 90–120°C (glue stick; liquid glue not recommended) · Speed <300mm/s (not first-party-page-confirmed, cross-search-consistent) · Dry 80°C/8h (blast oven) or 100°C/12h (heatbed), hygroscopic · Hardened nozzle not mandatory for plain PC (only for PC-CF/PC-FR variants) · **Enclosure required — not compatible with A-series/open-frame printers** · AMS: standard/HT yes, Lite no · No dedicated Bambu support product marketed for plain PC · High fumes — ventilate.

*Cross-cutting note: Bambu H2D ships with hardened nozzle + hardened extruder gears stock. X1-Carbon's stock gear hardness for sustained CF/GF use was not definitively confirmed — Bambu sells a hardened-steel extruder/gear upgrade kit for the X1 series; treat as needed for X1C doing heavy CF work unless the lab's specific unit is confirmed otherwise.*

### Siraya Tech Fibreheart line (Amazon)

**Fibreheart TPU-GF** (Black, 1kg, 64D) — mfr: https://siraya.tech/products/fibreheart-tpu-gf-15-glass-fiber-filament · Amazon: https://www.amazon.com/Siraya-Tech-Fibreheart-Reinforced-Engineering/dp/B0FXWXQ6TW
Nozzle 240–270°C · Bed 40–60°C · Speed 30–100mm/s · Dry 50–60°C/6h+ · **Hardened nozzle required** (brass wears fast) · **Official Bambu Studio profiles exist** (X1C/P1S/A1/A1 mini/H2D/H2S/P2S/H2C/X2D/A2L) and OrcaSlicer profiles for several other printers — download at https://siraya.tech/pages/print-settings-download · No native PrusaSlicer profile · AMS/AMS Lite compatible, **not AMS 2** · Enclosure optional · GF dust — N95+ mask and goggles for sanding/machining.

**Fibreheart PPA-GF** (White, 1kg, 15% GF) — mfr: https://siraya.tech/products/fibreheart-ppa-gf-filament · Amazon: https://www.amazon.com/Siraya-Tech-Fibreheart-Reinforced-Temperature/dp/B0G5276CWP
Nozzle 300–320°C (all-metal hotend required) · Bed 80–110°C, chamber 60–80°C recommended · Speed 30–100mm/s (first layer 20–30) · **Dry 80–100°C/4–6h before every session** · Hardened nozzle required, ≥0.4mm · Bambu Studio + OrcaSlicer profiles available at the link above; no native PrusaSlicer profile confirmed · **AMS explicitly not compatible** · Fan off · Enclosed/heated chamber strongly recommended · **N95+ respirator and HEPA/carbon ventilation explicitly recommended** for print + post-processing.

**Fibreheart PPA-CF** (Black, 1kg — this is Siraya's PAHT-CF-based product, not Bambu's) — mfr: https://siraya.tech/products/siraya-tech-fibreheart-paht-cf-colors-1-75mm-ppacf-filament-fdmprinting · Amazon: https://www.amazon.com/Siraya-Tech-Fibreheart-Printing-Filament/dp/B0DKW7B6NT (do not confuse with the "PPA-CF Core" 25%-CF variant at a different ASIN)
Nozzle 280–320°C · Bed 70–90°C · Speed 30–120mm/s · Dry only if moisture present, 100°C/4–6h · Hardened nozzle required, 0.4–1.0mm · Bambu Studio + OrcaSlicer + native PrusaSlicer (XL/MK4S/Core One) profiles available at siraya.tech/pages/print-settings-download · Fan off · **Enclosure mandatory per manufacturer** — explicitly advises against A1/A1 mini · AMS compatibility conflicting across sources — treat as not recommended pending Siraya confirmation.

*All three require hardened (steel/ruby/tungsten-carbide) nozzles minimum; the two PPA (nylon) variants need an all-metal hotend for 300°C+.*

### TPU / TPE (Amazon)

**CC3D Hard TPU 72D** (Transparent, 1kg) — Amazon: https://www.amazon.com/CC3D-Hardness-Transparent-Toughness-Comparable/dp/B0CFY1S38G
Nozzle 225–245°C (sources vary 230–240 vs ~240) · Bed **conflicting sources: 60°C (reseller) vs 30–35°C (aggregator) — test from 30°C up** · Speed 30–40mm/s, retraction 0–4mm/45–50mm/s · Shore 72D confirmed, stiffer than typical 95A TPU · Dry 60–65°C/6h, highly hygroscopic · Not confirmed AMS-safe — treat as external-spool-only · No dedicated slicer profile found — start from Generic TPU/Bambu TPU-95A · Bendable but not very stretchy; layer adhesion very temperature-sensitive.

**eSUN TPE-83A** (Black, 1kg) — mfr: https://www.esun3d.com/elastic-tpe-83a-product/ · Amazon: https://www.amazon.com/eSUN-Flexible-Filament-Printing-Printers/dp/B08RRWZRPQ
Nozzle 220–250°C · Bed 45–60°C · Speed <50mm/s · Shore 83A · Dry 55°C/4h+ · **Not AMS-safe** — documented feeding failures/jams in Bambu AMS, needs direct-drive/short-path extruder, external spool holder · eSUN publishes a Bambu-printer parameter sheet (https://www.esun3d.com/zldownload/hs-parameters-for-bambu-lab-creality/) but no confirmed importable profile; no PrusaSlicer profile, community suggests starting from NinjaFlex · 100% part-cooling fan · Known "sizzling" sound = wet filament.

**HATCHBOX TPU 95A** (White, 1kg) — mfr page exists (hatchbox3d.com/products/3d-tpu-1kg1-75-wht) but blocked automated fetch · Amazon ASIN for White **not located** — sibling colorway ASINs confirmed (e.g. Blue: dp/B07X24335S) with identical spec sheet
Nozzle 190–235°C (confirmed) · Bed/speed/drying **NOT FOUND brand-specific** (only generic TPU guidance: 20–50°C bed, 25–40mm/s, dry if needed) · Shore 95A · Not AMS-safe · No official slicer profile — community requests for one are open on Bambu forums.

**PRILINE TPU** (White, 1kg, ±0.03mm) — Amazon: https://www.amazon.com/PRILINE-TPU-1KG-Filament-Dimensional-Accuracy/dp/B074DV5DJD
Nozzle 190–230°C (sources disagree on exact edges, ~215°C reported as a sweet spot) · Bed ~50°C · Speed 20–30mm/s · Shore **~95A, unconfirmed for this exact SKU** · Dry needed despite vacuum sealing per a verified buyer review · Not AMS-safe · No slicer profile found · **Known quirk: this exact ASIN reportedly prints undersized — a verified review recommends ~112% extrusion multiplier.**

### PETG / PP / PC-CF specialty (Amazon)

**ELEGOO PETG-GF** (White, 1kg) — mfr: https://us.elegoo.com/products/petg-gf-filament-1-75mm-colored-1kg · Amazon: https://www.amazon.com/ELEGOO-Glass-Printer-Filament-1-75mm/dp/B0F37VHKWD
Nozzle 240–270°C · Bed 65–75°C · Speed <220mm/s · Drying temp/time not published, dry as standard PETG precaution · **Hardened nozzle required** (abrasive GF), no 0.2mm · Not confirmed in Bambu Studio's built-in list as of 2026 — use Generic PETG base · Support: generic PETG/PLA.

**Stronghero3D PETG** (White, 1kg, ±0.05mm) — Amazon: https://www.amazon.com/Stronghero3D-Printing-Filaments-Accuracy-0-05mm/dp/B07D77HY43
Nozzle 220–250°C (varies by source) · Bed 50–70°C (one source says 70–85°C — conflicting, confirm against spool label) · Speed 25–37mm/s (community) · No hardened nozzle needed (not fiber-filled) · No enclosure needed · No slicer profile found — Generic PETG.

**PP, glass-filled** (White, 1kg — unbranded/generic Amazon listing, exact title "PP 1.75mm 3D Filament White 1 KG Polypropylene Low Density Glass Filled Polypropylene Material") — Amazon: https://www.amazon.com/Filament-White1-Polypropylene-Density-Material/dp/B07CSMPX3N
No identifiable brand/manufacturer page. Nozzle 230–250°C · Bed **not found for this listing** (general PP guidance elsewhere: 85–100°C) · Speed 30–60mm/s · **Whether "glass filled" is genuine fiber reinforcement vs. a generic-listing artifact could not be verified — check the physical spool before assuming it needs a hardened nozzle.** Enclosure effectively required (PP warps/shrinks badly). **Print surface: PP packing tape or a PP-specific build sheet, not glue stick — PP barely sticks to anything but itself.** Support: PP-based support strongly preferred, PLA/PETG supports bond poorly.

**PRILINE PC** (White, 1kg, ±0.03mm) — brand: https://thepriline.com/ (no product-specific page located) · Amazon: https://www.amazon.com/PRILINE-Polycarbonate-Filament-Dimensional-Accuracy/dp/B074DRYK2T
Nozzle 240–260°C (community pushes to 275–280°C once fully dried) · Bed 80–110°C (100°C first layer / 110°C rest reported) · Speed 30–50mm/s (community, not datasheet) · **Dry ~20h at 70°C on first use per community reports** — highly hygroscopic · No hardened nozzle needed (unfilled) · **Enclosure effectively mandatory.** No slicer profile — use Bambu Studio's Generic PC (chamber ~60°C). High odor — ventilate.

**PRILINE PC-CF** (Black, 1kg, ±0.03mm) — same brand as above · Amazon: https://www.amazon.com/PRILINE-Printer-Filament-Dimensional-Accuracy/dp/B09SZ8HMR9
Nozzle 240–260°C (up to 275–280°C dried) · Bed 80–110°C · Speed ~40–50mm/s (general PC-CF guidance, not brand-specific) · Dry ~20h at 70°C, critical · **Hardened nozzle required** (CF abrasive) · **Enclosure required**, heated chamber 45–60°C, fan off/≤20%, 10mm brim recommended · No slicer profile — Generic PC-CF or Generic PC + hardened-nozzle flag · Note: a Prusa forum thread reports inconsistent spool quality from this brand — spot-check.

### PLA variants, nylon, and specialty PLA (Amazon / 3D-Fuel / go3dprint)

**ELEGOO PLA Plus** (White, 4kg = 4×1kg, ±0.02mm) — mfr: https://us.elegoo.com/products/elegoo-pla-plus-3d-printer-filament-1-75mm-colored-1kg · Amazon: https://www.amazon.com/ELEGOO-Filament-Toughness-Dimensional-Accuracy/dp/B0D5MHR5V8 (verify this ASIN against the order — a similarly-named "ELEGOO Rapid PLA Plus" 4kg line also exists at a different ASIN)
Nozzle 190–230°C · Bed 0–65°C · Speed not published for standard (non-"Rapid") line · Low drying need, ships with desiccant · No official slicer profile — Generic PLA; unofficial MakerWorld/Cults3D calibrated profiles exist.

**DURAMIC 3D Premium PLA Plus** (White, 1kg, ±0.05mm, "200×200mm build surface") — mfr: https://duramic3d.com/products/duramic-3d-premium-pla-pla-plus-filament · Amazon ASIN **not confirmed** for this exact white/±0.05mm SKU (other DURAMIC PLA+ ASINs exist with different accuracy specs — don't cross-link them)
Nozzle 220±10°C · Bed 25–60°C · Speed 40–80mm/s · Accuracy tiers: ±0.05mm (100%), ±0.03mm (99%), ±0.02mm (97%) · No drying spec published, "Jam-free" patented claim, vacuum-sealed w/ desiccant · No slicer profile — Generic PLA.

**eSUN PLA PRO (PLA+)** (Cool White, 1kg, ±0.03mm) — mfr: https://www.esun3d.com/pla-pro-product/ (TDS PDF exists but text not extractable) · Amazon: https://www.amazon.com/dp/B01EKEMFQS
Nozzle 205–225°C (~210–215°C typical) · Bed 0/65°C (heated bed optional) · Speed/drying not published · **PrusaSlicer has a built-in "eSUN PLA" preset** (works acceptably per users, occasionally stringy for PLA+) · No Bambu Studio built-in profile — Generic PLA.

**3D-Fuel Pro PLA** ("Tough Pro PLA+" — current name, same product line, URL retains legacy "pro-pla" slug; Brightest White, 1kg) — https://www.3dfuel.com/products/pro-pla-filament-brightest-white-1-75mm
Nozzle 210–250°C (printer-dependent) · Bed 55°C recommended (0–60°C range, not strictly required) · Speed 40–260mm/s (quality-dependent) · Drying spec page blocked automated fetch — check https://support.3dfuel.com/hc/en-us/articles/360001268654-Pro-PLA-Print-Recommendations manually · **Only filament in this whole batch with an official brand-provided profile in both Bambu Studio (all printers, 4 nozzle sizes) and PrusaSlicer** (added Feb 2026) · Fan on · Surfaces: bare acrylic, tape+hairspray, glass+hairspray, BuildTak, or heated PEI (45–60°C) · 100% virgin NatureWorks Ingeo PLA, no fillers, ~4.3× impact toughness of standard PLA, heat resistance closer to ABS.

**taulman3D Nylon PA "Cast Plate"** (Black, 450g/1lb) — Amazon: https://www.amazon.com/taulman3D-Plate-Printing-Filament-1-75mm/dp/B01N3SXUVE (taulman3d.com is dead/domain-squatted — do not link it)
**"Cast Plate" is a filament grade/variant name, not a bundled release-paper accessory** — engineered to emulate industrial cast-nylon-plate strength (~95 MPa tensile, HDT 112°C standard / 185°C annealed). Taulman's separate paper/tape bed-release product is a different SKU, not included here. Nozzle 280–300°C (hotter than taulman's 645/680 nylons) · Bed ~55°C on **garolite or glass** (not independently confirmed on a live taulman page — domain dead) · Speed 38–40mm/s · Retraction 3–4mm · Fan off · **Highly hygroscopic — re-absorbs humidity within ~18h of opening**, exact oven temp/time not confirmed from a taulman source, dry before every session · No slicer profile — Generic PA/Nylon + manual temp override · **Support: do not use nylon-on-nylon (welds permanently)** — taulman's own SAC1060 breakaway support (235–255°C) or PVA; not HIPS.

**taulman3D PCTPE** (Nylon/TPE Co-Polymer, 1.75mm, 1lb) — taulman3d.com dead; reseller specs: https://www.go-3dprint.com/products/taulman-nylon-tpe-pctpe-co-polymer-filament-1-75mm.html
Nozzle 225–250°C (~235°C typical) · Bed 40–50°C on **glass + PVA coating** (BuildTak also cited) · Speed ~80% of ABS speed (~30–50mm/s per one source) · Fan off · Elongation at break 370–497% (sources vary), tensile 35 MPa, melts 203°C · Shore hardness unconfirmed (~D45 estimated, not manufacturer-verified) · Drying temp/time not confirmed from a taulman source (general nylon guidance applies) · No slicer profile · Support: SAC1060 generically applies to "all taulman nylons" including this, not confirmed page-specific · **Taulman's most flexible/rubber-like nylon** — for wearables, cosplay, vibration damping; the odd one out vs. their rigid engineering nylons.

**taulman3D PA-Alloy 910** (natural/white, 1.75mm, 1lb) — taulman3d.com dead; reseller specs: https://www.go-3dprint.com/products/taulman-alloy-910-filament-1-75mm.html
Nozzle 245–260°C · Bed 45–65°C commonly recommended on **glass + PVA, BuildTak + PVA, or PEI** (DimaFix/Magigoo PA also cited) · Speed ~ABS-equivalent, retraction 3–4mm · Fan off · Tensile strength 8,100+ PSI (~56 MPa) — **highest in taulman's nylon lineup per sources**, elongation 31–32%, melts 210°C · **Lower water absorption than taulman's other nylons** (still needs drying, exact time/temp not confirmed from a taulman source — third-party reports range from 3h/150°C to "8h/82°C insufficient", inconsistent) · No slicer profile · Support: SAC1060 (generic taulman guidance, not page-specific) · General-purpose high-strength engineering nylon — pick this over 645/680/Bridge for mechanical/robotics linkages; PCTPE above is the flexible outlier, not a strength competitor.

## Not covered here

Nothing further identified — all requested manuals, decommissioning references, and filament research are captured above.
