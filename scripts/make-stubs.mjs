// One-time generator for placeholder content pages matching the sidebar IA.
// Safe to re-run: skips files that already exist.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const pages = [
  ['overview/lab-tour', 'Lab Tour & Floorplan', 'Video walkthrough of every zone in the Spectrum lab.'],
  ['storage/stacktech-drawers', 'ToughBuilt StackTech Tool Towers', 'Drawer-by-drawer breakdown of the mobile tool towers.'],
  ['storage/small-parts-bins', 'Small Parts Modular Storage', '3D-printed grid bins for bearings, spacers, and hardware.'],
  ['storage/toolboxes', 'Primary Storage Banks', 'Red and blue toolboxes, T-Stak pit kits, and under-table storage.'],
  ['storage/label-makers', 'USB & Bluetooth Label Makers', 'Label maker pairing, software, and shop labeling standards.'],
  ['safety/gloves-and-ppe', 'PPE & The Glove Policy', 'Eye protection, hearing protection, respirators, and the strict rotating-tool glove ban.'],
  ['safety/emergency', 'Emergency Protocols & Power Shut-Offs', 'What to do in an emergency and where the shut-offs are.'],
  ['finishing/powder-coating', 'Powder Coating SOP', 'Booths, application gun, grounding, and powder handling.'],
  ['finishing/curing-oven', 'Curing Oven', 'Temperature curves, bake times, part hanging, and thermal safety.'],
  ['finishing/surface-prep', 'Surface Prep & Cleaning', 'Degreasing, sandblasting, scuffing, and outgassing cast parts.'],
  ['graphics/hp-t630-plotter', 'HP DesignJet T630 Plotter', '24-inch large-format printing, HP Click workflow, and 712 ink replacement.'],
  ['graphics/cricut-maker-4', 'Cricut Maker 4', 'Design Space setup, mats, blades, weeding, and transfer tape workflow.'],
  ['graphics/heat-press', 'Smart Bluetooth Heat Press', 'App and manual temp/timer control, HTV and Infusible Ink settings.'],
  ['graphics/vinyl-and-stickers', 'Vinyl & Sticker Finishing', 'Die-cut stickers, team banners, and apparel heat transfers.'],
  ['waterjet/wazer-pro', 'WAZER Pro Waterjet', 'Full SOP: WAM software, garnet loading, cutting, and maintenance.'],
  ['lasers/xtool-metalfab', 'xTool MetalFab (1200W)', 'Metal laser cutting SOP, assist gas, safety, and focal setup.'],
  ['lasers/gweike-m3-ultra', 'Gweike Cloud M3 Ultra', 'Hybrid fiber + CO2 laser: material compatibility and rotary setup.'],
  ['lasers/thunder-nova-35', 'Thunder Laser Nova 35', '100W CO2 laser settings, air assist, and optics cleaning.'],
  ['3d-printing/filament-guide', 'Filament Material Guide', 'PLA, PETG, TPU, PA-CF, and PC: temps, plates, drying, and use cases.'],
  ['3d-printing/print-settings', 'Print Settings & Support Strategy', 'Tree vs normal supports, interfaces, overhangs, and orientation.'],
  ['3d-printing/bambu-fleet', 'Bambu Lab Fleet', 'X1-Carbon and H2D: slicer settings, plates, AMS, and nozzles.'],
  ['3d-printing/prusa-farm', 'Prusa Mini+ Farm', 'PrusaSlicer configuration, Live-Z calibration, and sheet care.'],
  ['forming/langmuir-titan-25t', 'Langmuir Titan 25T Press Brake', 'Die selection, tonnage limits, backgauge programming, and safety.'],
  ['forming/lathes', 'Lathes', 'Precision Matthews PM-1130V and Grizzly lathes: tooling and speeds.'],
  ['forming/arbor-press', 'Arbor Press & Broaching', 'Pressing bearings and broaching hex bores.'],
  ['cutting/evolution-saws', 'Evolution Chop Saws', 'S14MCS multi-material and EVOMAX14AL aluminum saw SOPs.'],
  ['cutting/bandsaws', 'Horizontal & Vertical Bandsaws', 'Blade speed, tensioning, and stock feed rates.'],
  ['cutting/table-saw', 'DeWalt Jobsite Table Saw', 'Riving knife, fence alignment, and push stick rules.'],
  ['cutting/sanders-grinders', 'Bench Sanders & Grinders', 'Belt sanders, bench grinders, and deburring wheels.'],
  ['cutting/drill-press-shear', 'Drill Press & Bench Shear', 'Drilling SOP and sheet shearing.'],
  ['portable-power/m12-ecosystem', 'Milwaukee M12 Ecosystem', 'Drills, impact drivers, saws, sanders, and specialty cutters.'],
  ['portable-power/m12-riveting', 'M12 Riveting Tools', 'Standard and long nose rivet guns: sizing, jaws, and mandrels.'],
  ['portable-power/dewalt-and-pneumatics', 'DeWalt & Pneumatics', 'Track saw, heat gun, vacuum, compressor, and shop air.'],
  ['hand-tools/layout-measuring', 'Layout & Measuring', 'Combination squares, center punches, calipers, and rulers.'],
  ['hand-tools/fastener-driving', 'Fastener Driving', 'Hex keys, wrenches, sockets, nut drivers, and screwdrivers.'],
  ['hand-tools/cutting-deburring', 'Cutting, Trimming & Deburring', 'Flush cutters, deburring tools, box cutters, and shears.'],
  ['hand-tools/threading-riveting', 'Threading & Riveting', 'Taps and dies, hand rivet guns, and rivnut tools.'],
  ['hand-tools/clamps-vises', 'Clamps & Vises', 'Bench vises, Kant-Twist, C-clamps, and corner clamps.'],
  ['electrical/wire-prep-crimping', 'Wire Prep & Crimping', 'Strippers, ratcheting crimpers, Powerpole, and battery lugs.'],
  ['electrical/soldering-test-bench', 'Soldering & Test Bench', 'PINECIL irons, DC power supply, and the Rigol oscilloscope.'],
  ['electrical/coprocessors', 'Coprocessors & SBCs', 'Single-board computers and vision coprocessors.'],
  ['inventory/consumables', 'Consumables Ledger', 'Searchable inventory with prices, reorder links, and bin locations.'],
  ['maintenance/schedules', 'Maintenance Schedules', 'Opening/closing checklists, weekly PM, and machine servicing.'],
];

const root = new URL('../src/content/docs/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');

for (const [slug, title, description] of pages) {
  const file = join(root, `${slug}.mdx`);
  if (existsSync(file)) continue;
  mkdirSync(dirname(file), { recursive: true });
  const body = `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndescription: "${description.replace(/"/g, '\\"')}"\n---\n\n:::note\nThis page is being built out. Content coming shortly.\n:::\n`;
  writeFileSync(file, body, 'utf8');
  console.log('created', slug);
}
