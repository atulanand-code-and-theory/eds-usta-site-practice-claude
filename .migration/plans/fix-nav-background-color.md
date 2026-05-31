# Fix USTA Header — Correct Color Scheme (White Background, Black Text)

## Critical Finding

The live usta.com navigation bar uses a **WHITE background with BLACK text** — NOT black background with white text. Our current EDS implementation has the colors completely inverted.

### Live Site Computed Styles (from Playwright inspection)
| Element | Background | Text Color | Height |
|---------|-----------|------------|--------|
| Top utility bar | `rgb(146, 191, 183)` (teal/mint) | Black | 64px |
| Promo banner | White/light | Black | ~40px |
| Main nav bar | `rgb(255, 255, 255)` (white) | `rgb(0, 0, 0)` (black) | 110px |
| Nav link font | — | Black, "Graphik Semibold", 16px, letter-spacing 0.8px, uppercase | — |
| JOIN button | White bg, black border | Black text | ~40px |
| SIGN IN button | Black bg | White text | ~40px |

### Current EDS (Wrong)
- Header background: BLACK `#000`
- Nav link color: WHITE `#fff`
- Logo filter: inverted to white
- JOIN button: white outline on black
- SIGN IN button: white fill on black

---

## Checklist

### Fix 1: Main nav bar — white background, black text
- [ ] Change `.header` background from `#000` to `#fff`
- [ ] Change `header` element background from `#000` to `#fff`
- [ ] Change nav link color from `#fff` to `#000`
- [ ] Change `.header a:any-link` color from `#fff` to `#000`
- [ ] Remove `filter: brightness(0) invert(1)` from logo (logo is already black, shows correctly on white)
- [ ] Remove filter from chevron icons (they are black fill, correct on white bg)
- [ ] Remove filter from hamburger/close icons for mobile (make them black)

### Fix 2: Buttons — match original styling
- [ ] JOIN button: black border, transparent fill, black text (currently white border)
- [ ] SIGN IN button: black fill, white text (currently white fill, black text — needs inversion)
- [ ] Keep pill shape and sizing

### Fix 3: Action icons (search, account, cart) — black on white
- [ ] Remove `filter: brightness(0) invert(1)` from action icon `.icon` elements
- [ ] Icons are already black SVGs — they display correctly on white without filter

### Fix 4: Mobile drawer — keep dark for contrast (original uses dark mobile drawer)
- [ ] Keep mobile drawer background as `#000` (only the main bar changes to white)
- [ ] Keep mobile nav links white on dark drawer
- [ ] The hamburger icon needs to be black (on white header bar) but X close still white (on dark drawer when open)

### Fix 5: Mega-menu — already white, verify it still works
- [ ] Desktop mega-menu is already white — should remain correct
- [ ] Verify text colors in mega-menu remain dark

### Fix 6: Active/hover state
- [ ] Keep green bottom border (`#cfff05`) on hover — it stands out on white background too (matches original)
- [ ] Verify hover state contrast on white background

### Fix 7: Test and lint
- [ ] Run `npm run lint` and fix issues
- [ ] Test at 1280px desktop — verify white bg, black text, correct buttons
- [ ] Test mobile — verify dark drawer still works
- [ ] Visual comparison screenshot against usta.com

---

## Execution Note
This plan requires Execute mode to implement. The fix is primarily a color inversion in `blocks/header/header.css` — changing background white, text black, removing SVG filters.
