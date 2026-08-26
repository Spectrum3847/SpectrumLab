/**
 * Top-nav menu data for the lab portal header (NavMenu.astro) and the
 * eyebrow labels on page titles (PageTitle.astro).
 *
 * The left docs sidebar (astro.config.mjs) is the exhaustive navigation;
 * this top nav is a curated set of jump-off points plus a link back to the
 * main spectrum3847.org site.
 */
export interface NavItem {
  label: string;
  href: string;
  blurb?: string;
}

export interface NavCategory {
  label: string;
  href?: string;
  align?: 'left' | 'right' | 'center';
  items?: NavItem[];
}

export const navigationMenu: NavCategory[] = [
  {
    label: 'Lab Guide',
    href: '/',
    align: 'left',
    items: [
      { label: 'Lab Tour & Zones', href: '/overview/lab-tour/', blurb: 'Video walkthrough of every shop zone' },
      { label: 'Onshape to Part', href: '/overview/onshape-to-part/', blurb: 'Pick the machine, export the file, get the part' },
      { label: 'Find Anything', href: '/find/', blurb: 'Search every drawer, bin and shelf in the lab' },
      { label: 'Shop Glossary', href: '/reference/glossary/', blurb: 'Every term this site uses, defined' },
      { label: 'Safety & PPE', href: '/safety/gloves-and-ppe/', blurb: 'PPE, the glove policy & emergency protocols' },
      { label: 'Maintenance Schedules', href: '/maintenance/schedules/', blurb: 'Opening/closing checklists & machine PM' },
      { label: 'Tool Inventory', href: '/inventory/tool-list/', blurb: 'Every machine and tool the lab owns' },
      { label: 'Consumables Ledger', href: '/inventory/consumables/', blurb: 'Prices, reorder links & bin locations' },
    ],
  },
  {
    label: 'Machines',
    href: '/lasers/xtool-metalfab/',
    align: 'left',
    items: [
      { label: 'xTool MetalFab 1200W', href: '/lasers/xtool-metalfab/', blurb: 'Fiber laser metal cutting & welding' },
      { label: 'Fiber Laser Materials', href: '/lasers/fiber-laser-cutting/', blurb: 'Which machine, what metal, how to source it' },
      { label: 'Gweike Cloud M3 Ultra', href: '/lasers/gweike-m3-ultra/', blurb: 'Hybrid fiber + CO2 laser system' },
      { label: 'Thunder Nova 35', href: '/lasers/thunder-nova-35/', blurb: '100W CO2 laser — LightBurn workflow' },
      { label: 'Titan 25T Press Brake', href: '/forming/langmuir-titan-25t/', blurb: 'CNC press brake — dies & tonnage' },
      { label: 'Lathes', href: '/forming/lathes/', blurb: 'PM-1130V & Grizzly manual lathes' },
      { label: 'Evolution Saws', href: '/cutting/evolution-saws/', blurb: 'S14MCS & EVOMAX14AL chop saws' },
      { label: 'Powder Coating', href: '/finishing/powder-coating/', blurb: 'Booths, gun SOP & curing oven' },
      { label: 'Electric Tapping Machine', href: '/cutting/tapping-machine/', blurb: '360° tapping arm — collets & clutch' },
      { label: 'WAZER Pro Waterjet', href: '/waterjet/wazer-pro/', blurb: 'Desktop waterjet — WAM, garnet & maintenance' },
    ],
  },
  {
    label: '3D Printing',
    href: '/3d-printing/filament-guide/',
    align: 'center',
    items: [
      { label: 'Filament Guide', href: '/3d-printing/filament-guide/', blurb: 'PETG-GF, 72D TPU & PPA-GF matrix' },
      { label: 'Print Settings & Supports', href: '/3d-printing/print-settings/', blurb: 'Support strategy, orientation & presets' },
      { label: 'Bambu Lab Fleet', href: '/3d-printing/bambu-fleet/', blurb: 'X1C, H2D & X2D — AMS, plates & nozzles' },
      { label: 'Prusa Mini+ Farm', href: '/3d-printing/prusa-farm/', blurb: '12 Minis — 0.6 mm nozzles & Live-Z' },
      { label: 'Filament Inventory', href: '/inventory/filaments/', blurb: 'Every spool we own & how to log new ones' },
    ],
  },
  {
    label: 'Tools',
    href: '/portable-power/m12-ecosystem/',
    align: 'center',
    items: [
      { label: 'M12 Ecosystem', href: '/portable-power/m12-ecosystem/', blurb: 'Drills, drivers, rivet guns & cutters' },
      { label: 'DeWalt & Pneumatics', href: '/portable-power/dewalt-and-pneumatics/', blurb: 'Track saw, compressor & shop air' },
      { label: 'Hand Tools & Layout', href: '/hand-tools/layout-measuring/', blurb: 'Measuring, driving, cutting & clamping' },
      { label: 'Electrical & Wiring', href: '/electrical/wire-prep-crimping/', blurb: 'Strippers, crimpers, soldering & scopes' },
    ],
  },
  {
    label: 'Graphics',
    href: '/graphics/hp-t630-plotter/',
    align: 'right',
    items: [
      { label: 'HP T630 Plotter', href: '/graphics/hp-t630-plotter/', blurb: '24" large-format printing & 712 inks' },
      { label: 'Cricut Maker 4', href: '/graphics/cricut-maker-4/', blurb: 'Vinyl cutting, mats, blades & weeding' },
      { label: 'Smart Heat Press', href: '/graphics/heat-press/', blurb: 'HTV & Infusible Ink time/temp settings' },
      { label: 'Vinyl & Stickers', href: '/graphics/vinyl-and-stickers/', blurb: 'Die-cut stickers, banners & apparel' },
    ],
  },
  {
    label: 'Spectrum3847.org',
    href: 'https://www.spectrum3847.org',
    align: 'right',
  },
];
