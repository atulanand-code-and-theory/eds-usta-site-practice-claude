/**
 * loads and decorates the columns block
 * @param {Element} block The columns block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      col.classList.add('columns-col');
      // detect image-only columns
      const pics = col.querySelectorAll('picture');
      const hasOnlyImages = pics.length > 0
        && col.childElementCount === pics.length;
      if (hasOnlyImages) {
        col.classList.add('columns-img-col');
      }
    });
  });
}
