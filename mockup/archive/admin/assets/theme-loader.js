/**
 * Theme Loader - Shared across all templates
 * Loads the active theme from localStorage and applies it to the page
 */

(function() {
  'use strict';
  
  // Helper: Convert hex to RGB space-separated format
  function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r} ${g} ${b}`;
  }
  
  // Load active theme from localStorage
  function loadActiveTheme() {
    try {
      const themeState = localStorage.getItem('themeEditorState');
      if (!themeState) {
        console.log('No active theme found - using defaults');
        return null;
      }
      
      const state = JSON.parse(themeState);
      console.log('Active theme loaded:', state.preset || 'custom');
      return state;
    } catch (error) {
      console.error('Failed to load theme:', error);
      return null;
    }
  }
  
  // Get color scale for a theme
  function getColorScale(colorName, mode) {
    // Check if this is a custom color
    if (colorName && colorName.startsWith('custom-')) {
      const match = colorName.match(/^custom-([^-]+)-/);
      if (match) {
        const themeKey = match[1];
        const customThemes = JSON.parse(localStorage.getItem('customThemes') || '{}');
        const theme = customThemes[themeKey];
        
        if (theme) {
          // Determine which property (primary, accent, neutral)
          if (colorName.includes('-primary')) {
            return mode === 'dark' ? theme.dark.primary : theme.light.primary;
          } else if (colorName.includes('-accent')) {
            return mode === 'dark' ? theme.dark.accent : theme.light.accent;
          } else if (colorName.includes('-neutral')) {
            return mode === 'dark' ? theme.dark.neutral : theme.light.neutral;
          }
        }
      }
      
      // Fallback for custom colors
      return {};
    }
    
    // For standard Tailwind colors, we need access to tailwindColors
    // If not available, return empty object (will use CSS defaults)
    if (typeof window.tailwindColors !== 'undefined') {
      return window.tailwindColors.getScale(colorName);
    }
    
    return {};
  }
  
  // Apply theme to current page
  function applyTheme() {
    const state = loadActiveTheme();
    if (!state) return;
    
    const mode = state.mode || 'light';
    const primaryScale = getColorScale(state.primary, mode);
    const accentScale = getColorScale(state.accent, mode);
    const neutralScale = getColorScale(state.neutral, mode);
    
    // Apply CSS variables to :root
    const root = document.documentElement;
    
    Object.entries(primaryScale).forEach(([shade, color]) => {
      if (color) {
        root.style.setProperty(`--color-primary-${shade}`, hexToRGB(color));
      }
    });
    
    Object.entries(accentScale).forEach(([shade, color]) => {
      if (color) {
        root.style.setProperty(`--color-accent-${shade}`, hexToRGB(color));
      }
    });
    
    Object.entries(neutralScale).forEach(([shade, color]) => {
      if (color) {
        root.style.setProperty(`--color-neutral-${shade}`, hexToRGB(color));
      }
    });
    
    // Apply dark/light mode class
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    console.log(`✅ Theme applied: ${state.preset || 'custom'} (${mode} mode)`);
  }
  
  // Initialize theme on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  } else {
    // DOM already loaded
    applyTheme();
  }
  
  // Listen for theme changes from theme editor
  window.addEventListener('storage', (e) => {
    if (e.key === 'themeEditorState') {
      console.log('Theme changed - reloading');
      applyTheme();
    }
  });
  
})();

