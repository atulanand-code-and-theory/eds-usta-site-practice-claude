/**
 * loads and decorates the news-cards block
 * @param {Element} block The news-cards block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('news-cards-card');
    const cols = [...row.children];

    // First cell: image
    if (cols[0]) {
      cols[0].classList.add('news-cards-image');
      const img = cols[0].querySelector('img');
      if (img) {
        img.loading = 'lazy';
      }
    }

    // Second cell: content (eyebrow, title, date, description, read more)
    if (cols[1]) {
      cols[1].classList.add('news-cards-content');
      const children = [...cols[1].children];

      children.forEach((child, index) => {
        if (index === 0) {
          child.classList.add('news-cards-eyebrow');
        } else if (index === 1) {
          child.classList.add('news-cards-title');
        } else if (index === 2) {
          child.classList.add('news-cards-date');
        } else if (index === 3) {
          child.classList.add('news-cards-description');
        } else if (index === 4) {
          child.classList.add('news-cards-readmore');
        }
      });
    }
  });
}
