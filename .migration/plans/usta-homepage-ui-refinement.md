# USTA Homepage UI Improvement Plan

## Objective
Improve the visual design of the AEM EDS page at `main--eds-usta-site-practice-claude--atulanand-code-and-theory.aem.page/en/home` to match the quality and styling of the original USTA site at `usta.com/en/home.html`.

## Current State Assessment
The EDS page has 10 blocks (hero, columns, section-title, logo-grid, promo-banner, cards, news-cards, help-links, header, footer) with basic CSS. Comparing to the original USTA site, the following gaps are identified:

### Key Visual Differences

| Block | Current EDS | Original USTA |
|-------|------------|---------------|
| **Hero** | Simple black bg + text left / image right | Dark background with green accent line separator, bold typography, more padding |
| **Columns (Wheelchair Tennis)** | Plain text/image side-by-side, no background | Dark navy/charcoal background, white text, green CTA button, more visual weight |
| **Columns (National Tennis Month)** | Plain layout | Full-bleed image on left, text overlay feel, more dramatic |
| **Columns (Local Park)** | Basic layout | Card-style with green CTA, image emphasis, rounded corners |
| **Section Titles** | Thin horizontal line + icon + text | Bolder separator lines, larger icon, more spacing |
| **Membership/Logo Grid** | Grayscale logos, basic text | Clean white section, colored logos, "Get Started" green button |
| **Promo Banner** | Dark gray bar with border button | Darker background, stronger visual hierarchy |
| **Cards (Safe Play)** | White card with hover shadow | Larger cards, image-heavy, descriptive text below |
| **News Cards** | Small cards in 4-col grid | Larger article cards with prominent images, category tags, dates |
| **Help Links** | Icon + text rows | Card-style items with green accent, better spacing, CTA buttons |
| **Global** | max-width constrained `main`, basic spacing | Full-width sections with contained content, more vertical rhythm |

---

## Checklist

### Phase 1: Global Styles & Layout
- [ ] Update `styles/styles.css` — make `main` full-width for hero/promo-banner sections, increase section vertical spacing, refine typography scale
- [ ] Add USTA green accent line/divider utility class
- [ ] Improve global button styles (green filled primary, outlined secondary)

### Phase 2: Hero Block
- [ ] Update `hero.css` — add green accent separator line between logo and heading, increase padding, refine font sizing for impact
- [ ] Ensure full-width hero (breaks out of max-width container)

### Phase 3: Columns Block (3 instances on page)
- [ ] Update `columns.css` — add dark background variant for "50 Years of Wheelchair Tennis" section
- [ ] Add full-bleed image support for "National Tennis Month" section
- [ ] Improve CTA button styling in columns (green filled with uppercase text)
- [ ] Add rounded corner/card variant for "Local Park" section
- [ ] Ensure columns break out of max-width for full-width visual sections

### Phase 4: Section Title Block
- [ ] Update `section-title.css` — increase icon size, add decorative lines on both sides, center alignment, bolder typography

### Phase 5: Membership & Logo Grid
- [ ] Update `logo-grid.css` — remove grayscale filter, show colored logos, increase logo size
- [ ] Style the membership description text and "Get Started" button to match original (green filled button)

### Phase 6: Promo Banner
- [ ] Update `promo-banner.css` — darker background, improve typography hierarchy (smaller label, larger title), green CTA button style

### Phase 7: Cards Block (Safe Play)
- [ ] Update `cards.css` — larger card images, better text spacing, "Learn More" link styling in green

### Phase 8: News Cards Block
- [ ] Update `news-cards.css` — improve card sizing, category badge styling, date formatting, "Read More" links, "SEE ALL NEWS" button styling

### Phase 9: Help Links Block
- [ ] Update `help-links.css` — add card-style borders/backgrounds, green accent for icons, better grid layout (2x3), CTA button styling

### Phase 10: Full-Width Section Support
- [ ] Update section styles — hero, wheelchair tennis columns, national tennis month, and promo-banner should render full-width (edge-to-edge)
- [ ] Add `data-background` variants or CSS overrides for dark sections

### Phase 11: Visual QA & Iteration
- [ ] Preview all blocks on local dev server and compare with original
- [ ] Fix any spacing, color, or layout discrepancies
- [ ] Run lint to ensure CSS passes stylelint checks

---

## Approach
This will use the **content-driven-development** workflow — making CSS/JS changes to block files, verifying against the local preview, and iterating. No content HTML changes are needed; all improvements are in the block CSS and global styles.

## Execution
Execution requires switching out of Plan mode. The work will be done using the `excat:excat-complete-design-expert` skill for systematic design migration, or manual CSS updates block-by-block with preview verification.
