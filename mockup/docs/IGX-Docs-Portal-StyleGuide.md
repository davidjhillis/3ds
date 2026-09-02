# IGX Technology Documentation Portal - Style Guide & Template Plan

## Project Overview

**Purpose**: Create a modern, AI-powered documentation portal for IGX Technology with static HTML/Tailwind templates featuring a professional corporate design.

**Technology Stack**:
- Pure HTML5
- Tailwind CSS (CDN or compiled)
- Vanilla JavaScript for interactions
- No framework dependencies

**Design Philosophy**: Modern tech company aesthetic with an AI-first approach, prioritizing user-friendliness and intelligent assistance.

---

## 1. Design Principles & Visual Identity

### Core Principles
- **AI-Forward Design**: Intelligent, context-aware, and anticipatory
- **User-Centric**: Intuitive navigation, clear information hierarchy
- **Modern & Premium**: Sophisticated aesthetic with attention to detail
- **Speed & Performance**: Lightweight, fast-loading static templates
- **Accessibility-First**: WCAG 2.1 AA compliant
- **Responsive Design**: Mobile-first approach, works on all devices

### Brand Personality
- **Intelligent**: AI-powered features are prominent but not overwhelming
- **Approachable**: Technical but friendly, expert yet accessible
- **Trustworthy**: Professional, reliable, authoritative
- **Innovative**: Cutting-edge AI capabilities with modern design

---

## 2. Color Palette & Visual Theme

### Primary Brand Colors

```css
/* IGX Brand Colors */
:root {
  /* Primary - Deep Tech Blues */
  --igx-primary-900: #0A1628;      /* Deep navy - headers, dark mode bg */
  --igx-primary-800: #0F2645;      /* Dark blue - sidebar */
  --igx-primary-700: #1E3A5F;      /* Medium dark blue */
  --igx-primary-600: #2D5F8D;      /* Primary brand blue */
  --igx-primary-500: #3B7FB7;      /* Bright blue - CTAs */
  --igx-primary-400: #5BA3D0;      /* Light blue - hover states */
  
  /* Accent - AI Purple/Violet */
  --igx-accent-600: #7C3AED;       /* AI purple - AI features */
  --igx-accent-500: #8B5CF6;       /* Light purple - AI accents */
  --igx-accent-400: #A78BFA;       /* Lighter purple - AI hover */
  --igx-accent-100: #EDE9FE;       /* Very light purple - AI backgrounds */
  
  /* Neutral Grays */
  --igx-gray-50: #F9FAFB;          /* Light backgrounds */
  --igx-gray-100: #F3F4F6;         /* Subtle backgrounds */
  --igx-gray-200: #E5E7EB;         /* Borders */
  --igx-gray-300: #D1D5DB;         /* Dividers */
  --igx-gray-400: #9CA3AF;         /* Muted text */
  --igx-gray-500: #6B7280;         /* Secondary text */
  --igx-gray-600: #4B5563;         /* Body text */
  --igx-gray-700: #374151;         /* Dark text */
  --igx-gray-800: #1F2937;         /* Darker text */
  --igx-gray-900: #111827;         /* Darkest text */
  
  /* Semantic Colors */
  --igx-success: #10B981;          /* Success states */
  --igx-warning: #F59E0B;          /* Warning states */
  --igx-error: #EF4444;            /* Error states */
  --igx-info: #3B82F6;             /* Info states */
  
  /* AI Feature Gradients */
  --igx-ai-gradient: linear-gradient(135deg, #7C3AED 0%, #3B7FB7 100%);
  --igx-ai-glow: rgba(124, 58, 237, 0.2);
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        igx: {
          primary: {
            900: '#0A1628',
            800: '#0F2645',
            700: '#1E3A5F',
            600: '#2D5F8D',
            500: '#3B7FB7',
            400: '#5BA3D0',
          },
          accent: {
            600: '#7C3AED',
            500: '#8B5CF6',
            400: '#A78BFA',
            100: '#EDE9FE',
          }
        }
      }
    }
  }
}
```

---

## 3. Typography System

### Font Stack

