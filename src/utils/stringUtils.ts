/**
 * Unicode and RTL-safe string utility functions (Chunk 4)
 */

/** Normalize text to NFC for consistent representation */
export function normalizeText(text: string): string {
  return text.normalize('NFC');
}

/** Detect Arabic or Kurdish script */
export function isArabicOrKurdish(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

/** Safe substring that respects Unicode code-point boundaries */
export function safeSubstring(text: string, start: number, end?: number): string {
  return Array.from(text).slice(start, end).join('');
}

/** Truncate with proper Unicode character handling */
export function safeTruncate(text: string, length: number, suffix = '...'): string {
  const chars = Array.from(text);
  if (chars.length <= length) return text;
  return chars.slice(0, length - Array.from(suffix).length).join('') + suffix;
}

/** Search in text with locale-aware normalization */
export function safeSearch(text: string, query: string): boolean {
  return normalizeText(text).includes(normalizeText(query));
}

/** Count actual grapheme characters, not bytes */
export function getCharacterCount(text: string): number {
  return Array.from(text).length;
}

/** Replace all occurrences safely with normalized strings */
export function safeReplace(text: string, search: string, replace: string): string {
  return normalizeText(text).split(normalizeText(search)).join(normalizeText(replace));
}

/** Get first Unicode character safely */
export function getFirstChar(text: string): string {
  return Array.from(text)[0] ?? '';
}

/** Get last Unicode character safely */
export function getLastChar(text: string): string {
  const chars = Array.from(text);
  return chars[chars.length - 1] ?? '';
}

/** Auto-detect and return correct dir attribute */
export function getTextDir(text: string): 'rtl' | 'ltr' {
  return isArabicOrKurdish(text) ? 'rtl' : 'ltr';
}

/** Check if a string has any replacement / corruption characters */
export function isCorrupted(text: string): boolean {
  return text.includes('\uFFFD') || text.includes('\uFFFE') || text.includes('\uFFFF');
}

/**
 * Detect mojibake / garbled text.
 * Garbled = contains Latin chars mixed with Arabic, or high-byte Latin-1 sequences,
 * or replacement chars that indicate double-encoding corruption.
 */
export function isGarbled(text: string): boolean {
  if (!text) return false;
  // Contains replacement chars
  if (/[\uFFFD\uFFFE\uFFFF]/.test(text)) return true;
  // Contains Latin-1 supplement chars that appear in double-encoded Arabic (Ã˜ Ã™ Ã› Ãš Ã‚ Ãƒ)
  if (/[\u00C0-\u00FF]/.test(text)) return true;
  // Contains ASCII control or non-printable chars
  if (/[\x00-\x08\x0E-\x1F\x7F]/.test(text)) return true;
  // Contains sequences like random ASCII letters sandwiched between Arabic chars
  // e.g. "كاف‌S‌? لوفا" â€” ASCII letter between Arabic chars is a strong signal
  if (/[\u0600-\u06FF][A-Za-z][A-Za-z\?~^"]{1,2}[\u0600-\u06FF]/.test(text)) return true;
  // Starts with garbage pattern like "Ã¢" or "Ã‚"
  if (/^[Ã¢Ã‚Ã£Ãƒ]/.test(text)) return true;
  return false;
}

/**
 * Returns the best available localized string, falling back to English
 * if the requested language text is garbled/corrupted.
 */
export function safeLocalized(
  obj: { ar?: string; ku?: string; en?: string } | undefined,
  lang: 'ar' | 'ku' | 'en'
): string {
  if (!obj) return '';
  const requested = obj[lang] || '';
  if (requested && !isGarbled(requested)) return requested;
  // Fallback chain
  if (lang !== 'en' && obj.en && !isGarbled(obj.en)) return obj.en;
  if (lang === 'ku' && obj.ar && !isGarbled(obj.ar)) return obj.ar;
  if (lang === 'ar' && obj.ku && !isGarbled(obj.ku)) return obj.ku;
  return obj.en || obj.ar || obj.ku || '';
}
