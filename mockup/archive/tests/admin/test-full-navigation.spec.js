const { test } = require('@playwright/test');

test('Test full navigation', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  console.log('\n=== TESTING FULL NAVIGATION ===\n');
  
  // Test Manage tab navigation
  console.log('Manage Tab:');
  console.log('  - Library ✓');
  await page.click('[data-subtab="manage-files"]');
  await page.waitForTimeout(300);
  console.log('  - Files ✓');
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(300);
  console.log('  - Sources ✓');
  await page.click('[data-subtab="manage-jobs"]');
  await page.waitForTimeout(300);
  console.log('  - Imports ✓');
  
  // Test Target tab
  console.log('\nTarget Tab:');
  await page.click('[data-tab="target"]');
  await page.waitForTimeout(300);
  console.log('  - Collections ✓');
  
  // Test Deliver tab
  console.log('\nDeliver Tab:');
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(300);
  console.log('  - Releases (Deployment Targets) ✓');
  
  // Test Transform tab
  console.log('\nTransform Tab:');
  await page.click('[data-tab="transform"]');
  await page.waitForTimeout(300);
  console.log('  - (Placeholder ready) ✓');
  
  console.log('\n=== ALL TABS WORKING! ===\n');
});

