#!/usr/bin/env node
/**
 * Validates src/data/filament-inventory.json before you commit a new spool.
 *
 *   node scripts/check-filament-inventory.mjs
 *
 * Catches the things that would otherwise break the site build or render a
 * half-empty row: bad JSON, missing required fields, duplicate ids, and
 * tier/family values the table does not know how to display.
 */
import { readFileSync } from 'node:fs';

const FILE = 'src/data/filament-inventory.json';

const REQUIRED = [
  'id',
  'brand',
  'name',
  'family',
  'tier',
  'color',
  'spool',
  'nozzle',
  'bed',
  'drying',
  'hardened',
  'enclosure',
  'ams',
];
const OPTIONAL = ['url', 'notes', 'caution', 'location'];
const TIERS = ['preferred', 'prototyping', 'stock'];
const FAMILIES = [
  'PLA',
  'PETG / PET',
  'TPU / TPE',
  'Nylon / PPA',
  'Polycarbonate',
  'Polypropylene',
  'Support',
];

const errors = [];
const warnings = [];

let raw;
try {
  raw = readFileSync(FILE, 'utf8');
} catch {
  console.error(`✗ Cannot read ${FILE}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error(`✗ ${FILE} is not valid JSON — usually a trailing comma or a missing quote.`);
  console.error(`  ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error(`✗ ${FILE} must be a JSON array of spool objects.`);
  process.exit(1);
}

const seen = new Map();

data.forEach((entry, i) => {
  const where = entry?.id ? `"${entry.id}"` : `entry #${i + 1}`;

  if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
    errors.push(`${where}: must be a JSON object.`);
    return;
  }

  for (const field of REQUIRED) {
    const v = entry[field];
    if (v === undefined) errors.push(`${where}: missing required field "${field}".`);
    else if (typeof v !== 'string' || v.trim() === '')
      errors.push(`${where}: "${field}" must be a non-empty string.`);
  }

  if (entry.id) {
    if (seen.has(entry.id))
      errors.push(`"${entry.id}": duplicate id (also entry #${seen.get(entry.id) + 1}).`);
    else seen.set(entry.id, i);

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.id))
      errors.push(`"${entry.id}": id must be lowercase kebab-case (letters, digits, hyphens).`);
  }

  if (entry.tier !== undefined && !TIERS.includes(entry.tier))
    errors.push(`${where}: tier "${entry.tier}" is not one of ${TIERS.join(', ')}.`);

  if (entry.family !== undefined && !FAMILIES.includes(entry.family))
    warnings.push(
      `${where}: family "${entry.family}" is new — it will create its own filter chip. ` +
        `Reuse one of: ${FAMILIES.join(', ')}.`
    );

  for (const field of OPTIONAL) {
    if (field in entry && entry[field] !== null && typeof entry[field] !== 'string')
      errors.push(`${where}: "${field}" must be a string or null.`);
  }

  const unknown = Object.keys(entry).filter(
    (k) => !REQUIRED.includes(k) && !OPTIONAL.includes(k)
  );
  if (unknown.length)
    warnings.push(`${where}: unrecognized field(s) ${unknown.join(', ')} — the table ignores these.`);

  if (entry.url && !/^https?:\/\//.test(entry.url))
    errors.push(`${where}: url must start with http:// or https:// (or be null).`);
});

for (const w of warnings) console.warn(`! ${w}`);
for (const e of errors) console.error(`✗ ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} error(s) in ${FILE}. Fix these before committing.`);
  process.exit(1);
}

const counts = TIERS.map((t) => `${data.filter((e) => e.tier === t).length} ${t}`).join(', ');
const unlogged = data.filter((e) => !e.location).length;
console.log(`✓ ${FILE} is valid — ${data.length} spool types (${counts}).`);
if (unlogged) console.log(`  ${unlogged} without a location logged.`);
if (warnings.length) console.log(`  ${warnings.length} warning(s) above.`);
