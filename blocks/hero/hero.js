/**
 * Hero block.
 * Splits the block into a background image layer and an overlaid content
 * layer (heading + copy + CTA). Works both for the auto-blocked hero
 * (picture + h1) and an explicitly authored hero (picture + heading + CTA).
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const imageLayer = document.createElement('div');
  imageLayer.className = 'hero-image';
  const content = document.createElement('div');
  content.className = 'hero-content';

  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    [...cell.children].forEach((el) => {
      const picture = el.tagName === 'PICTURE' ? el : el.querySelector(':scope > picture');
      // a picture-only element becomes the background; everything else is content
      if (picture && el.textContent.trim() === '') {
        imageLayer.append(picture);
      } else {
        content.append(el);
      }
    });
  });

  block.textContent = '';
  if (imageLayer.children.length) block.append(imageLayer);
  block.append(content);
}
