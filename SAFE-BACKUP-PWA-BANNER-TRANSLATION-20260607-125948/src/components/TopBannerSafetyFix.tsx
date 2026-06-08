import { useEffect } from 'react';

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
    text.includes('business');

  if (!hasText) return false;

  const rect = el.getBoundingClientRect();
  return rect.height >= 24 && rect.height <= 110;
}

function findHeader(): HTMLElement | null {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('header, nav, [role="banner"]')
  );

  if (candidates.length) {
    return candidates[0];
  }

  const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

  return (
    all.find((el) => {
      const text = (el.innerText || el.textContent || '').toLowerCase();
      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.top <= 120 &&
        rect.height >= 40 &&
        rect.height <= 130 &&
        (text.includes('shaku') ||
          text.includes('شكو') ||
          text.includes('login') ||
          text.includes('دخول'))
      );
    }) || null
  );
}

export default function TopBannerSafetyFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apply = () => {
      const bodyChildren = Array.from(document.body.children) as HTMLElement[];
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
        pointerEvents: 'auto'
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
      } else if (bodyChildren[0] !== banner) {
        document.body.insertBefore(banner, document.body.firstChild);
      }

      const fixedTopItems = all.filter((el) => {
        if (el === banner || banner.contains(el)) return false;

        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const text = (el.innerText || el.textContent || '').toLowerCase();

        return (
          (style.position === 'fixed' || style.position === 'sticky') &&
          rect.top <= 70 &&
          (text.includes('shaku') ||
            text.includes('شكو') ||
            text.includes('login') ||
            text.includes('دخول'))
        );
      });

      fixedTopItems.forEach((el) => {
        el.style.top = `${Math.ceil(banner.getBoundingClientRect().height)}px`;
        el.style.zIndex = '40';
      });
    };

    apply();

    const interval = window.setInterval(apply, 600);
    window.addEventListener('resize', apply);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', apply);
    };
  }, []);

  return null;
}