```css
/* Primary Font: Inter (Modern, Clean, Readable) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Monospace Font: JetBrains Mono (Code blocks) */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

### Typography Scale

```css
/* Tailwind Typography Classes */
.text-display-xl { font-size: 4.5rem; line-height: 1.1; font-weight: 800; }  /* 72px */
.text-display-lg { font-size: 3.75rem; line-height: 1.1; font-weight: 800; } /* 60px */
.text-display-md { font-size: 3rem; line-height: 1.2; font-weight: 700; }    /* 48px */

.text-heading-1 { font-size: 2.25rem; line-height: 1.2; font-weight: 700; }  /* 36px - H1 */
.text-heading-2 { font-size: 1.875rem; line-height: 1.3; font-weight: 700; } /* 30px - H2 */
.text-heading-3 { font-size: 1.5rem; line-height: 1.3; font-weight: 600; }   /* 24px - H3 */
.text-heading-4 { font-size: 1.25rem; line-height: 1.4; font-weight: 600; }  /* 20px - H4 */
.text-heading-5 { font-size: 1.125rem; line-height: 1.4; font-weight: 600; } /* 18px - H5 */

.text-body-lg { font-size: 1.125rem; line-height: 1.7; font-weight: 400; }   /* 18px */
.text-body { font-size: 1rem; line-height: 1.6; font-weight: 400; }          /* 16px - Base */
.text-body-sm { font-size: 0.875rem; line-height: 1.6; font-weight: 400; }   /* 14px */
.text-caption { font-size: 0.75rem; line-height: 1.5; font-weight: 500; }    /* 12px */
```

### Typography Guidelines
- **Headings**: Use Inter 600-800 weight for clear hierarchy
- **Body Text**: Inter 400 for readability, 500 for emphasis
- **Code**: JetBrains Mono for all code snippets and technical content
- **Line Height**: Generous (1.6-1.7) for body text, tighter (1.1-1.3) for headings
- **Letter Spacing**: Default for body, slightly tighter (-0.02em) for large headings

---

## 4. Layout & Spacing System

### Container System

```css
/* Container widths */
.container-narrow { max-width: 768px; }   /* Reading content */
.container-medium { max-width: 1024px; }  /* Standard pages */
.container-wide { max-width: 1280px; }    /* Full-width pages */
.container-full { max-width: 1536px; }    /* Dashboard/tools */
```

### Spacing Scale (Tailwind default + custom)

```
Base Unit: 4px (0.25rem)

2   = 8px   - Tight spacing
3   = 12px  - Compact spacing
4   = 16px  - Standard spacing
6   = 24px  - Comfortable spacing
8   = 32px  - Section spacing
10  = 40px  - Large section spacing
12  = 48px  - Major section spacing
16  = 64px  - Extra large spacing
20  = 80px  - Page section spacing
24  = 96px  - Hero spacing
```

### Grid System

- **12-column grid** for complex layouts
- **Sidebar + Content**: 280px fixed sidebar + fluid content area
- **3-column layout**: For feature grids (home page)
- **2-column layout**: For comparison tables, side-by-side content

---

## 5. Component Library

### 5.1 Navigation Components

#### Top Navigation Bar
```html
<!-- Sticky header with search, user menu, AI assistant trigger -->
<header class="sticky top-0 z-50 bg-white border-b border-gray-200">
  <div class="container-wide mx-auto px-6">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <img src="igx-logo.svg" alt="IGX Technology" class="h-8" />
      </div>
      
      <!-- Search Bar (prominent, center) -->
      <div class="flex-1 max-w-2xl mx-8">
        <div class="relative">
          <input type="search" 
                 class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-igx-primary-500" 
                 placeholder="Search documentation..." />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <!-- Right actions -->
      <div class="flex items-center space-x-4">
        <button class="btn-ai">AI Assistant</button>
        <button>Sign In</button>
        <div class="user-avatar"></div>
      </div>
    </div>
  </div>
