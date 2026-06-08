const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = path.join(process.cwd(), "public", "screenshots");
fs.mkdirSync(outDir, { recursive: true });

async function makeScreenshot(file, width, height, title, subtitle) {
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a0a0f"/>
        <stop offset="45%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#064e3b"/>
      </linearGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#22c55e"/>
        <stop offset="50%" stop-color="#facc15"/>
        <stop offset="100%" stop-color="#06b6d4"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <circle cx="${width * 0.82}" cy="${height * 0.18}" r="${Math.min(width,height) * 0.18}" fill="#22c55e" opacity="0.20"/>
    <circle cx="${width * 0.15}" cy="${height * 0.82}" r="${Math.min(width,height) * 0.22}" fill="#facc15" opacity="0.18"/>

    <rect x="${width * 0.08}" y="${height * 0.10}" width="${width * 0.84}" height="${height * 0.78}" rx="${Math.min(width,height) * 0.045}" fill="#111827" opacity="0.92"/>
    <rect x="${width * 0.11}" y="${height * 0.15}" width="${width * 0.78}" height="${height * 0.16}" rx="${Math.min(width,height) * 0.025}" fill="url(#card)"/>

    <text x="50%" y="${height * 0.24}" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Tahoma, sans-serif" font-size="${Math.round(width * 0.055)}" font-weight="900" fill="#111827">
      Shaku Maku
    </text>

    <text x="50%" y="${height * 0.43}" text-anchor="middle"
      font-family="Arial, Tahoma, sans-serif" font-size="${Math.round(width * 0.040)}" font-weight="800" fill="#ffffff">
      ${title}
    </text>

    <text x="50%" y="${height * 0.52}" text-anchor="middle"
      font-family="Arial, Tahoma, sans-serif" font-size="${Math.round(width * 0.026)}" font-weight="500" fill="#d1d5db">
      ${subtitle}
    </text>

    <rect x="${width * 0.18}" y="${height * 0.62}" width="${width * 0.64}" height="${height * 0.09}" rx="${Math.min(width,height) * 0.025}" fill="#22c55e"/>
    <text x="50%" y="${height * 0.675}" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Tahoma, sans-serif" font-size="${Math.round(width * 0.030)}" font-weight="900" fill="#052e16">
      Discover Businesses
    </text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, file));
}

async function main() {
  await makeScreenshot("screenshot-wide.png", 1280, 720, "Iraq Business Directory", "Discover restaurants, doctors, services and local posts.");
  await makeScreenshot("screenshot-mobile.png", 390, 844, "Local Discovery App", "Find businesses and community updates near you.");

  const manifestPath = path.join(process.cwd(), "public", "manifest.webmanifest");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  manifest.screenshots = [
    {
      src: "/screenshots/screenshot-wide.png",
      sizes: "1280x720",
      type: "image/png",
      form_factor: "wide",
      label: "Shaku Maku desktop business discovery"
    },
    {
      src: "/screenshots/screenshot-mobile.png",
      sizes: "390x844",
      type: "image/png",
      label: "Shaku Maku mobile business discovery"
    }
  ];

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", { encoding: "utf8" });

  console.log("PWA screenshots created and manifest updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
