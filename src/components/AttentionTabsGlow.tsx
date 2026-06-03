import { useEffect } from 'react';

const TAB_KEYWORDS = [
  'social feed',
  'social',
  'feed',
  'المنشورات',
  'منشورات',
  'السوشيال',
  'التواصل',
  'کۆمەڵایەتی',
  'businesses',
  'business',
  'الأعمال',
  'اعمال',
  'النشاطات',
  'الشركات',
  'المحال',
  'بازرگانی',
  'کاروبار'
];

function shouldGlow(text: string) {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();

  if (!normalized) return false;

  const looksLikeSocial =
    TAB_KEYWORDS.some((keyword) => normalized.includes(keyword)) &&
    (
      normalized.includes('social') ||
      normalized.includes('feed') ||
      normalized.includes('منشور') ||
      normalized.includes('السوشيال') ||
      normalized.includes('کۆمەڵایەتی')
    );

  const looksLikeBusiness =
    TAB_KEYWORDS.some((keyword) => normalized.includes(keyword)) &&
    (
      normalized.includes('business') ||
      normalized.includes('الأعمال') ||
      normalized.includes('اعمال') ||
      normalized.includes('النشاطات') ||
      normalized.includes('الشركات') ||
      normalized.includes('المحال') ||
      normalized.includes('بازرگانی') ||
      normalized.includes('کاروبار')
    );

  return looksLikeSocial || looksLikeBusiness;
}

export default function AttentionTabsGlow() {
  useEffect(() => {
    const applyGlow = () => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>('button, a, [role="tab"], [data-tab], [aria-label]')
      );

      candidates.forEach((element) => {
        const text = [
          element.innerText,
          element.textContent,
          element.getAttribute('aria-label') || '',
          element.getAttribute('title') || '',
          element.getAttribute('data-tab') || ''
        ].join(' ');

        if (shouldGlow(text)) {
          element.classList.add('shaku-police-tab-glow');
        }
      });
    };

    applyGlow();

    const timer = window.setInterval(applyGlow, 1200);

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
