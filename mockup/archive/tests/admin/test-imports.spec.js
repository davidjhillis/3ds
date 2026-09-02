const { test } = require('@playwright/test');

test('Test Jobs sub-tab', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  // Click Jobs sub-tab
  await page.click('[data-subtab="manage-jobs"]');
  await page.waitForTimeout(500);
  
  // Take screenshot
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/manage-jobs.png', 
    fullPage: false 
  });
  
  console.log('Jobs sub-tab screenshot saved!');
});

