# Icon Library Guide - Lucide Icons

## ✅ **Recommended: Lucide Icons**

I've switched the site to **Lucide Icons** - a modern, clean icon library perfect for enterprise documentation.

**Library**: https://lucide.dev  
**CDN**: Already included in `index.html`  
**Icons**: 1000+ professional icons

---

## 🎨 Why Lucide?

### Pros:
✅ **Clean & Professional** - Perfect for enterprise  
✅ **1000+ icons** - Everything you need  
✅ **Consistent style** - All match perfectly  
✅ **Lightweight** - Only loads icons you use  
✅ **Easy syntax** - Simple `<i>` tags  
✅ **Free & Open Source** - No licensing issues  
✅ **Great docs** - Easy to find icons  

### Perfect for Documentation Because:
- Has all doc-related icons (book, file-text, code, search, etc.)
- Technical icons (terminal, code, cpu, database, etc.)
- UI icons (menu, x, chevron, arrow, etc.)
- Status icons (check, x-circle, alert-circle, info, etc.)

---

## 📖 How to Use

### Basic Syntax:
```html
<i data-lucide="icon-name"></i>
```

### With Tailwind Classes:
```html
<i data-lucide="search" class="w-6 h-6 text-gray-600"></i>
```

### Initialize (already added to index.html):
```html
<script>
  lucide.createIcons();
</script>
```

---

## 🎯 Icon Recommendations for Documentation

### Navigation Icons
```html
<!-- Search -->
<i data-lucide="search"></i>

<!-- Menu/Navigation -->
<i data-lucide="menu"></i>
<i data-lucide="x"></i>

<!-- Arrows -->
<i data-lucide="chevron-right"></i>
<i data-lucide="chevron-down"></i>
<i data-lucide="arrow-right"></i>

<!-- Home -->
<i data-lucide="home"></i>
```

### Product/Feature Icons
```html
<!-- CMS / Content -->
<i data-lucide="file-text"></i>
<i data-lucide="book-open"></i>
<i data-lucide="layout"></i>

<!-- Search -->
<i data-lucide="search"></i>
<i data-lucide="scan"></i>

<!-- AI / Smart Features -->
<i data-lucide="sparkles"></i>
<i data-lucide="brain"></i>
<i data-lucide="bot"></i>
<i data-lucide="wand-2"></i>

<!-- Analytics -->
<i data-lucide="bar-chart"></i>
<i data-lucide="trending-up"></i>
<i data-lucide="activity"></i>

<!-- Integrations -->
<i data-lucide="plug"></i>
<i data-lucide="link"></i>
<i data-lucide="git-branch"></i>
```

### Documentation Icons
```html
<!-- Code -->
<i data-lucide="code"></i>
<i data-lucide="code-2"></i>
<i data-lucide="terminal"></i>

<!-- Documentation -->
<i data-lucide="book"></i>
<i data-lucide="file-text"></i>
<i data-lucide="scroll-text"></i>

<!-- Guides -->
<i data-lucide="map"></i>
<i data-lucide="compass"></i>
<i data-lucide="route"></i>

<!-- Video/Media -->
<i data-lucide="play-circle"></i>
<i data-lucide="video"></i>
```

### Support Icons
```html
<!-- Help -->
<i data-lucide="help-circle"></i>
<i data-lucide="life-buoy"></i>
<i data-lucide="headphones"></i>

<!-- Community -->
<i data-lucide="users"></i>
<i data-lucide="message-circle"></i>
<i data-lucide="messages-square"></i>

<!-- Feedback -->
<i data-lucide="thumbs-up"></i>
<i data-lucide="thumbs-down"></i>
<i data-lucide="star"></i>
```

### Status Icons
```html
<!-- Success -->
<i data-lucide="check-circle"></i>
<i data-lucide="check"></i>

<!-- Warning -->
<i data-lucide="alert-triangle"></i>
<i data-lucide="alert-circle"></i>

<!-- Error -->
<i data-lucide="x-circle"></i>
<i data-lucide="alert-octagon"></i>

<!-- Info -->
<i data-lucide="info"></i>
<i data-lucide="lightbulb"></i>
```

### Settings/Config Icons
```html
<i data-lucide="settings"></i>
<i data-lucide="sliders"></i>
<i data-lucide="toggle-left"></i>
<i data-lucide="wrench"></i>
```

