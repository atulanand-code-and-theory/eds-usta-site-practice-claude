# USTA Navigation Pixel-Perfect Design Plan

## Objective
Make the EDS header/navigation visually identical to https://www.usta.com/en/home.html by comparing the deployed version at the aem.page URL against the original source structure.

---

## Source Analysis (from scraped `import-work/cleaned.html`)

### Original Layout Structure (Desktop)
```
┌─────────────────────────────────────────────────────────────────┐
│ [Utility Bar] USTA Sites ▼ | USTA Sections ▼ | 📍 | 🔍 | 🌐 │  ← ~36px, dark gray #1a1a1a
├─────────────────────────────────────────────────────────────────┤
│ [Banner] New! Lost your account? Find your account!   [×]      │  ← ~40px, dismissible
├─────────────────────────────────────────────────────────────────┤
│ ☰ PLAY  SAFE PLAY  PROVIDERS...  ABOUT  PRO TENNIS  NEWS      │
│                    [USTA LOGO]           JOIN  SIGN IN  👤  🛒  │  ← ~80px main bar
└─────────────────────────────────────────────────────────────────┘
```

### Key Visual Properties (Original)
- **Main bar height**: ~80px
- **Background**: Pure black `#000`
- **Logo**: Centered between nav-links (left) and user-actions (right), ~32px height, white (inverted from black PNG)
- **Nav links font**: Graphik XXCond Bold, ~13px, uppercase, letter-spacing ~1px, white
- **Active/hover indicator**: Green bottom border (`#cfff05`), 3px thick
- **Chevrons**: Small triangular arrow, ~8px, white
- **Mega-menu**: Full-width white panel, each category has a 40px line-art icon + bold heading + sub-links list
- **JOIN button**: Ghost/outline style, white border, ~12px uppercase
- **SIGN IN button**: Filled white, black text, ~12px uppercase
- **Icon buttons** (avatar, cart): ~24px, white, no background

### Current EDS Gaps (vs. Original)
1. **Logo not centered** — currently left-aligned; should be between nav and actions
2. **No JOIN/SIGN IN buttons** — only icon buttons present
3. **No utility bar** — missing the USTA Sites/Sections dropdowns, location, search
4. **No promo banner** — missing the dismissible "Find your account" bar
5. **Mega-menu lacks icons** — original has ~40px line-art icons per category
6. **Mega-menu column layout** — original uses a more structured grid with icon+text side-by-side
7. **Nav link spacing** — needs tighter horizontal rhythm to match
8. **Header height** — 72px vs. original's ~80px main bar
9. **Chevron style** — original uses a filled triangle, not a stroke chevron

---

## Implementation Checklist

### Phase 1: Main Bar Layout — Logo Centered
- [ ] Restructure header layout so logo sits between nav-links and user-actions (flex: nav | logo | actions)
- [ ] Update `header.js` to place logo element between nav and actions in DOM order
- [ ] CSS: Use `order` or restructure flex to center logo visually
- [ ] Increase main bar height to 80px desktop (adjust `header` placeholder too)
- [ ] Verify logo centered at 32px height with `filter: brightness(0) invert(1)`

### Phase 2: JOIN + SIGN IN Buttons
- [ ] Add "JOIN" ghost button (white border, transparent fill, white text, pill shape)
- [ ] Add "SIGN IN" filled button (white background, black text, pill shape)
- [ ] Keep avatar and cart as icon-only beside the buttons
- [ ] Update `content/nav.plain.html` actions section to include JOIN/SIGN IN semantics
- [ ] Update `header.js` to parse and render the new button types
- [ ] CSS for `.header-join-btn` (ghost) and `.header-signin-btn` (filled) — 12px uppercase, ~32px height

### Phase 3: Mega-Menu with Icons
- [ ] Add icon images to `content/nav.plain.html` (each level-2 item gets an `<img>` before the `<a>`)
- [ ] Copy relevant icon PNGs from `import-work/images/` to `content/images/` for nav use
- [ ] Update `buildMegaMenu()` in `header.js` to render icon+heading side-by-side
- [ ] CSS: Mega-menu item as flex row (icon 40px + text column)
- [ ] Style icon images at 40×40px, grayscale, centered

