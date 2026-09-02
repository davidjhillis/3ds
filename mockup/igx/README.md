# DCX Portal - Ingeniux CMS Implementation

Razor views and assets for implementing the Discover CX documentation portal in Ingeniux CMS.

## For the Developer

This folder contains everything you need to add to the DSS Visual Studio project. Copy these files into the corresponding locations in your `Dynamic_Site_Server_Instance.sln`.

### File Mapping

```
igx/                                    → DSS Project Root
├── Views/
│   ├── Shared/
│   │   ├── _Layout.cshtml             → /Views/Shared/_Layout.cshtml
│   │   ├── PageLayout/
│   │   │   ├── Header.cshtml          → /Views/Shared/PageLayout/Header.cshtml
│   │   │   └── Footer.cshtml          → /Views/Shared/PageLayout/Footer.cshtml
│   │   └── Editable/
│   │       ├── Trays.cshtml           → /Views/Shared/Editable/Trays.cshtml
│   │       ├── Tray.cshtml            → /Views/Shared/Editable/Tray.cshtml
│   │       ├── DCXCodeBlock_Unit.cshtml
│   │       ├── DCXCallout_Unit.cshtml
│   │       ├── DCXProductCard_Unit.cshtml
│   │       └── DCXActionCard_Unit.cshtml
│   └── CMSPageDefault/
│       ├── DCX_HomePage.cshtml        → /Views/CMSPageDefault/DCX_HomePage.cshtml
│       ├── DCX_DocPage.cshtml         → /Views/CMSPageDefault/DCX_DocPage.cshtml
│       ├── DCX_SearchResults.cshtml   → /Views/CMSPageDefault/DCX_SearchResults.cshtml
│       ├── DCX_UserProfile.cshtml     → /Views/CMSPageDefault/DCX_UserProfile.cshtml
│       ├── DCX_LoginPage.cshtml       → /Views/CMSPageDefault/DCX_LoginPage.cshtml
│       └── DCX_Settings.cshtml        → /Views/CMSPageDefault/DCX_Settings.cshtml
├── Controllers/
│   └── AIAssistsController.cs         → /Controllers/AIAssistsController.cs
├── Content/
│   ├── css/
│   │   ├── styles.css                 → /Content/css/styles.css         (Broadway — default)
│   │   ├── styles-metro.css           → /Content/css/styles-metro.css   (Metro theme)
│   │   ├── styles-terrace.css         → /Content/css/styles-terrace.css (Terrace theme)
│   │   ├── tokens.css                 → /Content/css/tokens.css         (CSS custom properties)
│   │   ├── input.css                  → /Content/css/input.css          (Tailwind build entry)
│   │   └── design-system/
│   │       ├── theme.css              → /Content/css/design-system/theme.css
│   │       ├── content.css            → /Content/css/design-system/content.css
│   │       └── shell.css              → /Content/css/design-system/shell.css
│   └── images/
│       ├── favicon.ico                → /Content/images/favicon.ico
│       ├── discover-cx-logo.svg       → /Content/images/discover-cx-logo.svg
│       ├── discover-cx-logo-white.svg → /Content/images/discover-cx-logo-white.svg
│       ├── heroo.png                  → /Content/images/heroo.png       (homepage hero still)
│       └── Reader.png                 → /Content/images/Reader.png      (feature image)
├── Scripts/
│   ├── main.js                        → /Scripts/main.js                (mobile menu, keyboard shortcuts)
│   ├── user-dropdown.js               → /Scripts/user-dropdown.js       (logged-in user menu + notifications)
│   ├── ai-assists.js                  → /Scripts/ai-assists.js          (AI API abstraction, mock fallback)
│   ├── analytics.js                   → /Scripts/analytics.js           (PostHog auto-instrumentation)
│   ├── article-actions.js             → /Scripts/article-actions.js     (share menu, bookmark, watch, version dropdown, feedback)
│   ├── command-k-widget.js            → /Scripts/command-k-widget.js    (Cmd+K search modal)
│   ├── chatbot-widget.js              → /Scripts/chatbot-widget.js      (floating support chat; gated by AIChatDocs)
│   └── tailwind-config.js             → /Scripts/tailwind-config.js     (used only by rebuild toolchain)
└── StyleSheets/
    └── _dita_/
        └── dcx-dita-rendering.xsl     → Upload to CMS Asset Tree at StyleSheets/_dita_/

xslt/dita-rendering-original.xsl (repo root)  → Reference only (do not deploy)
```

