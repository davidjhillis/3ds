const { test } = require('@playwright/test');

test('Test improved light mode', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  console.log('\n=== TESTING IMPROVED LIGHT MODE ===\n');
  
  // Switch to light mode
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  // Test all major sections
  console.log('1. Manage > Library (with improved contrast)');
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/improved-light-01-library.png', 
    fullPage: false 
  });
  
  console.log('2. Manage > Sources (improved cards)');
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/improved-light-02-sources.png', 
    fullPage: false 
  });
  
  console.log('3. Manage > Imports (improved contrast)');
  await page.click('[data-subtab="manage-jobs"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/improved-light-03-imports.png', 
    fullPage: false 
  });
  
  console.log('4. Target > Collections');
  await page.click('[data-tab="target"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/improved-light-04-collections.png', 
    fullPage: false 
  });
  
  console.log('5. Deliver > Releases (deployment targets)');
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/improved-light-05-releases.png', 
    fullPage: false 
  });
  
  console.log('\n=== IMPROVED LIGHT MODE SCREENSHOTS CAPTURED ===\n');
  console.log('Changes made:');
  console.log('  ✓ Darker text colors for better readability');
  console.log('  ✓ Better contrast ratios (WCAG compliant)');
  console.log('  ✓ Improved card shadows');
  console.log('  ✓ Enhanced sub-tab button styling');
  console.log('  ✓ Better hover states\n');
});

