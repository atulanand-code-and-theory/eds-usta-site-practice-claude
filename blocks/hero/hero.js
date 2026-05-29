/**
 * loads and decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');
  if (rows.length === 0) return;

  const row = rows[0];
  const columns = row.querySelectorAll(':scope > div');

  if (columns.length >= 2) {
    columns[0].classList.add('hero-content');
    columns[1].classList.add('hero-image');
  } else if (columns.length === 1) {
    columns[0].classList.add('hero-content');
  }
}
