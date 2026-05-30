# EDS Footer Improvement Plan — USTA.com Comparison

## Comparison Summary

| Feature | Original USTA.com | Current EDS Footer |
|---------|------------------|-------------------|
| **Structure** | Logo + 12 nav links + 4 social icons + "USTA APPS" section (5 app icons) + OneTrust badge + copyright | Logo + 8 nav links + 5 social text links + 3 legal links + copyright text |
| **"Download App" banner** | Dedicated section above footer with Apple/Google Play badges | Missing entirely |
| **Nav links** | 12 links: Careers, Internships, Contact Us, Terms of Use, USTA Connect Portal, Safe Play Disciplinary List, Sitemap, Umpire Policy, Privacy Policy, Find Your Account, Accessibility Statement, Cookie Policy | 8 links: Play Tennis, Safe Play, Providers & Facilities, About USTA, Pro Tennis, News, Membership, Customer Care |
| **Social links** | 4 icons with images (Facebook, Twitter, Instagram, YouTube) | 5 text links (Facebook, Twitter, Instagram, YouTube, TikTok) |
| **USTA Apps section** | Dedicated section with "USTA APPS" heading + 5 app icon badges (USTA Tennis, TennisLink, USTA Serve, USTA Flex, USO) | Missing entirely |
| **Copyright/legal** | OneTrust badge + "© 2026 USTA ALL RIGHTS RESERVED" in bottom bar | Separate copyright text + 3-link list (Privacy Policy, Terms of Use, Accessibility) |
| **Layout** | Two-column: Left = logo + links list, Right = social icons row + app icons row | Grid: brand section, nav grid, social row, legal bar |
| **Typography** | Graphik Semibold, 14px, white links | 13px, uppercase, #ccc links |
| **Max width** | 1440px | 1200px |

## Key Gaps to Address

### Content Gaps (footer.plain.html)
1. **Missing "Download the USTA App" section** — dedicated region above footer with App Store + Google Play badges
2. **Wrong navigation links** — EDS has main-site navigation links but should have utility/legal links matching original (Careers, Internships, Contact Us, Terms of Use, etc.)
3. **Missing USTA Apps section** — 5 mobile app icon badges with links
4. **Social links missing icons** — EDS uses text only; original uses image icons for Facebook, Twitter, Instagram, YouTube (no TikTok on original)
5. **Missing OneTrust privacy badge** — certification image with link
6. **Copyright text differs** — Should be "© 2026 USTA ALL RIGHTS RESERVED" (uppercase, shorter)

### Code/CSS Gaps (footer.js + footer.css)
7. **Missing app download banner section** handling in JS
8. **Missing USTA Apps section** rendering in JS
9. **Max-width too narrow** — should be 1440px not 1200px
10. **Layout structure differs** — original is a two-column footer with logo+nav-links on left, social+apps on right
11. **Nav link styling** — should be white 14px, not #ccc 13px uppercase
12. **No social icon images** — needs SVG/image-based social icons instead of text links
13. **Legal section incorrect** — should be a simple bottom bar with badge + copyright only (no separate link list)

## Checklist

- [ ] **Update footer content (footer.plain.html)** — Replace nav links with correct utility links (Careers, Internships, Contact Us, Terms of Use, USTA Connect Portal, Safe Play Disciplinary List, Sitemap, Umpire Policy, Privacy Policy, Find Your Account, Accessibility Statement, Cookie Policy)
- [ ] **Add "Download the USTA App" section** to footer content with App Store and Google Play badge images/links
- [ ] **Add USTA Apps section** with 5 app icon links (USTA Tennis, TennisLink, USTA Serve, USTA Flex, USO)
- [ ] **Fix social links** — Update to 4 links (Facebook, Twitter, Instagram, YouTube) matching original, add SVG social icons to `/icons/` folder
- [ ] **Fix copyright/legal section** — Change to "© 2026 USTA ALL RIGHTS RESERVED", remove separate legal link list (those are now in the nav links)
- [ ] **Add OneTrust badge** image and link to copyright bar
- [ ] **Update footer.js** — Add decoration logic for new sections (app download banner, apps section, OneTrust badge)
- [ ] **Update footer.css** — Fix max-width to 1440px, update layout to two-column (logo+nav left, social+apps right), fix nav link colors (white not #ccc), remove uppercase transform, fix typography to 14px, add app badge styling, add download banner styling
- [ ] **Test rendering** — Verify in local preview that footer matches original structure and styling
- [ ] **Verify responsive behavior** — Check mobile/tablet breakpoints render correctly

## Implementation Notes

- This requires changes to both **content** (footer.plain.html) and **code** (footer.js, footer.css)
- Social media SVG icons need to be added to the `/icons/` directory
- App store badge images and app icon images need to be sourced/downloaded
- The "Download the USTA App" banner appears to be a section *above* the `<footer>` element on the original site — consider whether to include it inside the EDS footer block or as a separate section
- Execution requires switching out of Plan mode
