# Semantic Color Tokens Architecture

## Overview

The DCX template system now uses **semantic color tokens** instead of hardcoded color names. This provides a stable, maintainable foundation for enterprise customers.

---

## The Three Color Scales

All templates use three semantic color scales:

| Token | Purpose | Examples |
|-------|---------|----------|
| `primary` | Brand colors, main UI elements | Buttons, links, hero sections |
| `accent` | Secondary highlights, accents | Badges, hover states, decorative elements |
| `neutral` | Backgrounds, text, borders | Page backgrounds, body text, dividers |

Each scale has 11 shades: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`

---

## How It Works

### 1. Templates Use Semantic Classes

```html
<!-- ✅ GOOD: Semantic, stable -->
<button class="bg-primary-600 hover:bg-primary-700 text-white">
  Click Me
</button>

<div class="bg-neutral-50 dark:bg-neutral-900">
  <p class="text-neutral-900 dark:text-neutral-50">Hello World</p>
</div>

<!-- ❌ BAD: Hardcoded colors -->
<button class="bg-purple-600 hover:bg-purple-700">
  Click Me
</button>
```

### 2. Tailwind Config Maps to CSS Variables

In every template's `<head>`:

```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50))',
          100: 'rgb(var(--color-primary-100))',
          // ... 200-900
          950: 'rgb(var(--color-primary-950))',
        },
        accent: { /* same pattern */ },
        neutral: { /* same pattern */ }
      }
    }
  }
}
```

### 3. CSS Variables Define Actual Colors

```css
:root {
  /* RGB format (space-separated, no rgb() wrapper) */
  --color-primary-50: 250 245 255;
  --color-primary-600: 147 51 234;
  --color-primary-900: 76 29 149;
  
  --color-accent-50: 239 246 255;
  --color-accent-600: 79 70 229;
  
  --color-neutral-50: 249 250 251;
  --color-neutral-900: 17 24 39;
}
```

---

## Theme Customization

### Theme Editor Workflow

1. Customer selects colors from Tailwind palette (or custom)
2. Theme editor generates CSS variables in RGB format
3. Customer clicks "Save Theme"
4. CSS variables are exported (no template changes!)

### Example Export

```css
/**
 * Custom Theme - Light Mode
 * Generated: 2025-11-01
 * Primary: Blue
 * Accent: Orange
 * Neutral: Slate
 */

:root {
  /* Primary (Blue) */
  --color-primary-50: 239 246 255;
  --color-primary-600: 37 99 235;
  --color-primary-900: 30 58 138;
  
  /* Accent (Orange) */
  --color-accent-50: 255 247 237;
  --color-accent-600: 234 88 12;
  --color-accent-900: 124 45 18;
  
  /* Neutral (Slate) */
  --color-neutral-50: 248 250 252;
  --color-neutral-900: 15 23 42;
}
```

---

## Benefits for Enterprise Customers

### 1. Template Updates Don't Break Themes
- We ship: "Updated navigation layout"
- Customer gets: New layout + their theme colors ✅
- Template always uses `bg-primary-600`
- Customer's theme defines what "primary" means

### 2. Clear Customization Contract
**Documentation:** "Customize 3 color scales, everything else stays compatible"

Customers know:
- Change primary → Updates buttons, links, hero sections
- Change accent → Updates badges, highlights
- Change neutral → Updates backgrounds, text

### 3. Future-Proof
- Want to change default from purple to blue? Update CSS variables, not templates
- Want to add a 4th color scale? Just extend the config
- Want to support design tokens JSON? Already halfway there!

### 4. No CSS Override Spaghetti
**Before:** 195 lines of CSS overrides mapping purple→primary
**After:** Direct Tailwind config mapping (0 override lines!)

---

## Color Usage Guide

### Light Mode vs Dark Mode

```html
<!-- Page background -->
<body class="bg-neutral-50 dark:bg-neutral-900">

