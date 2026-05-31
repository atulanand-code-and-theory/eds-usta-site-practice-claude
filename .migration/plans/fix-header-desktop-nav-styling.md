# Fix USTA Header Desktop Layout (Deployed aem.page)

## Problem Analysis

The deployed header at `https://main--eds-usta-site-practice-claude--atulanand-code-and-theory.aem.page/en/home` has critical visual issues on desktop:

1. **Nav links have no spacing** — items run together ("PlaySafe PlayProviders & FacilitiesAboutPro TennisNews")
2. **Links show blue (#0357b8)** instead of white on black — global `a:any-link { color: var(--color-link) }` overrides `.header .header-nav-link { color: #fff }`
3. **Header background shows white** — the black `#000` background isn't visually applying (possibly transparent/missing)
4. **No chevrons visible** — icon SVGs not rendering or filtered out
5. **Logo too small** relative to original

### Root Cause
The global stylesheet (`styles.css`) defines `a:any-link { color: var(--color-link) }` at the element level. The `:any-link` pseudo-class adds specificity (0,1,0) making the total (0,1,1). Meanwhile, `.header .header-nav-link` is (0,2,0) — it _should_ win, BUT if the `a:any-link` rule is being applied with a higher-specificity context or the CSS file load order differs on the deployed page, links revert to blue.

The likely actual issue: On the deployed `aem.page` environment, the `header.css` loads asynchronously after the global CSS and the DOM paints before styles arrive. The **real** problem visible in the screenshot is that the **header element itself appears unstyled** — white/transparent background, blue links, no gaps — as though `header.css` either failed to load or is being blocked/overridden.

Additionally, the original usta.com uses a **much larger** nav font (~16px Graphik XXCond Bold) and **wider spacing** between items than our current 13px with 12px padding.

---

## Checklist

### Fix 1: Specificity — Ensure header styles override global link color
- [ ] Change nav link selectors to use `header .header .header-nav-link` (3-class depth) or add `a:any-link` qualifier
- [ ] Add explicit `color: #fff` on `.header a:any-link` as a catch-all reset inside the header block
- [ ] Add explicit `text-decoration: none` reset for all header links

### Fix 2: Header background and height reliability
- [ ] Add `background-color: #000` to the `header` element itself (not just `.header`)
- [ ] Add `header .header` visibility pattern matching the footer pattern in styles.css
- [ ] Ensure `.header[data-block-status="loaded"]` reveals correctly (no competing display/visibility rules)

### Fix 3: Nav link layout — gaps and sizing (match original screenshot)
- [ ] Increase nav link font to **16px** Graphik XXCond Bold (original uses ~16-18px)
- [ ] Increase nav link horizontal padding to **20–24px** per item (currently 12px)
- [ ] Add explicit `gap` between nav items OR ensure padding creates sufficient spacing
- [ ] Increase header height to **90px** desktop (original bar measures ~90px including green border)

### Fix 4: Chevron rendering
- [ ] Verify chevron icon SVG loads correctly (check `decorateIcons` call timing)
- [ ] Add fallback: CSS triangle using `border` if SVG fails to load
- [ ] Increase chevron size to **10-12px** matching original's filled triangles

### Fix 5: Logo sizing
- [ ] Increase desktop logo height from 32px to **40px** (original logo is significantly larger)
- [ ] Verify `filter: brightness(0) invert(1)` produces clean white on black

### Fix 6: JOIN / SIGN IN buttons match original
- [ ] Increase JOIN button size: height **40px**, font **13px**, padding **0 24px** (original is larger)
- [ ] SIGN IN button same treatment: height 40px, font 13px
- [ ] Add 2px solid border on JOIN (original shows a clear pill outline)

### Fix 7: Overall layout match
- [ ] Verify layout is: `[nav items LEFT] — [logo CENTER] — [JOIN SIGN IN icons RIGHT]`
- [ ] Set explicit `flex` values to prevent items from collapsing at various widths
- [ ] Test at 1440px, 1280px, 1024px, and 900px to ensure nothing breaks

### Fix 8: Test & Deploy
- [ ] Run `npm run lint` and fix any issues
- [ ] Test on localhost:3000 at 1280px desktop
- [ ] Push to branch and verify on aem.page deployed URL
- [ ] Compare side-by-side with usta.com screenshot

---

## Key Comparison (Original vs. Current EDS)

| Property | Original (usta.com) | Current EDS (broken) | Fix Target |
|----------|--------------------|--------------------|-----------|
| Header BG | Black #000 | White/transparent | Black #000 |
| Nav font | ~16px Graphik XXCond Bold | 13px (too small) | 16px |
| Nav color | White #fff | Blue #0357b8 | White #fff |
| Nav spacing | ~24px between items | 0px (bunched) | 20-24px padding |
| Logo height | ~40px | ~32px (too small) | 40px |
| Bar height | ~90px | 80px | 90px |
| JOIN btn | ~40px tall, 13px font | 32px tall, 11px font | 40px, 13px |
| Chevrons | Filled black triangle ~12px | Not visible | 12px filled |

---

## Execution Note
This plan requires Execute mode to implement. Primary changes target `blocks/header/header.css` with specificity fixes and size increases.
