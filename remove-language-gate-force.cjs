const fs = require("fs");

const file = "src/App.tsx";
let text = fs.readFileSync(file, "utf8");

// Make sure the gate is disabled even if any reference remains
text = text.replace(
  /const\s+\[showLanguageGate,\s*setShowLanguageGate\]\s*=\s*useState<boolean>\([^;]*\);/,
  "const [showLanguageGate, setShowLanguageGate] = useState<boolean>(false);"
);

function removeShowLanguageGateBlock(src) {
  const needle = "if (showLanguageGate)";
  const start = src.indexOf(needle);

  if (start === -1) {
    return { src, removed: false };
  }

  const braceStart = src.indexOf("{", start);
  if (braceStart === -1) {
    throw new Error("Found if (showLanguageGate) but could not find opening brace.");
  }

  let depth = 0;
  let end = -1;

  let inString = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = braceStart; i < src.length; i++) {
    const ch = src[i];
    const next = src[i + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (ch === "\\") {
        escaped = true;
        continue;
      }

      if (ch === inString) {
        inString = null;
      }

      continue;
    }

    if (ch === "/" && next === "/") {
      inLineComment = true;
      i++;
      continue;
    }

    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i++;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      inString = ch;
      continue;
    }

    if (ch === "{") {
      depth++;
      continue;
    }

    if (ch === "}") {
      depth--;

      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error("Could not find closing brace for if (showLanguageGate) block.");
  }

  const before = src.slice(0, start);
  const after = src.slice(end);

  return {
    src: before + "\n\n  " + after.trimStart(),
    removed: true
  };
}

let removedCount = 0;

while (text.includes("if (showLanguageGate)")) {
  const result = removeShowLanguageGateBlock(text);
  text = result.src;
  if (result.removed) removedCount++;
  else break;
}

if (text.includes("if (showLanguageGate)")) {
  throw new Error("Language gate still exists after removal.");
}

fs.writeFileSync(file, text, "utf8");

console.log("Removed language gate blocks:", removedCount);
