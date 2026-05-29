/**
 * loads and decorates the help-links block
 * @param {Element} block The help-links block element
 */
export default function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');
  rows.forEach((row) => {
    row.classList.add('help-links-item');
    const cells = row.querySelectorAll(':scope > div');
    cells.forEach((cell) => {
      if (cell.querySelector('img') || cell.querySelector('picture')) {
        cell.classList.add('help-links-icon');
      } else {
        cell.classList.add('help-links-content');
      }
    });
  });
}