### Reference Templates

The static HTML templates in the parent repo are the source of truth for design. Compare your CMS output against these:

| View | Reference Template |
|------|--------------------|
| DCX_HomePage | `../index.html` |
| DCX_DocPage | `../doc-page.html` |
| DCX_SearchResults | `../search-results.html` |
| DCX_UserProfile | `../user-profile.html` |
| DCX_LoginPage | `../login.html` |
| DCX_Settings | `../settings.html` |
| Header partial | Header section in any template |
| Footer partial | Footer section in any template |

---

## Setup Steps

### 1. Add Files to VS Project

Copy the views, CSS, and JS files into the DSS project at the paths listed above. Add them to the `.csproj` so they deploy.

### 2. Create Schemas in CMS

Create these schemas in **Settings > Schema Designer**. All schema names are prefixed with `DCX_` to avoid conflicts.

#### DCX_SiteControl (SiteControl schema)

| Field | Type | Notes |
|-------|------|-------|
| SiteName | string | Site display name |
| DCXHeader | List (Component) | CompTypes: `DCXHeader` |
| DCXFooter | List (Component) | CompTypes: `DCXFooter` |
| DCXNavigationTab | List (Component) | CompTypes: `DCXNavigationTab` |
| HeadScript | dhtml | Custom head scripts |
| BodyScript | dhtml | Custom body scripts |
| FooterScript | dhtml | Custom footer scripts |
| PostHogApiKey | string | PostHog project API key (blank = disabled) |
| PostHogHost | string | PostHog instance URL (default: `https://us.i.posthog.com`) |
| ActiveTheme | string | Theme name: "Broadway", "Metro", "Terrace", or custom. `_Layout.cshtml` reads this and loads the matching compiled CSS file. |
| AISummarization | boolean | Enable article summarization (default: true) |
| AICodeExplainer | boolean | Enable code block explanations (default: true) |
| AISearchAnswers | boolean | Enable AI answers in search (default: true) |
| AIChatDocs | boolean | Enable chat with docs widget — also gates whether `chatbot-widget.js` loads in `_Layout` (default: true) |
| AIListen | boolean | Enable Listen (TTS) button on doc pages (default: false) |
| AIGlossary | boolean | Enable glossary tooltips (default: false) |
| FeatureDarkMode | boolean | Allow dark mode toggle (default: true) |
| FeatureBookmarks | boolean | Enable bookmarks (default: true) |
| FeatureWatched | boolean | Enable watched pages (default: true) |
| FeatureLanguage | boolean | Show language selector (default: true) |
| FeatureFeedback | boolean | Enable feedback buttons (default: true) |
| FeatureShare | boolean | Enable share dropdown (default: true) |
| FeaturePDF | boolean | Enable PDF download (default: false — requires PdfUrl on each DCX_DocPage) |

**Properties**: `IsDynamicSitePage: false`, `IsComponent: false`

#### DCXHeader (Component)

| Field | Type |
|-------|------|
| Logo | Asset |
| LogoDark | Asset |
| SearchResults | Link |
| LoginPage | Link |

#### DCXFooter (Component)

| Field | Type |
|-------|------|
| FooterLogo | Asset |
| Tagline | string |
| Copyright | string (use `{year}` placeholder) |
| FooterLinkGroup | List (Component) → DCXFooterLinkGroup |

#### DCXFooterLinkGroup (Component)

| Field | Type |
|-------|------|
| GroupTitle | string |
| FooterLink | Link (list) |

#### DCXNavigationTab (Component)

