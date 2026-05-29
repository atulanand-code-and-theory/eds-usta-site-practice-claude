/**
 * loads and decorates the promo-banner block
 * @param {Element} block The promo-banner block element
 */
export default function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    cells.forEach((cell) => {
      if (cell.querySelector('a')) {
        cell.classList.add('promo-banner-action');
      } else {
        cell.classList.add('promo-banner-content');
      }
    });
  });
}
