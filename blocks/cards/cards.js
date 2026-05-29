/**
 * loads and decorates the cards block
 * @param {Element} block The cards block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-card';

    // Move children from row into card
    while (row.firstElementChild) {
      const div = row.firstElementChild;

      // Check if this cell contains an image
      if (div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';

        // Style heading if present
        const heading = div.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          heading.classList.add('cards-card-title');
        }

        // Style paragraphs as description
        div.querySelectorAll('p').forEach((p) => {
          if (!p.querySelector('a') && !p.querySelector('picture')) {
            p.classList.add('cards-card-description');
          }
        });
      }

      li.append(div);
    }

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