</header>
```

**Features**:
- Sticky positioning
- Prominent search bar with Command K shortcut
- AI Assistant quick access
- User menu/avatar
- Responsive mobile menu

#### Left Sidebar Navigation
```html
<aside class="fixed left-0 top-16 bottom-0 w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto">
  <nav class="p-4 space-y-1">
    <div class="nav-section">
      <h3 class="nav-section-title">Getting Started</h3>
      <ul class="nav-list">
        <li><a href="#" class="nav-link active">Introduction</a></li>
        <li><a href="#" class="nav-link">Quick Start</a></li>
      </ul>
    </div>
    
    <div class="nav-section">
      <h3 class="nav-section-title">Products</h3>
      <ul class="nav-list">
        <li><a href="#" class="nav-link">CMS</a></li>
        <li><a href="#" class="nav-link">Portal Builder</a></li>
      </ul>
    </div>
  </nav>
</aside>
```

**Features**:
- Collapsible sections
- Active state indicators
- Nested navigation support
- Smooth scrolling

#### Breadcrumb Navigation
```html
<nav class="breadcrumb">
  <ol class="flex items-center space-x-2 text-sm text-gray-500">
    <li><a href="/" class="hover:text-igx-primary-600">Home</a></li>
    <li><span class="text-gray-300">/</span></li>
    <li><a href="/products" class="hover:text-igx-primary-600">Products</a></li>
    <li><span class="text-gray-300">/</span></li>
    <li class="text-gray-900 font-medium">CMS</li>
  </ol>
</nav>
```

### 5.2 Content Components

#### Documentation Article Block
```html
<article class="doc-article max-w-4xl">
  <header class="doc-header mb-8">
    <h1 class="text-heading-1 text-gray-900 mb-2">Article Title</h1>
    <p class="text-body-lg text-gray-600">Brief description or subtitle</p>
    <div class="flex items-center space-x-4 mt-4 text-sm text-gray-500">
      <span>Last updated: Oct 30, 2025</span>
      <span>•</span>
      <span>5 min read</span>
    </div>
  </header>
  
  <div class="doc-content prose prose-lg">
    <!-- Markdown-style content -->
  </div>
</article>
```

#### Code Block with AI Features
```html
<div class="code-block-wrapper group relative">
  <!-- AI Action Bar -->
  <div class="code-actions absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
    <button class="btn-code-action" title="AI Explain">
      <svg class="w-4 h-4" />
    </button>
    <button class="btn-code-action" title="Copy">
      <svg class="w-4 h-4" />
    </button>
  </div>
  
  <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
    <code class="language-javascript">
// Code example
    </code>
  </pre>
</div>
```

#### Info/Warning Callouts
```html
<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <h4 class="callout-title">Info</h4>
    <p>Important information for users.</p>
  </div>
</div>

<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <h4 class="callout-title">Warning</h4>
    <p>Caution: This action cannot be undone.</p>
  </div>
</div>
```

### 5.3 AI Feature Components

#### AI Search Enhancement
```html
<div class="ai-search-results">
  <div class="ai-answer-card bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
    <div class="flex items-start space-x-3">
      <div class="ai-icon bg-igx-accent-600 text-white rounded-lg p-2">
        <svg class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <h3 class="text-heading-4 mb-2">AI Summary</h3>
        <p class="text-body text-gray-700">
          Based on your search, here's what you need to know...
        </p>
        <div class="flex space-x-4 mt-4 text-sm">
          <button class="text-igx-accent-600 hover:text-igx-accent-700">View full answer</button>
          <button class="text-gray-500 hover:text-gray-700">Ask follow-up</button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="search-results">
    <!-- Traditional search results -->
  </div>
</div>
```

#### AI Chatbot Panel (Slide-out)
```html
<div id="ai-chatbot" class="fixed right-0 top-16 bottom-0 w-96 bg-white border-l border-gray-200 shadow-2xl transform translate-x-full transition-transform">
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div class="flex items-center space-x-2">
        <div class="ai-avatar"></div>
        <div>
          <h3 class="font-semibold">IGX Assistant</h3>
          <p class="text-xs text-gray-500">AI-powered help</p>
        </div>
      </div>
      <button class="close-btn">×</button>
    </div>
    
    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Messages -->
    </div>
    
    <!-- Input -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex space-x-2">
        <input type="text" 
               class="flex-1 px-3 py-2 border rounded-lg" 
               placeholder="Ask anything..." />
        <button class="btn-ai">Send</button>
      </div>
    </div>
  </div>
