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

      // Do not select the whole header/container.
      if (
        (lower.includes('login') || lower.includes('دخول')) &&
        (lower.includes('shaku') || lower.includes('شكو')) &&
        hasRegisterBannerText(el)
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
      rect.height <= 170 &&
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
        rect.height >= 32 &&
        rect.height <= 170 &&
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

  // One language only. No mixed Arabic/Kurdish/English.
  banner.textContent = text;
}

function attachBannerDirectlyAboveHeader(banner: HTMLElement) {
  const header = findHeader();

  banner.classList.add('shaku-attached-register-banner');

  Object.assign(banner.style, {
    position: 'sticky',
    top: '0px',
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

  const parent = banner.parentElement as HTMLElement | null;

  if (parent && parent !== document.body) {
    Object.assign(parent.style, {
      gap: '0',
      rowGap: '0',
    });

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
        zIndex: '70',
        width: '100%',
        margin: '0',
        padding: '0',
      });
    }
  }

  if (header && banner !== header && !banner.contains(header)) {
    const headerParent = header.parentElement;

    if (headerParent && header.previousElementSibling !== banner) {
      headerParent.insertBefore(banner, header);
    }

    Object.assign(header.style, {
      marginTop: '0',
      paddingTop: header.style.paddingTop || '',
    });

    if (headerParent) {
      Object.assign((headerParent as HTMLElement).style, {
        gap: '0',
        rowGap: '0',
      });
    }

    const headerStyle = window.getComputedStyle(header);
    const bannerHeight = Math.ceil(banner.getBoundingClientRect().height || 38);

    if (headerStyle.position === 'fixed' || headerStyle.position === 'sticky') {
      header.style.top = `${bannerHeight}px`;
      header.style.zIndex = '60';
    }
  } else if (document.body.firstElementChild !== banner) {
    document.body.insertBefore(banner, document.body.firstChild);
  }
}


function forceNoSpaceAboveBanner(banner: HTMLElement) {
  // Remove page-level top spacing so the banner touches the very top.
  document.documentElement.style.marginTop = '0';
  document.documentElement.style.paddingTop = '0';
  document.documentElement.style.scrollPaddingTop = '0';

  document.body.style.marginTop = '0';
  document.body.style.paddingTop = '0';

  const root = document.getElementById('root');
  if (root) {
    root.style.marginTop = '0';
    root.style.paddingTop = '0';
  }

  // Make the banner the first visible thing in the document.
  if (document.body.firstElementChild !== banner) {
    document.body.insertBefore(banner, document.body.firstChild);
  }

  Object.assign(banner.style, {
    marginTop: '0',
    marginBottom: '0',
    top: '0px',
    borderTop: '0',
  });

  // Remove accidental invisible/empty spacers above the app/banner.
  const bodyChildren = Array.from(document.body.children) as HTMLElement[];

  for (const child of bodyChildren) {
    if (child === banner) break;

    const rect = child.getBoundingClientRect();
    const text = (child.innerText || child.textContent || '').trim();
    const hasUsefulContent =
      text.length > 0 ||
      child.querySelector('img, svg, canvas, video, button, a, input, select, textarea');

    if (!hasUsefulContent && rect.height <= 80) {
      child.style.display = 'none';
    } else {
      child.style.marginTop = '0';
      child.style.paddingTop = '0';
    }
  }
}
export default function TopBannerSafetyFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apply = () => {
      const banner = findBestBanner();
      if (!banner) return;

      const lang = getCurrentLang();

      setOneLanguageBannerText(banner, lang);
      attachBannerDirectlyAboveHeader(banner);
      forceNoSpaceAboveBanner(banner);
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

