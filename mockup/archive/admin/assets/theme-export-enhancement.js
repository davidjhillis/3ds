/**
 * Theme Builder JSON Export Enhancement
 * Add this script to admin/theme.html to enable customer theme JSON export
 *
 * INSERT THIS CODE AFTER THE exportCSS() function (around line 940)
 */

// ========================================
// Export Customer Theme JSON
// ========================================

function exportThemeJSON() {
  // Get customer info from UI (you'll need to add input fields)
  const customerName = prompt('Enter customer name (e.g., Acme Corp):', 'My Company');
  if (!customerName) return;

  const customerId = customerName.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const theme = {
    version: '1.0.0',
    name: `${customerName} Theme`,
    description: `Custom theme for ${customerName}`,
    customer: customerId,
    created: new Date().toISOString(),

    colors: {
      primary: currentState.primary,
      accent: currentState.accent,
      neutral: currentState.neutral
    },

    typography: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },

    branding: {
      logo: 'discover-cx-logo.svg',
      logoWhite: 'discover-cx-logo-white.svg',
      favicon: 'favicon.ico'
    },

    settings: {
      darkMode: currentState.mode === 'dark',
      useGradients: currentState.useGradients || true,
      roundedCorners: 'md'
    }
  };

  // Convert to JSON
  const jsonContent = JSON.stringify(theme, null, 2);

  // Copy to clipboard
  navigator.clipboard.writeText(jsonContent).then(() => {
    showNotification('Theme JSON copied to clipboard!', 'success');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });

  // Download as file
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${customerId}-theme.json`;
  a.click();
  URL.revokeObjectURL(url);

  // Show instructions
  showNotification(
    `Theme exported as ${customerId}-theme.json!\n\nNext steps:\n1. Save this file to themes/ folder\n2. Deploy with your templates\n3. Access at: yoursite.com?customer=${customerId}`,
    'success'
  );
}

/**
 * ADD THIS BUTTON TO THE UI (around line 500-600 in the HTML):
 *
 * <button
 *   onclick="exportThemeJSON()"
 *   class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
 *   <i data-lucide="package" class="w-4 h-4"></i>
 *   <span>Export Customer Theme</span>
 * </button>
 */