</div>
```

#### AI Code Explainer Modal
```html
<div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="modal-content bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
    <div class="modal-header flex items-center justify-between p-6 border-b">
      <h2 class="text-heading-3">AI Code Explanation</h2>
      <button class="close-btn">×</button>
    </div>
    
    <div class="modal-body p-6 overflow-y-auto">
      <div class="grid grid-cols-2 gap-6">
        <!-- Original Code -->
        <div>
          <h3 class="text-heading-5 mb-3">Code</h3>
          <pre class="bg-gray-900 text-gray-100 rounded p-4"><code>...</code></pre>
        </div>
        
        <!-- AI Explanation -->
        <div>
          <h3 class="text-heading-5 mb-3">Explanation</h3>
          <div class="prose">
            <p>This code does the following...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### AI Summarize Feature
```html
<div class="ai-summary-panel bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-igx-accent-600 rounded-lg p-6">
  <div class="flex items-start space-x-4">
    <div class="ai-sparkle-icon">✨</div>
    <div class="flex-1">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-heading-4">AI Summary</h3>
        <button class="text-sm text-igx-accent-600 hover:text-igx-accent-700">Generate</button>
      </div>
      <div class="summary-content text-gray-700">
        <h4 class="font-semibold mb-2">Key Points:</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>Point 1</li>
          <li>Point 2</li>
          <li>Point 3</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

#### Text-to-Voice Player
```html
<div class="audio-player-ai bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
  <div class="flex items-center space-x-4">
    <button class="play-pause-btn w-10 h-10 bg-igx-accent-600 text-white rounded-full flex items-center justify-center">
      <svg class="w-5 h-5" />
    </button>
    
    <div class="flex-1">
      <div class="progress-bar bg-gray-200 rounded-full h-2">
        <div class="progress bg-igx-accent-600 h-2 rounded-full" style="width: 30%"></div>
      </div>
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>0:45</span>
        <span>2:30</span>
      </div>
    </div>
    
    <div class="flex items-center space-x-2">
      <button class="voice-select text-sm text-gray-600">Voice</button>
      <button class="speed-select text-sm text-gray-600">1x</button>
    </div>
  </div>
</div>
```

---

## 6. Page Template Definitions

### 6.1 Home Page Template

**Purpose**: Landing page for the documentation portal

**Layout**:
```
┌─────────────────────────────────────────┐
│          HEADER (Navigation)             │
├─────────────────────────────────────────┤
│                                          │
│           HERO SECTION                   │
│     Search + Quick Links + AI CTA        │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│       FEATURED CONTENT GRID              │
│    [Getting Started] [Products] [API]   │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│         AI FEATURES SHOWCASE             │
│   (Search, Explain, Summarize, etc.)    │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│        POPULAR ARTICLES SECTION          │
│                                          │
├─────────────────────────────────────────┤
│              FOOTER                      │
└─────────────────────────────────────────┘
```

**Key Components**:
- Hero with large search bar
- AI capabilities spotlight
- Featured documentation categories (cards)
- Popular/recent articles
- Quick start guides
- Video tutorials section (optional)

**AI Features**:
- AI-powered search prominently displayed
- "Ask AI anything" CTA
- Suggested questions based on popular searches

---

### 6.2 Documentation Page Template

**Purpose**: Individual article/guide display

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│              HEADER (Navigation)                     │
├──────────┬──────────────────────────┬───────────────┤
│          │                          │               │
│  LEFT    │      MAIN CONTENT        │  RIGHT        │
│  SIDEBAR │                          │  SIDEBAR      │
│          │  - Breadcrumb            │               │
│  [Nav    │  - Article Header        │  [TOC]        │
│   Tree]  │  - Content Body          │  [AI Tools]   │
│          │  - Code Blocks           │  [Related]    │
│          │  - Images/Diagrams       │               │
│          │                          │               │
│  280px   │      Fluid 600-900px     │   240px       │
│          │                          │               │
├──────────┴──────────────────────────┴───────────────┤
│              FOOTER                                  │
└─────────────────────────────────────────────────────┘
```

**Key Components**:
- Left sidebar: Persistent navigation tree
- Main content: Article with rich formatting
- Right sidebar: 
  - Table of contents (auto-generated)
  - AI tools (summarize, explain, text-to-voice)
  - Related articles
  - Feedback widget
