# Discover CX Documentation Portal

Static HTML templates for the Discover CX documentation portal. Compiled Tailwind CSS with per-client theming. Designed for implementation in Ingeniux CMS.

## Live Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Product landing with search, product cards, support |
| Doc Page | `doc-page.html` | Article reader with sidebar nav, TOC, AI features |
| Doc Page (alt) | `doc-page-checking-in-out.html` | Second article |
| Search Results | `search-results.html` | Search with filters and AI answers |
| User Profile | `user-profile.html` | Profile, subscriptions, bookmarks, watched pages |
| Login | `login.html` | SSO login with Aurora animation |
| Site Settings | `settings.html` | Theme, AI assists, features, impersonation (admin) |

## Quick Start

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Architecture

### Compiled Tailwind (v3)

All pages load a single compiled `css/styles.css` (53KB). No CDN, no runtime CSS generation.

Rebuild after HTML changes:
```bash
npx tailwindcss -i css/input.css -o css/styles.css --minify
```

### Per-Client Theming

Theme files define color palettes. Build with a different theme:

```bash
THEME=metro npx tailwindcss -i css/input.css -o css/styles-metro.css --minify
```

Available themes:
| Theme | Colors | File |
|-------|--------|------|
| **Broadway** (default) | Indigo / Gray | `themes/build/default.js` |
| **Metro** | Blue / Slate | `themes/build/metro.js` |
| **Terrace** | Teal / Zinc | `themes/build/terrace.js` |

Create a new theme: copy any theme file, change the hex values, run the build command.

### Design System

| File | Purpose |
|------|---------|
| `css/design-system/theme.css` | Semantic tokens: surfaces, text, borders, status, code |
| `css/design-system/content.css` | DITA article styling: headings, callouts, code blocks, tables |
| `css/design-system/shell.css` | Portal chrome: buttons, nav, badges, layouts |

### Shared Components

| File | Purpose |
|------|---------|
| `js/user-dropdown.js` | User menu, notification bell, language switcher, theme toggle |
| `js/main.js` | Navigation, search modal, dark mode |
| `assets/js/chatbot-widget.js` | Floating support chat |

### DITA Rendering

| File | Purpose |
|------|---------|
| `xslt/dcx-dita-rendering.xsl` | Forked XSLT for DITA → HTML (callouts, code blocks, tables, inline elements) |
| `xslt/dita-rendering-original.xsl` | Unmodified Ingeniux STL version for reference |
| `docs/XSLT-CONTRACT.md` | Mapping of DITA elements to HTML output |

## Doc Page Features

- Bookmark & Watch toggles with visual state
- Code blocks with copy and AI explain (toggle open/close)
- Article summarization (AI)
- Share dropdown (copy link, email, X, LinkedIn)
- Sidebar navigation with collapsible sections
- Table of contents (right sidebar)
- Dark mode
- Command K search (Cmd/Ctrl+K)
- Notification bell dropdown
- Language switcher

## Site Settings (Admin)

`/settings.html` — visible to admin users:
- **Theme** — select from pre-built themes (applied during site build)
- **AI Assists** — toggle summarization, code explainer, AI search, chat, glossary
- **Features** — toggle dark mode, bookmarks, watched, language, feedback, share, PDF
- **Impersonation** — view portal as a specific customer account

## Ingeniux CMS Implementation

The `docs/ingeniux-impl` branch contains the full CMS implementation:
- Razor views for all pages + Content Units
- Schema definitions (18 schemas)
- XSLT fork for DITA rendering
- AI Assists controller + client API
- PostHog analytics
- Multi-lingual support
- Auth-aware header

See `igx/README.md` on that branch for the complete implementation spec.

## Directory Structure

```
/
├── index.html                      Home
├── doc-page.html                   Article reader
├── doc-page-checking-in-out.html   Second article
├── search-results.html             Search results
├── user-profile.html               User profile
├── login.html                      Login
├── settings.html                   Site settings (admin)
├── css/
│   ├── styles.css                  Compiled Tailwind (Broadway theme)
│   ├── styles-metro.css            Metro theme
│   ├── styles-terrace.css          Terrace theme
│   ├── input.css                   Tailwind entry point
│   └── design-system/
│       ├── theme.css               Semantic tokens
│       ├── content.css             DITA content styling
│       └── shell.css               Portal component classes
├── js/
│   ├── main.js                     Core functionality
│   ├── user-dropdown.js            Shared user menu + notifications
│   └── tailwind-config.js          Legacy CDN config (unused with compiled)
├── assets/
│   ├── images/                     Logos, favicon
│   └── js/chatbot-widget.js        Support chat
├── themes/build/                   Theme color definitions
├── xslt/                           DITA rendering XSLT
├── tailwind.config.js              Tailwind v3 config
├── docs/                           Reference documentation
└── archive/                        Archived admin, variants, old CSS
```

## Browser Support

Chrome, Firefox, Safari (latest), mobile browsers.
