# Fix Missing Footer App Images

## Problem

The footer in the EDS page references 5 app icon images that don't exist in `content/images/`:
- `/content/images/app-usta-tennis.png`
- `/content/images/app-tennislink.png`
- `/content/images/app-usta-serve.png`
- `/content/images/app-usta-flex.png`
- `/content/images/app-uso.png`

These are the "USTA APPS" icons shown in the footer social section.

## Source Images (from usta.com)

| Local filename | Original URL |
|---|---|
| `app-usta-tennis.png` | `https://www.usta.com/content/dam/usta/app-icons/USTA-app.png` |
| `app-tennislink.png` | `https://www.usta.com/content/dam/usta/logos/Tennislink-app.png` |
| `app-usta-serve.png` | `https://www.usta.com/content/dam/usta/app-icons/Serve-app.png` |
| `app-usta-flex.png` | `https://www.usta.com/content/dam/usta/logos/usta-flex-icon.png` |
| `app-uso.png` | `https://www.usta.com/content/dam/usta/logos/AppIcons-USO.png` |

## Root Cause

During the initial content import/migration, the app icon images were referenced in `footer.plain.html` but were never downloaded to the `content/images/` directory. The USTA logo image (`2e51eea05cb98bb7e9d883bcf2887997.png`) and SVG icons (facebook, twitter, instagram, youtube, privacy-badge) exist correctly — only the 5 app store icons are missing.

## Fix Plan

- [ ] Download the 5 app icon images from the original USTA site
- [ ] Save them to `content/images/` with the filenames referenced in `footer.plain.html`
- [ ] Verify the images render correctly in the local preview

## Checklist

- [ ] Download `https://www.usta.com/content/dam/usta/app-icons/USTA-app.png` → `content/images/app-usta-tennis.png`
- [ ] Download `https://www.usta.com/content/dam/usta/logos/Tennislink-app.png` → `content/images/app-tennislink.png`
- [ ] Download `https://www.usta.com/content/dam/usta/app-icons/Serve-app.png` → `content/images/app-usta-serve.png`
- [ ] Download `https://www.usta.com/content/dam/usta/logos/usta-flex-icon.png` → `content/images/app-usta-flex.png`
- [ ] Download `https://www.usta.com/content/dam/usta/logos/AppIcons-USO.png` → `content/images/app-uso.png`
- [ ] Verify footer renders correctly in local preview (all 5 app icons visible)
