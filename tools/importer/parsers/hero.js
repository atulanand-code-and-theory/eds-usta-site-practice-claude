/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero variant.
 * Base block: hero
 * Source: https://www.usta.com/en/home/play.html
 * Selector: #container-1b53a43ea8
 * Description: Full-width background image with centered heading and tagline overlay.
 * Generated: 2026-05-30
 */
export default function parse(element, { document }) {
  // Extract background image
  // Source has: <img src="./images/9b37bb70253b16ccf53e664679bf8a34.jpg"> as direct child of .cmp-container
  const bgImage = element.querySelector('img');

  // Extract heading (h1 in source, fallback to h2/h3)
  const heading = element.querySelector('h1, h2, h3, [class*="title"]');

  // Extract tagline/description text
  // Source has: <p><b>GET OUT AND PLAY.</b></p> inside .cmp-text
  const cmpText = element.querySelector('.cmp-text, [id^="text-"]');
  const descriptionParagraphs = cmpText
    ? Array.from(cmpText.querySelectorAll('p')).filter((p) => {
      const text = p.textContent.replace(/\s+/g, '').trim();
      return text.length > 0;
    })
    : [];

  // Build cells array matching hero block structure:
  // Row 1: background image
  // Row 2: heading + tagline/description content
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content overlay (heading + description)
  const contentCell = [];
  if (heading) {
    contentCell.push(heading);
  }
  if (descriptionParagraphs.length > 0) {
    contentCell.push(...descriptionParagraphs);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