---

## 🎨 Icon Styling Examples

### Size Classes (Tailwind):
```html
<!-- Small (16px) -->
<i data-lucide="check" class="w-4 h-4"></i>

<!-- Medium (20px) - Most common -->
<i data-lucide="search" class="w-5 h-5"></i>

<!-- Large (24px) -->
<i data-lucide="code" class="w-6 h-6"></i>

<!-- Extra Large (32px) -->
<i data-lucide="sparkles" class="w-8 h-8"></i>
```

### Color Classes:
```html
<!-- Gray (neutral) -->
<i data-lucide="menu" class="w-5 h-5 text-gray-600"></i>

<!-- Brand colors -->
<i data-lucide="sparkles" class="w-6 h-6 text-purple-600"></i>
<i data-lucide="code" class="w-6 h-6 text-blue-600"></i>

<!-- Dark mode aware -->
<i data-lucide="sun" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
```

### With Animations:
```html
<!-- Rotate on hover -->
<i data-lucide="settings" class="w-5 h-5 hover:rotate-90 transition-transform"></i>

<!-- Translate on hover -->
<i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>

<!-- Scale on hover -->
<i data-lucide="external-link" class="w-4 h-4 hover:scale-110 transition-transform"></i>
```

---

## 📋 Icon Mapping for IGX Docs

### Current Page Icons Converted:

| Element | Icon | Lucide Code |
|---------|------|-------------|
| **Search bar** | Search | `<i data-lucide="search"></i>` |
| **Dark mode** | Moon/Sun | `<i data-lucide="moon"></i>` |
| **Product arrows** | Chevron Right | `<i data-lucide="chevron-right"></i>` |
| **Install task** | Plus | `<i data-lucide="plus"></i>` |
| **API task** | Code | `<i data-lucide="code-2"></i>` |
| **Integrations** | Plug | `<i data-lucide="plug"></i>` |
| **Troubleshooting** | Alert Triangle | `<i data-lucide="alert-triangle"></i>` |

---

## 🔧 Quick Reference: Best Icons for Each Section

### Product Cards (Headers):
```html
<!-- CMS -->
<i data-lucide="layout"></i>
<i data-lucide="file-stack"></i>

<!-- AI/Search -->
<i data-lucide="sparkles"></i>
<i data-lucide="brain"></i>
<i data-lucide="search"></i>

<!-- Analytics -->
<i data-lucide="bar-chart-3"></i>
<i data-lucide="trending-up"></i>
```

### Common Tasks:
```html
<!-- Setup -->
<i data-lucide="rocket"></i>
<i data-lucide="play-circle"></i>

<!-- Configuration -->
<i data-lucide="settings"></i>
<i data-lucide="sliders"></i>

<!-- Development -->
<i data-lucide="code-2"></i>
<i data-lucide="terminal"></i>

<!-- Deployment -->
<i data-lucide="upload-cloud"></i>
<i data-lucide="globe"></i>
```

### Getting Started:
```html
<!-- Step numbers with icons -->
<i data-lucide="circle-1"></i>  <!-- Not available, use numbers -->
<i data-lucide="play"></i>      <!-- Start -->
<i data-lucide="book-open"></i> <!-- Learn -->
<i data-lucide="rocket"></i>    <!-- Launch -->
```

### Support:
```html
<i data-lucide="life-buoy"></i>      <!-- Support -->
<i data-lucide="users"></i>          <!-- Community -->
<i data-lucide="message-square"></i> <!-- Chat -->
<i data-lucide="mail"></i>           <!-- Email -->
```

---

## 🎨 Icon Design Patterns

### Pattern 1: Icon + Text Links
```html
<a href="#" class="flex items-center gap-2">
  <i data-lucide="arrow-right" class="w-4 h-4"></i>
  <span>View documentation</span>
</a>
```

### Pattern 2: Icon Boxes (Like current design)
```html
<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
  <i data-lucide="sparkles" class="w-6 h-6 text-purple-600"></i>
</div>
```

### Pattern 3: Icon Buttons
```html
<button class="p-2 hover:bg-gray-100 rounded-lg">
  <i data-lucide="settings" class="w-5 h-5 text-gray-600"></i>
</button>
```

