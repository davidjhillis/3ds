const { test } = require('@playwright/test');

test('Take screenshots of Content Hub tabs', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  // Screenshot Manage tab with Library
  await page.screenshot({ path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/manage-library.png', fullPage: false });
  
  // Click Files sub-tab
  await page.click('[data-subtab="manage-files"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/manage-files.png', fullPage: false });
  
  // Click Transform tab
  await page.click('[data-tab="transform"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/transform-tab.png', fullPage: false });
  
  // Click Target tab - Collections
  await page.click('[data-tab="target"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/target-collections.png', fullPage: false });
  
  // Click Deliver tab
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/deliver-tab.png', fullPage: false });
  
  console.log('Screenshots saved to admin/screenshots/');
});

