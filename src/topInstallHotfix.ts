const installLike = /(install|add to home|ØªØ«Ø¨ÙŠØª|ØªÙ†Ø²ÙŠÙ„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚|pwa)/i;
const TOP_LIMIT = 220;

function isTopInstallButton(el) {
  const text = [
    el.textContent ?? '',
    el.getAttribute('aria-label') ?? '',
    el.getAttribute('title') ?? '',
  ].join(' ').trim();
  if (!installLike.test(text)) return false;

  const rect = el.getBoundingClientRect();
  if (rect.top < -10 || rect.top > TOP_LIMIT) return false;

  const headerContainer = el.closest('header, nav, [role="banner"], [class*="header"], [class*="nav"], [class*="top"], [class*="sticky"], [class*="fixed"]');
  const style = window.getComputedStyle(el);
  return !!headerContainer || style.position === 'fixed' || style.position === 'sticky';
}

function hideTopInstallButton() {
  const candidates = Array.from(document.querySelectorAll('button, a, [role="button"]'))
    .filter(isTopInstallButton)
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  const target = candidates[0] as HTMLElement | undefined;
  if (!target) return;
  target.style.display = 'none';
  target.style.visibility = 'hidden';
  target.setAttribute('aria-hidden', 'true');
}

const run = () => window.requestAnimationFrame(hideTopInstallButton);
window.addEventListener('load', run);
new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'aria-label', 'title'] });
