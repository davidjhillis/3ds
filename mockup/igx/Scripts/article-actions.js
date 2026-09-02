/**
 * Article Actions — share menu, bookmark, watch, version dropdown, feedback.
 *
 * Loaded by DCX_DocPage.cshtml. Wires up the article toolbar buttons
 * rendered by the Razor view. Safe to load on non-doc pages — every
 * handler no-ops if its target element is not in the DOM.
 *
 * Bookmark and watch state is persisted via the CMS portal user system
 * (see /api/article-actions/bookmark and /api/article-actions/watch).
 * Until those endpoints are wired up, state is kept in localStorage.
 */
(function () {
  'use strict';

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function track(event, props) {
    if (window.DCXAnalytics && typeof window.DCXAnalytics.track === 'function') {
      window.DCXAnalytics.track(event, props || {});
    }
  }

  // ── Share menu ─────────────────────────────────────────────

  function initShareMenu() {
    var shareBtn = document.getElementById('share-btn');
    var shareMenu = document.getElementById('share-menu');
    if (!shareBtn || !shareMenu) return;

    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(
      document.querySelector('h1')?.textContent || document.title
    );

    // Populate share URLs (social providers expect encoded values)
    var emailLink = document.getElementById('share-email');
    if (emailLink) emailLink.href = 'mailto:?subject=' + pageTitle + '&body=' + pageUrl;

    var xLink = document.getElementById('share-x');
    if (xLink) xLink.href = 'https://x.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle;

    var linkedinLink = document.getElementById('share-linkedin');
    if (linkedinLink) linkedinLink.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;

    // Toggle menu
    shareBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      shareMenu.classList.toggle('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    shareMenu.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () {
      shareMenu.classList.add('hidden');
    });

    // Copy link
    var copyBtn = document.getElementById('share-copy-link');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          var label = copyBtn.querySelector('span');
          if (!label) return;
          var original = label.textContent;
          label.textContent = 'Copied!';
          setTimeout(function () { label.textContent = original; }, 2000);
        });
        shareMenu.classList.add('hidden');
        track('article_shared', { channel: 'copy_link' });
      });
    }

    // Track email / X / LinkedIn clicks
    ['share-email', 'share-x', 'share-linkedin'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function () {
          track('article_shared', { channel: id.replace('share-', '') });
        });
      }
    });
  }

  // ── Bookmark toggle ────────────────────────────────────────

  function initBookmarkToggle() {
    var btn = document.getElementById('bookmark-toggle');
    if (!btn) return;

    var pageId = document.body.dataset.pageId || window.location.pathname;
    var stored = localStorage.getItem('bookmark:' + pageId) === 'true';
    if (stored) setBookmarkState(btn, true);

    btn.addEventListener('click', function () {
      var on = !btn.classList.contains('is-active');
      setBookmarkState(btn, on);
      localStorage.setItem('bookmark:' + pageId, on ? 'true' : 'false');
      // TODO: POST /api/article-actions/bookmark { pageId, bookmarked: on }
      track(on ? 'bookmark_added' : 'bookmark_removed', { pageId: pageId });
    });
  }

  function setBookmarkState(btn, on) {
    if (on) btn.classList.add('is-active');
    else btn.classList.remove('is-active');
    var iconName = on ? 'bookmark-check' : 'bookmark';
    var color = on
      ? (isDark() ? '#a5b4fc' : '#4F46E5')
      : (isDark() ? '#9ca3af' : '#4B5563');
    var bg = on
      ? (isDark() ? 'rgba(99,102,241,0.15)' : 'rgba(238,242,255,1)')
      : '';
    btn.innerHTML = '<i data-lucide="' + iconName + '" class="w-5 h-5" style="color:' + color + '"></i>';
    btn.style.backgroundColor = bg;
    btn.title = on ? 'Bookmarked' : 'Bookmark this page';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── Watch toggle ───────────────────────────────────────────

  function initWatchToggle() {
    var btn = document.getElementById('watch-toggle');
    if (!btn) return;

    var pageId = document.body.dataset.pageId || window.location.pathname;
    var stored = localStorage.getItem('watch:' + pageId) === 'true';
    if (stored) setWatchState(btn, true);

    btn.addEventListener('click', function () {
      var on = !btn.classList.contains('is-active');
      setWatchState(btn, on);
      localStorage.setItem('watch:' + pageId, on ? 'true' : 'false');
      // TODO: POST /api/article-actions/watch { pageId, watching: on }
      track(on ? 'watch_added' : 'watch_removed', { pageId: pageId });
    });
  }

  function setWatchState(btn, on) {
    if (on) btn.classList.add('is-active');
    else btn.classList.remove('is-active');
    var color = on
      ? (isDark() ? '#86efac' : '#16a34a')
      : (isDark() ? '#9ca3af' : '#4B5563');
    var bg = on
      ? (isDark() ? 'rgba(34,197,94,0.15)' : 'rgba(240,253,244,1)')
      : '';
    btn.innerHTML = '<i data-lucide="eye" class="w-5 h-5" style="color:' + color + '"></i>';
    btn.style.backgroundColor = bg;
    btn.title = on ? 'Watching — click to unwatch' : 'Watch for changes';

    // Optional "Watching" label next to the button
    var existing = document.getElementById('watch-label');
    if (on && !existing) {
      var labelColor = isDark() ? '#86efac' : '#16a34a';
      btn.insertAdjacentHTML(
        'afterend',
        '<span id="watch-label" class="text-xs font-medium" style="color:' + labelColor + '">Watching</span>'
      );
    } else if (!on && existing) {
      existing.remove();
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── Version dropdown ───────────────────────────────────────

  function initVersionDropdown() {
    var btn = document.getElementById('version-dropdown-btn');
    var menu = document.getElementById('version-dropdown');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });
    menu.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { menu.classList.add('hidden'); });
  }

  // ── Feedback button ────────────────────────────────────────

  function initFeedbackButton() {
    var btn = document.getElementById('feedback-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      track('feedback_opened', { pageId: document.body.dataset.pageId || window.location.pathname });
      // Delegate to chatbot-widget if loaded, otherwise fall back to mailto
      if (window.DCXChatbot && typeof window.DCXChatbot.open === 'function') {
        window.DCXChatbot.open({ context: 'feedback' });
      } else {
        window.location.href = 'mailto:docs-feedback@discovercx.example?subject=Feedback on ' +
          encodeURIComponent(document.title);
      }
    });
  }

  // ── Init ───────────────────────────────────────────────────

  function init() {
    initShareMenu();
    initBookmarkToggle();
    initWatchToggle();
    initVersionDropdown();
    initFeedbackButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
