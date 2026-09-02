# DITA XSLT Rendering Contract

Defines the HTML output patterns produced by `dcx-dita-rendering.xsl` and styled by `css/design-system/content.css`. This is the agreement between the XSLT author and the CSS author.

## XSLT File

**Source:** `xslt/dcx-dita-rendering.xsl` (forked from Ingeniux STL `dita-rendering.xsl`)
**Deploy to:** CMS Asset Tree → `StyleSheets/_dita_/` (alongside or replacing the original)

## Output Patterns

### Notes / Callouts

| DITA | Output |
|------|--------|
| `<note>` | `<div class="callout callout-note">` |
| `<note type="warning">` | `<div class="callout callout-warning">` |
| `<note type="tip">` | `<div class="callout callout-tip">` |
| `<note type="caution">` | `<div class="callout callout-caution">` |
| `<note type="danger">` | `<div class="callout callout-danger">` |
| `<note type="important">` | `<div class="callout callout-important">` |
| `<note type="trouble">` | `<div class="callout callout-trouble">` |

```html
<div class="callout callout-warning" role="note">
  <p class="callout-title">Warning</p>
  <div class="callout-body">
    <p>Content here.</p>
  </div>
</div>
```

### Code Blocks

| DITA | Output |
|------|--------|
| `<codeblock>` | `<div class="code-block">` |
| `<codeblock outputclass="language-xml">` | `<code class="language-xml">` |
| `<codeph>` | `<code class="codeph">` |

```html
<div class="code-block">
  <div class="code-header">
    <span class="code-language">XML</span>
    <button class="code-copy" data-copy="true">Copy</button>
  </div>
  <pre><code class="language-xml">content</code></pre>
</div>
```

### Tables

| DITA | Output |
|------|--------|
| `<table>` | `<div class="content-table"><table>` |
| `<table><title>` | `<caption>` |

```html
<div class="content-table">
  <table>
    <caption>Table Title</caption>
    <thead><tr><th>Header</th></tr></thead>
    <tbody><tr><td>Cell</td></tr></tbody>
  </table>
</div>
```

### Figures

| DITA | Output |
|------|--------|
| `<fig>` | `<figure>` |
| `<fig><title>` | `<figcaption>` |
| `<image>` | `<img>` |

### Steps (Task Topics)

| DITA | Output |
|------|--------|
| `<steps>` | `<ol class="ol steps">` |
| `<step>` | `<li class="li step stepexpanded">` |
| `<steps-unordered>` | `<ul class="ul steps">` |
| `<substeps>` | `<ol class="ol substeps">` |
| `<cmd>` | `<span class="ph cmd">` |

### Inline Elements

| DITA | Output | CSS Target |
|------|--------|-----------|
| `<uicontrol>` | `<kbd>` | `kbd` |
| `<filepath>` | `<code class="filepath">` | `code.filepath` |
| `<menucascade>` | `<span class="menucascade"><kbd>File</kbd> › <kbd>Save</kbd></span>` | `.menucascade` |
| `<codeph>` | `<code class="codeph">` | `code.codeph` |
| `<wintitle>` | `<span class="keyword wintitle">` | `.wintitle` |
| `<shortcut>` | `<span class="shortcut">` | `.shortcut` |

### Sections

| DITA | Output |
|------|--------|
| `<section>` | `<section class="content-section">` |
| `<shortdesc>` | `<p class="shortdesc">` |

### Definition Lists

| DITA | Output |
|------|--------|
| `<dl>` | `<dl>` |
| `<dt>` | `<dt>` |
| `<dd>` | `<dd>` |

### Differences from STL XSLT

| Element | STL Output | DCX Output |
|---------|-----------|------------|
| Note | `.note-wrap > .notice-inner > .heading + .content` | `.callout.callout-{type} > .callout-title + .callout-body` |
| Codeblock | `.code-wrapper > .code-bar (Bootstrap grid) > pre > code` | `.code-block > .code-header + pre > code` |
| Table | `.table-wrap.scroll > table` | `.content-table > table` |
| UI Control | `<span class="ph uicontrol">` | `<kbd>` |
| Filepath | `<span class="filepath">` | `<code class="filepath">` |
| Menu cascade | `<span class="uicontrol">` with ` > ` text | `<kbd>` with ` › ` separator span |
| Section | `<div class="section">` | `<section class="content-section">` |
| Shortdesc | Commented out (empty) | `<p class="shortdesc">` |
