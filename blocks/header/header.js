import { decorateIcons } from '../../scripts/aem.js';

function closeMenu() {
  document.body.classList.remove('nav-open');
  const nav = document.querySelector('.header .nav');
  if (nav) nav.setAttribute('aria-expanded', 'false');
}

function openMenu() {
  document.body.classList.add('nav-open');
  const nav = document.querySelector('.header .nav');
  if (nav) nav.setAttribute('aria-expanded', 'true');
}

export default async function decorate(block) {
  const resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) return;

  const html = await resp.text();
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.setAttribute('aria-expanded', 'false');
  nav.innerHTML = html;

  // Structure the navigation
  const sections = nav.querySelectorAll(':scope > div');
  if (sections.length > 0) sections[0].className = 'nav-brand';
  if (sections.length > 1) sections[1].className = 'nav-sections';
  if (sections.length > 2) sections[2].className = 'nav-tools';

  // Add hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu();
    else openMenu();
  });
  nav.prepend(hamburger);

  // Handle dropdowns
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope > ul > li').forEach((li) => {
      if (li.querySelector('ul')) {
        li.classList.add('nav-drop');
        li.addEventListener('click', (e) => {
          if (e.target.closest('a')) return;
          li.classList.toggle('nav-drop-open');
        });
      }
    });
  }

  decorateIcons(nav);
  block.textContent = '';
  block.append(nav);
}
