import { useEffect } from 'react';

type Lang = 'ar' | 'ku' | 'en';

const REGISTER_TEXT: Record<Lang, string> = {
  ar: 'سجّل نشاطك التجاري مجاناً',
  ku: 'بزنزەکەت تۆماربکە بە خۆڕایی',
  en: 'Register your business for free',
};

function normalizeLang(value: string | null | undefined): Lang | null {
  if (!value) return null;

  const v = value.toLowerCase().trim();

  if (
    v.includes('ku') ||
    v.includes('ckb') ||
    v.includes('sorani') ||
    v.includes('kurd') ||
    v.includes('کورد') ||
    v.includes('كورد') ||
    v.includes('kurdi')
  ) {
    return 'ku';
  }

  if (v.includes('en') || v.includes('english')) {
    return 'en';
  }

  if (
    v.includes('ar') ||
    v.includes('arabic') ||
    v.includes('عربي') ||
    v.includes('العربية')
  ) {
    return 'ar';
  }

  return null;
}

function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return 'ar';

  const keys = [
    'language',
    'lang',
    'locale',
    'i18nextLng',
    'selectedLanguage',
    'selectedLang',
    'appLanguage',
    'shaku-language',
    'shakuLanguage',
    'shaku_maku_language',
    'shakuMakuLanguage',
  ];

  for (const key of keys) {
    try {
      const found = normalizeLang(window.localStorage.getItem(key));
      if (found) return found;
    } catch {
      // ignore
    }
  }

  try {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (!key) continue;

      const keyLang = normalizeLang(key);
      const valueLang = normalizeLang(window.localStorage.getItem(key));

      if (keyLang) return keyLang;
      if (valueLang) return valueLang;
    }
  } catch {
    // ignore
  }

  const htmlLang = normalizeLang(document.documentElement.lang);
  if (htmlLang) return htmlLang;

  const bodyLang = normalizeLang(document.body.getAttribute('lang'));
  if (bodyLang) return bodyLang;

  const selectedLike = Array.from(
    document.querySelectorAll<HTMLElement>(
      '[aria-pressed="true"], [aria-selected="true"], .active, .selected'
    )
  )
    .map((el) => `${el.innerText || ''} ${el.getAttribute('aria-label') || ''}`)
    .join(' ')
    .toLowerCase();

  const selectedLang = normalizeLang(selectedLike);
  if (selectedLang) return selectedLang;

  const pageText = (document.body.innerText || '').slice(0, 3500).toLowerCase();

  if (
    pageText.includes('کوردی') ||
    pageText.includes('كوردی') ||
    pageText.includes('بزنزەکەت') ||
    pageText.includes('دایبەزێنە')
  ) {
    return 'ku';
  }

  if (
    pageText.includes('register your business') ||
    pageText.includes('login') ||
    pageText.includes('install')
  ) {
    return 'en';
  }

  return 'ar';
}

function hasRegisterBannerText(el: HTMLElement): boolean {
  const text = (el.innerText || el.textContent || '').toLowerCase().trim();

  if (!text) return false;

  return (
    text.includes('register your business') ||
    text.includes('add your business') ||
    text.includes('سجّل') ||
    text.includes('سجل') ||
    text.includes('أضف نشاطك') ||
    text.includes('اضف نشاطك') ||
    text.includes('بزنزەکەت') ||
    text.includes('تۆماربکە')
  );
}

