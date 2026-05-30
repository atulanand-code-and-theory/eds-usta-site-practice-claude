/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns variant.
 * Base block: columns
 * Source: https://www.usta.com/en/home/play.html
 * Selectors: #container-9fd5c29185, #container-36d8db448f, #container-cf58c1a9d4, #container-f498b06250
 * Generated: 2026-05-30
 *
 * Extracts a two-column layout with image on one side and text/CTA content on the other.
 * The source uses AEM responsive grid columns (aem-GridColumn--default--6) to create
 * side-by-side layout. Each column container is extracted as a cell in one row.
 */
export default function parse(element, { document }) {
  // The element is a cmp-container div containing a grid with column children
  // Find the top-level grid container
  const grid = element.querySelector(':scope > .aem-Grid') || element;

  // Get the two column containers (direct children with responsivegrid class)
  const columnContainers = Array.from(
    grid.querySelectorAll(':scope > .container.responsivegrid')
  );

  // Build content for each column
  const cells = [];
  const row = [];

  columnContainers.forEach((col) => {
    const cellContent = [];

    // Extract images from this column
    const images = Array.from(col.querySelectorAll('img'));
    images.forEach((img) => cellContent.push(img));

    // Extract headings from this column
    const headings = Array.from(col.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    headings.forEach((h) => cellContent.push(h));

    // Extract paragraphs (skip empty/whitespace-only ones)
    const paragraphs = Array.from(col.querySelectorAll('.cmp-text p'));
    paragraphs.forEach((p) => {
      const text = p.textContent.trim().replace(/ /g, '');
      if (text.length > 0) {
        cellContent.push(p);
      }
    });

    // Extract CTA buttons/links
    const buttons = Array.from(col.querySelectorAll('a.cmp-button, a.button-core'));
    buttons.forEach((btn) => cellContent.push(btn));

    // If no structured content found, use the column element itself as fallback
    if (cellContent.length > 0) {
      row.push(cellContent);
    } else {
      row.push([col]);
    }
  });

  // If we found columns, use them; otherwise treat whole element as single column
  if (row.length > 0) {
    cells.push(row);
  } else {
    cells.push([[element]]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
