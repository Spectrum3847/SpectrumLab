# SpectrumLab — lab.spectrum3847.org

Spectrum 3847's lab training, safety, and tool-use documentation portal. Every
machine SOP, storage location, consumable (with real prices and reorder links),
and maintenance checklist for the lab lives here.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build),
themed to match [spectrum3847.org](https://www.spectrum3847.org).

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static build to dist/
```

## Structure

| Path | What it is |
| --- | --- |
| `src/content/docs/` | All content pages (MDX), organized by shop area |
| `src/components/` | Custom components: `MachineSOP`, `ToolProcurementCard`, `PreFlightChecklist`, `ConsumablesTable`, `FilamentCard`, `DrawerLayoutMap`, `LabGalleryImage`, … |
| `src/data/` | The data layer: `tools-procurement.json`, `consumables.json`, `filaments.json`, `storage-locations.json`, `maintenance.json`, `lab-photos.json` |
| `src/assets/lab/` | Lab photos (resized from the [SmugMug gallery](https://photos.spectrum3847.org/The-Lab)) |
| `astro.config.mjs` | Sidebar navigation & Starlight config |

## Updating content

- **Add/edit a consumable**: edit `src/data/consumables.json` — the ledger page
  and every machine page's consumables table update automatically.
- **Update a price or reorder link**: edit `src/data/tools-procurement.json`.
- **Add a page**: create the `.mdx` under `src/content/docs/` and add its slug
  to the sidebar in `astro.config.mjs`.
- **Add lab photos**: `node scripts/import-lab-photo.mjs <source> <name.jpg>`
  resizes into `src/assets/lab/`, then add an entry to `src/data/lab-photos.json`.

## Deployment

Deployed to Cloudflare Workers (static assets) at
[lab.spectrum3847.org](https://lab.spectrum3847.org). Pushes to `master` deploy
via GitHub Actions (`.github/workflows/deploy.yml`), or manually:

```bash
npm run build
npx wrangler deploy
```
