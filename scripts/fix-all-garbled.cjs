const fs = require('fs');
const file = 'c:/Users/HB LAPTOP STORE/.windsurf/billboard3dnakedeye-mor/src/data.ts';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

function isGarbled(str) {
  if (!str) return false;
  if (/[\u00C0-\u00FF]/.test(str)) return true;
  if (/[\uFFFD\uFFFE\uFFFF]/.test(str)) return true;
  if (/[\x00-\x08\x0E-\x1F\x7F]/.test(str)) return true;
  if (/[\u0600-\u06FF][fSO^.?~\"][fSO^.?~\"]{0,1}[\u0600-\u06FF]/.test(str)) return true;
  if (/^[âÂãÃ]/.test(str)) return true;
  const arabicCount = (str.match(/[\u0600-\u06FF]/g) || []).length;
  const garbageCount = (str.match(/[fSO^.?~\"]/g) || []).length;
  if (arabicCount > 0 && garbageCount > arabicCount * 0.3) return true;
  return false;
}

const result = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  const match = line.match(/^(\s+)(ar|ku): '(.*)'/);
  if (match) {
    const indent = match[1];
    const langKey = match[2];
    const val = match[3];
    if (isGarbled(val)) {
      let enVal = null;
      for (let j = i + 1; j <= Math.min(i + 5, lines.length - 1); j++) {
        const enMatch = lines[j].match(/^\s+en: '(.+?)'\s*,?\s*$/);
        if (enMatch) { enVal = enMatch[1]; break; }
        if (/^\s+(ar|ku|name|description|address|featuredDeal)\s*:\s*\{/.test(lines[j])) break;
      }
      if (enVal) {
        result.push(`${indent}${langKey}: '${enVal.replace(/'/g, "\\'")}',`);
      } else {
        result.push(`${indent}${langKey}: '',`);
      }
      i++;
      continue;
    }
  }
  result.push(line);
  i++;
}

fs.writeFileSync(file, result.join('\n'), 'utf8');
console.log('Done');
