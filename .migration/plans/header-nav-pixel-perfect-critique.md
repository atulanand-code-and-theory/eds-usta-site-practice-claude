# Pixel-Perfect Header (Nav) Critique — USTA EDS vs Live Site

## Live Site Header Structure (Desktop 1440px)

The live site has a **three-tier** header:
1. **Top utility bar** (64px): USTA Sites, USTA Sections, location input, search, language selector
2. **Announcement bar** (40px): "New! Lost your account information? Find your account!"
3. **Main navigation bar** (110px): Logo | Nav links | JOIN + SIGN IN

Our EDS header only implements tier 3 (the main nav bar). The utility and announcement bars are out of scope for a typical EDS header block. The plan focuses on matching the **main navigation bar** pixel-perfectly.

---

## Live Site Main Bar Computed Styles

| Element | Property | Live Value |
|---------|----------|------------|
| **Main bar** | height | `110px` |
| **Main bar** | display | `flex` |
| **Main bar** | align-items | `center` |
| **Main bar** | padding | `0 8px` |
| **Main bar** | max-width | `1440px` |
| **Main bar** | background | white (`#fff`) |
| **Logo** | width | `237px` |
| **Logo** | height | `65.5px` |
| **Nav links** | font-size | `16px` |
| **Nav links** | font-family | `"Graphik Semibold"` |
| **Nav links** | font-weight | `400` (Semibold font face) |
| **Nav links** | text-transform | `uppercase` |
| **Nav links** | letter-spacing | `0.8px` |
| **Nav links** | line-height | `25px` |
| **Nav links** | color | `#000` |
| **Nav list** | display | `flex` |
| **Nav list** | gap | `38px` |
| **Nav list** | padding-top | `30px` |
| **Nav `<li>`** | height | `80px` |
| **Nav `<li>`** | display | `flex` |
| **JOIN button** | width | `120px` |
| **JOIN button** | height | `40px` |
| **JOIN button** | border | `1px solid #bebebe` |
| **JOIN button** | border-radius | `3px` |
| **JOIN button** | font-size | `16px` |
| **JOIN button** | padding | `14px` |
| **SIGN IN button** | width | `120px` |
| **SIGN IN button** | height | `40px` |
| **SIGN IN button** | background | `#000` |
| **SIGN IN button** | color | `#fff` |
| **SIGN IN button** | border | `1px solid #000` |
| **SIGN IN button** | border-radius | `3px` |
| **SIGN IN button** | font-size | `14px` |

---

## Current EDS Header (Differences)

| Element | Live Site | Current EDS | Delta |
|---------|-----------|-------------|-------|
| **Header height** | `110px` | `85px` (`--nav-height`) | 25px shorter |
| **Header background** | white `#fff` | `#f7f7f7` (light gray) | Wrong color |
| **Logo height** | `65.5px` | `max-height: 40px` | Too small |
| **Nav link font-size** | `16px` | `13-14px` | Too small |
| **Nav link letter-spacing** | `0.8px` | `0.5px` | Too tight |
| **Nav list gap** | `38px` | `4-8px` | Way too tight |
| **Nav `<li>` height** | `80px` | auto | Missing fixed height |
| **Nav link padding** | `0` (gap handles spacing) | `8px 14-16px` | Different spacing model |
| **Nav link hover** | no visible border | `3px border-bottom` blue | Different hover indicator |
| **JOIN button** | outlined, `120x40px` | missing (only "Sign In") | Missing entirely |
| **SIGN IN button** | solid black, `120x40px` | small black button | Different size |
| **Button font-size** | `16px` (JOIN), `14px` (SIGN IN) | `12px` | Too small |
| **Button width** | `120px` | `min-width: 100px` | Slightly narrow |
| **Dropdown arrows** | separate `<button>` elements | CSS `::after` triangles | Different approach (OK for EDS) |
| **Max-width** | `1440px` | `1200px` | Too narrow |

---

## Checklist

### Content Changes (nav.plain.html)
- [ ] Add a "JOIN" link before "Sign In" in the nav-tools section (third `<div>`)
- [ ] Verify nav link text matches live site: PLAY, SAFE PLAY, PROVIDERS & FACILITIES, ABOUT, PRO TENNIS, NEWS

### Code Changes — header.css (Global)
- [ ] Update `--nav-height` from `85px` to `110px` in brand.css or header.css
- [ ] Change header background from `#f7f7f7` to `#fff`
- [ ] Remove `box-shadow` (live site has none on the main bar)
- [ ] Update `max-width` from `1200px` to `1440px` for header nav row
- [ ] Update header padding from `0 16px` to `0 8px`

### Code Changes — header.css (Logo)
- [ ] Increase logo `max-height` from `40px` to `65px` at desktop
- [ ] Remove `filter: brightness(0)` — live logo is already black

### Code Changes — header.css (Nav Links — Desktop)
- [ ] Increase font-size from `13-14px` to `16px`
- [ ] Add `letter-spacing: 0.8px`
- [ ] Set `line-height: 25px`
- [ ] Change nav list gap from `4-8px` to `38px`
- [ ] Remove padding from links (use gap for spacing instead)
- [ ] Set `<li>` height to `80px` with `display: flex; align-items: center`
- [ ] Remove `border-bottom: 3px solid transparent` hover effect (live site doesn't use bottom border)
- [ ] Update hover to color change only (or match live site's indicator)

### Code Changes — header.css (Buttons)
- [ ] Style JOIN button: `width: 120px; height: 40px; border: 1px solid #bebebe; border-radius: 3px; font-size: 16px; text-transform: uppercase`
- [ ] Style SIGN IN button: `width: 120px; height: 40px; background: #000; color: #fff; border: 1px solid #000; border-radius: 3px; font-size: 14px`
- [ ] Update buttons gap and sizing to match live

### Code Changes — header.css (Mobile)
- [ ] Verify mobile hamburger menu still works after desktop changes
- [ ] Mobile header can stay at a smaller height (utility/announcement bars not present)
- [ ] Ensure logo scales down on mobile (current 36px is fine)

### Validation
- [ ] Preview at localhost:3000 — Desktop 1440px: logo + nav links + JOIN/SIGN IN buttons match live
- [ ] Compare header side-by-side with live site screenshot
- [ ] Verify nav link spacing (38px gap between items)
- [ ] Verify button sizing (120px × 40px each)
- [ ] Test dropdown menu still opens on desktop
- [ ] Test mobile hamburger menu opens and closes
- [ ] Run `npm run lint` — pass clean
- [ ] No console errors

---

## Implementation Notes

### nav.plain.html Update
Add JOIN link to the third div:
```html
<div>
  <p><a href="/en/home/myaccount/profile/join-self-rate.html">Join</a></p>
  <p><a href="/en/home/myaccount.html">Sign In</a></p>
</div>
```

### CSS Strategy
Update desktop breakpoint styles (≥900px and ≥1200px) with live site values. Keep mobile-first base unchanged. Key changes are all sizing/spacing increases at desktop.

### Scope Exclusions
- **Top utility bar** (USTA Sites, Sections, search, language) — Not implementing (requires separate block or functionality beyond standard EDS header)
- **Announcement bar** — Not implementing (separate concern, can be added as auto-block later)
- **Dropdown mega-menu panels** — Current simple dropdown is acceptable for EDS

---

## Execution Status
This plan is ready for implementation. Switch to **Execute mode** to begin making changes.
