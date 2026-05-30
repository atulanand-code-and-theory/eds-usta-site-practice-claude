/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards variant.
 * Base block: cards
 * Source: https://www.usta.com/en/home/play.html
 * Selector: #aa-default-national_play_get_in_the_game
 * Generated: 2026-05-30
 *
 * Source structure: Grid of 4 card containers, each with:
 * - Icon image (.cmp-image__image)
 * - Heading (h5)
 * - Description paragraph (p)
 * - CTA button link (a.cmp-button)
 *
 * Target structure (standard EDS cards block):
 * Each row = one card with [image cell, content cell]
 * Content cell contains: heading, description, CTA link
 */
export default function parse(element, { document }) {
  // Each card is in a .container.responsivegrid.full-width direct child of the main grid
  const cardContainers = element.querySelectorAll(':scope > .aem-Grid > .container.responsivegrid.full-width');

  const cells = [];

  cardContainers.forEach((card) => {
    // Extract image
    const image = card.querySelector('.cmp-image__image, img');

    // Extract heading (h5 in source, could be other levels)
    const heading = card.querySelector('.cmp-text h5, .cmp-text h4, .cmp-text h3, .cmp-text h2');

    // Extract description paragraph (non-empty, not just &nbsp;)
    const paragraphs = Array.from(card.querySelectorAll('.cmp-text p'));
    const description = paragraphs.find((p) => p.textContent.trim() && p.textContent.trim() !== ' ');

    // Extract CTA button link
    const ctaLink = card.querySelector('a.cmp-button, a[class*="button"]');

    // Build image cell
    const imageCell = [];
    if (image) {
      imageCell.push(image);
    }

    // Build content cell: heading + description + CTA
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    if (description) {
      contentCell.push(description);
    }
    if (ctaLink) {
      // Create a clean link element with the button text
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.textContent.trim();
      contentCell.push(link);
    }

    // Only add row if we have meaningful content
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
