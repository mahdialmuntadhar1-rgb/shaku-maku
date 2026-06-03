import { useEffect } from 'react';

function normalizeText(value: string) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function isSocialText(text: string) {
  const value = normalizeText(text);
  return (
    value.includes('social feed') ||
    value.includes('socialfeed') ||
    value.includes('social') ||
    value.includes('feed') ||
    value.includes('منشور') ||
    value.includes('السوشيال') ||
    value.includes('کۆمەڵایەتی')
  );
}

function isBusinessText(text: string) {
  const value = normalizeText(text);
  return (
    value.includes('businesses') ||
    value.includes('business') ||
    value.includes('الأعمال') ||
    value.includes('اعمال') ||
    value.includes('النشاطات') ||
    value.includes('الشركات') ||
    value.includes('المحال') ||
    value.includes('بازرگانی') ||
    value.includes('کاروبار')
  );
}

function findBestGlowTarget(element: HTMLElement) {
  const directClickable = element.closest<HTMLElement>('button, a, [role="button"], [role="tab"], [data-tab]');
  if (directClickable) return directClickable;

  const card = element.closest<HTMLElement>(
    '.rounded-3xl, .rounded-2xl, .cursor-pointer, [class*="rounded"], [class*="shadow"], [class*="border"]'
  );

  return card || element;
}

export default function AttentionTabsGlow() {
  useEffect(() => {
    const applyGlow = () => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          'button, a, div, section, article, [role="button"], [role="tab"], [data-tab], [aria-label]'
        )
      );

      candidates.forEach((element) => {
        const text = [
          element.innerText,
          element.textContent,
          element.getAttribute('aria-label') || '',
          element.getAttribute('title') || '',
          element.getAttribute('data-tab') || ''
        ].join(' ');

        if (!text) return;

        if (isSocialText(text) || isBusinessText(text)) {
          const target = findBestGlowTarget(element);
          target.classList.add('shaku-police-tab-glow');
          target.classList.add('shaku-police-card-glow');
        }
      });
    };

    applyGlow();

    const timer = window.setInterval(applyGlow, 700);

    const observer = new MutationObserver(applyGlow);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
