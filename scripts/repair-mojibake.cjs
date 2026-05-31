const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'src');
const mojibakePattern = /[\u00c0-\u00ff\u2018-\u201d\u2020-\u2026\u2030\u20ac\ufffd]/;

const cp1252Reverse = new Map([
  [0x20ac, 0x80],
  [0x201a, 0x82],
  [0x0192, 0x83],
  [0x201e, 0x84],
  [0x2026, 0x85],
  [0x2020, 0x86],
  [0x2021, 0x87],
  [0x02c6, 0x88],
  [0x2030, 0x89],
  [0x0160, 0x8a],
  [0x2039, 0x8b],
  [0x0152, 0x8c],
  [0x017d, 0x8e],
  [0x2018, 0x91],
  [0x2019, 0x92],
  [0x201c, 0x93],
  [0x201d, 0x94],
  [0x2022, 0x95],
  [0x2013, 0x96],
  [0x2014, 0x97],
  [0x02dc, 0x98],
  [0x2122, 0x99],
  [0x0161, 0x9a],
  [0x203a, 0x9b],
  [0x0153, 0x9c],
  [0x017e, 0x9e],
  [0x0178, 0x9f]
]);

function toWindows1252Bytes(text) {
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

function decodeMojibake(text) {
  if (!mojibakePattern.test(text)) return text;

  const bytes = toWindows1252Bytes(text);
  if (!bytes) return text;

  const decoded = bytes.toString('utf8');
  if (!decoded) return text;
  return mojibakeScore(decoded) < mojibakeScore(text) ? decoded : text;
}

function mojibakeScore(text) {
  const matches = text.match(/[\u00c0-\u00ff\u2018-\u201d\u2020-\u2026\u2030\u20ac\ufffd]/g);
  return matches ? matches.length : 0;
}

function readQuoted(source, start) {
  const quote = source[start];
  let i = start + 1;
  let body = '';

  while (i < source.length) {
    const char = source[i];
    if (char === '\\') {
      body += char + (source[i + 1] ?? '');
      i += 2;
      continue;
    }

    if (char === quote) {
      return {
        end: i,
        body,
        full: quote + body + quote
      };
    }

    body += char;
    i += 1;
  }

  return null;
}

function repairContent(source) {
  let output = '';
  let i = 0;
  let changed = false;

  while (i < source.length) {
    const char = source[i];

    if (char === '\'' || char === '"' || char === '`') {
      const literal = readQuoted(source, i);
      if (literal) {
        const repaired = decodeMojibake(literal.body);
        output += char + repaired + char;
        changed ||= repaired !== literal.body;
        i = literal.end + 1;
        continue;
      }
    }

    output += char;
    i += 1;
  }

  return { output, changed };
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (/\.(tsx?|css)$/.test(entry.name) && !['mockData.ts', 'data.ts'].includes(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

let changedFiles = 0;
for (const file of walk(sourceRoot)) {
  const before = fs.readFileSync(file, 'utf8');
  const { output, changed } = repairContent(before);
  if (changed) {
    fs.writeFileSync(file, output, 'utf8');
    changedFiles += 1;
    console.log(`repaired ${path.relative(root, file)}`);
  }
}

console.log(`Done. Repaired ${changedFiles} files.`);