- Bottom: Previous/Next navigation
- Floating AI chatbot button

**AI Features**:
- "Summarize this article" button
- "Explain code" on hover over code blocks
- "Chat about this doc" in sidebar
- Text-to-voice reader
- AI-suggested related content

---

### 6.3 Product Page Template

**Purpose**: Product overview and documentation hub

**Layout**:
```
┌─────────────────────────────────────────┐
│          HEADER (Navigation)             │
├─────────────────────────────────────────┤
│                                          │
│        PRODUCT HERO                      │
│  Logo + Title + Description + CTAs       │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│       QUICK START CARDS                  │
│   [Install] [Configure] [First App]     │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│    KEY FEATURES (with icons/visuals)    │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│     DOCUMENTATION SECTIONS               │
│  - Getting Started                       │
│  - API Reference                         │
│  - Tutorials                             │
│  - Best Practices                        │
│                                          │
├─────────────────────────────────────────┤
│              FOOTER                      │
└─────────────────────────────────────────┘
```

**Key Components**:
- Product hero with visual
- Quick start guide cards
- Feature highlights
- Documentation section links
- Video tutorials
- Code examples
- Downloads/resources
- Support links

**AI Features**:
- "Ask AI about this product" widget
- AI-generated getting started path
- Smart search scoped to product docs

---

### 6.4 User Profile Page Template

**Purpose**: User account management and personalization

**Layout**:
```
┌─────────────────────────────────────────┐
│          HEADER (Navigation)             │
├──────────┬──────────────────────────────┤
│          │                              │
│  SIDE    │     PROFILE CONTENT          │
│  MENU    │                              │
│          │  - Profile Info              │
│  Profile │  - Settings                  │
│  Settings│  - Bookmarks                 │
│  API Keys│  - History                   │
│  History │  - AI Preferences            │
│  Bookmarks│                             │
│          │                              │
│  200px   │       Fluid                  │
│          │                              │
├──────────┴──────────────────────────────┤
│              FOOTER                      │
└─────────────────────────────────────────┘
```

**Key Components**:

#### Profile Info Section
- Avatar upload
- Name, email, role
- Organization/company
- Contact preferences

#### Settings Section
- Appearance (light/dark mode)
- Language preferences
- Notification settings
- AI assistant preferences

#### Bookmarks/Saved Articles
- Grid of saved documentation
- Organize by collections
- AI-suggested content based on history

#### Reading History
- Recent articles viewed
- Continue reading suggestions
- Time spent on topics

#### AI Preferences
- Preferred AI voice for text-to-speech
- AI assistance level (minimal, moderate, full)
- Chat history management
- AI training opt-in/out

**AI Features**:
- Personalized documentation recommendations
- Learning path suggestions
- AI usage analytics
- Custom AI assistant training on user's interests

---

## 7. AI Feature Specifications

### 7.1 AI Search

**Visual Design**:
- Prominent search bar with AI sparkle icon
- AI-generated answer card above traditional results
- Confidence indicator
- Source citations with links

**Functionality**:
- Natural language query processing
- Semantic search across all documentation
- Real-time suggestions as user types
- Filter by product, topic, content type
- Search history and saved searches

**UI States**:
- Idle: Placeholder with example questions
- Loading: Animated AI thinking indicator
- Results: AI answer + traditional results
- No results: AI-suggested alternative queries

---

### 7.2 Code Explainer

**Trigger**: Hover over code block + "Explain" button

**Modal Design**:
- Split view: code on left, explanation on right
- Line-by-line breakdown option
- Complexity indicator
- Related concepts links

**Functionality**:
- Explain entire code block
- Explain selected code snippet
- Suggest optimizations
- Show alternative implementations

---

### 7.3 Summarize Article

**Trigger**: Button in right sidebar or bottom of article

**Display**:
- Collapsible panel or modal
- Key points as bullet list
- Estimated reading time savings
- "Read full article" link

**Functionality**:
- Generate concise summary (3-5 bullets)
- Highlight most important sections
- Extract code examples
- Summarize in different lengths (brief, detailed)

---

### 7.4 Text-to-Voice

**Trigger**: Audio icon in toolbar or sidebar

