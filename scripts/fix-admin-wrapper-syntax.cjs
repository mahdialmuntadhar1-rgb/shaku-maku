const fs = require("fs");

const path = "src/App.tsx";
let s = fs.readFileSync(path, "utf8");

// Fix bad JSX/array wrapper created around Admin nav button.
// It changes:
//   {isAdmin && (
// into:
//   isAdmin && (
// and changes the first matching closing:
//   )}
// into:
//   )
s = s.replace(
  /(\r?\n\s*)\{isAdmin && \(\s*(\r?\n\s*<button[\s\S]*?id="nav-tab-admin"[\s\S]*?<\/button>)\s*(\r?\n\s*)\)\}/m,
  "$1isAdmin && ($2$3)"
);

fs.writeFileSync(path, s, "utf8");
console.log("Fixed App.tsx Admin wrapper syntax.");
