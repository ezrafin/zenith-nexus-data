# Unused Image Files Report

## Files Confirmed as Unused

The following image files in the `public/` directory are not referenced anywhere in the codebase and can be safely removed:

### 1. `public/og-image.png`
- **Status**: No longer used (replaced with `investo.png`)
- **Previous usage**: Was referenced in:
  - `index.html` (OG meta tags)
  - `src/pages/NewsDetailPage.tsx` (fallback image)
  - `src/pages/AnalyticsDetailPage.tsx` (fallback image)
  - `src/utils/seo.ts` (default OG image)
  - `src/utils/structuredData.ts` (logo URLs)
- **Action**: ✅ All references have been replaced with `investo.png`
- **Recommendation**: **SAFE TO DELETE**

### 2. `public/apple-touch-icon.png`
- **Status**: No longer used (replaced with `investo.png`)
- **Previous usage**: Was referenced in:
  - `index.html` (apple-touch-icon link)
  - `public/manifest.json` (icon entry)
- **Action**: ✅ All references have been replaced with `investo.png`
- **Recommendation**: **SAFE TO DELETE**

### 3. `public/investo-text.png`
- **Status**: Not found in codebase
- **Search results**: No references found in:
  - Source code files
  - HTML files
  - Configuration files
- **Recommendation**: **SAFE TO DELETE** (unless needed for future use)

### 4. `public/e-touch-ico.png`
- **Status**: File does not exist in public directory
- **Note**: This file was mentioned in the user's file explorer but does not exist in the public folder
- **Recommendation**: **N/A** (file not found)

## Files Confirmed as Used (DO NOT DELETE)

- ✅ `public/investo.png` - Used in Header, Footer, LoadingScreen, and now OG/apple-touch-icon
- ✅ `public/favicon.ico` - Used in index.html
- ✅ `public/favicon.png` - Used in manifest.json
- ✅ `public/hero-background.jpg` - Used in HeroSection.tsx
- ✅ `public/placeholder.svg` - Used in LazyImage.tsx as fallback
- ✅ `public/logos/companies/*` - Used via organizations.ts (dynamic paths)

## Summary

**Files safe to delete:**
1. `public/og-image.png`
2. `public/apple-touch-icon.png`
3. `public/investo-text.png`

**Total space that can be freed**: ~3-4 image files (exact size depends on file dimensions)

## Next Steps

1. Review this list
2. Delete confirmed unused files
3. Verify site functionality after deletion
4. Commit changes

