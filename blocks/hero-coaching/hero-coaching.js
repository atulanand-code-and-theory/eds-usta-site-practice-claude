export default function decorate(block) {
  const rows = [...block.children];
  const textRow = rows[0];
  const imageRow = rows[1];

  const textCol = document.createElement('div');
  textCol.className = 'hero-coaching-text';

  if (textRow) {
    const cells = [...textRow.children];
    if (cells[0]) {
      cells[0].className = 'hero-coaching-logo';
      textCol.append(cells[0]);
    }
    if (cells[1]) {
      cells[1].className = 'hero-coaching-heading';
      const h1 = cells[1].querySelector('h1');
      if (h1) {
        const text = h1.textContent;
        const firstSpace = text.indexOf(' ');
        if (firstSpace > 0) {
          const firstWord = text.substring(0, firstSpace);
          const rest = text.substring(firstSpace);
          h1.innerHTML = `<span class="accent">${firstWord}</span>${rest}`;
        }
      }
      textCol.append(cells[1]);
    }
    if (cells[2]) {
      cells[2].className = 'hero-coaching-cta';
      textCol.append(cells[2]);
    }
  }

  const imageCol = document.createElement('div');
  imageCol.className = 'hero-coaching-image';

  if (imageRow) {
    const pic = imageRow.querySelector('picture');
    if (pic) {
      imageCol.append(pic);
    }
  }

  block.replaceChildren(textCol, imageCol);
}
