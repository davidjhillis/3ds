/**
 * Tailwind CSS Default Purple Color Scale
 * Exact hex values from Tailwind CSS v3 defaults
 * Used to match the original template design precisely
 */

export const tailwindPurpleTheme = {
  name: 'Tailwind Purple (Original)',
  description: 'Exact Tailwind CSS default purple colors - matches original templates',
  
  // Tailwind Purple - Light Mode (SAME as dark - Tailwind colors don't flip!)
  // In Tailwind, purple-900 is ALWAYS #581c87 in both light and dark modes
  light: {
    1: '#18111c',  // Step 1 (darkest background)
    2: '#231825',  // Step 2 (dark background)
    3: '#3b0764',  // Step 3 (Tailwind purple-950)
    4: '#581c87',  // Step 4 (Tailwind purple-900) ← SAME IN BOTH MODES
    5: '#6b21a8',  // Step 5 (Tailwind purple-800) ← SAME IN BOTH MODES
    6: '#7e22ce',  // Step 6 (Tailwind purple-700)
    7: '#9333ea',  // Step 7 (Tailwind purple-600) - PRIMARY
    8: '#a855f7',  // Step 8 (Tailwind purple-500)
    9: '#c084fc',  // Step 9 (Tailwind purple-400) - Interactive elements
    10: '#d8b4fe',  // Step 10 (Tailwind purple-300)
    11: '#e9d5ff',  // Step 11 (Tailwind purple-200) - Accessible text
    12: '#f3e8ff'   // Step 12 (Tailwind purple-100) - High contrast text
  },
  
  // Tailwind Purple - Dark Mode (Radix-compatible object format)
  dark: {
    1: '#18111c',  // Step 1 (darkest background)
    2: '#231825',  // Step 2 (dark background)
    3: '#3b0764',  // Step 3 (Tailwind purple-950)
    4: '#581c87',  // Step 4 (Tailwind purple-900)
    5: '#6b21a8',  // Step 5 (Tailwind purple-800)
    6: '#7e22ce',  // Step 6 (Tailwind purple-700)
    7: '#9333ea',  // Step 7 (Tailwind purple-600) - PRIMARY
    8: '#a855f7',  // Step 8 (Tailwind purple-500)
    9: '#c084fc',  // Step 9 (Tailwind purple-400) - Interactive elements
    10: '#d8b4fe',  // Step 10 (Tailwind purple-300)
    11: '#e9d5ff',  // Step 11 (Tailwind purple-200) - Accessible text
    12: '#f3e8ff'   // Step 12 (Tailwind purple-100) - High contrast text
  }
};

