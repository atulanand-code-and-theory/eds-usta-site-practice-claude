# USTA Header Verification & Improvement Plan

## Current State Assessment

The deployed header at `https://main--eds-usta-site-practice-claude--atulanand-code-and-theory.aem.page/en/home` renders with:
- Black fixed header bar (64px mobile / 72px desktop)
- SVG text "USTA" logo (basic, no fireball icon)
- 7 nav items: Play, Compete, Improve, Organize, Give, US Open, About
- Simple two-column mega-menu dropdowns with plain link lists
- Search overlay (fullscreen dark)
- Green pill "Log In" button
- Mobile hamburger → slide drawer

## Key Differences from usta.com Source

After analyzing the scraped original (`import-work/cleaned.html`), the real USTA header has:

| Feature | Original (usta.com) | Current EDS |
|---------|---------------------|-------------|
| **Logo** | Full USTA fireball logo (PNG, black on white BG inverted for dark nav) | SVG text "USTA" only |
| **Nav items** | PLAY, SAFE PLAY, PROVIDERS & FACILITIES, ABOUT, PRO TENNIS, NEWS, SECTIONS | Play, Compete, Improve, Organize, Give, US Open, About |
| **Utility bar** | Top bar with "USTA Sites" dropdown, "USTA Sections" dropdown, location, search, language toggle | None |
| **Promo banner** | Dismissible promotional banner above nav ("New! Lost your account?") | None |
| **Mega-menu structure** | Rich panels with icons/images per item, grouped categories with level-3 sub-links | Simple flat link list |
| **User section** | Avatar icon + dropdown (no "Log In" text when logged out, just avatar) | Green "LOG IN" pill button |
| **Shopping cart** | Cart icon with item count | Not present |
| **Language switcher** | EN/ES toggle | Not present |
| **Search** | Inline expanding search bar in top utility bar | Fullscreen overlay |

---

## Improvement Plan

### Phase 1: Logo & Branding
- [ ] Replace SVG text logo with the real USTA fireball logo PNG (`content/images/09963bf667ba05cdefd813a72b9c60ba.png`)
- [ ] Apply `filter: brightness(0) invert(1)` to make black logo visible on dark header
- [ ] Size logo appropriately (height ~28px mobile, ~32px desktop, matching original)

### Phase 2: Navigation Items — Match Real Site Structure
- [ ] Update `content/nav.plain.html` to match actual USTA nav items: PLAY, SAFE PLAY, PROVIDERS & FACILITIES, ABOUT, PRO TENNIS, NEWS
- [ ] Update mega-menu sub-links to match real structure (grouped with category headings + icons)
- [ ] Add level-3 sub-links within mega-menu categories (e.g., Tennis Groups → Youth, High School, College, Adult, Wheelchair)

### Phase 3: Enhanced Mega-Menu Panels
- [ ] Add icon/image support per mega-menu category item (each level-2 item has a small icon)
- [ ] Implement category grouping (level-2 headings with level-3 link lists underneath)
- [ ] Style mega-menu as full-width panel (not centered dropdown) matching original's wider layout
- [ ] Add category description text for select items (e.g., "Complete the USTA's Safe Play program...")

### Phase 4: Utility/Top Bar
- [ ] Add a slim top utility bar above main nav with "USTA Sites" and "USTA Sections" dropdowns
- [ ] Add location input field (zip code / city autocomplete)
- [ ] Add inline search field (expanding) in utility bar
- [ ] Add language switcher (EN/ES toggle)
- [ ] Style utility bar: dark background, smaller text, compact

### Phase 5: Promo Banner
- [ ] Add a dismissible promotional banner below utility bar / above main nav
- [ ] Support icon + message + close button
- [ ] Use sessionStorage/localStorage to remember dismissal
- [ ] Content authorable via nav.plain.html (additional section)

### Phase 6: User & Cart Section
- [ ] Replace green "LOG IN" pill with avatar icon (circle with user silhouette)
- [ ] Add shopping cart icon with badge count
- [ ] Style these as compact icon buttons matching original

### Phase 7: Mobile Drawer Improvements
- [ ] Add "MAIN MENU" back button in mobile sub-nav (matches original's drill-down pattern)
- [ ] Show level-2 items with icons in mobile accordion
- [ ] Add mobile-specific user section (avatar + login at top of drawer)
- [ ] Add mobile language switcher inside drawer

### Phase 8: CSS Refinements
- [ ] Increase desktop header height to match original (~80px with utility bar, ~56px main bar)
- [ ] Adjust nav link font size/weight to match original (bolder, tighter spacing)
- [ ] Add green bottom-border active indicator on hovered nav items (already present, verify thickness)
- [ ] Ensure mega-menu uses proper drop-shadow matching original
- [ ] Fix header reserved height in `<header>` element to account for utility bar

### Phase 9: Testing & QA
- [ ] Test all mega-menu items open/close correctly on desktop hover
- [ ] Test mobile drawer drill-down navigation
- [ ] Test promo banner dismiss + persistence
- [ ] Verify keyboard accessibility (Tab, Escape, Arrow keys)
- [ ] Run `npm run lint` and fix all issues
- [ ] Verify no CLS (Cumulative Layout Shift) from header loading
- [ ] Visual comparison against usta.com header

---

## Priority Recommendations

For maximum visual impact with minimal complexity, focus on these high-value improvements first:

1. **Logo fix** (Phase 1) — immediate brand fidelity improvement
2. **Nav items correction** (Phase 2) — match real site IA
3. **Enhanced mega-menu** (Phase 3) — the biggest visual gap
4. **User/cart icons** (Phase 6) — simple swap, big visual match

Utility bar (Phase 4) and promo banner (Phase 5) add complexity and can be deferred if rapid iteration is preferred.

---

## Execution Note

This plan requires Execute mode to implement. Changes span `content/nav.plain.html`, `blocks/header/header.js`, `blocks/header/header.css`, and potentially new icon assets.
