const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data.ts');

// Read the whole file as raw text
let content = fs.readFileSync(filePath, 'utf8');

// ── Strategy ────────────────────────────────────────────────────────────────
// The ar: and ku: string values in RAW_INITIAL_BUSINESSES are corrupt.
// They may span multiple lines (the garbage breaks string delimiters too).
// We parse the source as raw text using a state machine that:
//  1. Detects the start of a businesses block
//  2. Inside that block, for each `ar:` or `ku:` field, extracts the FULL
//     raw value (handling embedded quotes / newlines) up to the matching
//     closing quote + comma pattern
//  3. Checks if the value is garbled
//  4. If garbled, finds the corresponding `en:` value and substitutes it

function isGarbled(str) {
  if (!str) return false;
  // Latin-1 supplement (double-encoded Arabic lead bytes appear here: Ø Ù Û Ú Ã Â)
  if (/[\u00C0-\u00FF]/.test(str)) return true;
  // Replacement chars
  if (/[\uFFFD\uFFFE\uFFFF]/.test(str)) return true;
  // ASCII control chars
  if (/[\x00-\x08\x0E-\x1F\x7F]/.test(str)) return true;
  // Garbage: Arabic char neighboured by random ASCII letters (e.g. كاف‌S‌?)
  if (/[\u0600-\u06FF][A-Za-z?~^]{1,3}[\u0600-\u06FF]/.test(str)) return true;
  // Starts with garbage Ã/â pattern
  if (/^[âÂãÃ]/.test(str)) return true;
  return false;
}

// Split into lines for easier processing
const lines = content.split('\n');
let inBusinessSection = false;
const result = [];
let i = 0;

// Helper: consume lines from startLine until we see the closing bracket `]`
// Returns { block: string[], endIndex: number }
function consumeArrayBlock(startLine) {
  const block = [lines[startLine]];
  let j = startLine + 1;
  while (j < lines.length) {
    block.push(lines[j]);
    if (/^\s+\],?\s*$/.test(lines[j])) break;
    j++;
  }
  return { block, endIndex: j };
}

// Helper: find the `en: [` array block that follows within next 30 lines
function findEnArrayBlock(fromLine) {
  for (let j = fromLine + 1; j <= Math.min(fromLine + 60, lines.length - 1); j++) {
    if (/^\s+en: \[/.test(lines[j])) {
      return consumeArrayBlock(j);
    }
    // Stop if we hit a new top-level business object
    if (/^\s+id: 'b-/.test(lines[j])) break;
  }
  return null;
}

while (i < lines.length) {
  const line = lines[i];

  if (line.includes('const RAW_INITIAL_BUSINESSES')) {
    inBusinessSection = true;
  }

  if (inBusinessSection) {
    // ── Handle ar: [...] or ku: [...] array fields ──────────────────────────
    const arrayMatch = line.match(/^(\s+)(ar|ku): \[/);
    if (arrayMatch) {
      const indent = arrayMatch[1];
      const langKey = arrayMatch[2];
      const { block, endIndex } = consumeArrayBlock(i);
      const blockText = block.join('\n');

      if (isGarbled(blockText)) {
        // Find the corresponding en: [...] block
        const enBlock = findEnArrayBlock(i);
        if (enBlock) {
          // Replace the ar/ku key with en key on the first line, keep rest same
          const fixedLines = enBlock.block.map((l, idx) =>
            idx === 0 ? l.replace(/^\s+en:/, `${indent}${langKey}:`) : l
          );
          result.push(...fixedLines);
        } else {
          // Fallback: empty array
          result.push(`${indent}${langKey}: [],`);
        }
        i = endIndex + 1;
        continue;
      }
    }

    // ── Handle ar: '...' or ku: '...' string fields ─────────────────────────
    const arKuMatch = line.match(/^(\s+)(ar|ku): '(.*)/);
    if (arKuMatch) {
      const indent = arKuMatch[1];
      const langKey = arKuMatch[2];

      let fullValue = arKuMatch[3];
      let endLine = i;

      while (endLine < lines.length - 1) {
        if (/',\s*$/.test(fullValue) || /'\s*$/.test(fullValue)) {
          fullValue = fullValue.replace(/'\s*,?\s*$/, '');
          break;
        }
        if (/^\s+(ar|ku|en|description|name|address|featuredDeal|category|governorate|rating|id|image|avatar|isVerified|phoneNumber|likes|saves|mapCoords|stories|reviewsCount|images)\s*[:{[]/.test(lines[endLine + 1])) {
          fullValue = fullValue.replace(/'\s*,?\s*$/, '');
          break;
        }
        endLine++;
        fullValue += '\n' + lines[endLine];
      }

      if (isGarbled(fullValue)) {
        let enValue = null;
        for (let j = i + 1; j <= Math.min(i + 8, lines.length - 1); j++) {
          const enMatch = lines[j].match(/^\s+en: '(.+?)'\s*,?\s*$/);
          if (enMatch) { enValue = enMatch[1]; break; }
          if (/^\s+(name|description|address|featuredDeal)\s*:\s*\{/.test(lines[j])) break;
        }

        const safeEn = enValue ? enValue.replace(/'/g, "\\'") : '';
        result.push(`${indent}${langKey}: '${safeEn}',`);
        i = endLine + 1;
        continue;
      }
    }
  }

  result.push(line);
  i++;
}

fs.writeFileSync(filePath, result.join('\n'), 'utf8');
console.log(`Done. ${result.length} lines written.`);

// Quick verification
const verify = fs.readFileSync(filePath, 'utf8').split('\n');
console.log('Line 370:', verify[369]);
console.log('Line 371:', verify[370]);
console.log('Line 375:', verify[374]);
console.log('Line 392:', verify[391]);
console.log('Line 594:', verify[593]);

