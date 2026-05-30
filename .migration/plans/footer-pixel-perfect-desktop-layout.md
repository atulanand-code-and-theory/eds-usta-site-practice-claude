# Pixel-Perfect Footer Critique — USTA EDS vs Live Site

## Key Findings from Playwright Inspection

### Desktop (1440px) — Live Site Layout is THREE-COLUMN, not single-column

The live usta.com footer at desktop width uses:
- **Container**: `flex-direction: row; justify-content: space-between; padding: 35px 35px 0`
- **Left column** (`.usta-footer__content-navigation`): Logo on top, nav links below — `flex-direction: row` layout internally
  - Logo: `290px x 48px`, `margin-bottom: 35px`, left-aligned
  - Nav `<ul>`: CSS `column-count: 2`, each `<li>` is `inline-block`, `width: 258px`, `height: 40px`, `text-align: center`
- **Right column** (`.usta-footer__content-socials`): Social icons + USTA Apps — `flex-direction: column; align-items: flex-end`
  - Social icons: `justify-content: space-between`, icons `29.7px` square, `margin-left: 20px` on the `<ul>`
  - USTA APPS label: `font-size: 18px`, `font-weight: 900`, `text-align: right`
  - App icons: `gap: 20px 10px`, `flex-wrap: wrap`, `justify-content: end`, icons `57px` square
- **Bottom bar** (`.technical-details`): Below the row — `flex-direction: column; align-items: center; gap: 12px; margin-top: 40px`
  - Privacy badge: `68px x 70px`
  - Copyright: `16px`, white, centered

### Mobile (<768px) — Switches to single-column centered
- Container: `flex-direction: column; align-items: center`
- Nav `<ul>`: `column-count: auto` (single column), `<li>` full-width `text-align: center`
- Logo: `170px x 28px`, centered
- Social + Apps: centered

### Our Current EDS Implementation (PROBLEMS)
Our footer is always single-column centered at every breakpoint. This matches mobile but **completely mismatches the desktop layout**.

---

## Pixel-Level Differences (Desktop 1440px)

| Element | Live Site | Current EDS | Delta |
|---------|-----------|-------------|-------|
| **Container layout** | `flex-direction: row` | `flex-direction: column` | WRONG axis |
| **Container padding** | `35px 35px 0` | `35px 26px 40px` | Side padding wrong, bottom padding shouldn't be here |
| **Logo size** | `290px x 48px` | `height: 28px` | Too small (should be 48px tall) |
| **Logo alignment** | Left-aligned | Centered | Wrong alignment |
| **Logo margin-bottom** | `35px` | `20px` | 15px too small |
| **Nav font-family** | `"Graphik Semibold"` | inherits default | Missing semibold weight |
| **Nav font-weight** | `400` (Semibold font) | `400` (Regular font) | Font face mismatch |
| **Nav list layout** | `column-count: 2`, `li: inline-block 258px 40px` | single vertical list | WRONG layout |
| **Nav li text-align** | `center` | `center` | Matches |
| **Nav li height** | `40px` | variable (padding-based) | Should be fixed 40px |
| **Social section align** | `align-items: flex-end` (right) | `align-items: center` | Wrong alignment |
| **Social icons gap** | `space-between` in 204px container | `gap: 24px` | Different spacing model |
| **Social icon size** | `29.7px` | `30px` | ~0.3px off (negligible) |
| **USTA APPS font-weight** | `900` | inherits (400) | Missing bold weight |
| **USTA APPS text-align** | `right` | `center` | Wrong alignment |
| **App icons gap** | `20px 10px` with `flex-wrap: wrap` | `10px` no wrap | Row gap missing, no wrap |
| **App icons justify** | `justify-content: end` | `justify-content: center` | Wrong alignment |
| **Privacy badge gap from row** | `margin-top: 40px` | `margin-top: 40px` | Matches |
| **Copyright gap from badge** | `gap: 12px` | `margin-top: 12px` | Matches |

---

## Checklist

### Code Changes — footer.js
- [ ] Add a `.footer-top` wrapper div around logo, nav, and social sections (to enable the row layout at desktop)
- [ ] Keep the vertical sections (privacy, copyright) outside the top wrapper

### Code Changes — footer.css (Desktop ≥900px)
- [ ] Add desktop media query `@media (min-width: 900px)` for three-column row layout
- [ ] Desktop `.footer-content`: change padding to `35px 35px 0`
- [ ] Desktop `.footer-top`: `display: flex; justify-content: space-between`
- [ ] Desktop `.footer-logo`: left-aligned, `margin-bottom: 0`
- [ ] Desktop `.footer-logo img`: `height: 48px` (larger at desktop), `margin-bottom: 35px`
- [ ] Desktop `.footer-nav ul`: `column-count: 2`
- [ ] Desktop `.footer-nav li`: `display: inline-block; width: 258px; height: 40px; padding: 0`
- [ ] Desktop `.footer-nav a`: `font-family` add Graphik Semibold (or `font-weight: 600`)
- [ ] Desktop `.footer-social`: `align-items: flex-end` (right-aligned)
- [ ] Desktop social icons `<ul>`: `justify-content: space-between; max-width: 237px; margin-left: 20px`
- [ ] Desktop `.footer-social > p` (USTA APPS): `font-weight: 900; text-align: right`
- [ ] Desktop app icons `<ul>`: `gap: 20px 10px; flex-wrap: wrap; justify-content: end`

### Code Changes — footer.css (Mobile base / < 900px)
- [ ] Keep existing single-column centered layout as mobile-first base
- [ ] Verify nav link padding gives ~40px line height on mobile too
- [ ] Logo stays `28px` height (170px wide) at mobile — currently correct

### Code Changes — footer.css (Typography)
- [ ] Nav links: confirm `font-size: 14px`, add `line-height: 18px` to match live
- [ ] USTA APPS label: add `font-weight: 900`
- [ ] Copyright: `font-size: 16px`, `line-height: ~23px` — currently correct

### Code Changes — footer.css (Spacing fine-tuning)
- [ ] Remove bottom padding from `.footer-content` at desktop (live has `0`)
- [ ] `.footer-privacy + .footer-bottom` gap: use `12px` (via gap on a parent, or margin-top)
- [ ] Footer bottom area total: `margin-top: 40px` on privacy badge section

### Validation
- [ ] Preview at localhost:3000 — Desktop 1440px: verify three-column row layout
- [ ] Preview — compare side-by-side with live site desktop screenshot
- [ ] Preview at 768px tablet — check transitional layout
- [ ] Preview at 375px mobile — verify single-column centered (unchanged)
- [ ] Verify nav links render in 2-column grid at desktop
- [ ] Verify social icons right-aligned at desktop
- [ ] Verify USTA APPS label bold + right-aligned at desktop
- [ ] Run `npm run lint` — pass clean
- [ ] No console errors related to footer

---

## Implementation Approach

### footer.js Changes
Re-add the `.footer-top` wrapper that groups logo + nav + social into a row container:

```js
// Wrap logo, nav, and social in a top row for desktop layout
const topRow = document.createElement('div');
topRow.className = 'footer-top';
if (sections[0]) topRow.append(sections[0]); // logo
if (sections[1]) topRow.append(sections[1]); // nav
if (sections[2]) topRow.append(sections[2]); // social
footer.prepend(topRow);
```

### footer.css Strategy
Mobile-first single-column (current base is mostly correct), then add `@media (min-width: 900px)` for the desktop three-column row layout matching the exact computed values from the live site.

---

## Execution Status
This plan is ready for implementation. Switch to **Execute mode** to begin making CSS and JS changes.