| Field | Type |
|-------|------|
| TabLink | Link |
| SubLink | Link (list) |

#### DCX_HomePage (Page schema)

| Field | Type |
|-------|------|
| Title | string |
| Subtitle | string |
| SearchPrompt | string |
| SearchResults | Link |
| ProductCards | List (Component) → DCXProductCard |
| ActionCards | List (Component) → DCXActionCard |
| Trays | List (Component) → any tray component |

**Properties**: `IsDynamicSitePage: true`, `ViewName: DCX_HomePage`

#### DCX_DocPage (Page schema)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | string | yes | Article title |
| Body | dhtml | yes | Article body content |
| LastUpdated | string | no | Display string, e.g. "Feb 1, 2025" |
| ReadTime | string | no | Integer or string, rendered as "X min read" |
| Section | string | no | Section label above version/tags row (e.g. "Authoring Basics") |
| PdfUrl | string | no | URL to the pre-built PDF asset. Required for PDF download button. |
| Versions | Link (list) | no | Version alternatives. First entry is treated as "Latest". |
| PrevArticle | Link | no | Previous article in sequence. Renders a chevron-left button. |
| NextArticle | Link | no | Next article in sequence. Renders a chevron-right button. |
| Tags | Link (list) | no | Tag chips. Each link should target a filtered search-results page. |
| SidebarNavigation | Navigation | no | Configure start node + depth in Schema Designer UI. |
| ArticleTrays | List (Component) | no | CompTypes: DCXCodeBlock, DCXCallout |
| Trays | List (Component) | no | CompTypes: any tray component |

**Properties**: `IsDynamicSitePage: true`, `ViewName: DCX_DocPage`

All optional fields are safe to omit — the Razor view renders each UI
element conditionally. A minimal DCX_DocPage only needs `Title` + `Body`.

#### DCXProductCard (Component)

| Field | Type |
|-------|------|
| ProductName | string |
| Subtitle | string |
| Description | string |
| Icon | Asset |
| ProductLink | Link (list) |

#### DCX_SearchResults (Page schema)

| Field | Type |
|-------|------|
| Title | string |
| AIAnswerEnabled | boolean |
| FilterGroups | List (Component) → DCXFilterGroup |

**Properties**: `IsDynamicSitePage: true`, `ViewName: DCX_SearchResults`

Note: Search results are rendered by InSite Search at runtime. The view provides the layout, filter sidebar, and AI answer container.

#### DCXFilterGroup (Component)

| Field | Type |
|-------|------|
| GroupTitle | string |
| FilterOption | List (Component) → DCXFilterOption |

#### DCXFilterOption (Component)

| Field | Type |
|-------|------|
| Label | string |
| Value | string |

#### DCX_UserProfile (Page schema)

| Field | Type |
|-------|------|
| Title | string |

**Properties**: `IsDynamicSitePage: true`, `ViewName: DCX_UserProfile`

Note: User data comes from the portal user system (`IUser`), not page fields. Bookmarks and watched pages need custom API endpoints. See `user-profile.html` for full tab HTML.

#### DCX_LoginPage (Page schema)

| Field | Type |
|-------|------|
| Heading | string |
| Subheading | string |
| SSOProviders | List (Component) → DCXSSOProvider |

**Properties**: `IsDynamicSitePage: true`, `ViewName: DCX_LoginPage`

Note: Uses its own layout (no shared `_Layout.cshtml`). Auth handled by Ingeniux SAML/CustomAccount controllers.

#### DCXSSOProvider (Component)

| Field | Type |
|-------|------|
| Name | string (e.g. "Google", "Microsoft", "Okta") |
| Icon | Asset |

#### DCX_Settings (Page schema)

| Field | Type |
|-------|------|
| Title | string |

**Properties**: `IsDynamicSitePage: true`, `ViewName: DCX_Settings`

