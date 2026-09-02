/**
 * DCX Analytics - PostHog Event Tracking
 *
 * Captures user interactions and sends to PostHog.
 * Auto-instruments common UI patterns via data attributes.
 *
 * Setup:
 *   1. PostHog snippet loads in _Layout.cshtml (from SiteControl field)
 *   2. This script auto-captures events from data-track attributes
 *   3. Also exposes DCXAnalytics.track() for custom events
 *
 * Usage (declarative):
 *   <button data-track="feedback" data-props='{"type":"helpful","page":"getting-started"}'>
 *
 * Usage (imperative):
 *   DCXAnalytics.track('code_explained', { language: 'javascript', page: '/docs/api' });
 */
(function () {
  'use strict';

  // ── Core ───────────────────────────────────────────────────

  function track(event, properties) {
    var props = Object.assign({
      page_url: window.location.pathname,
      page_title: document.title,
      page_language: document.documentElement.lang || 'en',
      timestamp: new Date().toISOString()
    }, properties || {});

    // PostHog
    if (window.posthog) {
      window.posthog.capture(event, props);
    }

    // Debug mode
    if (DCXAnalytics.debug) {
      console.log('[DCX Analytics]', event, props);
    }
  }

  function identify(userId, traits) {
    if (window.posthog) {
      window.posthog.identify(userId, traits);
    }
  }

  // ── Event Definitions ──────────────────────────────────────

  var events = {
    // AI Assists
    AI_SUMMARY_REQUESTED:    'ai_summary_requested',
    AI_SUMMARY_FEEDBACK:     'ai_summary_feedback',
    AI_CODE_EXPLAINED:       'ai_code_explained',
    AI_CODE_QUESTION_ASKED:  'ai_code_question_asked',
    AI_CODE_FEEDBACK:        'ai_code_feedback',
    AI_CHAT_MESSAGE:         'ai_chat_message',
    AI_SEARCH_ANSWER_SHOWN:  'ai_search_answer_shown',
    AI_SEARCH_FEEDBACK:      'ai_search_feedback',

    // Content engagement
    BOOKMARK_ADDED:          'bookmark_added',
    BOOKMARK_REMOVED:        'bookmark_removed',
    WATCH_ADDED:             'watch_added',
    WATCH_REMOVED:           'watch_removed',
    ARTICLE_SHARED:          'article_shared',
    ARTICLE_DOWNLOADED:      'article_downloaded',

    // Navigation
    SEARCH_PERFORMED:        'search_performed',
    SEARCH_RESULT_CLICKED:   'search_result_clicked',
    NAV_ITEM_CLICKED:        'nav_item_clicked',
    LANGUAGE_CHANGED:        'language_changed',

    // User
    THEME_CHANGED:           'theme_changed',
    NOTIFICATION_CLICKED:    'notification_clicked',
    SUBSCRIPTION_TOGGLED:    'subscription_toggled',
    PROFILE_UPDATED:         'profile_updated'
  };

  // ── Auto-instrumentation ───────────────────────────────────

  function instrumentPage() {
    // Feedback buttons (thumbs up/down)
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-track]');
      if (btn) {
        var event = btn.dataset.track;
        var props = {};
        try { props = JSON.parse(btn.dataset.props || '{}'); } catch (err) {}
        track(event, props);
        return;
      }

      // Auto-detect common patterns without data attributes

      // Thumbs up/down on AI content
      var thumbsUp = e.target.closest('[title="Good"], [title="Yes"]');
      var thumbsDown = e.target.closest('[title="Bad"], [title="No"]');
      if (thumbsUp) {
        var context = thumbsUp.closest('.ai-summary-container, #ai-summary-container')
          ? 'summary'
          : thumbsUp.closest('[id^="code-explanation"]')
            ? 'code_explain'
            : 'search';
        track(events['AI_' + context.toUpperCase() + '_FEEDBACK'] || 'ai_feedback', {
          rating: 'positive',
          context: context
        });
      }
      if (thumbsDown) {
        var ctx = thumbsDown.closest('.ai-summary-container, #ai-summary-container')
          ? 'summary'
          : thumbsDown.closest('[id^="code-explanation"]')
            ? 'code_explain'
            : 'search';
        track(events['AI_' + ctx.toUpperCase() + '_FEEDBACK'] || 'ai_feedback', {
          rating: 'negative',
          context: ctx
        });
      }

      // Bookmark toggle
      var bookmarkBtn = e.target.closest('#bookmark-toggle');
      if (bookmarkBtn) {
        var isActive = bookmarkBtn.classList.contains('is-active');
        track(isActive ? events.BOOKMARK_ADDED : events.BOOKMARK_REMOVED);
      }

      // Watch toggle
      var watchBtn = e.target.closest('#watch-toggle');
      if (watchBtn) {
        var watching = watchBtn.classList.contains('is-active');
        track(watching ? events.WATCH_ADDED : events.WATCH_REMOVED);
      }

      // Explain code button
      var explainBtn = e.target.closest('.explain-code-btn');
      if (explainBtn) {
        var lang = explainBtn.closest('pre')?.querySelector('code')?.className?.match(/language-(\w+)/);
        track(events.AI_CODE_EXPLAINED, { language: lang ? lang[1] : 'unknown' });
      }

      // Summary button
      var summaryBtn = e.target.closest('#ai-summary-btn, [onclick*="generateSummary"]');
      if (summaryBtn) {
        track(events.AI_SUMMARY_REQUESTED);
      }

      // Share button
      var shareBtn = e.target.closest('[title="Share"]');
      if (shareBtn) {
        track(events.ARTICLE_SHARED);
      }

      // Download button
      var downloadBtn = e.target.closest('[title="Download PDF"]');
      if (downloadBtn) {
        track(events.ARTICLE_DOWNLOADED);
      }

      // Language switcher
      var langLink = e.target.closest('#lang-switcher-menu a');
      if (langLink) {
        track(events.LANGUAGE_CHANGED, { language: langLink.textContent.trim(), url: langLink.href });
      }

      // Notification clicked
      var notifItem = e.target.closest('#notification-panel a[href]');
      if (notifItem) {
        track(events.NOTIFICATION_CLICKED, { url: notifItem.href });
      }

      // Subscription toggle
      var subToggle = e.target.closest('#subscriptions-tab input[type="checkbox"]');
      if (subToggle) {
        var label = subToggle.closest('label')?.querySelector('p')?.textContent?.trim();
        track(events.SUBSCRIPTION_TOGGLED, { subscription: label, enabled: subToggle.checked });
      }
    });

    // Search form submission
    document.querySelectorAll('form[action*="search"], #cmd-k-input').forEach(function (el) {
      if (el.tagName === 'FORM') {
        el.addEventListener('submit', function () {
          var input = el.querySelector('input[name="term"]');
          if (input) track(events.SEARCH_PERFORMED, { query: input.value });
        });
      }
    });

    // Theme changes (listen for class changes on html)
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class') {
          var isDark = document.documentElement.classList.contains('dark');
          track(events.THEME_CHANGED, { theme: isDark ? 'dark' : 'light' });
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  // ── Init ───────────────────────────────────────────────────

  function init() {
    instrumentPage();
    // Page view with language
    track('page_viewed', {
      page_language: document.documentElement.lang || 'en'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Public API ─────────────────────────────────────────────

  window.DCXAnalytics = {
    track: track,
    identify: identify,
    events: events,
    debug: false
  };
})();
