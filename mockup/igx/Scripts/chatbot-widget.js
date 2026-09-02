// Discover CX Support Chatbot Widget
// Professional design matching Discover CX documentation portal

(function() {
  'use strict';
  
  // Inject chatbot HTML
  const chatbotHTML = `
    <!-- Floating Chat Button (Bottom Right) -->
    <button id="chat-toggle-btn" class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-full shadow-2xl shadow-primary-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 group">
      <i data-lucide="message-circle" class="w-6 h-6 group-[.chat-open]:hidden"></i>
      <i data-lucide="x" class="w-6 h-6 hidden group-[.chat-open]:block"></i>
      <span id="chat-badge" class="hidden absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
    </button>

    <!-- Chat Window -->
    <div id="chat-window" class="hidden fixed bottom-24 right-6 w-[420px] h-[700px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col z-50" style="box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05);">
      
      <!-- Chat Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
        <h3 class="text-base font-semibold text-neutral-900 dark:text-white">Chat with us</h3>
        <button id="chat-close-btn" class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
          <i data-lucide="x" class="w-5 h-5 text-neutral-600 dark:text-neutral-400"></i>
        </button>
      </div>

      <!-- Chat Messages Area -->
      <div id="chat-messages" class="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50 dark:bg-neutral-900">
        
        <!-- Welcome Message -->
        <div class="flex gap-3">
          <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-bold">CX</span>
          </div>
          <div class="flex-1">
            <div class="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div class="flex items-center gap-2 mb-3">
                <i data-lucide="hand-metal" class="w-4 h-4 text-neutral-600 dark:text-neutral-400"></i>
                <p class="text-sm text-neutral-900 dark:text-white">Hi! How can I help you today?</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <button class="quick-action-btn text-xs px-3 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Getting Started
                </button>
                <button class="quick-action-btn text-xs px-3 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  API Documentation
                </button>
                <button class="quick-action-btn text-xs px-3 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Troubleshooting
                </button>
                <button class="quick-action-btn text-xs px-3 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>Just now</span>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div id="typing-indicator" class="hidden flex gap-3">
          <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-bold">CX</span>
          </div>
          <div class="flex-1">
            <div class="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-neutral-200 dark:border-neutral-700 w-20">
              <div class="flex items-center gap-1">
                <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Chat Input -->
      <div class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-b-2xl">
        <form id="chat-form" class="flex gap-2 mb-3">
          <div class="flex-1 relative">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="Ask a question..." 
              class="w-full px-4 py-2.5 pr-12 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              autocomplete="off"
            />
            <button 
              type="button"
              id="voice-input-btn"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors group"
              title="Speak to chat"
            >
              <i data-lucide="mic" class="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600"></i>
            </button>
          </div>
          <button 
            type="submit"
            class="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          by Discover CX
        </p>
      </div>
    </div>
  `;

  // Inject CSS
  const chatbotCSS = `
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    #chat-window.animate-slide-up {
      animation: slide-up 0.3s ease-out;
    }

    #chat-messages {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    }

    #chat-messages::-webkit-scrollbar { width: 6px; }
    #chat-messages::-webkit-scrollbar-track { background: transparent; }
    #chat-messages::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 20px;
    }

    .dark #chat-messages::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .dark #chat-messages {
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    .dark #chat-window {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
    }

    @media (max-width: 640px) {
      #chat-window {
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 0 !important;
      }
      #chat-toggle-btn {
        bottom: 1.5rem !important;
        right: 1.5rem !important;
      }
    }
  `;

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = chatbotCSS;
    document.head.appendChild(style);

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Reinitialize Lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }

    // Initialize chatbot functionality
    initChatbot();
  }

  function initChatbot() {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatBadge = document.getElementById('chat-badge');
    const voiceInputBtn = document.getElementById('voice-input-btn');

    // Toggle chat window
    function toggleChat() {
      const isHidden = chatWindow.classList.contains('hidden');
      if (isHidden) {
        chatWindow.classList.remove('hidden');
        chatWindow.classList.add('animate-slide-up');
        chatToggleBtn.classList.add('chat-open');
        chatBadge.classList.add('hidden');
        chatInput.focus();
      } else {
        chatWindow.classList.add('hidden');
        chatToggleBtn.classList.remove('chat-open');
      }
    }

    chatToggleBtn?.addEventListener('click', toggleChat);
    chatCloseBtn?.addEventListener('click', toggleChat);

    // Voice input
    let recognition = null;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        voiceInputBtn.querySelector('i').setAttribute('data-lucide', 'mic');
        voiceInputBtn.classList.remove('bg-red-100', 'dark:bg-red-900/30');
        lucide.createIcons();
      };

      recognition.onerror = function() {
        voiceInputBtn.querySelector('i').setAttribute('data-lucide', 'mic');
        voiceInputBtn.classList.remove('bg-red-100', 'dark:bg-red-900/30');
        lucide.createIcons();
      };

      recognition.onend = function() {
        voiceInputBtn.querySelector('i').setAttribute('data-lucide', 'mic');
        voiceInputBtn.classList.remove('bg-red-100', 'dark:bg-red-900/30');
        lucide.createIcons();
      };

      voiceInputBtn?.addEventListener('click', function() {
        if (recognition) {
          try {
            recognition.start();
            voiceInputBtn.querySelector('i').setAttribute('data-lucide', 'mic-off');
            voiceInputBtn.classList.add('bg-red-100', 'dark:bg-red-900/30');
            lucide.createIcons();
          } catch (e) {
            // Already running
          }
        }
      });
    } else {
      if (voiceInputBtn) voiceInputBtn.style.display = 'none';
    }

    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        chatInput.value = this.textContent.trim();
        chatInput.focus();
      });
    });

    // Handle form submission
    chatForm?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      addUserMessage(message);
      chatInput.value = '';

      // Show typing indicator
      typingIndicator.classList.remove('hidden');
      scrollToBottom();

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        typingIndicator.classList.add('hidden');
        addBotMessage(
          "I understand you're asking about " + message + ". Based on our documentation, here's what I found...",
          [
            { title: "Getting Started Guide", url: "doc-page.html" },
            { title: "API Reference", url: "#" }
          ]
        );
      }, 1500);
    });

    function addUserMessage(text) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'flex gap-3 justify-end';
      messageDiv.innerHTML = `
        <div class="flex-1 flex flex-col items-end">
          <div class="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl rounded-tr-none p-4 shadow-sm max-w-[80%]">
            <p class="text-sm text-white">${escapeHtml(text)}</p>
          </div>
          <div class="flex items-center gap-2 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Just now</span>
          </div>
        </div>
      `;
      chatMessages.insertBefore(messageDiv, typingIndicator);
      scrollToBottom();
    }

    function addBotMessage(text, references = []) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'flex gap-3';
      
      let referencesHtml = '';
      if (references.length > 0) {
        referencesHtml = `
          <div class="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <p class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">References:</p>
            <ul class="space-y-1.5">
              ${references.map(ref => `
                <li>
                  <a href="${ref.url}" class="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                    <i data-lucide="file-text" class="w-3 h-3"></i>
                    ${escapeHtml(ref.title)}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

      messageDiv.innerHTML = `
        <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
          <span class="text-white text-xs font-bold">CX</span>
        </div>
        <div class="flex-1">
          <div class="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <p class="text-sm text-neutral-900 dark:text-white">${escapeHtml(text)}</p>
            
            <div class="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <button class="copy-btn p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors group" title="Copy response">
                <i data-lucide="copy" class="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600"></i>
              </button>
              <button class="speak-btn p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors group" title="Read aloud">
                <i data-lucide="volume-2" class="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600"></i>
              </button>
              <div class="flex-1"></div>
              <button class="thumbs-up-btn p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors group" title="Helpful">
                <i data-lucide="thumbs-up" class="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-green-600"></i>
              </button>
              <button class="thumbs-down-btn p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors group" title="Not helpful">
                <i data-lucide="thumbs-down" class="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-red-600"></i>
              </button>
            </div>
            
            ${referencesHtml}
          </div>
          <div class="flex items-center gap-2 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Just now</span>
          </div>
        </div>
      `;
      
      chatMessages.insertBefore(messageDiv, typingIndicator);
      
      // Reinitialize lucide icons
      if (window.lucide) {
        lucide.createIcons();
      }
      
      // Add event listeners for new buttons
      const copyBtn = messageDiv.querySelector('.copy-btn');
      const speakBtn = messageDiv.querySelector('.speak-btn');
      
      copyBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(text);
        copyBtn.querySelector('i').setAttribute('data-lucide', 'check');
        lucide.createIcons();
        setTimeout(() => {
          copyBtn.querySelector('i').setAttribute('data-lucide', 'copy');
          lucide.createIcons();
        }, 2000);
      });
      
      speakBtn?.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
        }
      });
      
      scrollToBottom();
    }

    function scrollToBottom() {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }
})();

