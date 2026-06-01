const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'src');
const mojibakePattern = /[\u00c0-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u2018-\u201d\u2020-\u2026\u2030\u2039\u203a\u20ac\ufffd]/;

const cp1252Reverse = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);

function toCp1252Bytes(text) {
  const bytes = [];
  for (const char of text) {
    const code = char.codePointAt(0);
    if (code <= 0xff) {
      bytes.push(code);
    } else if (cp1252Reverse.has(code)) {
      bytes.push(cp1252Reverse.get(code));
    } else {
      return null;
    }
  }
  return Buffer.from(bytes);
}

function score(text) {
  return (text.match(new RegExp(mojibakePattern.source, 'g')) || []).length;
}

function decodeSegment(segment) {
  if (!mojibakePattern.test(segment)) return segment;
  const bytes = toCp1252Bytes(segment);
  if (!bytes) return segment;
  const decoded = bytes.toString('utf8');
  return decoded && score(decoded) < score(segment) ? decoded : segment;
}

function repairText(text) {
  return text.replace(/[\u0009\u0020-\u007e\u00a0-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u2018-\u201d\u2020-\u2026\u2030\u2039\u203a\u20ac]+/g, decodeSegment);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (!/\.(tsx?|css)$/.test(entry.name)) return [];
    if (['mockData.ts', 'data.ts'].includes(entry.name)) return [];
    if (entry.name.endsWith('.backup') || entry.name.endsWith('.fixed')) return [];
    return [fullPath];
  });
}

let changed = 0;
for (const file of walk(sourceRoot)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = repairText(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed += 1;
    console.log(`repaired ${path.relative(root, file)}`);
  }
}

console.log(`Done. Repaired ${changed} files.`);
