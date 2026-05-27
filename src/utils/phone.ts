export type PhoneNormalizeResult = {
  raw: string;
  digits: string; // digits-only
  e164?: string; // best guess e164 if possible
  countryCallingCode: string; // e.g. "964"
  national?: string; // national format digits (no leading 0 normalization applied)
  tokens: string[]; // query tokens to match businesses
};

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Very small, deterministic normalizer optimized for Iraq (+964) default.
 * We intentionally avoid pulling full libphonenumber to keep bundle small.
 *
 * Examples that should match for Iraq:
 * - +9647712345678
 * - 07712345678
 * - 7712345678
 */
export function normalizePhoneForSearch(
  input: string,
  opts?: { defaultCountryCallingCode?: string }
): PhoneNormalizeResult {
  const defaultCountryCallingCode = opts?.defaultCountryCallingCode || '964';
  const raw = input || '';
  const digits = raw.replace(/[^\d+]/g, '').replace(/[^\d]/g, '');

  // If user typed +..., keep it by checking original string
  const hadPlus = raw.trim().startsWith('+');
  const tokens: string[] = [];

  // Heuristics:
  // - Iraq mobiles are commonly 10 digits after leading 0 (07xxxxxxxxx => 11 digits incl 0)
  // - sometimes users omit leading 0: 7xxxxxxxxx (10 digits)
  // - sometimes includes country: 9647xxxxxxxxx (13 digits) or 96407... (rare)
  let national = digits;
  let countryCallingCode = defaultCountryCallingCode;

  // Detect explicit country code typed
  if (hadPlus && raw.trim().startsWith('+') && digits.length >= 11) {
    // assume first 1-3 digits are country code; we only support +964 explicitly for now
    if (digits.startsWith('964')) {
      countryCallingCode = '964';
      national = digits.slice(3);
    } else {
      // best effort: keep as-is
      national = digits;
    }
  } else if (digits.startsWith('964') && digits.length >= 12) {
    countryCallingCode = '964';
    national = digits.slice(3);
  }

  // Iraq-specific cleanup
  if (countryCallingCode === '964') {
    // remove leading 0 if present
    if (national.startsWith('0')) national = national.slice(1);
    // if it starts with 7 and is 10 digits, it's a mobile
    // if it starts with 7 and is 9 digits, user may have missed a digit (keep anyway)
  }

  const e164 = national ? `+${countryCallingCode}${national}` : undefined;

  // Tokens are stored as digits-only in Firestore indexing fields
  // We include multiple variants to tolerate formatting differences.
  if (digits) tokens.push(digits);
  if (national) {
    tokens.push(national);
    if (countryCallingCode) tokens.push(`${countryCallingCode}${national}`);
  }
  if (countryCallingCode === '964' && national) {
    // local format with leading 0 (07xxxxxxxxx)
    tokens.push(`0${national}`);
  }

  // Also include last 10 digits for tolerance (common unique tail)
  if (national.length >= 10) tokens.push(national.slice(-10));
  if (digits.length >= 10) tokens.push(digits.slice(-10));

  const cleanedTokens = uniq(tokens.filter(Boolean).map((t) => t.replace(/[^\d]/g, '')).filter((t) => t.length >= 7));

  return {
    raw,
    digits,
    e164,
    countryCallingCode,
    national,
    tokens: cleanedTokens.slice(0, 10), // Firestore array-contains-any limit is 10
  };
}

