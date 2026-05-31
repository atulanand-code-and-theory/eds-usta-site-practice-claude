import {
  buildBlock,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  loadFooter,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    // Check if h1 or picture is already inside a hero block
    if (h1.closest('.hero') || picture.closest('.hero')) {
      return; // Don't create a duplicate hero block
    }
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Processes section-metadata blocks and applies key-value pairs to the parent section.
 * @param {Element} main The container element
 */
function decorateSectionMetadata(main) {
  main.querySelectorAll('.section-metadata').forEach((meta) => {
    const section = meta.closest('.section');
    if (!section) return;
    meta.querySelectorAll(':scope > div').forEach((row) => {
      const cols = row.querySelectorAll(':scope > div');
      if (cols.length < 2) return;
      const key = cols[0].textContent.trim().toLowerCase();
      const value = cols[1].textContent.trim();
      if (key === 'style') {
        value.split(',').forEach((v) => section.classList.add(v.trim()));
      } else {
        section.dataset[key] = value;
      }
    });
    const wrapper = meta.parentElement;
    if (wrapper && wrapper !== section) wrapper.remove();
    else meta.remove();
  });
  // Apply section backgrounds from .plain.html source (AEM CLI strips section-metadata server-side)
  const path = window.location.pathname.replace(/\/$/, '') || '/index';
  fetch(`${path}.plain.html`).then((resp) => resp.ok && resp.text()).then((html) => {
    if (!html) return;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const srcSections = doc.querySelectorAll(':scope > body > div');
    const domSections = [...main.querySelectorAll(':scope > .section')];
    // Account for auto-blocked hero section prepended by buildHeroBlock
    const offset = domSections.length - srcSections.length;
    srcSections.forEach((srcSection, i) => {
      const meta = srcSection.querySelector(':scope > .section-metadata');
      if (!meta) return;
      const target = domSections[i + offset];
      if (!target) return;
      meta.querySelectorAll(':scope > div').forEach((row) => {
        const cols = row.querySelectorAll(':scope > div');
        if (cols.length < 2) return;
        const key = cols[0].textContent.trim().toLowerCase();
        const value = cols[1].textContent.trim();
        if (key === 'style') {
          value.split(',').forEach((v) => target.classList.add(v.trim()));
        } else {
          target.dataset[key] = value;
        }
      });
    });
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateSectionMetadata(main);
  decorateBlocks(main);
  decorateButtons(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  let main = doc.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    while (document.body.firstChild) main.append(document.body.firstChild);
    document.body.prepend(main);
  }
  if (!main.querySelector(':scope > div')) {
    const children = [...main.childNodes];
    let currentDiv = document.createElement('div');
    main.textContent = '';
    children.forEach((node) => {
      if (node.nodeName === 'HR') {
        if (currentDiv.childNodes.length) main.append(currentDiv);
        currentDiv = document.createElement('div');
      } else {
        currentDiv.append(node);
      }
    });
    if (currentDiv.childNodes.length) main.append(currentDiv);
  }
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
