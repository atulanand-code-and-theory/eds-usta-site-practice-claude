# USTA Header/Navigation Migration Plan

## Objective
Migrate the full header/navigation experience from https://www.usta.com/en/home.html into this AEM Edge Delivery Services project, including mega-menus, search, and user account controls.

---

## Source Analysis (usta.com header)

The USTA.com header consists of:
- **Utility bar** (top): Promo/announcement strip
- **Main header bar**: USTA logo, primary nav links with mega-menu dropdowns, search icon, user account/login button
- **Mega-menu panels**: Multi-column dropdowns with links, featured images, CTAs
- **Mobile**: Hamburger menu with slide-in drawer, accordion nav

---

## Architecture

### File Structure
```
blocks/header/
├── header.js          # Block decoration + mega-menu logic
├── header.css         # All header/nav styling (responsive)
content/
├── nav.plain.html     # Authored navigation structure (new)
icons/
├── search.svg         # Search icon (new)
├── user.svg           # Account/user icon (new)
├── hamburger.svg      # Mobile menu icon (new)
├── close.svg          # Close/X icon (new)
```

### Content Model (nav.plain.html)
EDS convention: the header block fetches `/nav.plain.html` and decorates it. Structure:
- **Section 1**: Logo (image wrapped in link to home)
- **Section 2**: Primary navigation (nested `<ul>` lists — top-level items become nav links, nested lists become mega-menu columns)
- **Section 3**: Utility/actions (search + account button)

---

## Implementation Checklist

### Phase 1: Content & Infrastructure
- [ ] Create `content/nav.plain.html` with USTA navigation structure (Play, Compete, Improve, Organize, Give, US Open, About)
- [ ] Add SVG icons: search, user/account, hamburger, close
- [ ] Wire up `loadHeader` in `scripts.js` (currently missing — `aem.js` exports it but it's not called)

### Phase 2: Header Block (Desktop)
- [ ] Create `blocks/header/header.js` — fetch nav content, build DOM structure
- [ ] Implement logo section with link to home
- [ ] Implement primary nav bar with top-level links
- [ ] Implement mega-menu panels (multi-column link layout with featured content)
- [ ] Implement search overlay (icon click → expand search input)
- [ ] Implement account/login button
- [ ] Add keyboard navigation (arrow keys, Escape to close)
- [ ] Add ARIA attributes (aria-expanded, aria-haspopup, roles)

### Phase 3: Header Block (Mobile)
- [ ] Implement hamburger toggle → slide-in nav drawer
- [ ] Implement accordion behavior for nav sections (tap to expand/collapse)
- [ ] Implement mobile search within drawer
- [ ] Handle body scroll lock when drawer is open
- [ ] Ensure touch-friendly tap targets (48px minimum)

### Phase 4: Styling
- [ ] Create `blocks/header/header.css` with sticky/fixed positioning
- [ ] Style utility bar (if included)
- [ ] Style main nav bar (dark background, USTA brand green accents)
- [ ] Style mega-menu panels (white dropdown, multi-column grid, hover states)
- [ ] Style search overlay/input
- [ ] Style mobile drawer and accordion
- [ ] Responsive breakpoints: mobile (<600px), tablet (600–899px), desktop (≥900px)
- [ ] Ensure header doesn't shift layout (reserve height for CLS)

### Phase 5: Integration & QA
- [ ] Update `scripts.js` to call `loadHeader(doc.querySelector('header'))`
- [ ] Test in local dev server at `http://localhost:3000`
- [ ] Verify mega-menu open/close on hover (desktop) and click (mobile)
- [ ] Verify search opens and focuses input
- [ ] Verify keyboard accessibility (Tab, Escape, Arrow keys)
- [ ] Verify screen reader announces nav landmarks and expanded states
- [ ] Test responsive behavior across breakpoints
- [ ] Run `npm run lint` and fix issues
- [ ] Visual comparison against usta.com header

---

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mega-menu trigger (desktop) | Hover + click | Matches usta.com behavior; click needed for accessibility |
| Mobile pattern | Off-canvas drawer | Standard EDS mobile nav pattern; space-efficient |
| Sticky header | Yes, fixed top | USTA uses sticky nav; important for UX continuity |
| Search | Overlay/expanding input | Keeps nav clean; usta.com pattern |
| Content source | `/nav.plain.html` | Standard EDS header content convention |
| Animation | CSS transitions only | No JS animation libraries; performant |

---

## Dependencies & Risks

- **No existing header block** — building from scratch; no conflicts
- **`loadHeader` not called** — need to add to `scripts.js` `loadLazy()` function
- **Fonts** — uses existing Graphik brand fonts already in project
- **Icons** — need to source/create SVGs for search, user, hamburger, close
- **Content** — creating nav content document with representative USTA link structure

---

## Execution Note
This plan requires Execute mode to implement. The navigation orchestrator skill (`excat:excat-navigation-orchestrator`) is available for assisted implementation with screenshot-driven validation.
