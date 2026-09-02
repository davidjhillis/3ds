# Theme Editor - Color Usage Guide

**Simple UX Flow:** Themes handle everything. Click **Customize** only if you need custom colors.

---

## 🎨 What Each Color Controls

### **1. PRIMARY COLOR** (e.g., Purple, Blue, Red)
Main brand color that appears throughout the portal:

**Where you'll see it:**
- ✅ Product card background gradients (`bg-gradient-to-r from-purple-900 to-purple-800`)
- ✅ Buttons ("Creating Pages", "Schema Designer", etc.)
- ✅ Links in navigation and content ("Getting Started", "API Authentication")
- ✅ Active states and hover effects
- ✅ Logo/brand accents

**Tailwind classes controlled:**
```css
.bg-purple-50 → .bg-purple-900    /* Backgrounds */
.text-purple-400 → .text-purple-600  /* Text colors */
.border-purple-500                /* Borders */
.from-purple-900, .to-purple-800  /* Gradients */
```

---

### **2. ACCENT COLOR** (e.g., Violet, Pink, Blue)
Secondary color that complements the primary:

**Where you'll see it:**
- ✅ Icons in product cards
- ✅ Secondary highlights and UI elements
- ✅ Gradient complements (blends with primary for richer gradients)
- ✅ Alternative button states

**Tailwind classes controlled:**
```css
.bg-indigo-50 → .bg-indigo-900      /* Backgrounds */
.text-indigo-400 → .text-indigo-600 /* Text */
.from-indigo-900, .to-indigo-800    /* Gradients */
```

---

### **3. NEUTRAL COLOR** (Gray - Auto-set by themes)
Page backgrounds, text, borders - the foundation:

**Where you'll see it:**
- ✅ Page background (`bg-white` in light, `dark:bg-gray-900` in dark)
- ✅ Hero section gradient (`dark:from-gray-800 dark:to-gray-900`)
- ✅ Card backgrounds (`bg-white dark:bg-gray-800`)
- ✅ Text colors (`text-gray-600`, `dark:text-gray-300`)
- ✅ Borders (`border-gray-200`, `dark:border-gray-700`)

**Tailwind classes controlled:**
```css
.bg-gray-50 → .bg-gray-900          /* Backgrounds */
.text-gray-300 → .text-gray-900     /* Text */
.border-gray-200 → .border-gray-700 /* Borders */
```

**Note:** Neutral colors are set automatically by theme presets. Most enterprise customers won't need to customize grays.

---

## 🎯 How Themes Work

### **Theme Preset Structure**
Each theme preset defines all 3 colors:

```javascript
{
  purple: {
    primary: 'purple',    // Main brand (cards, buttons, links)
    accent: 'violet',     // Complements primary (icons, highlights)
    neutral: 'gray'       // Foundation (backgrounds, text, borders)
  }
}
```

**Example - "Purple" Theme:**
- Primary = Purple (#9333ea, #581c87)  
- Accent = Violet (#8b5cf6, #5b21b6)  
- Neutral = Gray (#f9fafb → #111827)  

### **Why This Works**
- All colors are professionally matched
- Primary + Accent create harmonious gradients
- Neutral provides clean, accessible foundation
- Tailwind's `dark:` variants handle light/dark mode automatically

---

## 📊 How to Use the Editor

### **For 90% of Customers:**
1. Click a **Theme Preset** (Purple, Blue, Green, etc.)
2. Toggle **Light/Dark** mode
3. Toggle **Gradients** on/off
4. Done! ✓

### **For Custom Branding:**
1. Start with closest **Theme Preset**
2. Click **"Customize"** button
3. Override **Primary** and/or **Accent** colors
4. Click **"Close"** when done
5. **Apply & Save**

---

## 🔧 Technical Details

### **CSS Variable System**
All colors use Tailwind shade numbers (50, 100, ..., 900):

```css
:root {
  /* Primary Color (Purple) */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  ...
  --color-primary-900: #581c87;
  
  /* Accent Color (Violet) */
  --color-accent-50: #f5f3ff;
  ...
  --color-accent-900: #4c1d95;
  
  /* Neutral Color (Gray) */
  --color-neutral-50: #f9fafb;
  ...
  --color-neutral-900: #111827;
}
```

### **Dark Mode Handling**
Tailwind's `dark:` variants work naturally:
- Light mode: `bg-white` 
- Dark mode: `dark:bg-gray-900`
- Hero gradient: `dark:from-gray-800 dark:to-gray-900`

**No color flipping!** `purple-900` is always `#581c87` in both modes.

---

## 📋 Best Practices for Enterprise Customers

### **When to Use Themes vs. Custom Colors**

**Use Theme Presets when:**
- Customer brand matches a standard color (Blue, Purple, Green, etc.)
- Quick deployment is needed
- Customer wants proven, accessible color combinations

**Use Custom Colors when:**
- Exact brand match required (e.g., Pantone color)
- Customer has specific primary + accent combination
- Non-standard color palette needed

### **Customization Workflow**

1. **Start with nearest theme preset** - Gets you 90% of the way there
2. **Use Customize sparingly** - Only override what's necessary
3. **Test both Light/Dark modes** - Ensure accessibility in both
4. **Export CSS variables** - Give customers portable theme file
5. **Save version snapshot** - Create restore point before changes

### **Accessibility Notes**
- Tailwind 600-900 shades meet WCAG AA contrast on white backgrounds
- Dark mode uses lighter shades (200-400) for text
- Scale preview shows which shades are safe for text (marked with ✓)
- Always test contrast ratios when using custom colors

---

## 🎁 What This Gives Enterprise Customers

1. **Quick Setup** - Select theme, done in 30 seconds
2. **Brand Control** - Match exact corporate colors if needed
3. **Accessibility Built-in** - WCAG AA compliant out of the box
4. **Light/Dark Support** - Both modes work automatically
5. **Version History** - Never lose a configuration
6. **Portable Themes** - Export CSS for other environments

---

**Last Updated:** October 31, 2025  
**Version:** Tailwind v2 Color System