function findBestBanner(): HTMLElement | null {
  const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

  const known = all.find((el) => el.getAttribute('data-shaku-register-banner') === 'true');
  if (known) return known;

  const candidates = all
    .filter((el) => {
      if (!hasRegisterBannerText(el)) return false;

      const rect = el.getBoundingClientRect();
      const text = (el.innerText || el.textContent || '').trim();

      if (rect.height < 18 || rect.height > 140) return false;
      if (text.length > 220) return false;

      const lower = text.toLowerCase();

      // Avoid selecting a whole header/container that also includes login/brand.
      if (
        lower.includes('login') &&
        lower.includes('shaku') &&
        lower.includes('register your business')
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      const aScore = ar.width * ar.height + (a.innerText || '').length * 10;
      const bScore = br.width * br.height + (b.innerText || '').length * 10;

      return aScore - bScore;
    });

  return candidates[0] || null;
}

function findHeader(): HTMLElement | null {
  const direct = Array.from(
    document.querySelectorAll<HTMLElement>('header, nav, [role="banner"]')
  ).find((el) => {
    const text = (el.innerText || el.textContent || '').toLowerCase();
    const rect = el.getBoundingClientRect();

    return (
      rect.height >= 35 &&
      rect.height <= 160 &&
      (text.includes('shaku') ||
        text.includes('شكو') ||
        text.includes('login') ||
        text.includes('دخول'))
    );
  });

  if (direct) return direct;

  const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

  return (
    all.find((el) => {
      const text = (el.innerText || el.textContent || '').toLowerCase();
      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.top <= 180 &&
        rect.height >= 35 &&
        rect.height <= 160 &&
        (text.includes('shaku') ||
          text.includes('شكو') ||
          text.includes('login') ||
          text.includes('دخول'))
      );
    }) || null
  );
}

function forceSingleLanguageText(banner: HTMLElement, lang: Lang) {
  const text = REGISTER_TEXT[lang];

  banner.setAttribute('data-shaku-register-banner', 'true');
  banner.setAttribute('lang', lang === 'ku' ? 'ckb' : lang);
  banner.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
  banner.setAttribute('aria-label', text);
  banner.title = text;

  // Important: replace all mixed-language text with ONE chosen language only.
  banner.textContent = text;
}

function placeBannerAboveHeader(banner: HTMLElement) {
  const header = findHeader();

  Object.assign(banner.style, {
    position: 'sticky',
    top: '0px',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    transform: 'none',
    zIndex: '60',
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    padding: banner.style.padding || '10px 12px',
    pointerEvents: 'auto',
    textAlign: 'center',
    boxSizing: 'border-box',
  });

  const parent = banner.parentElement as HTMLElement | null;

  if (parent && parent !== document.body) {
    const parentStyle = window.getComputedStyle(parent);

    if (
      parentStyle.position === 'fixed' ||
      parentStyle.position === 'absolute' ||
      parentStyle.position === 'sticky'
    ) {
      Object.assign(parent.style, {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        transform: 'none',
        zIndex: '60',
        width: '100%',
      });
    }
  }

  if (header && banner !== header && !banner.contains(header)) {
    const headerParent = header.parentElement;

    if (headerParent && header.previousElementSibling !== banner) {
      headerParent.insertBefore(banner, header);
    }

    const bannerHeight = Math.ceil(banner.getBoundingClientRect().height || 44);
    const headerStyle = window.getComputedStyle(header);

    if (headerStyle.position === 'fixed' || headerStyle.position === 'sticky') {
      header.style.top = `${bannerHeight}px`;
      header.style.zIndex = '50';
    }
  } else if (document.body.firstElementChild !== banner) {
    document.body.insertBefore(banner, document.body.firstChild);
  }
}

export default function TopBannerSafetyFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apply = () => {
      const banner = findBestBanner();
      if (!banner) return;

      const lang = getCurrentLang();

      forceSingleLanguageText(banner, lang);
      placeBannerAboveHeader(banner);
    };

    apply();

    const interval = window.setInterval(apply, 500);
    window.addEventListener('resize', apply);
    window.addEventListener('storage', apply);
    window.addEventListener('languagechange', apply);
    window.addEventListener('click', apply, true);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', apply);
      window.removeEventListener('storage', apply);
      window.removeEventListener('languagechange', apply);
      window.removeEventListener('click', apply, true);
    };
  }, []);

  return null;
}
