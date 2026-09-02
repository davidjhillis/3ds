/**
 * Shared User Dropdown + Notification Bell
 * Injected into all pages. Single source of truth.
 */
(function () {
  'use strict';

  // Inject scrollbar styles for notification panel
  const style = document.createElement('style');
  style.textContent = `
    .notification-scroll { scrollbar-width: thin; scrollbar-color: rgba(100,100,100,0.3) transparent; }
    .notification-scroll::-webkit-scrollbar { width: 6px; }
    .notification-scroll::-webkit-scrollbar-track { background: transparent; }
    .notification-scroll::-webkit-scrollbar-thumb { background: rgba(100,100,100,0.3); border-radius: 3px; }
    .notification-scroll::-webkit-scrollbar-thumb:hover { background: rgba(100,100,100,0.5); }
  `;
  document.head.appendChild(style);

  const isProfilePage = window.location.pathname.includes('user-profile');
  const profileLink = (hash) => isProfilePage ? `#${hash}` : `user-profile.html#${hash}`;

  // ── User Dropdown ──────────────────────────────────────────────

  const dropdownHTML = `
    <div class="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
      <p class="text-sm font-semibold text-neutral-900 dark:text-white">Jane Doe</p>
      <p class="text-xs text-neutral-600 dark:text-neutral-400">jane.doe@company.com</p>
    </div>
    <div class="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
      <div class="flex items-center justify-between gap-2">
        <button id="theme-auto" class="flex-1 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" title="Auto"><i data-lucide="monitor" class="w-4 h-4 mx-auto text-neutral-600 dark:text-neutral-400"></i></button>
        <button id="theme-light" class="flex-1 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" title="Light"><i data-lucide="sun" class="w-4 h-4 mx-auto text-yellow-600 dark:text-yellow-400"></i></button>
        <button id="theme-dark" class="flex-1 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" title="Dark"><i data-lucide="moon" class="w-4 h-4 mx-auto text-neutral-600 dark:text-neutral-400"></i></button>
      </div>
    </div>
    <div class="py-2">
      <a href="${isProfilePage ? '#' : 'user-profile.html'}" class="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
        <i data-lucide="user" class="w-4 h-4 text-neutral-600 dark:text-neutral-400"></i>
        <span class="text-sm text-neutral-900 dark:text-white">My Profile</span>
      </a>
      <a href="${profileLink('bookmarks')}" class="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
        <i data-lucide="bookmark" class="w-4 h-4 text-neutral-600 dark:text-neutral-400"></i>
        <span class="text-sm text-neutral-900 dark:text-white">Bookmarks</span>
        <span class="ml-auto text-xs font-semibold text-neutral-400">23</span>
      </a>
      <a href="${profileLink('watched')}" class="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
        <i data-lucide="eye" class="w-4 h-4 text-neutral-600 dark:text-neutral-400"></i>
        <span class="text-sm text-neutral-900 dark:text-white">Watched Pages</span>
      </a>
      <a href="settings.html" class="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
        <i data-lucide="settings" class="w-4 h-4 text-neutral-600 dark:text-neutral-400"></i>
        <span class="text-sm text-neutral-900 dark:text-white">Site Settings</span>
      </a>
    </div>
    <div class="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>
    <div class="py-2">
      <a href="login.html" class="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
        <i data-lucide="log-out" class="w-4 h-4 text-red-600 dark:text-red-400"></i>
        <span class="text-sm text-red-600 dark:text-red-400 font-semibold">Log Out</span>
      </a>
    </div>
  `;

  const container = document.getElementById('user-dropdown');
  if (container) container.innerHTML = dropdownHTML;

  // ── Notification Bell + Panel ──────────────────────────────────

  const avatarBtn = document.getElementById('user-menu-btn');
  const avatarWrapper = avatarBtn?.closest('.relative');
  const actionsContainer = avatarWrapper?.parentElement;

  if (actionsContainer && avatarWrapper && !document.getElementById('notification-bell')) {
    // Create bell wrapper
    const bellWrapper = document.createElement('div');
    bellWrapper.className = 'relative';
    bellWrapper.innerHTML = `
      <button id="notification-bell" class="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors" title="Notifications">
        <i data-lucide="bell" class="w-5 h-5 text-neutral-600 dark:text-neutral-400"></i>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div id="notification-panel" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
          <p class="text-sm font-semibold text-neutral-900 dark:text-white">Notifications</p>
          <button id="mark-all-read" class="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">Mark all read</button>
        </div>
        <div class="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-700 notification-scroll">
          <a href="doc-page.html" class="flex items-start gap-3 px-4 py-3 bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900 dark:text-white">REST API Authentication updated</p>
              <p class="text-xs text-neutral-500 mt-0.5">New OAuth 2.0 examples added</p>
              <p class="text-xs text-neutral-400 mt-1">2 hours ago</p>
            </div>
          </a>
          <a href="doc-page.html" class="flex items-start gap-3 px-4 py-3 bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900 dark:text-white">New: Advanced Caching Strategies</p>
              <p class="text-xs text-neutral-500 mt-0.5">Published in Core Concepts</p>
              <p class="text-xs text-neutral-400 mt-1">5 hours ago</p>
            </div>
          </a>
          <a href="doc-page.html" class="flex items-start gap-3 px-4 py-3 bg-primary-50/50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-neutral-900 dark:text-white">Content Schema Configuration updated</p>
              <p class="text-xs text-neutral-500 mt-0.5">Schema field types section expanded</p>
              <p class="text-xs text-neutral-400 mt-1">Yesterday</p>
            </div>
          </a>
          <a href="doc-page.html" class="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
            <div class="w-1.5 h-1.5 mt-2 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Getting Started Guide updated</p>
              <p class="text-xs text-neutral-400 mt-1">3 days ago</p>
            </div>
          </a>
          <a href="doc-page.html" class="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
            <div class="w-1.5 h-1.5 mt-2 flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">Ingeniux CMS v11.5 docs available</p>
              <p class="text-xs text-neutral-400 mt-1">1 week ago</p>
            </div>
          </a>
        </div>
        <a href="${profileLink('subscriptions')}" class="block px-4 py-3 text-center text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 border-t border-neutral-200 dark:border-neutral-700 transition-colors">
          Manage notification preferences
        </a>
      </div>
    `;
    actionsContainer.insertBefore(bellWrapper, avatarWrapper);

    // Language switcher
    if (!document.getElementById('lang-switcher')) {
      const langWrapper = document.createElement('div');
      langWrapper.className = 'relative';
      langWrapper.innerHTML = `
        <button id="lang-switcher" class="flex items-center gap-1.5 px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-sm text-neutral-600 dark:text-neutral-400">
          <i data-lucide="globe" class="w-4 h-4"></i>
          <span class="hidden sm:inline" id="lang-current">EN</span>
        </button>
        <div id="lang-menu" class="hidden absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 py-1 z-50">
          <button data-lang="en" class="w-full flex items-center justify-between px-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
            <span>English</span><i data-lucide="check" class="w-4 h-4"></i>
          </button>
          <button data-lang="es" class="w-full flex items-center justify-between px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
            <span>Spanish</span>
          </button>
          <button data-lang="fr" class="w-full flex items-center justify-between px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
            <span>French</span>
          </button>
          <button data-lang="de" class="w-full flex items-center justify-between px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
            <span>German</span>
          </button>
          <button data-lang="ja" class="w-full flex items-center justify-between px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
            <span>Japanese</span>
          </button>
        </div>
      `;
      actionsContainer.insertBefore(langWrapper, bellWrapper);

      const langBtn = langWrapper.querySelector('#lang-switcher');
      const langMenu = langWrapper.querySelector('#lang-menu');

      langBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu?.classList.toggle('hidden');
        container?.classList.add('hidden');
        panel?.classList.add('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
      langMenu?.addEventListener('click', (e) => e.stopPropagation());

      // Language selection (demo — updates label and checkmark)
      langMenu?.querySelectorAll('[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.dataset.lang;
          document.getElementById('lang-current').textContent = lang.toUpperCase();
          document.documentElement.lang = lang;
          // Update checkmarks
          langMenu.querySelectorAll('[data-lang]').forEach(b => {
            const check = b.querySelector('[data-lucide="check"]');
            if (b.dataset.lang === lang) {
              b.classList.add('text-primary-600', 'dark:text-primary-400', 'font-medium');
              b.classList.remove('text-neutral-700', 'dark:text-neutral-300');
              if (!check) b.insertAdjacentHTML('beforeend', '<i data-lucide="check" class="w-4 h-4"></i>');
            } else {
              b.classList.remove('text-primary-600', 'dark:text-primary-400', 'font-medium');
              b.classList.add('text-neutral-700', 'dark:text-neutral-300');
              if (check) check.remove();
            }
          });
          langMenu.classList.add('hidden');
          if (typeof lucide !== 'undefined') lucide.createIcons();
        });
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Bell toggle
    const bell = bellWrapper.querySelector('#notification-bell');
    const panel = bellWrapper.querySelector('#notification-panel');
    bell?.addEventListener('click', (e) => {
      e.stopPropagation();
      panel?.classList.toggle('hidden');
      container?.classList.add('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    panel?.addEventListener('click', (e) => e.stopPropagation());

    // Mark all read
    bellWrapper.querySelector('#mark-all-read')?.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.querySelectorAll('.bg-primary-50\\/50, .dark\\:bg-primary-900\\/10').forEach(el => {
        el.classList.remove('bg-primary-50/50', 'dark:bg-primary-900/10');
      });
      panel.querySelectorAll('.bg-primary-500').forEach(dot => {
        dot.classList.remove('bg-primary-500');
      });
      bell.querySelector('.bg-red-500')?.remove();
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── Dropdown Toggle ────────────────────────────────────────────

  const btn = document.getElementById('user-menu-btn');
  if (btn && container) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      container.classList.toggle('hidden');
      document.getElementById('notification-panel')?.classList.add('hidden');
      document.getElementById('lang-menu')?.classList.add('hidden');
      document.getElementById('mobile-menu')?.classList.add('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    container.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', () => {
      container.classList.add('hidden');
      document.getElementById('notification-panel')?.classList.add('hidden');
      document.getElementById('lang-menu')?.classList.add('hidden');
    });
  }

  // ── Theme Switching ────────────────────────────────────────────

  function setTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') html.classList.add('dark');
    else if (theme === 'light') html.classList.remove('dark');
    else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.add('dark');
      else html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    updateThemeButtons(theme);
  }

  function updateThemeButtons(active) {
    ['auto', 'light', 'dark'].forEach((t) => {
      const el = document.getElementById(`theme-${t}`);
      if (!el) return;
      el.classList.remove('bg-yellow-100', 'dark:bg-yellow-900/30', 'bg-neutral-100', 'dark:bg-neutral-700');
      el.classList.add('hover:bg-neutral-100', 'dark:hover:bg-neutral-700');
    });
    const activeBtn = document.getElementById(`theme-${active}`);
    if (active === 'light' && activeBtn) {
      activeBtn.classList.add('bg-yellow-100', 'dark:bg-yellow-900/30');
      activeBtn.classList.remove('hover:bg-neutral-100', 'dark:hover:bg-neutral-700');
    } else if (activeBtn) {
      activeBtn.classList.add('bg-neutral-100', 'dark:bg-neutral-700');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  setTheme(localStorage.getItem('theme') || 'light');

  container?.addEventListener('click', (e) => {
    const btn = e.target.closest('[id^="theme-"]');
    if (!btn) return;
    e.stopPropagation();
    setTheme(btn.id.replace('theme-', ''));
  });
})();
