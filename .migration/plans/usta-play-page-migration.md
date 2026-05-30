# USTA Play Page Migration Plan

## Objective
Migrate `https://www.usta.com/en/home/play.html` to AEM Edge Delivery Services with pixel-level visual fidelity to the live site.

## Source
- **URL**: https://www.usta.com/en/home/play.html
- **Target path**: `/content/en/home/play.html`

## Existing Project Context
- **Brand tokens**: Already extracted in `migration-work/brand.json` (Graphik fonts, USTA green/black palette)
- **Existing blocks**: hero, cards, news-cards, logo-grid, section-title, promo-banner, help-links, columns, header, footer
- **Existing content**: Homepage already migrated at `content/en/home.html`

## Migration Workflow

### Phase 1: Page Scraping & Analysis
- [ ] Scrape the live page (HTML, metadata, images)
- [ ] Analyze page structure — identify sections, content sequences, and block candidates
- [ ] Map content sequences to existing blocks or identify new blocks needed
- [ ] Document authoring decisions (default content vs blocks, section styling)

### Phase 2: Block Development (if needed)
- [ ] Identify any new block types not already in the project
- [ ] Develop new block JS/CSS following EDS conventions
- [ ] Ensure new blocks handle the content model from this page

### Phase 3: Content Import
- [ ] Generate structured HTML matching EDS authoring format
- [ ] Place content file at correct path (`content/en/home/play.html`)
- [ ] Verify content renders in local dev server

### Phase 4: Design & Visual Fidelity
- [ ] Extract computed styles from the live site for each block/section
- [ ] Apply CSS styling to match the original page layout, typography, colors, spacing
- [ ] Iterate on block-level and page-level styling until visually matching
- [ ] Verify responsive behavior (mobile/tablet/desktop)

### Phase 5: Validation & QA
- [ ] Compare migrated page against live site visually
- [ ] Check accessibility (heading hierarchy, alt text, ARIA)
- [ ] Run linting (`npm run lint`)
- [ ] Verify in local preview server

## Key Considerations
- Reuse existing blocks where possible (hero, cards, section-title, etc.)
- New blocks follow the same naming conventions and file structure
- All styling scoped to block selectors per project guidelines
- Mobile-first CSS with min-width breakpoints at 600px/900px/1200px
- No external dependencies — vanilla JS/CSS only

## Execution
This plan requires exiting Plan mode to execute. The `excat:excat-site-migration` skill will orchestrate the end-to-end workflow, coordinating page analysis, block mapping, content import, and design migration.

## Checklist Summary
- [ ] Scrape page content and assets
- [ ] Analyze page structure and identify blocks
- [ ] Map blocks to existing or new block types
- [ ] Develop any new blocks required
- [ ] Generate and import structured HTML content
- [ ] Apply visual styling (CSS) to match live site
- [ ] Validate rendering in local preview
- [ ] Run lint and accessibility checks
- [ ] Final visual comparison against live site
