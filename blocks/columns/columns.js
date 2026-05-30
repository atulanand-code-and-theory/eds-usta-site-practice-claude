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
      const pics = col.querySelectorAll('picture');
      const imgs = col.querySelectorAll('img');
      const hasOnlyImages = (pics.length > 0 && col.childElementCount === pics.length)
        || (imgs.length > 0 && col.childElementCount === 1
          && col.children[0].tagName === 'P'
          && col.children[0].querySelector('img')
          && !col.children[0].textContent.trim().replace(/\s/g, ''));
      if (hasOnlyImages) {
        col.classList.add('columns-img-col');
      }
    });
  });
}
