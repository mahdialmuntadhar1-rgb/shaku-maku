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
  ) return 'ku';

  if (v.includes('en') || v.includes('english')) return 'en';

  if (
    v.includes('ar') ||
    v.includes('arabic') ||
    v.includes('عربي') ||
    v.includes('العربية')
  ) return 'ar';

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

  const selectedText = Array.from(
    document.querySelectorAll<HTMLElement>(
      '[aria-pressed="true"], [aria-selected="true"], .active, .selected'
    )
  )
    .map((el) => `${el.innerText || ''} ${el.getAttribute('aria-label') || ''}`)
    .join(' ')
    .toLowerCase();

  const selectedLang = normalizeLang(selectedText);
  if (selectedLang) return selectedLang;

  const htmlLang = normalizeLang(document.documentElement.lang);
  if (htmlLang) return htmlLang;

  const bodyLang = normalizeLang(document.body.getAttribute('lang'));
  if (bodyLang) return bodyLang;

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
      const lower = text.toLowerCase();

      if (rect.height < 16 || rect.height > 140) return false;
      if (text.length > 220) return false;

      if (
        (lower.includes('login') || lower.includes('دخول')) &&
        (lower.includes('shaku') || lower.includes('شكو'))
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      const aScore = ar.width * ar.height + (a.innerText || '').length * 12;
      const bScore = br.width * br.height + (b.innerText || '').length * 12;

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
      rect.height >= 32 &&
      rect.height <= 180 &&
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
        rect.top <= 240 &&
        rect.height >= 32 &&
        rect.height <= 180 &&
        (text.includes('shaku') ||
          text.includes('شكو') ||
          text.includes('login') ||
          text.includes('دخول'))
      );
    }) || null
  );
}

function setOneLanguageBannerText(banner: HTMLElement, lang: Lang) {
  const text = REGISTER_TEXT[lang];

  banner.setAttribute('data-shaku-register-banner', 'true');
  banner.setAttribute('lang', lang === 'ku' ? 'ckb' : lang);
  banner.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
  banner.setAttribute('aria-label', text);
  banner.title = text;

  banner.textContent = text;
}

function hideEverythingAboveBanner(banner: HTMLElement, header: HTMLElement | null) {
  document.documentElement.style.margin = '0';
  document.documentElement.style.padding = '0';
  document.body.style.margin = '0';
  document.body.style.padding = '0';

  const root = document.getElementById('root');
  if (root) {
    root.style.marginTop = '0';
    root.style.paddingTop = '0';
  }

  const bannerRect = banner.getBoundingClientRect();
  const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

  all.forEach((el) => {
    if (el === banner) return;
    if (banner.contains(el)) return;
    if (header && (el === header || header.contains(el))) return;

    const rect = el.getBoundingClientRect();
    const text = (el.innerText || el.textContent || '').trim();

    const isAboveBanner = rect.bottom <= bannerRect.top + 4;
    const isTopMess = rect.top >= -5 && rect.top < bannerRect.top + 4;
    const isSmallTopStrip = rect.height <= 110;

    if (isAboveBanner && isTopMess && isSmallTopStrip) {
      el.style.display = 'none';
      el.setAttribute('data-shaku-hidden-top-mess', 'true');
    }

    if (!text && rect.top < bannerRect.top + 4 && rect.height <= 120) {
      el.style.display = 'none';
      el.setAttribute('data-shaku-hidden-empty-space', 'true');
    }
  });
}

function attachOnlyBannerToHeader(banner: HTMLElement) {
  const header = findHeader();

  setOneLanguageBannerText(banner, getCurrentLang());

  banner.classList.add('shaku-attached-register-banner');

  Object.assign(banner.style, {
    position: 'relative',
    top: 'auto',
    left: '0',
    right: '0',
    bottom: 'auto',
    transform: 'none',
    zIndex: '70',
    width: '100%',
    maxWidth: '100%',
    minHeight: '38px',
    margin: '0',
    marginTop: '0',
    marginBottom: '0',
    padding: '9px 12px',
    borderRadius: '0',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    background: '#16a34a',
    color: '#ffffff',
    fontWeight: '900',
    lineHeight: '1.15',
    textAlign: 'center',
    pointerEvents: 'auto',
  });

  if (header && banner !== header && !banner.contains(header)) {
    const headerParent = header.parentElement;

    if (headerParent && header.previousElementSibling !== banner) {
      headerParent.insertBefore(banner, header);
    }

    Object.assign(header.style, {
      marginTop: '0',
      paddingTop: '0',
    });

    Object.assign(headerParent?.style || {}, {
      gap: '0',
      rowGap: '0',
      paddingTop: '0',
      marginTop: '0',
    });

    let node: HTMLElement | null = banner.parentElement;
    while (node && node !== document.body) {
      node.style.marginTop = '0';
      node.style.paddingTop = '0';
      node = node.parentElement;
    }

    hideEverythingAboveBanner(banner, header);
  } else {
    const body = document.body;

    if (body.firstElementChild !== banner) {
      body.insertBefore(banner, body.firstChild);
    }

    hideEverythingAboveBanner(banner, null);
  }
}

export default function TopBannerSafetyFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apply = () => {
      const banner = findBestBanner();
      if (!banner) return;

      attachOnlyBannerToHeader(banner);
    };

    apply();

    const interval = window.setInterval(apply, 400);
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
