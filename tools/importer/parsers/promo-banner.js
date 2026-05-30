/* eslint-disable */
/* global WebImporter */

/**
 * Parser for promo-banner
 * Base block: promo-banner
 * Source selector: .leadgeneration
 * Description: Promotional content with heading, subtext, and CTA.
 * Generated: 2026-05-30
 * Validated selectors from cached source.html
 */
export default function parse(element, { document }) {
  // Extract icon/image
  const image = element.querySelector('.v-lead-generation-form__icon, .v-lead-generation-form img, img');

  // Extract heading (h4 in source, but allow fallbacks)
  const heading = element.querySelector('.v-lead-generation-form__title, h4, h3, h2, h1');

  // Extract description/subtext
  const descriptionContainer = element.querySelector('.v-lead-generation-form__cta-text, .v-lead-generation-form p');
  const description = descriptionContainer || element.querySelector('p');

  // Extract CTA button text - convert to a link element for proper block rendering
  const ctaButton = element.querySelector('.subscribe-button, .button-primary-style, button');
  let ctaLink = null;
  if (ctaButton) {
    ctaLink = document.createElement('a');
    ctaLink.href = '#';
    ctaLink.textContent = ctaButton.textContent.replace(/^\*\s*/, '').trim();
    // Style as strong to indicate primary CTA
    const strong = document.createElement('strong');
    strong.appendChild(ctaLink);
    ctaLink = strong;
  }

  // Extract terms/disclaimer text
  const terms = element.querySelector('.v-lead-generation-form__terms-description, .terms-description');

  // Build cells array matching promo-banner structure:
  // Row 1: Image (optional)
  // Row 2: Single cell with heading + description + CTA + terms stacked
  const cells = [];

  // Image row (optional) - single cell
  if (image) {
    cells.push([[image]]);
  }

  // Content row: single cell containing heading, description, CTA, terms stacked vertically
  const contentElements = [];
  if (heading) contentElements.push(heading);
  if (description) contentElements.push(description);
  if (ctaLink) contentElements.push(ctaLink);
  if (terms) contentElements.push(terms);
  if (contentElements.length > 0) {
    cells.push([contentElements]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'promo-banner', cells });
  element.replaceWith(block);
}
