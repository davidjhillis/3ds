/**
 * Admin Navigation Component
 * Provides consistent navigation across all admin pages
 */

class AdminNav {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/theme/colors')) return 'colors';
    if (path.includes('/theme/typography')) return 'typography';
    if (path.includes('/theme/preview')) return 'preview';
    if (path.includes('/ai/features')) return 'ai-features';
    if (path.includes('/ai/models')) return 'ai-models';
    if (path.includes('/ai/safety')) return 'ai-safety';
    if (path.includes('/admin/index')) return 'dashboard';
    return 'dashboard';
  }

  init() {
    // Add navigation to body if it doesn't exist
    if (!document.querySelector('.admin-nav')) {
      this.render();
    }
    this.attachEventListeners();
  }

  render() {
    const nav = document.createElement('nav');
    nav.className = 'admin-nav hidden'; // Will be shown when needed
    nav.innerHTML = `
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-screen-2xl mx-auto px-6">
          <div class="flex items-center gap-6 h-12 overflow-x-auto">
            <a href="../index.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'dashboard' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="home" class="w-4 h-4"></i>
              Dashboard
            </a>
            <div class="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
            <a href="../theme/colors.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'colors' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="palette" class="w-4 h-4"></i>
              Colors
            </a>
            <a href="../theme/typography.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'typography' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="type" class="w-4 h-4"></i>
              Typography
            </a>
            <a href="../theme/preview.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'preview' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="eye" class="w-4 h-4"></i>
              Preview
            </a>
            <div class="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
            <a href="../ai/features.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'ai-features' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
              AI Features
            </a>
            <a href="../ai/models.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'ai-models' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="cpu" class="w-4 h-4"></i>
              Models
            </a>
            <a href="../ai/safety.html" class="nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${this.currentPage === 'ai-safety' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}">
              <i data-lucide="shield" class="w-4 h-4"></i>
              Safety
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Insert after header
    const header = document.querySelector('header');
    if (header) {
      header.after(nav);
      // Re-initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }

  attachEventListeners() {
    // Add any navigation-specific event listeners here
  }

  /**
   * Show the navigation (for subpages)
   */
  show() {
    const nav = document.querySelector('.admin-nav');
    if (nav) {
      nav.classList.remove('hidden');
    }
  }

  /**
   * Hide the navigation (for dashboard)
   */
  hide() {
    const nav = document.querySelector('.admin-nav');
    if (nav) {
      nav.classList.add('hidden');
    }
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.adminNav = new AdminNav();
  });
} else {
  window.adminNav = new AdminNav();
}

