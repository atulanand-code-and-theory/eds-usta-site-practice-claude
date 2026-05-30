import { decorateIcons } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const resp = await fetch('/footer.plain.html');
  if (!resp.ok) return;

  const html = await resp.text();
  const footer = document.createElement('div');
  footer.className = 'footer-content';
  footer.innerHTML = html;

  const sections = footer.querySelectorAll(':scope > div');
  if (sections.length > 0) sections[0].className = 'footer-app-download';
  if (sections.length > 1) sections[1].className = 'footer-main';
  if (sections.length > 2) sections[2].className = 'footer-social-apps';
  if (sections.length > 3) sections[3].className = 'footer-copyright';

  // Split footer-main into logo and nav
  const mainSection = footer.querySelector('.footer-main');
  if (mainSection) {
    const logo = mainSection.querySelector('img');
    if (logo) {
      const logoWrapper = document.createElement('div');
      logoWrapper.className = 'footer-logo';
      logoWrapper.append(logo.closest('p') || logo);
      mainSection.prepend(logoWrapper);
    }
  }

  // Split social-apps into social links and app links
  const socialAppsSection = footer.querySelector('.footer-social-apps');
  if (socialAppsSection) {
    const lists = socialAppsSection.querySelectorAll('ul');
    if (lists.length > 0) lists[0].classList.add('footer-social-list');
    if (lists.length > 1) lists[1].classList.add('footer-apps-list');
  }

  decorateIcons(footer);
  block.textContent = '';
  block.append(footer);
}
