# Fix Block Styling for USTA Play Page

## Problem
The migrated EDS page at `/en/home/play` has blocks rendering with styling that doesn't closely match the live site at `https://www.usta.com/en/home/play.html`. The block CSS needs to be refined for visual fidelity.

## Source Reference
- **Live site**: https://www.usta.com/en/home/play.html
- **Original screenshot**: `migration-work/screenshot.png`
- **Brand tokens**: `migration-work/brand.json`
- **Content file**: `content/en/home/play.plain.html` / `drafts/en/home/play.html`

## Blocks to Fix

### 1. Hero Block (`blocks/hero/hero.css`)
**Current issue**: The hero has a full-width background image with centered text overlay, but the styling may not match the source's exact proportions, padding, and text treatment.
**Source appearance**: Large full-bleed background photo of tennis players, centered white "Play Tennis" H1 in condensed bold, tagline "GET OUT AND PLAY." below, dark overlay on image.

### 2. Promo-Banner Block (`blocks/promo-banner/promo-banner.css`)
**Current issue**: Styled as a centered card but needs to match the source's lead generation form appearance more closely.
**Source appearance**: White card with border, centered tennis ball icon, "Game to feel the love?" heading, subtext, CTA button, and fine-print terms.

### 3. Cards Block (`blocks/cards/cards.css`)
**Current issue**: Icon grid layout with 4 columns may not match the source's exact spacing, icon sizes, and typography.
**Source appearance**: 4 items in a row, each with circular line-art icon (80-100px), bold heading, body text, and pill-shaped CTA button.

### 4. Columns Block (`blocks/columns/columns.css`)
**Current issue**: Image + text side-by-side may not match the source's exact proportions and the alternating layout (image-left/text-right vs text-left/image-right).
**Source appearance**: 50/50 split, large photo one side, heading + paragraph + CTA pill button on other side. Youth Tennis and Adult Tennis sections have green left border accent.

## Approach
1. Extract exact computed styles from the live site for each block using Playwright
2. Compare with current block CSS
3. Update CSS to match exact values (padding, font sizes, colors, gaps, border-radius, etc.)
4. Verify each block visually against the original screenshot

## Checklist

- [ ] Extract computed styles from live site hero section
- [ ] Update `blocks/hero/hero.css` to match (proportions, overlay, text sizing, spacing)
- [ ] Extract computed styles from live site promo-banner/lead-gen section
- [ ] Update `blocks/promo-banner/promo-banner.css` to match (card style, spacing, button)
- [ ] Extract computed styles from live site cards/icon-grid section
- [ ] Update `blocks/cards/cards.css` to match (icon size, grid gap, typography, buttons)
- [ ] Extract computed styles from live site columns sections
- [ ] Update `blocks/columns/columns.css` to match (proportions, text alignment, button style)
- [ ] Update `styles/styles.css` accent-left section style if needed
- [ ] Verify in local preview (compare visually with `migration-work/screenshot.png`)
- [ ] Run `npm run lint` to ensure no regressions

## Execution
This plan requires Execute mode to implement the CSS changes and verify visually.
