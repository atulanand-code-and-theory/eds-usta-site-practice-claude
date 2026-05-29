Let me explore the project structure to understand what content exists in the root and en folders.Let me also check for any index or root-level content page and verify image paths.# Content Verification Plan: Root vs En Folder

## Summary of Findings

I reviewed all content files in both the root (`content/`) and `en/` (`content/en/`) folders. Here's what exists:

| File | Root (`content/`) | En (`content/en/`) |
|------|-------------------|---------------------|
| Nav | `nav.plain.html` | `nav.plain.html` |
| Footer | `footer.plain.html` | `footer.plain.html` |
| Home page | **Missing** | `home.plain.html` + `home.html` |

---

## Issues Identified

### 1. Image Path Mismatch — CRITICAL
- **Root nav/footer** reference images at `/content/images/` (e.g., `/content/images/2e51eea05cb98bb7e9d883bcf2887997.png`)
- **En nav/footer** reference images at `/import-work/images/` (e.g., `/import-work/images/2e51eea05cb98bb7e9d883bcf2887997.png`)
- **Home page** (`en/home.plain.html`) references `/content/images/`
- **Actual images exist only in** `import-work/images/` — there is **no `content/images/` directory**
- **Result**: Root nav/footer and home page images will be broken (404)

### 2. Structural Wrapping Difference — Nav
- **Root** `nav.plain.html`: Three sibling `<div>` elements (logo, menu, sign-in)
- **En** `nav.plain.html`: One wrapping `<div>` containing three child `<div>` elements
- EDS expects nav.plain.html to have a flat structure of sibling divs; the extra wrapper in the `en/` version may cause the header block to misinterpret the structure

### 3. Structural Wrapping Difference — Footer
- **Root** `footer.plain.html`: Four sibling `<div>` elements (logo, links, social, copyright)
- **En** `footer.plain.html`: One wrapping `<div>` containing four child `<div>` elements
- Same concern as nav — the extra wrapper div in the `en/` version deviates from expected EDS format

### 4. No Root-Level Homepage
- No `content/index.html` or `content/home.html` exists
- Only `content/en/home.html` and `content/en/home.plain.html` exist
- Accessing the root URL (`/`) will show no page content

### 5. HTML Entity Encoding Difference — Footer Copyright
- **Root**: Uses literal `©` character
- **En**: Uses `&copy;` HTML entity
- Minor difference — functionally equivalent but shows files were generated differently

---

## Content Equivalence Check

| Element | Root | En | Match? |
|---------|------|-----|--------|
| Nav links | Play (w/submenu), Safe Play, Providers & Facilities, About, Pro Tennis (w/submenu), News, Sign In | Same | Yes |
| Footer links | Play Tennis, Safe Play, Providers & Facilities, About USTA, Pro Tennis, News, Membership, Customer Care | Same | Yes |
| Social links | Facebook, Twitter, Instagram, YouTube, TikTok | Same | Yes |
| Legal links | Privacy Policy, Terms of Use, Accessibility | Same | Yes |

---

## Checklist

- [ ] Fix image paths in root `nav.plain.html` — change `/content/images/` to `/import-work/images/` (or create a proper `content/images/` directory)
- [ ] Fix image paths in root `footer.plain.html` — same issue
- [ ] Fix image paths in `en/home.plain.html` and `en/home.html` — same issue
- [ ] Resolve structural inconsistency in `en/nav.plain.html` — remove extra wrapping div to match root format (or update root to match en format)
- [ ] Resolve structural inconsistency in `en/footer.plain.html` — remove extra wrapping div to match root format (or update root to match en format)
- [ ] Create a root-level index or home page, or configure a redirect from `/` to `/en/home`
- [ ] Decide on a single canonical image path strategy (either move images to `content/images/` or update all references to `import-work/images/`)
- [ ] Verify pages render correctly in the preview server after fixes

---

## Recommendation

The most impactful fix is the **image path issue** — all images in the home page and root nav/footer will be broken. The structural wrapping difference between root and `en` also needs a decision on which format is authoritative for EDS rendering.
