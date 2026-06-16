const fs = require("fs");

const file = "src/components/BusinessFeed.tsx";
let s = fs.readFileSync(file, "utf8");

if (!s.includes("function localizedText(value: unknown")) {
  const marker = "  const t = TRANSLATIONS[currentLang];";
  const helper = `
  function localizedText(value: unknown, fallback = ''): string {
    if (typeof value === 'string') return value.trim() || fallback;
    if (!value || typeof value !== 'object') return fallback;

    const record = value as Record<string, unknown>;
    const keys = [currentLang, 'en', 'ar', 'ku'];

    for (const key of keys) {
      const candidate = record[key];
      if (candidate !== undefined && candidate !== null && String(candidate).trim()) {
        return String(candidate).trim();
      }
    }

    return fallback;
  }

  function businessName(biz: any): string {
    return localizedText(biz?.name, 'Business');
  }

  function businessDescription(biz: any): string {
    return localizedText(biz?.description, '');
  }

  function businessAddress(biz: any): string {
    return localizedText(biz?.address, '');
  }
`;
  if (!s.includes(marker)) {
    throw new Error("Could not find insertion marker: " + marker);
  }
  s = s.replace(marker, marker + helper);
}

const replacements = [
  ["biz.name[currentLang] || biz.name.en || biz.name.ar || ''", "businessName(biz)"],
  ["biz.name[currentLang]", "businessName(biz)"],
  ["biz.name.en", "businessName(biz)"],
  ["biz.name.ar", "businessName(biz)"],
  ["biz.name.ku", "businessName(biz)"],
  ["biz.description[currentLang]", "businessDescription(biz)"],
  ["biz.address[currentLang]", "businessAddress(biz)"],
  ["biz.featuredDeal[currentLang]", "localizedText(biz.featuredDeal, '')"],
  ["category.name[currentLang]", "localizedText(category.name, category.id)"]
];

for (const [from, to] of replacements) {
  s = s.split(from).join(to);
}

// Remove duplicated debug effect if present twice. This is not required for the crash,
// but it reduces noisy console logs.
const debugBlock = `  React.useEffect(() => {
    console.log('[ShakuMaku] business feed filter:', {
      selectedGov,
      normalizedSelectedGov,
      selectedCategory,
      inputBusinesses: businesses.length,
      afterGovernorateFilter: govFiltered.length,
      visibleCount
    });
  }, [selectedGov, normalizedSelectedGov, selectedCategory, businesses.length, govFiltered.length, visibleCount]);

`;
const first = s.indexOf(debugBlock);
const second = first >= 0 ? s.indexOf(debugBlock, first + debugBlock.length) : -1;
if (second >= 0) {
  s = s.slice(0, second) + s.slice(second + debugBlock.length);
}

fs.writeFileSync(file, s, "utf8");
console.log("Patched BusinessFeed.tsx safe localized text fallbacks.");
