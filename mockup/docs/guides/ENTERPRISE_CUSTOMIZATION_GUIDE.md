# Enterprise Documentation Portal - Customization Guide

**Version:** 1.0.0  
**Last Updated:** October 31, 2025  
**For:** Enterprise Customers  

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Best Practices](#best-practices)
5. [CSS Variable System](#css-variable-system)
6. [Theme Customization](#theme-customization)
7. [Accessibility](#accessibility)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Support](#support)

---

## Overview

This documentation portal is designed for **enterprise customers** who need **complete brand control** while maintaining **vendor update compatibility**.

### Key Principles

1. **Separation of Concerns** - Core templates vs. customer themes
2. **Update Safety** - Vendor updates don't break your customizations
3. **Brand Flexibility** - Full control over colors, fonts, and styles
4. **Accessibility First** - WCAG AA compliance guaranteed
5. **Zero Code Required** - Use the Admin UI for all customizations

---

## Architecture

### 3-Layer System

```
┌─────────────────────────────────────┐
│  Layer 1: Core Templates            │  ← Vendor maintains (don't modify)
│  • Structure and layout             │
│  • Component primitives              │
│  • Core functionality                │
└─────────────────────────────────────┘
            ↓ Consumes
┌─────────────────────────────────────┐
│  Layer 2: Theme Variables           │  ← Customer customizes (your brand)
│  • CSS custom properties             │
│  • Color scales                      │
│  • Typography                        │
│  • Component styling                 │
└─────────────────────────────────────┘
            ↓ Styles
┌─────────────────────────────────────┐
│  Layer 3: Content                   │  ← Customer manages (your docs)
│  • Documentation pages               │
│  • Images and assets                 │
│  • Configuration                     │
└─────────────────────────────────────┘
```

### Directory Structure

```
/documentation-portal/
│
├── /admin/                        ← Theme customization tools
│   ├── theme.html                 ← Theme editor (visual)
│   ├── validator.html             ← Accessibility checker
│   ├── ai.html                    ← AI configuration
│   └── /assets/
│       └── radix-themes.js        ← Color database
│
├── /preview-templates/            ← Protected preview (don't modify)
│   ├── index.html
│   ├── doc-page.html
│   └── search-results.html
│
├── /customer-theme/               ← YOUR CUSTOMIZATIONS GO HERE
│   ├── theme.css                  ← Generated CSS variables
│   ├── custom.css                 ← Your additional CSS
│   ├── theme.json                 ← Configuration
│   └── /assets/
│       ├── logo.svg               ← Your logo
│       ├── logo-dark.svg
│       ├── favicon.ico
│       └── /fonts/                ← Custom fonts (optional)
│
└── /production-templates/         ← Live portal templates
    ├── index.html
    ├── doc-page.html
    └── search-results.html
```

---

## Quick Start

### Step 1: Access the Admin Dashboard

```
http://your-portal.com/admin/
```

### Step 2: Choose Your Approach

**Option A: Use a Preset Theme**
1. Go to **Theme Editor** (`/admin/theme.html`)
2. Click a preset: Indigo, Blue, Green, Ruby, Amber, or Violet
3. Click **"Export CSS"**
4. Save the file as `/customer-theme/theme.css`

**Option B: Create Custom Theme** (Coming Soon)
1. Go to **Theme Editor**
2. Click **"+ Custom"**
3. Enter your brand colors
4. System generates accessible scale
5. Export and save

### Step 3: Add Your Logo

Place in `/customer-theme/assets/`:
- `logo.svg` (used in light mode or dark backgrounds)
- `logo-dark.svg` (used on light backgrounds)
- `favicon.ico`

### Step 4: Configure

Edit `/customer-theme/theme.json`:
```json
{
  "customer": {
    "name": "Your Company Name",
    "id": "your-company-id"
  },
  "brand": {
    "colors": {
      "primary": "#3D63DD",
      "accent": "#8E4EC6",
      "neutral": "#8B8D98"
    }
  },
  "features": {
    "gradients": true,
    "darkMode": true
  }
}
```

### Step 5: Validate

1. Go to **Theme Validator** (`/admin/validator.html`)
2. Click **"Run All Tests"**
3. Verify all tests pass (WCAG AA minimum)
4. Fix any warnings or failures

### Step 6: Deploy

```bash
npm run build
npm run deploy
```

---

## Best Practices

### ✅ DO

1. **Use the Admin UI** - Don't hand-edit CSS unless necessary
2. **Follow Radix Patterns** - Use steps 11-12 for text colors
3. **Test Accessibility** - Run validator before deploying
4. **Version Control** - Commit your `/customer-theme/` directory
5. **Document Changes** - Keep notes on customizations
6. **Test Both Modes** - Verify light and dark themes
7. **Use Semantic Variables** - Prefer `--text-primary` over `--color-neutral-12`
8. **Export Backups** - Save exported CSS files regularly

### ❌ DON'T

1. **Modify Core Templates** - Changes will be lost on vendor updates
2. **Hardcode Hex Colors** - Always use CSS variables
3. **Skip Validation** - Accessibility is non-negotiable
4. **Override with !important** - Use proper cascading instead
5. **Delete Vendor Variables** - You can override, don't remove
6. **Ignore Warnings** - They exist for a reason
7. **Test Only Desktop** - Mobile is critical
8. **Deploy Without Testing** - Always validate first

---

## CSS Variable System

### Core Variables

#### Color Scales (12 Steps Each)

```css
/* Primary Color (your main brand color) */
--color-primary-1  through --color-primary-12

/* Accent Color (secondary brand color) */
--color-accent-1  through --color-accent-12

/* Neutral Color (grays for text, backgrounds, borders) */
--color-neutral-1  through --color-neutral-12
```

#### Step Usage Guide

| Steps | Purpose | Example Use | WCAG |
|-------|---------|-------------|------|
| 1-3 | App backgrounds | Body background, cards | N/A |
| 4-5 | UI element backgrounds | Buttons (hover), inputs | N/A |
| 6-7 | Borders & separators | Card borders, dividers | N/A |
| 8-9 | Solid colors | Buttons, badges, highlights | N/A |
| 11 | Low-contrast text | Links, secondary text | **AA** |
| 12 | High-contrast text | Body text, headings | **AAA** |

#### Semantic Aliases

```css
/* Backgrounds */
--bg-app: var(--color-neutral-1);           /* Main app background */
--bg-elevated: var(--color-neutral-2);      /* Cards, modals */
--bg-surface: var(--color-neutral-3);       /* Input fields */
--bg-overlay: var(--color-neutral-4);       /* Tooltips, popovers */

/* Text */
--text-primary: var(--color-neutral-12);    /* Body text */
--text-secondary: var(--color-neutral-11);  /* Captions, labels */
--text-tertiary: var(--color-neutral-10);   /* Placeholder text */
--text-brand: var(--color-primary-11);      /* Brand highlights */
--text-accent: var(--color-accent-11);      /* Accents, links */

/* Borders */
--border-subtle: var(--color-neutral-6);    /* Subtle separators */
--border-default: var(--color-neutral-7);   /* Default borders */
--border-strong: var(--color-neutral-8);    /* Emphasized borders */

/* Interactive */
--interactive-default: var(--color-primary-9);   /* Button default */
--interactive-hover: var(--color-primary-10);    /* Button hover */
--interactive-active: var(--color-primary-8);    /* Button pressed */
--interactive-disabled: var(--color-neutral-6);  /* Disabled state */
```

#### Component-Specific

```css
/* Product Cards */
--product-card-bg: linear-gradient(...);    /* Card background */
--product-card-border: var(--color-primary-7);
--product-card-text: var(--color-primary-12);

/* Navigation */
--nav-bg: var(--bg-elevated);
--nav-text: var(--text-secondary);
--nav-text-hover: var(--text-primary);
--nav-border: var(--border-subtle);

/* Buttons */
--btn-primary-bg: var(--interactive-default);
--btn-primary-text: white;
--btn-primary-hover: var(--interactive-hover);
```

---

## Theme Customization

### Using the Theme Editor

#### 1. Select a Preset

Navigate to `/admin/theme.html` and choose:
- **Indigo** - Professional, trustworthy (default)
- **Blue** - Calm, reliable
- **Green** - Fresh, natural
- **Ruby** - Bold, energetic
- **Amber** - Warm, inviting
- **Violet** - Creative, elegant

#### 2. Customize Options

**Appearance:**
- Light mode
- Dark mode (recommended for documentation)

**Gradients:**
- Toggle on/off for product cards
- Solid color fallback when disabled

**Colors:**
- Primary: Main brand color
- Accent: Secondary color
- Neutral: Gray tones

#### 3. Preview Live

Changes appear instantly in the live preview:
- Desktop view
- Tablet view
- Mobile view

Switch pages:
- Home
- Documentation
- Search Results

#### 4. Export Theme

Click **"Export CSS"** (code icon) to:
- Copy CSS to clipboard
- Download `theme-{color}-{mode}.css`
- Use in your `/customer-theme/` directory

#### 5. Version Control

- Click **"Save version"** to create snapshots
- Use **"Undo/Redo"** to navigate changes
- Click **"Reset to Default"** to start over (creates history entry)

---

## Accessibility

### WCAG Compliance

**Our Guarantee:**
- All Radix color scales meet WCAG AA (4.5:1 minimum)
- Most meet WCAG AAA (7:1 minimum)
- Steps 11-12 are **guaranteed accessible** for text

### Testing Your Theme

1. Go to `/admin/validator.html`
2. Click **"Run All Tests"**
3. Review results:
   - **Pass (Green)** - Meets WCAG AA or AAA
   - **Warn (Amber)** - Passes for large text only
   - **Fail (Red)** - Does not meet minimum standards

### Accessibility Rules

**Always:**
- Use steps 11-12 for text on dark backgrounds
- Use steps 11-12 for text on colored backgrounds
- Test contrast ratios before deploying
- Consider color blindness (Radix handles this)
- Provide text alternatives for color-coded information

**Never:**
- Use steps 1-9 for text (except large headings on neutral backgrounds)
- Rely on color alone to convey information
- Skip validation
- Deploy with failing tests

---

## Deployment

### Development Environment

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Access at http://localhost:8080
```

### Production Build

```bash
# Build optimized version
npm run build

# Output to /dist/
```

### Environment-Specific Themes

Create separate CSS files for each environment:

```
/customer-theme/
├── theme.dev.css       ← Development (verbose comments)
├── theme.staging.css   ← Staging (mirror production)
└── theme.prod.css      ← Production (minified)
```

Load via environment variable:
```html
<link rel="stylesheet" href="/customer-theme/theme.{{ ENV }}.css">
```

### CI/CD Integration

```yaml
# .github/workflows/deploy.yml
name: Deploy Documentation Portal

on:
  push:
    branches: [main]

jobs:
  validate-theme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Theme Validator
        run: npm run validate-theme
      - name: Check Accessibility
        run: npm run a11y-test
  
  deploy:
    needs: validate-theme
    runs-on: ubuntu-latest
    steps:
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

---

## Troubleshooting

### Colors Not Applying

**Symptom:** Theme changes don't appear in preview

**Solutions:**
1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear browser cache
3. Check console for CSS errors
4. Verify variable names match exactly
5. Ensure theme.css loads **after** core styles

### Fonts Not Loading

**Symptom:** Custom fonts don't display

**Solutions:**
1. Verify font files exist in `/customer-theme/assets/fonts/`
2. Check `@font-face` declarations in theme.css
3. Confirm CORS headers allow font loading
4. Test font URLs directly in browser
5. Use fallback fonts: `'YourFont', system-ui, sans-serif`

### Contrast Issues

**Symptom:** Text hard to read

**Solutions:**
1. Run Theme Validator (`/admin/validator.html`)
2. Use steps 11-12 for all text
3. Avoid using decorative colors for body text
4. Increase font weight if needed
5. Test with actual content, not Lorem Ipsum

### Gradients Not Showing

**Symptom:** Product cards show solid colors

**Solutions:**
1. Check gradient toggle in Theme Editor
2. Verify `useGradients: true` in config
3. Ensure `linear-gradient()` syntax is correct
4. Check browser support (gradients work in all modern browsers)
5. Clear cache and reload

### Updates Break Customizations

**Symptom:** Vendor update overwrites your theme

**Solutions:**
1. **Never modify `/core/` or `/production-templates/` directly**
2. Keep all customizations in `/customer-theme/`
3. Use Git to track your theme directory
4. Export theme before updating
5. Contact support if separation isn't working

---

## Support

### Resources

- **Admin Dashboard:** `http://your-portal.com/admin/`
- **Theme Editor:** `http://your-portal.com/admin/theme.html`
- **Validator:** `http://your-portal.com/admin/validator.html`
- **Radix Colors:** https://www.radix-ui.com/colors
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/

### Getting Help

**Vendor Support:**
- Email: support@ingeniux.com
- Documentation: https://support.ingeniux.com
- Community: https://community.ingeniux.com

**Before Contacting Support:**
1. Run the Theme Validator
2. Export your current theme CSS
3. Check browser console for errors
4. Try resetting to default theme
5. Test in incognito/private mode

---

## Advanced Topics

### Custom CSS Overrides

If you need CSS beyond what the Admin UI provides, create:

**File:** `/customer-theme/custom.css`

```css
/**
 * Custom CSS Overrides
 * Company: Your Company Name
 * Last Updated: YYYY-MM-DD
 */

/* Example: Larger product card headers */
.product-card h3 {
  font-size: 1.75rem;
  letter-spacing: -0.02em;
}

/* Example: Custom button style */
.btn-custom {
  background: var(--color-primary-9);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
}

.btn-custom:hover {
  background: var(--color-primary-10);
}

/* Always use CSS variables, never hardcoded colors! */
```

### Performance Optimization

**Tips:**
1. **Minimize Custom CSS** - Use variables instead of overrides
2. **Compress Assets** - Use SVG logos, optimize images
3. **Lazy Load Fonts** - Use `font-display: swap`
4. **Cache Strategy** - Set long cache headers for theme.css
5. **CDN Delivery** - Serve static assets from CDN

### Multi-Brand Support

For companies with multiple brands:

```
/customer-theme/
├── /brand-a/
│   ├── theme.css
│   ├── logo.svg
│   └── theme.json
│
├── /brand-b/
│   ├── theme.css
│   ├── logo.svg
│   └── theme.json
│
└── /brand-c/
    ├── theme.css
    ├── logo.svg
    └── theme.json
```

Load dynamically based on subdomain or URL parameter.

---

## Changelog

### Version 1.0.0 (October 31, 2025)

**Features:**
- ✅ Theme Editor with live preview
- ✅ 6 preset themes (Radix colors)
- ✅ Gradient toggle
- ✅ CSS variable export
- ✅ Theme validator (WCAG compliance)
- ✅ Undo/Redo/Reset functionality
- ✅ Version history and snapshots
- ✅ Light/Dark mode support
- ✅ Accessibility-first design
- ✅ Enterprise-grade architecture

**Upcoming:**
- ⏳ Custom theme builder (Radix-style)
- ⏳ Font upload and management
- ⏳ Logo upload via UI
- ⏳ A/B testing for themes
- ⏳ Analytics integration
- ⏳ Multi-brand management

---

## Examples

### Example 1: Financial Services Company

**Brand:** Conservative, trustworthy

**Theme Choice:** Blue  
**Customizations:**
- Primary: `blue`
- Accent: `cyan`
- Gradients: `false` (solid colors only)
- Fonts: `Inter` (professional)

**Result:** Clean, corporate aesthetic that builds trust

### Example 2: Tech Startup

**Brand:** Innovative, energetic

**Theme Choice:** Violet  
**Customizations:**
- Primary: `violet`
- Accent: `iris`
- Gradients: `true` (vibrant cards)
- Fonts: `Geist` (modern)

**Result:** Fresh, dynamic look that stands out

### Example 3: Environmental Organization

**Brand:** Natural, sustainable

**Theme Choice:** Green  
**Customizations:**
- Primary: `green`
- Accent: `teal`
- Gradients: `true`
- Custom: Earth-tone photography

**Result:** Warm, natural aesthetic aligned with mission

---

## Glossary

**Radix Colors** - Accessible color system with 32 colors and 12-step scales  
**CSS Custom Properties** - Variables in CSS (e.g., `var(--color-primary-9)`)  
**WCAG** - Web Content Accessibility Guidelines  
**Contrast Ratio** - Measure of text/background color difference  
**Semantic Variables** - Human-readable variable names (e.g., `--text-primary`)  
**Color Scale** - 12 shades of a color from light to dark  
**Theme Preset** - Pre-configured color combination  
**Gradient** - Smooth color transition (e.g., purple to blue)  

---

## License & Terms

This customization guide is provided for enterprise customers of Discover CX Documentation Portal.

**You may:**
- Customize your portal's theme
- Export and modify CSS variables
- Add custom CSS overrides
- Use for internal or external documentation

**You may not:**
- Redistribute the core templates
- Remove vendor attribution
- Modify licensing information
- Share exported themes publicly (brand-specific)

---

**Questions?** Contact support@ingeniux.com  
**Updates?** Check https://support.ingeniux.com/docs/portal-customization

---

*Last reviewed: October 31, 2025*  
*Document version: 1.0.0*

