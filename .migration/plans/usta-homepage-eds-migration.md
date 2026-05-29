# USTA Homepage Migration Plan

## Objective
Migrate https://www.usta.com/en/home.html to AEM Edge Delivery Services, including full header/navigation, footer, all page blocks, content, and pixel-accurate styling.

## Current State
- Fresh AEM boilerplate project (no blocks, no content yet)
- Standard EDS structure in place: `scripts/`, `styles/`, `fonts/`
- No `blocks/` directory or `content/` directory exists yet
- Source: https://www.usta.com/en/home.html (USTA tennis organization homepage)

## Migration Phases

### Phase 1: Site Analysis & Page Scraping
- [ ] Scrape the USTA homepage to extract content, metadata, images, and cleaned HTML
- [ ] Analyze page structure — identify sections, blocks, and content sequences
- [ ] Identify all unique block types on the page (hero, cards, media, etc.)
- [ ] Document the navigation structure (desktop + mobile + megamenu)
- [ ] Document the footer structure

### Phase 2: Block Inventory & Development
- [ ] Survey available blocks from boilerplate and Block Collection for reuse
- [ ] Define block list needed for the homepage (e.g., hero, cards, columns, carousel, tabs, etc.)
- [ ] Create each custom block with JS decoration and CSS styling:
  - [ ] Hero block
  - [ ] Cards/tile blocks
  - [ ] Media/video blocks
  - [ ] Carousel/slider blocks
  - [ ] CTA/promo blocks
  - [ ] Any other identified blocks
- [ ] Ensure each block is responsive and accessible

### Phase 3: Navigation & Header Migration
- [ ] Analyze the USTA header (logo, main nav, megamenu, search, utility links)
- [ ] Create the header/nav block with desktop layout
- [ ] Implement mobile hamburger menu
- [ ] Implement megamenu dropdowns if present
- [ ] Style to match original site appearance

### Phase 4: Footer Migration
- [ ] Analyze the USTA footer (link columns, social icons, legal, sponsors)
- [ ] Create the footer block structure
- [ ] Style to match original site appearance

### Phase 5: Content Import & Generation
- [ ] Generate import infrastructure (parsers, transformers)
- [ ] Create structured HTML content for the homepage
- [ ] Create nav content (nav.html)
- [ ] Create footer content (footer.html)
- [ ] Ensure all images are properly referenced/optimized

### Phase 6: Design & Styling Migration
- [ ] Extract design tokens (colors, fonts, spacing, breakpoints) from USTA site
- [ ] Apply global styles (styles.css, lazy-styles.css, fonts.css)
- [ ] Style each block to match the original page pixel-perfectly
- [ ] Ensure responsive behavior matches across breakpoints (mobile/tablet/desktop)

### Phase 7: Visual Verification & QA
- [ ] Preview the migrated page in the local dev server
- [ ] Compare visually against the live USTA page
- [ ] Fix any CSS/layout discrepancies
- [ ] Validate accessibility (heading hierarchy, alt text, ARIA)
- [ ] Run linting (`npm run lint`)
- [ ] Verify responsive behavior at all breakpoints

## Approach & Tools
- Use **page-import** skill for structured content migration
- Use **excat:excat-navigation-orchestrator** for header/nav migration
- Use **excat:excat-footer-orchestrator** for footer migration
- Use **excat:excat-complete-design-expert** for design system/styling
- Use **excat:excat-page-critique** for visual verification
- Use **content-driven-development** for block development workflow

## Risks & Considerations
- USTA site may use dynamic/JS-rendered content that requires special handling
- Megamenu complexity may require multiple iterations
- Video/media embeds may need custom block logic
- Third-party integrations (ticketing, scores) will be represented as placeholder blocks

## Checklist Summary
- [ ] Phase 1: Site analysis complete
- [ ] Phase 2: All blocks created and functional
- [ ] Phase 3: Header/navigation working
- [ ] Phase 4: Footer working
- [ ] Phase 5: Content imported and rendering
- [ ] Phase 6: Design tokens and styling applied
- [ ] Phase 7: Visual QA passed, linting clean

---

*To begin execution, switch to Execute mode. The migration will proceed phase-by-phase using the specialized skills listed above.*