**Player Design**:
- Sticky player bar (can minimize)
- Play/pause, skip, rewind controls
- Progress bar with time stamps
- Voice selection (male/female, accents)
- Speed control (0.5x to 2x)

**Functionality**:
- Read entire article
- Read selected text only
- Pause on code blocks (with option to read or skip)
- Downloadable audio option
- Background playback

---

### 7.5 Chat with Doc/Code

**Trigger**: Floating chatbot button or sidebar widget

**Chat Interface**:
- Slide-out panel (right side)
- Context-aware (knows current page/code)
- Message history
- Quick action buttons (Explain, Summarize, Examples)

**Functionality**:
- Ask questions about current documentation
- Request code examples
- Clarify technical concepts
- Multi-turn conversation
- Suggest related topics

**Sample Interactions**:
- "How do I implement this?"
- "Show me an example"
- "What's the difference between X and Y?"
- "Explain this error message"

---

### 7.6 AI Chatbot (Global)

**Trigger**: "AI Assistant" button in header or floating FAB

**Design**:
- Full-screen or large modal
- Chat history across sessions
- Suggested starter questions
- Typing indicators
- Source citations

**Functionality**:
- Answer any IGX-related question
- Navigate to relevant documentation
- Generate code examples
- Troubleshoot issues
- Multi-product knowledge
- Escalate to human support

---

## 8. UI/UX Patterns & Interactions

### 8.1 Micro-interactions

**Hover States**:
- Cards: Subtle lift (translateY(-2px)) + shadow
- Buttons: Color darken + scale(1.02)
- Links: Underline animation
- AI elements: Glow effect

**Loading States**:
- Skeleton screens for content
- Pulse animation for AI processing
- Progress indicators for long operations

**Success States**:
- Checkmark animations
- Brief success toast notifications
- Subtle color transitions

**Transitions**:
- 150-200ms ease-in-out for most interactions
- 300-400ms for page transitions
- Smooth scroll for anchor links

### 8.2 Responsive Behavior

**Mobile (< 768px)**:
- Hamburger menu for navigation
- Full-width search
- Stacked content layout
- Bottom sheet for AI chatbot
- Swipe gestures for sidebar

**Tablet (768px - 1024px)**:
- Collapsible sidebar
- Optimized touch targets (44px minimum)
- Simplified AI panels

**Desktop (> 1024px)**:
- Full three-column layout
- Hover interactions enabled
- Persistent sidebars
- Slide-out AI panels

### 8.3 Accessibility Features

**Keyboard Navigation**:
- Tab order follows visual flow
- Skip to content link
- Keyboard shortcuts for common actions
  - `Ctrl/Cmd + K`: Open search
  - `Ctrl/Cmd + /`: Open AI assistant
  - `Escape`: Close modals/panels

**Screen Readers**:
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Alt text for all images
- Status announcements for AI operations

**Color Contrast**:
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text
- Focus indicators on all interactive elements

**Motion**:
- Respect prefers-reduced-motion
- Option to disable animations

---

## 9. Technical Implementation Details

### 9.1 File Structure

```
igx-docs-portal/
├── index.html                 # Home page
├── css/
│   ├── tailwind.min.css      # Compiled Tailwind
│   └── custom.css            # Custom styles
├── js/
│   ├── main.js               # Core functionality
│   ├── search.js             # Search functionality
│   ├── ai-features.js        # AI components
│   └── navigation.js         # Nav and routing
├── templates/
│   ├── home.html
│   ├── doc-page.html
│   ├── product.html
│   └── user-profile.html
├── components/
│   ├── header.html
│   ├── footer.html
│   ├── sidebar.html
│   ├── ai-chatbot.html
│   └── code-block.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── docs/
    └── [documentation content]
```

### 9.2 Tailwind CSS Setup

**Option 1: CDN (Quick Start)**
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          igx: {
            primary: { /* colors */ },
            accent: { /* colors */ }
          }
        }
      }
    }
  }
</script>
```

**Option 2: Build Process (Production)**
```bash
# Install Tailwind
npm install -D tailwindcss
npx tailwindcss init

# Build command
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### 9.3 Core JavaScript Features

**Required Functionality**:
- Search with autocomplete
- Navigation tree expand/collapse
- Mobile menu toggle
- Modal open/close
- Tab switching
- Copy code button
- Dark mode toggle
- Smooth scroll
- AI chatbot interactions

