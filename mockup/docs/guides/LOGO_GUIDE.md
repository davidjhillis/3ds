# Logo Treatment Guide

## ✅ Consistent Logo Across All Pages

I've applied the same logo treatment to all pages:

### Logo Component:
```html
<a href="index.html" class="flex items-center gap-3 font-bold text-lg hover:opacity-80">
  <div class="w-8 h-8 bg-purple-600 rounded"></div>
  <span class="text-gray-900 dark:text-white">Ingeniux Docs</span>
</a>
```

### Visual:
```
┌────┐
│ 🟣 │ Ingeniux Docs
└────┘
Purple   Brand name
square
```

---

## 🎨 Logo Specifications

### Icon (Square):
- **Size**: 32x32px (`w-8 h-8`)
- **Color**: Purple 600 (`bg-purple-600`)
- **Shape**: Rounded square (`rounded`)
- **Purpose**: Simple, recognizable brand mark

### Text:
- **Font**: Inter
- **Weight**: Bold (`font-bold`)
- **Size**: 18px (`text-lg`)
- **Color**: Dark in light mode, white in dark mode
- **Copy**: "Ingeniux Docs"

### Spacing:
- **Gap**: 12px between icon and text (`gap-3`)

### Hover State:
- **Effect**: Slight fade (`hover:opacity-80`)
- **Transition**: Smooth

---

## 📐 Variations (For Different Contexts)

### Option 1: Full Logo (Current)
```html
<a href="index.html" class="flex items-center gap-3 font-bold text-lg hover:opacity-80">
  <div class="w-8 h-8 bg-purple-600 rounded"></div>
  <span class="text-gray-900 dark:text-white">Ingeniux Docs</span>
</a>
```
**Use**: Header, prominent placement

### Option 2: Icon Only
```html
<div class="w-8 h-8 bg-purple-600 rounded"></div>
```
**Use**: Mobile menu, tight spaces, favicons

### Option 3: With Subtitle
```html
<a href="index.html" class="flex items-center gap-3">
  <div class="w-8 h-8 bg-purple-600 rounded"></div>
  <div class="flex flex-col leading-tight">
    <span class="font-bold text-lg text-gray-900 dark:text-white">Ingeniux</span>
    <span class="text-xs text-gray-600 dark:text-gray-400">Product Documentation</span>
  </div>
</a>
```
**Use**: Footer, marketing pages

### Option 4: Larger (Hero)
```html
<div class="flex items-center gap-4">
  <div class="w-12 h-12 bg-purple-600 rounded-lg"></div>
  <span class="font-bold text-2xl text-gray-900 dark:text-white">Ingeniux Docs</span>
</div>
```
**Use**: Hero sections, landing pages

---

## 🎨 Color Customization (Theme Builder Ready)

### Current:
```html
<div class="w-8 h-8 bg-purple-600 rounded"></div>
```

### With CSS Variable (For theme builder):
```html
<div class="w-8 h-8 rounded" style="background-color: var(--brand-primary, #9333ea)"></div>
```

### Or with Tailwind dynamic:
```html
<div class="w-8 h-8 rounded logo-icon"></div>

<!-- In CSS -->
.logo-icon {
  background-color: var(--brand-primary, #9333ea);
}
```

---

## 📁 Files Updated

✅ **index.html** - Logo treatment applied  
✅ **doc-page.html** - Logo treatment applied  
✅ **Both** - Lucide icons added  
✅ **Both** - Consistent navigation  

---

## 🔄 For Future Pages

When creating new pages, copy this header structure:

```html
<header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex items-center justify-between h-16">
      
      <!-- Logo -->
      <a href="index.html" class="flex items-center gap-3 font-bold text-lg hover:opacity-80">
        <div class="w-8 h-8 bg-purple-600 rounded"></div>
        <span class="text-gray-900 dark:text-white">Ingeniux Docs</span>
      </a>
      
      <!-- Nav -->
      <nav class="hidden md:flex items-center gap-6">
        <a href="index.html#products">Products</a>
        <a href="doc-page.html">Guides</a>
        <a href="#">API Reference</a>
        <a href="index.html#support">Support</a>
      </nav>
      
      <!-- Dark Mode -->
      <div class="flex items-center gap-3">
        <button id="dark-mode-toggle" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <i data-lucide="moon" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Don't forget to initialize Lucide at end of page -->
<script>
  lucide.createIcons();
</script>
```

---

## ✅ Checklist

When adding logo to new pages:
- [ ] Copy header HTML structure
- [ ] Ensure `href="index.html"` points to home
- [ ] Include Lucide CDN in `<head>`
- [ ] Initialize icons before `</body>`
- [ ] Test dark mode toggle
- [ ] Verify navigation links work

---

**Status**: Logo treatment now consistent across all pages!  
**Icon Library**: Lucide Icons (https://lucide.dev)  
**Ready**: Yes - all pages have matching headers