### Pattern 4: List Item Icons
```html
<ul>
  <li class="flex items-start gap-2">
    <i data-lucide="check" class="w-5 h-5 text-green-600 flex-shrink-0"></i>
    <span>Feature description</span>
  </li>
</ul>
```

---

## 🚀 How to Find Icons

### Browse the Library:
https://lucide.dev/icons

### Search by Category:
- **Documentation**: book, file-text, scroll-text, newspaper
- **Code**: code, code-2, terminal, braces
- **Navigation**: menu, x, chevron-*, arrow-*
- **Status**: check, x, alert-*, info
- **AI**: sparkles, brain, bot, wand-2
- **Communication**: message-*, mail, phone, headphones

### Common Replacements:
| Old (Generic SVG) | New (Lucide) | Use For |
|-------------------|--------------|---------|
| Magnifying glass | `search` | Search bars |
| Hamburger menu | `menu` | Mobile menu |
| X | `x` | Close buttons |
| Arrow right | `arrow-right` or `chevron-right` | Links, next |
| Gear | `settings` | Configuration |
| Book | `book-open` | Documentation |
| Code brackets | `code-2` | Code examples |
| Light bulb | `lightbulb` | Tips, ideas |

---

## 📝 Examples in Context

### Product Card Link (Current):
```html
<a href="#" class="flex items-center justify-between group text-gray-900 hover:text-purple-600">
  <span class="font-medium">Getting Started</span>
  <i data-lucide="chevron-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
</a>
```

### Action Card (Current):
```html
<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
  <i data-lucide="rocket" class="w-6 h-6 text-purple-600"></i>
</div>
<h3>Install & Setup</h3>
```

### Code Block Actions:
```html
<button class="code-action-btn" title="Copy code">
  <i data-lucide="copy" class="w-4 h-4"></i>
</button>

<button class="code-action-btn" title="AI Explain">
  <i data-lucide="sparkles" class="w-4 h-4"></i>
</button>
```

---

## 🔄 Migration Checklist

Current page - partially converted:
- ✅ Search icon → `search`
- ✅ Dark mode → `moon` (will toggle to `sun`)
- ⏳ Product link arrows → Convert to `chevron-right`
- ⏳ Task card icons → Convert to specific icons
- ⏳ Support icons → Convert to appropriate icons

---

## 💡 Suggested Icons for IGX Docs

### Products:
```html
<!-- Ingeniux CMS -->
<i data-lucide="layout"></i>

<!-- Discover CX -->
<i data-lucide="compass"></i>

<!-- AI Assists -->
<i data-lucide="sparkles"></i>

<!-- InSite Search -->
<i data-lucide="search"></i>
```

### Common Tasks:
```html
<!-- Install & Setup -->
<i data-lucide="download-cloud"></i>

<!-- API Documentation -->
<i data-lucide="code-2"></i>

<!-- Integrations -->
<i data-lucide="plug"></i>

<!-- Troubleshooting -->
<i data-lucide="wrench"></i>
```

### Getting Started Steps:
```html
<!-- Quick Start -->
<i data-lucide="zap"></i>

<!-- Core Concepts -->
<i data-lucide="book-open"></i>

<!-- First Project -->
<i data-lucide="rocket"></i>
```

### Support Resources:
```html
<!-- Contact Support -->
<i data-lucide="headphones"></i>

<!-- Community -->
<i data-lucide="users"></i>

<!-- Release Notes -->
<i data-lucide="megaphone"></i>

<!-- Videos -->
<i data-lucide="video"></i>
```

---

## 🎯 Current Status

**Converted**:
- ✅ Search icon
- ✅ Dark mode icon
- ✅ CDN loaded
- ✅ Icons initializing

**To Convert** (if you want):
- Product card arrow icons
- Task card icons  
- Support card icons
- Footer icons

**Current icons work fine** - they're using Lucide's SVG fallback. You can convert more as needed or keep the mix.

---

## 📚 Resources

- **Icon Browser**: https://lucide.dev/icons
- **Documentation**: https://lucide.dev/guide/
- **GitHub**: https://github.com/lucide-icons/lucide

---

**Next**: Should I convert more icons or keep the current mix? The site works great as-is!

