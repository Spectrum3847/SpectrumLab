// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://lab.spectrum3847.org',
  integrations: [
    starlight({
      title: 'Spectrum Lab',
      favicon: '/favicon.png',
      logo: {
        src: './src/assets/logo.png',
        replacesTitle: true,
      },
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
          },
        },
      ],
      social: [
        { label: 'GitHub', icon: 'github', href: 'https://github.com/Spectrum3847' },
        { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com/Spectrum3847' },
        { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/spectrum3847' },
      ],
      pagination: false,
      customCss: ['./src/styles/custom.css'],
      components: {
        Header: './src/components/Header.astro',
        PageTitle: './src/components/PageTitle.astro',
        Sidebar: './src/components/Sidebar.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        Search: './src/components/Search.astro',
      },
      sidebar: [
        {
          label: 'Lab Overview & Storage',
          collapsed: true,
          items: [
            { label: 'Lab Tour & Floorplan', slug: 'overview/lab-tour' },
            { label: 'StackTech Tool Towers', slug: 'storage/stacktech-drawers' },
            { label: 'Small Parts Bins', slug: 'storage/small-parts-bins' },
            { label: 'Primary Toolboxes', slug: 'storage/toolboxes' },
            { label: 'Label Makers', slug: 'storage/label-makers' },
          ],
        },
        {
          label: 'Safety & Shop Standards',
          collapsed: true,
          items: [
            { label: 'PPE & The Glove Policy', slug: 'safety/gloves-and-ppe' },
            { label: 'Emergency Protocols', slug: 'safety/emergency' },
          ],
        },
        {
          label: 'Finishing & Powder Coating',
          collapsed: true,
          items: [
            { label: 'Powder Coating SOP', slug: 'finishing/powder-coating' },
            { label: 'Curing Oven', slug: 'finishing/curing-oven' },
            { label: 'Surface Prep & Cleaning', slug: 'finishing/surface-prep' },
          ],
        },
        {
          label: 'Graphics & Apparel',
          collapsed: true,
          items: [
            { label: 'HP DesignJet T630 Plotter', slug: 'graphics/hp-t630-plotter' },
            { label: 'Cricut Maker 4', slug: 'graphics/cricut-maker-4' },
            { label: 'Smart Heat Press', slug: 'graphics/heat-press' },
            { label: 'Vinyl & Sticker Finishing', slug: 'graphics/vinyl-and-stickers' },
          ],
        },
        {
          label: 'Waterjet Cutting',
          collapsed: true,
          items: [{ label: 'WAZER Pro', slug: 'waterjet/wazer-pro' }],
        },
        {
          label: 'Laser Cutting',
          collapsed: true,
          items: [
            { label: 'xTool MetalFab (1200W)', slug: 'lasers/xtool-metalfab' },
            { label: 'Gweike Cloud M3 Ultra', slug: 'lasers/gweike-m3-ultra' },
            { label: 'Thunder Laser Nova 35', slug: 'lasers/thunder-nova-35' },
          ],
        },
        {
          label: '3D Printing',
          collapsed: true,
          items: [
            { label: 'Filament Guide & Matrix', slug: '3d-printing/filament-guide' },
            { label: 'Print Settings & Supports', slug: '3d-printing/print-settings' },
            { label: 'Bambu Lab Fleet', slug: '3d-printing/bambu-fleet' },
            { label: 'Prusa Mini+ Farm', slug: '3d-printing/prusa-farm' },
          ],
        },
        {
          label: 'Sheet Metal & Forming',
          collapsed: true,
          items: [
            { label: 'Langmuir Titan 25T Press Brake', slug: 'forming/langmuir-titan-25t' },
            { label: 'Lathes', slug: 'forming/lathes' },
            { label: 'Arbor Press & Broaching', slug: 'forming/arbor-press' },
          ],
        },
        {
          label: 'Saws & Material Prep',
          collapsed: true,
          items: [
            { label: 'Evolution Chop Saws', slug: 'cutting/evolution-saws' },
            { label: 'Bandsaws', slug: 'cutting/bandsaws' },
            { label: 'Table Saw', slug: 'cutting/table-saw' },
            { label: 'Sanders & Grinders', slug: 'cutting/sanders-grinders' },
            { label: 'Drill Press & Bench Shear', slug: 'cutting/drill-press-shear' },
          ],
        },
        {
          label: 'M12 & Portable Power',
          collapsed: true,
          items: [
            { label: 'Milwaukee M12 Ecosystem', slug: 'portable-power/m12-ecosystem' },
            { label: 'M12 Riveting Tools', slug: 'portable-power/m12-riveting' },
            { label: 'DeWalt & Pneumatics', slug: 'portable-power/dewalt-and-pneumatics' },
          ],
        },
        {
          label: 'Hand Tools & Fasteners',
          collapsed: true,
          items: [
            { label: 'Layout & Measuring', slug: 'hand-tools/layout-measuring' },
            { label: 'Fastener Driving', slug: 'hand-tools/fastener-driving' },
            { label: 'Cutting & Deburring', slug: 'hand-tools/cutting-deburring' },
            { label: 'Threading & Riveting', slug: 'hand-tools/threading-riveting' },
            { label: 'Clamps & Vises', slug: 'hand-tools/clamps-vises' },
          ],
        },
        {
          label: 'Electrical & Wiring',
          collapsed: true,
          items: [
            { label: 'Wire Prep & Crimping', slug: 'electrical/wire-prep-crimping' },
            { label: 'Soldering & Test Bench', slug: 'electrical/soldering-test-bench' },
            { label: 'Coprocessors & SBCs', slug: 'electrical/coprocessors' },
          ],
        },
        {
          label: 'Inventory & Procurement',
          collapsed: true,
          items: [
            { label: 'Consumables Ledger', slug: 'inventory/consumables' },
            { label: 'Filament Inventory', slug: 'inventory/filaments' },
          ],
        },
        {
          label: 'Maintenance',
          collapsed: true,
          items: [{ label: 'Schedules & Checklists', slug: 'maintenance/schedules' }],
        },
      ],
    }),
    mdx(),
  ],
});
