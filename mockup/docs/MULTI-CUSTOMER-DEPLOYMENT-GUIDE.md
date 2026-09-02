# Multi-Customer Theme System - Deployment Guide

## Overview

This system enables **Fluid Topics-style multi-tenant documentation portals** where each customer gets their own branded experience while you maintain a single set of base templates.

## Architecture

```
┌──────────────────────────────────────────────────────┐
│  Admin: Theme Builder (admin/theme.html)             │
│  - Visual customization interface                    │
│  - Export customer theme as JSON                     │
└──────────────────────────────────────────────────────┘
                    ↓ Exports
┌──────────────────────────────────────────────────────┐
│  Customer Theme (themes/acme-corp.json)              │
│  {                                                    │
│    "colors": { "primary": "indigo", ... },          │
│    "typography": { "heading": "Inter", ... },       │
│    "branding": { "logo": "acme-logo.svg" }          │
│  }                                                    │
└──────────────────────────────────────────────────────┘
                    ↓ Loaded by
┌──────────────────────────────────────────────────────┐
│  Base Templates (index.html, doc-page.html)          │
│  - Use semantic classes: bg-primary-600              │
│  - Load customer-theme-loader.js                     │
│  - Auto-apply customer branding                      │
└──────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Create Customer Theme

#### Option A: Using Theme Builder (Visual)

1. Open `admin/theme.html` in browser
2. Customize colors, typography, settings
3. Add this code to theme.html (see `theme-export-enhancement.js`):

```javascript
function exportThemeJSON() {
  const customerName = prompt('Enter customer name:');
  const customerId = customerName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const theme = {
    version: '1.0.0',
    name: `${customerName} Theme`,
    customer: customerId,
    colors: {
      primary: currentState.primary,
      accent: currentState.accent,
      neutral: currentState.neutral
    },
    settings: {
      darkMode: currentState.mode === 'dark'
    }
  };

  // Download JSON file
  const blob = new Blob([JSON.stringify(theme, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${customerId}-theme.json`;
  a.click();
}
```

4. Click "Export Customer Theme" button
5. Save `acme-corp-theme.json` to `themes/` folder

#### Option B: Manual JSON Creation

Create `themes/acme-corp.json`:

```json
{
  "version": "1.0.0",
  "name": "Acme Corp Theme",
  "customer": "acme-corp",
  "colors": {
    "primary": "blue",
    "accent": "cyan",
    "neutral": "slate"
  },
  "typography": {
    "heading": "Inter",
    "body": "Inter"
  },
  "branding": {
    "logo": "acme-logo.svg",
    "logoWhite": "acme-logo-white.svg"
  },
  "settings": {
    "darkMode": false,
    "useGradients": true
  }
}
```

### 2. Update Templates

Convert existing templates to be theme-aware:

**Replace** this in your HTML `<head>`:

```html
<!-- OLD (hardcoded theme) -->
<script src="admin/assets/theme-loader.js"></script>
```

**With** this:

```html
<!-- NEW (customer-aware theme) -->
<script src="admin/assets/customer-theme-loader.js"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            500: 'rgb(var(--color-primary-500))',
            600: 'rgb(var(--color-primary-600))',
            // ... other shades
          }
        }
      }
    }
  }
</script>
```

**Add** logo data attribute:

```html
<!-- OLD -->
<img src="admin/assets/discover-cx-logo.svg" alt="Logo">

<!-- NEW -->
<img data-dcx-logo src="admin/assets/discover-cx-logo.svg" alt="Logo">
```

### 3. Deploy

Choose your deployment model:

---

## Deployment Models

### Option 1: Subdomain-Based (Recommended)

**Best for:** SaaS platforms with many customers

```
acme-corp.docs.yoursite.com  → loads themes/acme-corp.json
global-inc.docs.yoursite.com → loads themes/global-inc.json
```

**Configuration:**

```javascript
// customer-theme-loader.js auto-detects from hostname
const hostname = window.location.hostname; // "acme-corp.docs.yoursite.com"
const customerId = hostname.split('.')[0]; // "acme-corp"
```

**Deployment:**
- Single codebase
- DNS CNAME per customer: `acme-corp.docs.yoursite.com` → `docs.yoursite.com`
- Theme files in `/themes/` folder
- Logos in `/assets/logos/` folder

**Pros:**
- Clean URLs
- Easy customer isolation
- Scalable to 1000s of customers

**Cons:**
- Requires DNS/subdomain setup
- SSL certificate management (use wildcard: `*.docs.yoursite.com`)

---

### Option 2: Path-Based

**Best for:** Fewer customers, simpler setup

```
docs.yoursite.com/acme-corp/  → loads themes/acme-corp.json
docs.yoursite.com/global-inc/ → loads themes/global-inc.json
```

**Configuration:**

```javascript
// In customer-theme-loader.js
const pathParts = window.location.pathname.split('/').filter(p => p);
const customerId = pathParts[0]; // "acme-corp"
```

**Deployment:**
- Single deployment
- No DNS changes needed
- Path rewrite rules in web server

**Nginx example:**

```nginx
location ~ ^/([a-z0-9-]+)/ {
  try_files $uri $uri/ /index.html;
}
```

**Pros:**
- Simpler setup
- No DNS/SSL complexity

**Cons:**
- Less clean URLs
- Path conflicts possible

---

### Option 3: Query Parameter

**Best for:** Testing, development

```
docs.yoursite.com?customer=acme-corp  → loads themes/acme-corp.json
docs.yoursite.com?customer=global-inc → loads themes/global-inc.json
```

**Configuration:**

```javascript
// Auto-detected by customer-theme-loader.js
const params = new URLSearchParams(window.location.search);
const customerId = params.get('customer');
```

**Pros:**
- Easiest for testing
- No server configuration

**Cons:**
- Ugly URLs
- Not production-ready

---

### Option 4: Database-Backed (Advanced)

**Best for:** Dynamic multi-tenancy, hundreds of customers

```javascript
// Replace static JSON loading with API call
fetch(`/api/tenants/${customerId}/theme`)
  .then(r => r.json())
  .then(theme => DCXThemeLoader.applyTheme(theme));
```

**Backend (Node.js example):**

```javascript
app.get('/api/tenants/:id/theme', async (req, res) => {
  const theme = await db.themes.findOne({ customerId: req.params.id });
  res.json(theme);
});
```

**Pros:**
- Centralized theme management
- Real-time updates
- Admin UI can save directly to database

**Cons:**
- Requires backend infrastructure
- More complex deployment

---

## File Structure

```
dcx-portal-templates/
│
├── themes/                       # Customer theme files
│   ├── default.json              # Fallback theme
│   ├── acme-corp.json
│   ├── global-inc.json
│   └── tech-startup.json
│
├── templates/                     # Base templates (maintain these)
│   ├── index-customer.html       # Theme-aware home
│   ├── doc-page.html
│   ├── search.html
│   └── user-profile.html
│
├── admin/
│   ├── theme.html                # Visual customization builder
│   └── assets/
│       ├── customer-theme-loader.js  # Theme loader engine
│       └── theme-export-enhancement.js  # Export functionality
│
└── assets/
    ├── logos/                    # Customer logos
    │   ├── acme-logo.svg
    │   ├── acme-logo-white.svg
    │   └── ...
    └── favicons/
        ├── acme-favicon.ico
        └── ...
```

---

## Customization Workflow

### For Customers:

1. **Receive access** to theme builder: `admin/theme.html`
2. **Customize** colors, fonts, upload logo
3. **Preview** live changes in real-time
4. **Export** theme as `customer-theme.json`
5. **Send** JSON file to you for deployment

### For You (Admin):

1. **Receive** customer theme JSON
2. **Save** to `themes/acme-corp.json`
3. **Upload** customer logo to `assets/logos/`
4. **Deploy** (no template changes needed!)
5. **Notify** customer: `acme-corp.docs.yoursite.com` is live

---

## Template Updates

### The Magic: Templates Stay Independent

**Scenario:** You release new feature - better search UI

**Old way (manual per-customer):**
```
✗ Update acme-corp/search.html
✗ Update global-inc/search.html
✗ Update tech-startup/search.html
✗ ... for 100 customers
```

**New way (single update):**
```
✓ Update templates/search.html once
✓ All customers get new feature
✓ Branding automatically preserved via themes/*.json
```

**Why it works:**
- Templates use semantic classes: `bg-primary-600`
- Theme loader injects customer colors: `--color-primary-600: 37 99 235`
- Tailwind compiles: `rgb(var(--color-primary-600))` → customer blue

---

## Testing

### Local Development

1. Start dev server:
```bash
python3 -m http.server 3000
```

2. Test different customers:
```
http://localhost:3000/index-customer.html?customer=default
http://localhost:3000/index-customer.html?customer=acme-corp
http://localhost:3000/index-customer.html?customer=global-inc
```

3. Verify:
- ✓ Colors change per customer
- ✓ Logo updates
- ✓ Dark mode works
- ✓ Typography applies

### Create Test Themes

Copy `themes/default.json` to test different looks:

```bash
# Create test themes
cp themes/default.json themes/acme-corp.json
cp themes/default.json themes/global-inc.json

# Edit each to use different colors
# acme-corp.json: "primary": "blue"
# global-inc.json: "primary": "green"
```

---

## Production Checklist

Before deploying to production:

### Infrastructure

- [ ] Set up subdomains (if using Option 1)
- [ ] Configure SSL certificate (wildcard recommended)
- [ ] Set up CDN for static assets
- [ ] Configure web server rewrites (if using Option 2)

### Theme Files

- [ ] All customer themes in `themes/` folder
- [ ] All customer logos in `assets/logos/`
- [ ] Favicons uploaded
- [ ] Default theme exists as fallback

### Templates

- [ ] All templates load `customer-theme-loader.js`
- [ ] All templates use semantic color classes (`primary-*`, `accent-*`, `neutral-*`)
- [ ] Logo elements have `data-dcx-logo` attribute
- [ ] Tailwind config maps to CSS variables

### Testing

- [ ] Test each customer theme loads correctly
- [ ] Verify dark mode works
- [ ] Check mobile responsiveness
- [ ] Test with missing theme (fallback works)
- [ ] Verify logo loading
- [ ] Test cross-browser compatibility

---

## Troubleshooting

### Theme Not Loading

**Problem:** Page shows default colors, not customer theme

**Solutions:**
1. Check browser console for errors
2. Verify theme file exists: `themes/acme-corp.json`
3. Check JSON syntax (use validator)
4. Verify customer ID detection:
   ```javascript
   console.log(window.DCX_CUSTOMER_ID);
   ```

### Colors Not Applying

**Problem:** CSS variables exist but colors wrong

**Solutions:**
1. Check Tailwind color names: `indigo`, `blue`, `slate` (not `Indigo`)
2. Verify tailwind.config maps to CSS variables
3. Inspect element to see computed values
4. Clear browser cache

### Logo Not Updating

**Problem:** Logo stays default

**Solutions:**
1. Add `data-dcx-logo` attribute to `<img>` tag
2. Verify logo path in theme JSON
3. Check file exists in `admin/assets/`
4. Test with browser dev tools network tab

---

## Advanced Configuration

### Custom Customer Detection

Override auto-detection:

```javascript
// Before loading theme loader
window.DCX_CUSTOMER = 'acme-corp'; // Force specific customer
```

### Custom Theme Path

```javascript
window.DCX_THEME_PATH = 'https://cdn.yoursite.com/themes/acme-corp.json';
```

### Theme Loaded Event

Listen for theme application:

```javascript
window.addEventListener('dcx-theme-loaded', (e) => {
  const { theme, customerId } = e.detail;
  console.log('Theme loaded:', theme.name);

  // Custom logic here
  analytics.track('Theme Loaded', { customer: customerId });
});
```

---

## Migration from Current System

### Step 1: Test Side-by-Side

- Keep existing `theme-loader.js`
- Add new `customer-theme-loader.js`
- Create `index-customer.html` (test page)
- Verify functionality matches

### Step 2: Export Existing Themes

Use theme builder to export current customizations:

```javascript
// In admin/theme.html, add export button
exportThemeJSON(); // Downloads customer-theme.json
```

### Step 3: Convert One Template

- Copy `index.html` → `index-new.html`
- Replace theme loader
- Add Tailwind config
- Test thoroughly

### Step 4: Roll Out

- Convert remaining templates
- Update deployment
- Notify customers (no action needed on their end!)

---

## Support & Maintenance

### Adding New Customers

1. Customer customizes in theme builder
2. Export JSON: `new-customer.json`
3. Save to `themes/` folder
4. Upload logo to `assets/logos/`
5. Done! (No code changes)

### Updating Existing Themes

1. Load theme in builder
2. Make changes
3. Re-export JSON
4. Replace file in `themes/` folder
5. Changes apply immediately (may need cache clear)

### Template Updates

When you update base templates:

1. Test with 2-3 customer themes
2. Deploy new templates
3. No customer-specific changes needed
4. Themes automatically apply to new templates

---

## Next Steps

1. ✅ Set up theme builder enhancement
2. ✅ Create customer themes
3. ✅ Update templates to be theme-aware
4. [ ] Choose deployment model
5. [ ] Test with real customer data
6. [ ] Deploy to staging
7. [ ] Roll out to production

---

## Resources

- **Theme Builder:** `admin/theme.html`
- **Example Template:** `index-customer.html`
- **Theme Loader:** `admin/assets/customer-theme-loader.js`
- **Export Script:** `admin/assets/theme-export-enhancement.js`
- **Default Theme:** `themes/default.json`

For questions or issues, refer to this guide or create an issue in the repository.
