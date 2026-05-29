/**
 * loads and decorates the logo-grid block
 * @param {Element} block The logo-grid block element
 */
export default function decorate(block) {
  const cells = block.querySelectorAll(':scope > div > div');
  cells.forEach((cell) => {
    cell.classList.add('logo-grid-item');
    const img = cell.querySelector('img');
    if (img) {
      img.loading = 'lazy';
    }
  });
}
