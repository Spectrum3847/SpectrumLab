// Merge photo triage batches + SmugMug URL map into src/data/lab-photos.json.
// Re-runnable: later batches simply add entries.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const RESEARCH = 'C:/Users/agregory/AppData/Local/Temp/claude/C--github-SpectrumLab/035b727f-c83a-4f05-b70c-4e0f0eb9d6cc/scratchpad/research';
const GALLERY_URL = 'https://photos.spectrum3847.org/The-Lab/Aug-18-2026-Photos';

const urlMap = JSON.parse(readFileSync(`${RESEARCH}/smugmug-url-map.json`, 'utf8'));

const entries = [];
for (const batch of ['photo-map-batch1.json', 'photo-map-batch2.json']) {
  const p = `${RESEARCH}/${batch}`;
  if (!existsSync(p)) continue;
  for (const e of JSON.parse(readFileSync(p, 'utf8'))) {
    if (e.skipped || !e.file) continue;
    entries.push({
      file: e.file,
      description: e.description ?? '',
      smugmugUrl: urlMap[e.original] ?? GALLERY_URL,
      gallery: urlMap[e.original] ? 'Aug-18-2026-Photos' : 'The-Lab',
      original: e.original,
    });
  }
}

entries.sort((a, b) => a.file.localeCompare(b.file));
writeFileSync('src/data/lab-photos.json', JSON.stringify(entries, null, 2) + '\n', 'utf8');
console.log(`wrote src/data/lab-photos.json with ${entries.length} entries`);
