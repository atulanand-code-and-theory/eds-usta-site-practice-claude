# USTA Footer Update Plan — Match Live Site

## Current State Summary

### Live Site Footer (usta.com) Layout
- **Background**: Pure black (`#000`)
- **Layout**: Single-column, center-aligned, stacked vertically
- **Sections (top to bottom)**:
  1. USTA Logo (white SVG, ~170px wide, centered)
  2. Nav links (12 links in a single vertical list, center-aligned, 14px white text, ~40px line height)
  3. Social icons (Facebook, Twitter/X, Instagram, YouTube — horizontally spaced, ~30px icons)
  4. "USTA APPS" label + 5 app icons (57px square, 10px gap, horizontally centered)
  5. OneTrust Privacy badge icon (~68px) + "© 2026 USTA ALL RIGHTS RESERVED" (16px, centered)
- **"Download USTA App" banner** sits above the footer (light gray `#f5f6f8` background, separate from footer block)
- **Max-width**: 1440px wrapper

### Current EDS Footer (local project) Layout
- **Background**: Dark (`#0c0c0c`)
- **Layout**: Three-column flex row (logo | nav columns | social/apps), with copyright below
- **Sections**:
  1. Logo (left), Nav links (two `<ul>` columns, center), Social+Apps (right-aligned)
  2. Copyright bar (centered, border-top separator, gray text)
- **Missing from live site**: OneTrust privacy badge, "Download USTA App" banner
- **Extra in current EDS**: Two-column nav layout, three-column top row

### Key Differences to Resolve
| Feature | Live Site | Current EDS |
|---------|-----------|-------------|
| Layout | Single column, centered | Three-column flex row |
| Background | Pure black `#000` | Dark `#0c0c0c` |
| Nav links | Single vertical list, 12 links | Two side-by-side lists |
| Nav text | 14px, uppercase, centered | 13px, mixed case, left-aligned |
| Social icons | Centered row, ~30px | Right-aligned, 22px |
| App icons | 57px, 10px gap, centered | 28px, 8px gap, right-aligned |
| Copyright | White, 16px, no border | Gray `#8c8c8c`, 12px, border-top |
| OneTrust badge | Present (68px icon) | Missing |
| "Download App" banner | Light gray section above footer | Not implemented |

---

## Checklist

### Content Changes (da.live document at `/footer`)
- [ ] Restructure nav links from two `<ul>` elements into a single `<ul>` with all 12 links
- [ ] Add OneTrust privacy badge image + link as new section (div) between social/apps and copyright
- [ ] Update copyright text from `© 2026 USTA. ALL RIGHTS RESERVED` to `© 2026 USTA ALL RIGHTS RESERVED` (remove period)
- [ ] Verify all 12 nav links match live site URLs and `target` attributes
- [ ] Add `rel="noopener"` to external links (Careers, Internships, USTA Connect Portal)

### Code Changes — footer.js
- [ ] Refactor section assignment: change from 4-section (logo/nav/social/bottom) three-column layout to a vertically stacked single-column layout
- [ ] Remove the `footer-top` flex wrapper (no longer needed for horizontal layout)
- [ ] Add new section class `footer-privacy` for OneTrust badge area
- [ ] Merge the two nav `<ul>` lists into a single flat list in DOM decoration (or handle both gracefully)
- [ ] Add `target="_blank"` and `rel="noopener"` to external links during decoration
- [ ] Keep `decorateIcons()` call for social SVG icons

### Code Changes — footer.css
- [ ] Change background from `#0c0c0c` to `#000000`
- [ ] Replace three-column flex layout with single-column centered layout
- [ ] Update logo: centered, `margin-bottom: 20px`, ~170px width
- [ ] Update nav links: single vertical list, `text-align: center`, `font-size: 14px`, `text-transform: uppercase`, white color, ~40px line spacing
- [ ] Update social icons: centered row, `width/height: 30px`, `gap` between icons
- [ ] Update app section: centered, "USTA APPS" label at `18px`, app icons at `57px` square with `10px` gap
- [ ] Add privacy badge styles: centered, `~68px` icon, `margin-top: 40px`
- [ ] Update copyright: white text, `16px`, no border-top, no gray color
- [ ] Update responsive styles to maintain centered column on all breakpoints (simpler than current)
- [ ] Remove `.footer-top` flex container styles entirely

### Optional Enhancement — "Download USTA App" Banner
- [ ] Decide: implement as a separate section/block above footer, or skip for now
- [ ] If implementing: create content in da.live as a new section with app store badge images
- [ ] Style with light gray background (`#f5f6f8`), centered layout

### Validation
- [ ] Preview at `localhost:3000` — verify vertical stacked layout
- [ ] Test at 1440px desktop width
- [ ] Test at 768px tablet width
- [ ] Test at 375px mobile width
- [ ] Verify all 12 nav links render and are clickable
- [ ] Verify social icons render (SVG via `decorateIcons`)
- [ ] Verify app icons render with correct images
- [ ] Verify OneTrust badge renders (if added)
- [ ] Verify no console errors
- [ ] Run `npm run lint` to check for style/JS issues
- [ ] Compare side-by-side with live site screenshot

---

## Implementation Notes

### footer.js Changes (Minimal)
The JS needs simplification — remove the three-column `footer-top` wrapper logic. The new structure should be:

```
.footer-content
  .footer-logo        (div 0 - logo image)
  .footer-nav         (div 1 - single list of all links)
  .footer-social      (div 2 - social icons + apps label + app icons)
  .footer-privacy     (div 3 - OneTrust badge, if content exists)
  .footer-bottom      (div 4 - copyright text)
```

### footer.css Approach
Complete rewrite of layout logic — from flex-row to flex-column with `align-items: center`. All sections centered. Typography updates for link size/weight/transform. Responsive breakpoints become simpler since layout is already mobile-friendly in single-column.

### Content Document Structure (target `footer.plain.html`)
```
Section 1 (div): Logo image
Section 2 (div): Single <ul> with 12 nav links
Section 3 (div): Social icon links + "USTA APPS" text + App icon links  
Section 4 (div): OneTrust badge image/link
Section 5 (div): Copyright text
```

---

## Constraints & Risks
- Do not hardcode content in JS — all text/links come from da.live document
- Keep `decorateIcons()` for SVG icon resolution
- Footer must progressively enhance (works without JS)
- The "Download USTA App" banner is a separate AEM component on the live site — may be better as its own block or section above the footer rather than part of the footer block itself
- External links (careers.usta.com, ustaconnect.usta.com, app store links) need `target="_blank" rel="noopener"`
- OneTrust badge image needs to be downloaded and added to project assets

---

## Execution Requires
This plan is ready for implementation. Switch to **Execute mode** to begin making changes.