**Vanilla JS Approach** (No frameworks):
```javascript
// Example: AI Chatbot Toggle
const aiChatbot = document.getElementById('ai-chatbot');
const aiTrigger = document.getElementById('ai-trigger');

aiTrigger.addEventListener('click', () => {
  aiChatbot.classList.toggle('translate-x-full');
});
```

### 9.4 AI Integration Points

**Mock AI Responses** (for templates):
- Use placeholder responses for demonstration
- Simulate loading states with setTimeout
- Show example AI-generated content

**Future Integration**:
- REST API endpoints for AI services
- WebSocket for real-time chat
- Server-sent events for streaming responses

---

## 10. Component CSS Classes Reference

### Button Styles

```css
/* Primary Button */
.btn-primary {
  @apply bg-igx-primary-600 text-white px-4 py-2 rounded-lg font-medium;
  @apply hover:bg-igx-primary-700 transition-colors;
  @apply focus:ring-2 focus:ring-igx-primary-500 focus:ring-offset-2;
}

/* AI Button (special styling) */
.btn-ai {
  @apply bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium;
  @apply hover:from-purple-700 hover:to-blue-700 transition-all;
  @apply shadow-lg shadow-purple-500/20;
  @apply flex items-center space-x-2;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-white text-igx-primary-600 px-4 py-2 rounded-lg font-medium border border-igx-primary-600;
  @apply hover:bg-igx-primary-50 transition-colors;
}

/* Icon Button */
.btn-icon {
  @apply w-10 h-10 flex items-center justify-center rounded-lg text-gray-600;
  @apply hover:bg-gray-100 transition-colors;
}
```

### Card Styles

```css
/* Standard Card */
.card {
  @apply bg-white rounded-xl border border-gray-200 p-6;
  @apply shadow-sm hover:shadow-md transition-shadow;
}

/* AI Feature Card */
.card-ai {
  @apply bg-gradient-to-br from-purple-50 to-blue-50;
  @apply border-2 border-purple-200 rounded-xl p-6;
  @apply relative overflow-hidden;
}

/* Code Block Wrapper */
.code-block {
  @apply bg-gray-900 rounded-lg overflow-hidden;
  @apply border border-gray-700;
}
```

### Navigation Styles

```css
/* Nav Link */
.nav-link {
  @apply block px-4 py-2 rounded-lg text-sm font-medium text-gray-700;
  @apply hover:bg-gray-100 hover:text-igx-primary-600 transition-colors;
}

.nav-link.active {
  @apply bg-igx-primary-50 text-igx-primary-600 font-semibold;
}

/* Nav Section Title */
.nav-section-title {
  @apply px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider;
}
```

### AI Component Styles

```css
/* AI Icon/Badge */
.ai-badge {
  @apply inline-flex items-center px-2 py-1 rounded-full;
  @apply bg-gradient-to-r from-purple-100 to-blue-100;
  @apply text-purple-700 text-xs font-semibold;
}

/* AI Glow Effect */
.ai-glow {
  @apply shadow-lg shadow-purple-500/30;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
  50% { box-shadow: 0 0 30px rgba(124, 58, 237, 0.5); }
}
```

---

## 11. Content Guidelines

### Writing Style
- **Clear & Concise**: Get to the point quickly
- **Action-Oriented**: Use imperative verbs (Create, Configure, Deploy)
- **Scannable**: Use headings, lists, and short paragraphs
- **Technical but Accessible**: Explain jargon on first use
- **Consistent Terminology**: Use IGX-specific terms consistently

### Code Examples
- **Syntax Highlighting**: Use language-specific highlighting
- **Copy Button**: Every code block should be copyable
- **Comments**: Explain non-obvious code
- **Complete Examples**: Show full, working examples when possible
- **Multiple Languages**: Provide examples in popular languages

### Images & Diagrams
- **Alt Text**: Descriptive alt text for accessibility
- **Captions**: Explain what the image shows
- **Diagrams**: Use consistent visual style (consider Mermaid.js)
- **Screenshots**: Keep them current, use callouts for clarity

---

## 12. Implementation Roadmap

