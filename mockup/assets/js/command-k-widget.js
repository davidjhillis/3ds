// Command K Search Widget - Reusable search modal component
(function() {
  'use strict';

  // Modal HTML
  const modalHTML = `
  <!-- Command K Search Modal -->
  <div id="cmd-k-modal" class="hidden fixed inset-0 bg-neutral-950/50 backdrop-blur-sm z-50 p-4 md:p-8">
    <div class="max-w-3xl mx-auto mt-20">
      <!-- Search Container -->
      <div class="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        
        <!-- Search Input -->
        <div class="flex items-center gap-3 px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <i data-lucide="search" class="w-5 h-5 text-neutral-400"></i>
          <input 
            id="cmd-k-input"
            type="text" 
            placeholder="Search or ask a question" 
            class="flex-1 bg-transparent text-neutral-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
            autocomplete="off"
          />
          <button id="cmd-k-close" class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
            <i data-lucide="x" class="w-5 h-5 text-neutral-400"></i>
          </button>
        </div>
        
        <!-- Filters -->
        <div class="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Filter:</span>
          <div class="flex gap-2">
            <button class="filter-btn active px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary-600 text-white">
              All Results
            </button>
            <button class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
              Documentation
            </button>
            <button class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600">
              AI Answers
            </button>
          </div>
        </div>
        
        <!-- Search Results -->
        <div id="cmd-k-results" class="max-h-96 overflow-y-auto">
          
          <!-- Recent Searches (when empty) -->
          <div id="recent-searches" class="p-4">
            <p class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">Recent Searches</p>
            <div class="space-y-1">
              <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
                <i data-lucide="clock" class="w-4 h-4 text-neutral-400"></i>
                <span class="text-sm text-neutral-700 dark:text-neutral-300">Getting started with component schemas</span>
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
                <i data-lucide="clock" class="w-4 h-4 text-neutral-400"></i>
                <span class="text-sm text-neutral-700 dark:text-neutral-300">API authentication methods</span>
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left">
                <i data-lucide="clock" class="w-4 h-4 text-neutral-400"></i>
                <span class="text-sm text-neutral-700 dark:text-neutral-300">Workflow automation examples</span>
              </button>
            </div>
          </div>
          
          <!-- Search Results (when searching) -->
          <div id="search-results" class="hidden">
            <!-- AI Answers (Top Priority) -->
            <div class="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/10 dark:to-blue-900/10">
              <p class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4 text-primary-600 dark:text-primary-400"></i>
                AI Answer
              </p>
              <div class="space-y-4">
                <div class="p-4 rounded-lg bg-white dark:bg-neutral-800 border border-primary-200 dark:border-primary-700">
                  <p class="text-base font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                    <i data-lucide="zap" class="w-5 h-5 text-primary-600 dark:text-primary-400"></i>
                    Quick Answer
                  </p>
                  <p class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    Component schemas in Discover CX allow you to define reusable content structures with custom fields, validation rules, and relationships. They act as templates for your content, ensuring consistency and enabling powerful content modeling capabilities across your entire system.
                  </p>
                  
                  <!-- Key Points -->
                  <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 mb-3">
                    <p class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Key Features:</p>
                    <ul class="text-xs text-neutral-600 dark:text-neutral-400 space-y-1 ml-4 list-disc">
                      <li>Define custom fields with validation</li>
                      <li>Create relationships between content types</li>
                      <li>Reusable across multiple projects</li>
                      <li>Version control and migration support</li>
                    </ul>
                  </div>
                  
                  <div class="flex flex-wrap gap-2">
                    <a href="doc-page.html" class="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                      <i data-lucide="book-open" class="w-3 h-3"></i>
                      Read full guide
                    </a>
                    <a href="#" class="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                      <i data-lucide="code" class="w-3 h-3"></i>
                      View examples
                    </a>
                    <a href="#" class="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                      <i data-lucide="play-circle" class="w-3 h-3"></i>
                      Watch tutorial
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Documentation Results -->
            <div class="p-4">
              <p class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3 flex items-center justify-between">
                <span>Documentation</span>
                <span class="text-neutral-400">8 results</span>
              </p>
              <div class="space-y-1">
                <!-- Result 1 -->
                <a href="doc-page.html" class="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group">
                  <i data-lucide="file-text" class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"></i>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">Component Schemas Overview</p>
                    <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">Learn how to define reusable content structures with custom fields, validation rules, and relationships between content types.</p>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">Core Concepts</span>
                      <span class="text-xs text-neutral-400">•</span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">5 min read</span>
                    </div>
                  </div>
                  <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-semibold flex-shrink-0">Guide</span>
                </a>
                
                <!-- Result 2 -->
                <a href="#" class="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group">
                  <i data-lucide="code" class="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5"></i>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">Schema API Reference</p>
                    <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">Complete API documentation for creating, updating, and managing component schemas programmatically.</p>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">API Reference</span>
                      <span class="text-xs text-neutral-400">•</span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">Reference</span>
                    </div>
                  </div>
                  <span class="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded font-semibold flex-shrink-0">API</span>
                </a>
                
                <!-- Result 3 -->
                <a href="#" class="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group">
                  <i data-lucide="play-circle" class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"></i>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">Building Your First Schema</p>
                    <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">Step-by-step tutorial with code examples showing how to create a blog post schema with title, content, and author fields.</p>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">Tutorials</span>
                      <span class="text-xs text-neutral-400">•</span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">12 min</span>
                    </div>
                  </div>
                  <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded font-semibold flex-shrink-0">Tutorial</span>
                </a>
                
                <!-- Result 4 -->
                <a href="#" class="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group">
                  <i data-lucide="file-code" class="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5"></i>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">Schema Field Types</p>
                    <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">Reference for all available field types including text, rich text, media, relationships, and custom validators.</p>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">Reference</span>
                      <span class="text-xs text-neutral-400">•</span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">Updated 2 days ago</span>
                    </div>
                  </div>
                  <span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded font-semibold flex-shrink-0">Reference</span>
                </a>
                
                <!-- Result 5 -->
                <a href="#" class="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group">
                  <i data-lucide="lightbulb" class="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"></i>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">Schema Best Practices</p>
                    <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">Design patterns and recommendations for building maintainable, scalable content schemas.</p>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">Best Practices</span>
                      <span class="text-xs text-neutral-400">•</span>
                      <span class="text-xs text-neutral-500 dark:text-neutral-400">8 min read</span>
                    </div>
                  </div>
                  <span class="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded font-semibold flex-shrink-0">Guide</span>
                </a>
                
                <!-- View all results -->
                <a href="search-results.html" class="block w-full text-center py-3 text-sm text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                  View all 8 results →
                </a>
              </div>
            </div>
            
            <!-- Related Topics -->
            <div class="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <p class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">Related Topics</p>
              <div class="flex flex-wrap gap-2">
                <a href="#" class="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Content Types
                </a>
                <a href="#" class="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Field Validation
                </a>
                <a href="#" class="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Relationships
                </a>
                <a href="#" class="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Migration
                </a>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- Footer hint -->
        <div class="flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
          <div class="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span class="flex items-center gap-1.5">
              <kbd class="px-1.5 py-0.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded text-xs">↑↓</kbd>
              Navigate
            </span>
            <span class="flex items-center gap-1.5">
              <kbd class="px-1.5 py-0.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded text-xs">↵</kbd>
              Select
            </span>
            <span class="flex items-center gap-1.5">
              <kbd class="px-1.5 py-0.5 bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded text-xs">esc</kbd>
              Close
            </span>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  `;

  // Inject HTML into page
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialize after HTML is injected
    initCommandK();
  });

  function initCommandK() {
    const cmdKModal = document.getElementById('cmd-k-modal');
    const cmdKTrigger = document.getElementById('cmd-k-trigger');
    const cmdKInput = document.getElementById('cmd-k-input');
    const cmdKClose = document.getElementById('cmd-k-close');
    const recentSearches = document.getElementById('recent-searches');
    const searchResults = document.getElementById('search-results');
    
    // Keyboard navigation state
    let selectedResultIndex = -1;
    const resultSelector = '#cmd-k-results a, #cmd-k-results button';
    
    function updateSelectedResult() {
      const results = document.querySelectorAll(resultSelector);
      results.forEach((result, index) => {
        if (index === selectedResultIndex) {
          result.classList.add('bg-primary-50', 'dark:bg-primary-900/30');
          result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
          result.classList.remove('bg-primary-50', 'dark:bg-primary-900/30');
        }
      });
    }
    
    // Open modal
    window.openCmdK = function() {
      cmdKModal?.classList.remove('hidden');
      selectedResultIndex = -1;
      setTimeout(() => {
        cmdKInput?.focus();
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 100);
    };
    
    // Close modal
    function closeCmdK() {
      cmdKModal?.classList.add('hidden');
      if (cmdKInput) cmdKInput.value = '';
      recentSearches?.classList.remove('hidden');
      searchResults?.classList.add('hidden');
      selectedResultIndex = -1;
      updateSelectedResult();
    }
    
    // Keyboard shortcut: Cmd/Ctrl + K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.openCmdK();
      }
      
      // ESC to close
      if (e.key === 'Escape' && !cmdKModal?.classList.contains('hidden')) {
        closeCmdK();
      }
    });
    
    // Click trigger button (if exists on page)
    cmdKTrigger?.addEventListener('click', window.openCmdK);
    
    // Also support clicking any hero search input
    const heroSearchInputs = document.querySelectorAll('input[placeholder*="Search"]');
    heroSearchInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        e.preventDefault();
        window.openCmdK();
      });
    });
    
    // Click close button
    cmdKClose?.addEventListener('click', closeCmdK);
    
    // Click outside modal
    cmdKModal?.addEventListener('click', (e) => {
      if (e.target === cmdKModal) {
        closeCmdK();
      }
    });
    
    // Search input - show results when typing
    cmdKInput?.addEventListener('input', (e) => {
      if (e.target.value.trim().length > 0) {
        recentSearches?.classList.add('hidden');
        searchResults?.classList.remove('hidden');
      } else {
        recentSearches?.classList.remove('hidden');
        searchResults?.classList.add('hidden');
      }
      // Reset selection when search changes
      selectedResultIndex = -1;
      updateSelectedResult();
    });
    
    // Keyboard navigation in input
    cmdKInput?.addEventListener('keydown', (e) => {
      const results = document.querySelectorAll(resultSelector);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedResultIndex = Math.min(selectedResultIndex + 1, results.length - 1);
        updateSelectedResult();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedResultIndex = Math.max(selectedResultIndex - 1, -1);
        updateSelectedResult();
      } else if (e.key === 'Enter') {
        if (selectedResultIndex >= 0) {
          // Add selected suggestion to search box
          e.preventDefault();
          const selectedResult = results[selectedResultIndex];
          const resultText = selectedResult.textContent.trim();
          cmdKInput.value = resultText;
          selectedResultIndex = -1;
          updateSelectedResult();
          
          // Show results for this search
          recentSearches?.classList.add('hidden');
          searchResults?.classList.remove('hidden');
        } else {
          // Execute search query
          e.preventDefault();
          const query = cmdKInput.value.trim();
          if (query) {
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
          }
        }
      }
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('bg-primary-600', 'text-white');
          b.classList.add('bg-neutral-50', 'dark:bg-neutral-700', 'text-neutral-700', 'dark:text-neutral-300', 'border', 'border-neutral-300', 'dark:border-neutral-600');
        });
        
        this.classList.remove('bg-neutral-50', 'dark:bg-neutral-700', 'text-neutral-700', 'dark:text-neutral-300', 'border', 'border-neutral-300', 'dark:border-neutral-600');
        this.classList.add('bg-primary-600', 'text-white');
        
        // Reset selection when filter changes
        selectedResultIndex = -1;
        updateSelectedResult();
      });
    });
  }
})();

