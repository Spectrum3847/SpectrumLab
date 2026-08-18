// Resize a source lab photo into src/assets/lab/ at web resolution.
// Usage: node scripts/import-lab-photo.mjs "<sourcePath>" "<dest-name.jpg>"
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , src, destName] = process.argv;
if (!src || !destName) {
  console.error('usage: node scripts/import-lab-photo.mjs <sourcePath> <dest-name.jpg>');
  process.exit(1);
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'lab');
mkdirSync(outDir, { recursive: true });
const out = join(outDir, destName);

// rotate() applies EXIF orientation, then metadata (incl. GPS) is stripped by default.
await sharp(src)
  .rotate()
  .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(out);
console.log('wrote', out);
