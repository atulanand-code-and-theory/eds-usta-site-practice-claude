import { decorateIcons } from '../../scripts/aem.js';

const MOBILE_BREAKPOINT = 900;

function buildSearchOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'header-search-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="header-search-overlay-inner">
      <form class="header-search-form" role="search" action="/en/home/search.html">
        <input type="search" class="header-search-input" placeholder="Search USTA.com" aria-label="Search USTA" name="q" autocomplete="off">
        <button type="submit" class="header-search-submit" aria-label="Submit search">
          <span class="icon icon-search"></span>
        </button>
        <button type="button" class="header-search-close" aria-label="Close search">
          <span class="icon icon-close"></span>
        </button>
      </form>
    </div>
  `;
  return overlay;
}

function toggleSearch(header, open) {
  const overlay = header.querySelector('.header-search-overlay');
  const isOpen = open !== undefined ? open : overlay.getAttribute('aria-hidden') === 'true';
  overlay.setAttribute('aria-hidden', String(!isOpen));
  header.classList.toggle('header-search-open', isOpen);
  if (isOpen) {
    overlay.querySelector('.header-search-input').focus();
  }
}

function closeAllMenus(nav) {
  nav.querySelectorAll('.header-nav-item[aria-expanded="true"]').forEach((item) => {
    item.setAttribute('aria-expanded', 'false');
  });
}

function toggleMobileNav(header, open) {
  const nav = header.querySelector('.header-nav');
  const hamburger = header.querySelector('.header-hamburger');
  const isOpen = open !== undefined ? open : !nav.classList.contains('header-nav-open');
  nav.classList.toggle('header-nav-open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('header-nav-is-open', isOpen);
  if (!isOpen) closeAllMenus(nav);
}

function isMobile() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function buildMegaMenu(ul) {
  const panel = document.createElement('div');
  panel.className = 'header-megamenu';
  panel.setAttribute('role', 'region');

  const columns = document.createElement('div');
  columns.className = 'header-megamenu-columns';

  const items = ul.querySelectorAll(':scope > li');
  items.forEach((li) => {
    const img = li.querySelector(':scope > img');
    const link = li.querySelector(':scope > a');
    const subUl = li.querySelector(':scope > ul');

    const col = document.createElement('div');
    col.className = 'header-megamenu-item';

    const headingRow = document.createElement('div');
    headingRow.className = 'header-megamenu-heading-row';

    if (img) {
      const icon = img.cloneNode(true);
      icon.className = 'header-megamenu-icon';
      headingRow.append(icon);
    }

    if (link) {
      const heading = document.createElement('a');
      heading.href = link.href;
      heading.className = 'header-megamenu-heading';
      heading.textContent = link.textContent;
      headingRow.append(heading);
    }

    col.append(headingRow);

    if (subUl) {
      const subLinks = document.createElement('ul');
      subLinks.className = 'header-megamenu-sublinks';
      subUl.querySelectorAll(':scope > li > a').forEach((a) => {
        const subLi = document.createElement('li');
        const subLink = a.cloneNode(true);
        subLink.className = 'header-megamenu-sublink';
        subLi.append(subLink);
        subLinks.append(subLi);
      });
      col.append(subLinks);
    }

    columns.append(col);
  });

  panel.append(columns);
  return panel;
}

function decorateNavItems(nav) {
  const ul = nav.querySelector(':scope > ul');
  if (!ul) return;

  ul.setAttribute('role', 'menubar');
  const items = ul.querySelectorAll(':scope > li');

  items.forEach((li) => {
    li.className = 'header-nav-item';
    li.setAttribute('role', 'none');

    const link = li.querySelector(':scope > a');
    if (link) {
      link.setAttribute('role', 'menuitem');
      link.className = 'header-nav-link';
    }

    const subUl = li.querySelector(':scope > ul');
    if (subUl) {
      li.setAttribute('aria-expanded', 'false');
      li.setAttribute('aria-haspopup', 'true');

      const chevron = document.createElement('span');
      chevron.className = 'icon icon-chevron-down header-nav-chevron';
      if (link) link.append(chevron);

      const megamenu = buildMegaMenu(subUl);
      subUl.remove();
      li.append(megamenu);

      li.addEventListener('mouseenter', () => {
        if (!isMobile()) {
          closeAllMenus(nav);
          li.setAttribute('aria-expanded', 'true');
        }
      });

      li.addEventListener('mouseleave', () => {
        if (!isMobile()) {
          li.setAttribute('aria-expanded', 'false');
        }
      });

      const toggle = (e) => {
        if (isMobile()) {
          e.preventDefault();
          const expanded = li.getAttribute('aria-expanded') === 'true';
          closeAllMenus(nav);
          li.setAttribute('aria-expanded', String(!expanded));
        }
      };

      if (link) link.addEventListener('click', toggle);
    }
  });
}

function addKeyboardNavigation(header) {
  const nav = header.querySelector('.header-nav');

  header.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const searchOverlay = header.querySelector('.header-search-overlay');
      if (searchOverlay.getAttribute('aria-hidden') === 'false') {
        toggleSearch(header, false);
        header.querySelector('.header-search-btn').focus();
        return;
      }
      if (nav.classList.contains('header-nav-open')) {
        toggleMobileNav(header, false);
        header.querySelector('.header-hamburger').focus();
        return;
      }
      closeAllMenus(nav);
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const active = document.activeElement.closest('.header-nav-item');
      if (active && active.getAttribute('aria-haspopup') === 'true') {
        e.preventDefault();
        active.setAttribute('aria-expanded', 'true');
        const firstLink = active.querySelector('.header-megamenu a');
        if (firstLink) firstLink.focus();
      }
    }
  });
}

export default async function decorate(block) {
  const resp = await fetch('/nav.plain.html');
  if (!resp.ok) return;

  const html = await resp.text();
  const fragment = document.createElement('div');
  fragment.innerHTML = html;

  const sections = fragment.querySelectorAll(':scope > div');
  const logoSection = sections[0];
  const navSection = sections[1];
  const actionsSection = sections[2];

  // Hamburger (mobile)
  const hamburger = document.createElement('button');
  hamburger.className = 'header-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'header-nav');
  hamburger.innerHTML = '<span class="icon icon-hamburger"></span><span class="icon icon-close"></span>';
  hamburger.addEventListener('click', () => toggleMobileNav(block, undefined));

  // Nav
  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.id = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');
  if (navSection) {
    nav.innerHTML = navSection.innerHTML;
    decorateNavItems(nav);
  }

  // Logo (centered)
  const logo = document.createElement('div');
  logo.className = 'header-logo';
  if (logoSection) {
    const logoLink = logoSection.querySelector('a');
    if (logoLink) {
      logoLink.className = 'header-logo-link';
      logoLink.setAttribute('aria-label', 'USTA Home');
      logo.append(logoLink);
    }
  }

  // Actions (join + signin + search + account + cart)
  const actions = document.createElement('div');
  actions.className = 'header-actions';

  let joinBtn = null;
  let signinBtn = null;

  if (actionsSection) {
    const paragraphs = actionsSection.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const emLink = p.querySelector('em a');
      const strongLink = p.querySelector('strong a');
      const plainLink = p.querySelector('a');

      if (emLink) {
        joinBtn = document.createElement('a');
        joinBtn.className = 'header-join-btn';
        joinBtn.href = emLink.href;
        joinBtn.textContent = emLink.textContent.toUpperCase();
      } else if (strongLink) {
        signinBtn = document.createElement('button');
        signinBtn.className = 'header-signin-btn';
        signinBtn.textContent = strongLink.textContent.toUpperCase();
        signinBtn.addEventListener('click', () => { window.location.href = strongLink.href; });
      } else if (plainLink) {
        const text = plainLink.textContent.trim().toLowerCase();
        if (text === 'search') {
          const searchBtn = document.createElement('button');
          searchBtn.className = 'header-search-btn';
          searchBtn.setAttribute('aria-label', 'Open search');
          searchBtn.innerHTML = '<span class="icon icon-search"></span>';
          searchBtn.addEventListener('click', () => toggleSearch(block, undefined));
          actions.append(searchBtn);
        } else if (text === 'account') {
          const accountBtn = document.createElement('a');
          accountBtn.className = 'header-account-btn';
          accountBtn.setAttribute('aria-label', 'My account');
          accountBtn.href = plainLink.href;
          accountBtn.innerHTML = '<span class="icon icon-user"></span>';
          actions.append(accountBtn);
        } else if (text === 'cart') {
          const cartBtn = document.createElement('a');
          cartBtn.className = 'header-cart-btn';
          cartBtn.setAttribute('aria-label', 'Shopping cart');
          cartBtn.href = plainLink.href;
          cartBtn.innerHTML = '<span class="icon icon-cart"></span>';
          actions.append(cartBtn);
        }
      }
    });
  }

  // Insert join/signin before icon buttons
  const actionButtons = document.createElement('div');
  actionButtons.className = 'header-action-buttons';
  if (joinBtn) actionButtons.append(joinBtn);
  if (signinBtn) actionButtons.append(signinBtn);

  const actionIcons = document.createElement('div');
  actionIcons.className = 'header-action-icons';
  while (actions.firstChild) actionIcons.append(actions.firstChild);

  actions.append(actionButtons);
  actions.append(actionIcons);

  // Search overlay
  const searchOverlay = buildSearchOverlay();

  // Assemble: hamburger | nav | logo (centered) | actions
  const headerInner = document.createElement('div');
  headerInner.className = 'header-inner';
  headerInner.append(hamburger);
  headerInner.append(nav);
  headerInner.append(logo);
  headerInner.append(actions);

  block.textContent = '';
  block.append(headerInner);
  block.append(searchOverlay);

  decorateIcons(block);
  addKeyboardNavigation(block);

  document.addEventListener('click', (e) => {
    if (!block.contains(e.target)) {
      closeAllMenus(nav);
    }
  });

  const closeBtn = searchOverlay.querySelector('.header-search-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toggleSearch(block, false));

  window.addEventListener('resize', () => {
    if (!isMobile() && nav.classList.contains('header-nav-open')) {
      toggleMobileNav(block, false);
    }
  });
}
