# Hero Coaching Block — UI Mismatch Fix Plan

## Problem Summary

The `hero-coaching` block on the EDS page doesn't match the original usta.com hero. The key visual differences are:

| Aspect | Original (usta.com) | Current EDS |
|--------|---------------------|-------------|
| Layout | 50/50 split — solid black left panel + full-bleed image right | Image behind with no visible split (placeholder image) |
| Image | Real coaching photo on right half | Placeholder (`placehold.co`) — content HTML structure mismatch |
| Heading accent | "REGISTER" in yellow-green (`rgb(207,255,5)`) | All white text |
| Font | "Graphik XXCond Bold" | `roboto-condensed` (close but not identical) |
| Height | ~743px (desktop) | 400px min-height (500px at 900px+) |

## Root Causes

1. **Content HTML structure**: The `home.plain.html` has the picture + paragraph in a single cell (`<div>`). The `hero-coaching.js` expects **row 0** = logo/heading/cta cells + **row 1** = image row. Since the image doesn't land in row 1, the JS falls back to a placeholder.
2. **Block CSS served remotely**: The `hero-coaching` block (JS + CSS) is served from the DA content source (not in the local repo), so we need to create local overrides.
3. **No accent color markup**: The heading text has no `<span>` or formatting to highlight "REGISTER" differently.
4. **Missing "Graphik XXCond Bold" font**: The project uses `roboto-condensed` as the heading font.

## Proposed Fix

### Approach: Create local `hero-coaching` block files to override the remote ones

When the AEM CLI finds local block files, they take priority over remote ones.

## Checklist

- [ ] **Create `blocks/hero-coaching/` directory** with local `hero-coaching.js` and `hero-coaching.css`
- [ ] **Fix JS decoration logic** — handle the content structure where image + text are in one cell (the current DA content format), extract the picture from the first cell and place it in the image column
- [ ] **Fix CSS layout** — increase min-height to ~600px on desktop (matching original's ~743px), ensure proper 50/50 grid split
- [ ] **Add heading accent color** — style the first word (or first strong/em) in the heading with `color: rgb(207, 255, 5)` via JS decoration or CSS `:first-line` / `:first-word` approach (JS wrapping the first word in a `<span>` is most reliable)
- [ ] **Add "Graphik XXCond Bold" font** — source the font (or use the closest available weight of roboto-condensed-bold) and declare a CSS custom property for it
- [ ] **Update content HTML** (if needed) — restructure `home.plain.html` so the block parser can correctly separate the image from the text content
- [ ] **Verify in preview** — compare the rendered hero against the original site screenshot

## Technical Details

### Content structure (current `home.plain.html`):
```html
<div class="hero"><div><div>
  <picture>...</picture>
  <p>REGISTER TO BE FEATURED IN THE USTA COACHING SEARCH</p>
</div></div></div>
```

### Expected structure for proper rendering:
```
Row 1: [Logo cell] | [Heading cell] | [CTA cell]
Row 2: [Image cell]
```

### Key CSS values from original:
- Background: solid `#000` on left column
- Image: `background-size: cover` on right column
- H1: `font-size: 90px`, `line-height: 99px`, `font-weight: 500`, `color: #fff`
- "REGISTER" span: `color: rgb(207, 255, 5)`
- CTA: `background: rgb(207, 255, 5)`, `border-radius: 9999px`, `padding: 14px`, `font-size: 18px`
- Height: ~743px on desktop
- Logo: 174px wide SVG

### Font consideration:
The original uses "Graphik XXCond Bold" (a licensed font). The project already uses `roboto-condensed` which is visually similar as a condensed sans-serif. We should keep `roboto-condensed` but ensure it's applied with proper weight and sizing to approximate the original look.

## Risks & Considerations

- **Content HTML changes** require re-importing or manual edit of the DA content — this may need coordination
- **Font licensing**: Cannot use "Graphik XXCond Bold" without a license; `roboto-condensed` is an acceptable substitute
- **Remote block override**: Creating local files will fully override the remote versions; must include all functionality

---

*Execution requires exiting Plan mode.*
