# Delete Nav/Header Block Plan

## Summary

Remove all navigation/header-related code, content, and styles from the project. This includes the header block (JS + CSS), the nav content file, related migration plans, and references in global styles.

## Files to Delete

- [ ] `blocks/header/header.js` — Header block JavaScript
- [ ] `blocks/header/header.css` — Header block CSS
- [ ] `content/nav.plain.html` — Nav content file (authored navigation)
- [ ] `.migration/plans/fix-nav-footer-content-paths.md` — Migration plan referencing nav
- [ ] `.migration/plans/header-nav-pixel-perfect-critique.md` — Migration plan for header/nav styling

## Files to Modify

- [ ] `styles/styles.css` (lines 47–51) — Remove the `header` placeholder styles:
  ```css
  /* header placeholder */
  header {
    height: var(--nav-height);
    background-color: #f7f7f7;
  }
  ```
- [ ] `styles/brand.css` (line 37) — Remove `--nav-height: 72px;` CSS variable
- [ ] `scripts/scripts.js` (line 219) — Remove `loadHeader(doc.querySelector('header'));` call

## Files NOT Modified (by design)

- `scripts/aem.js` — Core library (NEVER MODIFY per AGENTS.md). Contains `loadHeader` function definition but this is upstream boilerplate code.
- `.claude/skills/snowflake/assets/substrate/blocks/header/` — Internal skill assets, not project code.

## Notes

- The `loadHeader` call in `scripts.js` loads the header block into the `<header>` element. Removing it means no header block will be loaded.
- The `--nav-height` variable is only used by the header placeholder style, so it's safe to remove.
- The `header .header` rule on line 53 of `styles.css` groups with footer — need to check if removing the header part leaves the footer rule intact.

## Checklist

- [ ] Delete `blocks/header/header.js`
- [ ] Delete `blocks/header/header.css`
- [ ] Delete `content/nav.plain.html`
- [ ] Delete `.migration/plans/fix-nav-footer-content-paths.md`
- [ ] Delete `.migration/plans/header-nav-pixel-perfect-critique.md`
- [ ] Remove header placeholder CSS from `styles/styles.css`
- [ ] Remove `--nav-height` variable from `styles/brand.css`
- [ ] Remove `loadHeader(...)` call from `scripts/scripts.js`
- [ ] Run `npm run lint` to verify no errors
- [ ] Verify dev server still works without header

---

*Execution requires exiting Plan mode.*
