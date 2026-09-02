# JSON Token-Based Theming System

## Overview

This system uses **design tokens** (defined in `theme.json`) to create a flexible, maintainable theming architecture for DCX Documentation templates.

## Architecture

```
theme.json (Design Tokens)
    ↓
token-engine.js (Processor)
    ↓
CSS Variables (Runtime)
    ↓
Tailwind Config + Templates
```

## Files

### Core Files

- **`theme.json`** - Single source of truth for all design tokens
- **`admin/assets/token-engine.js`** - JavaScript engine that processes tokens
- **`presets/*.json`** - Curated theme presets (slate, purple, teal)

### Templates

- **`index-tokens.html`** - Example template using token system
- **`admin/preview-templates/*.html`** - Preview templates (to be updated)

## Quick Start

### 1. Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="admin/assets/token-engine.js"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              500: 'rgb(var(--color-brand-primary-500))'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-white dark:bg-neutral-950">
  <div class="bg-primary-500 text-white p-4">
    Uses token system!
  </div>
</body>
</html>
```

### 2. Change Theme Mode

```javascript
// Switch to dark mode
window.themeEngine.setMode('dark');

// Switch to light mode
window.themeEngine.setMode('light');
```

### 3. Load a Preset

```javascript
// Load slate preset
const response = await fetch('presets/slate.json');
const presetData = await response.json();

// Merge with base theme
const baseResponse = await fetch('theme.json');
const baseTheme = await baseResponse.json();
baseTheme.tokens.color.brand = presetData.tokens.color.brand;

window.themeEngine.loadTheme(baseTheme);
```

### 4. Update Individual Tokens

```javascript
// Change primary color
window.themeEngine.updateToken('color.brand.primary.500', '#FF0000');

// Batch update
window.themeEngine.batchUpdate({
  'color.brand.primary.500': '#FF0000',
  'color.brand.accent.500': '#00FF00'
});
```

## Token Structure

### Color Tokens

```json
{
  "tokens": {
    "color": {
      "brand": {
        "primary": {
          "500": { "value": "#6366F1", "type": "color" }
        }
      },
      "semantic": {
        "background": {
          "primary": { "value": "{color.brand.neutral.50}", "type": "color" }
        }
      }
    }
  }
}
```

**Key Concepts:**

- **Brand Colors**: Raw color values (primary, accent, neutral)
- **Semantic Colors**: Purpose-based (background, text, border)
- **Token References**: Use `{path.to.token}` to reference other tokens

### Spacing Tokens

```json
{
  "spacing": {
    "layout": {
      "header-height": { "value": "70px", "type": "dimension" }
    }
  }
}
```

### Typography Tokens

```json
{
  "typography": {
    "font-family": {
      "sans": { "value": "Inter, sans-serif", "type": "fontFamily" }
    },
    "font-size": {
      "lg": { "value": "1.125rem", "type": "dimension" }
    }
  }
}
```

## Dark Mode

Dark mode overrides are defined in `modes.dark`:

```json
{
  "modes": {
    "dark": {
      "color": {
        "semantic": {
          "background": {
            "primary": { "value": "#0D1117", "type": "color" }
          }
        }
      }
    }
  }
}
```

## Token Engine API

### Initialization

```javascript
const engine = new TokenEngine(themeJSON);
engine.setMode('light');
engine.injectIntoDOM();
```

### Methods

| Method | Description |
|--------|-------------|
| `setMode(mode)` | Set 'light' or 'dark' mode |
| `injectIntoDOM()` | Apply tokens to document |
| `loadTheme(themeJSON)` | Load new theme |
| `mergeTheme(partial)` | Merge partial theme |
| `updateToken(path, value)` | Update single token |
| `batchUpdate(updates)` | Update multiple tokens |
| `getToken(path)` | Get token value |
| `exportJSON()` | Export as JSON |
| `exportCSS()` | Export as CSS file |
| `exportTailwindConfig()` | Export as Tailwind config |
| `saveToLocalStorage(key)` | Save to localStorage |
| `loadFromLocalStorage(key)` | Load from localStorage |

### Events

```javascript
// Listen for engine ready
window.addEventListener('themeEngineReady', (e) => {
  const engine = e.detail.engine;
  console.log('Engine ready!', engine);
});
```

## Creating Custom Presets

1. Create a new JSON file in `presets/`:

```json
{
  "name": "My Custom Theme",
  "description": "Custom color palette",
  "tokens": {
    "color": {
      "brand": {
        "primary": {
          "500": { "value": "#YOUR_COLOR", "type": "color" }
        }
      }
    }
  }
}
```

2. Load it:

```javascript
const response = await fetch('presets/my-custom.json');
const preset = await response.json();
window.themeEngine.mergeTheme(preset);
```

## Exporting Themes

### Export as JSON

```javascript
const json = window.themeEngine.exportJSON();
downloadFile('theme.json', json);
```

### Export as CSS

```javascript
const css = window.themeEngine.exportCSS();
downloadFile('theme.css', css);
```

### Export as Tailwind Config

```javascript
const config = window.themeEngine.exportTailwindConfig();
downloadFile('tailwind.config.js', config);
```

## Best Practices

1. **Use Semantic Tokens**: Prefer `background.primary` over direct color values
2. **Reference Brand Colors**: Use `{color.brand.primary.500}` in semantic tokens
3. **Test Dark Mode**: Always verify both light and dark modes
4. **Document Custom Tokens**: Add `"description"` fields to tokens
5. **Version Your Themes**: Include `"version"` in theme.json

## Migration Guide

### From Hardcoded Colors

**Before:**
```html
<div class="bg-indigo-600">
```

**After:**
```html
<div class="bg-primary-600">
```

### From CSS Variables

**Before:**
```css
:root {
  --primary-color: #6366F1;
}
```

**After:**
```json
{
  "color": {
    "brand": {
      "primary": {
        "500": { "value": "#6366F1", "type": "color" }
      }
    }
  }
}
```

## Troubleshooting

### Tokens Not Applying

1. Check browser console for errors
2. Verify `theme.json` is valid JSON
3. Ensure `token-engine.js` loads before Tailwind config
4. Check CSS variable names match Tailwind config

### Dark Mode Not Working

1. Verify `:root.dark` class is applied to `<html>`
2. Check `modes.dark` overrides in theme.json
3. Ensure Tailwind config has `darkMode: 'class'`

### Performance Issues

1. Use `batchUpdate()` instead of multiple `updateToken()` calls
2. Cache resolved tokens in your application
3. Consider using CSS file export for production

## Next Steps

- [ ] Build visual theme editor UI
- [ ] Add color contrast validation
- [ ] Create theme gallery
- [ ] Add TypeScript definitions
- [ ] Build CLI tool for theme generation

## Support

For questions or issues, see the main project README or create an issue in the repository.
