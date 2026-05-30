# USTA Homepage EDS UI Improvement Plan

## Summary of Analysis

I compared the **live USTA site** (usta.com/en/home.html) against the **EDS migration** (aem.page/en/home) at both mobile and desktop viewports. The EDS page has all key sections migrated but needs visual polish to better match the original design.

## Key Visual Gaps Identified

| Section | Live Site | EDS Current | Gap |
|---------|-----------|-------------|-----|
| Wheelchair Tennis (Columns) | Image fills right half, text+CTA on left | Image appears below text with excessive whitespace above | Missing background treatment, image not filling half |
| National Tennis Month (Columns) | Teal/blue-green background, side-by-side | Renders with no background color | Missing section `data-background` |
| Local Park (Columns) | Dark green background (#19462e), white text | White background, dark text | Missing dark-green background style |
| Membership Benefits | Centered layout, green CTA, logos inline | Logos in grid block, layout is acceptable | Button alignment, spacing refinements needed |
| Promo Banner (USTA Coaching) | Small, simple card with "Start Now" CTA | Very plain, minimal styling | Needs border/container treatment |
| Safe Play Cards | Image + text rows, side-by-side cards | Stacked list items, basic styling | Cards need horizontal image+text layout |
| Section Spacing | Tight, content-dense layout | Excessive whitespace between sections | Reduce section padding for full-bleed blocks |
| Help Links | Card-style grid with icons + text + CTA links | Grid present but could match icon sizing better | Minor refinements |

## Checklist

### High-Impact Layout Fixes
- [ ] **Fix Columns block whitespace** — Remove excessive vertical gap between hero and first columns section; ensure image column fills available space without blank areas
- [ ] **Add section background colors** — Apply `data-background="dark-green"` to Local Park section and appropriate background to National Tennis Month section (teal/blue)
- [ ] **Fix Wheelchair Tennis columns** — Ensure right-side image fills the column completely (it currently has large whitespace)
- [ ] **Columns text color on dark backgrounds** — Ensure headings and body text are white when on dark-green or dark backgrounds

### Block-Level CSS Improvements
- [ ] **Columns block** — Add `min-height: 500px` for desktop to match live site's tall sections; ensure image covers full height
- [ ] **Promo Banner** — Add subtle border or background card style; improve vertical rhythm between text and CTA
- [ ] **Safe Play cards (Cards block)** — Switch from vertical icon-centered cards to horizontal image+text layout matching the live site's side-by-side presentation
- [ ] **Section Title** — Reduce line thickness from 2px to 1px, adjust spacing to be tighter like live site
- [ ] **Logo Grid** — Increase logo sizing slightly to match the live site's more prominent brand logos

### Button & Typography Polish
- [ ] **CTA buttons on dark sections** — Ensure neon green (`#cfff05`) buttons appear on dark-green and dark backgrounds (already partially done)
- [ ] **"Explore" button style** — Match the live site's outlined/pill black button for the Wheelchair Tennis CTA
- [ ] **Heading sizes in Columns** — Desktop h2 in columns may be too large (76px); verify against live site sizing (~50-60px)

### Spacing & Rhythm
- [ ] **Reduce section padding** — Current `48px/56px` vertical padding creates too much space between full-bleed blocks; reduce to `32px/40px` or remove for adjacent columns sections
- [ ] **Remove gap between consecutive full-bleed sections** — Hero → Columns → Columns should stack without gaps
- [ ] **News cards section** — Add top border or separator above section for visual break (matching live site)

### Nice-to-Have Enhancements
- [ ] **Add hover effects on news cards** — Already implemented (shadow + lift), verify working
- [ ] **Footer social icons** — Verify they render as proper SVG icons, not text
- [ ] **Header nav** — Expand mega-menu links to match live site's full navigation structure

---

## Execution Approach

Implementation should use the **content-driven-development** workflow:
1. Start the local dev server
2. Make CSS changes block-by-block
3. Verify each change in the local preview
4. Address high-impact layout fixes first (section backgrounds, columns spacing)
5. Then refine block-level CSS (cards, promo-banner, section-title)
6. Finally handle button/typography polish

> **Note:** Execution requires exiting Plan mode. Ready to proceed when approved.