### Phase 1: Core Structure (Week 1-2)
- [ ] Set up project structure
- [ ] Implement Tailwind CSS
- [ ] Create base HTML templates
- [ ] Build header and footer components
- [ ] Implement navigation system
- [ ] Create home page template
- [ ] Basic responsive design

### Phase 2: Content Pages (Week 3-4)
- [ ] Documentation page template
- [ ] Product page template
- [ ] User profile page template
- [ ] Sidebar navigation with tree structure
- [ ] Breadcrumb implementation
- [ ] Table of contents auto-generation
- [ ] Code syntax highlighting

### Phase 3: AI Features (Week 5-6)
- [ ] AI chatbot UI (mock functionality)
- [ ] AI search interface
- [ ] Code explainer modal
- [ ] Summarize article feature
- [ ] Text-to-voice player
- [ ] "Chat with doc" interface
- [ ] AI feature animations and effects

### Phase 4: Polish & Testing (Week 7-8)
- [ ] Accessibility audit and fixes
- [ ] Cross-browser testing
- [ ] Mobile responsiveness refinement
- [ ] Performance optimization
- [ ] Documentation of components
- [ ] Final design QA

---

## 13. Design Assets Needed

### Icons
- Lucide Icons (recommended): https://lucide.dev
- Custom AI-themed icons:
  - AI sparkle/star
  - Neural network nodes
  - Code explanation icon
  - Voice/audio icon
  - Chat bubble with AI indicator

### Images
- IGX logo (SVG format, light/dark versions)
- Product illustrations
- Feature showcase graphics
- User avatar placeholders
- Empty state illustrations

### Animations
- AI thinking/loading animation (Lottie or CSS)
- Success/error state animations
- Page transition effects
- Hover micro-animations

---

## 14. Design System Maintenance

### Design Tokens
Create a centralized design token system for:
- Colors
- Typography scales
- Spacing values
- Border radius values
- Shadow styles
- Animation durations

### Component Documentation
Each component should have:
- Visual examples
- HTML markup
- CSS classes
- JavaScript (if applicable)
- Accessibility notes
- Usage guidelines

### Version Control
- Semantic versioning for design updates
- Changelog for design system changes
- Migration guides for breaking changes

---

## 15. Inspiration & References

### Primary Inspiration
- **Modern Documentation Portals**: Clean layout, prominent search, user-friendly navigation
- **Stripe Docs**: API reference design patterns
- **Vercel Docs**: Modern aesthetic, smooth interactions
- **OpenAI Platform**: AI-forward design language

### Color & Visual Style
- **Linear App**: Subtle gradients and shadows
- **Tailwind UI**: Component patterns and layouts
- **Radix UI**: Accessible component primitives

### AI Feature UX
- **ChatGPT**: Conversational AI interface patterns
- **GitHub Copilot**: Code explanation and suggestions
- **Perplexity**: AI search answer presentation

---

## 16. Success Metrics

### User Experience
- **Time to find information**: < 30 seconds
- **Search success rate**: > 80%
- **Mobile usability score**: > 90
- **Accessibility score**: WCAG 2.1 AA (100%)

### AI Feature Adoption
- **AI search usage**: Track % of searches using AI
- **Code explainer usage**: Track interactions
- **Chatbot engagement**: Track conversations started
- **Text-to-voice usage**: Track audio playback

### Performance
- **Page load time**: < 2 seconds
- **Time to interactive**: < 3 seconds
- **Lighthouse score**: > 90

---

## Next Steps

1. **Review & Approve**: Review this style guide with stakeholders
2. **Design Mockups**: Create high-fidelity mockups in Figma/Sketch
3. **Build Templates**: Start with home page HTML template
4. **Component Library**: Build reusable components
5. **Content Migration**: Plan content structure and migration
6. **AI Integration**: Design API contracts for AI features
7. **Testing Plan**: Create comprehensive testing checklist

---

## Contact & Resources

- **Design System Repository**: [Link to Git repo]
- **Figma Design Files**: [Link to Figma]
- **Component Storybook**: [Link to Storybook]
- **Feedback**: [Design team email/Slack channel]

---

**Document Version**: 1.0  
**Last Updated**: October 30, 2025  
**Maintained By**: IGX Design Team

