import { useEffect } from 'react';

function looksLikeRegisterBanner(element: HTMLElement): boolean {
  const text = (element.innerText || element.textContent || '').toLowerCase();

  if (!text) return false;

  const hasRegisterText =
    text.includes('register your business') ||
    text.includes('add your business') ||
    text.includes('سجّل') ||
    text.includes('سجل') ||
    text.includes('أضف نشاطك') ||
    text.includes('اضف نشاطك') ||
    text.includes('زیادکردنی کارەکەت') ||
    text.includes('business');

  if (!hasRegisterText) return false;

  const rect = element.getBoundingClientRect();

  return rect.top <= 90 && rect.height > 20 && rect.height < 120;
}

export default function TopBannerSafetyFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let intervalId: number | undefined;

    const applyFix = () => {
      const all = Array.from(document.querySelectorAll<HTMLElement>('body *'));

      const banner = all.find((element) => {
        const style = window.getComputedStyle(element);
        const isTopLayer =
          style.position === 'fixed' ||
          style.position === 'sticky' ||
          Number(style.zIndex || 0) > 20;

        return isTopLayer && looksLikeRegisterBanner(element);
      });

      if (!banner) return;

      banner.setAttribute('data-shaku-banner-fixed', 'true');

      Object.assign(banner.style, {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        transform: 'none',
        zIndex: '40',
        width: '100%',
        maxWidth: '100%',
        marginTop: '0',
        marginBottom: '6px',
        pointerEvents: 'auto'
      });

      const parent = banner.parentElement;
      if (parent && parent !== document.body) {
        const parentStyle = window.getComputedStyle(parent);

        if (parentStyle.position === 'fixed') {
          Object.assign(parent.style, {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            transform: 'none',
            zIndex: '40'
          });
        }
      }

      const possibleHeaders = Array.from(
        document.querySelectorAll<HTMLElement>('header, nav, [role="banner"]')
      );

      possibleHeaders.forEach((header) => {
        header.style.zIndex = '30';
      });
    };

    applyFix();
    intervalId = window.setInterval(applyFix, 800);

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return null;
}
