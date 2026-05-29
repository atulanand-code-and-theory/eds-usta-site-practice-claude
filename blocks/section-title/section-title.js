/**
 * loads and decorates the section-title block
 * @param {Element} block The section-title block element
 */
export default function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');
  const wrapper = document.createElement('div');
  wrapper.classList.add('section-title-wrapper');

  rows.forEach((row) => {
    const cells = row.querySelectorAll(':scope > div');
    cells.forEach((cell) => {
      if (cell.querySelector('img') || cell.querySelector('picture')) {
        cell.classList.add('section-title-icon');
      } else {
        cell.classList.add('section-title-text');
      }
      wrapper.append(cell);
    });
    row.remove();
  });

  block.append(wrapper);
}
