# Pixel-Perfect Styling: USTA Play Page

## Objective
Compare the live site (`https://www.usta.com/en/home/play.html`) against the local EDS preview and iteratively fix CSS until the migrated page is pixel-perfect.

## Current State
- Content is migrated at `drafts/en/home/play.html` (local preview via `--html-folder drafts`)
- Block CSS was updated based on computed styles extraction, but the local preview has rendering issues (EDS framework not decorating properly due to missing `<main>` wrapper in `--html-folder` mode)
- A fix was applied to `scripts.js` to auto-wrap body content in `<main>` when missing
- All blocks (hero, promo-banner, cards, columns) have updated CSS

## Approach
1. Get the local preview rendering correctly (fix the `<main>` wrapper / dev server issue)
2. Take screenshots of both pages side by side
3. Identify pixel-level differences per block
4. Fix CSS iteratively (up to 3 passes)
5. Verify final result

## Key Style Corrections Already Made (from live site extraction)
- All CTA buttons: black background (#000), white text (#fff), 9999px radius, 18px Graphik Semibold
- Hero H1: 100px, font-weight 500, no text-transform, tagline 34px regular
- Promo-banner title: 56px Graphik XXCond Bold
- Cards icons: 78px, headings 22px Graphik Semibold
- Columns H2: 76px on desktop, body text 18px
- Accent-left sections: 10px solid green left border

## Checklist

- [ ] Verify local dev server renders the play page with full EDS decoration (sections, blocks)
- [ ] Take full-page screenshot of local preview
- [ ] Take full-page screenshot of live usta.com/en/home/play.html
- [ ] Compare hero section — fix any differences in height, overlay, font sizing, spacing
- [ ] Compare promo-banner section — fix card appearance, button, typography
- [ ] Compare cards section — fix icon sizing, grid layout, button positioning, section heading
- [ ] Compare columns sections — fix image/text proportions, heading size, button placement
- [ ] Compare accent-left border on Youth Tennis and Adult Tennis sections
- [ ] Fix any global spacing/padding differences between sections
- [ ] Final full-page comparison screenshot
- [ ] Run `npm run lint` to confirm no regressions

## Files to Modify
- `blocks/hero/hero.css`
- `blocks/promo-banner/promo-banner.css`
- `blocks/cards/cards.css`
- `blocks/columns/columns.css`
- `styles/styles.css` (section spacing, accent-left)
- `scripts/scripts.js` (if main-wrapper fix needs adjustment)
- `drafts/en/home/play.html` (if content structure needs tweaking for proper decoration)

## Execution
This plan requires Execute mode to take screenshots, compare visually, and make iterative CSS fixes.
