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
    v.includes('kurdi')
  ) {
    return 'ku';
  }

  if (v.includes('en') || v.includes('english')) {
    return 'en';
  }

  if (v.includes('ar') || v.includes('arabic') || v.includes('عربي') || v.includes('العربية')) {
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

  const pageText = (document.body.innerText || '').slice(0, 2500).toLowerCase();

  if (pageText.includes('کوردی') || pageText.includes('بزنز') || pageText.includes('دایبەزێنە')) {
    return 'ku';
  }

  if (pageText.includes('register your business') || pageText.includes('login')) {
    return 'en';
  }

  return 'ar';
}

function isRegisterBusinessBanner(el: HTMLElement): boolean {
  const text = (el.innerText || el.textContent || '').toLowerCase().trim();
  if (!text) return false;

  const hasText =
    text.includes('register your business') ||
    text.includes('add your business') ||
    text.includes('سجّل') ||
    text.includes('سجل') ||
    text.includes('أضف نشاطك') ||
    text.includes('اضف نشاطك') ||
    text.includes('بزنزەکەت') ||
    text.includes('تۆماربکە') ||
    text.includes('business');

  if (!hasText) return false;

  const rect = el.getBoundingClientRect();
  return rect.height >= 20 && rect.height <= 120;
}

function findHeader(): HTMLElement | null {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('header, nav, [role="banner"]')
  );

  if (candidates.length) return candidates[0];

  const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

  return (
    all.find((el) => {
      const text = (el.innerText || el.textContent || '').toLowerCase();
      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.top <= 140 &&
        rect.height >= 36 &&
        rect.height <= 140 &&
        (text.includes('shaku') ||
          text.includes('شكو') ||
          text.includes('login') ||
          text.includes('دخول'))
      );
    }) || null
  );
}

function setElementTextKeepingIcon(el: HTMLElement, text: string) {
  const children = Array.from(el.childNodes);

  const textNode = children.find((node) => node.nodeType === Node.TEXT_NODE);

  if (textNode) {
    textNode.textContent = text;
    return;
  }

  const textLikeChild = Array.from(el.querySelectorAll<HTMLElement>('span, div, p, strong, b')).find(
    (child) => {
      const childText = (child.innerText || child.textContent || '').trim();
      return childText.length > 0 && childText.length < 80;
    }
  );

  if (textLikeChild) {
    textLikeChild.textContent = text;
    return;
  }

  el.textContent = text;
}

export default function TopBannerSafetyFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apply = () => {
      const lang = getCurrentLang();
      const label = REGISTER_TEXT[lang];

      const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

      const banner =
        all.find((el) => el.getAttribute('data-shaku-register-banner') === 'true') ||
        all.find((el) => {
          const style = window.getComputedStyle(el);
          const topLayer =
            style.position === 'fixed' ||
            style.position === 'sticky' ||
            Number(style.zIndex || '0') >= 20;

          return topLayer && isRegisterBusinessBanner(el);
        }) ||
        all.find(isRegisterBusinessBanner);

      if (!banner) return;

      const header = findHeader();

      banner.setAttribute('data-shaku-register-banner', 'true');
      banner.setAttribute('lang', lang === 'ku' ? 'ckb' : lang);
      banner.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

      setElementTextKeepingIcon(banner, label);

      Object.assign(banner.style, {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        transform: 'none',
        zIndex: '50',
        width: '100%',
        maxWidth: '100%',
        margin: '0',
        marginBottom: '0',
        pointerEvents: 'auto',
        direction: lang === 'en' ? 'ltr' : 'rtl',
        textAlign: 'center'
      });

      const parent = banner.parentElement as HTMLElement | null;
      if (parent && parent !== document.body) {
        const parentStyle = window.getComputedStyle(parent);

        if (parentStyle.position === 'fixed' || parentStyle.position === 'absolute') {
          Object.assign(parent.style, {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            transform: 'none',
            zIndex: '50',
            width: '100%'
          });
        }
      }

      if (header && banner !== header && !banner.contains(header)) {
        const headerParent = header.parentElement;

        if (headerParent && header.previousElementSibling !== banner) {
          headerParent.insertBefore(banner, header);
        }
      } else if (document.body.firstElementChild !== banner) {
        document.body.insertBefore(banner, document.body.firstChild);
      }
    };

    apply();

    const interval = window.setInterval(apply, 600);
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
