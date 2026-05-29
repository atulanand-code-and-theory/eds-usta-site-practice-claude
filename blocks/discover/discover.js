import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Discover block: a strip of clickable photo tiles, each with a bold
 * label overlaid at the bottom. One tile per authored row (image + label link).
 * @param {Element} block The discover block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    const link = row.querySelector('a');
    const label = (link?.textContent || row.textContent || '').trim();

    // whole tile is a single link when one is authored, otherwise a plain tile
    const tile = document.createElement(link ? 'a' : 'div');
    tile.className = 'discover-tile';
    if (link) tile.href = link.href;

    if (picture) tile.append(picture);

    const labelEl = document.createElement('span');
    labelEl.className = 'discover-label';
    labelEl.textContent = label;
    tile.append(labelEl);

    const li = document.createElement('li');
    li.append(tile);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  block.replaceChildren(ul);
}
