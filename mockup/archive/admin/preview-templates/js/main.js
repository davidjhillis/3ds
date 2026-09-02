// IGX Documentation Portal - Main JavaScript

// ========================================
// Global State
// ========================================

const IGXDocs = {
  state: {
    mobileMenuOpen: false,
    aiChatOpen: false,
    darkMode: false,
    currentModal: null
  },
  
  // Initialize all functionality
  init() {
    console.log('IGX Docs Portal initialized');
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.loadUserPreferences();
  },
  
  // Setup all event listeners
  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // AI Chatbot toggle
    const aiChatBtn = document.getElementById('ai-chat-btn');
    if (aiChatBtn) {
      aiChatBtn.addEventListener('click', () => this.toggleAIChat());
    }
    
    // Close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleClose(e));
    });
    
    // Copy code buttons
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.copyCode(e));
    });
    
    // Modal triggers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => this.openModal(e));
    });
    
    // Dark mode toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
    }
    
    // Search input focus
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('focus', () => this.handleSearchFocus());
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.smoothScroll(e));
    });
  },
  
  // Setup keyboard shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K: Open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.focusSearch();
      }
      
      // Cmd/Ctrl + /: Toggle AI assistant
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        this.toggleAIChat();
      }
      
      // Escape: Close modals/panels
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
  },
  
  // Toggle mobile menu
  toggleMobileMenu() {
    this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      if (this.state.mobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
      // Reinitialize Lucide icons for the menu
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  },
  
  // Toggle AI chatbot
  toggleAIChat() {
    this.state.aiChatOpen = !this.state.aiChatOpen;
    const aiChat = document.getElementById('ai-chatbot');
    if (aiChat) {
      if (this.state.aiChatOpen) {
        aiChat.classList.remove('closed');
      } else {
        aiChat.classList.add('closed');
      }
    }
  },
  
  // Handle close button clicks
  handleClose(e) {
    const target = e.target.closest('[data-close]');
    const closeTarget = target?.dataset.close;
    
    if (closeTarget) {
      const element = document.getElementById(closeTarget);
      if (element) {
        element.classList.add('closed');
      }
    } else {
      // Close parent modal or panel
      const modal = e.target.closest('.modal-overlay');
      const panel = e.target.closest('.sidebar-slide, .sidebar-slide-right');
      
      if (modal) modal.remove();
      if (panel) panel.classList.add('closed');
    }
  },
  
  // Copy code to clipboard
  copyCode(e) {
    const button = e.target.closest('.copy-code-btn');
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    
    if (code) {
      navigator.clipboard.writeText(code.textContent).then(() => {
        // Show success feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        button.classList.add('text-green-500');
        
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove('text-green-500');
        }, 2000);
      });
    }
  },
  
  // Open modal
  openModal(e) {
    e.preventDefault();
    const trigger = e.target.closest('[data-modal]');
    const modalId = trigger?.dataset.modal;
    
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        this.state.currentModal = modalId;
      }
    }
  },
  
  // Close all overlays
  closeAll() {
    // Close modals
    if (this.state.currentModal) {
      const modal = document.getElementById(this.state.currentModal);
      if (modal) modal.classList.add('hidden');
      this.state.currentModal = null;
    }
    
    // Close mobile menu
    if (this.state.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
    
    // Close AI chat
    if (this.state.aiChatOpen) {
      this.toggleAIChat();
    }
  },
  
  // Toggle dark mode
  toggleDarkMode() {
    this.state.darkMode = !this.state.darkMode;
    document.documentElement.classList.toggle('dark', this.state.darkMode);
    localStorage.setItem('darkMode', this.state.darkMode);
    
    // Update toggle button icon (using Lucide)
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (this.state.darkMode) {
          // Sun icon for dark mode (click to go light)
          icon.setAttribute('data-lucide', 'sun');
        } else {
          // Moon icon for light mode (click to go dark)
          icon.setAttribute('data-lucide', 'moon');
        }
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    }
  },
  
  // Focus search input
  focusSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  },
  
  // Handle search focus (could trigger autocomplete)
  handleSearchFocus() {
    console.log('Search focused - autocomplete could be triggered here');
  },
  
  // Smooth scroll to anchor
  smoothScroll(e) {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  },
  
  // Load user preferences
  loadUserPreferences() {
    // Check for saved preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.state.darkMode = savedDarkMode !== null ? savedDarkMode === 'true' : systemPrefersDark;
    
    if (this.state.darkMode) {
      document.documentElement.classList.add('dark');
    }
    
    // Update toggle button icon
    const toggleBtn = document.getElementById('dark-mode-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', this.state.darkMode ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    }
  }
};