Note: Admin-only page. Feature toggles and theme selection are read from SiteControl fields (not this schema's fields). The view checks `IUser.IsAdmin` and redirects non-admin users. Impersonation uses the Ingeniux portal user system. See `settings.html` for full UI.

#### DCXActionCard (Component)

| Field | Type |
|-------|------|
| Title | string |
| Description | string |
| ActionLink | Link |

#### DCXCodeBlock (Component)

| Field | Type |
|-------|------|
| Title | string |
| Language | string |
| Code | dhtml |

#### DCXCallout (Component)

| Field | Type |
|-------|------|
| Type | enumeration (info, warning, error, success) |
| Title | string |
| Content | dhtml |

#### Common fields on every DCX page schema

`_Layout.cshtml` and `Header.cshtml` read these fields from any page.
They are optional — if absent the layout falls back to sensible defaults.
Add them to each DCX page schema (or a shared base schema) to enable the
corresponding features:

| Field | Type | Used for |
|-------|------|----------|
| BrowserBarTitle | string | Overrides the `<title>` element. Falls back to `Title` if absent. |
| HeadScript | dhtml | Injected into `<head>` for this specific page (in addition to the SiteControl HeadScript). |
| FooterScript | dhtml | Injected before `</body>` for this specific page (in addition to the SiteControl FooterScript). |
| Locale | string | Two-letter language code (e.g. "en", "es"). Sets `<html lang>` and feeds analytics. |
| LocaleLinks | Navigation | Links to translated versions of this page. Renders the header language switcher when populated. |

### 3. Finalize All Schemas

Schemas created via API or UI start in Draft mode. You **must finalize** each schema in Schema Designer before pages can be created.

### 4. Create Content Units

Go to **Administration > Presentation Content Units > Mass Create from Component Schemas** and select all DCX component schemas. This enables them for ICE Page Builder drag-and-drop.

### 5. Register SiteControl

Add to `Web.config`:

```xml
<add key="SiteControlSchemas" value="DCX_SiteControl" />
```

If there's an existing SiteControl, append with semicolon:
```xml
<add key="SiteControlSchemas" value="ExistingSiteControl;DCX_SiteControl" />
```

### 6. Configure Navigation Fields

Navigation fields (SidebarNavigation on DCX_DocPage) **must be configured in Schema Designer UI**:

1. Open DCX_DocPage schema
2. Select the SidebarNavigation field
3. Set **Start Node** to the documentation section root page
4. Set **Depth** (e.g., 3 levels)
5. Save and Finalize

### 7. Create Pages

1. Create a DCX_SiteControl page at the site root
2. Populate Header (logo, dark logo) and Footer (logo, tagline, copyright, link groups)
3. Add DCXNavigationTab items for the main nav
4. Create a DCX_HomePage as the site root page
5. Create DCX_DocPage pages under a documentation section

### 8. Publish

Run a full publish to push content to the DSS.

---

## Backend Stubs — Controller Actions the Developer Must Implement

The Razor views POST to several controller actions that are not included
in this package. Create a `PortalController` (and optionally extend
`AIAssistsController`) to back these routes. Each one has a clear
stub in its Razor view marked with TODO comments.

### PortalController actions

| Route | Called from | Purpose |
|-------|-------------|---------|
| `Portal/SaveSiteSettings` (POST) | `DCX_Settings.cshtml` | Write submitted `ActiveTheme`, `AI*` and `Feature*` checkboxes back to the DCX_SiteControl page. Returns to `/settings`. |
| `Portal/SaveSubscriptions` (POST) | `DCX_UserProfile.cshtml` (Subscriptions tab) | Write the `sub_*` checkboxes to the current user's preferences. |
| `Portal/UpdateProfile` (POST) | `DCX_UserProfile.cshtml` (Settings tab) | Update `IUser` first/last name, email, language, timezone. |
| `Portal/SearchAccounts` (GET) | `DCX_Settings.cshtml` (Impersonation tab) | Return JSON list of customer accounts matching the search query. |
| `Portal/Impersonate` (POST) | `DCX_Settings.cshtml` (Impersonation tab) | Set impersonation cookie for the Ingeniux portal user system. |

### /api/article-actions endpoints

`article-actions.js` currently persists bookmark and watch state to
`localStorage`. To make state sync across devices and surface it in
the user profile, implement:

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/article-actions/bookmark` | POST | `{ pageId, bookmarked }` — toggle bookmark for current user |
| `/api/article-actions/watch` | POST | `{ pageId, watching }` — toggle watch for current user |
| `/api/article-actions/bookmarks` | GET | Returns the current user's bookmarks for the Bookmarks tab |
| `/api/article-actions/watched` | GET | Returns the current user's watched pages for the Watched tab |

Each endpoint needs to read `Utilities.CurrentUser()` (from Cartella)
and persist state against that user's ID. Until these are wired up,
the UI works via localStorage as a single-device demo.

### AIAssistsController (already scaffolded)

`AIAssistsController.cs` ships with endpoints stubbed and mock responses
returned. To go live:

1. Set `AIAssists.Enabled = "true"` in Web.config
2. Add `AIAssists.ApiKey` and `AIAssists.ApiEndpoint`
3. Uncomment the `CallLLM()` method at the bottom of the controller
4. Replace the TODO mock responses with `await CallLLM(...)` calls
5. Set `AIAssists.config.useMocks = false` in `ai-assists.js`

See the AI Assists Integration section below for full details.

### Route configuration

`AIAssistsController.cs` uses attribute routing (`[Route("api/ai-assists/...")]`).
Ensure `RouteConfig.cs` enables attribute routes:

```csharp
public static void RegisterRoutes(RouteCollection routes)
{
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
    routes.MapMvcAttributeRoutes(); // ← required for [Route] attributes
    routes.MapRoute(
        name: "Default",
        url: "{controller}/{action}/{id}",
        defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
    );
}
```

---

## Theming System

Three compiled CSS files ship with the portal, one per pre-built theme:

| Theme | File | Palette |
|-------|------|---------|
| Broadway (default) | `Content/css/styles.css` | Indigo / Gray |
| Metro | `Content/css/styles-metro.css` | Blue / Slate |
| Terrace | `Content/css/styles-terrace.css` | Teal / Zinc |

### How theme selection works

`_Layout.cshtml` reads `siteControl.ActiveTheme` on every page render
and loads the matching compiled CSS file:

```razor
var activeTheme = (siteControl?.GetElementValue("ActiveTheme") ?? "Broadway").ToLower();
var themeFile = "styles.css";
if (activeTheme == "metro")   { themeFile = "styles-metro.css"; }
else if (activeTheme == "terrace") { themeFile = "styles-terrace.css"; }
// <link rel="stylesheet" href="~/Content/css/{themeFile}">
```

To switch themes, change the `ActiveTheme` field on the DCX_SiteControl
page in the CMS Author. The change takes effect on the next page render
across the whole site — no rebuild required.

### Adding a new theme

1. In the portal repo, copy `themes/build/default.js` to `themes/build/{name}.js`
2. Modify the `primary` and `neutral` color scales
3. Rebuild: `THEME={name} npx tailwindcss -i css/input.css -o css/styles-{name}.css --minify`
4. Copy the output into this package at `igx/Content/css/styles-{name}.css`
5. Add a new `else if` branch to `_Layout.cshtml` for the name
6. Set `ActiveTheme` to the new name in the CMS

### Design token source files

`Content/css/design-system/{theme,content,shell}.css` are the source
CSS files that feed into the compiled build. They use `rgb(var(--color-*))`
syntax so colors can be overridden by `tokens.css` at build time. These
files ship with `igx/` for reference and rebuild purposes — they are
not loaded directly at runtime (the compiled `styles*.css` already
contains everything in them).

`Content/css/tokens.css` defines the CSS custom properties consumed by
`tailwind-config.js` during the build. It is not loaded at runtime
either; editing it only affects the next rebuild.

## Dark Mode

Dark mode is controlled by the `dark` class on `<html>`. The theme switcher in the user dropdown (injected by `user-dropdown.js`) toggles this class and persists to localStorage.

## ICE Support

All Content Unit views include `@_Helpers.RenderICEAttribute()` calls on editable elements. When ICE is enabled in CMS Settings, content editors can click directly on rendered text to edit it.

## AI Assists Integration

The doc pages include AI-powered features: article summary, code explanation with Q&A, and AI-enhanced search. The UI for these features is already built in the page views (thinking states, streaming text, feedback buttons). The `ai-assists.js` module provides the API abstraction layer.

### Architecture

```
Page JS (existing UI code in doc-page views)
    │  calls AIAssists.summary(), AIAssists.explainCode(), etc.
    ▼
ai-assists.js (API abstraction layer)
    │  POST /api/ai-assists/summary, /explain, /chat
    ▼
AIAssistsController.cs (.NET MVC controller)
    │  HttpClient call to LLM API
    ▼
LLM Service (Claude API, OpenRouter, or Ingeniux AI service)
```

### Files

| File | Purpose |
|------|---------|
| `Scripts/ai-assists.js` | Client-side API abstraction — mock responses until backend connected |
| `Controllers/AIAssistsController.cs` | .NET controller with endpoints for summary, explain, chat, status |

### Configuration (Web.config)

```xml
<appSettings>
  <add key="AIAssists.Enabled" value="true" />
  <add key="AIAssists.ApiEndpoint" value="https://api.anthropic.com/v1/messages" />
  <add key="AIAssists.ApiKey" value="sk-..." />
  <add key="AIAssists.Model" value="claude-sonnet-4-20250514" />
  <add key="AIAssists.CacheDuration" value="3600" />
</appSettings>
```

### API Endpoints

| Endpoint | Method | Input | Output |
|----------|--------|-------|--------|
| `/api/ai-assists/summary` | POST | `pageId`, `content` | `{ summary, cached }` |
| `/api/ai-assists/explain` | POST | `code`, `language` | `{ overview, breakdowns[] }` |
| `/api/ai-assists/chat` | POST | `message`, `pageContent`, `pageTitle` | `{ response }` |
| `/api/ai-assists/status` | GET | — | `{ enabled, hasApiKey, model }` |

### Connecting to a Real LLM

1. Set `AIAssists.Enabled` to `true` in Web.config
2. Add your API key and endpoint
3. Uncomment the `CallLLM()` method in `AIAssistsController.cs`
4. Replace the TODO mock responses with the `CallLLM()` calls
5. Set `AIAssists.config.useMocks = false` in the client JS (or remove mock fallbacks)

Responses are cached by page ID / content hash. The cache duration is configurable.

### Integrating with Ingeniux AI Services

If Ingeniux provides native AI summary or search services:

1. Replace the `CallLLM()` method in the controller with calls to the Ingeniux AI API
2. For search, the AI answer section in `DCX_SearchResults.cshtml` can be populated by InSite Search's AI features directly — no need to route through this controller

### Mock Mode

By default, `ai-assists.js` returns mock responses so the UI works for demos without a backend. The page views handle these identically to real responses — same streaming, same UI states. When ready to go live, flip `useMocks` to `false`.

### Client API

```javascript
// Initialize with custom endpoint
AIAssists.init({ endpoint: '/api/ai-assists', useMocks: false });

// Summary
var result = await AIAssists.summary(articleText, pageId);
// → { summary: "...", cached: true/false }

// Code explanation
var result = await AIAssists.explainCode(codeText, 'javascript');
// → { overview: "...", breakdowns: [{ lines, code, explanation }] }

// Code Q&A follow-up
var result = await AIAssists.answerCodeQuestion("Why use async?", codeText, 'javascript');
// → { answer: "..." }

// Chat with page context
var result = await AIAssists.chat("How do I configure this?", pageText, pageTitle);
// → { response: "..." }

// Check backend status
var status = await AIAssists.checkStatus();
// → { enabled: true, hasApiKey: true, model: "claude-sonnet-4-20250514" }
```

## Analytics (PostHog)

User interactions are captured as PostHog events via `analytics.js`. The PostHog snippet loads from the SiteControl `PostHogApiKey` field — leave blank to disable.

### Auto-captured Events

The script auto-instruments common UI patterns without requiring `data-track` attributes:

| Event | Trigger |
|-------|---------|
| `ai_summary_requested` | User clicks Summarize |
| `ai_summary_feedback` | Thumbs up/down on summary |
| `ai_code_explained` | User clicks Explain on a code block |
| `ai_code_question_asked` | User asks follow-up question about code |
| `ai_code_feedback` | Thumbs up/down on code explanation |
| `ai_search_feedback` | Thumbs up/down on AI search answer |
| `bookmark_added` / `bookmark_removed` | Bookmark toggle |
| `watch_added` / `watch_removed` | Watch toggle |
| `article_shared` | Share button click |
| `article_downloaded` | Download PDF click |
| `search_performed` | Search form submitted |
| `notification_clicked` | Notification item clicked |
| `subscription_toggled` | Subscription toggle changed |
| `theme_changed` | Light/dark mode switched |

### Custom Tracking

For events not auto-captured, use declarative or imperative tracking:

```html
<!-- Declarative -->
<button data-track="custom_event" data-props='{"key":"value"}'>Click</button>

<!-- Imperative -->
<script>DCXAnalytics.track('custom_event', { key: 'value' });</script>
```

### User Identification

When a user logs in, identify them for PostHog person profiles:

```csharp
// In _Layout.cshtml after PostHog init
@if (isLoggedIn)
{
    <script>
        DCXAnalytics.identify('@user.ID', {
            name: '@user.DisplayName',
            email: '@user.Email'
        });
    </script>
}
```

### Debug Mode

Enable console logging for development:

```javascript
DCXAnalytics.debug = true;
```

## Compiled Tailwind

Pages use a compiled `styles.css` (53KB) — no CDN, no runtime CSS generation. The CSS includes Tailwind utilities + the design system (theme tokens, content styles, shell components).

Rebuild after changing HTML or theme:
```bash
npx tailwindcss -i css/input.css -o css/styles.css --minify
```

Per-client theming — swap the theme file and rebuild:
```bash
THEME=metro npx tailwindcss -i css/input.css -o css/styles-metro.css --minify
```

Theme files are in `themes/build/` — each is a JS file with primary and neutral color scales.

## DITA Rendering

### XSLT Transform

The portal uses a forked DITA rendering XSLT (`xslt/dcx-dita-rendering.xsl`) that outputs clean HTML with DCX class conventions. Upload to the CMS Asset Tree at `StyleSheets/_dita_/`.

Key differences from the STL XSLT:
- Notes → `<div class="callout callout-{type}">` (not `.note-wrap`)
- Code blocks → `<div class="code-block">` with copy button (no Bootstrap grid)
- Tables → `<div class="content-table">` (not `.table-wrap`)
- UI controls → `<kbd>` (not `<span class="ph uicontrol">`)
- File paths → `<code class="filepath">`
- Menu cascades → `<kbd>` with `›` separator
- Sections → `<section class="content-section">`
- Short descriptions → `<p class="shortdesc">`

See `docs/XSLT-CONTRACT.md` for the complete DITA element → HTML output mapping.

### Content Styling

The design system `css/design-system/content.css` styles the XSLT output. It targets elements within `.article-content` — headings, prose, callouts, code blocks, tables, figures, steps, definition lists, and inline DITA elements.

### How DITA Content Renders

```
DITA source → Ingeniux normalization (DITA-OT) → dcx-dita-rendering.xsl
→ HTML stored in DITAContent field → Razor view: @Html.Raw(ditaContent.Value)
→ content.css styles the output
```

The Razor view for DITA pages (`DCX_DocPage.cshtml`) wraps the content in a `.article-content` container. The content stylesheet handles everything inside.

### PDF Output

DITA-OT generates PDF files during publish using `org.dita.pdf2`. The doc page download button links to the pre-built PDF asset for each article.
