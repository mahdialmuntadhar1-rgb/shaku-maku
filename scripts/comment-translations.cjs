const fs = require('fs');
const file = 'c:/Users/HB LAPTOP STORE/.windsurf/billboard3dnakedeye-mor/src/data.ts';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// Find ar: { and ku: { within TRANSLATIONS block
let transStart = -1;
let arStart = -1;
let kuStart = -1;
let enStart = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const TRANSLATIONS')) transStart = i;
  if (transStart > 0 && lines[i].match(/^\s+ar:\s*\{/)) arStart = i;
  if (transStart > 0 && lines[i].match(/^\s+ku:\s*\{/)) kuStart = i;
  if (transStart > 0 && lines[i].match(/^\s+en:\s*\{/)) enStart = i;
  if (arStart > 0 && kuStart > 0 && enStart > 0) break;
}

// Find ar block end by brace depth
let depth = 0;
let arEnd = arStart;
for (let i = arStart; i < lines.length; i++) {
  depth += (lines[i].match(/\{/g) || []).length - (lines[i].match(/\}/g) || []).length;
  if (depth === 0 && i > arStart) { arEnd = i; break; }
}

// Find ku block end
depth = 0;
let kuEnd = kuStart;
for (let i = kuStart; i < lines.length; i++) {
  depth += (lines[i].match(/\{/g) || []).length - (lines[i].match(/\}/g) || []).length;
  if (depth === 0 && i > kuStart) { kuEnd = i; break; }
}

console.log(`ar: ${arStart}-${arEnd}, ku: ${kuStart}-${kuEnd}`);

// Comment out ar and ku blocks
const result = [];
for (let i = 0; i < lines.length; i++) {
  if (i === arStart) {
    result.push('  // ar: { // CORRUPT - using English fallback');
    for (let j = arStart + 1; j < arEnd; j++) {
      result.push('  // ' + lines[j]);
    }
    result.push('  // }');
    i = arEnd;
  } else if (i === kuStart) {
    result.push('  // ku: { // CORRUPT - using English fallback');
    for (let j = kuStart + 1; j < kuEnd; j++) {
      result.push('  // ' + lines[j]);
    }
    result.push('  // }');
    i = kuEnd;
  } else {
    result.push(lines[i]);
  }
}

fs.writeFileSync(file, result.join('\n'), 'utf8');
console.log('Done - commented out corrupt ar/ku TRANSLATIONS');