// ========================================
// Navigation Tree Functionality
// ========================================

class NavigationTree {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (this.container) {
      this.init();
    }
  }
  
  init() {
    // Setup expand/collapse for nav sections
    const sections = this.container.querySelectorAll('.nav-section');
    sections.forEach(section => {
      const title = section.querySelector('.nav-section-title');
      if (title) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => this.toggleSection(section));
      }
    });
  }
  
  toggleSection(section) {
    const list = section.querySelector('.nav-list');
    if (list) {
      list.classList.toggle('hidden');
    }
  }
}

// ========================================
// AI Features Mock Functionality
// ========================================

const AIFeatures = {
  // Simulate AI explanation
  explainCode(codeElement) {
    console.log('Explaining code:', codeElement.textContent);
    // In a real app, this would call an AI API
    alert('AI Code Explanation:\n\nThis code demonstrates...');
  },
  
  // Simulate article summarization
  summarizeArticle() {
    console.log('Summarizing article...');
    const summary = document.getElementById('ai-summary');
    if (summary) {
      summary.classList.remove('hidden');
      // In a real app, this would call an AI API and populate the summary
    }
  },
  
  // Simulate AI search
  performAISearch(query) {
    console.log('AI Search for:', query);
    // In a real app, this would call an AI search API
    return {
      answer: 'Based on your search, here is what you need to know...',
      sources: ['Doc 1', 'Doc 2', 'Doc 3']
    };
  },
  
  // Simulate chat message
  sendChatMessage(message) {
    console.log('Sending message:', message);
    // In a real app, this would call an AI chat API
    return 'This is a mock AI response to: ' + message;
  }
};

// ========================================
// Text-to-Speech Mock Player
// ========================================

class TTSPlayer {
  constructor(selector) {
    this.player = document.querySelector(selector);
    if (this.player) {
      this.isPlaying = false;
      this.init();
    }
  }
  
  init() {
    const playBtn = this.player.querySelector('.play-pause-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }
  }
  
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const icon = this.player.querySelector('.play-pause-btn svg');
    if (icon) {
      // Toggle between play and pause icon
      icon.classList.toggle('playing');
    }
    console.log('TTS Player:', this.isPlaying ? 'Playing' : 'Paused');
  }
}

// ========================================
// Initialize on DOM load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  IGXDocs.init();
  
  // Initialize navigation tree
  new NavigationTree('.sidebar-nav');
  
  // Initialize TTS player if present
  new TTSPlayer('.audio-player-ai');
  
  console.log('All systems initialized');
});

// ========================================
// DITA Navigation Toggle Functions
// ========================================

// Toggle navigation section (Level 1)
function toggleNavSection(button) {
  const content = button.nextElementSibling;
  const chevron = button.querySelector('[data-lucide="chevron-down"], [data-lucide="chevron-right"]');
  
  if (content.style.display === 'none' || content.classList.contains('hidden')) {
    content.style.display = 'block';
    content.classList.remove('hidden');
    if (chevron) {
      chevron.setAttribute('data-lucide', 'chevron-down');
    }
  } else {
    content.style.display = 'none';
    content.classList.add('hidden');
    if (chevron) {
      chevron.setAttribute('data-lucide', 'chevron-right');
    }
  }
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Toggle navigation topic (Level 2)
function toggleNavTopic(button) {
  const content = button.nextElementSibling;
  const chevron = button.querySelector('[data-lucide="chevron-down"], [data-lucide="chevron-right"]');
  
  if (content.style.display === 'none' || content.classList.contains('hidden')) {
    content.style.display = 'block';
    content.classList.remove('hidden');
    if (chevron) {
      chevron.setAttribute('data-lucide', 'chevron-down');
    }
  } else {
    content.style.display = 'none';
    content.classList.add('hidden');
    if (chevron) {
      chevron.setAttribute('data-lucide', 'chevron-right');
    }
  }
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IGXDocs, AIFeatures, NavigationTree, TTSPlayer, toggleNavSection, toggleNavTopic };
}