### Phase 4: Mega-Menu Full-Width Panel Refinement
- [ ] Set mega-menu panel to fixed full-viewport width, white background
- [ ] Add subtle top-border accent (green line or shadow separator below nav bar)
- [ ] Grid columns: fixed 3-4 column layout (not auto-fit) for consistent spacing
- [ ] Increase mega-menu padding: 40px vertical, 48px+ horizontal
- [ ] Category heading: 14px bold uppercase, with bottom border separator
- [ ] Sub-links: 13px regular, #555 color, 8px vertical gap, hover → #000

### Phase 5: Utility Bar (Top Bar)
- [ ] Add a 36px utility bar above the main nav bar
- [ ] Include "USTA Sites" dropdown and "USTA Sections" dropdown
- [ ] Include location input placeholder (zip code)
- [ ] Include inline search icon/input
- [ ] Include language switcher (EN | ES)
- [ ] Style: background `#1a1a1a`, text 11px uppercase white, compact
- [ ] Adjust `header` height placeholder to account for utility bar + main bar

### Phase 6: Promo Banner
- [ ] Add a dismissible promotional banner between utility bar and main nav
- [ ] Content: icon + message text + close button
- [ ] Store dismissal in `sessionStorage` so it stays hidden per session
- [ ] Add a new section to `nav.plain.html` for banner content
- [ ] Style: background #1a1a1a or #111, padding 10px, font 13px

### Phase 7: Nav Link Fine-Tuning
- [ ] Font: Graphik XXCond Bold (`var(--font-family-heading)`), 13px, letter-spacing 1px
- [ ] Padding: 28px 14px (tighter), vertically centered in 80px bar
- [ ] Active indicator: 3px solid `#cfff05` bottom border, immediate on hover (no transition delay)
- [ ] Chevron: Replace stroke-based SVG with filled triangle SVG (~8px)
- [ ] Remove chevron rotation animation — original doesn't rotate, just highlights

### Phase 8: Mobile Polish
- [ ] Match mobile header height to original (~56px)
- [ ] Hamburger icon: 3 thick lines matching original's weight
- [ ] Mobile drawer: Full black background, nav items ~18px condensed bold
- [ ] Accordion expansion: Show category icons in mobile too
- [ ] "MAIN MENU" back button at top of sub-navigation drill-down

### Phase 9: Final CSS Token Alignment
- [ ] Verify all colors use brand tokens (`--color-brand-primary: #cfff05`)
- [ ] Verify font stacks match (`--font-family-heading` for nav links)
- [ ] Box-shadow on mega-menu: `0 4px 12px rgba(0,0,0,0.1)` (subtle, matching original)
- [ ] Ensure no layout shift (CLS): reserved header height = utility bar + banner + main bar
- [ ] Run `npm run lint` — fix all JS/CSS issues
- [ ] Test desktop 1280px, tablet 768px, mobile 390px
- [ ] Visual screenshot comparison against original

---

## Priority Order

| Priority | Phase | Impact |
|----------|-------|--------|
| 1 | Phase 1 (Logo centered) | Biggest structural difference — changes entire visual balance |
| 2 | Phase 2 (JOIN/SIGN IN) | Completes the action area; matches original's UX pattern |
| 3 | Phase 4 (Mega-menu polish) | Refines the dropdown panel to match spacing/typography |
| 4 | Phase 7 (Nav link fine-tune) | Precise font size, spacing, border weight |
| 5 | Phase 3 (Mega-menu icons) | Adds visual richness matching original |
| 6 | Phase 5 (Utility bar) | Adds missing top bar — complex but high fidelity |
| 7 | Phase 6 (Promo banner) | Nice-to-have, lower priority |
| 8 | Phase 8 (Mobile polish) | Mobile refinements |

---

## Files to Modify

- `blocks/header/header.js` — Layout restructure, button rendering, icon support
- `blocks/header/header.css` — All styling changes
- `content/nav.plain.html` — Add JOIN/SIGN IN, icon references, banner content
- `icons/chevron-down.svg` — Replace with filled triangle variant
- `content/images/` — Copy nav category icons from `import-work/images/`

---

## Execution Note
This plan requires Execute mode to implement. The `excat:excat-navigation-orchestrator` skill is available for screenshot-driven validation during implementation.
