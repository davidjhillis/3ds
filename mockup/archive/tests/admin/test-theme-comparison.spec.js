const { test } = require('@playwright/test');

test('Theme comparison screenshots', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  console.log('\n=== DARK MODE ===');
  // Dark mode - Manage > Library
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/dark-manage-library.png', 
    fullPage: false 
  });
  console.log('  ✓ Dark - Manage > Library');
  
  // Dark mode - Manage > Sources
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/dark-manage-sources.png', 
    fullPage: false 
  });
  console.log('  ✓ Dark - Manage > Sources');
  
  // Dark mode - Deliver > Releases
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/dark-deliver-releases.png', 
    fullPage: false 
  });
  console.log('  ✓ Dark - Deliver > Releases');
  
  // Switch to LIGHT MODE
  console.log('\n=== LIGHT MODE ===');
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  // Light mode - Deliver > Releases
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-deliver-releases.png', 
    fullPage: false 
  });
  console.log('  ✓ Light - Deliver > Releases');
  
  // Light mode - Manage tab
  await page.click('[data-tab="manage"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-manage-library.png', 
    fullPage: false 
  });
  console.log('  ✓ Light - Manage > Library');
  
  // Light mode - Manage > Sources
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-manage-sources.png', 
    fullPage: false 
  });
  console.log('  ✓ Light - Manage > Sources');
  
  console.log('\n=== THEME TOGGLE COMPLETE! ===\n');
});

