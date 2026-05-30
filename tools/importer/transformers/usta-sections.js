/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: USTA section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for styled sections.
 * All selectors verified against captured DOM of https://www.usta.com/en/home/play.html
 * Site: usta.com
 *
 * Sections from page-templates.json:
 * 1. Hero Section - #container-1b53a43ea8 (no style)
 * 2. Lead Generation - .leadgeneration (no style)
 * 3. Get in The Tennis Game - #aa-default-national_play_get_in_the_game (no style)
 * 4. Tennis for All - #container-9fd5c29185 (no style)
 * 5. Youth Tennis - #container-36d8db448f (style: accent-left)
 * 6. College Tennis - #container-cf58c1a9d4 (no style)
 * 7. Adult Tennis - #container-f498b06250 (style: accent-left)
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };

    // Process sections in reverse order to avoid shifting DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before each section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
