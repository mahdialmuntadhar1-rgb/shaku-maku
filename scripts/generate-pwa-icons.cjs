const fs = require("fs");
const path = require("path");

function pngBase64(size, maskable = false) {
  const sharp = require("sharp");
}

async function makeIcon(file, size, maskable) {
  const sharp = require("sharp");

  const padding = maskable ? Math.round(size * 0.18) : Math.round(size * 0.12);
  const inner = size - padding * 2;

  const svg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#22c55e"/>
        <stop offset="50%" stop-color="#facc15"/>
        <stop offset="100%" stop-color="#06b6d4"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="${Math.round(size * 0.03)}" stdDeviation="${Math.round(size * 0.04)}" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#0a0a0f"/>
    <circle cx="${Math.round(size * 0.72)}" cy="${Math.round(size * 0.25)}" r="${Math.round(size * 0.18)}" fill="url(#g)" opacity="0.85"/>
    <rect x="${padding}" y="${padding}" width="${inner}" height="${inner}" rx="${Math.round(size * 0.18)}" fill="url(#g)" filter="url(#shadow)"/>
    <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Tahoma, sans-serif" font-size="${Math.round(size * 0.30)}" font-weight="900"
      fill="#111827">SM</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(file);
}

async function main() {
  const iconsDir = path.join(process.cwd(), "public", "icons");
  fs.mkdirSync(iconsDir, { recursive: true });

  await makeIcon(path.join(iconsDir, "icon-192.png"), 192, false);
  await makeIcon(path.join(iconsDir, "icon-512.png"), 512, false);
  await makeIcon(path.join(iconsDir, "icon-maskable-512.png"), 512, true);

  console.log("PNG icons generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