<!-- Card -->
<div class="bg-neutral-50 dark:bg-neutral-800">
  <!-- Text (dark in light mode, light in dark mode) -->
  <h1 class="text-neutral-900 dark:text-neutral-50">
    Heading
  </h1>
  <p class="text-neutral-700 dark:text-neutral-300">
    Body text
  </p>
</div>

<!-- Primary button -->
<button class="bg-primary-600 hover:bg-primary-700 text-white">
  Action
</button>

<!-- Accent badge -->
<span class="bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300">
  New
</span>
```

### Semantic Mapping

| Use Case | Light Mode | Dark Mode | Rationale |
|----------|------------|-----------|-----------|
| Page background | `neutral-50` | `neutral-900` | Lightest/darkest |
| Card background | `neutral-50` or `neutral-100` | `neutral-800` | Elevated surface |
| Body text | `neutral-700` or `neutral-900` | `neutral-300` or `neutral-50` | Readable contrast |
| Subtle text | `neutral-600` | `neutral-400` | Lower emphasis |
| Primary action | `primary-600` | `primary-600` | Same in both modes |
| Hover state | `primary-700` | `primary-500` | Darker/lighter |

---

## Migration from Hardcoded Colors

If you have old templates with hardcoded colors:

```bash
# Find instances
grep -r "bg-purple\|text-purple\|bg-indigo\|text-indigo" *.html

# Replace (use sed or find/replace)
purple → primary
indigo → accent  
gray/white/black → neutral
```

**Specific mappings:**
- `bg-white` → `bg-neutral-50`
- `bg-gray-50` → `bg-neutral-100`
- `bg-gray-900` → `bg-neutral-900`
- `bg-black` → `bg-neutral-950`
- `text-white` → stays `text-white` (for dark mode contrast)

---

## Advanced: Design Tokens

### Current Format (CSS Variables)
```css
--color-primary-600: 147 51 234;
```

### Future Format (Design Tokens JSON)
```json
{
  "color": {
    "primary": {
      "50": { "value": "250 245 255" },
      "600": { "value": "147 51 234" }
    }
  }
}
```

**Build process:** JSON → CSS variables (via Style Dictionary or similar)

---

## Troubleshooting

### Colors Not Appearing
1. Check Tailwind config includes semantic color mappings
2. Verify CSS variables are defined in RGB format (no `#` or `rgb()`)
3. Ensure `rgb(var(--color-primary-600))` format in Tailwind config

### Wrong Colors in Dark Mode
1. Check dark mode class is applied: `<html class="dark">`
2. Use `dark:` prefixes: `dark:bg-neutral-900`
3. Dark mode should use lighter text, darker backgrounds

### Theme Not Saving
1. Check localStorage permissions
2. Verify `hexToRGB()` function is working
3. Check browser console for errors

---

## Developer Notes

### RGB Format Requirement
Tailwind requires RGB values (space-separated) for opacity modifiers:

```html
<!-- This works: -->
<div class="bg-primary-600/50">  <!-- 50% opacity -->
  
<!-- CSS variable must be RGB: -->
--color-primary-600: 147 51 234;  ✅

<!-- NOT hex: -->
--color-primary-600: #9333ea;     ❌
```

### Why rgb() Wrapper in Config
```javascript
// Tailwind config wraps with rgb():
'600': 'rgb(var(--color-primary-600))'

// This generates CSS:
.bg-primary-600 {
  background-color: rgb(147 51 234);
}

// Opacity modifiers work:
.bg-primary-600/50 {
  background-color: rgb(147 51 234 / 0.5);
}
```

---

## Version History

### v2.0 - Semantic Tokens (Nov 2025)
- Migrated to semantic color tokens
- Removed CSS override rules
- RGB format for CSS variables
- Direct Tailwind config mapping

### v1.0 - CSS Overrides (Oct 2025)
- Hardcoded color names (purple/indigo/gray)
- 195 lines of CSS overrides
- Hex format CSS variables

---

## Resources

- [Tailwind CSS Color Customization](https://tailwindcss.com/docs/customizing-colors)
- [CSS Custom Properties (Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/) (Token transformer)

---

**Questions?** This architecture was designed for enterprise scalability. Contact the team for support or customization requests.

