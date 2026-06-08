const fs = require("fs");
const { TextDecoder } = require("util");

const file = "src/App.tsx";
let text = fs.readFileSync(file, "utf8");

// Repair from the governorate/category filters through the two main cards.
// This avoids touching the rest of the app.
const startMarker = "        {/* Custom Premium Governorate & Category Filtering Dropdowns";
const endMarker = "{/* Core Dashboard Content Switcher tabs */}";

const start = text.indexOf(startMarker);
const end = text.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error("Could not find the target UI block. No file changed.");
}

const cp1252Reverse = {
  "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85, "†": 0x86, "‡": 0x87,
  "ˆ": 0x88, "‰": 0x89, "Š": 0x8A, "‹": 0x8B, "Œ": 0x8C, "Ž": 0x8E,
  "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97,
  "˜": 0x98, "™": 0x99, "š": 0x9A, "›": 0x9B, "œ": 0x9C, "ž": 0x9E, "Ÿ": 0x9F
};

function cp1252BytesFromString(s) {
  const bytes = [];

  for (const ch of s) {
    const code = ch.codePointAt(0);

    if (code <= 0xFF) {
      bytes.push(code);
    } else if (Object.prototype.hasOwnProperty.call(cp1252Reverse, ch)) {
      bytes.push(cp1252Reverse[ch]);
    } else {
      // Keep unknown Unicode as UTF-8 so we do not destroy the code.
      const utf8 = Buffer.from(ch, "utf8");
      for (const b of utf8) bytes.push(b);
    }
  }

  return new Uint8Array(bytes);
}

function fixMojibake(s) {
  return new TextDecoder("utf-8", { fatal: false }).decode(cp1252BytesFromString(s));
}

const before = text.slice(0, start);
const target = text.slice(start, end);
const after = text.slice(end);

const fixedTarget = fixMojibake(target);

text = before + fixedTarget + after;

fs.writeFileSync(file, text, "utf8");

console.log("Local mojibake repair completed for filters + two main cards.");
