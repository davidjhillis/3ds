const { test } = require('@playwright/test');

test('Test Deliver > Releases tab', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  // Click Deliver tab
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(500);
  
  // Take screenshot
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/deliver-releases.png', 
    fullPage: false 
  });
  
  console.log('Deliver > Releases screenshot saved!');
});

