import { decorateIcons } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) return;

  const html = await resp.text();
  const footer = document.createElement('div');
  footer.className = 'footer-content';
  footer.innerHTML = html;

  const sections = footer.querySelectorAll(':scope > div');
  if (sections.length > 0) sections[0].className = 'footer-brand';
  if (sections.length > 1) sections[1].className = 'footer-nav';
  if (sections.length > 2) sections[2].className = 'footer-social';
  if (sections.length > 3) sections[3].className = 'footer-legal';

  decorateIcons(footer);
  block.textContent = '';
  block.append(footer);
}
